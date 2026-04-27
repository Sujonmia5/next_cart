"use client";

import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { TProduct } from "@/types/product.interface";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductActions } from "./ProductActions";

const rightVariant: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
  },
};

export const ProductDetails = ({ product }: { product: TProduct }) => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 mb-8 flex-wrap"
      >
        {["Home", "Products", product.title].map((crumb, i, arr) => (
          <span key={crumb} className="flex items-center gap-2">
            {i < arr.length - 1 ? (
              <>
                <button
                  onClick={() => router.push(i === 0 ? "/" : "/items")}
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
        <ProductImageGallery
          images={product.imageUrl || []}
          title={product.title}
        />

        {/* RIGHT — Product info */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightVariant}
          className="space-y-8"
        >
          <ProductInfo product={product} />
          <ProductActions productId={String(product._id)} />
        </motion.div>
      </div>
    </div>
  );
};
