import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/contexts/ProductContext"; // Updated to use Context
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

const FeaturedProducts = () => {
  // Use context instead of local data
  const { homepageData, isLoading, fetchHomepageSections } = useProducts();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fetch data on mount if not already present
  useEffect(() => {
    if (!homepageData) {
      fetchHomepageSections();
    }
  }, [homepageData, fetchHomepageSections]);

  // Extract featured products from context (limit to 10)
  const featuredProducts = homepageData?.featured?.slice(0, 10) || [];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
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
        {/* HEADER */}
        <div className="flex items-end justify-between mb-10 px-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-light tracking-tighter text-zinc-900 dark:text-white uppercase">
              Featured <span className="font-black">Drops</span>
            </h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-medium">
              Handpicked from our premium archive
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/products?filter=featured"
              className="group hidden md:flex items-center gap-2 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-all"
            >
              Explore All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex gap-1">
              <Button
                onClick={() => scroll("left")}
                variant="ghost"
                size="icon"
                className="h-9 w-9 border border-zinc-200 dark:border-zinc-800 rounded-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => scroll("right")}
                variant="ghost"
                size="icon"
                className="h-9 w-9 border border-zinc-200 dark:border-zinc-800 rounded-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="relative">
          {isLoading ? (
            <div className="flex h-[400px] items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Accessing Archive
                </span>
              </div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar items-stretch"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[240px] md:w-[280px] snap-start"
                  >
                    <ProductCard product={product} variant="default" />
                  </div>
                ))}

                {/* View More Terminal Card */}
                <Link
                  to="/products?filter=featured"
                  className="flex-shrink-0 w-[180px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group"
                >
                  <div className="p-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-none mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    View Full Series
                  </span>
                </Link>
              </div>

              {/* Progress Indicator Line */}
              <div className="h-[2px] w-full bg-zinc-100 dark:bg-zinc-900 relative mt-4">
                <div
                  className="absolute h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${Math.max(scrollProgress, 5)}%` }}
                />
              </div>
            </>
          ) : (
            <div className="py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                No items currently designated as "Featured"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
