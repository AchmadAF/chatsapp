export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Edit Produk</h1>
      <p className="mt-2 text-slate-500">Product ID: {id}</p>
    </main>
  );
}
