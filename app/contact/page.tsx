import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="container page checkout-layout">
      <div>
        <p className="eyebrow">Contact</p>
        <h1>Visit, call, or send a wholesale request.</h1>
        <p className="lead">
          Replace these details with the real showroom address, WhatsApp number, email, and business hours.
        </p>
        <div className="stats-grid" style={{ marginTop: 24 }}>
          <div className="stat">
            <Phone color="#b55b61" />
            <h3>Phone</h3>
            <p className="muted">+91 90000 00000</p>
          </div>
          <div className="stat">
            <Mail color="#65735b" />
            <h3>Email</h3>
            <p className="muted">orders@sohamjewels.example</p>
          </div>
          <div className="stat">
            <MapPin color="#c49a45" />
            <h3>Showroom</h3>
            <p className="muted">Your city, India</p>
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
