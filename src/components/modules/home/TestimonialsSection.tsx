"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface Testimonial {
  id: string;
  stars: number;
  text: string;
  initials: string;
  avatarBg: string;
  avatarTextColor?: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "aisha",
    stars: 5,
    text: "Absolutely blown away by the quality of the headphones I ordered. Arrived in 18 hours, packaging was pristine, and the sound is out of this world. Nex_Cart is my go-to now.",
    initials: "AS",
    avatarBg: "#5B4FFF",
    name: "Aisha Sultana",
    role: "Verified Buyer · Audio",
  },
  {
    id: "rahim",
    stars: 5,
    text: "Super fast shipping and painless returns. I had to swap a watch band and the whole process took less than 24 hours. Customer support was incredibly responsive.",
    initials: "RH",
    avatarBg: "#00D4AA",
    avatarTextColor: "#0F6E56",
    name: "Rahim Hossain",
    role: "Verified Buyer · Wearables",
  },
  {
    id: "nasrin",
    stars: 5,
    text: "Best e-commerce experience I've had, full stop. The product cards show exactly what you get, prices are honest, and the checkout is lightning fast. 10/10.",
    initials: "NK",
    avatarBg: "#FF6B4A",
    name: "Nasrin Khanam",
    role: "Verified Buyer · Gaming",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5 text-amber-400 text-sm mb-3"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      variants={cardVariants}
      id={`testimonial-${t.id}`}
      className="bg-white rounded-2xl border border-surface-3 p-6
                 hover:border-accent hover:shadow-card hover:-translate-y-0.5
                 transition-all duration-200"
    >
      <Stars count={t.stars} />

      <blockquote className="text-sm text-ink-2 leading-[1.7] mb-4 italic">
        &ldquo;{t.text}&rdquo;
      </blockquote>

      <div className="flex items-center gap-2.5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center
                     text-sm font-bold shrink-0 select-none"
          style={{
            backgroundColor: t.avatarBg,
            color: t.avatarTextColor ?? "#FFFFFF",
          }}
          aria-hidden
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink leading-tight">
            {t.name}
          </p>
          <p className="text-[11px] text-ink-4 mt-0.5">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-surface-2 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={headerVariants}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Reviews
          </p>
          <h2
            id="testimonials-heading"
            className="font-head text-4xl font-extrabold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Loved by <span className="text-accent">50,000+</span> Customers
          </h2>
          <p className="text-base text-ink-3 mt-3 max-w-md mx-auto">
            Real reviews from real shoppers. See why thousands trust Nex_Cart
            for their everyday purchases.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
