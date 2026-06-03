import Link from "next/link";

const modules = [
  ["Dashboard", "/dashboard", "Ringkasan chat, order, payment"],
  ["Inbox", "/inbox", "Balas chat dan buat order"],
  ["Produk", "/products", "Kelola katalog produk"],
  ["Order", "/orders", "Track order WhatsApp"],
  ["Payment", "/payments", "Monitor Midtrans"],
  ["Automation", "/automation", "Intent, auto-reply, follow-up"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#10b98133,transparent_35%),linear-gradient(135deg,#020617,#0f172a_55%,#111827)] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur">
          <p className="text-sm font-medium text-emerald-300">WhatsApp + Midtrans Automation</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight">CS/Admin dashboard buat jualan via WhatsApp.</h1>
          <p className="mt-4 max-w-2xl text-slate-300">Kelola chat, produk, order, invoice, payment, follow-up, dan customer history dari satu dashboard.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/dashboard" className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950">Buka Dashboard</Link>
            <Link href="/inbox" className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-white">Inbox WhatsApp</Link>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {modules.map(([label, href, desc]) => (
            <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.08]" href={href} key={href}>
              <h2 className="font-semibold">{label}</h2>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
