"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const CATEGORIES = [
  { icon: "🎧", name: "Audio", count: 124 },
  { icon: "⌚", name: "Wearables", count: 89 },
  { icon: "💻", name: "Computing", count: 212 },
  { icon: "📱", name: "Mobile", count: 156 },
  { icon: "🏠", name: "Smart Home", count: 98 },
  { icon: "🎮", name: "Gaming", count: 74 },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function CategoryCard({
  icon,
  name,
  count,
}: {
  icon: string;
  name: string;
  count: number;
}) {
  const router = useRouter();

  return (
    <motion.div
      variants={cardVariants}
      onClick={() => router.push(`/items?category=${name.toLowerCase()}`)}
      id={`category-card-${name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group relative bg-white rounded-2xl border border-surface-3
                 py-6 px-3.5 text-center cursor-pointer overflow-hidden
                 hover:-translate-y-[3px] hover:shadow-accent hover:border-accent
                 transition-all duration-200"
    >
      {/* Gradient overlay on hover */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 rounded-2xl z-0"
        style={{
          background: "linear-gradient(135deg, #5B4FFF 0%, #8B5FFF 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className="text-[32px] mb-2.5 leading-none select-none"
          aria-hidden
        >
          {icon}
        </div>
        <p className="text-[13px] font-semibold text-ink group-hover:text-white transition-colors duration-200">
          {name}
        </p>
        <p className="text-[11px] text-ink-4 mt-1 group-hover:text-white/80 transition-colors duration-200">
          {count} items
        </p>
      </div>
    </motion.div>
  );
}

export default function CategoriesSection() {
  return (
    <section
      id="shop-by-category"
      aria-labelledby="categories-heading"
      className="bg-surface-2 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={headerVariants}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Explore
          </p>
          <h2
            id="categories-heading"
            className="font-head text-4xl font-extrabold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Shop by <span className="text-accent">Category</span>
          </h2>
          <p className="text-base text-ink-3 mt-3 max-w-md mx-auto">
            Find exactly what you&apos;re looking for — browse by category and
            discover the best deals.
          </p>
        </motion.div>
        {/* category card */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-6 gap-3.5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
