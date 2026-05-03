"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatInr, getProductBySlug } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="container page">
        <h1>Product not found</h1>
        <p className="lead">This piece is no longer active in the catalog.</p>
        <Link className="button" href="/shop">
          Back to shop
        </Link>
      </section>
    );
  }

  return (
    <section className="container page product-detail">
      <div>
        <img className="gallery-main" src={product.images[0]} alt={product.name} />
      </div>
      <div className="panel detail-panel">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="lead">{product.description}</p>
        <p className="price" style={{ fontSize: "1.45rem" }}>
          {formatInr(product.price_inr)}
        </p>
        <p className="muted">{product.stock} in stock</p>
        <div className="split-actions">
          <div className="quantity-control" aria-label="Quantity selector">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
              <Plus size={16} />
            </button>
          </div>
          <button className="button secondary" type="button" onClick={() => addItem(product.id, quantity)}>
            <ShoppingBag size={18} /> Add to cart
          </button>
        </div>
        <div className="notice" style={{ marginTop: 18 }}>
          Bulk buyer? Request a quote for this piece and similar designs.
        </div>
        <div className="form-actions" style={{ marginTop: 18 }}>
          <Link className="button" href="/cart">
            Go to cart
          </Link>
          <Link className="ghost-button" href={`/wholesale?product=${encodeURIComponent(product.name)}`}>
            Ask for bulk price
          </Link>
        </div>
      </div>
    </section>
  );
}
