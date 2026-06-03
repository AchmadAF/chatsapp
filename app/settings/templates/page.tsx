export default function TemplatesPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Template Pesan</h1>
      <ul className="mt-4 list-inside list-disc text-slate-700">
        <li>Sapaan</li>
        <li>Invoice</li>
        <li>Payment success</li>
        <li>Payment expired</li>
        <li>Order processing</li>
        <li>Order shipped</li>
        <li>Follow-up pending payment</li>
      </ul>
    </main>
  );
}
