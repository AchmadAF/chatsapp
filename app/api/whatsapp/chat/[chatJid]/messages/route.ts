import { whatsappFetch } from "@/lib/whatsapp";

export async function GET(request: Request, { params }: { params: Promise<{ chatJid: string }> }) {
  const { chatJid } = await params;
  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get("device_id") ?? undefined;
  searchParams.delete("device_id");
  return whatsappFetch(`/chat/${encodeURIComponent(chatJid)}/messages?${searchParams.toString()}`, { deviceId });
}
