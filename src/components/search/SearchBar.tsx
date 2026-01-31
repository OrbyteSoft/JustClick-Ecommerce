import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Loader2, X, TrendingUp, ArrowRight } from "lucide-react";
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
  "iPhone 15 Pro",
  "Mechanical Keyboard",
  "Noise Cancelling Headphones",
  "OLED Monitor",
  "Gaming Mouse",
  "USB-C Hub",
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
    6,
  );

  const products = data?.products || [];

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
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [query, navigate],
  );

  const handleAction = (term: string) => {
    setQuery("");
    setIsOpen(false);
    navigate(`/products?q=${encodeURIComponent(term)}`);
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
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground transition-colors group-focus-within/parent:text-primary" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={isMobile ? "Search..." : "Search for the latest tech..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full pl-11 pr-24 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            isMobile ? "h-10" : "h-12",
          )}
        />
        <div className="absolute right-1.5 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              className="h-8 w-8 rounded-full hover:bg-muted/50"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => handleAction(query)}
            className={cn(
              "rounded-full font-bold transition-all shadow-sm",
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

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {debouncedQuery.length >= 2 ? (
            <div className="flex flex-col">
              <div className="p-3 border-b border-border/50 bg-muted/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">
                  Matching Products
                </p>
              </div>

              {isLoading ? (
                <div className="p-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="text-sm font-medium">
                    Sifting through inventory...
                  </span>
                </div>
              ) : products.length > 0 ? (
                <>
                  <ScrollArea className="max-h-[380px]">
                    <div className="p-2 space-y-1">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 p-2 rounded-xl hover:bg-primary/5 transition-all group/item"
                        >
                          <div className="h-14 w-14 rounded-lg bg-muted overflow-hidden shrink-0 border border-border/50">
                            <img
                              src={product.images?.[0] || "/placeholder.png"}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform group-hover/item:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm truncate group-hover/item:text-primary transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {product.brand}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-black text-foreground">
                                {formatPrice(product.price)}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-[10px] bg-red-500/10 text-red-600 font-bold px-1.5 py-0.5 rounded">
                                  -{product.discount}%
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-primary mr-2" />
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button
                    variant="ghost"
                    className="w-full rounded-none h-12 text-sm font-bold border-t border-border/50 hover:bg-primary/5 text-primary"
                    onClick={() => handleAction(query)}
                  >
                    View all results for "{query}"
                  </Button>
                </>
              ) : (
                <div className="p-10 text-center">
                  <p className="font-bold text-sm">No results found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try a different search term.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Trending Now
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleAction(term)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all text-xs font-medium border border-border/50"
                  >
                    <Search className="h-3 w-3 opacity-50" />
                    {term}
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
