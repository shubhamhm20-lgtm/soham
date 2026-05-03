import { Suspense } from "react";
import { ShopClient } from "@/app/shop/shop-client";

export default function ShopPage() {
  return (
    <Suspense fallback={<section className="container page">Loading collection...</section>}>
      <ShopClient />
    </Suspense>
  );
}
