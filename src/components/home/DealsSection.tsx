import { Link } from "react-router-dom";
import { ArrowRight, Clock, Flame } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { useState, useEffect } from "react";

const DealsSection = () => {
  const dealProducts = products.filter((p) => p.discount && p.discount >= 10).slice(0, 4);
  
  // Countdown timer (for demo purposes, ends in 24 hours)
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

  return (
    <section className="py-12 bg-background">
      <div className="container-custom">
        <div className="gradient-hero rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-primary-foreground">
              <div className="p-3 rounded-full bg-primary-foreground/20">
                <Flame className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Flash Deals</h2>
                <p className="text-primary-foreground/80">Limited time offers - grab them now!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary-foreground">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Ends in:</span>
              </div>
              <div className="flex gap-2">
                {[
                  { value: timeLeft.hours, label: "HRS" },
                  { value: timeLeft.minutes, label: "MIN" },
                  { value: timeLeft.seconds, label: "SEC" },
                ].map((item, index) => (
                  <div key={index} className="bg-primary-foreground/20 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-primary-foreground">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-primary-foreground/70">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/deals"
              className="hidden md:flex items-center gap-1 text-primary-foreground font-semibold hover:gap-2 transition-all"
            >
              View All Deals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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

        <Link
          to="/deals"
          className="md:hidden flex items-center justify-center gap-1 text-primary font-semibold mt-6"
        >
          View All Deals
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default DealsSection;
