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
          <h1>Handcrafted <br /> Elegance</h1>
          <p>Discover our curated collection of premium imitation jewellery. <br /> Timeless designs for the modern woman.</p>
          <div className="hero-actions">
            <Link className="button" href="/shop">Shop New Arrivals</Link>
            <Link className="ghost-button" href="/wholesale">Wholesale Inquiry</Link>
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

      {/* Category Grid Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
            <p className="muted">Explore our signature collections</p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link href={`/shop?category=${encodeURIComponent(category)}`} key={category} className="category-card">
                <Image 
                  src={categoryImages[category]} 
                  alt={category} 
                  width={500} 
                  height={500}
                />
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
            <h2>Bestsellers</h2>
            <p className="muted">Most loved pieces by our customers</p>
          </div>
          <div className="product-grid">
            {featured.length > 0 ? (
              featured.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
                Loading our best pieces...
              </p>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Link href="/shop" className="button">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Brand Ethos / Stats Section */}
      <section className="section">
        <div className="container">
          <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: 30 }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 15 }}>Premium Quality</h4>
              <p className="muted" style={{ fontSize: '0.9rem' }}>High-grade materials that mimic the shine and feel of real gold and diamonds.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 15 }}>Fast Delivery</h4>
              <p className="muted" style={{ fontSize: '0.9rem' }}>Reliable shipping across India and international wholesale logistics.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: 15 }}>Craftsmanship</h4>
              <p className="muted" style={{ fontSize: '0.9rem' }}>Every piece is inspected for detail and durability before it reaches you.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
