import { Suspense } from "react";
import { Metadata } from "next";
import { WholesaleClient } from "@/app/wholesale/wholesale-client";

export const metadata: Metadata = {
  title: "Wholesale & Bulk Orders | SOHAM SALES",
  description: "Partner with us for premium imitation jewellery at competitive wholesale prices."
};

export default function WholesalePage() {
  return (
    <Suspense fallback={<section className="container page">Loading wholesale form...</section>}>
      <WholesaleClient />
    </Suspense>
  );
}
