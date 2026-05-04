"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { saveInquiry } from "@/lib/storage";

export function WholesaleClient() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "";
  const [submitted, setSubmitted] = useState(false);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    saveInquiry({
      id: `WI-${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toISOString(),
      name: String(form.get("name") || ""),
      businessName: String(form.get("businessName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      requestedProducts: String(form.get("requestedProducts") || ""),
      quantityEstimate: String(form.get("quantityEstimate") || ""),
      message: String(form.get("message") || ""),
      status: "new"
    });
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="container page checkout-layout">
      <div>
        <p className="eyebrow">Wholesale</p>
        <h1>Bulk Jewellery Inquiry</h1>
        <p className="lead">
          Share the categories, quantities, and timeline you need. We will follow up with availability and wholesale pricing.
        </p>
        <div className="stats-grid" style={{ marginTop: 24 }}>
          <div className="stat">
            <h3>Retail stays simple</h3>
            <p className="muted">Wholesale requests are quote-based and separate from cart checkout.</p>
          </div>
          <div className="stat">
            <h3>Mixed categories</h3>
            <p className="muted">Ask for bridal sets, bangles, rings, necklaces, and earrings in one request.</p>
          </div>
          <div className="stat">
            <h3>Fast follow-up</h3>
            <p className="muted">Admin can view every inquiry in the dashboard.</p>
          </div>
        </div>
      </div>
      <form className="panel" onSubmit={submitInquiry}>
        <h2>Request quote</h2>
        {submitted ? <div className="notice">Inquiry received. We will contact you shortly.</div> : null}
        <div className="form-grid" style={{ marginTop: 18 }}>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="businessName">Business name</label>
            <input id="businessName" name="businessName" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" required type="email" />
          </div>
          <div className="field full">
            <label htmlFor="requestedProducts">Requested products or categories</label>
            <input id="requestedProducts" name="requestedProducts" required defaultValue={product} />
          </div>
          <div className="field full">
            <label htmlFor="quantityEstimate">Quantity estimate</label>
            <input id="quantityEstimate" name="quantityEstimate" required placeholder="Example: 50 earrings, 20 bridal sets" />
          </div>
          <div className="field full">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Occasion, delivery city, timeline, preferred budget..." />
          </div>
        </div>
        <button className="button secondary" type="submit" style={{ marginTop: 18 }}>
          Send inquiry
        </button>
      </form>
    </section>
  );
}
