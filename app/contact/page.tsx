import Link from "next/link";
import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | SOHAM SALES",
  description: "Get in touch with us for retail, festive, or wholesale jewellery inquiries."
};

export default function ContactPage() {
  return (
    <section className="container page checkout-layout">
      <div>
        <p className="eyebrow">Contact</p>
        <h1>Visit, call, or send a wholesale request.</h1>
        <p className="lead">
          Connect with us for retail inquiries, festive orders, or dedicated wholesale support.
        </p>
        <div className="stats-grid" style={{ marginTop: 24 }}>
          <div className="stat">
            <Phone color="#b55b61" />
            <h3>Phone</h3>
            <p className="muted">+91 89808 67167</p>
          </div>
          <div className="stat">
            <Mail color="#65735b" />
            <h3>Email</h3>
            <p className="muted">orders@sohamsales.example</p>
          </div>
          <div className="stat">
            <MapPin color="#c49a45" />
            <h3>Showroom</h3>
            <p className="muted">Rajkot, Gujarat, India</p>
          </div>
        </div>
      </div>
      <aside className="panel">
        <h2>Wholesale buyers</h2>
        <p className="muted">For bulk pricing, stock lists, or reseller requests, use the inquiry form.</p>
        <Link className="button" href="/wholesale">
          Request wholesale quote
        </Link>
      </aside>
    </section>
  );
}
