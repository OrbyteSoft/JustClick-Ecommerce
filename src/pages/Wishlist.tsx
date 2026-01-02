import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Trash2, ShoppingCart } from "lucide-react";
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

  const handleAddToCart = (product: typeof wishlistItems[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>My Wishlist - Supply Sewa</title>
        </Helmet>

        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h1>
              <p className="text-muted-foreground mb-6">
                Save items you love to your wishlist and revisit them anytime.
              </p>
              <Link to="/products">
                <Button size="lg" variant="hero">
                  Explore Products
                  <ArrowRight className="h-5 w-5 ml-2" />
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
        <title>{`My Wishlist (${wishlistItems.length} items) - Supply Sewa`}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container-custom py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
              <Button variant="outline" onClick={clearWishlist}>
                Clear All
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 h-9 w-9 rounded-full"
                      onClick={() => handleRemove(product.id, product.name)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-3 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Move to Cart
                    </Button>
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
