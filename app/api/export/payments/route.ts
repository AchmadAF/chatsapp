import { csv, csvResponse } from "@/lib/csv";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const payments = await prisma.payment.findMany({ include: { order: { include: { customer: true } } }, orderBy: { createdAt: "desc" } });
  return csvResponse(csv(payments.map((payment) => ({ id: payment.id, orderId: payment.orderId, customer: payment.order.customer.name, status: payment.status, amount: payment.amount, transactionId: payment.transactionId, createdAt: payment.createdAt.toISOString() }))), "payments.csv");
}
