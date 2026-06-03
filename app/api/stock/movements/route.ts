import { prisma } from "@/lib/prisma";

export async function GET() {
  const movements = await prisma.stockMovement.findMany({ include: { product: true }, orderBy: { createdAt: "desc" } });
  return Response.json({ movements });
}
