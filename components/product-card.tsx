"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatInr } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <Link href={`/product/${product.slug}`}>
        <Image src={product.images[0]} alt={product.name} width={600} height={750} style={{ width: "100%", height: "auto", aspectRatio: "4/5", objectFit: "cover" }} />
      </Link>
      <div className="product-card-body">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <p className="price">{formatInr(product.price_inr)}</p>
        <div className="split-actions">
          <Link className="ghost-button" href={`/product/${product.slug}`}>
            View
          </Link>
          <button className="button secondary" onClick={() => addItem(product.id)} type="button">
            <ShoppingBag size={17} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
