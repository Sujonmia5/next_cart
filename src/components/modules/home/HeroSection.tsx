"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { HomeProductCard } from "./homeProductcard";
import { FeaturedCard } from "./FeaturedCard";
import { TProduct } from "@/types/product.interface";

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

/* ─── Hero Section ───────────────────────────────────────────────────── */
export default function HeroSection({ products }: { products: TProduct[] }) {
  // Use first product as featured, next two as small cards
  const featured = products[0];
  const smallCards = products.slice(1, 3);

  return (
    <section
      id="hero-section"
      aria-label="Hero — Shop Smarter, Live Better"
      className="relative min-h-screen bg-surface-2 flex items-center overflow-hidden"
    >
      {/* background effects */}
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

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Text content ───────── */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-accent tracking-wide">
                  New Collection 2026 is Live
                </span>
              </span>
            </motion.div>
            <div className="mt-5">
              <Heading />
            </div>
            <Subheading />
            <CTARow />
            <TrustBar />
          </motion.div>

          {/* ── Right: Product cards ───────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightColVariants}
            className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto lg:mx-0"
          >
            {featured && <FeaturedCard product={featured} />}
            {smallCards.map((card) => (
              <HomeProductCard key={String(card._id)} product={card} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
