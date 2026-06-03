import { defaultWhatsappBaseUrl } from "@/lib/whatsapp";
import { cookies } from "next/headers";

export async function GET() {
  const baseUrl = (await cookies()).get("whatsapp_base_url")?.value || defaultWhatsappBaseUrl;
  return Response.json({ results: { baseUrl } });
}

export async function POST(request: Request) {
  const { baseUrl } = (await request.json().catch(() => ({}))) as { baseUrl?: string };

  if (!baseUrl) return Response.json({ error: "URL backend wajib diisi" }, { status: 400 });

  try {
    new URL(baseUrl);
  } catch {
    return Response.json({ error: "URL backend tidak valid" }, { status: 400 });
  }

  (await cookies()).set("whatsapp_base_url", baseUrl, { httpOnly: true, sameSite: "lax", path: "/" });

  return Response.json({ message: "Setting tersimpan", results: { baseUrl } });
}
