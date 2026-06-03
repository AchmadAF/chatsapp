import { whatsappFetch } from "@/lib/whatsapp";

export async function POST(request: Request) {
  const deviceId = request.headers.get("x-device-id") ?? undefined;
  return whatsappFetch("/send/message", { method: "POST", body: await request.text(), deviceId });
}
