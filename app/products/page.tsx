import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Produk</h1>
      <form className="mt-6 grid gap-3 rounded-xl border bg-white p-5 md:grid-cols-2" method="post" action="/api/products">
        <input className="rounded-lg border p-3" name="name" placeholder="Name" />
        <input className="rounded-lg border p-3" name="sku" placeholder="SKU" />
        <input className="rounded-lg border p-3" name="price" placeholder="Price" type="number" />
        <input className="rounded-lg border p-3" name="stock" placeholder="Stock" type="number" />
      </form>
      <div className="mt-6 overflow-hidden rounded-xl border bg-white">
        {products.map((product) => (
          <div className="grid grid-cols-4 border-b p-4" key={product.id}>
            <span>{product.name}</span>
            <span>{product.sku}</span>
            <span>Rp{product.price.toLocaleString("id-ID")}</span>
            <span>{product.stock}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
