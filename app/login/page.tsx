export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="mt-6 space-y-4" method="post" action="/api/auth/login">
        <input className="w-full rounded-lg border p-3" name="email" placeholder="Email" type="email" required />
        <input className="w-full rounded-lg border p-3" name="password" placeholder="Password" type="password" required />
        <button className="w-full rounded-lg bg-slate-900 p-3 text-white" type="submit">Masuk</button>
      </form>
    </main>
  );
}
