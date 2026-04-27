import { TProduct } from "@/types/product.interface";
import Image from "next/image";

/** Small product card */
export const HomeProductCard = ({ product }: { product: TProduct }) => {
  const imageUrl =
    product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : "";
  const displayPrice = product.price ? `$${product.price}` : "N/A";

  return (
    <div
      className="bg-white rounded-2xl border border-surface-3 overflow-hidden
                 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-card group"
    >
      {/* Visual */}
      <div
        className="flex items-center justify-center h-28 bg-surface-3 text-4xl select-none
                   group-hover:bg-accent-light transition-colors duration-300 overflow-hidden"
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
          "📦"
        )}
      </div>
      {/* Info */}
      <div className="p-3.5">
        <p className="text-sm font-semibold text-ink leading-tight truncate">
          {product.title}
        </p>
        <p className="text-sm font-bold text-accent mt-1">{displayPrice}</p>
      </div>
    </div>
  );
};
