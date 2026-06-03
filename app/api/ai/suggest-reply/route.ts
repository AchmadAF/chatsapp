import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ chatId: z.string().min(1) });

export async function POST(request: Request) {
  const { chatId } = schema.parse(await request.json());
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: { orderBy: { createdAt: "desc" }, take: 10 }, orders: { include: { items: { include: { product: true } }, payments: true }, orderBy: { createdAt: "desc" }, take: 1 } },
  });
  if (!chat) return Response.json({ error: "Chat not found" }, { status: 404 });

  const latestOrder = chat.orders[0];
  const productText = latestOrder?.items.map((item) => `${item.product.name} x${item.qty}`).join(", ");
  const paymentStatus = latestOrder?.payments[0]?.status;
  const context = chat.messages.map((message) => `${message.fromMe ? "CS" : "Customer"}: ${message.body}`).reverse().join("\n");
  const suggestion = latestOrder ? `Halo kak, update order ${latestOrder.id} untuk ${productText}. Status pembayaran: ${paymentStatus ?? "belum ada"}. Ada yang bisa kami bantu lagi?` : "Halo kak, ada produk yang ingin ditanyakan atau dibeli?";

  return Response.json({ context, suggestion, requiresApproval: true });
}
