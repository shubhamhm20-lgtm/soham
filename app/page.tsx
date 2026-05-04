"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { categories, categoryImages } from "@/lib/products";
import { getProducts } from "@/lib/storage";

export default function HomePage() {
  const allProducts = useMemo(() => getProducts(), []);
  const featured = useMemo(() => allProducts.filter((product) => product.featured), [allProducts]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Modern <br /> Craftsmanship</h1>
          <p>Exquisite imitation jewellery designed for the bold and the beautiful. <br /> Elevate your festive look with SOHAM SALES.</p>
          <div className="hero-actions">
            <Link className="button" href="/shop">Shop Collection</Link>
            <Link className="ghost-button" href="/wholesale">Bulk Inquiry</Link>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=90"
          alt="Luxury Jewellery Lifestyle"
          width={1800}
          height={1000}
          priority
          className="hero-img"
        />
      </section>

      {/* Category Section - New Circle Style */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
            <p className="muted">Discover our curated pieces</p>
          </div>
          <div className="category-list">
            {categories.map((category) => (
              <Link href={`/shop?category=${encodeURIComponent(category)}`} key={category} className="category-item">
                <div className="category-circle">
                  <Image 
                    src={categoryImages[category]} 
                    alt={category} 
                    width={200} 
                    height={200}
                  />
                </div>
                <h3>{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section" style={{ background: '#fcfcfc' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Bestsellers</h2>
            <p className="muted">Handpicked for their elegance and shine</p>
          </div>
          <div className="product-grid">
            {featured.length > 0 ? (
              featured.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
                Fetching the collection...
              </p>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Link href="/shop" className="button">Browse All Pieces</Link>
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="section">
        <div className="container">
          <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: 30 }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 15 }}>The SOHAM Promise</h4>
              <p className="muted" style={{ fontSize: '0.9rem' }}>Uncompromising quality in every design, ensuring you shine at every occasion.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 15 }}>Retail & Wholesale</h4>
              <p className="muted" style={{ fontSize: '0.9rem' }}>Flexible solutions for single buyers and bulk boutique partnerships.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 15 }}>Ethical Sourcing</h4>
              <p className="muted" style={{ fontSize: '0.9rem' }}>Supporting local artisans in Rajkot to bring traditional art to the world.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
