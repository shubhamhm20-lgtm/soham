"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const cartKey = "soham.cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(cartKey);
    if (stored) setItems(JSON.parse(stored) as CartItem[]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      addItem(productId, quantity = 1) {
        setItems((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (!existing) return [...current, { productId, quantity }];
          return current.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
          );
        });
      },
      updateItem(productId, quantity) {
        setItems((current) =>
          current
            .map((item) => (item.productId === productId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0)
        );
      },
      removeItem(productId) {
        setItems((current) => current.filter((item) => item.productId !== productId));
      },
      clearCart() {
        setItems([]);
      },
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
