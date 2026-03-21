import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useCategories } from "@/contexts/CategoryContext";

const CategorySection = () => {
  const { categories, isLoading } = useCategories();

  return (
    <section className="py-12 bg-white dark:bg-zinc-950">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-10 px-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-light tracking-tighter text-zinc-900 dark:text-white uppercase">
              Collections
            </h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-medium">
              Browse by Industry
            </p>
          </div>
          <Link
            to="/products"
            className="group flex items-center gap-2 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-all"
          >
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-zinc-200 dark:border-zinc-800">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Loading Categories
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-zinc-200 dark:border-zinc-800">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative flex flex-col border-r border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={category.imageUrl || "/placeholder-category.jpg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  <div className="absolute top-0 left-0 p-3">
                    <span className="text-[10px] font-black font-mono text-white mix-blend-difference opacity-40">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/10 transition-colors duration-500" />
                </div>

                <div className="p-4 md:p-6 flex flex-col items-start bg-white dark:bg-zinc-950 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900 transition-colors">
                  <div className="flex justify-between items-center w-full mb-2">
                    <span className="text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-widest">
                      Collection
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      ({category.productsCount || 0})
                    </span>
                  </div>

                  <h3 className="text-sm md:text-lg font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter leading-none line-clamp-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 md:hidden px-2">
          <Link to="/category">
            <button className="w-full py-4 border border-zinc-900 dark:border-white text-xs font-black uppercase tracking-[0.2em]">
              Browse Category
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
