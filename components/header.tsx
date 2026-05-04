"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand">
          {process.env.NEXT_PUBLIC_SITE_NAME || "SOHAM SALES"}
        </Link>
        
        <div className="search-container">
          <Search size={18} className="search-icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input 
            type="text" 
            placeholder="Search for Jewellery..." 
            className="search-input"
          />
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/shop?category=Bridal%20Sets">Collections</Link>
          <Link href="/wholesale">Wholesale</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="nav-actions">
          <Link className="icon-button" href="/admin" aria-label="Account">
            <UserRound size={22} strokeWidth={1.5} />
          </Link>
          <button className="icon-button" aria-label="Wishlist">
            <Heart size={22} strokeWidth={1.5} />
          </button>
          <Link className="icon-button" href="/cart" aria-label="Cart">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
