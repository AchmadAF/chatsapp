import { AppShell, Panel } from "@/components/app/shell";

const orders = [
  ["ORD-001", "Siti Rahma", "pending_payment", "Rp125.000"],
  ["ORD-002", "Budi Santoso", "paid", "Rp99.000"],
  ["ORD-003", "Rina", "processing", "Rp250.000"],
];

export default function OrdersPage() {
  return (
    <AppShell title="Order" subtitle="Track order dari WhatsApp sampai done.">
      <Panel title="Order terbaru">
        <div className="overflow-hidden rounded-xl border border-white/10">
          {orders.map(([id, customer, status, total]) => (
            <div className="grid grid-cols-4 border-b border-white/10 p-4 text-sm last:border-0" key={id}>
              <span className="font-semibold text-white">{id}</span><span>{customer}</span><span className="text-emerald-200">{status}</span><span>{total}</span>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
