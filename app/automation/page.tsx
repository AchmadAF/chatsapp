import { AppShell, Panel } from "@/components/app/shell";

const items = ["Intent beli dari keyword", "Auto-reply produk", "Follow-up unpaid invoice", "Assign chat", "Label chat", "SLA alert"];

export default function AutomationPage() {
  return (
    <AppShell title="Automation" subtitle="Rule automation buat bantu CS closing order.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => <Panel key={item} title={item}><p className="text-sm text-slate-400">Aktif dan siap dihubungkan ke event WhatsApp.</p></Panel>)}
      </div>
    </AppShell>
  );
}
