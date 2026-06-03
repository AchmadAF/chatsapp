import { prisma } from "@/lib/prisma";

const buyKeywords = ["mau beli", "order", "pesan", "beli", "checkout"];
const priceKeywords = ["harga", "berapa", "price"];

export async function detectIntent(message: string) {
  const text = message.toLowerCase();
  const products = await prisma.product.findMany({ where: { status: "active" } });
  const matchedProducts = products.filter((product) => text.includes(product.name.toLowerCase()) || text.includes(product.sku.toLowerCase()));
  const hasBuyIntent = buyKeywords.some((keyword) => text.includes(keyword));
  const hasPriceIntent = priceKeywords.some((keyword) => text.includes(keyword));

  return {
    intent: hasBuyIntent ? "buy" : hasPriceIntent ? "price" : matchedProducts.length ? "product" : "unknown",
    matchedProducts,
    shouldSuggestOrder: hasBuyIntent || matchedProducts.length > 0,
  };
}

export function productReply(product: { name: string; price: number; stock: number; description: string | null; imageUrl: string | null }) {
  return [`${product.name}`, `Harga: Rp${product.price.toLocaleString("id-ID")}`, `Stok: ${product.stock}`, product.description ? `Deskripsi: ${product.description}` : null, product.imageUrl ? `Gambar: ${product.imageUrl}` : null].filter(Boolean).join("\n");
}
