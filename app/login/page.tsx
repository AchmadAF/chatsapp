export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--color-emerald-400)/28,transparent_28%),radial-gradient(circle_at_82%_8%,var(--color-cyan-400)/18,transparent_24%),radial-gradient(circle_at_52%_88%,var(--color-lime-400)/14,transparent_26%),linear-gradient(135deg,var(--color-slate-950),var(--color-slate-900)_52%,var(--color-emerald-950))]" />
      <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200 shadow-2xl shadow-emerald-950/30 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_var(--color-emerald-300)]" />
            WhatsApp Commerce
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-balance sm:text-6xl">Dashboard CS/Admin buat jualan via WhatsApp.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Kelola chat, produk, order, payment, automation, dan customer history dari satu tempat.</p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {['Inbox cepat', 'Order rapi', 'Follow-up otomatis'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-sm font-medium text-slate-100 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/[0.1]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full bg-white/[0.06] px-4 py-2">Multi admin</span>
            <span className="rounded-full bg-white/[0.06] px-4 py-2">SLA monitor</span>
            <span className="rounded-full bg-white/[0.06] px-4 py-2">AI reply helper</span>
          </div>
        </div>
        <form className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8" method="post" action="/api/auth/login">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-300">Login Admin</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Masuk dashboard</h2>
              <p className="mt-2 text-sm text-slate-400">Gunakan akun terdaftar untuk mulai bekerja.</p>
            </div>
            <div className="rounded-2xl bg-emerald-300/15 px-3 py-2 text-sm font-bold text-emerald-200">CS</div>
          </div>
          <div className="space-y-5">
            <label className="block text-sm font-medium text-slate-200">
              Email
              <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-white shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-emerald-300 focus:bg-slate-950/90 focus:ring-4 focus:ring-emerald-300/15" name="email" placeholder="admin@chatsapp.local" type="email" required />
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Password
              <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-white shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-emerald-300 focus:bg-slate-950/90 focus:ring-4 focus:ring-emerald-300/15" name="password" placeholder="••••••••" type="password" required />
            </label>
            <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 py-3.5 font-bold text-slate-950 shadow-xl shadow-emerald-950/40 transition hover:-translate-y-0.5 hover:from-emerald-200 hover:to-lime-200 focus:outline-none focus:ring-4 focus:ring-emerald-300/25" type="submit">Masuk sekarang</button>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">Akses aman untuk tim admin Chatsapp.</p>
        </form>
      </section>
    </main>
  );
}
