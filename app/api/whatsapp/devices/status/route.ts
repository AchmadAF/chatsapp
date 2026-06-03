import { whatsappFetch } from "@/lib/whatsapp";

export async function GET() {
  const devicesResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/whatsapp/devices`, { cache: "no-store" }).catch(() => null);
  const devicesData = await devicesResponse?.json().catch(() => null);
  const devices = devicesData?.results ?? devicesData?.devices ?? [];

  if (!Array.isArray(devices)) return Response.json({ devices: [] });

  const statuses = await Promise.all(devices.map(async (device: { id?: string; device_id?: string }) => {
    const id = device.id ?? device.device_id ?? "";
    const response = await whatsappFetch(`/devices/${id}/status`);
    const data = await response.json().catch(() => null);
    return { id, status: data };
  }));

  return Response.json({ devices: statuses });
}
