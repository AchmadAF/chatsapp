"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AppShell, Panel } from "@/components/app/shell";

type Device = {
  id: string;
  phone_number?: string;
  display_name?: string;
  state?: string;
  jid?: string;
  created_at?: string;
};

type ApiResponse<T> = {
  message?: string;
  results?: T;
  error?: unknown;
};

export default function WhatsappSettingsPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [qrLink, setQrLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function request<T>(url: string, init?: RequestInit) {
    setLoading(true);
    setMessage("");
    const response = await fetch(url, init);
    const data = (await response.json().catch(() => ({}))) as ApiResponse<T>;
    setLoading(false);
    if (!response.ok) {
      setMessage(typeof data.error === "string" ? data.error : "Request gagal");
      return null;
    }
    setMessage(data.message ?? "Berhasil");
    return data.results ?? null;
  }

  const loadSettings = useCallback(async () => {
    const results = await request<{ baseUrl?: string }>("/api/settings/whatsapp");
    setBaseUrl(results?.baseUrl ?? "");
  }, []);

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await request<{ baseUrl?: string }>("/api/settings/whatsapp", { method: "POST", body: JSON.stringify({ baseUrl }) });
  }

  const loadDevices = useCallback(async () => {
    const results = await request<Device[]>("/api/whatsapp/devices");
    setDevices(Array.isArray(results) ? results : []);
  }, []);

  async function addDevice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const results = await request<Device>("/api/whatsapp/devices", { method: "POST", body: JSON.stringify({ device_id: deviceId || undefined }) });
    if (results?.id) setDeviceId(results.id);
    await loadDevices();
  }

  async function loginQr(id: string) {
    const results = await request<{ qr_link?: string }>(`/api/whatsapp/devices/${encodeURIComponent(id)}/login`);
    setQrLink(results?.qr_link ?? "");
  }

  async function action(id: string, name: "status" | "reconnect" | "logout") {
    const method = name === "status" ? "GET" : "POST";
    const results = await request<{ is_connected?: boolean; is_logged_in?: boolean }>(`/api/whatsapp/devices/${encodeURIComponent(id)}/${name}`, { method });
    if (results && name === "status") setMessage(`Connected: ${results.is_connected ? "ya" : "tidak"}, login: ${results.is_logged_in ? "ya" : "tidak"}`);
    await loadDevices();
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadSettings();
      loadDevices();
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [loadSettings, loadDevices]);

  return (
    <AppShell title="Setting" subtitle="Atur URL backend WhatsApp dan login device via QR.">
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Panel title="Device monitor">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {devices.map((device) => (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={device.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{device.display_name || device.id}</p>
                    <p className="mt-1 break-all text-xs text-slate-400">{device.jid || device.phone_number || "Belum login"}</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">{device.state || "unknown"}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/15" onClick={() => action(device.id, "status")}>Status</button>
                  <button className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/15" onClick={() => action(device.id, "reconnect")}>Reconnect</button>
                  <button className="rounded-lg bg-emerald-500/20 px-3 py-2 text-xs text-emerald-100 hover:bg-emerald-500/30" onClick={() => loginQr(device.id)}>QR</button>
                  <button className="rounded-lg bg-rose-500/20 px-3 py-2 text-xs text-rose-100 hover:bg-rose-500/30" onClick={() => action(device.id, "logout")}>Logout</button>
                </div>
              </div>
            ))}
            {!devices.length ? <p className="text-sm text-slate-400">Belum ada device.</p> : null}
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Backend WhatsApp">
            <form className="space-y-3" onSubmit={saveSettings}>
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-emerald-400/50" placeholder="http://localhost:3000" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} />
              <button className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60" disabled={loading}>{loading ? "Loading..." : "Simpan URL"}</button>
            </form>
          </Panel>
          <Panel title="Tambah akun">
            <form className="space-y-3" onSubmit={addDevice}>
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-emerald-400/50" placeholder="device_id opsional" value={deviceId} onChange={(event) => setDeviceId(event.target.value)} />
              <button className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60" disabled={loading}>{loading ? "Loading..." : "Tambah device"}</button>
            </form>
            <div className="mt-3">
              <button className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm hover:bg-white/15" onClick={() => deviceId && loginQr(deviceId)}>Login QR</button>
            </div>
            {message ? <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-slate-300">{message}</p> : null}
            {qrLink ? <img alt="WhatsApp QR" className="mt-4 w-full rounded-xl border border-white/10 bg-white p-3" src={qrLink} /> : null} {/* eslint-disable-line @next/next/no-img-element */}
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
