import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get("device_id") ?? undefined;
  const orders = await prisma.order.findMany({ where: deviceId ? { chat: { deviceId } } : undefined, include: { items: true, invoice: true, payments: true, chat: true }, orderBy: { createdAt: "desc" } });
  return Response.json({ orders });
}
