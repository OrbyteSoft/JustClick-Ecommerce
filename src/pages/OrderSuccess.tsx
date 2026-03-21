import { useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle,
  Loader2,
  MapPin,
  Truck,
  Download,
  Phone,
  StickyNote,
  ShieldCheck,
  ChevronLeft,
  ShoppingBag,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/OrderContext";
import { generateInvoice } from "@/lib/invoiceGenerator";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderNumber = searchParams.get("order");

  const {
    currentOrder,
    fetchOrderByNumber,
    isLoading: orderLoading,
  } = useOrders();

  useEffect(() => {
    if (orderNumber) {
      fetchOrderByNumber(orderNumber);
    }
  }, [orderNumber, fetchOrderByNumber]);

  const shippingAddress = currentOrder?.shippingAddress;

  if (orderLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
            Synchronizing...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order #{orderNumber} | Success</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950">
        <Header />

        <main className="flex-1 container max-w-5xl mx-auto py-4 md:py-8 px-4">
          {/* TOP BANNER */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-none">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="h-10 w-10 bg-green-600 flex items-center justify-center rounded-none shrink-0">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold uppercase tracking-tight">
                  Order Confirmed
                </h1>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Ref:{" "}
                  <span className="text-foreground">
                    #{currentOrder?.orderNumber}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                className="rounded-none bg-zinc-900 text-white font-bold uppercase text-[9px] tracking-widest flex-1 sm:px-6"
                onClick={() =>
                  navigate(`/track-order?order=${currentOrder?.orderNumber}`)
                }
              >
                <Truck className="mr-2 h-3 w-3" /> Track
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="rounded-none border-zinc-300 font-bold uppercase text-[9px] tracking-widest flex-1 sm:px-6"
                onClick={() => generateInvoice(currentOrder, shippingAddress)}
              >
                <Download className="mr-2 h-3 w-3" /> Invoice
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-4">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none divide-y dark:divide-zinc-800">
                {/* SHIPPING ADDRESS */}
                <div className="p-5 flex gap-4">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-[11px] font-bold uppercase leading-tight">
                    <p className="text-muted-foreground mb-1 text-[9px] tracking-widest">
                      Delivery Address
                    </p>

                    {shippingAddress ? (
                      <p>
                        {shippingAddress.line1}
                        {shippingAddress.line2 &&
                          `, ${shippingAddress.line2}`}, {shippingAddress.city}
                        {shippingAddress.state &&
                          `, ${shippingAddress.state}`}{" "}
                        {shippingAddress.zipCode}, {shippingAddress.country}
                      </p>
                    ) : (
                      <p className="text-zinc-400">No address available.</p>
                    )}
                  </div>
                </div>

                {/* PHONE */}
                <div className="p-5 flex gap-4">
                  <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-[11px] font-bold uppercase leading-tight">
                    <p className="text-muted-foreground mb-1 text-[9px] tracking-widest">
                      Contact
                    </p>
                    <p>{currentOrder?.phone || "Not Provided"}</p>
                  </div>
                </div>

                {/* NOTES */}
                <div className="p-5 flex gap-4">
                  <StickyNote className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-[11px] font-bold uppercase leading-tight">
                    <p className="text-muted-foreground mb-1 text-[9px] tracking-widest">
                      Delivery Notes
                    </p>
                    <p className="normal-case font-medium">
                      {currentOrder?.notes || "No special instructions."}
                    </p>
                  </div>
                </div>
              </div>

              {/* STATUS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "Status", val: currentOrder?.status },
                  { label: "Payment", val: currentOrder?.paymentMethod },
                  { label: "Type", val: "Standard" },
                  { label: "Security", val: "Verified", icon: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 text-center rounded-none"
                  >
                    <p className="text-[8px] font-black text-muted-foreground uppercase mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[10px] font-bold uppercase flex items-center justify-center gap-1">
                      {item.icon && (
                        <ShieldCheck className="h-2.5 w-2.5 text-green-600" />
                      )}
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN - INVOICE */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 rounded-none shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-2 border-b">
                  <h2 className="font-bold text-[10px] uppercase tracking-widest">
                    Invoice Summary
                  </h2>
                  <ShoppingBag className="h-3 w-3 text-muted-foreground" />
                </div>

                <div className="space-y-3 mb-4 max-h-[160px] overflow-y-auto pr-2">
                  {currentOrder?.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-[10px] font-bold uppercase"
                    >
                      <span>
                        {item.productName} (x{item.quantity})
                      </span>
                      <span>
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 pt-3 border-t border-dashed">
                  <div className="flex justify-between text-[9px] font-bold uppercase">
                    <span>Subtotal</span>
                    <span>Rs. {currentOrder?.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[9px] font-bold uppercase">
                    <span>VAT (13%)</span>
                    <span>Rs. {currentOrder?.tax?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[9px] font-bold uppercase">
                    <span>Delivery</span>
                    <span>
                      Rs. {currentOrder?.shippingFee?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4">
                    <span className="bg-zinc-900 text-white text-[8px] font-black px-1.5 py-2 uppercase">
                      Total Amount
                    </span>
                    <span className="text-xl font-black">
                      Rs. {currentOrder?.total?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full mt-5 rounded-none h-10 text-[9px] font-bold uppercase"
                >
                  <Link
                    to="/products"
                    className="flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="h-3 w-3" /> Back to Shop
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default OrderSuccess;
