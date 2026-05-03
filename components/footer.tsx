import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Soham Jewels</h3>
          <p>Imitation jewelry for retail shoppers, festive wardrobes, and boutique wholesale buyers.</p>
        </div>
        <div className="nav-links">
          <Link href="/shop">Shop</Link>
          <Link href="/wholesale">Wholesale</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
