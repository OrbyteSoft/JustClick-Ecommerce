import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Package,
  CheckCircle,
  Truck,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Activity,
  Download,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/contexts/OrderContext";
import { OrderStatus } from "@/types/api";
import { toast } from "sonner";
import { generateInvoice } from "@/lib/invoiceGenerator";

const TrackOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentOrder, isLoading, fetchOrderByNumber, clearCurrentOrder } =
    useOrders();

  const queryOrderNumber = searchParams.get("orderNumber") || "";
  const [orderNumberInput, setOrderNumberInput] = useState(queryOrderNumber);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => clearCurrentOrder();
  }, [clearCurrentOrder]);

  const handleTrack = useCallback(
    async (orderNo: string) => {
      const cleanNo = orderNo.trim().toUpperCase();
      if (!cleanNo) return;

      setError(null);

      try {
        await fetchOrderByNumber(cleanNo);
        setSearchParams({ orderNumber: cleanNo });
      } catch (err: any) {
        setError(err?.message || "Order not found.");
      }
    },
    [fetchOrderByNumber, setSearchParams],
  );

  // Auto-fetch order when component mounts if orderNumber is in query params
  useEffect(() => {
    const fetchOrder = async () => {
      if (queryOrderNumber) {
        const cleanNo = queryOrderNumber.trim().toUpperCase();
        if (cleanNo) {
          setError(null);
          try {
            await fetchOrderByNumber(cleanNo);
          } catch (err: any) {
            setError(err?.message || "Order not found.");
          }
        }
      }
    };

    fetchOrder();
  }, [queryOrderNumber, fetchOrderByNumber]);

  // Update input field when queryOrderNumber changes
  useEffect(() => {
    setOrderNumberInput(queryOrderNumber);
  }, [queryOrderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack(orderNumberInput);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Order number copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const getTimelineSteps = (order: any) => {
    const currentStatus = order.status as OrderStatus;

    const steps = [
      {
        key: OrderStatus.PENDING,
        label: "Order Placed",
        icon: <Activity className="h-4 w-4" />,
      },
      {
        key: OrderStatus.PAID,
        label:
          order.paymentMethod === "COD"
            ? "Payment (Cash on Delivery)"
            : "Payment Confirmed",
        icon: <CheckCircle className="h-4 w-4" />,
      },
      {
        key: OrderStatus.SHIPPED,
        label: "Shipped",
        icon: <Truck className="h-4 w-4" />,
      },
      {
        key: OrderStatus.DELIVERED,
        label: "Delivered",
        icon: <Package className="h-4 w-4" />,
      },
    ];

    const currentIndex = steps.findIndex((s) => s.key === currentStatus);

    return steps.map((step, index) => {
      const completed = currentIndex !== -1 && index <= currentIndex;

      let dateLabel = "Pending";

      if (completed) {
        if (index === 0) {
          dateLabel = new Date(order.createdAt).toLocaleDateString();
        } else {
          dateLabel = "Completed";
        }
      }

      return {
        ...step,
        completed,
        date: dateLabel,
      };
    });
  };

  const address = currentOrder?.shippingAddress || currentOrder?.billingAddress;

  return (
    <>
      <Helmet>
        <title>Track Order | Just Click Pvt. Ltd.</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="bg-zinc-950 py-20 border-b border-zinc-800">
            <div className="container-custom px-6 text-center">
              <h1 className="text-4xl font-black text-zinc-100 uppercase tracking-tight mb-4">
                Track Your Order
              </h1>
              <p className="text-zinc-400 text-sm">
                Enter your order number to check the latest status and download
                invoices.
              </p>
            </div>
          </section>

          <section className="container-custom py-16 px-6 max-w-5xl mx-auto">
            {/* Search */}
            <div className="max-w-xl mx-auto mb-16">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  type="text"
                  placeholder="Enter Order Number (e.g. ORD-12345)"
                  value={orderNumberInput}
                  onChange={(e) => setOrderNumberInput(e.target.value)}
                  className="h-14"
                />
                <Button
                  type="submit"
                  className="h-14 px-8"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Track"
                  )}
                </Button>
              </form>

              {error && (
                <div className="bg-red-50 border border-red-300 p-4 mt-4">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> {error}
                  </p>
                </div>
              )}
            </div>

            {currentOrder ? (
              <div className="grid lg:grid-cols-12 gap-12">
                {/* LEFT PANEL */}
                <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
                  <div className="bg-zinc-900 p-6 border border-zinc-800 text-white flex-1 flex flex-col justify-between">
                    <div>
                      {/* Header: Order Info + Invoice */}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xs uppercase tracking-widest text-zinc-400">
                          Order Info
                        </h3>

                        {[OrderStatus.PAID, OrderStatus.DELIVERED].includes(
                          currentOrder.status,
                        ) && (
                          <button
                            onClick={() =>
                              generateInvoice(currentOrder, address)
                            }
                            className="text-zinc-400 hover:text-white"
                            title="Download Invoice"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Order Number */}
                      <div
                        className="cursor-pointer mb-4"
                        onClick={() =>
                          copyToClipboard(currentOrder.orderNumber)
                        }
                      >
                        <p className="text-xs text-zinc-500 uppercase">
                          Order Number
                        </p>
                        <p className="font-bold flex items-center gap-6">
                          {currentOrder.orderNumber}
                          {copied ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3 opacity-40" />
                          )}
                        </p>
                      </div>

                      {/* Payment + Status */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">
                            Method
                          </p>
                          <p className="font-semibold">
                            {currentOrder.paymentMethod}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">
                            Status
                          </p>
                          <p className="font-semibold">{currentOrder.status}</p>
                        </div>
                      </div>

                      {/* Address */}
                      {address && (
                        <div>
                          <p className="text-xs text-zinc-500 uppercase mb-1">
                            Shipping Address
                          </p>
                          <p className="text-sm leading-relaxed">
                            {address.line1}
                            {address.line2 && (
                              <>
                                <br />
                                {address.line2}
                              </>
                            )}
                            <br />
                            {address.city}, {address.state}
                            <br />
                            {address.country} - {address.zipCode}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL - TIMELINE */}
                <div className="lg:col-span-8 flex flex-col h-full">
                  <div className="bg-white border p-8 flex-1 flex flex-col">
                    <h3 className="text-sm font-bold mb-10 uppercase tracking-widest">
                      Journey Tracking
                    </h3>

                    <div className="space-y-12 flex-1">
                      {getTimelineSteps(currentOrder).map((step, idx, arr) => (
                        <div key={idx} className="flex gap-6 relative">
                          {idx !== arr.length - 1 && (
                            <div
                              className={`absolute left-5 top-10 w-[2px] h-12 ${
                                step.completed ? "bg-primary" : "bg-gray-300"
                              }`}
                            />
                          )}

                          <div
                            className={`w-10 h-10 flex items-center justify-center border-2 ${
                              step.completed
                                ? "bg-primary border-primary text-white"
                                : "border-gray-300 text-gray-400"
                            }`}
                          >
                            {step.completed ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              step.icon
                            )}
                          </div>

                          <div>
                            <p
                              className={`font-bold ${
                                step.completed ? "text-black" : "text-gray-400"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-gray-500">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex justify-center items-center py-32">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin opacity-60" />
                  <p className="text-sm text-muted-foreground">
                    Loading order details...
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 border-dashed border">
                <Activity className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="font-bold">No Active Search</h3>
                <p className="text-sm text-gray-500">
                  Enter a valid order number.
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
