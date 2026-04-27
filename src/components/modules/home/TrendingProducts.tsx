"use client";

import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/productCard/ProductCard";
import { TProduct } from "@/types/product.interface";

/* ─── Section  */
export default function TrendingProducts({
  Products,
}: {
  Products: TProduct[];
}) {
  const router = useRouter();
  return (
    <section
      id="trending-products"
      aria-labelledby="trending-heading"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
              Featured
            </p>
            <h2
              id="trending-heading"
              className="font-head text-4xl font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Trending <span className="text-accent">Products</span>
            </h2>
          </div>

          <button
            id="view-all-products-btn"
            onClick={() => router.push("/items")}
            className="border border-accent text-accent hover:bg-accent-light
                       rounded-full px-5 py-2.5 text-sm font-medium
                       transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            View All Products →
          </button>
        </div>

        {/*  Grid  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Products &&
            Products.map((product, i) => (
              <ProductCard
                key={String(product._id)}
                product={product as TProduct}
                index={i}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
