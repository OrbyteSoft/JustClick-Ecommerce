import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Plus } from "lucide-react";
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
  const isCompact = variant === "compact";

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
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col h-full bg-white dark:bg-zinc-950"
    >
      {/* Image Wrapper */}
      <div
        className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${isCompact ? "aspect-square" : "aspect-[4/5]"}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Absolute Overlays */}
        <div className="absolute top-0 left-0 p-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <Badge className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-none border-0 text-[10px] font-black tracking-tighter">
              -{product.discount}%
            </Badge>
          )}
        </div>

        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`h-4 w-4 ${inWishlist ? "fill-destructive text-destructive" : "text-zinc-500"}`}
          />
        </button>

        {/* Quick Add (Bottom Slide) */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2.5 text-[10px] font-black uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Quick Add +
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 py-4 px-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold text-zinc-500">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Title: min-height ensures horizontal price alignment */}
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight line-clamp-2 min-h-[2.5rem] mb-2">
          {product.name}
        </h3>

        {/* Price Area: mt-auto pushes this to the bottom of the card */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black tracking-tighter text-zinc-900 dark:text-white">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.stock < 10 && product.stock > 0 && (
            <p className="text-[9px] font-black text-destructive uppercase tracking-tighter mt-1">
              {product.stock} items left
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
