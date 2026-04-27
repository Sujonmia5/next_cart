"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface-2 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-3xl pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span
              className="text-[140px] font-head font-extrabold text-accent/10 leading-none select-none"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search size={64} className="text-accent animate-bounce" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <h1
            className="font-head text-3xl font-bold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Page Not Found
          </h1>
          <p className="text-ink-3 leading-relaxed">
            Oops! The page you are looking for seems to have wandered off.
            Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full font-bold shadow-accent hover:scale-105 transition-all active:scale-95"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <Link
            href="/items"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-ink border border-surface-3 rounded-full font-bold hover:bg-surface-2 transition-all active:scale-95"
          >
            Browse Products
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
