import { whatsappFetch } from "@/lib/whatsapp";

export async function GET() {
  return whatsappFetch("/devices");
}

export async function POST(request: Request) {
  return whatsappFetch("/devices", { method: "POST", body: await request.text() });
}
