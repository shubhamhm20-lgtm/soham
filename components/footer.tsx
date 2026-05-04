import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: 20 }}>SOHAM SALES</h4>
            <p className="muted" style={{ fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
              Rajkot&apos;s premier destination for high-quality imitation jewellery. 
              Bridging the gap between traditional craftsmanship and modern fashion.
            </p>
          </div>
          
          <div>
            <h4>Shop</h4>
            <div className="footer-links">
              <Link href="/shop">New Arrivals</Link>
              <Link href="/shop?category=Necklaces">Necklaces</Link>
              <Link href="/shop?category=Bridal%20Sets">Bridal Sets</Link>
              <Link href="/shop?category=Earrings">Earrings</Link>
            </div>
          </div>
          
          <div>
            <h4>Information</h4>
            <div className="footer-links">
              <Link href="/contact">About Us</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/wholesale">Wholesale Inquiry</Link>
              <Link href="/admin">Admin Login</Link>
            </div>
          </div>
          
          <div>
            <h4>Support</h4>
            <div className="footer-links">
              <span>Shipping Policy</span>
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
              <span style={{ marginTop: 10, display: 'block', fontWeight: 600, color: 'var(--black)' }}>
                WhatsApp: +91 89808 67167
              </span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SOHAM SALES. All Rights Reserved. Crafted with love in Rajkot.</p>
        </div>
      </div>
    </footer>
  );
}
