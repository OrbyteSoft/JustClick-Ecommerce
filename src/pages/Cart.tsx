import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Tag,
  X,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useCoupon } from "@/contexts/CouponContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    itemCount,
    isLoading,
  } = useCart();

  const {
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
    isValidating,
  } = useCoupon();

  const [couponInput, setCouponInput] = useState("");

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;

    const discount = appliedCoupon.discount;

    // < 5 → percentage
    if (discount < 5) {
      return (subtotal * discount) / 100;
    }

    // ≥ 5 → fixed NPR
    return discount;
  }, [appliedCoupon, subtotal]);

  // prevent negative total
  const total = Math.max(0, subtotal - discountAmount);

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    await applyCoupon(couponInput);
    setCouponInput("");
  };

  const handleRemove = async (productId: string, productName: string) => {
    try {
      await removeFromCart(productId);
      toast.success(`${productName} removed from cart`);
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      navigate("/auth", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | Just Click</title>
        </Helmet>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center py-12 md:py-20">
            <div className="text-center px-4 max-w-md">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-secondary flex items-center justify-center rounded-none">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Looks like you haven't added anything to your cart yet. Explore
                our latest products and find something you love.
              </p>
              <Link to="/products">
                <Button
                  size="lg"
                  className="rounded-none w-full md:w-auto px-8 font-semibold h-12 md:h-14"
                >
                  Start Shopping <ArrowRight className="h-4 w-4 ml-2" />
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
        <title>{`Shopping Cart (${itemCount}) | Just Click`}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-6">
            <div className="mb-8 md:mb-10 border-b border-zinc-100 dark:border-zinc-800 pb-6 md:pb-8">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Shopping Cart{" "}
                <span className="text-zinc-400 font-normal">
                  ({itemCount} items)
                </span>
              </h1>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-8 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row p-4 md:p-6 gap-4 md:gap-6 rounded-none shadow-sm transition-all"
                  >
                    <div className="relative w-full sm:w-32 md:w-40 aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-800 rounded-none shrink-0">
                      <Link to={`/product/${item.product.slug}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-2 md:group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                            {item.product.brand || "Just Click Choice"}
                          </p>
                          <Link to={`/product/${item.product.slug}`}>
                            <h3 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {item.product.name}
                            </h3>
                          </Link>
                        </div>
                        <button
                          onClick={() =>
                            handleRemove(item.product.id, item.product.name)
                          }
                          className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-4">
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-700">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 md:h-9 md:w-9 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 md:w-10 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 md:h-9 md:w-9 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            disabled={
                              item.quantity >= item.product.stock || isLoading
                            }
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-zinc-900 dark:text-white">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-zinc-400 font-medium">
                              {formatPrice(item.product.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4">
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 md:p-8 rounded-none sticky top-24">
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <h2 className="text-xs font-bold uppercase tracking-wider">
                      Order Summary
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">Subtotal</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">
                          Discount (
                          {appliedCoupon.discount < 5
                            ? `${appliedCoupon.discount}%`
                            : `Rs. ${appliedCoupon.discount}`}
                          )
                        </span>
                        <span className="font-semibold text-green-600">
                          -{formatPrice(discountAmount)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">Shipping</span>
                      <span className="text-green-600 font-medium italic">
                        Calculated at checkout
                      </span>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-base font-bold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(total)}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">
                        VAT included where applicable
                      </p>
                    </div>

                    <div className="pt-6 space-y-4">
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-3 border border-dashed border-zinc-300 dark:border-zinc-700">
                          <div className="flex items-center gap-2">
                            <Tag className="h-3 w-3 text-primary" />
                            <span className="text-xs font-bold uppercase">
                              {appliedCoupon.code}
                            </span>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative group">
                          <Input
                            placeholder="Promo Code"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="rounded-none border-zinc-200 dark:border-zinc-700 h-11 text-xs focus-visible:ring-primary uppercase"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            disabled={isValidating || !couponInput.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-zinc-900 transition-colors disabled:opacity-50"
                          >
                            {isValidating ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              "Apply"
                            )}
                          </button>
                        </div>
                      )}

                      <Button
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="w-full rounded-none h-14 text-xs font-bold uppercase tracking-widest shadow-sm"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <>
                            Proceed to Checkout
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>

                      <Link to="/products" className="block text-center">
                        <span className="text-xs text-zinc-500 hover:text-primary transition-colors">
                          Continue Shopping
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
