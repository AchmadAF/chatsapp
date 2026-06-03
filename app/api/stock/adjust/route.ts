import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ productId: z.string().min(1), type: z.enum(["in", "out", "adjustment"]), qty: z.number().int(), note: z.string().optional() });

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  const delta = payload.type === "in" ? payload.qty : payload.type === "out" ? -payload.qty : payload.qty;
  const [product, movement] = await prisma.$transaction([
    prisma.product.update({ where: { id: payload.productId }, data: { stock: { increment: delta } } }),
    prisma.stockMovement.create({ data: payload }),
  ]);
  return Response.json({ product, movement });
}
