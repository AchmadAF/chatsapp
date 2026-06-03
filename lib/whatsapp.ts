export const whatsappBaseUrl = process.env.WHATSAPP_API_URL ?? "http://localhost:3000";

export function whatsappHeaders(deviceId?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (deviceId) headers["X-Device-Id"] = deviceId;
  const username = process.env.WHATSAPP_API_USERNAME;
  const password = process.env.WHATSAPP_API_PASSWORD;
  if (username && password) headers.Authorization = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
  return headers;
}

export async function whatsappFetch(path: string, init?: RequestInit & { deviceId?: string }) {
  const response = await fetch(`${whatsappBaseUrl}${path}`, {
    ...init,
    headers: { ...whatsappHeaders(init?.deviceId), ...init?.headers },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) return Response.json({ error: data ?? response.statusText }, { status: response.status });
  return Response.json(data);
}
