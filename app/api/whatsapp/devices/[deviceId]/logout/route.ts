import { whatsappFetch } from "@/lib/whatsapp";

export async function POST(_: Request, { params }: { params: Promise<{ deviceId: string }> }) {
  const { deviceId } = await params;
  return whatsappFetch(`/devices/${deviceId}/logout`, { method: "POST" });
}
