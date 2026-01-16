import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Filter, SlidersHorizontal, Grid3X3, LayoutList, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { products, categories } from "@/data/products";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";

  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const currentCategory = categories.find((c) => c.slug === categorySlug);
  const brands = [...new Set(products.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (categorySlug) {
      result = result.filter(
        (p) => p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      default:
        result = result.filter((p) => p.isFeatured).concat(result.filter((p) => !p.isFeatured));
    }

    return result;
  }, [categorySlug, searchQuery, sortBy, priceRange, selectedBrands]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4 text-foreground">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`/products?category=${category.slug}`}
                className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                  categorySlug === category.slug
                    ? "bg-accent text-accent-foreground font-medium"
                    : "hover:bg-muted"
                }`}
              >
                <span>{category.name}</span>
                <span className="text-sm text-muted-foreground">{category.productCount}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4 text-foreground">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={300000}
          step={1000}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Rs. {priceRange[0].toLocaleString()}</span>
          <span>Rs. {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4 text-foreground">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>
          {searchQuery
            ? `Search: "${searchQuery}" - Supply Sewa`
            : currentCategory
            ? `${currentCategory.name} - Supply Sewa`
            : "All Products - Supply Sewa"}
        </title>
        <meta
          name="description"
          content={`Shop ${searchQuery ? `results for "${searchQuery}"` : currentCategory?.name || "all products"} at Supply Sewa. Best prices, quality products, and trusted sellers.`}
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container-custom py-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-primary">Home</a>
              <span className="mx-2">/</span>
              <a href="/products" className="hover:text-primary">Products</a>
              {currentCategory && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{currentCategory.name}</span>
                </>
              )}
            </nav>

            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : currentCategory?.name || "All Products"}
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>

            <div className="flex gap-8">
              {/* Sidebar - Desktop */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-32">
                  <FilterSidebar />
                </div>
              </aside>

              {/* Main content */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    {/* Mobile filter button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="lg:hidden">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterSidebar />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View mode */}
                    <div className="hidden sm:flex items-center border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="icon"
                        className="rounded-r-none"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="icon"
                        className="rounded-l-none"
                        onClick={() => setViewMode("list")}
                      >
                        <LayoutList className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Products grid */}
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No products found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Products;
