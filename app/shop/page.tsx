import { Suspense } from "react";
import { Metadata } from "next";
import { ShopClient } from "@/app/shop/shop-client";

export const metadata: Metadata = {
  title: "Shop Collection | SOHAM SALES",
  description: "Explore our exquisite collection of necklaces, earrings, bangles, and bridal sets."
};

export default function ShopPage() {
  return (
    <Suspense fallback={<section className="container page">Loading collection...</section>}>
      <ShopClient />
    </Suspense>
  );
}
