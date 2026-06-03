import { whatsappFetch } from "@/lib/whatsapp";

export async function POST(request: Request, { params }: { params: Promise<{ deviceId: string }> }) {
  const { deviceId } = await params;
  const { searchParams } = new URL(request.url);
  return whatsappFetch(`/devices/${deviceId}/login/code?${searchParams.toString()}`, { method: "POST" });
}
