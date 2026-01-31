import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

const CategorySection = () => {
  return (
    <section className="py-12 bg-white dark:bg-zinc-950">
      <div className="container-custom">
        {/* Header - Editorial Style */}
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

        {/* Categories Grid - Square Aesthetic */}
        <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 overflow-x-auto no-scrollbar snap-x border-t border-l border-zinc-200 dark:border-zinc-800">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group flex-shrink-0 w-[160px] md:w-auto snap-start flex flex-col border-r border-b border-zinc-200 dark:border-zinc-800 relative overflow-hidden bg-white dark:bg-zinc-900 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              {/* Image Container - Strictly Square */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Minimalist Interaction Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              {/* Label - Bottom Anchored */}
              <div className="p-4 flex flex-col justify-between items-start flex-grow">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                  {category.productCount || 0} Items
                </span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>

              {/* Decorative Accent Line (Appears on Hover) */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-8 md:hidden px-2">
          <Link to="/products">
            <button className="w-full py-4 border border-zinc-900 dark:border-white text-xs font-black uppercase tracking-[0.2em]">
              Browse Catalog
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
