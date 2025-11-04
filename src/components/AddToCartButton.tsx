"use client";

import { Check, ShoppingCartPlus } from "tabler-icons-react";

import { useCart } from "@/store/cartStore";
import { useState } from "react";

export function AddToCartButton({
  id,
  title,
  price,
  image,
}: {
  id: number;
  title: string;
  price: number;
  image: string;
}) {
  const add = useCart((s) => s.add);
  const [adding, setAdding] = useState(false);
  const [done, setDone] = useState(false);

  const handleAdd = async () => {
    try {
      setAdding(true);
      add({ id, title, price, image }, 1);
      setDone(true);
      setTimeout(() => setDone(false), 600);
    } finally {
      setAdding(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className={`px-5 py-2 flex flex-row gap-2 max-w-max justify-center items-center rounded-lg text-white transition
        ${done ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}
        disabled:opacity-60`}
      aria-label="Add to cart"
    >
      {done ? (
        <>
          <Check />
          Added
        </>
      ) : adding ? (
        <>Adding...</>
      ) : (
        <>
          <ShoppingCartPlus /> Add to Cart
        </>
      )}
    </button>
  );
}
