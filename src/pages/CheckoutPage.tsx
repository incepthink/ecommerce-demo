import React from "react";
import { useStore } from "@/lib/StoreContext";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema, paymentSchema, ShippingFormData, PaymentFormData } from "@/lib/schemas";
import { saveOrder } from "@/lib/storage";
import { Order, PaymentMeta } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";

function detectCardBrand(num: string): string {
  if (num.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(num)) return "Mastercard";
  if (/^3[47]/.test(num)) return "Amex";
  return "Card";
}

const InputField = React.forwardRef<HTMLInputElement, { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, error, ...props }, ref) => (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input ref={ref} {...props} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
);

export default function CheckoutPage() {
  const { cart, user, emptyCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);

  const shippingForm = useForm<ShippingFormData>({ resolver: zodResolver(shippingSchema) });
  const paymentForm = useForm<PaymentFormData>({ resolver: zodResolver(paymentSchema) });

  const items = cart.map((ci) => {
    const product = products.find((p) => p.id === ci.productId)!;
    return { product, quantity: ci.quantity };
  }).filter((i) => i.product);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Nothing to checkout</h1>
        <a href="/products" className="text-primary hover:underline">Go shopping →</a>
      </div>
    );
  }

  const onShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep("payment");
  };

  const onPaymentSubmit = (data: PaymentFormData) => {
    if (!shippingData) {
      toast.error("Please complete shipping first");
      setStep("shipping");
      return;
    }
    if (!user) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }

    const paymentMeta: PaymentMeta = {
      brand: detectCardBrand(data.cardNumber),
      last4: data.cardNumber.slice(-4),
      expMonth: data.expMonth,
      expYear: data.expYear,
    };

    const order: Order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      userId: user.id,
      items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
      shipping: shippingData as import("@/lib/types").ShippingInfo,
      payment: paymentMeta,
      subtotal,
      tax,
      total,
      status: "PLACED",
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    emptyCart();
    toast.success("Order placed successfully!");
    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="container-page py-8 space-y-8">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>

      {/* Steps indicator */}
      <div className="flex gap-4 text-sm">
        <span className={step === "shipping" ? "font-bold text-primary" : "text-muted-foreground"}>1. Shipping</span>
        <span className="text-muted-foreground">→</span>
        <span className={step === "payment" ? "font-bold text-primary" : "text-muted-foreground"}>2. Payment</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "shipping" ? (
            <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-4">
              <h2 className="font-display text-xl font-bold">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Full Name" {...shippingForm.register("fullName")} error={shippingForm.formState.errors.fullName?.message} />
                <InputField label="Email" type="email" {...shippingForm.register("email")} error={shippingForm.formState.errors.email?.message} />
                <InputField label="Phone" {...shippingForm.register("phone")} error={shippingForm.formState.errors.phone?.message} />
                <InputField label="Address" {...shippingForm.register("address")} error={shippingForm.formState.errors.address?.message} />
                <InputField label="City" {...shippingForm.register("city")} error={shippingForm.formState.errors.city?.message} />
                <InputField label="State" {...shippingForm.register("state")} error={shippingForm.formState.errors.state?.message} />
                <InputField label="ZIP Code" {...shippingForm.register("zip")} error={shippingForm.formState.errors.zip?.message} />
                <InputField label="Country" {...shippingForm.register("country")} error={shippingForm.formState.errors.country?.message} />
              </div>
              <button type="submit" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform">
                Continue to Payment
              </button>
            </form>
          ) : (
            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
              <h2 className="font-display text-xl font-bold">Payment</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <InputField label="Card Number" placeholder="4242424242424242" {...paymentForm.register("cardNumber")} error={paymentForm.formState.errors.cardNumber?.message} />
                </div>
                <InputField label="Name on Card" {...paymentForm.register("cardName")} error={paymentForm.formState.errors.cardName?.message} />
                <div className="grid grid-cols-3 gap-2">
                  <InputField label="Month" placeholder="01" {...paymentForm.register("expMonth")} error={paymentForm.formState.errors.expMonth?.message} />
                  <InputField label="Year" placeholder="28" {...paymentForm.register("expYear")} error={paymentForm.formState.errors.expYear?.message} />
                  <InputField label="CVV" placeholder="123" {...paymentForm.register("cvv")} error={paymentForm.formState.errors.cvv?.message} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">CVV is never stored.</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep("shipping")} className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                  ← Back
                </button>
                <button type="submit" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform">
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="rounded-lg border border-border bg-card p-6 h-fit space-y-4">
          <h3 className="font-display font-bold">Order Summary</h3>
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{i.product.name} × {i.quantity}</span>
                <span>${(i.product.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-display font-bold text-base pt-1 border-t border-border">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
