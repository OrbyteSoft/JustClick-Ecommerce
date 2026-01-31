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
  Loader2,
  PackageCheck,
  ShieldCheck,
  AlertCircle,
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
  const {
    cartItems,
    getCartTotal,
    getCartSubtotal,
    getCartDiscount,
    clearCart,
  } = useCart();
  const { user, profile } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [formData, setFormData] = useState({
    fullName:
      profile?.first_name && profile?.last_name
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      toast.error("Authentication Required: Please login to proceed.");
      navigate("/auth");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Inventory Error: Your manifest is empty.");
      return;
    }

    setIsLoading(true);

    try {
      const orderNumber = generateOrderNumber();

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

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.images[0], // Fixed to use images array
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();

      if (paymentMethod === "esewa") {
        toast.success("Gateway Initiated: Redirecting to eSewa...");
        setTimeout(() => navigate(`/order-success?order=${orderNumber}`), 2000);
      } else {
        toast.success("Order Logged Successfully");
        navigate(`/order-success?order=${orderNumber}`);
      }
    } catch (error: any) {
      console.error("Order error:", error);
      toast.error(
        error.message || "Logistics Failure: Order could not be processed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-mono">
        <Header />
        <main className="flex-1 container-custom flex items-center justify-center p-4">
          <div className="text-center border border-dashed border-primary/30 p-12 max-w-md w-full">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-black uppercase tracking-tighter mb-2">
              Cart Manifest Empty
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-8">
              No hardware detected for deployment
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="w-full rounded-none font-black uppercase tracking-widest text-xs h-12"
            >
              Return to Catalog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Supply Sewa</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background font-mono selection:bg-primary/10">
        <Header />
        <main className="flex-1 container-custom py-8 md:py-12">
          <button
            onClick={() => navigate("/cart")}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Manifest
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">
                Protocol: Checkout
              </p>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Order Logistics
              </h1>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Transaction Secure
              </p>
              <div className="flex gap-2 mt-2 opacity-50">
                <ShieldCheck className="h-4 w-4" />
                <PackageCheck className="h-4 w-4" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-12">
            {/* Left Column: Forms */}
            <div className="lg:col-span-7 space-y-12">
              {/* Shipping Form */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] px-3 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950">
                    01. Deployment Data
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      Full Personnel Name *
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="pl-10 h-12 rounded-none border-border focus:border-primary bg-zinc-50 dark:bg-zinc-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      Email Address *
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="hq@example.com"
                        className="pl-10 h-12 rounded-none border-border focus:border-primary bg-zinc-50 dark:bg-zinc-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      Contact Number *
                    </Label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98XXXXXXXX"
                        className="pl-10 h-12 rounded-none border-border focus:border-primary bg-zinc-50 dark:bg-zinc-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      Destination City *
                    </Label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Kathmandu"
                        className="pl-10 h-12 rounded-none border-border focus:border-primary bg-zinc-50 dark:bg-zinc-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      Full Deployment Address *
                    </Label>
                    <Textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street, Ward, Area Landmark..."
                      className="rounded-none border-border focus:border-primary bg-zinc-50 dark:bg-zinc-900 min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      Special Ops Notes
                    </Label>
                    <Input
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Leave at front gate, call before arrival"
                      className="h-12 rounded-none border-border focus:border-primary bg-zinc-50 dark:bg-zinc-900"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] px-3 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950">
                    02. Funding Source
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {[
                    {
                      id: "esewa",
                      label: "eSewa",
                      sub: "Wallet Transfer",
                      color: "bg-green-600",
                    },
                    {
                      id: "khalti",
                      label: "Khalti",
                      sub: "Digital Payout",
                      color: "bg-purple-700",
                    },
                    {
                      id: "cod",
                      label: "C.O.D",
                      sub: "Cash on Entry",
                      color: "bg-amber-500",
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`relative flex flex-col p-6 border cursor-pointer transition-all duration-300 ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] -translate-x-1 -translate-y-1"
                          : "border-border hover:border-primary/50 grayscale opacity-70"
                      }`}
                    >
                      <RadioGroupItem value={method.id} className="sr-only" />
                      <div className={`w-8 h-1 mb-4 ${method.color}`} />
                      <span className="text-xs font-black uppercase tracking-widest">
                        {method.label}
                      </span>
                      <span className="text-[9px] uppercase tracking-tighter text-muted-foreground mt-1">
                        {method.sub}
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 border border-border p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900/50">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-border">
                  Order Manifest
                </h2>

                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar mb-8">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 group">
                      <div className="w-16 h-16 bg-white dark:bg-zinc-800 border border-border shrink-0 overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-2 grayscale group-hover:grayscale-0 transition-all"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-tighter truncate">
                          {item.product.name}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">
                            QTY: {item.quantity}
                          </p>
                          <p className="text-xs font-black">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-6 border-y border-border mb-8">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(getCartSubtotal())}</span>
                  </div>
                  {getCartDiscount() > 0 && (
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-green-600">
                      <span>Inventory Discount</span>
                      <span>-{formatPrice(getCartDiscount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">Logistic Fees</span>
                    <span>
                      {shippingCost === 0
                        ? "EXEMPT"
                        : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 leading-none">
                    Total Payable
                  </span>
                  <span className="text-3xl font-black tracking-tighter leading-none text-primary">
                    {formatPrice(total)}
                  </span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-16 rounded-none font-black uppercase tracking-[0.2em] text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    `Initialize Deployment`
                  )}
                </Button>

                <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-800/50 border border-dashed border-border">
                  <p className="text-[9px] text-muted-foreground leading-relaxed uppercase font-bold text-center">
                    By confirming, you authorize Supply Sewa to process the
                    order for logistics. Standard warranty protocols apply to
                    all hardware units.
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
