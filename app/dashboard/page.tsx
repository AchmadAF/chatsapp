import { AppShell, Panel, StatCard } from "@/components/app/shell";

const cards = [
  { label: "Total chat", value: 128, tone: "emerald" as const },
  { label: "Unread chat", value: 14, tone: "sky" as const },
  { label: "Pending payment", value: 9, tone: "amber" as const },
  { label: "Paid order", value: 42, tone: "violet" as const },
  { label: "Revenue", value: "Rp12,8jt", tone: "rose" as const },
];

const activities = [
  ["628123xxxx", "Invoice dikirim", "2 menit lalu"],
  ["628987xxxx", "Payment paid", "8 menit lalu"],
  ["628555xxxx", "Butuh follow-up", "15 menit lalu"],
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Ringkasan performa CS, order, dan payment hari ini.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => <StatCard key={card.label} {...card} />)}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Aktivitas terbaru">
          <div className="space-y-3">
            {activities.map(([phone, action, time]) => (
              <div key={phone + action} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">{phone}</p>
                  <p className="text-sm text-slate-400">{action}</p>
                </div>
                <span className="text-xs text-slate-500">{time}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Pipeline order">
          <div className="space-y-4">
            {["pending_payment", "paid", "processing", "shipped"].map((status, index) => (
              <div key={status}>
                <div className="mb-2 flex justify-between text-sm"><span>{status}</span><span>{12 - index * 2}</span></div>
                <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-emerald-400" style={{ width: `${85 - index * 15}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Aksi cepat">
          <div className="grid gap-3">
            {['Buat order', 'Kirim invoice', 'Follow-up unpaid', 'Export CSV'].map((item) => (
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/10" key={item}>{item}</button>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
