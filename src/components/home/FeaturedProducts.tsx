import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 10);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="py-6 bg-card">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Featured Products</h2>
            <span className="hidden md:inline-block px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded">
              Handpicked for you
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex h-8 w-8"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex h-8 w-8"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Link
              to="/products?featured=true"
              className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProducts.map((product, index) => (
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

export default FeaturedProducts;
