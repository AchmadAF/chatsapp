import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ chatId: z.string().min(1), userId: z.string().min(1) });

export async function POST(request: Request) {
  const { chatId, userId } = schema.parse(await request.json());
  const chat = await prisma.chat.update({ where: { id: chatId }, data: { assignedUserId: userId, status: "assigned" } });
  return Response.json({ chat });
}
