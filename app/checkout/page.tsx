"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatInr, getFlatShippingFee, sampleProducts } from "@/lib/products";
import { saveOrder } from "@/lib/storage";
import type { CustomerAddress, PaymentMethod } from "@/lib/types";

const emptyCustomer: CustomerAddress = {
  name: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: ""
};

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("manual_payment");
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rows = useMemo(
    () =>
      items
        .map((item) => ({ item, product: sampleProducts.find((product) => product.id === item.productId) }))
        .filter((row) => row.product),
    [items]
  );
  const subtotal = rows.reduce((sum, row) => sum + row.product!.price_inr * row.item.quantity, 0);
  const shippingFee = rows.length ? getFlatShippingFee() : 0;
  const total = subtotal + shippingFee;

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rows.length) return;
    setIsSubmitting(true);

    if (paymentMethod === "online_razorpay") {
      await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total })
      });
    }

    const id = `SJ-${Date.now().toString().slice(-7)}`;
    saveOrder({
      id,
      createdAt: new Date().toISOString(),
      customer,
      items: rows.map(({ item, product }) => ({
        productId: product!.id,
        name: product!.name,
        price_inr: product!.price_inr,
        quantity: item.quantity
      })),
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "online_razorpay" ? "pending" : "pending",
      orderStatus: "pending"
    });
    clearCart();
    setConfirmation(id);
    setIsSubmitting(false);
  }

  if (confirmation) {
    return (
      <section className="container page">
        <div className="panel">
          <p className="eyebrow">Order placed</p>
          <h1>Thank you for shopping with Soham Jewels.</h1>
          <p className="lead">Your order number is {confirmation}. We will confirm payment and delivery details shortly.</p>
          <Link className="button" href="/shop">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container page checkout-layout">
      <form className="panel" onSubmit={submitOrder}>
        <p className="eyebrow">Checkout</p>
        <h1>Delivery details</h1>
        <div className="form-grid" style={{ marginTop: 24 }}>
          {(["name", "phone", "email", "addressLine1", "addressLine2", "city", "state", "pincode"] as const).map((field) => (
            <div className={`field ${field.includes("address") ? "full" : ""}`} key={field}>
              <label htmlFor={field}>{fieldLabel(field)}</label>
              <input
                id={field}
                required={field !== "addressLine2"}
                value={customer[field] || ""}
                onChange={(event) => setCustomer({ ...customer, [field]: event.target.value })}
              />
            </div>
          ))}
          <div className="field full">
            <label htmlFor="payment">Payment method</label>
            <select id="payment" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
              <option value="manual_payment">Manual payment / COD / UPI follow-up</option>
              <option value="online_razorpay">Online payment with Razorpay</option>
            </select>
          </div>
        </div>
        <button className="button secondary" type="submit" disabled={isSubmitting || !rows.length} style={{ marginTop: 20 }}>
          {isSubmitting ? "Placing order..." : "Place order"}
        </button>
      </form>

      <aside className="panel">
        <h2>Order summary</h2>
        {rows.map(({ item, product }) => (
          <div className="summary-line" key={item.productId}>
            <span>
              {product!.name} x {item.quantity}
            </span>
            <strong>{formatInr(product!.price_inr * item.quantity)}</strong>
          </div>
        ))}
        <div className="summary-line">
          <span>Flat shipping</span>
          <strong>{formatInr(shippingFee)}</strong>
        </div>
        <div className="summary-line total">
          <span>Total</span>
          <span>{formatInr(total)}</span>
        </div>
        <div className="notice" style={{ marginTop: 16 }}>
          Razorpay order creation is wired through `/api/razorpay/order`; add keys in `.env.local` for live test mode.
        </div>
      </aside>
    </section>
  );
}

function fieldLabel(field: keyof CustomerAddress) {
  const labels: Record<keyof CustomerAddress, string> = {
    name: "Full name",
    phone: "Phone",
    email: "Email",
    addressLine1: "Address line 1",
    addressLine2: "Address line 2",
    city: "City",
    state: "State",
    pincode: "PIN code"
  };
  return labels[field];
}
