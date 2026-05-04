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
              <h2 style={{ marginBottom: 25 }}>Start Your Inquiry</h2>
              <p className="muted" style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 30 }}>
                Fill out the form to request our wholesale catalog, current stock list, 
                or a custom quote for bulk orders. Our team will get back to you within 24 hours.
              </p>
              
              <div style={{ display: 'grid', gap: 20 }}>
                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                  <ShieldCheck color="var(--gold)" />
                  <span>Verified Manufacturing in Rajkot</span>
                </div>
                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                  <ShieldCheck color="var(--gold)" />
                  <span>Custom Design Support Available</span>
                </div>
              </div>
            </div>

            <form className="panel" onSubmit={submitInquiry} style={{ boxShadow: 'var(--shadow-md)', padding: 40, background: 'var(--white)' }}>
              <h3 style={{ marginBottom: 20 }}>Wholesale Inquiry Form</h3>
              {submitted ? <div className="notice" style={{ marginBottom: 20 }}>Inquiry received! Our wholesale manager will contact you shortly.</div> : null}
              
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className="field">
                  <label htmlFor="businessName">Business Name</label>
                  <input id="businessName" name="businessName" placeholder="Jewel Boutique Ltd" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input id="phone" name="phone" required placeholder="+91 ..." />
                </div>
                <div className="field">
                  <label htmlFor="email">Work Email</label>
                  <input id="email" name="email" required type="email" placeholder="john@business.com" />
                </div>
                <div className="field full">
                  <label htmlFor="requestedProducts">Products of Interest</label>
                  <input id="requestedProducts" name="requestedProducts" required defaultValue={product} placeholder="e.g. Bridal Sets, Chandbalis" />
                </div>
                <div className="field full">
                  <label htmlFor="quantityEstimate">Estimated Quantity</label>
                  <input id="quantityEstimate" name="quantityEstimate" required placeholder="Example: 100 sets per month" />
                </div>
                <div className="field full">
                  <label htmlFor="message">Additional Requirements</label>
                  <textarea id="message" name="message" placeholder="Tell us about your business and specific needs..." />
                </div>
              </div>
              <button className="button" type="submit" style={{ width: '100%', marginTop: 25 }}>
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
