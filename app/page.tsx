import Link from "next/link";

const modules = [
  ["Dashboard", "/dashboard"],
  ["Inbox", "/inbox"],
  ["Produk", "/products"],
  ["Order", "/orders"],
  ["Payment", "/payments"],
  ["Automation", "/automation"],
  ["SLA", "/sla"],
  ["Exports", "/exports"],
  ["Stock", "/stock"],
  ["Customers", "/customers"],
  ["AI Reply", "/ai"],
  ["WhatsApp", "/settings/whatsapp"],
  ["Template", "/settings/templates"],
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">CS/Admin Automation</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {modules.map(([label, href]) => (
          <Link className="rounded-xl border bg-white p-5 shadow-sm" href={href} key={href}>
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
