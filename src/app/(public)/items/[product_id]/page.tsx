import { ProductDetails } from "@/components/modules/product/ProductDetails";
import { RelatedProducts } from "@/components/modules/product/RelatedProducts";
import { TProduct } from "@/types/product.interface";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) {
  const { product_id } = await params;

  // 1. Fetch main product
  const productRes = await fetch(`${process.env.BASE_URL}/api/products/${product_id}`, {
    cache: "no-store",
  });
  
  if (!productRes.ok) {
    return notFound();
  }

  const productData = await productRes.json();
  const product: TProduct = productData.data;

  // 2. Fetch related products (for now just fetching all and filtering current)
  const relatedRes = await fetch(`${process.env.BASE_URL}/api/products`, {
    cache: "no-store",
  });
  const relatedData = await relatedRes.json();
  const allProducts: TProduct[] = relatedData.data || [];
  
  const relatedProducts = allProducts
    .filter((p) => String(p._id) !== product_id)
    .slice(0, 4);

  return (
    <main className="pt-[88px] pb-20 bg-surface-2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
