"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Inbox", "/inbox"],
  ["Produk", "/products"],
  ["Order", "/orders"],
  ["Payment", "/payments"],
  ["Automation", "/automation"],
  ["SLA", "/sla"],
  ["Export", "/exports"],
  ["Stock", "/stock"],
  ["Customer", "/customers"],
  ["AI Reply", "/ai"],
  ["Setting", "/settings/whatsapp"],
  ["Template", "/settings/templates"],
];

export function AppShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 overflow-y-auto border-r border-white/10 bg-slate-950/95 p-6 lg:block">
        <Link href="/dashboard" className="block">
          <p className="text-sm font-medium text-emerald-300">WhatsApp Commerce</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">CS/Admin</h1>
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map(([label, href]) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} className={cn("block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white", active && "bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-400/20")}>
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-emerald-300">Automation Dashboard</p>
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
            </div>
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {nav.map(([label, href]) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link key={href} href={href} className={cn("shrink-0 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300", active && "border-emerald-400/30 bg-emerald-400/15 text-emerald-100")}>
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({ label, value, tone = "emerald" }: { label: string; value: string | number; tone?: "emerald" | "sky" | "amber" | "rose" | "violet" }) {
  const tones = {
    emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-200",
    sky: "from-sky-500/20 to-sky-500/5 text-sky-200",
    amber: "from-amber-500/20 to-amber-500/5 text-amber-200",
    rose: "from-rose-500/20 to-rose-500/5 text-rose-200",
    violet: "from-violet-500/20 to-violet-500/5 text-violet-200",
  };

  return (
    <section className={`rounded-2xl border border-white/10 bg-gradient-to-br p-5 shadow-2xl shadow-black/20 ${tones[tone]}`}>
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </section>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}
