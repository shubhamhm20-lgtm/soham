"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatInr, getFlatShippingFee, sampleProducts } from "@/lib/products";

export default function CartPage() {
  const { items, updateItem, removeItem } = useCart();
  const rows = items
    .map((item) => ({ item, product: sampleProducts.find((product) => product.id === item.productId) }))
    .filter((row) => row.product);
  const subtotal = rows.reduce((sum, row) => sum + row.product!.price_inr * row.item.quantity, 0);
  const shipping = rows.length ? getFlatShippingFee() : 0;

  return (
    <section className="container page checkout-layout">
      <div>
        <p className="eyebrow">Cart</p>
        <h1>Your selected pieces</h1>
        <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
          {rows.length === 0 ? (
            <div className="panel">
              <p className="lead">Your cart is empty.</p>
              <Link className="button" href="/shop">
                Continue shopping
              </Link>
            </div>
          ) : (
            rows.map(({ item, product }) => (
              <div className="cart-row" key={item.productId}>
                <img src={product!.images[0]} alt={product!.name} />
                <div>
                  <h3>{product!.name}</h3>
                  <p className="muted">{formatInr(product!.price_inr)}</p>
                </div>
                <div className="split-actions">
                  <div className="quantity-control">
                    <button type="button" onClick={() => updateItem(item.productId, item.quantity - 1)}>
                      <Minus size={15} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateItem(item.productId, item.quantity + 1)}>
                      <Plus size={15} />
                    </button>
                  </div>
                  <button className="icon-button" type="button" onClick={() => removeItem(item.productId)} aria-label="Remove item">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <aside className="panel">
        <h2>Summary</h2>
        <div className="summary-line">
          <span>Subtotal</span>
          <strong>{formatInr(subtotal)}</strong>
        </div>
        <div className="summary-line">
          <span>Flat shipping</span>
          <strong>{formatInr(shipping)}</strong>
        </div>
        <div className="summary-line total">
          <span>Total</span>
          <span>{formatInr(subtotal + shipping)}</span>
        </div>
        <Link className="button" href="/checkout" style={{ width: "100%", marginTop: 16 }}>
          Checkout
        </Link>
      </aside>
    </section>
  );
}
