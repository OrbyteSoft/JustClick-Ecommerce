import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartSubtotal,
    getCartDiscount,
  } = useCart();

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from shipment`);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Manifest / Empty - Supply Sewa</title>
        </Helmet>

        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
            <div className="text-center px-4 relative z-10 py-10">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <ShoppingBag
                    className="h-20 w-20 text-muted/30"
                    strokeWidth={1}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 bg-primary animate-ping rounded-full"></div>
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-light tracking-tighter uppercase mb-4">
                Cart Vacant
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-10 font-bold">
                No active items found in current session
              </p>
              <Link to="/products">
                <Button className="rounded-none px-12 py-8 bg-foreground text-background hover:bg-primary transition-all uppercase text-[11px] font-bold tracking-[0.3em]">
                  Start Shopping
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
        <title>{`Shipment Manifest (${cartItems.length}) - Supply Sewa`}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 bg-secondary/10">
          <div className="container-custom py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">
                  Logistic System
                </span>
                <h1 className="text-5xl font-light tracking-tighter text-foreground uppercase leading-none">
                  Shipment <span className="font-black">Manifest.</span>
                </h1>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-l-2 border-primary pl-4">
                Items ready for dispatch: {cartItems.length}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Item List */}
              <div className="lg:col-span-8 space-y-1">
                <div className="grid grid-cols-12 px-6 py-3 border border-border bg-muted/50 text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                  <div className="col-span-6">Product Specification</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Valuation</div>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="group bg-card border border-border rounded-none p-6 transition-all hover:border-primary/50 relative overflow-hidden"
                  >
                    <div className="grid grid-cols-12 items-center gap-6">
                      <div className="col-span-12 md:col-span-6 flex gap-6">
                        <div className="shrink-0 w-24 h-24 bg-secondary/30 rounded-none overflow-hidden border border-border p-2">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-primary uppercase tracking-widest mb-1">
                            {item.product.brand}
                          </span>
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="text-sm font-bold uppercase tracking-tight hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() =>
                              handleRemove(item.product.id, item.product.name)
                            }
                            className="flex items-center gap-1 mt-4 text-[9px] uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors w-fit"
                          >
                            <Trash2 className="h-3 w-3" /> Remove Item
                          </button>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-3 flex justify-center">
                        <div className="flex items-center border border-border bg-background">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none hover:bg-muted"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center text-xs font-mono">
                            {item.quantity.toString().padStart(2, "0")}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none hover:bg-muted"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            disabled={
                              item.quantity >= (item.product.stock || 99)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-3 text-right">
                        <p className="text-base font-black tracking-tight">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-[9px] uppercase text-muted-foreground tracking-tighter">
                          Unit: {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Side */}
              <div className="lg:col-span-4">
                <div className="bg-foreground text-white p-8 rounded-none sticky top-32 border-l-4 border-primary shadow-2xl">
                  <div className="flex items-center gap-2 mb-8">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                      Accounting Summary
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Gross Subtotal */}
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/60">
                        Gross Subtotal
                      </span>
                      <span className="font-mono text-sm text-white">
                        {formatPrice(getCartSubtotal())}
                      </span>
                    </div>

                    {/* Discount - Only shows if > 0 */}
                    {getCartDiscount() > 0 && (
                      <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">
                          Incentive Applied
                        </span>
                        <span className="font-mono text-sm text-white">
                          -{formatPrice(getCartDiscount())}
                        </span>
                      </div>
                    )}

                    {/* Shipping */}
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/60">
                        Logistics Fee
                      </span>
                      <span className="text-[10px] uppercase font-bold text-white">
                        Priority Free
                      </span>
                    </div>

                    {/* Total Valuation */}
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[12px] uppercase font-black tracking-[0.2em] text-white">
                          Total Valuation
                        </span>
                        <span className="text-xl font-black italic tracking-tighter text-white">
                          {formatPrice(getCartTotal())}
                        </span>
                      </div>
                      <p className="text-[8px] uppercase tracking-widest text-white/40 text-right italic">
                        All taxes calculated at dispatch
                      </p>
                    </div>

                    {/* Promo Code Input */}
                    <div className="space-y-3 pt-6">
                      <div className="relative group">
                        <Input
                          placeholder="PROMO_CODE"
                          className="bg-white/5 border-white/20 rounded-none h-12 text-[10px] uppercase tracking-widest focus-visible:ring-primary placeholder:text-white/30 text-white focus:border-white/40"
                        />
                        <Button className="absolute right-1 top-1 h-10 rounded-none bg-primary text-primary-foreground hover:bg-white hover:text-black text-[9px] font-bold uppercase tracking-widest transition-colors">
                          Verify
                        </Button>
                      </div>
                    </div>

                    {/* Main Action Button */}
                    <Button className="w-full bg-primary text-primary-foreground rounded-none py-10 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all group mt-4">
                      Authorize Payment
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </Button>

                    {/* Payment Badges */}
                    <div className="pt-8 grid grid-cols-4 gap-2">
                      {["ESEWA", "KHALTI", "VISA", "COD"].map((label) => (
                        <div
                          key={label}
                          className="h-7 bg-white/5 flex items-center justify-center text-[7px] font-bold border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                        >
                          {label}
                        </div>
                      ))}
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
