import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesBar from "@/components/home/FeaturesBar";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DealsSection from "@/components/home/DealsSection";
import SellerCTA from "@/components/home/SellerCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Supply Sewa - Nepal's Trusted Hardware & Construction Marketplace</title>
        <meta
          name="description"
          content="Shop computer hardware, electronics, tiles, marbles, ceramics, and sanitary wares at Supply Sewa. Nepal's leading online marketplace for quality products and trusted sellers."
        />
        <meta name="keywords" content="computer hardware Nepal, tiles Nepal, marbles, sanitary wares, electronics, construction materials" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <FeaturesBar />
          <CategorySection />
          <FeaturedProducts />
          <DealsSection />
          <SellerCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
