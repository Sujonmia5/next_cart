import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { TProduct } from "@/types/product.interface";
import { useCart } from "@/providers/CartProvider";
import Image from "next/image";

/* ─── Badge Styles ───────────────────────────────────────────────────── */
const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-ink text-white",
  medium: "bg-warm text-white",
  low: "bg-accent-light text-accent",
};

/* ─── Animation Variants ─────────────────────────────────────────────── */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.07 },
  }),
};

/* ─── ProductCard ─────────────────────────── */
export const ProductCard = ({
  product,
  index,
  list = false,
}: {
  product: TProduct;
  index: number;
  list?: boolean;
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  // Using a local wished state since TProduct doesn't track it
  const [wished, setWished] = useState(false);

  const imageUrl =
    product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : "";
  const displayPrice = product.price ? `$${product.price}` : "N/A";
  const priority = product.priority;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product._id) {
      addToCart(String(product._id));
    }
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWished((prev) => !prev);
  };

  const handleNavigate = () => {
    router.push(`/items/${product._id}`);
  };

  if (list) {
    return (
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        onClick={handleNavigate}
        id={`product-card-${product._id}`}
        className="group flex items-center gap-4 bg-white rounded-2xl border border-surface-3 p-4 cursor-pointer
                 hover:border-accent hover:shadow-accent transition-all duration-300"
      >
        <div
          className="w-20 h-20 shrink-0 bg-surface-3 rounded-xl flex items-center justify-center text-4xl
                      group-hover:bg-accent-light transition-colors duration-300 select-none overflow-hidden"
        >
          {imageUrl ? (
            <Image
              width={100}
              height={100}
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            "📦"
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4">
            {product.priority || "Standard"}
          </p>
          <h3
            className="font-head text-sm font-semibold text-ink truncate mt-0.5"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {product.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="font-head text-base font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {displayPrice}
            </span>
          </div>
        </div>
        {priority && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${PRIORITY_STYLES[priority] || "bg-gray-200 text-gray-800"}`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        )}
        <button
          onClick={handleAdd}
          aria-label={`Add ${product.title} to cart`}
          className="w-9 h-9 shrink-0 bg-accent hover:bg-accent-hover rounded-[10px] text-white flex items-center justify-center
                   shadow-[0_4px_12px_rgba(91,79,255,0.3)] hover:scale-110 transition-all duration-200 active:scale-95 z-10"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      onClick={handleNavigate}
      id={`product-card-${product._id}`}
      className="group bg-white rounded-2xl border border-surface-3 overflow-hidden cursor-pointer
                 hover:border-accent hover:-translate-y-[5px] hover:shadow-accent
                 transition-all duration-300"
    >
      {/* ── Image area ─────────────────────────────────────────────── */}
      <div className="aspect-square bg-surface-3 relative flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-[68px] select-none group-hover:scale-110 transition-transform duration-300 leading-none">
            📦
          </span>
        )}

        {/* Badge */}
        {priority && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${PRIORITY_STYLES[priority] || "bg-gray-200 text-gray-800"}`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                      text-sm shadow-sm border transition-all duration-200 z-10
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
          {product.priority || "Standard"}
        </p>
        <h3
          className="font-head text-[15px] font-semibold text-ink leading-tight mb-2.5 truncate"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {product.title}
        </h3>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0">
            <span
              className="font-head text-lg font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {displayPrice}
            </span>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.title} to cart`}
            className="w-[34px] h-[34px] bg-accent hover:bg-accent-hover rounded-[10px]
                       text-white flex items-center justify-center z-10
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
