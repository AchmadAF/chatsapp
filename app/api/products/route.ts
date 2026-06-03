import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().optional(),
  price: z.coerce.number().int().min(0),
  stock: z.coerce.number().int().min(0),
  status: z.enum(["active", "inactive"]).default("active"),
  imageUrl: z.string().optional(),
});

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ products });
}

export async function POST(request: Request) {
  const payload = productSchema.parse(await request.json());
  const product = await prisma.product.create({ data: payload });
  return Response.json({ product });
}
