import { prisma } from "@/lib/prisma";

export async function GET() {
  const chats = await prisma.chat.findMany({ where: { status: { not: "resolved" } }, orderBy: { updatedAt: "desc" } });
  const now = Date.now();
  const items = chats.map((chat) => {
    const firstResponseMinutes = chat.firstInboundAt && chat.firstResponseAt ? Math.round((chat.firstResponseAt.getTime() - chat.firstInboundAt.getTime()) / 60000) : null;
    const waitingMinutes = chat.lastInboundAt ? Math.round((now - chat.lastInboundAt.getTime()) / 60000) : null;
    return { chatId: chat.id, chatJid: chat.chatJid, status: chat.status, firstResponseMinutes, waitingMinutes, alert: waitingMinutes !== null && waitingMinutes > 15 };
  });

  return Response.json({ items });
}
