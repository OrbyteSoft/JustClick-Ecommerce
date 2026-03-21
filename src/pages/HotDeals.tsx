import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Flame, Zap, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";

const HotDeals = () => {
  const { homepageData, isLoading, fetchHomepageSections } = useProducts();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const flashDeals = homepageData?.flashDeals || [];

  useEffect(() => {
    if (!homepageData) fetchHomepageSections();
  }, [homepageData, fetchHomepageSections]);

  useEffect(() => {
    const deadlineStr =
      flashDeals.length > 0 ? flashDeals[0].flashDealEnd : null;

    if (!deadlineStr) return;

    const targetDate = new Date(deadlineStr).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [flashDeals]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <>
      <Helmet>
        <title>Flash Deals | Limited Time Offers</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <section className="relative overflow-hidden bg-zinc-950 h-[50vh] min-h-[400px] flex items-center justify-center">
            <div className="container-custom relative z-10 text-center px-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 mb-6 animate-pulse">
                <Zap className="h-4 w-4 text-red-600 fill-red-600" />
                <span className="text-red-600 text-[11px] font-bold uppercase tracking-widest">
                  Don't Miss Out
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic">
                FLASH{" "}
                <span className="text-red-600 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  SALE
                </span>
              </h1>

              <div className="flex justify-center items-center gap-4 md:gap-10">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex items-center">
                    <div className="flex flex-col">
                      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 w-16 h-16 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="relative text-3xl md:text-5xl font-black text-white tabular-nums">
                          {formatNumber(unit.value)}
                        </span>
                      </div>
                      <span className="text-[10px] md:text-[11px] uppercase font-bold tracking-widest text-zinc-400 mt-3">
                        {unit.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <span className="text-2xl md:text-4xl font-black text-zinc-700 ml-4 md:ml-10 mb-6">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white dark:bg-black">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                    Hot Deals Right Now
                  </h2>
                  <p className="text-muted-foreground font-medium text-base">
                    Grab your favorites before they're gone for good.
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-40">
                  <Loader2 className="h-12 w-12 animate-spin text-red-600" />
                </div>
              ) : flashDeals.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {flashDeals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
                  <Flame className="h-12 w-12 mx-auto text-zinc-300 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">All Deals Expired</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto mb-8">
                    Stay tuned! We are preparing new exclusive offers for you.
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full px-8"
                    onClick={() => fetchHomepageSections()}
                  >
                    Check for Updates
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HotDeals;
