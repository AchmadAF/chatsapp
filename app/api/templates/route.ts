import { prisma } from "@/lib/prisma";

const defaults = [
  ["greeting", "Sapaan", "Halo kak, ada yang bisa kami bantu?"],
  ["invoice", "Invoice", "Invoice order {{order_id}} total {{total}}: {{payment_url}}"],
  ["payment_success", "Payment success", "Pembayaran order {{order_id}} sudah kami terima."],
  ["payment_expired", "Payment expired", "Link pembayaran order {{order_id}} sudah expired."],
  ["order_processing", "Order processing", "Order {{order_id}} sedang diproses."],
  ["order_shipped", "Order shipped", "Order {{order_id}} sudah dikirim."],
  ["payment_followup", "Follow-up pending payment", "Kak, invoice order {{order_id}} masih pending: {{payment_url}}"],
];

export async function GET() {
  const templates = await prisma.messageTemplate.findMany({ orderBy: { createdAt: "asc" } });
  return Response.json({ templates });
}

export async function POST() {
  await Promise.all(defaults.map(([key, name, body]) => prisma.messageTemplate.upsert({ where: { key }, update: { name, body }, create: { key, name, body } })));
  const templates = await prisma.messageTemplate.findMany({ orderBy: { createdAt: "asc" } });
  return Response.json({ templates });
}
