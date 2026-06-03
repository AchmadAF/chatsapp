import { csv, csvResponse } from "@/lib/csv";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" } });
  return csvResponse(csv(orders.map((order) => ({ id: order.id, customer: order.customer.name, phone: order.customer.phone, status: order.status, total: order.total, createdAt: order.createdAt.toISOString() }))), "orders.csv");
}
