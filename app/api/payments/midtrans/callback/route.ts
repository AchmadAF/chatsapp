import { prisma } from "@/lib/prisma";
import { whatsappFetch } from "@/lib/whatsapp";

export async function POST(request: Request) {
  const payload = await request.json();
  const midtransOrderId = payload.order_id;
  const transactionStatus = payload.transaction_status;
  const status = transactionStatus === "settlement" || transactionStatus === "capture" ? "paid" : transactionStatus === "expire" ? "expired" : transactionStatus === "cancel" ? "cancelled" : transactionStatus === "deny" ? "failed" : "pending";

  const existingPayment = await prisma.payment.findUnique({ where: { midtransOrderId } });
  const payment = await prisma.payment.update({
    where: { midtransOrderId },
    data: { status, transactionId: payload.transaction_id, rawCallback: payload },
  });

  if (status === "paid" && existingPayment?.status !== "paid") {
    const order = await prisma.order.update({ where: { id: payment.orderId }, data: { status: "paid" }, include: { customer: true, chat: true, items: true } });
    await prisma.$transaction(order.items.flatMap((item) => [
      prisma.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.qty } } }),
      prisma.stockMovement.create({ data: { productId: item.productId, type: "out", qty: item.qty, orderId: order.id, note: "paid order" } }),
    ]));
    await prisma.followUp.updateMany({ where: { paymentId: payment.id, status: "pending" }, data: { status: "skipped" } });
    await whatsappFetch("/send/message", { method: "POST", deviceId: order.chat?.deviceId ?? undefined, body: JSON.stringify({ phone: order.customer.chatJid, message: `Pembayaran order ${order.id} sudah kami terima.` }) });
  }

  return Response.json({ ok: true });
}
