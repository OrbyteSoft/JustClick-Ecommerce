import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCategories } from "@/contexts/CategoryContext";
import { Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";

const Category = () => {
  const { categories, isLoading } = useCategories();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="container-custom py-10 md:py-20 lg:py-24">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">
              Shop by Category<span className="text-primary">.</span>
            </h1>
            <p className="text-zinc-500 text-sm md:text-base mt-4 leading-relaxed max-w-xl">
              Explore our curated collections designed for performance and
              style.
            </p>
          </div>
        </div>

        <div className="container-custom py-6 md:py-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Loading Collections
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={cat.imageUrl || "/api/placeholder/600/800"}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-1 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[8px] md:text-[10px] font-mono font-bold">
                        {cat.productsCount || 0} UNITS
                      </span>
                    </div>
                  </div>

                  <div className="p-3 md:p-6 flex flex-col items-start flex-1">
                    <h2 className="text-sm md:text-2xl font-bold uppercase tracking-tight mb-1 line-clamp-1">
                      {cat.name}
                    </h2>
                    <p className="hidden md:block text-xs text-zinc-500 uppercase leading-relaxed mb-6 line-clamp-2">
                      {cat.description ||
                        `Browse the latest arrivals in our ${cat.name} collection.`}
                    </p>
                    <div className="mt-auto flex items-center justify-between w-full">
                      <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] group-hover:text-primary transition-colors">
                        <span>Shop Now</span>
                        <ArrowRight className="h-2 w-2 md:h-3 md:w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                      <span className="md:hidden text-[8px] text-zinc-400 font-mono">
                        [{cat.productsCount || 0}]
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
