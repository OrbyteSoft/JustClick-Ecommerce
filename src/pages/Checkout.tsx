import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  CheckCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getCartSubtotal, getCartDiscount, clearCart } = useCart();
  const { user, profile } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [formData, setFormData] = useState({
    fullName: profile?.first_name && profile?.last_name 
      ? `${profile.first_name} ${profile.last_name}` 
      : "",
    email: profile?.email || user?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
    notes: "",
  });

  const shippingCost = getCartTotal() > 5000 ? 0 : 150;
  const total = getCartTotal() + shippingCost;

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SS-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/auth");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      const orderNumber = generateOrderNumber();
      
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          subtotal: getCartSubtotal(),
          discount: getCartDiscount(),
          shipping_cost: shippingCost,
          total: total,
          payment_method: paymentMethod,
          payment_status: "pending",
          status: "pending",
          shipping_name: formData.fullName,
          shipping_email: formData.email,
          shipping_phone: formData.phone,
          shipping_address: formData.address,
          shipping_city: formData.city,
          notes: formData.notes,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect based on payment method
      if (paymentMethod === "esewa") {
        // Simulate eSewa payment redirect
        toast.success("Redirecting to eSewa...");
        
        // In production, you would integrate with eSewa API here
        // For demo, we'll simulate a successful payment
        setTimeout(() => {
          clearCart();
          navigate(`/order-success?order=${orderNumber}`);
        }, 2000);
      } else if (paymentMethod === "cod") {
        clearCart();
        toast.success("Order placed successfully!");
        navigate(`/order-success?order=${orderNumber}`);
      } else {
        clearCart();
        toast.success("Order placed successfully!");
        navigate(`/order-success?order=${orderNumber}`);
      }
    } catch (error: any) {
      console.error("Order error:", error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout - Supply Sewa</title>
        </Helmet>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 container-custom py-12">
            <div className="text-center py-16">
              <CheckCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add items to your cart to checkout</p>
              <Button onClick={() => navigate("/products")} variant="hero">
                Continue Shopping
              </Button>
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
        <title>Checkout - Supply Sewa</title>
        <meta name="description" content="Complete your purchase at Supply Sewa" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container-custom py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/cart")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shipping Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact & Shipping */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Shipping Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+977 98XXXXXXXX"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Kathmandu"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address, area, landmark"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Special instructions for delivery"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <label
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          paymentMethod === "esewa" 
                            ? "border-primary bg-accent" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="esewa" id="esewa" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                              eSewa
                            </span>
                            <span className="font-medium">Pay with eSewa</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Fast and secure payment via eSewa wallet
                          </p>
                        </div>
                      </label>
                      
                      <label
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          paymentMethod === "khalti" 
                            ? "border-primary bg-accent" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="khalti" id="khalti" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                              Khalti
                            </span>
                            <span className="font-medium">Pay with Khalti</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pay using Khalti digital wallet
                          </p>
                        </div>
                      </label>
                      
                      <label
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          paymentMethod === "cod" 
                            ? "border-primary bg-accent" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="cod" id="cod" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                              COD
                            </span>
                            <span className="font-medium">Cash on Delivery</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pay when you receive your order
                          </p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-32">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(getCartSubtotal())}</span>
                    </div>
                    {getCartDiscount() > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(getCartDiscount())}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ${formatPrice(total)}`
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing this order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
