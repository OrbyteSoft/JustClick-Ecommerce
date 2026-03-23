import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Loader2, X, TrendingUp, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/contexts/ProductContext";
import { useCategories } from "@/contexts/CategoryContext";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

const SearchBar = ({ className, isMobile = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { products, isLoading, fetchProducts } = useProducts();
  const { categories } = useCategories();

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchProducts({ search: debouncedQuery, limit: 12, isActive: "true" });
    }
  }, [debouncedQuery, fetchProducts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && query.trim()) {
        navigate(`/products?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
        inputRef.current?.blur();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [query, navigate],
  );

  const handleAction = (term: string) => {
    if (!term.trim()) return;
    setQuery("");
    setIsOpen(false);
    navigate(`/products?q=${encodeURIComponent(term.trim())}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBrandName = (brand: any): string => {
    if (!brand) return "";
    return typeof brand === "object" ? brand.name || "" : brand;
  };

  // --- 🔍 1. Extract Unique Brands that match the search query ---
  const matchedBrands = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const queryLower = debouncedQuery.toLowerCase().trim();

    const uniqueBrands = new Set<string>();

    products.forEach((p) => {
      const bName = getBrandName(p.brand);
      if (bName && bName.toLowerCase().includes(queryLower)) {
        uniqueBrands.add(bName);
      }
    });

    return Array.from(uniqueBrands).slice(0, 3); // Top 3 matching brands
  }, [products, debouncedQuery]);

  // --- 📦 2. Standard Product Filter (Client side subset) ---
  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const lowerQuery = debouncedQuery.toLowerCase().trim();

    return products
      .filter((product) => {
        const productName = product.name.toLowerCase();
        const brandName = getBrandName(product.brand).toLowerCase();

        return (
          productName.includes(lowerQuery) || brandName.includes(lowerQuery)
        );
      })
      .slice(0, 6);
  }, [products, debouncedQuery]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={isMobile ? "Search..." : "Search products or brands..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full pl-11 pr-24 bg-muted/30 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20",
            isMobile ? "h-10" : "h-12",
          )}
        />
        <div className="absolute right-1.5 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => handleAction(query)}
            className={cn(
              "rounded-full font-bold",
              isMobile ? "h-8 px-3" : "h-9 px-4",
            )}
          >
            {isLoading && debouncedQuery.length >= 2 ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-background border border-border rounded-xl shadow-xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {debouncedQuery.length >= 2 ? (
            <div className="flex flex-col">
              {/* --- 🔥 Dropdown Quick Filters for Brands --- */}
              {matchedBrands.length > 0 && (
                <div className="p-3 border-b bg-primary/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">
                    Jump to Brand
                  </p>
                  <div className="flex flex-wrap gap-2 px-1">
                    {matchedBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleAction(brand)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Search className="h-3 w-3 opacity-60" />
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 border-b bg-muted/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">
                  Matching Products & Brands
                </p>
              </div>

              {isLoading ? (
                <div className="p-10 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-xs">Sifting through inventory...</span>
                </div>
              ) : filteredResults.length > 0 ? (
                <>
                  <ScrollArea className="max-h-[350px]">
                    <div className="p-2 space-y-1">
                      {filteredResults.map((product) => {
                        const brandName = getBrandName(product.brand);

                        return (
                          <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-all group/item"
                          >
                            <div className="h-12 w-12 rounded bg-muted overflow-hidden shrink-0">
                              <img
                                src={
                                  product.images?.[0]?.url || "/placeholder.png"
                                }
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm truncate">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-primary">
                                  {formatPrice(product.price)}
                                </span>
                                {brandName && (
                                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium truncate">
                                    {brandName}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-all text-primary" />
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  <Button
                    variant="ghost"
                    className="w-full rounded-none h-11 text-xs font-bold border-t hover:bg-primary/5 text-primary"
                    onClick={() => handleAction(query)}
                  >
                    View all results for "{query}"
                  </Button>
                </>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-sm font-medium">No results found</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <TrendingUp className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Popular Categories
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 8).map((category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      navigate(`/products?category=${category.slug}`)
                    }
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all text-xs font-medium"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
