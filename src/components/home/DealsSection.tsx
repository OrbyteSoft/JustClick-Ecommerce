import { Link } from "react-router-dom";
import { ArrowRight, Clock, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const DealsSection = () => {
  const dealProducts = products.filter((p) => p.discount && p.discount >= 10).slice(0, 8);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-6 bg-muted">
      <div className="container-custom">
        {/* Header */}
        <div className="bg-gradient-to-r from-destructive to-red-700 rounded-lg p-4 md:p-5 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-full bg-white/20">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Flash Deals</h2>
                <p className="text-sm text-white/80 hidden md:block">Limited time offers!</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Ends in:</span>
              </div>
              <div className="flex gap-1">
                {[
                  { value: timeLeft.hours, label: "H" },
                  { value: timeLeft.minutes, label: "M" },
                  { value: timeLeft.seconds, label: "S" },
                ].map((item, index) => (
                  <div key={index} className="bg-white/20 rounded px-2 py-1 text-center min-w-[40px]">
                    <div className="text-lg font-bold text-white leading-none">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] text-white/70">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-8 w-8 text-white hover:bg-white/20"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-8 w-8 text-white hover:bg-white/20"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Link
                to="/hot-deals"
                className="flex items-center gap-1 text-white text-sm font-semibold hover:underline"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Products Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dealProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[180px] md:w-[220px] snap-start animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
