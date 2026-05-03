create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text not null,
  category text not null,
  price_inr integer not null,
  stock integer not null default 0,
  images text[] not null default '{}',
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer jsonb not null,
  items jsonb not null,
  subtotal integer not null,
  shipping_fee integer not null,
  total integer not null,
  payment_method text not null check (payment_method in ('online_razorpay', 'manual_payment')),
  payment_status text not null default 'pending',
  order_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists wholesale_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  phone text not null,
  email text not null,
  requested_products text not null,
  quantity_estimate text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
