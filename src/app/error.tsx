"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Home, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-surface-2 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-500/[0.03] blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4" />

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-red-100">
            <AlertCircle size={48} className="text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h1
            className="font-head text-3xl font-bold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Something went wrong
          </h1>
          <p className="text-ink-3 leading-relaxed">
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-ink-4 bg-white p-2 rounded-lg inline-block border border-surface-3">
              Error ID: {error.digest}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full font-bold shadow-accent hover:scale-105 transition-all active:scale-95"
          >
            <RefreshCw size={18} /> Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-ink border border-surface-3 rounded-full font-bold hover:bg-surface-2 transition-all active:scale-95"
          >
            <Home size={18} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
