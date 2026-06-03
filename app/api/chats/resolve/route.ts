import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ chatId: z.string().min(1) });

export async function POST(request: Request) {
  const { chatId } = schema.parse(await request.json());
  const chat = await prisma.chat.update({ where: { id: chatId }, data: { status: "resolved" } });
  return Response.json({ chat });
}
