"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gem, PackageCheck, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, categoryImages } from "@/lib/products";
import { getProducts } from "@/lib/storage";

export default function HomePage() {
  const allProducts = useMemo(() => getProducts(), []);
  const featured = useMemo(() => allProducts.filter((product) => product.featured), [allProducts]);

  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <p className="eyebrow">Imitation jewelry boutique</p>
          <h1>SOHAM SALES</h1>
          <p className="lead">
            Shop elegant necklaces, chandbalis, bangles, rings, and bridal sets in INR with easy
            retail checkout and a dedicated wholesale inquiry path.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/shop">
              Shop collection <ArrowRight size={18} />
            </Link>
            <Link className="ghost-button" href="/wholesale">
              Wholesale inquiry
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <Image
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1300&q=90"
            alt="Elegant imitation bridal jewelry set"
            width={1300}
            height={1625}
            priority
            style={{ width: "100%", height: "100%", minHeight: 620, objectFit: "cover" }}
          />
          <div className="hero-note">
            <span>
              <strong>Retail orders</strong>
              <br />
              Razorpay or manual payment
            </span>
            <span>
              <strong>Wholesale</strong>
              <br />
              Quote request only
            </span>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Collections</p>
              <h2>Shop by occasion and style</h2>
            </div>
            <Link className="ghost-button" href="/shop">
              All products
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link className="category-tile" href={`/shop?category=${encodeURIComponent(category)}`} key={category}>
                <Image src={categoryImages[category]} alt={`${category} collection`} width={900} height={1125} style={{ width: "100%", height: "auto", aspectRatio: "4/5", objectFit: "cover" }} />
                <div>
                  <h3>{category}</h3>
                  <p className="muted">Explore pieces</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured pieces</p>
              <h2>Ready for festive gifting</h2>
            </div>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container stats-grid">
          <div className="stat">
            <Gem color="#b55b61" />
            <h3>Curated catalog</h3>
            <p className="muted">Necklaces, earrings, bangles, bridal sets, and rings with sample stock.</p>
          </div>
          <div className="stat">
            <PackageCheck color="#65735b" />
            <h3>Flat shipping</h3>
            <p className="muted">Checkout uses a simple India-first delivery model for v1.</p>
          </div>
          <div className="stat">
            <Sparkles color="#c49a45" />
            <h3>Wholesale ready</h3>
            <p className="muted">Bulk buyers can send quote requests without complicating retail checkout.</p>
          </div>
        </div>
      </section>
    </>
  );
}
