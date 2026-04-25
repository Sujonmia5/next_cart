"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Copy, Check } from "lucide-react";

const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const PROMO_CODE = "NEXCART25";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* degrade gracefully */
    }
  };

  return (
    <section
      id="promo-banner"
      aria-labelledby="promo-heading"
      className="bg-white py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={bannerVariants}
          className="relative bg-ink rounded-3xl p-10 sm:p-12 overflow-hidden
                     flex items-center justify-between gap-8 flex-wrap"
        >
          {/* Glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: "rgba(91,79,255,0.30)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[40%] -bottom-16 w-[200px] h-[200px] rounded-full blur-2xl"
            style={{ background: "rgba(0,212,170,0.20)" }}
          />

          {/* Left */}
          <div className="relative z-10 max-w-lg">
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-2">
              Limited Time Offer
            </p>
            <h2
              id="promo-heading"
              className="font-head text-[28px] sm:text-[32px] font-extrabold text-white leading-tight mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Get 25% Off Your First Order
            </h2>
            <p className="text-sm text-white/50">
              Use the code at checkout. Valid for new customers only. Offer ends
              soon.
            </p>
          </div>

          {/* Right */}
          <div className="relative z-10 flex flex-col items-start sm:items-end gap-3.5">
            <div
              className="bg-white/[0.08] border border-dashed border-white/25 rounded-xl px-5 py-3 select-all"
              aria-label={`Promo code: ${PROMO_CODE}`}
            >
              <span className="font-mono text-[20px] font-bold text-secondary tracking-wide">
                {PROMO_CODE}
              </span>
            </div>
            <button
              id="promo-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 bg-white text-accent font-semibold
                         px-7 py-3.5 rounded-full hover:bg-accent-light transition-all duration-200
                         text-[15px] active:scale-95 hover:-translate-y-0.5"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check size={16} strokeWidth={2.5} />
                  Code Copied!
                </>
              ) : (
                <>
                  <Copy size={16} strokeWidth={2} />
                  Copy Code
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
