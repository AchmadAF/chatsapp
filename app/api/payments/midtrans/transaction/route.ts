import { createMidtransTransaction } from "@/lib/midtrans";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ orderId: z.string().min(1) });

export async function POST(request: Request) {
  const { orderId } = schema.parse(await request.json());
  const order = await prisma.order.findUnique({ include: { customer: true }, where: { id: orderId } });
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });

  const transaction = await createMidtransTransaction({ orderId: order.id, grossAmount: order.total, customerName: order.customer.name ?? undefined, customerPhone: order.customer.phone });
  await prisma.invoice.upsert({ where: { orderId: order.id }, update: { paymentUrl: transaction.redirect_url }, create: { orderId: order.id, paymentUrl: transaction.redirect_url } });
  await prisma.payment.upsert({ where: { midtransOrderId: order.id }, update: { status: "pending", amount: order.total }, create: { orderId: order.id, midtransOrderId: order.id, status: "pending", amount: order.total } });

  return Response.json({ paymentUrl: transaction.redirect_url, token: transaction.token });
}
