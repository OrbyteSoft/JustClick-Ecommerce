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
  MapPin,
  Zap,
  Activity,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockOrderData = {
  orderNumber: "JC-TX9902",
  status: "In Transit",
  estimatedDelivery: "Feb 04, 2026",
  items: [
    { name: "NVIDIA GeForce RTX 5090 FE", quantity: 1, price: 215000 },
    { name: "ASUS ROG Swift OLED PG32UCDM", quantity: 1, price: 185000 },
  ],
  timeline: [
    {
      status: "Manifest Created",
      date: "Jan 28, 2026 - 10:30 AM",
      completed: true,
    },
    {
      status: "Quality Verified",
      date: "Jan 29, 2026 - 11:00 AM",
      completed: true,
    },
    {
      status: "Package Secured",
      date: "Jan 30, 2026 - 09:00 AM",
      completed: true,
    },
    { status: "In Transit", date: "Jan 31, 2026 - 02:00 PM", completed: true },
    { status: "Out for Delivery", date: "Scheduled Feb 04", completed: false },
    { status: "Delivery Confirmed", date: "Pending", completed: false },
  ],
  shippingAddress: {
    name: "Aaryan Adhikari",
    address: "Durbarmarg, Kathmandu",
    phone: "+977 9800000000",
  },
};

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const initialOrderNumber = searchParams.get("order") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState(
    initialOrderNumber ? mockOrderData : null,
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setSearchedOrder({
        ...mockOrderData,
        orderNumber: orderNumber.toUpperCase(),
      });
      setIsSearching(false);
    }, 800);
  };

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "manifest created":
        return <Activity className="h-4 w-4" />;
      case "quality verified":
        return <CheckCircle className="h-4 w-4" />;
      case "package secured":
        return <Package className="h-4 w-4" />;
      case "in transit":
        return <Truck className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Protocol | Just Click</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
        <Header />
        <main className="flex-1">
          {/* Hero - Industrial Header */}
          <section className="bg-zinc-950 py-20 border-b border-border">
            <div className="container-custom px-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-none border border-primary/20">
                  <Zap className="h-6 w-6 text-gray-500 fill-current" />
                </div>
              </div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
                Logistics Tracker.
              </h1>
              <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em]">
                Real-time Hardware Synchronization
              </p>
            </div>
          </section>

          <section className="container-custom py-16 px-6 max-w-5xl mx-auto">
            {/* Search Protocol */}
            <div className="max-w-xl mx-auto mb-20">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-2"
              >
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="PROTOCOL ID (E.G. JC-TX9902)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="h-14 bg-zinc-50 dark:bg-zinc-900 border-border font-black uppercase tracking-widest text-xs focus-visible:ring-primary rounded-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs rounded-none transition-all"
                  disabled={isSearching}
                >
                  {isSearching ? "SYNCING..." : "LOCATE"}
                </Button>
              </form>
            </div>

            {searchedOrder ? (
              <div className="grid lg:grid-cols-12 gap-12">
                {/* Left Column: Data Manifest */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-zinc-950 p-6 border-l-4 border-primary text-white">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">
                      Order Manifest
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-zinc-500 text-[9px] font-black uppercase">
                          Tracking ID
                        </p>
                        <p className="font-black text-lg tracking-tighter">
                          {searchedOrder.orderNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-[9px] font-black uppercase">
                          Status
                        </p>
                        <p className="font-black text-primary uppercase">
                          {searchedOrder.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-border p-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-primary" /> Destination
                    </h3>
                    <div className="text-xs font-bold space-y-1 uppercase tracking-tight">
                      <p>{searchedOrder.shippingAddress.name}</p>
                      <p className="text-muted-foreground">
                        {searchedOrder.shippingAddress.address}
                      </p>
                      <p className="text-muted-foreground">
                        {searchedOrder.shippingAddress.phone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-border p-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      Hardware Inventory
                    </h3>
                    <div className="space-y-4">
                      {searchedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="border-b border-border pb-3 last:border-0"
                        >
                          <p className="text-xs font-black uppercase tracking-tighter leading-tight mb-1">
                            {item.name}
                          </p>
                          <p className="text-[10px] font-bold text-primary uppercase">
                            QTY: {item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Timeline */}
                <div className="lg:col-span-8">
                  <div className="bg-white dark:bg-zinc-900 border border-border p-8 md:p-12">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-12">
                      Deployment Timeline
                    </h3>
                    <div className="relative">
                      {searchedOrder.timeline.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex gap-8 pb-12 last:pb-0 relative"
                        >
                          {/* Timeline Vertical Line */}
                          {idx < searchedOrder.timeline.length - 1 && (
                            <div
                              className={`absolute left-[19px] top-10 w-px h-full ${
                                step.completed ? "bg-primary" : "bg-border"
                              }`}
                            />
                          )}

                          {/* Status Marker */}
                          <div
                            className={`z-10 w-10 h-10 rounded-none border-2 flex items-center justify-center shrink-0 transition-colors duration-500 ${
                              step.completed
                                ? "bg-primary border-primary text-white"
                                : "bg-background border-border text-muted-foreground"
                            }`}
                          >
                            {getStatusIcon(step.status)}
                          </div>

                          <div className="pt-1">
                            <p
                              className={`text-sm font-black uppercase tracking-tight ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {step.status}
                            </p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                              {step.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-border">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground/30 mb-6" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-2">
                  No Active Protocol Found
                </h3>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Enter your tracking signature to initiate synchronization.
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
