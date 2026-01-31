import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Filter,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  ChevronRight,
} from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

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

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    if (categorySlug) {
      result = result.filter(
        (p) => p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug,
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
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
        result = result
          .filter((p) => p.isNew)
          .concat(result.filter((p) => !p.isNew));
        break;
      default:
        result = result
          .filter((p) => p.isFeatured)
          .concat(result.filter((p) => !p.isFeatured));
    }

    return result;
  }, [categorySlug, searchQuery, sortBy, priceRange, selectedBrands]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-10">
      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6">
          Categories
        </h3>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`/products?category=${category.slug}`}
                className={`flex items-center justify-between py-2 px-3 transition-all duration-200 group ${
                  categorySlug === category.slug
                    ? "bg-primary/5 text-primary font-semibold border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                <span className="text-sm">{category.name}</span>
                <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100">
                  {category.productCount}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="bg-border/50" />

      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={300000}
            step={1000}
            className="mb-6"
          />
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground bg-muted/30 p-2 rounded">
            <span>Rs. {priceRange[0].toLocaleString()}</span>
            <span>Rs. {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6">
          Brands
        </h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center gap-3 px-1 py-1 hover:bg-muted/50 rounded transition-colors group cursor-pointer"
              onClick={() => toggleBrand(brand)}
            >
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                className="border-muted-foreground data-[state=checked]:bg-primary"
              />
              <label
                htmlFor={brand}
                className="text-sm leading-none cursor-pointer group-hover:text-foreground text-muted-foreground transition-colors"
              >
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

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10">
        <Header />
        <main className="flex-1">
          <div className="container-custom py-12">
            {/* Minimalist Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-12">
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
              <ChevronRight className="h-3 w-3 opacity-30" />
              <a
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Products
              </a>
              {currentCategory && (
                <>
                  <ChevronRight className="h-3 w-3 opacity-30" />
                  <span className="text-foreground font-bold">
                    {currentCategory.name}
                  </span>
                </>
              )}
            </nav>

            {/* Title Section */}
            <div className="mb-12 border-b border-border pb-8">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : currentCategory?.name || "All Products"}
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {filteredProducts.length} products found
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar - Desktop */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-32">
                  <FilterSidebar />
                </div>
              </aside>

              {/* Main content */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-10 gap-4 flex-wrap bg-muted/20 p-2 rounded-lg border border-border/40">
                  <div className="flex items-center gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="lg:hidden text-xs uppercase tracking-tighter"
                        >
                          <Filter className="h-3 w-3 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="left"
                        className="w-80 overflow-y-auto"
                      >
                        <SheetHeader className="mb-8 border-b pb-4">
                          <SheetTitle className="uppercase tracking-widest text-sm">
                            Filters
                          </SheetTitle>
                        </SheetHeader>
                        <FilterSidebar />
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[190px] h-9 text-xs border-none bg-transparent hover:bg-muted transition-colors">
                        <SlidersHorizontal className="h-3 w-3 mr-2 opacity-50" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="hidden sm:flex items-center bg-background border rounded-md p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-sm ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-sm ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                        onClick={() => setViewMode("list")}
                      >
                        <LayoutList className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Products grid */}
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8"
                      : "space-y-6"
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-24 border border-dashed rounded-2xl bg-muted/10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                      <Filter className="h-5 w-5 text-muted-foreground opacity-50" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      No products found
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
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
