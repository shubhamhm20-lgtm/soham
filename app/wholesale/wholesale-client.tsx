"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Award, Box, Globe, ShieldCheck } from "lucide-react";
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
      businessName: String(form.get("businessName") || "N/A"),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      requestedProducts: product,
      quantityEstimate: "See requirements",
      message: String(form.get("message") || ""),
      status: "new"
    });
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <>
      {/* Wholesale Hero */}
      <section className="wholesale-hero">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--gold)', fontWeight: 700 }}>Partnership</p>
          <h1>Grow Your Boutique <br /> With SOHAM SALES</h1>
          <p className="lead" style={{ margin: '0 auto', maxWidth: 700 }}>
            We provide premium imitation jewellery at wholesale prices for retailers, 
            boutiques, and corporate gifting partners worldwide.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Why Partner With Us?</h2>
          </div>
          <div className="wholesale-benefit-grid">
            <div className="benefit-card">
              <Award className="benefit-icon" size={40} />
              <h3>Premium Quality</h3>
              <p className="muted">Rigorous quality checks to ensure every piece matches the shine of real jewelry.</p>
            </div>
            <div className="benefit-card">
              <Box className="benefit-icon" size={40} />
              <h3>Bulk Pricing</h3>
              <p className="muted">Exclusive tiered pricing models that ensure healthy margins for your business.</p>
            </div>
            <div className="benefit-card">
              <Globe className="benefit-icon" size={40} />
              <h3>Global Shipping</h3>
              <p className="muted">Reliable logistics network to deliver your orders safely, wherever you are.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="section" style={{ background: '#fcfcfc', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="wholesale-layout">
            <div>
              <p className="eyebrow">Contact Us</p>
              <h2 style={{ marginBottom: 25 }}>Simple Inquiry</h2>
              <p className="muted" style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 30 }}>
                Drop your details and what you are looking for. Our wholesale manager will personally reach out to you with the catalog and pricing.
              </p>
              
              <div style={{ display: 'grid', gap: 20 }}>
                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                  <ShieldCheck color="var(--gold)" />
                  <span>Direct from Rajkot Factory</span>
                </div>
                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                  <ShieldCheck color="var(--gold)" />
                  <span>24/7 WhatsApp Support</span>
                </div>
              </div>
            </div>

            <form className="panel" onSubmit={submitInquiry} style={{ boxShadow: 'var(--shadow-md)', padding: 40, background: 'var(--white)' }}>
              <h3 style={{ marginBottom: 20 }}>Quick Quote Request</h3>
              {submitted ? <div className="notice" style={{ marginBottom: 20 }}>Message sent! We will WhatsApp you shortly.</div> : null}
              
              <div className="form-grid">
                <div className="field full">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" required placeholder="Full Name" />
                </div>
                <div className="field full">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input id="phone" name="phone" required placeholder="+91 00000 00000" />
                </div>
                <div className="field full">
                  <label htmlFor="email">Email Address (Optional)</label>
                  <input id="email" name="email" type="email" placeholder="email@example.com" />
                </div>
                <div className="field full">
                  <label htmlFor="message">What are you looking for?</label>
                  <textarea id="message" name="message" required placeholder="Example: Need 20 sets of kundan necklaces for my boutique in Mumbai..." style={{ minHeight: 150 }} />
                </div>
              </div>
              <button className="button" type="submit" style={{ width: '100%', marginTop: 25 }}>
                Send My Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
