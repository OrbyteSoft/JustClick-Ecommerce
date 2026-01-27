import { Link } from "react-router-dom";
import { ArrowRight, Plane, Camera, Smartphone, Headphones, Monitor, Watch, Home, Gamepad2 } from "lucide-react";
import { categories } from "@/data/products";

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="h-6 w-6" />,
  Camera: <Camera className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Headphones: <Headphones className="h-6 w-6" />,
  Monitor: <Monitor className="h-6 w-6" />,
  Watch: <Watch className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
  Gamepad2: <Gamepad2 className="h-6 w-6" />,
};

const CategorySection = () => {
  return (
    <section className="py-8 bg-card">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Shop by Category</h2>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative mb-2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        <Link
          to="/products"
          className="sm:hidden flex items-center justify-center gap-1 text-primary font-semibold mt-4 text-sm"
        >
          View All Categories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
