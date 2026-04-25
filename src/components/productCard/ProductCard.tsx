import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

/* ─── Types ─────────────────────────────────────────────────────────── */
export interface Product {
  id: string;
  emoji: string;
  category: string;
  name: string;
  price: string;
  oldPrice?: string;
  badge?: "New" | "Sale" | "Trending";
  isWished?: boolean;
}

/* ─── Badge Styles ───────────────────────────────────────────────────── */
const BADGE_STYLES: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-ink text-white",
  Sale: "bg-warm text-white",
  Trending: "bg-accent-light text-accent",
};

/* ─── Animation Variants ─────────────────────────────────────────────── */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: i * 0.08 },
  }),
};

/* ─── ProductCard ─────────────────────────── */
export const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const router = useRouter();
  const [wished, setWished] = useState(product.isWished ?? false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: open cart modal / fire cart action
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWished((prev) => !prev);
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      onClick={() => router.push(`/items/${product.id}`)}
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-surface-3 overflow-hidden cursor-pointer
                 hover:border-accent hover:-translate-y-[5px] hover:shadow-accent
                 transition-all duration-300"
    >
      {/* ── Image area ─────────────────────────────────────────────── */}
      <div className="aspect-square bg-surface-3 relative flex items-center justify-center">
        {/* Emoji */}
        <span
          className="text-[72px] select-none
                     group-hover:scale-110 group-hover:-rotate-[4deg]
                     transition-transform duration-300 leading-none"
          aria-hidden
        >
          {product.emoji}
        </span>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                      text-sm shadow-sm border transition-all duration-200
                      ${
                        wished
                          ? "bg-red-50 border-red-200 text-red-500"
                          : "bg-white border-surface-3 text-ink-3 hover:border-red-200 hover:text-red-400"
                      }`}
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>

      {/* ── Product info ────────────────────────────────────────────── */}
      <div className="p-4 pb-[18px]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-1">
          {product.category}
        </p>
        <h3
          className="font-head text-[15px] font-semibold text-ink leading-tight mb-2.5 truncate"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0">
            <span
              className="font-head text-lg font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-ink-4 line-through ml-1.5">
                {product.oldPrice}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="w-[34px] h-[34px] bg-accent hover:bg-accent-hover rounded-[10px]
                       text-white flex items-center justify-center
                       shadow-[0_4px_12px_rgba(91,79,255,0.3)]
                       hover:scale-110 transition-all duration-200 active:scale-95"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
