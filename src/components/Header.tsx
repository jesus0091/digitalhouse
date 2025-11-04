"use client";

import { Menu, ShoppingCart } from "tabler-icons-react";

import Link from "next/link";
import { useCart } from "@/store/cartStore";

export default function Header() {
  const { items } = useCart();
  console.debug(items);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center bg-white border-b border-gray-200 p-4">
      <Link
        href="/"
        className="text-lg font-semibold flex flex-row items-center gap-2"
      >
        <Menu /> Digital House
      </Link>
      <Link
        href="/cart"
        className="relative h-10 w-10 bg-gray-200 rounded-full inline-flex items-center justify-center"
      >
        <span className="text-2xl">
          <ShoppingCart />
        </span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </header>
  );
}
