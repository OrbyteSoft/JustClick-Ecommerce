import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  MapPin,
  CreditCard,
  Loader2,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  Hash,
  QrCode,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses } from "@/contexts/AddressContext";
import { useOrders } from "@/contexts/OrderContext";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart, isLoading: cartLoading } = useCart();
  const { user } = useAuth();
  const {
    addresses,
    fetchAddresses,
    createAddress,
    isLoading: addrLoading,
  } = useAddresses();
  const { createOrder } = useOrders();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // New States for Payment Verification
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [uniqueTotal, setUniqueTotal] = useState(0);

  const [formData, setFormData] = useState({
    phone: "",
    line1: "",
    city: "",
    zipCode: "",
    country: "Nepal",
    notes: "",
  });

  // Business Constants
  const WHATSAPP_NUMBER = "9779768884650";
  const QR_IMAGES = {
    ESEWA: "/qrs/esewa-qr.jpg",
    KHALTI: "/qrs/khalti-qr.jpg",
  };

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user, fetchAddresses]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
      setIsAddingNewAddress(false);
    } else if (addresses.length === 0 && !addrLoading) {
      setIsAddingNewAddress(true);
    }
  }, [addresses, selectedAddressId, addrLoading]);

  const shippingCost = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (showPaymentModal) {
      const randomDecimal = Math.floor(Math.random() * 99 + 1) / 100;
      setUniqueTotal(total + randomDecimal);
    }
  }, [showPaymentModal, total]);

  const formatPrice = (price: number) =>
    `Rs. ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate("/auth");
    if (!formData.phone)
      return toast.error("Please provide a contact phone number");

    if (paymentMethod === "COD") {
      processOrder();
    } else {
      setShowPaymentModal(true);
    }
  };

  const processOrder = async () => {
    if (paymentMethod !== "COD" && !transactionId) {
      return toast.error("Please enter the Transaction ID to verify payment");
    }

    setIsLoading(true);
    try {
      let finalAddressId = selectedAddressId;

      if (isAddingNewAddress) {
        const newAddr = await createAddress({
          line1: formData.line1,
          city: formData.city,
          country: formData.country,
          zipCode: formData.zipCode,
        });
        finalAddressId = newAddr?.id || null;
      }

      if (!finalAddressId) throw new Error("Shipping address required");

      const order = await createOrder({
        shippingAddrId: finalAddressId,
        billingAddrId: finalAddressId,
        paymentMethod: paymentMethod as any,
        phone: formData.phone,
        notes: formData.notes,
        transactionId: paymentMethod !== "COD" ? transactionId : undefined,
      });

      if (order) {
        if (paymentMethod !== "COD") {
          const message = `Hello, I've just placed an order (#${order.orderNumber}) on Just Click.\n\nTotal Paid: ${formatPrice(uniqueTotal)}\nTransaction ID: ${transactionId}\nPayment Method: ${paymentMethod}\n\nI am attaching my payment receipt below for verification.`;

          window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        }

        await clearCart();
        navigate(`/order-success?order=${order.orderNumber}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Checkout failed");
    } finally {
      setIsLoading(false);
      setShowPaymentModal(false);
    }
  };

  if (!cartLoading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container max-w-7xl mx-auto flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <Button asChild className="mt-4">
              <Link to="/products">Browse Products</Link>
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
        <title>Checkout | Just Click</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-background">
        <Header />

        <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 font-medium">
            <Link to="/cart" className="hover:text-primary">
              Cart
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Checkout</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <form id="checkout-form" onSubmit={handleFormSubmit}>
                {/* 1. Address Section */}
                <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b bg-muted/30 flex justify-between items-center">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Shipping Address
                    </h2>
                    {addresses.length > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setIsAddingNewAddress(!isAddingNewAddress)
                        }
                        className="text-primary hover:bg-primary/10"
                      >
                        {isAddingNewAddress
                          ? "Use Saved Address"
                          : "Add New Address"}
                      </Button>
                    )}
                  </div>

                  <div className="p-6">
                    {!isAddingNewAddress && addresses.length > 0 ? (
                      <div className="grid gap-3">
                        {addresses.map((addr) => (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all flex justify-between items-center ${
                              selectedAddressId === addr.id
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            <div className="text-sm">
                              <p className="font-bold">{addr.line1}</p>
                              <p className="text-muted-foreground">
                                {addr.city}, {addr.zipCode}
                              </p>
                            </div>
                            {selectedAddressId === addr.id && (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g. Kathmandu"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Zip Code</Label>
                          <Input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="e.g. 44600"
                            required
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label>Street Address</Label>
                          <Textarea
                            name="line1"
                            value={formData.line1}
                            onChange={handleInputChange}
                            placeholder="House no, Street name, Area..."
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="98XXXXXXXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Instructions for delivery..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Section */}
                <div className="bg-card border rounded-lg shadow-sm overflow-hidden mt-6">
                  <div className="p-6 border-b bg-muted/30">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </h2>
                  </div>
                  <div className="p-6">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid md:grid-cols-3 gap-4"
                    >
                      {["ESEWA", "KHALTI", "COD"].map((method) => (
                        <label
                          key={method}
                          className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
                            paymentMethod === method
                              ? "border-primary ring-1 ring-primary"
                              : "border-border"
                          }`}
                        >
                          <RadioGroupItem value={method} className="sr-only" />
                          <span className="font-bold text-sm">
                            {method === "COD" ? "Cash on Delivery" : method}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {method === "COD"
                              ? "Pay at your door"
                              : "Online Wallet"}
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </form>
            </div>

            {/* 3. Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-card border rounded-lg shadow-sm sticky top-24">
                <div className="p-6 border-b font-bold text-lg">
                  Order Summary
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded border object-contain bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Qty: {item.quantity} ×{" "}
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t pt-4 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping Fee</span>
                      <span className="text-foreground">
                        {shippingCost === 0
                          ? "Free"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-3 border-t text-primary">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    form="checkout-form"
                    type="submit"
                    className="w-full mt-6 h-12 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    Secure SSL Payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* QR Payment Verification Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              Pay with {paymentMethod}
            </DialogTitle>
            <DialogDescription>
              Scan the QR code and pay exactly{" "}
              <strong className="text-primary text-lg">
                {formatPrice(uniqueTotal)}
              </strong>
              . The unique decimal helps us verify your order instantly.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-4">
            <div className="bg-white p-3 border-2 border-primary/20 rounded-xl shadow-sm">
              <img
                src={QR_IMAGES[paymentMethod as keyof typeof QR_IMAGES]}
                alt="Business QR"
                className="w-44 h-44 object-contain"
              />
            </div>

            <div className="w-full space-y-3">
              <div className="space-y-2">
                <Label
                  htmlFor="trans-id"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  <Hash className="h-4 w-4 text-primary" />
                  Transaction ID
                </Label>
                <Input
                  id="trans-id"
                  placeholder="e.g. ABC123XYZ"
                  value={transactionId}
                  onChange={(e) =>
                    setTransactionId(e.target.value.toUpperCase())
                  }
                  className="uppercase font-mono text-center text-lg tracking-widest border-2 focus:border-primary h-12"
                />
                <p className="text-[10px] text-muted-foreground text-center">
                  Copy this ID from your {paymentMethod} transaction success
                  screen.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-3">
            <Button
              disabled={!transactionId || isLoading}
              onClick={processOrder}
              className="w-full h-12 gap-2 text-base font-bold"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Verify & Place Order
            </Button>
            <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
              Upon clicking, you will be redirected to WhatsApp. Please{" "}
              <span className="font-bold text-foreground">
                attach your receipt screenshot
              </span>{" "}
              there manually.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
