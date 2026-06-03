import { csv, csvResponse } from "@/lib/csv";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({ include: { orders: true }, orderBy: { createdAt: "desc" } });
  return csvResponse(csv(customers.map((customer) => ({ id: customer.id, name: customer.name, phone: customer.phone, chatJid: customer.chatJid, orders: customer.orders.length, repeat: customer.orders.length > 1 ? "yes" : "no", createdAt: customer.createdAt.toISOString() }))), "customers.csv");
}
