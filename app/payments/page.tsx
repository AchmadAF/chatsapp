import { AppShell, Panel, StatCard } from "@/components/app/shell";

export default function PaymentsPage() {
  return (
    <AppShell title="Payment" subtitle="Monitor Midtrans transaction dan invoice link.">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Pending" value="9" tone="amber" />
        <StatCard label="Paid" value="42" tone="emerald" />
        <StatCard label="Expired" value="3" tone="rose" />
        <StatCard label="Revenue" value="Rp12,8jt" tone="violet" />
      </div>
      <div className="mt-6"><Panel title="Payment activity"><p className="text-slate-400">Midtrans callback update otomatis ke payment dan order.</p></Panel></div>
    </AppShell>
  );
}
