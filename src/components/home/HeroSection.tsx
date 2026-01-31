import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Truck,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { banners } from "@/data/products";

const highlights = [
  { icon: Zap, text: "Flash Deals", color: "text-amber-500" },
  { icon: Truck, text: "Free Delivery", color: "text-blue-500" },
  { icon: Shield, text: "Genuine Only", color: "text-green-500" },
  { icon: Award, text: "Top Brands", color: "text-purple-500" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="relative group overflow-hidden rounded-none shadow-xl bg-slate-100">
          {/* Main Slider */}
          <div className="relative h-[320px] md:h-[450px] lg:h-[500px] w-full">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                }`}
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear"
                  style={{
                    backgroundImage: `url(${banner.image})`,
                    transform:
                      index === currentSlide ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} via-black/40 to-transparent`}
                  />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center px-6 md:px-16">
                  <div className="max-w-xl text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs md:text-sm font-semibold mb-4 animate-in fade-in slide-in-from-bottom-3">
                      <Zap className="h-3 w-3 fill-current" />
                      {banner.subtitle}
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-lg">
                      {banner.title}
                    </h2>
                    <p className="text-sm md:text-lg mb-8 text-white/80 line-clamp-2 max-w-md">
                      {banner.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 bg-white text-black hover:bg-slate-100 hover:scale-105 transition-all shadow-lg"
                      >
                        <Link
                          to={banner.link}
                          className="flex items-center gap-2"
                        >
                          {banner.cta} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls - Hidden on Mobile, Visible on Hover on Desktop */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm hidden md:block"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm hidden md:block"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-8 bg-white h-2"
                    : "w-2 bg-white/50 h-2 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
