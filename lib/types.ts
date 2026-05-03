export type Category = "Necklaces" | "Earrings" | "Bangles" | "Bridal Sets" | "Rings";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  price_inr: number;
  stock: number;
  images: string[];
  featured: boolean;
  active: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type PaymentMethod = "online_razorpay" | "manual_payment";
export type PaymentStatus = "pending" | "paid" | "failed";
export type OrderStatus = "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  price_inr: number;
  quantity: number;
};

export type CustomerAddress = {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
};

export type WholesaleInquiry = {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  requestedProducts: string;
  quantityEstimate: string;
  message: string;
  status: "new" | "contacted" | "quoted" | "closed";
};
