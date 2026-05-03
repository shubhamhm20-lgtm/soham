"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Edit3, LogOut, Package, Plus, Save, Trash2 } from "lucide-react";
import { categories, formatInr } from "@/lib/products";
import { getInquiries, getOrders, getProducts, saveProducts } from "@/lib/storage";
import type { Category, Order, Product, WholesaleInquiry } from "@/lib/types";

const adminKey = "soham.admin.authed";

function blankProduct(): Product {
  return {
    id: `p-${Date.now()}`,
    name: "",
    slug: "",
    description: "",
    category: "Necklaces",
    price_inr: 0,
    stock: 0,
    images: [""],
    featured: false,
    active: true
  };
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"products" | "orders" | "inquiries">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<WholesaleInquiry[]>([]);
  const [editing, setEditing] = useState<Product>(blankProduct());

  useEffect(() => {
    setAuthed(window.localStorage.getItem(adminKey) === "true");
    setProducts(getProducts());
    setOrders(getOrders());
    setInquiries(getInquiries());
  }, []);

  const stats = useMemo(
    () => ({
      products: products.length,
      orders: orders.length,
      inquiries: inquiries.length
    }),
    [products, orders, inquiries]
  );

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        window.localStorage.setItem(adminKey, "true");
        setAuthed(true);
      } else {
        setLoginError("Incorrect password.");
      }
    } catch {
      setLoginError("Unable to verify. Please try again.");
    }
  }

  function persist(nextProducts: Product[]) {
    setProducts(nextProducts);
    saveProducts(nextProducts);
  }

  function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = {
      ...editing,
      slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      images: editing.images.filter(Boolean)
    };
    const exists = products.some((product) => product.id === normalized.id);
    persist(exists ? products.map((product) => (product.id === normalized.id ? normalized : product)) : [normalized, ...products]);
    setEditing(blankProduct());
  }

  if (!authed) {
    return (
      <section className="container page">
        <form className="panel" onSubmit={login} style={{ maxWidth: 480 }}>
          <p className="eyebrow">Admin</p>
          <h1>Sign in</h1>
          <p className="muted">Demo admin uses a server-verified password until Supabase Auth is connected.</p>
          {loginError ? <p style={{ color: "var(--rose-dark)", fontWeight: 700, marginTop: 8 }}>{loginError}</p> : null}
          <div className="field" style={{ marginTop: 18 }}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button className="button" type="submit" style={{ marginTop: 18 }}>
            Sign in
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="container page">
      <div className="section-head">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Business dashboard</h1>
        </div>
        <button
          className="ghost-button"
          type="button"
          onClick={() => {
            window.localStorage.removeItem(adminKey);
            setAuthed(false);
          }}
        >
          <LogOut size={17} /> Sign out
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat">
          <Package color="#b55b61" />
          <h3>{stats.products} products</h3>
        </div>
        <div className="stat">
          <h3>{stats.orders} orders</h3>
          <p className="muted">Retail checkout submissions</p>
        </div>
        <div className="stat">
          <h3>{stats.inquiries} inquiries</h3>
          <p className="muted">Wholesale quote requests</p>
        </div>
      </div>

      <div className="admin-layout">
        <aside className="panel admin-menu">
          <button className={`filter-chip ${tab === "products" ? "active" : ""}`} onClick={() => setTab("products")}>
            Products
          </button>
          <button className={`filter-chip ${tab === "orders" ? "active" : ""}`} onClick={() => setTab("orders")}>
            Orders
          </button>
          <button className={`filter-chip ${tab === "inquiries" ? "active" : ""}`} onClick={() => setTab("inquiries")}>
            Inquiries
          </button>
        </aside>

        {tab === "products" ? (
          <div style={{ display: "grid", gap: 18 }}>
            <form className="panel" onSubmit={saveProduct}>
              <div className="section-head">
                <h2>{products.some((product) => product.id === editing.id) ? "Edit product" : "Add product"}</h2>
                <button className="ghost-button" type="button" onClick={() => setEditing(blankProduct())}>
                  <Plus size={17} /> New
                </button>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>Name</label>
                  <input required value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} />
                </div>
                <div className="field">
                  <label>Slug</label>
                  <input value={editing.slug} onChange={(event) => setEditing({ ...editing, slug: event.target.value })} />
                </div>
                <div className="field">
                  <label>Category</label>
                  <select value={editing.category} onChange={(event) => setEditing({ ...editing, category: event.target.value as Category })}>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Price INR</label>
                  <input
                    type="number"
                    value={editing.price_inr}
                    onChange={(event) => setEditing({ ...editing, price_inr: Number(event.target.value) })}
                  />
                </div>
                <div className="field">
                  <label>Stock</label>
                  <input type="number" value={editing.stock} onChange={(event) => setEditing({ ...editing, stock: Number(event.target.value) })} />
                </div>
                <div className="field">
                  <label>Image URL</label>
                  <input value={editing.images[0] || ""} onChange={(event) => setEditing({ ...editing, images: [event.target.value] })} />
                </div>
                <div className="field full">
                  <label>Description</label>
                  <textarea value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} />
                </div>
                <div className="field">
                  <label>Featured</label>
                  <select value={String(editing.featured)} onChange={(event) => setEditing({ ...editing, featured: event.target.value === "true" })}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="field">
                  <label>Active</label>
                  <select value={String(editing.active)} onChange={(event) => setEditing({ ...editing, active: event.target.value === "true" })}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <button className="button secondary" type="submit" style={{ marginTop: 18 }}>
                <Save size={17} /> Save product
              </button>
            </form>

            <div className="panel table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{formatInr(product.price_inr)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="split-actions">
                          <button className="icon-button" type="button" onClick={() => setEditing(product)} aria-label="Edit product">
                            <Edit3 size={16} />
                          </button>
                          <button
                            className="icon-button"
                            type="button"
                            onClick={() => persist(products.filter((item) => item.id !== product.id))}
                            aria-label="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {tab === "orders" ? (
          <div className="panel table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {order.customer.name}
                      <br />
                      <span className="muted">{order.customer.phone}</span>
                    </td>
                    <td>{formatInr(order.total)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {tab === "inquiries" ? (
          <div className="panel table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Business</th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      {inquiry.name}
                      <br />
                      <span className="muted">{inquiry.phone}</span>
                    </td>
                    <td>{inquiry.businessName || "-"}</td>
                    <td>{inquiry.requestedProducts}</td>
                    <td>{inquiry.quantityEstimate}</td>
                    <td>{inquiry.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}
