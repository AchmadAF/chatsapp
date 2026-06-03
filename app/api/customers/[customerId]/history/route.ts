import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ customerId: string }> }) {
  const { customerId } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      chats: { include: { messages: { orderBy: { createdAt: "desc" }, take: 50 } } },
      orders: { include: { items: { include: { product: true } }, payments: true, invoice: true }, orderBy: { createdAt: "desc" } },
    },
  });
  if (!customer) return Response.json({ error: "Customer not found" }, { status: 404 });
  return Response.json({ customer, repeatCustomer: customer.orders.length > 1 });
}
