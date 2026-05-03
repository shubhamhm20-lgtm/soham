"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatInr, getFlatShippingFee } from "@/lib/products";
import { getProducts } from "@/lib/storage";
import type { CartItem, Product } from "@/lib/types";

export default function CartPage() {
  const { items, updateItem, removeItem } = useCart();
  const allProducts = useMemo(() => getProducts(), []);

  const rows = useMemo(
    () =>
      items
        .map((item) => ({ item, product: allProducts.find((product) => product.id === item.productId) }))
        .filter((row): row is { item: CartItem; product: Product } => !!row.product),
    [items, allProducts]
  );
  const subtotal = rows.reduce((sum, row) => sum + row.product.price_inr * row.item.quantity, 0);
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
                <Image src={product.images[0]} alt={product.name} width={84} height={96} style={{ objectFit: "cover", borderRadius: 8 }} />
                <div>
                  <h3>{product.name}</h3>
                  <p className="muted">{formatInr(product.price_inr)}</p>
                </div>
                <div className="split-actions">
                  <div className="quantity-control">
                    <button type="button" onClick={() => updateItem(item.productId, item.quantity - 1)}>
                      <Minus size={15} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.quantity < product.stock) {
                          updateItem(item.productId, item.quantity + 1);
                        }
                      }}
                      disabled={item.quantity >= product.stock}
                    >
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
