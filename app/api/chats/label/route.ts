import { prisma } from "@/lib/prisma";
import { whatsappFetch } from "@/lib/whatsapp";
import { z } from "zod";

const schema = z.object({ chatId: z.string().min(1), label: z.enum(["hot lead", "pending payment", "complaint", "repeat customer"]), labeled: z.boolean().default(true) });

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  const chat = await prisma.chat.findUnique({ where: { id: payload.chatId } });
  if (!chat) return Response.json({ error: "Chat not found" }, { status: 404 });

  const labels = payload.labeled ? Array.from(new Set([...chat.labels, payload.label])) : chat.labels.filter((label) => label !== payload.label);
  const updated = await prisma.chat.update({ where: { id: chat.id }, data: { labels } });

  await whatsappFetch(`/chat/${encodeURIComponent(chat.chatJid)}/label`, {
    method: "POST",
    deviceId: chat.deviceId ?? undefined,
    body: JSON.stringify({ label_id: payload.label.replaceAll(" ", "_"), label_name: payload.label, labeled: payload.labeled }),
  });

  return Response.json({ chat: updated });
}
