import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Heart,
  ShoppingCart,
  ChevronRight,
  Zap,
  Loader2,
  Minus,
  Plus,
  ArrowLeft,
  Star,
  MessageSquare,
  Trash2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useReview } from "@/contexts/ReviewContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ProductResponseDto } from "@/types/api";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState<ProductResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");

  const {
    getProductBySlug,
    products: allProducts,
    fetchProducts,
  } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const {
    productReviews,
    fetchReviews,
    submitReview,
    isSubmitting,
    isLoading: isReviewsLoading,
  } = useReview();

  const loadProductData = useCallback(
    async (productSlug: string) => {
      setIsLoading(true);
      try {
        const data = await getProductBySlug(productSlug);
        if (data) {
          setProduct(data);
          await Promise.all([
            data.categoryId
              ? fetchProducts({ categoryId: data.categoryId, limit: 5 })
              : Promise.resolve(),
            fetchReviews(data.id),
          ]);
        }
      } catch (error) {
        toast.error("Could not load product details");
      } finally {
        setIsLoading(false);
      }
    },
    [getProductBySlug, fetchProducts, fetchReviews],
  );

  useEffect(() => {
    if (slug) loadProductData(slug);
    setSelectedImage(0);
    setQuantity(1);
  }, [slug, loadProductData]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const success = await submitReview({
      productId: product.id,
      rating: userRating,
      comment: userComment,
    });
    if (success) {
      setUserComment("");
      setUserRating(5);
    }
  };

  const isWishlisted = product ? isInWishlist(product.id) : false;
  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;
  const relatedProducts = allProducts
    .filter((p) => p.id !== product?.id)
    .slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{product ? `${product.name} | Just Click` : "Loading..."}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
        <Header />

        <main className="flex-1 flex flex-col">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
            {/* Breadcrumb - Added wrap and break-words */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <nav className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center flex-wrap gap-2">
                <Link to="/" className="hover:text-primary shrink-0">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3 shrink-0" />
                <span className="text-zinc-900 dark:text-white break-words max-w-[200px] md:max-w-none">
                  {product?.name || "Product"}
                </span>
              </nav>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary shrink-0"
              >
                <ArrowLeft className="h-3 w-3" /> Return
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
              </div>
            ) : !product ? (
              <div className="py-20 text-center uppercase font-black">
                Product Not Found
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-16">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="aspect-square bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center p-4 md:p-12 overflow-hidden">
                      <img
                        src={
                          product.images[selectedImage]?.url ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {product.images.map((img, i) => (
                        <button
                          key={img.id}
                          onClick={() => setSelectedImage(i)}
                          className={`w-16 h-16 md:w-20 md:h-20 shrink-0 border transition-all ${
                            selectedImage === i
                              ? "border-primary"
                              : "border-zinc-200 dark:border-zinc-800 opacity-60"
                          }`}
                        >
                          <img
                            src={img.url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="flex flex-col justify-center overflow-hidden">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.round(productReviews?.averageRating || 0) ? "fill-current" : ""}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">
                          ({productReviews?.totalReviews || 0} REVIEWS)
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] block truncate">
                        SKU: {product.sku || "N/A"}
                      </span>
                      <h1 className="text-2xl md:text-5xl font-black tracking-tighter mt-2 text-zinc-900 dark:text-white uppercase leading-tight break-words">
                        {product.name}
                      </h1>
                    </div>

                    <div className="flex items-center gap-4 mb-8 flex-wrap">
                      <span className="text-2xl md:text-3xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAt && (
                        <span className="text-base md:text-lg text-zinc-400 line-through">
                          {formatPrice(product.compareAt)}
                        </span>
                      )}
                    </div>

                    {/* ACTIONS BAR: Responsive rearrangement */}
                    <div className="flex flex-col gap-4 mb-10">
                      {/* Top Row: Quantity and Wishlist at the end */}
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 h-12 md:h-14 bg-white dark:bg-zinc-900">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-none h-full"
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-bold font-mono text-sm">
                            {quantity.toString().padStart(2, "0")}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-none h-full"
                            onClick={() =>
                              setQuantity(Math.min(product.stock, quantity + 1))
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Wishlist Button pushed to the end on mobile and desktop */}
                        <div className="ml-auto">
                          <Button
                            variant="outline"
                            size="icon"
                            className={`h-12 w-12 md:h-14 md:w-14 rounded-none transition-colors ${
                              isWishlisted
                                ? "text-red-500 border-red-500 bg-red-50 dark:bg-red-950/20"
                                : ""
                            }`}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <Heart
                              className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>

                      {/* Bottom Row: Full width Add to Cart */}
                      <Button
                        className="w-full h-12 md:h-14 text-[11px] font-black uppercase tracking-[0.3em] rounded-none shadow-lg"
                        onClick={() => addToCart(product.id, quantity)}
                        disabled={product.stock <= 0}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* TABS SECTION - Improved horizontal scroll for mobile */}
                <div className="mb-20">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="w-full justify-start rounded-none bg-transparent border-b border-zinc-100 dark:border-zinc-800 h-auto p-0 gap-6 md:gap-8 overflow-x-auto no-scrollbar">
                      <TabsTrigger
                        value="description"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
                      >
                        Description
                      </TabsTrigger>
                      <TabsTrigger
                        value="reviews"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
                      >
                        Reviews ({productReviews?.totalReviews || 0})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="description"
                      className="py-10 outline-none"
                    >
                      <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base break-words">
                          {product.description}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="py-10 outline-none">
                      <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
                        {/* Summary & Form */}
                        <div className="lg:col-span-1 space-y-10">
                          <div>
                            <h3 className="text-3xl md:text-4xl font-black mb-2">
                              {productReviews?.averageRating || "0.0"}
                            </h3>
                            <div className="flex text-yellow-500 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${i < Math.round(productReviews?.averageRating || 0) ? "fill-current" : ""}`}
                                />
                              ))}
                            </div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                              Based on {productReviews?.totalReviews || 0}{" "}
                              customer reviews
                            </p>
                          </div>

                          {user ? (
                            <form
                              onSubmit={handleReviewSubmit}
                              className="space-y-4 p-4 md:p-6 border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50"
                            >
                              <h4 className="text-xs font-black uppercase tracking-widest">
                                Submit a Review
                              </h4>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => setUserRating(s)}
                                    className="focus:outline-none"
                                  >
                                    <Star
                                      className={`h-5 w-5 ${userRating >= s ? "text-yellow-500 fill-current" : "text-zinc-300"}`}
                                    />
                                  </button>
                                ))}
                              </div>
                              <Textarea
                                placeholder="Write your thoughts..."
                                className="rounded-none min-h-[120px] bg-white dark:bg-background text-sm"
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                                required
                              />
                              <Button
                                disabled={isSubmitting}
                                className="w-full rounded-none uppercase text-[10px] font-black tracking-widest h-12"
                              >
                                {isSubmitting ? (
                                  <Loader2 className="animate-spin h-4 w-4" />
                                ) : (
                                  "Post Review"
                                )}
                              </Button>
                            </form>
                          ) : (
                            <div className="p-8 border border-dashed border-zinc-200 text-center">
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">
                                Login to share feedback
                              </p>
                              <Link to="/auth">
                                <Button
                                  variant="outline"
                                  className="rounded-none text-[10px] font-black uppercase tracking-widest px-8"
                                >
                                  Sign In
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-8">
                          {isReviewsLoading ? (
                            <div className="flex py-10">
                              <Loader2 className="animate-spin h-6 w-6 text-primary" />
                            </div>
                          ) : productReviews?.reviews.length === 0 ? (
                            <div className="py-20 text-center border border-zinc-50 dark:border-zinc-900">
                              <MessageSquare className="h-10 w-10 mx-auto mb-4 text-zinc-200" />
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                Be the first to review
                              </p>
                            </div>
                          ) : (
                            productReviews?.reviews.map((review) => (
                              <div
                                key={review.id}
                                className="group pb-8 border-b border-zinc-50 dark:border-zinc-900 last:border-0"
                              >
                                <div className="flex justify-between items-start mb-4 gap-2">
                                  <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 md:h-10 md:w-10 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-[10px] uppercase shrink-0">
                                      {review.user.name?.charAt(0) || "U"}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[10px] font-black uppercase tracking-widest truncate">
                                        {review.user.name || "Verified User"}
                                      </p>
                                      <div className="flex text-yellow-500 mt-0.5">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-2.5 w-2.5 ${i < review.rating ? "fill-current" : ""}`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-[9px] font-bold text-zinc-400 uppercase shrink-0">
                                    {new Date(
                                      review.createdAt,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium md:pl-13 break-words">
                                  {review.comment}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Similar Discoveries */}
                {relatedProducts.length > 0 && (
                  <section className="pt-16 border-t border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-10">
                      Similar Discoveries
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                      {relatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
