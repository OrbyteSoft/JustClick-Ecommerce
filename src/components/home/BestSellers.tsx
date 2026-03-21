import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

const BestSellers = () => {
  const { homepageData, isLoading } = useProducts();
  const bestSellers = homepageData?.bestSellers?.slice(0, 8) || [];

  return (
    <section className="py-16 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container-custom">
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
            to="/products?filter=best-seller"
            className="group hidden sm:flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-[10px] font-medium uppercase tracking-[0.2em] hover:text-zinc-900 dark:hover:text-white transition-all"
          >
            View All
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-100 dark:border-zinc-900">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-300 mb-4" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Syncing Archive
              </span>
            </div>
          ) : bestSellers.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-zinc-100 dark:border-zinc-900">
              {bestSellers.map((product, index) => (
                <div
                  key={product.id}
                  className="border-r border-b border-zinc-100 dark:border-zinc-900 animate-fade-in p-2 md:p-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} variant="default" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-zinc-100 dark:border-zinc-900">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                No best sellers available in current rotation
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 sm:hidden flex justify-center px-2">
          <Link
            to="/products?filter=best-seller"
            className="px-8 py-4 border border-zinc-900 dark:border-white text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all w-full text-center"
          >
            Explore Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
