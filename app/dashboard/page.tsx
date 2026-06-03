export default function DashboardPage() {
  const cards = [
    { label: "Total chat", value: 0 },
    { label: "Unread chat", value: 0 },
    { label: "Pending payment", value: 0 },
    { label: "Paid order", value: 0 },
    { label: "Revenue", value: "Rp0" },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <section className="rounded-xl border bg-white p-5 shadow-sm" key={card.label}>
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
