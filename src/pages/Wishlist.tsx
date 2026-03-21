import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";

const Wishlist = () => {
  const { wishlistItems, toggleWishlist, clearWishlist, isLoading } =
    useWishlist();
  const { addToCart } = useCart();

  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const handleAddToCart = async (product: any) => {
    try {
      setActionLoadingId(product.id);
      await addToCart(product.id, 1);
      await toggleWishlist(product.id);
      toast.success(`${product.name} moved to shopping bag`);
    } catch (error) {
      toast.error("Failed to move item to cart");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      setActionLoadingId(productId);
      await toggleWishlist(productId);
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleClearAll = async () => {
    try {
      setClearing(true);
      await clearWishlist();
      toast.success("Wishlist cleared");
    } finally {
      setClearing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>My Wishlist | Just Click</title>
        </Helmet>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center py-10 md:py-20">
            <div className="text-center px-4 max-w-md">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-secondary flex items-center justify-center rounded-none">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Your wishlist is empty
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Save items that you like in your wishlist. Review them anytime
                and easily move them to the cart.
              </p>
              <Link to="/products">
                <Button
                  size="lg"
                  className="rounded-none w-full md:w-auto px-8 font-semibold"
                >
                  Browse Products <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Wishlist (${wishlistItems.length}) | Just Click`}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4 md:gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6 md:pb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-primary fill-current" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    My Collection
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  My Wishlist
                </h1>
              </div>

              <Button
                variant="outline"
                disabled={clearing}
                className="text-xs font-semibold rounded-none border-zinc-200 dark:border-zinc-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 transition-colors h-10 md:h-12"
                onClick={handleClearAll}
              >
                {clearing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Clear All Items"
                )}
              </Button>
            </div>

            {/* Grid Section - Mobile Friendly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {wishlistItems.map((product) => {
                const displayImage =
                  product.images?.[0]?.url || "/placeholder.png";
                const isProcessing = actionLoadingId === product.id;

                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-none p-3 md:p-4 shadow-sm transition-all"
                  >
                    {/* Image Wrapper */}
                    <div className="relative aspect-square overflow-hidden mb-4 rounded-none bg-zinc-50 dark:bg-zinc-800">
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 md:group-hover:scale-105"
                        />
                      </Link>

                      {/* Remove Button */}
                      <button
                        disabled={isProcessing}
                        className="absolute top-0 right-0 p-2.5 bg-white/90 dark:bg-zinc-900/90 border-l border-b border-zinc-100 dark:border-zinc-800 hover:bg-red-600 hover:text-white transition-all z-10 disabled:opacity-50 text-zinc-600 dark:text-zinc-300"
                        onClick={() => handleRemove(product.id)}
                        title="Remove from wishlist"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col">
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                          {product.category?.name || "Product"}
                        </p>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 min-h-[2.5rem] md:group-hover:text-primary transition-colors leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Bottom Controls */}
                      <div className="mt-auto flex items-center justify-between gap-4 pt-3 border-t border-zinc-50 dark:border-zinc-800">
                        <div className="flex flex-col">
                          <span className="text-base md:text-lg font-bold text-zinc-900 dark:text-white">
                            {formatPrice(product.price)}
                          </span>
                          <span
                            className={`text-[10px] font-medium ${
                              product.stock > 0
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>

                        <Button
                          size="icon"
                          disabled={product.stock <= 0 || isProcessing}
                          className="h-10 w-10 md:h-11 md:w-11 rounded-none shadow-sm"
                          onClick={() => handleAddToCart(product)}
                        >
                          {isProcessing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ShoppingCart className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Wishlist;
