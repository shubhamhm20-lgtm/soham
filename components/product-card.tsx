"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart-provider";
import { formatInr } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  
  // Simulated discount for aesthetic consistency with Palmonas
  const originalPrice = Math.round(product.price_inr * 1.4);
  const discount = 28; // approx 28% off

  return (
    <article className="product-card">
      <Link href={`/product/${product.slug}`}>
        <div className="product-img-wrapper">
          {product.featured && <span className="product-badge">Bestseller</span>}
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            width={600} 
            height={600} 
            className="product-img"
          />
        </div>
      </Link>
      
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <div className="product-price">
          <span className="price-old">{formatInr(originalPrice)}</span>
          <span>{formatInr(product.price_inr)}</span>
          <span className="discount-tag"> ({discount}% OFF)</span>
        </div>
        
        <button 
          className="button" 
          style={{ width: '100%', marginTop: 15, padding: '10px 0', fontSize: '0.75rem' }}
          onClick={() => addItem(product.id)}
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}
