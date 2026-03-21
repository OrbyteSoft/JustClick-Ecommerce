import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductContext";

const HeroSection = () => {
  const { homepageData, isLoading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Extract New Arrivals from Context
  const newArrivals = homepageData?.newArrivals?.slice(0, 5) || [];

  const nextSlide = useCallback(() => {
    if (newArrivals.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
  }, [newArrivals.length]);

  const prevSlide = () => {
    if (newArrivals.length === 0) return;
    setCurrentSlide(
      (prev) => (prev - 1 + newArrivals.length) % newArrivals.length,
    );
  };

  useEffect(() => {
    if (newArrivals.length > 0) {
      const timer = setInterval(nextSlide, 6000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, newArrivals.length]);

  if (isLoading) {
    return (
      <div className="h-[320px] md:h-[500px] w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-zinc-950 transition-colors">
      <div className="container-custom py-4 md:py-6">
        <div className="relative group overflow-hidden bg-zinc-900">
          {/* Main Slider */}
          <div className="relative h-[400px] md:h-[550px] lg:h-[600px] w-full">
            {newArrivals.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                }`}
              >
                {/* Product Image with Zoom Effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-linear"
                  style={{
                    backgroundImage: `url(${product.images[0]?.url || "/placeholder.png"})`,
                    transform:
                      index === currentSlide ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {/* Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center px-6 md:px-20">
                  <div className="max-w-2xl text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-[10px] font-black uppercase tracking-widest mb-6">
                      <Zap className="h-3 w-3 fill-current" />
                      New Arrival
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
                      {product.name}
                    </h2>

                    <p className="text-sm md:text-lg mb-8 text-zinc-300 line-clamp-2 max-w-md font-medium">
                      {product.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-none px-10 bg-white text-black hover:bg-zinc-200 transition-all font-black uppercase tracking-widest text-xs"
                      >
                        <Link to={`/product/${product.slug}`}>
                          Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <div className="flex flex-col">
                        <span className="text-white text-[10px] uppercase font-bold tracking-widest">
                          Starting at
                        </span>
                        <span className="text-2xl font-black text-white">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {newArrivals.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 hover:bg-white hover:text-black text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm hidden md:block"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 hover:bg-white hover:text-black text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm hidden md:block"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-10 left-6 md:left-20 z-20 flex gap-2">
                {newArrivals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-500 h-1 ${
                      index === currentSlide
                        ? "w-12 bg-red-600"
                        : "w-6 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
