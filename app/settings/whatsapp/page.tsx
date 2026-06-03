import { AppShell, Panel } from "@/components/app/shell";

export default function WhatsappSettingsPage() {
  return (
    <AppShell title="WhatsApp Device" subtitle="Login QR, pairing code, reconnect, logout, dan status device.">
      <Panel title="Device monitor">
        <div className="grid gap-4 md:grid-cols-3">
          {['Device utama', 'Device backup', 'Device CS'].map((device, index) => (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4" key={device}>
              <p className="font-semibold text-white">{device}</p>
              <p className="mt-2 text-sm text-emerald-300">{index === 1 ? 'standby' : 'connected'}</p>
              <div className="mt-4 flex gap-2"><button className="rounded-lg bg-white/10 px-3 py-2 text-xs">Status</button><button className="rounded-lg bg-white/10 px-3 py-2 text-xs">Reconnect</button></div>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
