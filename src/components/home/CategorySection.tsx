import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

const CategorySection = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Explore our wide range of products</p>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary hover:shadow-elevated transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                  <h3 className="font-semibold text-sm md:text-base leading-tight">{category.name}</h3>
                  <p className="text-xs text-primary-foreground/70 mt-1">
                    {category.productCount} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/products"
          className="sm:hidden flex items-center justify-center gap-1 text-primary font-semibold mt-6"
        >
          View All Categories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
