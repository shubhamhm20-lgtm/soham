import { Suspense } from "react";
import { WholesaleClient } from "@/app/wholesale/wholesale-client";

export default function WholesalePage() {
  return (
    <Suspense fallback={<section className="container page">Loading wholesale form...</section>}>
      <WholesaleClient />
    </Suspense>
  );
}
