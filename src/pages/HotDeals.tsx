import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Flame, Percent, Zap, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const HotDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const dealProducts = products.filter((p) => p.discount && p.discount >= 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <>
      <Helmet>
        <title>Hot Deals | Supply Sewa - Limited Time Offers</title>
        <meta
          name="description"
          content="Flash sale! Grab the biggest discounts on electronics and gadgets."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-orange-500/30">
        <Header />

        <main className="flex-1">
          {/* HIGH-IMPACT HERO SECTION 
            - h-[70vh]: Sets height to 70% of viewport
            - flex items-center: Vertically centers content
          */}
          <section className="relative overflow-hidden bg-zinc-950 h-[70vh] min-h-[500px] flex items-center justify-center">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-orange-600/15 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="container-custom relative z-10 text-center px-4">
              {/* Flash Sale Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 animate-pulse">
                <Zap className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
                <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest">
                  Flash Sale Active
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
                DON'T{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  BLINK.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                The hottest tech deals disappear fast. Prices slashed up to{" "}
                <span className="text-white font-bold">50% OFF</span>.
              </p>

              {/* Advanced Countdown */}
              <div className="flex justify-center items-center gap-3 md:gap-8">
                {[
                  { label: "Hrs", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex items-center">
                    <div className="flex flex-col">
                      <div className="relative bg-zinc-900 border border-zinc-800 w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:border-orange-500/30">
                        <div className="absolute inset-0 bg-orange-500/5 rounded-xl md:rounded-2xl" />
                        <span className="relative text-2xl md:text-5xl font-black text-white tabular-nums">
                          {formatNumber(unit.value)}
                        </span>
                      </div>
                      <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-zinc-500 mt-2 md:mt-3">
                        {unit.label}
                      </span>
                    </div>

                    {/* Separator Colons */}
                    {i < 2 && (
                      <span className="text-xl md:text-3xl font-black text-zinc-800 ml-3 md:ml-8 mb-4 md:mb-6">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Deal Products Grid */}
          <section className="py-12 md:py-20 bg-zinc-50 dark:bg-black">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
                    Live Offers
                  </h2>
                  <p className="text-muted-foreground font-medium text-sm md:text-base">
                    Handpicked deals updated every hour.
                  </p>
                </div>
                <div className="inline-flex w-fit px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {dealProducts.length} Items Available
                </div>
              </div>

              {dealProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                  {dealProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 md:py-32 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 px-6">
                  <Flame className="h-10 w-10 mx-auto text-zinc-300 mb-4" />
                  <h3 className="text-lg font-bold">The fire went out!</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    All current deals have been claimed. Check back shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-full font-bold h-10 text-xs"
                    onClick={() => window.location.reload()}
                  >
                    Refresh Now
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
