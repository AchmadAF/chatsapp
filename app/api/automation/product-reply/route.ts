import { productReply } from "@/lib/automation";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ productId: z.string().min(1) });

export async function POST(request: Request) {
  const { productId } = schema.parse(await request.json());
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return Response.json({ error: "Product not found" }, { status: 404 });
  return Response.json({ message: productReply(product) });
}
