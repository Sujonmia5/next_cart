"use client";

import { Star } from "lucide-react";
import { TProduct } from "@/types/product.interface";

export const ProductInfo = ({ product }: { product: TProduct }) => {
  return (
    <div className="space-y-0">
      {/* Category badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold capitalize">
        {product.priority || "Standard"}
      </span>

      {/* Title */}
      <h1
        className="font-head text-3xl font-extrabold text-ink leading-tight mt-3 mb-3.5"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {product.title}
      </h1>

      {/* Rating row (Mocked for now since not in TProduct) */}
      <div className="flex items-center gap-2.5 mb-[18px] flex-wrap">
        <span
          className="flex gap-0.5 text-amber-400 text-sm"
          aria-label={`4.5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < 4 ? "fill-amber-400 text-amber-400" : "text-ink-4"
              }
            />
          ))}
        </span>
        <span className="text-sm font-semibold text-ink">4.5</span>
        <span className="text-sm text-ink-4">(1,234 reviews)</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
          In Stock
        </span>
      </div>

      {/* Price block */}
      <div className="flex items-baseline gap-2.5 bg-surface-2 rounded-xl p-4 mb-[18px] flex-wrap">
        <span
          className="font-head text-[32px] font-extrabold text-ink"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          ${product.price}
        </span>
        {/* Mocking discount for now */}
        <span className="bg-warm text-white text-xs font-bold px-2.5 py-1 rounded-full">
          Special Offer
        </span>
      </div>

      {/* Description */}
      <div className="space-y-4 mb-5">
        <p className="text-sm text-ink-2 leading-[1.75]">
          {product.shortDescription}
        </p>
        <div className="text-sm text-ink-2 leading-[1.75] whitespace-pre-wrap">
           {product.fullDescription}
        </div>
      </div>
    </div>
  );
};
