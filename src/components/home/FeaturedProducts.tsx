import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 10);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
        {/* HEADER: Matches "Collections" section */}
        <div className="flex items-end justify-between mb-10 px-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-light tracking-tighter text-zinc-900 dark:text-white uppercase">
              Featured <span className="font-black">Drops</span>
            </h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-medium">
              Handpicked for your industry
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/products?featured=true"
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
                className="h-9 w-9 border border-zinc-200 dark:border-zinc-800 rounded-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => scroll("right")}
                variant="ghost"
                size="icon"
                className="h-9 w-9 border border-zinc-200 dark:border-zinc-800 rounded-none"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* CAROUSEL: Normalized height via items-stretch */}
        <div className="relative">
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
                <ProductCard product={product} variant="compact" />
              </div>
            ))}

            {/* View More Terminal Card */}
            <Link
              to="/products"
              className="flex-shrink-0 w-[180px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <div className="p-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full mb-4">
                <ArrowRight className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                View All Items
              </span>
            </Link>
          </div>

          {/* Progress Indicator Line */}
          <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-900 relative">
            <div
              className="absolute h-full bg-zinc-900 dark:bg-white transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
