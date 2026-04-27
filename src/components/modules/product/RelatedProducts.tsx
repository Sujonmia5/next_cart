"use client";

import { ProductCard } from "@/components/productCard/ProductCard";
import { TProduct } from "@/types/product.interface";
import { useRouter } from "next/navigation";

export const RelatedProducts = ({ products }: { products: TProduct[] }) => {
  const router = useRouter();

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-7">
        <h2
          className="font-head text-2xl font-extrabold text-ink"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          You may also <span className="text-accent">like</span>
        </h2>
        <button
          onClick={() => router.push("/items")}
          className="text-sm font-medium text-accent hover:text-accent-hover border border-accent hover:bg-accent-light
                     px-4 py-2 rounded-full transition-all duration-200"
        >
          View All →
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <ProductCard key={String(p._id)} product={p} index={i} />
        ))}
      </div>
    </div>
  );
};
