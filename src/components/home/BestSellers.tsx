import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const BestSellers = () => {
  // Filtering for best sellers and taking the top 8
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <section className="py-16 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container-custom">
        {/* HEADER DESIGN - Refined to use Light font weight */}
        <div className="flex items-end justify-between mb-10 px-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
          <div>
            <h2 className="text-xl md:text-3xl font-light tracking-tighter text-zinc-900 dark:text-white uppercase flex items-center gap-2">
              Best <span className="font-black">Sellers</span>
            </h2>
            <p className="text-zinc-400 text-[10px] mt-2 uppercase tracking-[0.2em] font-medium">
              Top Performance Industry Standards
            </p>
          </div>

          <Link
            to="/products?bestseller=true"
            className="group hidden sm:flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-[10px] font-medium uppercase tracking-[0.2em] hover:text-zinc-900 dark:hover:text-white transition-all"
          >
            View All
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* BORDER-GRID LAYOUT - Updated for 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-zinc-100 dark:border-zinc-900">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="border-r border-b border-zinc-100 dark:border-zinc-900 animate-fade-in p-2 md:p-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* ProductCard component handles the internal layout */}
              <ProductCard product={product} variant="default" />
            </div>
          ))}
        </div>

        {/* MOBILE VIEW ALL - Minimalist style */}
        <div className="mt-12 sm:hidden flex justify-center">
          <Link
            to="/products?bestseller=true"
            className="px-8 py-4 border border-zinc-100 dark:border-zinc-900 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 hover:bg-zinc-900 hover:text-white transition-all w-full text-center"
          >
            Explore Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
