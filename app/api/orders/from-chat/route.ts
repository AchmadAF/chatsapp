import { createMidtransTransaction } from "@/lib/midtrans";
import { prisma } from "@/lib/prisma";
import { whatsappFetch } from "@/lib/whatsapp";
import { z } from "zod";

const schema = z.object({
  chatJid: z.string().min(1),
  customerName: z.string().optional(),
  items: z.array(z.object({ productId: z.string().min(1), qty: z.number().int().min(1) })).min(1),
  deviceId: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  const phone = payload.chatJid.replace("@s.whatsapp.net", "");
  const deviceId = payload.deviceId ?? "default";
  const products = await prisma.product.findMany({ where: { id: { in: payload.items.map((item) => item.productId) } } });
  const items = payload.items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) throw new Error("Product not found");
    return { productId: product.id, qty: item.qty, price: product.price, total: product.price * item.qty };
  });
  const total = items.reduce((sum, item) => sum + item.total, 0);

  const customer = await prisma.customer.upsert({
    where: { chatJid: payload.chatJid },
    update: { name: payload.customerName, phone },
    create: { chatJid: payload.chatJid, name: payload.customerName, phone },
  });
  await prisma.whatsappDevice.upsert({ where: { id: deviceId }, update: {}, create: { id: deviceId } });
  const chat = await prisma.chat.upsert({
    where: { chatJid_deviceId: { chatJid: payload.chatJid, deviceId } },
    update: { customerId: customer.id },
    create: { chatJid: payload.chatJid, deviceId, customerId: customer.id },
  });
  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      chatId: chat.id,
      status: "pending_payment",
      subtotal: total,
      total,
      notes: payload.notes,
      items: { create: items },
    },
  });
  const transaction = await createMidtransTransaction({ orderId: order.id, grossAmount: total, customerName: customer.name ?? undefined, customerPhone: customer.phone });

  await prisma.invoice.create({ data: { orderId: order.id, paymentUrl: transaction.redirect_url } });
  await prisma.payment.create({ data: { orderId: order.id, midtransOrderId: order.id, status: "pending", amount: total } });

  const message = `Invoice order ${order.id}\nTotal: Rp${total.toLocaleString("id-ID")}\nBayar: ${transaction.redirect_url}`;
  await whatsappFetch("/send/message", { method: "POST", deviceId: payload.deviceId, body: JSON.stringify({ phone: payload.chatJid, message }) });

  return Response.json({ orderId: order.id, paymentUrl: transaction.redirect_url });
}
