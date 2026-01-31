import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ChevronRight,
  Zap,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext"; // Integrated Wishlist
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-mono">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center border border-dashed border-primary/30 p-12">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">
              Protocol Missing
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
              Device not found in inventory
            </p>
            <Link to="/products">
              <Button className="rounded-none font-black uppercase tracking-widest text-xs">
                Return to Catalog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Action Logic
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.error(`${product.name} purged from vault`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} archived to vault`);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | Supply Sewa`,
      text: `Unit deployment detected: ${product.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Broadcast successful");
      } catch (err) {
        if ((err as Error).name !== "AbortError")
          toast.error("Transmission failed");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard. Broadcast manually.");
    }
  };

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} deployed to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = "/cart";
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{product.name} | Supply Sewa</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background overflow-x-hidden selection:bg-primary/10">
        <Header />
        <main className="flex-1 w-full">
          <div className="container-custom px-4 py-8 md:py-12">
            {/* Breadcrumb */}
            <nav className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-30" />
              <Link
                to="/products"
                className="hover:text-primary transition-colors"
              >
                Catalog
              </Link>
              <ChevronRight className="h-3 w-3 opacity-30" />
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="aspect-square bg-zinc-50 dark:bg-zinc-900 border border-border flex items-center justify-center p-8 overflow-hidden group">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 shrink-0 border transition-all ${
                        selectedImage === i
                          ? "border-primary p-1 bg-primary/5"
                          : "border-border p-2 grayscale hover:grayscale-0"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Specs & Purchase */}
              <div className="flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                      {product.brand} / Ref.{product.id.split("-")[0]}
                    </p>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none break-words">
                      {product.name}
                    </h1>
                  </div>

                  {/* Actions Area */}
                  <div className="flex gap-2 shrink-0 pt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleWishlistToggle}
                      className={`rounded-none border-border h-12 w-12 transition-all duration-300 ${
                        isWishlisted
                          ? "bg-primary text-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] translate-x-[-2px] translate-y-[-2px]"
                          : "hover:text-primary hover:border-primary"
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShare}
                      className="rounded-none border-border h-12 w-12 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-8 py-6 border-y border-border">
                  <div>
                    <p className="text-4xl font-black tracking-tighter">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground line-through font-bold">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-[10px] font-black text-primary uppercase">
                          -{product.discount}%
                        </span>
                      </div>
                    )}
                  </div>
                  <Badge className="rounded-none bg-green-500/10 text-green-600 border-none text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1">
                    [ In Stock: {product.stock} Units ]
                  </Badge>
                </div>

                {/* Purchase Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mb-12">
                  <div className="flex items-center border border-border h-14 bg-zinc-50 dark:bg-zinc-900">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-none w-14 h-full"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-black text-sm">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="rounded-none w-14 h-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    className="flex-1 h-14 rounded-none font-black uppercase tracking-widest text-xs"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-14 rounded-none font-black uppercase tracking-widest text-xs border-zinc-950 dark:border-white hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950"
                    onClick={handleBuyNow}
                  >
                    Instant Checkout
                  </Button>
                </div>

                {/* Logistics Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
                  <div className="bg-background p-5 flex items-center gap-4">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tighter">
                        Fast Delivery
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase">
                        2-3 Business Days
                      </p>
                    </div>
                  </div>
                  <div className="bg-background p-5 flex items-center gap-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tighter">
                        Secure Protocol
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase">
                        Official Warranty
                      </p>
                    </div>
                  </div>
                  <div className="bg-background p-5 flex items-center gap-4">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tighter">
                        Return Policy
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase">
                        7-Day window
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="specs" className="border border-border">
              <TabsList className="bg-zinc-50 dark:bg-zinc-900 h-auto gap-8 border-b border-border rounded-none p-0 w-full justify-start px-6">
                <TabsTrigger
                  value="specs"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-4 text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  Technical Specs
                </TabsTrigger>
                <TabsTrigger
                  value="desc"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-4 text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  Overview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="p-6 md:p-12 m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between items-center py-3 border-b border-border/50 text-[11px]"
                    >
                      <span className="font-black uppercase tracking-widest text-muted-foreground">
                        {k}
                      </span>
                      <span className="font-bold uppercase tracking-tighter">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="desc" className="p-6 md:p-12 m-0 max-w-3xl">
                <p className="text-sm leading-loose text-muted-foreground uppercase tracking-tight font-medium">
                  {product.description}
                </p>
              </TabsContent>
            </Tabs>

            {/* Related Inventory */}
            {relatedProducts.length > 0 && (
              <section className="mt-24">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-xl font-black uppercase tracking-tighter">
                    Related Inventory
                  </h2>
                  <div className="h-px flex-1 bg-border"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border bg-border gap-px">
                  {relatedProducts.map((p) => (
                    <div key={p.id} className="bg-background">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
