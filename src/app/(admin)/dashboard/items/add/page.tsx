/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductAddFrom from "@/components/modules/product/ProductAddFrom";

// ─── Page
export default function AddProductPage() {
  return (
    <div className="pb-20">
      <div className="bg-[#13141c] rounded-3xl border border-white/[0.06] p-8">
        <h1 className="font-head text-2xl font-extrabold text-white">
          Add New Product
        </h1>
        <p className="text-sm text-white/40 mt-1 mb-8">
          Fill in the fields below — all starred fields are required by the
          product model.
        </p>

        <ProductAddFrom />
      </div>
    </div>
  );
}
