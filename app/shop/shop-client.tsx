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
      <div className="section-head">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>Imitation jewellary collection</h1>
          <p className="lead">Browse retail-ready pieces with wholesale inquiry available on every product.</p>
        </div>
      </div>
      <div className="shop-layout">
        <aside className="panel filters">
          <h3>Categories</h3>
          <div className="filter-list">
            <button className={`filter-chip ${category === "All" ? "active" : ""}`} onClick={() => setCategory("All")}>
              All
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
        </aside>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
