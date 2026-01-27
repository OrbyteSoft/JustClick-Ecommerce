import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const isCompact = variant === "compact";

  return (
    <Link to={`/product/${product.slug}`} className="group block h-full">
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-200 h-full flex flex-col">
        {/* Image container */}
        <div className={`relative overflow-hidden bg-muted ${isCompact ? "aspect-square" : "aspect-[4/3]"}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && product.discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground border-0 text-xs font-bold px-1.5 py-0.5">
                {product.discount}% OFF
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-success text-success-foreground border-0 text-xs px-1.5 py-0.5">
                NEW
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:shadow transition-all ${
              inWishlist ? "text-destructive" : "text-muted-foreground hover:text-destructive"
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Product info */}
        <div className={`p-3 flex flex-col flex-1 ${isCompact ? "p-2.5" : "p-3"}`}>
          {/* Brand */}
          <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
            {product.brand}
          </span>
          
          {/* Name */}
          <h3 className={`font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5 ${
            isCompact ? "text-xs md:text-sm" : "text-sm"
          }`}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5 bg-success text-success-foreground px-1.5 py-0.5 rounded text-xs font-medium">
              <span>{product.rating}</span>
              <Star className="h-3 w-3 fill-current" />
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className={`font-bold text-foreground ${isCompact ? "text-sm md:text-base" : "text-base"}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock status */}
          {product.stock < 10 && product.stock > 0 && (
            <p className="text-[10px] text-destructive mt-1 font-medium">
              Only {product.stock} left!
            </p>
          )}
        </div>

        {/* Add to cart - appears on hover for non-compact */}
        {!isCompact && (
          <div className="p-3 pt-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              className="w-full gradient-primary text-primary-foreground text-xs"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
