import { TProduct } from "@/types/product.interface";
import Image from "next/image";

/** Large featured product card */
export const FeaturedCard = ({ product }: { product: TProduct }) => {
  const imageUrl =
    product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : "";
  const displayPrice = product.price ? `$${product.price}` : "N/A";

  return (
    <div
      className="col-span-2 flex flex-row bg-white rounded-2xl border border-surface-3
                 overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer
                 shadow-card group"
    >
      {/* Visual */}
      <div
        className="flex items-center justify-center w-32 shrink-0 bg-surface-3
                   text-5xl select-none group-hover:bg-accent-light transition-colors duration-300 overflow-hidden"
      >
        {imageUrl ? (
          <Image
            width={50}
            height={50}
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          "🎧"
        )}
      </div>

      {/* Info */}
      <div className="flex-1 p-5">
        <p className="text-[11px] font-semibold text-accent tracking-widest uppercase">
          {product.priority || "FEATURED"}
        </p>
        <h3
          className="font-head font-bold text-base text-ink mt-0.5 truncate"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-ink">{displayPrice}</span>
          <span className="text-[10px] font-bold text-white bg-warm px-1.5 py-0.5 rounded-md uppercase">
            {product.priority}
          </span>
        </div>

        {/* Short desc instead of stats */}
        <p className="text-xs text-ink-3 line-clamp-2 mt-2">
          {product.shortDescription}
        </p>
      </div>
    </div>
  );
};
