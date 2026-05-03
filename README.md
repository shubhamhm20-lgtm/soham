# SOHAM SALES

A Next.js ecommerce starter for an imitation jewelry business.

## Features

- Elegant INR storefront with seeded imitation jewelry products
- Retail cart, checkout, flat shipping, manual payment, and Razorpay-ready online payment flow
- Wholesale inquiry path for bulk buyers
- Password-protected demo admin for products, orders, and inquiries
- Supabase schema and environment configuration placeholders

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Demo Admin

Visit `/admin` and use the default password:

```text
admin123
```

Set `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local` to change it.

## Environment

Copy `.env.example` to `.env.local` and fill values as needed.

Razorpay runs in demo mode unless `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set. Supabase tables can be created with `supabase/schema.sql`.
