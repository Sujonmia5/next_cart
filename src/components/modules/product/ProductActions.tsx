"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

export const ProductActions = ({ productId }: { productId: string }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  const TRUST = [
    { icon: "🚚", label: "Free Delivery" },
    { icon: "↩️", label: "30-day Return" },
    { icon: "🛡️", label: "2yr Warranty" },
    { icon: "✅", label: "Genuine" },
  ];

  return (
    <div className="space-y-5">
      {/* Quantity */}
      <div className="flex items-center gap-3.5">
        <span className="text-sm font-semibold text-ink">Quantity</span>
        <div className="flex items-center border border-surface-3 rounded-full overflow-hidden bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-9 h-9 bg-surface-2 hover:bg-accent-light hover:text-accent text-xl flex items-center justify-center transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-[15px] font-semibold text-ink select-none">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-9 h-9 bg-surface-2 hover:bg-accent-light hover:text-accent text-xl flex items-center justify-center transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 flex-wrap">
        <button
          id="add-to-cart-btn"
          onClick={() => addToCart(productId)}
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2
                     bg-accent hover:bg-accent-hover text-white rounded-full py-3.5
                     font-medium text-[15px] shadow-accent transition-all duration-200
                     hover:-translate-y-0.5 active:scale-95"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
        <button
          id="buy-now-btn"
          className="flex-1 min-w-[140px] inline-flex items-center justify-center
                     bg-ink hover:bg-ink-2 text-white rounded-full py-3.5
                     font-medium text-[15px] transition-all duration-200
                     hover:-translate-y-0.5 active:scale-95"
        >
          Buy Now
        </button>
        <button
          id="wishlist-btn"
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg transition-all duration-200
                      ${
                        wished
                          ? "bg-red-50 border-red-200 text-red-500"
                          : "bg-surface-2 border-surface-3 hover:bg-red-50 hover:border-red-200 hover:text-red-400"
                      }`}
        >
          <Heart size={18} className={wished ? "fill-red-500" : ""} />
        </button>
      </div>

      {/* Trust strip */}
      <div className="flex gap-3.5 mt-5 flex-wrap">
        {TRUST.map((t) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <span
              className="w-6 h-6 bg-surface-3 rounded-md flex items-center justify-center text-sm select-none"
              aria-hidden
            >
              {t.icon}
            </span>
            <span className="text-sm font-medium text-ink-2">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
