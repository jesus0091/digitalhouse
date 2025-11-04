import type { CartItem } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
  getQtyById: (id: number) => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, qty }] });
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      setQty: (id, qty) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(qty, 1) } : i
          ),
        }),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      getQtyById: (id) => get().items.find((i) => i.id === id)?.qty ?? 0, // 👈 NUEVO
    }),
    { name: "cart-store" }
  )
);
