import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Loader2, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

const popularSearches = [
  "iPhone Case",
  "Wireless Earbuds",
  "Power Bank",
  "Smartwatch",
  "Drone",
  "Gaming Headset",
];

const SearchBar = ({ className, isMobile = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data, isLoading } = useSearchProducts(
    debouncedQuery.length >= 2 ? debouncedQuery : "",
    8
  );

  const products = data?.products || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && query.trim()) {
        navigate(`/products?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
        setQuery("");
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [query, navigate]
  );

  const handleProductClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    navigate(`/products?q=${encodeURIComponent(term)}`);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={isMobile ? "Search products..." : "Search for electronics, gadgets, accessories..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full pr-20 bg-white text-foreground placeholder:text-muted-foreground border-0",
            isMobile ? "h-10 rounded-lg" : "h-11 rounded-sm"
          )}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className={cn("rounded-full", isMobile ? "h-7 w-7" : "h-8 w-8")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            onClick={handleSearchSubmit}
            className={cn("rounded-full", isMobile ? "h-9 w-9" : "h-10 w-10")}
          >
            {isLoading && debouncedQuery.length >= 2 ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          {debouncedQuery.length >= 2 ? (
            <>
              {isLoading ? (
                <div className="p-6 flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Searching...</span>
                </div>
              ) : products.length > 0 ? (
                <>
                  <ScrollArea className="max-h-[400px]">
                    <div className="p-2">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={handleProductClick}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="h-14 w-14 rounded-lg bg-muted overflow-hidden shrink-0">
                            {product.images?.[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                <Search className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {product.brand}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-semibold text-primary">
                                {formatPrice(product.price)}
                              </span>
                              {product.original_price && product.original_price > product.price && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(product.original_price)}
                                </span>
                              )}
                              {product.discount && product.discount > 0 && (
                                <span className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">
                                  -{product.discount}%
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="border-t border-border p-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-primary"
                      onClick={handleSearchSubmit}
                    >
                      View all results for "{query}"
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <p>No products found for "{query}"</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Button
                    key={term}
                    variant="secondary"
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() => handlePopularSearch(term)}
                  >
                    {term}
                  </Button>
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
