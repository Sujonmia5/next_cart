import ShopClient from "./ShopClient";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page || "1";
  const res = await fetch(`${process.env.BASE_URL}/api/products?page=${page}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const products = data?.data || [];

  return <ShopClient products={products} />;
}
