import ProductUpdateForm from "@/components/modules/product/ProductUpdateForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  // Fetch the product by id
  const res = await fetch(`${process.env.BASE_URL}/api/products/${productId}`, {
    cache: "no-store",
  });
  
  if (!res.ok) {
    return (
      <div className="pb-20">
        <div className="bg-[#13141c] rounded-3xl border border-white/[0.06] p-8 text-center text-white">
          <p>Failed to load product. It might have been deleted or the server is down.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();
  const product = data?.data;

  // Format date correctly for the input field (YYYY-MM-DD)
  if (product?.date) {
    product.date = new Date(product.date).toISOString().split("T")[0];
  }

  return (
    <div className="pb-20">
      <div className="bg-[#13141c] rounded-3xl border border-white/[0.06] p-8">
        <h1 className="font-head text-2xl font-extrabold text-white">
          Edit Product
        </h1>
        <p className="text-sm text-white/40 mt-1 mb-8">
          Update the fields below — all starred fields are required by the
          product model.
        </p>

        {product ? (
          <ProductUpdateForm initialData={product} productId={productId} />
        ) : (
          <p className="text-white">Product not found.</p>
        )}
      </div>
    </div>
  );
}
