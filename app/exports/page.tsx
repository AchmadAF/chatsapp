export default function ExportsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Export CSV</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <a className="rounded-xl border bg-white p-5 shadow-sm" href="/api/export/orders">Orders CSV</a>
        <a className="rounded-xl border bg-white p-5 shadow-sm" href="/api/export/payments">Payments CSV</a>
        <a className="rounded-xl border bg-white p-5 shadow-sm" href="/api/export/customers">Customers CSV</a>
      </div>
    </main>
  );
}
