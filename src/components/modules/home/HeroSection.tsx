"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

/* ─── Animation Variants ─────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const rightColVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

/* ─── Trust Bar Data ─────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: "🔒", label: "Secure Checkout" },
  { icon: "🚚", label: "Free Shipping $50+" },
  { icon: "↩️", label: "30-day Returns" },
  { icon: "⭐", label: "4.9/5 Rating" },
];

/* ─── Product Card Data ──────────────────────────────────────────────── */
const FEATURED_PRODUCT = {
  emoji: "🎧",
  name: "Sony WH-1000XM5",
  category: "Premium Headphones",
  price: "$349.99",
  originalPrice: "$429.99",
  stats: [
    { value: "50K+", label: "Buyers" },
    { value: "4.9★", label: "Rating" },
    { value: "24h", label: "Delivery" },
  ],
};

const SMALL_CARDS = [
  { emoji: "⌚", name: "Apple Watch Ultra", price: "$799" },
  { emoji: "💻", name: "MacBook Air M3", price: "$1,099" },
];

/* ─── Sub-components ─────────────────────────────────────────────────── */

/** Subtle dot-grid + radial blobs background */
function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Blob 1 — top-right violet */}
      <div
        className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(91,79,255,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Blob 2 — bottom-left teal */}
      <div
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #9999AE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

/** Eyebrow "live" badge */
function EyebrowBadge() {
  return (
    <motion.div variants={itemVariants}>
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light border border-accent/20">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-semibold text-accent tracking-wide">
          New Collection 2025 is Live
        </span>
      </span>
    </motion.div>
  );
}

/** Main headline */
function Heading() {
  return (
    <motion.h1
      variants={itemVariants}
      className="font-head font-extrabold leading-[1.05] tracking-tight text-ink
                 text-[36px] sm:text-[48px] lg:text-[58px]"
      style={{ fontFamily: "Syne, sans-serif" }}
    >
      Shop {/* "Smarter" with accent underline */}
      <em
        className="not-italic text-accent relative inline-block"
        style={{ fontStyle: "normal" }}
      >
        Smarter
        {/* Decorative underline bar */}
        <span
          aria-hidden
          className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
          style={{ background: "var(--gradient-accent)" }}
        />
      </em>
      , Live Better.
    </motion.h1>
  );
}

/** Sub-copy */
function Subheading() {
  return (
    <motion.p
      variants={itemVariants}
      className="text-base text-ink-3 leading-relaxed max-w-[440px] mt-4"
    >
      Discover thousands of premium products — from cutting-edge tech to
      everyday essentials — all in one place. Faster delivery, smarter prices.
    </motion.p>
  );
}

/** CTA buttons */
function CTARow() {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap items-center gap-3 mt-8"
    >
      <Link
        href="/items"
        id="hero-cta-primary"
        className="inline-flex items-center px-7 py-3.5 rounded-full font-medium text-[15px]
                   text-white shadow-accent hover:-translate-y-0.5
                   transition-all duration-200 ease-out active:scale-95"
        style={{ background: "var(--gradient-accent)" }}
      >
        Shop the Collection
      </Link>
      <Link
        href="/deals"
        id="hero-cta-secondary"
        className="inline-flex items-center px-7 py-3.5 rounded-full font-medium text-[15px]
                   bg-surface-3 text-ink border border-surface-3
                   hover:border-ink-4 hover:-translate-y-0.5
                   transition-all duration-200 ease-out active:scale-95"
      >
        View Deals
      </Link>
    </motion.div>
  );
}

/** Trust badges row */
function TrustBar() {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap items-center gap-5 mt-10"
      aria-label="Shopping guarantees"
    >
      {TRUST_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="w-7 h-7 flex items-center justify-center bg-accent-light rounded-lg text-sm select-none"
            aria-hidden
          >
            {item.icon}
          </span>
          <span className="text-sm font-medium text-ink-2">{item.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

/** Large featured product card */
function FeaturedCard() {
  return (
    <div
      className="col-span-2 flex flex-row bg-white rounded-2xl border border-surface-3
                 overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer
                 shadow-card group"
    >
      {/* Emoji visual */}
      <div
        className="flex items-center justify-center w-32 shrink-0 bg-surface-3
                   text-5xl select-none group-hover:bg-accent-light transition-colors duration-300"
      >
        {FEATURED_PRODUCT.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 p-5">
        <p className="text-[11px] font-semibold text-accent tracking-widest uppercase">
          {FEATURED_PRODUCT.category}
        </p>
        <h3
          className="font-head font-bold text-base text-ink mt-0.5"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {FEATURED_PRODUCT.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-ink">
            {FEATURED_PRODUCT.price}
          </span>
          <span className="text-sm text-ink-4 line-through">
            {FEATURED_PRODUCT.originalPrice}
          </span>
          <span className="text-[10px] font-bold text-white bg-warm px-1.5 py-0.5 rounded-md">
            SALE
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-surface-3">
          {FEATURED_PRODUCT.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-sm font-bold text-ink">{s.value}</p>
              <p className="text-[10px] text-ink-4">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Small product card */
function SmallCard({
  emoji,
  name,
  price,
}: {
  emoji: string;
  name: string;
  price: string;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-surface-3 overflow-hidden
                 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-card group"
    >
      {/* Emoji block */}
      <div
        className="flex items-center justify-center h-28 bg-surface-3 text-4xl select-none
                   group-hover:bg-accent-light transition-colors duration-300"
      >
        {emoji}
      </div>
      {/* Info */}
      <div className="p-3.5">
        <p className="text-sm font-semibold text-ink leading-tight truncate">
          {name}
        </p>
        <p className="text-sm font-bold text-accent mt-1">{price}</p>
      </div>
    </div>
  );
}

/** Right column — stacked product cards */
function ProductCards() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={rightColVariants}
      className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto lg:mx-0"
    >
      <FeaturedCard />
      {SMALL_CARDS.map((card) => (
        <SmallCard key={card.name} {...card} />
      ))}
    </motion.div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      id="hero-section"
      aria-label="Hero — Shop Smarter, Live Better"
      className="relative min-h-screen bg-surface-2 flex items-center overflow-hidden"
    >
      <BackgroundFX />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Text content ──────────────────────────────────── */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <EyebrowBadge />
            <div className="mt-5">
              <Heading />
            </div>
            <Subheading />
            <CTARow />
            <TrustBar />
          </motion.div>

          {/* ── Right: Product cards ─────────────────────────────────── */}
          <ProductCards />
        </div>
      </div>
    </section>
  );
}
