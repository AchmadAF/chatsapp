export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-emerald-500)/20,transparent_32%),linear-gradient(135deg,var(--color-slate-950),var(--color-slate-900)_55%,var(--color-slate-950))] px-6 py-10 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm font-medium text-emerald-300">WhatsApp Commerce</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">CS/Admin dashboard buat jualan via WhatsApp.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">Kelola chat, produk, order, payment, automation, dan customer history dari satu tempat.</p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {['Inbox cepat', 'Order rapi', 'Follow-up otomatis'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 shadow-2xl shadow-black/20 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>
        <form className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8" method="post" action="/api/auth/login">
          <div>
            <p className="text-sm font-medium text-emerald-300">Login Admin</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Masuk ke dashboard</h2>
            <p className="mt-2 text-sm text-slate-400">Gunakan akun yang sudah terdaftar.</p>
          </div>
          <div className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-slate-200">
              Email
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10" name="email" placeholder="admin@chatsapp.local" type="email" required />
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Password
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10" name="password" placeholder="••••••••" type="password" required />
            </label>
            <button className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20" type="submit">Masuk</button>
          </div>
        </form>
      </section>
    </main>
  );
}
