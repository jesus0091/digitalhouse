"use client";

import { ArrowLeft, Check, ShoppingCartPlus } from "tabler-icons-react";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { getProductById } from "@/lib/api";
import { useCart } from "@/store/cartStore";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";

const fetcher = async (id: string): Promise<Product> => getProductById(id);

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? ["product", id] : null, () => fetcher(id!));

  const qty = useCart((s) => s.getQtyById(Number(product?.id)));

  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center p-6">
        <div className="max-w-6xl mx-auto w-full bg-white h-[40vh] rounded-xl animate-pulse flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex w-full justify-center items-center p-6">
        <div className="max-w-6xl mx-auto w-full bg-white h-[40vh] rounded-xl flex items-center justify-center">
          <p className="p-6 text-red-600">Failed to fetch product</p>
        </div>
      </div>
    );
  if (!product)
    return (
      <div className="flex w-full justify-center items-center p-6">
        <div className="max-w-6xl mx-auto w-full bg-white h-[40vh] rounded-xl flex items-center justify-center">
          <p className="p-6 text-red-600">Product Not Found</p>
        </div>
      </div>
    );

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      <button
        onClick={handleBack}
        className="flex flex-row gap-2 items-center px-4 py-2 bg-black text-sm cursor-pointer text-white rounded-xl max-w-max"
      >
        <ArrowLeft />
        Back
      </button>
      <div className="flex flex-col md:flex-row w-full gap-6 bg-white rounded-xl p-6">
        <div className="rounded-xl p-6 h-80 aspect-square bg-white relative">
          <Image
            unoptimized
            src={product.image}
            alt={product.title}
            className="object-contain w-full p-8"
            fill
          />
        </div>
        <div className="border-l pl-6 border-gray-300 flex flex-col gap-1">
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-blue-600 capitalize text-sm">
              {product.category}
            </p>
            <h1 className="text-xl font-bold ">{product.title}</h1>
            <div className="flex items-center justify-between">
              <span className="text-3xl">${product.price.toFixed(2)}</span>
            </div>
            <p className="text-gray-700 mb-6 text-sm">{product.description}</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              {qty > 0 && (
                <span
                  className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700"
                  aria-label="Cantidad en carrito"
                >
                  En carrito: {qty}
                </span>
              )}
            </div>
            <AddToCartButton
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

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
