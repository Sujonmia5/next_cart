import HeroSection from "@/components/modules/home/HeroSection";
import TrendingProducts from "@/components/modules/home/TrendingProducts";
import CategoriesSection from "@/components/modules/home/CategoriesSection";
import PromoBanner from "@/components/modules/home/PromoBanner";
import TestimonialsSection from "@/components/modules/home/TestimonialsSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <TrendingProducts />
      <CategoriesSection />
      <PromoBanner />
      <TestimonialsSection />
    </main>
  );
};

export default HomePage;
