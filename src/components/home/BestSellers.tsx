import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const BestSellers = () => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <section className="py-6 bg-card">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-accent" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Best Sellers</h2>
          </div>
          <Link
            to="/products?bestseller=true"
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
