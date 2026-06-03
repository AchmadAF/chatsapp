import { AppShell, Panel } from "@/components/app/shell";

const templates = ["Sapaan", "Invoice", "Payment success", "Payment expired", "Order processing", "Order shipped", "Follow-up pending payment"];

export default function TemplatesPage() {
  return (
    <AppShell title="Template Pesan" subtitle="Quick reply untuk CS dan automation.">
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => <Panel key={template} title={template}><p className="text-sm text-slate-400">Template siap dipakai dengan variable order/customer.</p></Panel>)}
      </div>
    </AppShell>
  );
}
