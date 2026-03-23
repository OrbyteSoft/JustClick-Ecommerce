import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Filter,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  ChevronRight,
  Loader2,
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
import { Separator } from "@/components/ui/separator";
import { useProducts } from "@/contexts/ProductContext";
import { useCategories } from "@/contexts/CategoryContext";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, fetchProducts } = useProducts();
  const { categories } = useCategories();

  const categorySlug = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";

  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Track the master list of all brands so it never disappears when results filter down
  const [allBrandsMasterList, setAllBrandsMasterList] = useState<any[]>([]);

  const getBrandName = (brand: any): string => {
    if (!brand) return "";
    return typeof brand === "object" ? brand.name || "" : brand;
  };

  // 1. Compute brands from incoming products
  const currentBrandsList = useMemo(() => {
    const uniqueBrands = new Map<string, any>();

    products.forEach((p) => {
      if (p.brand === null || p.brand === undefined) return;

      if (typeof p.brand === "object" && "name" in p.brand) {
        const id = p.brand.id || p.brand.name;
        uniqueBrands.set(String(id), p.brand);
      } else if (typeof p.brand === "string") {
        uniqueBrands.set(p.brand, p.brand);
      }
    });

    return Array.from(uniqueBrands.values());
  }, [products]);

  // 🔥 PERSISTENT SIDEBAR FIX: Keep adding new brands to our master list so they never vanish
  useEffect(() => {
    if (currentBrandsList.length > 0) {
      setAllBrandsMasterList((prevMaster) => {
        const masterMap = new Map();

        // Load existing ones
        prevMaster.forEach((b) => {
          const bName = getBrandName(b);
          masterMap.set(bName, b);
        });

        // Add incoming ones
        currentBrandsList.forEach((b) => {
          const bName = getBrandName(b);
          masterMap.set(bName, b);
        });

        return Array.from(masterMap.values());
      });
    }
  }, [currentBrandsList]);

  // 🔥 AUTO-CHECK BRAND FROM URL PARAM
  useEffect(() => {
    if (!searchQuery.trim() || products.length === 0 || isLoading) return;

    const query = searchQuery.toLowerCase().trim();

    const matchedProduct = products.find((p) => {
      const bName = getBrandName(p.brand);
      return bName.toLowerCase().trim() === query;
    });

    if (matchedProduct) {
      const matchedBrandName = getBrandName(matchedProduct.brand);

      setSelectedBrands((prev) =>
        prev.includes(matchedBrandName) ? prev : [...prev, matchedBrandName],
      );

      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("q");
          return next;
        },
        { replace: true },
      );
    }
  }, [searchQuery, products, isLoading, setSearchParams]);

  // Main Fetch Logic
  useEffect(() => {
    const params: Record<string, any> = {
      categoryId:
        categories.find((c) => c.slug === categorySlug)?.id || undefined,
      search: searchQuery || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy: sortBy,
      sortOrder: sortBy === "price-low" ? "asc" : "desc",
      isActive: "true",
    };

    const handler = setTimeout(() => {
      fetchProducts(params);
    }, 300);

    return () => clearTimeout(handler);
  }, [
    categorySlug,
    searchQuery,
    priceRange,
    sortBy,
    fetchProducts,
    categories,
  ]);

  const currentCategory = useMemo(
    () => categories.find((c) => c.slug === categorySlug),
    [categories, categorySlug],
  );

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName],
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedBrands([]);
    setSortBy("featured");
    setSearchParams({});
  };

  const displayedProducts = useMemo(() => {
    return products.filter((p) => {
      const bName = getBrandName(p.brand);

      if (selectedBrands.length > 0 && !selectedBrands.includes(bName)) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = bName.toLowerCase().includes(query);

        if (!matchesName && !matchesBrand) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedBrands, searchQuery]);

  const FilterSidebar = () => (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
          Categories
        </h3>
        {(categorySlug || searchQuery || selectedBrands.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-[10px] text-primary hover:bg-transparent"
          >
            Clear All
          </Button>
        )}
      </div>

      <div>
        <ul className="space-y-1 mt-6">
          <li>
            <Link
              to="/products"
              className={`flex items-center justify-between py-2 px-3 transition-all duration-200 ${
                !categorySlug && !searchQuery
                  ? "bg-primary/5 text-primary font-medium border-l border-primary"
                  : "text-muted-foreground hover:text-foreground border-l border-transparent"
              }`}
            >
              <span className="text-sm">All Collections</span>
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/products?category=${category.slug}`}
                className={`flex items-center justify-between py-2 px-3 transition-all duration-200 group ${
                  categorySlug === category.slug
                    ? "bg-primary/5 text-primary font-medium border-l border-primary"
                    : "text-muted-foreground hover:text-foreground border-l border-transparent"
                }`}
              >
                <span className="text-sm">{category.name}</span>
                <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100">
                  {category.productsCount || 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="bg-border/50" />

      {/* Modern High-End Price Range UI */}
      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-6">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={500000}
            step={5000}
            className="mb-5 cursor-pointer"
          />

          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full border border-border/60 bg-background shadow-sm text-xs font-mono tracking-tight font-medium text-foreground">
              Rs. {priceRange[0].toLocaleString()}
            </span>

            <span className="h-[1px] flex-1 bg-border/40"></span>

            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full border border-border/60 bg-background shadow-sm text-xs font-mono tracking-tight font-medium text-foreground">
              Rs. {priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {allBrandsMasterList.length > 0 && (
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-6">
            Brands
          </h3>
          <div className="space-y-2">
            {allBrandsMasterList.map((brand) => {
              const brandName = getBrandName(brand);
              const brandId = typeof brand === "object" ? brand.id : brand;

              return (
                <div
                  key={String(brandId)}
                  className="flex items-center gap-3 px-1 py-1 hover:bg-muted/50 rounded transition-colors group cursor-pointer"
                  onClick={() => toggleBrand(brandName)}
                >
                  <Checkbox
                    id={String(brandId)}
                    checked={selectedBrands.includes(brandName)}
                    onCheckedChange={() => toggleBrand(brandName)}
                  />
                  <label
                    htmlFor={String(brandId)}
                    className="text-sm cursor-pointer text-muted-foreground group-hover:text-foreground font-light"
                  >
                    {brandName}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>
          {searchQuery
            ? `Search: "${searchQuery}" - Just Click`
            : currentCategory
              ? `${currentCategory.name} - Just Click`
              : "All Products - Just Click"}
        </title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container-custom py-12">
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-12">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-30" strokeWidth={1.5} />
              <Link to="/products" className="hover:text-primary">
                Products
              </Link>
              {currentCategory && (
                <>
                  <ChevronRight
                    className="h-3 w-3 opacity-30"
                    strokeWidth={1.5}
                  />
                  <span className="text-foreground font-medium">
                    {currentCategory.name}
                  </span>
                </>
              )}
            </nav>

            <div className="mb-12 border-b border-border pb-8">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : currentCategory?.name || "All Products"}
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">
                {displayedProducts.length} products found
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-32">
                  <FilterSidebar />
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-10 gap-4 flex-wrap bg-muted/20 p-2 rounded-lg border border-border/40">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden text-xs font-light"
                      >
                        <Filter className="h-3 w-3 mr-2" strokeWidth={1.5} />{" "}
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="text-sm font-medium tracking-widest uppercase">
                          Filter Menu
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[190px] h-9 text-xs border-none bg-transparent hover:bg-muted font-light">
                        <SlidersHorizontal
                          className="h-3 w-3 mr-2 opacity-50"
                          strokeWidth={1.5}
                        />
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
                      </SelectContent>
                    </Select>

                    <div className="hidden sm:flex items-center bg-background border rounded-md p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 ${viewMode === "grid" ? "bg-muted" : ""}`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 ${viewMode === "list" ? "bg-muted" : ""}`}
                        onClick={() => setViewMode("list")}
                      >
                        <LayoutList className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </Button>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 opacity-50">
                    <Loader2
                      className="h-8 w-8 animate-spin mb-4"
                      strokeWidth={1.5}
                    />
                    <p className="text-[10px] uppercase tracking-widest font-light">
                      Updating Collection...
                    </p>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-2 xl:grid-cols-3 gap-8"
                        : "space-y-6"
                    }
                  >
                    {displayedProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                    {displayedProducts.length === 0 && (
                      <div className="col-span-full text-center py-24 border border-dashed rounded-2xl bg-muted/10">
                        <h3 className="text-lg font-medium mb-1">
                          No products found
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6 font-light">
                          Try adjusting your filters or search criteria
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearFilters}
                          className="font-light"
                        >
                          Reset All Filters
                        </Button>
                      </div>
                    )}
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
