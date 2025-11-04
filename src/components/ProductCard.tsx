"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "tabler-icons-react";
import { useCart } from "@/store/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const qtyInCart = useCart((s) => s.getQtyById(product.id));

  const handleAddToCart = () => {
    add({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="rounded-xl flex flex-col bg-white overflow-clip">
      <Link
        className="flex-1 hover:bg-gray-100"
        href={`/product/${product.id}`}
        title="Go to product Details"
      >
        <div className="relative h-50 bg-white border-b border-gray-300">
          <Image
            unoptimized
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
          {qtyInCart > 0 && (
            <span
              className="absolute top-3 right-3 inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold"
              aria-label="Cantidad de este producto en el carrito"
              title="Cantidad de este producto en el carrito"
            >
              <ShoppingCart className="w-4" />
              {qtyInCart}
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="font-semibold line-clamp-2 leading-snug h-12">
            {product.title}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t px-4 py-2 border-gray-300">
        <span className="font-bold">${product.price.toFixed(2)}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white rounded-lg px-4 py-1 text-sm font-semibold active:bg-blue-700 transition-all cursor-pointer"
            aria-label="Add to cart"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
