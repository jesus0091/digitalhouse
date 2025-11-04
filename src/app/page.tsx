import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  if (!products.length)
    return (
      <EmptyState
        title="No products found"
        description="Please try again later."
      />
    );

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
