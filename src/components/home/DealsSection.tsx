import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const DealsSection = () => {
  const dealProducts = products
    .filter((p) => p.discount && p.discount >= 10)
    .slice(0, 8);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container-custom">
        {/* MATCHED HEADER DESIGN: Same as Collections/Featured */}
        <div className="flex items-end justify-between mb-10 px-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-light tracking-tighter text-zinc-900 dark:text-white uppercase flex items-center gap-2">
                Flash <span className="font-black">Deals</span>
              </h2>
              <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-medium">
                Limited Time Offers
              </p>
            </div>

            {/* Countdown Timer: Minimalist Style */}
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3 w-3 text-zinc-400" />
              <div className="flex gap-1.5 items-center">
                {[
                  { v: timeLeft.hours, l: "h" },
                  { v: timeLeft.minutes, l: "m" },
                  { v: timeLeft.seconds, l: "s" },
                ].map((t, i) => (
                  <div key={i} className="flex items-baseline gap-0.5">
                    <span className="text-lg font-black tabular-nums text-red-600">
                      {String(t.v).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      {t.l}
                    </span>
                    {i < 2 && (
                      <span className="text-zinc-300 dark:text-zinc-700 ml-1">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/hot-deals"
              className="group hidden md:flex items-center gap-2 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-all"
            >
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex gap-1">
              <Button
                onClick={() => scroll("left")}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none border border-zinc-200 dark:border-zinc-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => scroll("right")}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none border border-zinc-200 dark:border-zinc-800"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Content: Same logic as Featured Drops */}
        <div className="relative group">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-0 overflow-x-auto items-stretch snap-x snap-mandatory no-scrollbar border-l border-t border-zinc-200 dark:border-zinc-800"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {dealProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[80vw] sm:w-[300px] snap-start border-r border-b border-zinc-200 dark:border-zinc-800 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                {/* We use the updated ProductCard here */}
                <ProductCard product={product} variant="compact" />
              </div>
            ))}

            {/* Terminal CTA */}
            <Link
              to="/hot-deals"
              className="flex-shrink-0 w-[200px] snap-start border-r border-b border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/20 group/more"
            >
              <div className="h-12 w-12 border border-zinc-900 dark:border-white flex items-center justify-center group-hover/more:bg-red-600 group-hover/more:border-red-600 group-hover/more:text-white transition-all">
                <ArrowRight className="h-5 w-5" />
              </div>
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                More Deals
              </span>
            </Link>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mt-8 h-[1px] w-full bg-zinc-100 dark:bg-zinc-900 relative">
          <div
            className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
