export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Tambah Produk</h1>
      <form className="mt-6 space-y-4">
        {[
          ["name", "Name"],
          ["sku", "SKU"],
          ["description", "Description"],
          ["price", "Price"],
          ["stock", "Stock"],
          ["imageUrl", "Image URL"],
        ].map(([name, label]) => (
          <input className="w-full rounded-lg border p-3" key={name} name={name} placeholder={label} />
        ))}
        <select className="w-full rounded-lg border p-3" name="status">
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </form>
    </main>
  );
}
