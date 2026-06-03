export default function AutomationPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Automation</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border bg-white p-5">
          <h2 className="font-semibold">Intent Detection</h2>
          <p className="mt-2 text-sm text-slate-500">Keyword mau beli, order, harga, dan match nama produk.</p>
        </section>
        <section className="rounded-xl border bg-white p-5">
          <h2 className="font-semibold">Follow-up Invoice</h2>
          <p className="mt-2 text-sm text-slate-500">H+0, H+1, before expired, stop otomatis jika paid.</p>
        </section>
      </div>
    </main>
  );
}
