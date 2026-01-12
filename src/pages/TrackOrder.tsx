import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Package, 
  Search, 
  CheckCircle, 
  Truck, 
  Home, 
  Clock,
  MapPin
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock order data for demo
const mockOrderData = {
  orderNumber: "SS-DEMO123",
  status: "shipped",
  estimatedDelivery: "Jan 15, 2026",
  items: [
    { name: "AMD Ryzen 9 7950X Processor", quantity: 1, price: 89999 },
    { name: "Samsung 980 PRO 2TB NVMe SSD", quantity: 2, price: 32999 },
  ],
  timeline: [
    { status: "Order Placed", date: "Jan 10, 2026 - 10:30 AM", completed: true },
    { status: "Order Confirmed", date: "Jan 10, 2026 - 11:00 AM", completed: true },
    { status: "Processing", date: "Jan 11, 2026 - 09:00 AM", completed: true },
    { status: "Shipped", date: "Jan 12, 2026 - 02:00 PM", completed: true },
    { status: "Out for Delivery", date: "Expected Jan 15, 2026", completed: false },
    { status: "Delivered", date: "Expected Jan 15, 2026", completed: false },
  ],
  shippingAddress: {
    name: "John Doe",
    address: "Kalanki, Kathmandu",
    phone: "+977 9841234567",
  },
};

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const initialOrderNumber = searchParams.get("order") || "";
  
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState(initialOrderNumber ? mockOrderData : null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchedOrder({ ...mockOrderData, orderNumber });
      setIsSearching(false);
    }, 1000);
  };

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "order placed":
      case "order confirmed":
        return <CheckCircle className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
      case "out for delivery":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <Home className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Order - Supply Sewa</title>
        <meta name="description" content="Track your order status at Supply Sewa" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="gradient-hero py-12">
            <div className="container-custom text-center text-primary-foreground">
              <Package className="h-12 w-12 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
              <p className="text-primary-foreground/80">
                Enter your order number to see the current status
              </p>
            </div>
          </section>

          <section className="container-custom py-12">
            {/* Search Form */}
            <div className="max-w-xl mx-auto mb-12">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="orderNumber" className="sr-only">Order Number</Label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="Enter your order number (e.g., SS-DEMO123)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" disabled={isSearching}>
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? "Searching..." : "Track"}
                </Button>
              </form>
            </div>

            {/* Order Details */}
            {searchedOrder && (
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Order Info */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Order Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Number</span>
                        <span className="font-medium">{searchedOrder.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium capitalize text-primary">{searchedOrder.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Est. Delivery</span>
                        <span className="font-medium">{searchedOrder.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Shipping To
                    </h3>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{searchedOrder.shippingAddress.name}</p>
                      <p className="text-muted-foreground">{searchedOrder.shippingAddress.address}</p>
                      <p className="text-muted-foreground">{searchedOrder.shippingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Items</h3>
                    <div className="space-y-3">
                      {searchedOrder.items.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <p className="text-muted-foreground">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-6">Order Timeline</h3>
                  <div className="relative">
                    {searchedOrder.timeline.map((step, idx) => (
                      <div key={idx} className="flex gap-4 pb-8 last:pb-0">
                        {/* Line */}
                        {idx < searchedOrder.timeline.length - 1 && (
                          <div 
                            className={`absolute left-[18px] top-[40px] w-0.5 h-[calc(100%-80px)] ${
                              step.completed ? "bg-primary" : "bg-muted"
                            }`}
                            style={{ top: `${idx * 80 + 40}px`, height: "60px" }}
                          />
                        )}
                        
                        {/* Icon */}
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            step.completed 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {getStatusIcon(step.status)}
                        </div>
                        
                        {/* Content */}
                        <div>
                          <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.status}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!searchedOrder && !isSearching && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Enter your order number</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your order number can be found in your order confirmation email or on your receipt.
                  Try "SS-DEMO123" for a demo.
                </p>
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TrackOrder;
