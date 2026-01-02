import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
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
    toast.success(`${productName} removed from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Supply Sewa</title>
        </Helmet>

        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/products">
                <Button size="lg" variant="hero">
                  Start Shopping
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
        <title>{`Shopping Cart (${cartItems.length} items) - Supply Sewa`}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container-custom py-8">
            <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-card border border-border rounded-xl p-4 md:p-6"
                  >
                    <div className="flex gap-4">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                            <Link
                              to={`/product/${item.product.slug}`}
                              className="font-semibold text-foreground hover:text-primary line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemove(item.product.id, item.product.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center font-medium text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            {item.product.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.product.originalPrice * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                  {/* Coupon */}
                  <div className="flex gap-2 mb-6">
                    <Input placeholder="Enter coupon code" className="flex-1" />
                    <Button variant="outline">
                      <Tag className="h-4 w-4 mr-2" />
                      Apply
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(getCartSubtotal())}</span>
                    </div>
                    {getCartDiscount() > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Discount</span>
                        <span>-{formatPrice(getCartDiscount())}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-success">Free</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>

                  <Button size="lg" variant="hero" className="w-full mt-6">
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Secure checkout powered by eSewa, Khalti & more
                  </p>
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
