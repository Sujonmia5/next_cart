import HeroSection from "@/components/modules/home/HeroSection";
import TrendingProducts from "@/components/modules/home/TrendingProducts";
import CategoriesSection from "@/components/modules/home/CategoriesSection";
import PromoBanner from "@/components/modules/home/PromoBanner";
import TestimonialsSection from "@/components/modules/home/TestimonialsSection";
import { TProduct } from "@/types/product.interface";

async function getProducts() {
  const res = await fetch(
    `${process.env.BASE_URL}/api/products?limit=4&priority=high`,
  );
  const data = await res.json();
  return data?.data || [];
}

const HomePage = async () => {
  const products: TProduct[] = await getProducts();

  return (
    <main>
      <HeroSection products={products} />
      <TrendingProducts Products={products} />
      <CategoriesSection />
      <PromoBanner />
      <TestimonialsSection />
    </main>
  );
};

export default HomePage;
