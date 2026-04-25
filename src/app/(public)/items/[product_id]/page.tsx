"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Plus,
  Minus,
  Heart,
  ChevronRight,
  Star,
  ShoppingCart,
} from "lucide-react";

/* ─── Mock product data ─── */
const PRODUCT = {
  id: "wh-1000xm5",
  name: "Pro Wireless Headphones XR900",
  category: "Audio",
  subcategory: "Headphones",
  price: "$349.99",
  oldPrice: "$429.99",
  discount: "19%",
  rating: 4.9,
  reviews: 2341,
  description:
    "Experience audio like never before. The XR900 delivers industry-leading noise cancellation, 30-hour battery life, and adaptive sound technology that adjusts to your environment. Premium leather ear cushions and a lightweight titanium frame ensure all-day comfort.",
  attributes: [
    { label: "Battery", value: "30 Hours" },
    { label: "Connectivity", value: "Bluetooth 5.3" },
    { label: "Weight", value: "250g" },
    { label: "Driver", value: "40mm Dynamic" },
    { label: "Noise Cancel", value: "Active (ANC)" },
    { label: "Warranty", value: "2 Years" },
  ],
  thumbnails: ["🎧", "🎵", "🔊", "📦"],
};

const RELATED = [
  {
    id: "galaxy-buds3",
    emoji: "🎵",
    category: "Audio",
    name: "Samsung Galaxy Buds 3",
    price: "$179",
    oldPrice: "$229",
    badge: "Sale" as const,
  },
  {
    id: "echo-show",
    emoji: "🏠",
    category: "Smart Home",
    name: "Amazon Echo Show 15",
    price: "$249",
    badge: "Trending" as const,
  },
  {
    id: "mx-master",
    emoji: "🖱️",
    category: "Computing",
    name: "Logitech MX Master 3S",
    price: "$99",
    oldPrice: "$119",
  },
  {
    id: "ipad-pro",
    emoji: "📟",
    category: "Computing",
    name: "iPad Pro M4",
    price: "$999",
    badge: "New" as const,
  },
];

const BADGE_STYLES: Record<string, string> = {
  New: "bg-ink text-white",
  Sale: "bg-warm text-white",
  Trending: "bg-accent-light text-accent",
};

const TRUST = [
  { icon: "🚚", label: "Free Delivery" },
  { icon: "↩️", label: "30-day Return" },
  { icon: "🛡️", label: "2yr Warranty" },
  { icon: "✅", label: "Genuine" },
];

/* ─── Variants ──── */
const leftVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const rightVariant: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
  },
};
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  }),
};

function RelatedCard({ p, index }: { p: (typeof RELATED)[0]; index: number }) {
  const router = useRouter();
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariant}
      onClick={() => router.push(`/shop/${p.id}`)}
      className="group bg-white rounded-2xl border border-surface-3 overflow-hidden cursor-pointer
                 hover:border-accent hover:-translate-y-[5px] hover:shadow-accent transition-all duration-300"
    >
      <div className="aspect-square bg-surface-3 relative flex items-center justify-center">
        <span className="text-[64px] select-none group-hover:scale-110 group-hover:-rotate-[4deg] transition-transform duration-300 leading-none">
          {p.emoji}
        </span>
        {"badge" in p && p.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_STYLES[p.badge]}`}
          >
            {p.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-1">
          {p.category}
        </p>
        <h3
          className="font-head text-[14px] font-semibold text-ink leading-tight mb-2.5 truncate"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {p.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0">
            <span
              className="font-head text-base font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {p.price}
            </span>
            {"oldPrice" in p && p.oldPrice && (
              <span className="text-xs text-ink-4 line-through ml-1.5">
                {p.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-[32px] h-[32px] bg-accent hover:bg-accent-hover rounded-[10px] text-white flex items-center justify-center
                       shadow-[0_4px_12px_rgba(91,79,255,0.3)] hover:scale-110 transition-all duration-200 active:scale-95"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductDetailPage() {
  const router = useRouter();
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  return (
    <main className="pt-[88px] pb-20 bg-surface-2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-8 flex-wrap"
        >
          {["Home", "Audio", PRODUCT.name].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-2">
              {i < arr.length - 1 ? (
                <>
                  <button
                    onClick={() => router.push(i === 0 ? "/" : "/shop")}
                    className="text-sm text-ink-4 hover:text-accent transition-colors cursor-pointer"
                  >
                    {crumb}
                  </button>
                  <ChevronRight size={12} className="text-ink-4" />
                </>
              ) : (
                <span className="text-sm text-ink font-medium truncate max-w-[200px]">
                  {crumb}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* ── Main layout ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* LEFT — Images */}
          <motion.div initial="hidden" animate="visible" variants={leftVariant}>
            {/* Main image */}
            <div
              className="bg-surface-3 rounded-3xl aspect-square flex items-center justify-center
                            border border-surface-3 hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
            >
              <span
                className="text-[120px] select-none leading-none"
                aria-label={PRODUCT.name}
              >
                {PRODUCT.thumbnails[activeThumb]}
              </span>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5 mt-3.5">
              {PRODUCT.thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`bg-surface-3 rounded-xl aspect-square flex items-center justify-center text-3xl border-2 transition-all duration-150
                              ${activeThumb === i ? "border-accent bg-accent-light" : "border-transparent hover:border-accent/40 hover:bg-accent-light/50"}`}
                  aria-label={`Thumbnail ${i + 1}`}
                >
                  {thumb}
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Product info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightVariant}
            className="space-y-0"
          >
            {/* Category badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
              {PRODUCT.category} · {PRODUCT.subcategory}
            </span>

            {/* Title */}
            <h1
              className="font-head text-3xl font-extrabold text-ink leading-tight mt-3 mb-3.5"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {PRODUCT.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-2.5 mb-[18px] flex-wrap">
              <span
                className="flex gap-0.5 text-amber-400 text-sm"
                aria-label={`${PRODUCT.rating} stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(PRODUCT.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-ink-4"
                    }
                  />
                ))}
              </span>
              <span className="text-sm font-semibold text-ink">
                {PRODUCT.rating}
              </span>
              <span className="text-sm text-ink-4">
                ({PRODUCT.reviews.toLocaleString()} reviews)
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                In Stock
              </span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-2.5 bg-surface-2 rounded-xl p-4 mb-[18px] flex-wrap">
              <span
                className="font-head text-[32px] font-extrabold text-ink"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {PRODUCT.price}
              </span>
              <span className="text-base text-ink-4 line-through">
                {PRODUCT.oldPrice}
              </span>
              <span className="bg-warm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                -{PRODUCT.discount} OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-ink-2 leading-[1.75] mb-5">
              {PRODUCT.description}
            </p>

            {/* Attributes grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {PRODUCT.attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="bg-surface-2 rounded-xl p-3 border border-surface-3"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ink-4">
                    {attr.label}
                  </p>
                  <p className="text-sm font-semibold text-ink mt-0.5">
                    {attr.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3.5 mb-5">
              <span className="text-sm font-semibold text-ink">Quantity</span>
              <div className="flex items-center border border-surface-3 rounded-full overflow-hidden bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 bg-surface-2 hover:bg-accent-light hover:text-accent text-xl flex items-center justify-center transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-[15px] font-semibold text-ink select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 bg-surface-2 hover:bg-accent-light hover:text-accent text-xl flex items-center justify-center transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 flex-wrap mb-0">
              <button
                id="add-to-cart-btn"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2
                           bg-accent hover:bg-accent-hover text-white rounded-full py-3.5
                           font-medium text-[15px] shadow-accent transition-all duration-200
                           hover:-translate-y-0.5 active:scale-95"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                id="buy-now-btn"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center
                           bg-ink hover:bg-ink-2 text-white rounded-full py-3.5
                           font-medium text-[15px] transition-all duration-200
                           hover:-translate-y-0.5 active:scale-95"
              >
                Buy Now
              </button>
              <button
                id="wishlist-btn"
                onClick={() => setWished((w) => !w)}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg transition-all duration-200
                            ${wished ? "bg-red-50 border-red-200 text-red-500" : "bg-surface-2 border-surface-3 hover:bg-red-50 hover:border-red-200 hover:text-red-400"}`}
              >
                <Heart size={18} className={wished ? "fill-red-500" : ""} />
              </button>
            </div>

            {/* Trust strip */}
            <div className="flex gap-3.5 mt-5 flex-wrap">
              {TRUST.map((t) => (
                <div key={t.label} className="flex items-center gap-1.5">
                  <span
                    className="w-6 h-6 bg-surface-3 rounded-md flex items-center justify-center text-sm select-none"
                    aria-hidden
                  >
                    {t.icon}
                  </span>
                  <span className="text-sm font-medium text-ink-2">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Related Products ────────────────────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-7">
            <h2
              className="font-head text-2xl font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              You may also <span className="text-accent">like</span>
            </h2>
            <button
              onClick={() => router.push("/shop")}
              className="text-sm font-medium text-accent hover:text-accent-hover border border-accent hover:bg-accent-light
                         px-4 py-2 rounded-full transition-all duration-200"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {RELATED.map((p, i) => (
              <RelatedCard key={p.id} p={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
