"use client";

import { ArrowLeft, Trash } from "tabler-icons-react";

import EmptyState from "@/components/EmptyState";
import Image from "next/image";
import Link from "next/link";
import QuantityInput from "@/components/QuantityInput";
import { useCart } from "@/store/cartStore";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const subtotal = useCart((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  );

  if (!items.length)
    return (
      <main className="p-6 max-w-6xl mx-auto flex flex-col gap-4">
        <Link
          href="/"
          className="bg-black text-white px-4 py-2 rounded-lg max-w-max flex flex-row gap-2 items-center"
        >
          <ArrowLeft />
          Back to shop
        </Link>
        <EmptyState title="Your cart is empty" />
      </main>
    );

  return (
    <main className="max-w-6xl mx-auto p-6 flex flex-col gap-4">
      <Link
        href="/"
        className="bg-black text-white px-4 py-2 rounded-lg max-w-max flex flex-row gap-2 items-center"
      >
        <ArrowLeft />
        Back to shop
      </Link>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl px-6 py-3 bg-white"
            >
              <div className="relative w-16 h-16">
                <Image
                  unoptimized
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <p className="font-medium line-clamp-1">{item.title}</p>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <QuantityInput
                value={item.qty}
                onChange={(v) => setQty(item.id, v)}
              />

              <button
                onClick={() => remove(item.id)}
                className="text-sm gap-2 items-center grid place-content-center rounded-md bg-red-100 h-8 w-8"
                aria-label="Remove from cart"
              >
                <Trash className="w-4" />
              </button>
            </div>
          ))}
        </div>

        <aside className="sticky top-23 bg-white rounded-xl p-4 h-fit">
          <p className="text-lg font-semibold mb-2">Summary</p>
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <Link
            href="/checkout"
            className="mt-4 w-full flex px-6 justify-center text-center bg-blue-600 text-white py-2 rounded-lg"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
