/** Large featured product card */

const FEATURED_PRODUCT = {
  emoji: "🎧",
  name: "Sony WH-1000XM5",
  category: "Premium Headphones",
  price: "$349.99",
  originalPrice: "$429.99",
  stats: [
    { value: "50K+", label: "Buyers" },
    { value: "4.9★", label: "Rating" },
    { value: "24h", label: "Delivery" },
  ],
};

export const FeaturedCard = () => {
  return (
    <div
      className="col-span-2 flex flex-row bg-white rounded-2xl border border-surface-3
                 overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer
                 shadow-card group"
    >
      {/* Emoji visual */}
      <div
        className="flex items-center justify-center w-32 shrink-0 bg-surface-3
                   text-5xl select-none group-hover:bg-accent-light transition-colors duration-300"
      >
        {FEATURED_PRODUCT.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 p-5">
        <p className="text-[11px] font-semibold text-accent tracking-widest uppercase">
          {FEATURED_PRODUCT.category}
        </p>
        <h3
          className="font-head font-bold text-base text-ink mt-0.5"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {FEATURED_PRODUCT.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-ink">
            {FEATURED_PRODUCT.price}
          </span>
          <span className="text-sm text-ink-4 line-through">
            {FEATURED_PRODUCT.originalPrice}
          </span>
          <span className="text-[10px] font-bold text-white bg-warm px-1.5 py-0.5 rounded-md">
            SALE
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-surface-3">
          {FEATURED_PRODUCT.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-sm font-bold text-ink">{s.value}</p>
              <p className="text-[10px] text-ink-4">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
