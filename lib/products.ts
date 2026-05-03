import type { Category, Product } from "@/lib/types";

export const categories: Category[] = ["Necklaces", "Earrings", "Bangles", "Bridal Sets", "Rings"];

export const categoryImages: Record<Category, string> = {
  Necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  Earrings: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85",
  Bangles: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=85",
  "Bridal Sets": "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85",
  Rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85"
};

export const sampleProducts: Product[] = [
  {
    id: "p-necklace-01",
    name: "Meera Kundan Necklace",
    slug: "meera-kundan-necklace",
    description: "A gold-tone kundan necklace with pearl drops, crafted for festive sarees and lehengas.",
    category: "Necklaces",
    price_inr: 2499,
    stock: 18,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=88"],
    featured: true,
    active: true
  },
  {
    id: "p-earrings-01",
    name: "Aarya Pearl Chandbalis",
    slug: "aarya-pearl-chandbalis",
    description: "Lightweight pearl chandbalis with a polished antique finish for party and wedding wear.",
    category: "Earrings",
    price_inr: 899,
    stock: 34,
    images: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=88"],
    featured: true,
    active: true
  },
  {
    id: "p-bangles-01",
    name: "Riva Stone Bangles",
    slug: "riva-stone-bangles",
    description: "A stack of stone-studded bangles that pairs well with silk, georgette, and festive cotton.",
    category: "Bangles",
    price_inr: 1299,
    stock: 22,
    images: ["https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=88"],
    featured: true,
    active: true
  },
  {
    id: "p-bridal-01",
    name: "Saanvi Bridal Set",
    slug: "saanvi-bridal-set",
    description: "A complete bridal-style necklace and earring set with layered detail and emerald accents.",
    category: "Bridal Sets",
    price_inr: 5499,
    stock: 8,
    images: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=88"],
    featured: true,
    active: true
  },
  {
    id: "p-rings-01",
    name: "Nira Cocktail Ring",
    slug: "nira-cocktail-ring",
    description: "A statement cocktail ring with a high-shine finish and adjustable fit.",
    category: "Rings",
    price_inr: 699,
    stock: 27,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=88"],
    featured: false,
    active: true
  },
  {
    id: "p-necklace-02",
    name: "Tara Layered Chain",
    slug: "tara-layered-chain",
    description: "A delicate layered necklace for daily styling, gifting, and boutique retail bundles.",
    category: "Necklaces",
    price_inr: 1199,
    stock: 41,
    images: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=88"],
    featured: false,
    active: true
  },
  {
    id: "p-earrings-02",
    name: "Ira Floral Studs",
    slug: "ira-floral-studs",
    description: "Polished floral studs with crystal detail, designed for comfortable all-day wear.",
    category: "Earrings",
    price_inr: 499,
    stock: 56,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=88"],
    featured: false,
    active: true
  },
  {
    id: "p-bangles-02",
    name: "Kavya Antique Kada",
    slug: "kavya-antique-kada",
    description: "A single antique-finish kada with carved detail and a boutique occasion-wear feel.",
    category: "Bangles",
    price_inr: 1599,
    stock: 15,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=88"],
    featured: false,
    active: true
  }
];

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function getFlatShippingFee() {
  return Number(process.env.NEXT_PUBLIC_FLAT_SHIPPING_FEE || 99);
}

export function getProductBySlug(slug: string, products = sampleProducts) {
  return products.find((product) => product.slug === slug && product.active);
}
