import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderItem = {
  id: number;
  title: string;
  qty: number;
  price: number;
};

type OrderAmounts = {
  subtotal: number;
  shipping: number;
  total: number;
};

export type CheckoutOrder = {
  customer: {
    name: string;
    email: string;
    address: string;
    country: string;
  };
  items: OrderItem[];
  amounts: OrderAmounts;
};

type CheckoutState = {
  order: CheckoutOrder | null;
  setOrder: (order: CheckoutOrder) => void;
  clearOrder: () => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      order: null,
      setOrder: (order) => set({ order }),
      clearOrder: () => set({ order: null }),
    }),
    { name: "checkout-order" }
  )
);
