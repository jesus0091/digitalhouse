import ProductList from "@/components/ProductList";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <Suspense
        fallback={<p className="text-center py-10">Loading products...</p>}
      >
        <ProductList />
      </Suspense>
    </main>
  );
}
