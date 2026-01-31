import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Trash2, ShoppingCart, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} deployed to cart`);
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.error(`${productName} removed from vault`);
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Saved Protocols | Just Click</title>
        </Helmet>

        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
          <Header />
          <main className="flex-1 flex items-center justify-center py-20">
            <div className="text-center px-6 max-w-md">
              <div className="w-20 h-20 mx-auto mb-8 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-border">
                <Heart className="h-8 w-8 text-zinc-400" />
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
                Vault is <span className="text-primary">Empty.</span>
              </h1>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest leading-relaxed mb-8">
                Your high-performance wishlist is currently inactive. Archive
                hardware you desire for quick deployment.
              </p>
              <Link to="/products">
                <Button
                  size="lg"
                  className="rounded-none px-8 font-black uppercase tracking-widest text-xs h-14"
                >
                  Browse Hardware
                  <ArrowRight className="h-4 w-4 ml-2" />
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

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Header />
        <main className="flex-1">
          <div className="container-custom py-12 px-6">
            {/* Header Area */}
            <div className="flex flex-row items-end justify-between mb-12 gap-6 border-b border-zinc-100 dark:border-zinc-900 pb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-primary fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                    User Archive
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">
                  My <span className="text-primary">Wishlist.</span>
                </h1>
              </div>

              <Button
                variant="ghost"
                className="text-[10px] font-black uppercase tracking-widest hover:bg-destructive/10 hover:text-destructive rounded-none p-0 h-auto md:h-10 md:px-4"
                onClick={clearWishlist}
              >
                Flush All Data
              </Button>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-border border border-border">
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="bg-background group relative flex flex-col p-6 transition-all"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden mb-6 bg-zinc-50 dark:bg-zinc-900 border border-border">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <button
                      className="absolute top-0 right-0 p-3 bg-background border-l border-b border-border hover:bg-destructive hover:text-white transition-colors"
                      onClick={() => handleRemove(product.id, product.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="mb-auto">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                        {product.brand}
                      </p>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="text-sm font-black uppercase tracking-tight line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground font-bold line-through decoration-primary">
                          {product.originalPrice
                            ? formatPrice(product.originalPrice)
                            : ""}
                        </span>
                        <span className="text-lg font-black tracking-tighter">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <Button
                        size="icon"
                        className="h-12 w-12 rounded-none bg-zinc-950 dark:bg-white dark:text-zinc-950"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Wishlist;
