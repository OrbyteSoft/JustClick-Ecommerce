import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Truck, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { banners } from "@/data/products";

const highlights = [
  { icon: Zap, text: "Flash Deals" },
  { icon: Truck, text: "Free Delivery" },
  { icon: Shield, text: "Genuine Products" },
  { icon: Award, text: "Top Brands" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="bg-muted">
      <div className="container-custom py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Banner */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-lg">
            <div className="relative h-[280px] md:h-[360px]">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0"
                      : index < currentSlide
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${banner.image})` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`} />
                  </div>
                  <div className="relative h-full flex items-center px-8 md:px-12">
                    <div className="max-w-lg text-white animate-fade-in">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-3">
                        {banner.subtitle}
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                        {banner.title}
                      </h2>
                      <p className="text-base md:text-lg mb-6 text-white/90 line-clamp-2">
                        {banner.description}
                      </p>
                      <Link to={banner.link}>
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold group">
                          {banner.cta}
                          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-6"
                        : "bg-white/40 w-2 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="hidden lg:flex flex-col gap-4">
            <Link 
              to="/products?new=true" 
              className="flex-1 relative overflow-hidden rounded-lg bg-gradient-to-br from-accent to-amber-500 p-5 text-secondary group"
            >
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80">New Arrivals</span>
                <h3 className="text-xl font-bold mt-1 mb-2">Latest Gadgets</h3>
                <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                  Shop Now
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full" />
            </Link>
            
            <Link 
              to="/hot-deals" 
              className="flex-1 relative overflow-hidden rounded-lg bg-gradient-to-br from-destructive to-red-700 p-5 text-white group"
            >
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80">Limited Time</span>
                <h3 className="text-xl font-bold mt-1 mb-2">Flash Sale 🔥</h3>
                <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                  View Deals
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
            </Link>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-card rounded-lg p-3 border border-border"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-sm text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
