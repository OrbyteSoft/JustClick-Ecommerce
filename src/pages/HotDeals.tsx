import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Flame, Clock, Percent, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const HotDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Deal products (products with discounts)
  const dealProducts = products.filter((p) => p.discount && p.discount >= 10);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <>
      <Helmet>
        <title>Hot Deals - Supply Sewa</title>
        <meta name="description" content="Discover amazing deals and discounts on electronics, tiles, and more at Supply Sewa" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="gradient-hero py-12 md:py-16">
            <div className="container-custom">
              <div className="text-center text-primary-foreground">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 mb-4">
                  <Flame className="h-5 w-5 text-orange-300" />
                  <span className="font-medium">Limited Time Offers</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  🔥 Hot Deals
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                  Don't miss out on our biggest discounts! Up to 50% off on selected items.
                </p>
                
                {/* Countdown Timer */}
                <div className="inline-flex items-center gap-4 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl p-6">
                  <Clock className="h-6 w-6" />
                  <span className="font-medium">Ends in:</span>
                  <div className="flex gap-3">
                    <div className="bg-primary-foreground text-primary rounded-lg px-4 py-2 min-w-[60px]">
                      <span className="text-2xl font-bold">{formatNumber(timeLeft.hours)}</span>
                      <p className="text-xs">Hours</p>
                    </div>
                    <span className="text-2xl font-bold">:</span>
                    <div className="bg-primary-foreground text-primary rounded-lg px-4 py-2 min-w-[60px]">
                      <span className="text-2xl font-bold">{formatNumber(timeLeft.minutes)}</span>
                      <p className="text-xs">Mins</p>
                    </div>
                    <span className="text-2xl font-bold">:</span>
                    <div className="bg-primary-foreground text-primary rounded-lg px-4 py-2 min-w-[60px]">
                      <span className="text-2xl font-bold">{formatNumber(timeLeft.seconds)}</span>
                      <p className="text-xs">Secs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Bar */}
          <section className="bg-muted py-6 border-y border-border">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  <span className="font-medium">Up to 50% Off</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="font-medium">Flash Deals</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  <span className="font-medium">Best Sellers</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Daily Deals</span>
                </div>
              </div>
            </div>
          </section>

          {/* Deal Products */}
          <section className="container-custom py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Today's Best Deals</h2>
              <span className="text-muted-foreground">{dealProducts.length} products</span>
            </div>
            
            {dealProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {dealProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Flame className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No deals available right now</h3>
                <p className="text-muted-foreground">Check back soon for amazing offers!</p>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="bg-muted py-12">
            <div className="container-custom text-center">
              <h2 className="text-2xl font-bold mb-4">Want to be notified about new deals?</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Subscribe to our newsletter and never miss out on exclusive offers and discounts.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-4 rounded-lg border border-border bg-card"
                />
                <button className="gradient-hero text-primary-foreground h-12 px-6 rounded-lg font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HotDeals;
