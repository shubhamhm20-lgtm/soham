"use client";

import Link from "next/link";
import { ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand">
          {process.env.NEXT_PUBLIC_SITE_NAME || "SOHAM SALES"}
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/shop?category=Bridal%20Sets">Collections</Link>
          <Link href="/wholesale">Wholesale</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="nav-actions">
          <Link className="icon-button" href="/admin" aria-label="Admin">
            <UserRound size={19} />
          </Link>
          <Link className="icon-button" href="/cart" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
