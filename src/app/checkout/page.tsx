"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import QuantityInput from "@/components/QuantityInput";
import { Trash } from "tabler-icons-react";
import { useCart } from "@/store/cartStore";
import { useCheckout } from "@/store/checkoutStore";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const computeShipping = (subtotal: number) => 0;

const checkoutSchema = z.object({
  name: z.string().min(2, "Please enter a valid name"),
  email: z.string().email("Invalid email"),
  address: z.string().min(4, "Address is too short"),
  country: z.string().min(2, "Country is required"),
});
type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clearCart = useCart((s) => s.clear);

  const subtotal = useCart((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  );
  const shipping = useMemo(() => computeShipping(subtotal), [subtotal]);
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const setOrder = useCheckout((s) => s.setOrder);

  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", address: "", country: "Argentina" },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    try {
      setFormError(null);
      setProcessing(true);

      const order = {
        customer: {
          name: values.name,
          email: values.email,
          address: values.address,
          country: values.country,
        },
        items: items.map((i) => ({
          id: i.id,
          title: i.title,
          qty: i.qty,
          price: i.price,
        })),
        amounts: { subtotal, shipping, total },
      };

      setOrder(order);
      router.push("/success");
      clearCart();
    } catch {
      setFormError("No pudimos procesar tu pedido. Intenta nuevamente.");
    } finally {
      setProcessing(false);
    }
  };

  const onInvalid = () => setFormError("Revisá los campos resaltados.");

  if (items.length === 0) {
    return (
      <main className="p-6 max-w-6xl mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="text-gray-600">Tu carrito está vacío.</p>
        <Link
          href="/"
          className="bg-black text-white px-4 py-2 rounded-lg max-w-max"
        >
          Back to shop
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <Link href="/" className="text-sm underline">
          Continue shopping
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2 space-y-2">
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

              <div className="flex-1 min-w-0">
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
                className="text-sm grid place-content-center rounded-md bg-red-100 h-8 w-8"
                aria-label="Remove from cart"
                title="Eliminar del carrito"
              >
                <Trash className="w-4" />
              </button>
            </div>
          ))}
        </section>

        <aside className="bg-white rounded-xl p-4 h-fit sticky top-20">
          <p className="text-lg font-semibold mb-2">Resumen</p>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping {shipping === 0 ? "(Free)" : ""}</span>
              <span>
                {shipping === 0 ? "$0.00" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="mt-4 space-y-3"
            noValidate
          >
            <p className="text-sm font-semibold">Contact Details</p>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <input
                  {...register("name")}
                  placeholder="Fullname"
                  className="border rounded-md px-3 py-2 w-full"
                  aria-invalid={!!errors.name || undefined}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="border rounded-md px-3 py-2 w-full"
                  aria-invalid={!!errors.email || undefined}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm font-semibold pt-2">Address</p>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <input
                  {...register("address")}
                  placeholder="Address"
                  className="border rounded-md px-3 py-2 w-full"
                  aria-invalid={!!errors.address || undefined}
                />
                {errors.address && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("country")}
                  placeholder="País"
                  className="border rounded-md px-3 py-2 w-full"
                  aria-invalid={!!errors.country || undefined}
                />
                {errors.country && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            {formError && <p className="text-red-600 text-sm">{formError}</p>}

            <button
              type="submit"
              disabled={processing || isSubmitting}
              className={`mt-2 w-full flex px-6 justify-center text-center bg-blue-600 text-white py-2 rounded-lg ${
                processing || isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {processing || isSubmitting
                ? "Processing..."
                : "Complete Purchase"}
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}
