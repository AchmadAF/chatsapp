import { prisma } from "@/lib/prisma";
import { whatsappFetch } from "@/lib/whatsapp";

const stages = [
  { stage: "h0", delayHours: 0 },
  { stage: "h1", delayHours: 24 },
  { stage: "before_expired", delayHours: 23 },
];

export async function POST() {
  const pendingPayments = await prisma.payment.findMany({ where: { status: "pending" }, include: { order: { include: { customer: true, invoice: true, chat: true } } } });
  const now = new Date();

  for (const payment of pendingPayments) {
    for (const item of stages) {
      const dueAt = new Date(payment.createdAt.getTime() + item.delayHours * 60 * 60 * 1000);
      await prisma.followUp.upsert({ where: { paymentId_stage: { paymentId: payment.id, stage: item.stage } }, update: {}, create: { paymentId: payment.id, stage: item.stage, dueAt } });
    }
  }

  const dueFollowUps = await prisma.followUp.findMany({
    where: { status: "pending", dueAt: { lte: now }, payment: { status: "pending" } },
    include: { payment: { include: { order: { include: { customer: true, invoice: true, chat: true } } } } },
  });

  for (const followUp of dueFollowUps) {
    const order = followUp.payment.order;
    const message = `Kak, invoice order ${order.id} masih pending: ${order.invoice?.paymentUrl ?? ""}`;
    await whatsappFetch("/send/message", { method: "POST", deviceId: order.chat?.deviceId ?? undefined, body: JSON.stringify({ phone: order.customer.chatJid, message }) });
    await prisma.followUp.update({ where: { id: followUp.id }, data: { status: "sent", sentAt: new Date() } });
  }

  const skipped = await prisma.followUp.updateMany({ where: { status: "pending", payment: { status: "paid" } }, data: { status: "skipped" } });
  return Response.json({ createdFor: pendingPayments.length, sent: dueFollowUps.length, skipped: skipped.count });
}
