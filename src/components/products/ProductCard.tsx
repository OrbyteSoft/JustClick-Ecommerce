import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductResponseDto } from "@/types/api";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useReview } from "@/contexts/ReviewContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: ProductResponseDto;
  variant?: "default" | "compact";
}

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { fetchReviews } = useReview();

  const [isProcessing, setIsProcessing] = useState(false);
  const [avgRating, setAvgRating] = useState<number>(0);

  const inWishlist = isInWishlist(product.id);
  const isCompact = variant === "compact";

  // Handling normalized image array or object-based array
  const displayImage =
    typeof product.images?.[0] === "string"
      ? product.images[0]
      : (product.images?.[0] as any)?.url || "/placeholder-product.png";

  useEffect(() => {
    const getRating = async () => {
      try {
        if (
          product.averageRating !== undefined &&
          product.averageRating !== null
        ) {
          setAvgRating(Number(product.averageRating));
        } else {
          const data = await fetchReviews(product.id);
          if (data && typeof data.averageRating === "number") {
            setAvgRating(data.averageRating);
          }
        }
      } catch (err) {
        setAvgRating(0);
      }
    };
    getRating();
  }, [product.id, product.averageRating, fetchReviews]);

  const discountPercent = product.compareAt
    ? Math.round(
        ((product.compareAt - product.price) / product.compareAt) * 100,
      )
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsProcessing(true);
      await addToCart(product.id, 1);
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsProcessing(true);
      await toggleWishlist(product.id);
    } catch {
      toast.error("Failed to update wishlist");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col h-full bg-white dark:bg-zinc-950 transition-all border border-zinc-200 dark:border-zinc-800 hover:shadow-md"
    >
      <div
        className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${
          isCompact ? "aspect-square" : "aspect-[4/5]"
        }`}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute top-0 left-0 p-2 flex flex-col gap-1">
          {discountPercent > 0 && (
            <Badge className="bg-red-600 text-white rounded-sm border-0 text-[10px] font-bold">
              {discountPercent}% Off
            </Badge>
          )}
          {product.isNewArrival && (
            <Badge className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-sm border-0 text-[10px] font-bold">
              New Arrival
            </Badge>
          )}
        </div>

        <button
          disabled={isProcessing}
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white z-10 disabled:opacity-50 shadow-sm"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart
              className={`h-4 w-4 ${inWishlist ? "fill-current text-red-500" : "text-zinc-500"}`}
            />
          )}
        </button>

        <button
          disabled={isProcessing || product.stock <= 0}
          onClick={handleAddToCart}
          className="absolute bottom-0 w-full bg-zinc-900/95 dark:bg-zinc-100/95 text-white dark:text-zinc-900 py-3 text-xs font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:bg-zinc-400 z-10"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 mx-auto animate-spin" />
          ) : product.stock > 0 ? (
            "Add to Cart"
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>

      <div className="flex flex-col flex-1 py-4 px-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] text-zinc-400 font-medium">
            {product.sku || `Ref: ${product.id.split("-")[0]}`}
          </span>

          <div className="flex items-center gap-1">
            <Star
              className={`h-3 w-3 ${avgRating > 0 ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`}
            />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              {avgRating > 0 ? avgRating.toFixed(1) : "No reviews"}
            </span>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-2 min-h-[2.5rem] mb-2 leading-snug">
          {product.name}
        </h3>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-zinc-900 dark:text-white">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.compareAt && (
              <span className="text-xs text-zinc-400 line-through">
                Rs. {product.compareAt.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.stock > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p className="text-[11px] text-zinc-500">
              {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
