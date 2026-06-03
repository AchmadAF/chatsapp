import { whatsappFetch } from "@/lib/whatsapp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return whatsappFetch(`/chats?${searchParams.toString()}`, { deviceId: searchParams.get("device_id") ?? undefined });
}
