import { AppShell, Panel } from "@/components/app/shell";

const chats = [
  ["Siti Rahma", "Mau beli paket hemat", "2m", "pending payment"],
  ["Budi Santoso", "Invoice sudah dikirim", "9m", "assigned"],
  ["Rina", "Harga produk demo berapa?", "18m", "hot lead"],
];

export default function InboxPage() {
  return (
    <AppShell title="Inbox WhatsApp" subtitle="List chat, detail pesan, quick reply, dan buat order dari chat.">
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Panel title="Chat masuk">
          <div className="space-y-3">
            {chats.map(([name, message, time, label]) => (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4" key={name}>
                <div className="flex justify-between"><p className="font-semibold text-white">{name}</p><span className="text-xs text-slate-500">{time}</span></div>
                <p className="mt-1 text-sm text-slate-400">{message}</p>
                <span className="mt-3 inline-block rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">{label}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Percakapan">
          <div className="space-y-4">
            <div className="max-w-md rounded-2xl bg-white/10 p-4 text-slate-200">Halo kak, mau tanya produk demo ready?</div>
            <div className="ml-auto max-w-md rounded-2xl bg-emerald-400 p-4 text-slate-950">Ready kak. Mau dibuatkan invoice?</div>
            <div className="flex gap-3 pt-4">
              <button className="rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950">Buat Order</button>
              <button className="rounded-xl border border-white/10 px-4 py-3 text-slate-200">Quick Reply</button>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
