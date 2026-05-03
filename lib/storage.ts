"use client";

import { sampleProducts } from "@/lib/products";
import type { Order, Product, WholesaleInquiry } from "@/lib/types";

const productKey = "soham.products";
const orderKey = "soham.orders";
const inquiryKey = "soham.wholesaleInquiries";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProducts() {
  return readJson<Product[]>(productKey, sampleProducts);
}

export function saveProducts(products: Product[]) {
  writeJson(productKey, products);
}

export function getOrders() {
  return readJson<Order[]>(orderKey, []);
}

export function saveOrder(order: Order) {
  writeJson(orderKey, [order, ...getOrders()]);
}

export function getInquiries() {
  return readJson<WholesaleInquiry[]>(inquiryKey, []);
}

export function saveInquiry(inquiry: WholesaleInquiry) {
  writeJson(inquiryKey, [inquiry, ...getInquiries()]);
}
