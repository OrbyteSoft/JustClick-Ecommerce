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
        <title>Just Click - Nepal's #1 Electronics & Gadget Store</title>
        <meta
          name="description"
          content="Shop the latest electronic gadgets, home appliances, drones, cameras, and smart devices at Just Click. Quality products, fast delivery, and the best prices in Nepal."
        />
        <meta
          name="keywords"
          content="Just Click, electronics Nepal, gadgets, home appliances, drones, cameras, headphones, smartwatch, gaming gear, mobile accessories"
        />
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
