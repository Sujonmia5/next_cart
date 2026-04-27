"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Rings */}
        <div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[3px] border-accent/20 border-t-accent"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-[3px] border-violet-500/10 border-t-violet-500/40"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Image 
            src="/nex_cart_logo.png" 
            alt="Nex_Cart" 
            width={48} 
            height={48} 
            className="w-12 h-12 object-contain mb-2"
          />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-head text-xl font-bold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Nex_Cart
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium text-ink-4 tracking-wide uppercase"
          >
            Loading your experience...
          </motion.p>
        </div>
      </div>
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/5 blur-[100px] pointer-events-none" />
    </div>
  );
}
