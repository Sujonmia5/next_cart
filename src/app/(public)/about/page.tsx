"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

/* ─── Animation Variants ─────────────────────────────────────────────── */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    <main className="pt-[120px] pb-24 bg-surface-2 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-6 mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            Our Story
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-head text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1]"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Redefining the <br />
            <span className="text-accent">Shopping Experience.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-ink-3 max-w-2xl mx-auto leading-relaxed"
          >
            Nex_Cart was born out of a simple idea: that premium shopping should
            be accessible, seamless, and stunningly designed. We curate the best
            in tech and lifestyle so you can focus on what matters.
          </motion.p>
        </motion.div>

        {/* ── Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-3 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-violet-500/10 flex items-center justify-center">
              <Image
                width={500}
                height={500}
                src="https://res.cloudinary.com/dwvt17wew/image/upload/v1777279697/vecteezy_3d-character-delivery-man_23282483_Medium_abbgo6.jpg"
                alt="Nex_Cart"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2
                className="font-head text-3xl font-bold text-ink"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Why Choose Us?
              </h2>
              <p className="text-ink-3 leading-relaxed">
                We believe that every interaction counts. From the moment you
                browse our curated selection to the second your package arrives
                at your door, we strive for perfection.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  icon: <ShieldCheck className="text-accent" />,
                  title: "Quality First",
                  desc: "We only partner with brands that share our commitment to excellence.",
                },
                {
                  icon: <Truck className="text-accent" />,
                  title: "Express Delivery",
                  desc: "Your time is valuable. We ensure your items reach you as fast as possible.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-2xl bg-white border border-surface-3 shadow-sm hover:border-accent/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">{feature.title}</h4>
                    <p className="text-sm text-ink-3 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/items"
              className="inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all"
            >
              Explore our collection <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* ── Quote / Vision Section ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ink rounded-[40px] p-10 sm:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <h3
              className="font-head text-3xl sm:text-4xl font-bold max-w-3xl mx-auto"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              &quot;Our mission is to bring the world&apos;s most premium goods
              right to your fingertips.&quot;
            </h3>
            <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-white/60 font-medium uppercase tracking-widest text-xs">
              Nex_Cart Founder
            </p>
          </div>

          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 blur-[100px] -ml-32 -mb-32" />
        </motion.div>
      </div>
    </main>
  );
}
