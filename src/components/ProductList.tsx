import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function ProductList() {
  const products = await getProducts();

  if (!products.length)
    return (
      <EmptyState
        title="No products found"
        description="Please try again later."
      />
    );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
