import { AppShell, Panel } from "@/components/app/shell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <AppShell title="Produk" subtitle="CRUD katalog produk buat order WhatsApp.">
      <div className="mb-6 flex justify-end">
        <Link href="/products/new" className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950">Tambah Produk</Link>
      </div>
      <Panel title="Daftar produk">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="grid grid-cols-5 bg-white/10 p-4 text-sm font-semibold text-slate-300">
            <span>Produk</span><span>SKU</span><span>Harga</span><span>Stok</span><span>Status</span>
          </div>
          {(products.length ? products : [
            { id: "demo-1", name: "Produk Demo", sku: "SKU-001", price: 125000, stock: 12, status: "active" },
            { id: "demo-2", name: "Paket Hemat", sku: "SKU-002", price: 99000, stock: 6, status: "active" },
          ]).map((product) => (
            <div className="grid grid-cols-5 border-t border-white/10 p-4 text-sm text-slate-200" key={product.id}>
              <span className="font-medium text-white">{product.name}</span>
              <span>{product.sku}</span>
              <span>Rp{product.price.toLocaleString("id-ID")}</span>
              <span>{product.stock}</span>
              <span><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-200">{product.status}</span></span>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
