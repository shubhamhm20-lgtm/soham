"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/products";
import { getProducts } from "@/lib/storage";
import type { Category } from "@/lib/types";

export function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const [category, setCategory] = useState<Category | "All">(initialCategory || "All");

  const allProducts = useMemo(() => getProducts(), []);

  const products = useMemo(() => {
    return allProducts.filter((product) => product.active && (category === "All" || product.category === category));
  }, [category, allProducts]);

  return (
    <section className="container page">
      <div className="section-head" style={{ marginBottom: 40 }}>
        <div>
          <p className="eyebrow">Shop</p>
          <h1 style={{ fontSize: '3rem', marginBottom: 15 }}>Imitation Jewellery Collection</h1>
          <p className="lead" style={{ maxWidth: 600 }}>Explore our handcrafted pieces, from festive bridal sets to everyday elegance.</p>
        </div>
      </div>

      <div className="filter-list">
        <button 
          className={`filter-chip ${category === "All" ? "active" : ""}`} 
          onClick={() => setCategory("All")}
        >
          All Pieces
        </button>
        {categories.map((item) => (
          <button
            className={`filter-chip ${category === item ? "active" : ""}`}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', fontSize: '1.2rem', color: '#888' }}>
            No pieces found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
