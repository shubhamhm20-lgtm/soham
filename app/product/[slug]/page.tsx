"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatInr, getProductBySlug } from "@/lib/products";
import { getProducts } from "@/lib/storage";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const allProducts = getProducts();
  const product = getProductBySlug(params.slug, allProducts);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="container page">
        <h1>Product not found</h1>
        <p className="lead">This piece is no longer active in the catalog.</p>
        <Link className="button" href="/shop">Back to shop</Link>
      </section>
    );
  }

  // Simulated discount
  const originalPrice = Math.round(product.price_inr * 1.4);

  return (
    <section className="container page product-detail">
      <div className="product-img-wrapper" style={{ aspectRatio: 'auto' }}>
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          width={800} 
          height={1000} 
          className="gallery-main" 
          priority
          style={{ width: "100%", height: "auto", objectFit: "cover" }} 
        />
      </div>
      
      <div className="detail-panel" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
        <p className="product-category" style={{ fontSize: '0.85rem' }}>{product.category}</p>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 15 }}>{product.name}</h1>
        
        <div className="product-price" style={{ fontSize: '1.8rem', marginBottom: 20 }}>
          <span className="price-old" style={{ fontSize: '1.2rem' }}>{formatInr(originalPrice)}</span>
          <span>{formatInr(product.price_inr)}</span>
          <span className="discount-tag" style={{ fontSize: '1rem' }}> (28% OFF)</span>
        </div>

        <p className="muted" style={{ lineHeight: 1.8, marginBottom: 30 }}>{product.description}</p>
        
        <div style={{ marginBottom: 30 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Quantity</label>
          <div className="quantity-control">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="muted" style={{ fontSize: '0.8rem', marginTop: 8 }}>{product.stock} items available</p>
        </div>

        <div className="form-actions">
          <button 
            className="button" 
            style={{ flex: 1, padding: '18px' }}
            onClick={() => addItem(product.id, quantity)}
          >
            <ShoppingBag size={20} style={{ marginRight: 10 }} /> Add to Bag
          </button>
        </div>

        <div className="notice" style={{ marginTop: 30, background: 'var(--accent)', border: 'none', color: 'var(--black)' }}>
          <strong>Bulk Inquiry?</strong> Request a special quote for wholesale orders.
          <Link href={`/wholesale?product=${encodeURIComponent(product.name)}`} style={{ display: 'block', marginTop: 10, fontWeight: 700, textDecoration: 'underline' }}>
            Inquire Now
          </Link>
        </div>
      </div>
    </section>
  );
}
