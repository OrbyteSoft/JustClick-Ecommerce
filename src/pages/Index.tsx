import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DealsSection from "@/components/home/DealsSection";
import BestSellers from "@/components/home/BestSellers";
import TrustBadges from "@/components/home/TrustBadges";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Supply Sewa - Nepal's #1 Electronics Accessories Store</title>
        <meta
          name="description"
          content="Shop the latest electronic accessories, drones, cameras, mobile accessories, audio gear, and smart devices at Supply Sewa. Genuine products, fast delivery, best prices."
        />
        <meta name="keywords" content="electronics Nepal, drones, cameras, headphones, smartwatch, gaming gear, mobile accessories, computer peripherals" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-muted">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <CategorySection />
          <FeaturedProducts />
          <DealsSection />
          <BestSellers />
          <TrustBadges />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
