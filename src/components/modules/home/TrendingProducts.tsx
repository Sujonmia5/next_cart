"use client";

import { useRouter } from "next/navigation";
import { Product, ProductCard } from "@/components/productCard/ProductCard";

/* ─── Data ───────────────────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: "wh-1000xm5",
    emoji: "🎧",
    category: "Audio",
    name: "Sony WH-1000XM5",
    price: "$349",
    oldPrice: "$429",
    badge: "Sale",
  },
  {
    id: "watch-ultra",
    emoji: "⌚",
    category: "Wearables",
    name: "Apple Watch Ultra 2",
    price: "$799",
    badge: "Trending",
    isWished: true,
  },
  {
    id: "macbook-air-m3",
    emoji: "💻",
    category: "Computing",
    name: "MacBook Air M3",
    price: "$1,099",
    oldPrice: "$1,299",
    badge: "Sale",
  },
  {
    id: "ps5-slim",
    emoji: "🎮",
    category: "Gaming",
    name: "PlayStation 5 Slim",
    price: "$449",
    badge: "New",
  },
  {
    id: "iphone-16-pro",
    emoji: "📱",
    category: "Mobile",
    name: "iPhone 16 Pro Max",
    price: "$1,199",
    badge: "New",
  },
  {
    id: "galaxy-buds3",
    emoji: "🎵",
    category: "Audio",
    name: "Samsung Galaxy Buds 3",
    price: "$179",
    oldPrice: "$229",
    badge: "Sale",
  },
  {
    id: "echo-show",
    emoji: "🏠",
    category: "Smart Home",
    name: "Amazon Echo Show 15",
    price: "$249",
    badge: "Trending",
  },
  {
    id: "logitech-mx",
    emoji: "🖱️",
    category: "Computing",
    name: "Logitech MX Master 3S",
    price: "$99",
    oldPrice: "$119",
  },
];

/* ─── Section ────────────────────────────────────────────────────────── */
export default function TrendingProducts() {
  const router = useRouter();

  return (
    <section
      id="trending-products"
      aria-labelledby="trending-heading"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
              Featured
            </p>
            <h2
              id="trending-heading"
              className="font-head text-4xl font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Trending <span className="text-accent">Products</span>
            </h2>
          </div>

          <button
            id="view-all-products-btn"
            onClick={() => router.push("/items")}
            className="border border-accent text-accent hover:bg-accent-light
                       rounded-full px-5 py-2.5 text-sm font-medium
                       transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            View All Products →
          </button>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
