import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { usePayments } from "@/contexts/PaymentContext";
import { useProducts } from "@/contexts/ProductContext";
import { api } from "@/lib/api";
import {
  User,
  Package,
  MapPin,
  LogOut,
  CreditCard,
  Plus,
  Loader2,
  Lock,
  Save,
  Trash2,
  ShoppingBag,
  ExternalLink,
  Truck,
  ChevronRight,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Printer,
  ImageOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { generateInvoice } from "@/lib/invoiceGenerator";
import { generatePaymentReceipt } from "@/lib/receiptGenerator";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { orders, fetchOrders, isLoading: ordersLoading } = useOrders();
  const {
    payments,
    fetchMyPayments,
    isLoading: paymentsLoading,
  } = usePayments();
  const { getProductById } = useProducts();

  const [activeTab, setActiveTab] = useState("info");
  const [addressLoading, setAddressLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [name, setName] = useState(user?.name || "");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [productImages, setProductImages] = useState<Record<string, string>>(
    {},
  );

  // Pagination states
  const [orderPage, setOrderPage] = useState(0);
  const [paymentPage, setPaymentPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  // Calculate pagination values
  const orderTotalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paymentTotalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);

  // Get current page items
  const getPaginatedItems = (items: any[], page: number) => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return items.slice(start, end);
  };

  const visibleOrders = getPaginatedItems(orders, orderPage);
  const visiblePayments = getPaginatedItems(payments, paymentPage);

  // Reset pagination when tab changes
  useEffect(() => {
    setOrderPage(0);
    setPaymentPage(0);
  }, [activeTab]);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setAddressLoading(true);
        const addressesData = await api("/addresses");
        setAddresses(addressesData);
        await Promise.all([fetchOrders(), fetchMyPayments()]);
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setAddressLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
      setName(user.name || "");
    }
  }, [user, fetchOrders, fetchMyPayments]);

  // Fetch product images for order items
  useEffect(() => {
    const fetchProductImages = async () => {
      if (!orders.length) return;

      const imagesMap: Record<string, string> = {};

      for (const order of visibleOrders) {
        if (order.items && order.items.length) {
          for (const item of order.items) {
            // Check if we already have the image
            if (
              item.productId &&
              !imagesMap[item.productId] &&
              !productImages[item.productId]
            ) {
              try {
                const product = await getProductById(item.productId);
                if (product && product.images && product.images.length > 0) {
                  imagesMap[item.productId] = product.images[0].url;
                } else if (item.imageUrl) {
                  imagesMap[item.productId] = item.imageUrl;
                } else if (item.product?.images?.length > 0) {
                  imagesMap[item.productId] = item.product.images[0].url;
                }
              } catch (error) {
                console.error("Failed to fetch product image:", error);
              }
            } else if (item.productId && productImages[item.productId]) {
              imagesMap[item.productId] = productImages[item.productId];
            }
          }
        }
      }

      if (Object.keys(imagesMap).length > 0) {
        setProductImages((prev) => ({ ...prev, ...imagesMap }));
      }
    };

    fetchProductImages();
  }, [visibleOrders, getProductById]);

  const handleUpdateName = async () => {
    try {
      await api("/users/me", {
        method: "PATCH",
        body: JSON.stringify({ name }),
      });
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("New passwords do not match");
    }
    try {
      await api("/users/me/password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
      });
      toast.success("Password updated successfully");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.error("Update failed");
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAddress = await api("/addresses", {
        method: "POST",
        body: JSON.stringify(addressForm),
      });
      setAddresses([newAddress, ...addresses]);
      setIsAddrModalOpen(false);
      setAddressForm({
        line1: "",
        line2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
      toast.success("Address saved");
    } catch (err) {
      toast.error("Error saving address");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await api(`/addresses/${id}`, { method: "DELETE" });
      setAddresses(addresses.filter((addr: any) => addr.id !== id));
      toast.success("Address removed");
    } catch (err) {
      toast.error("Could not delete address");
    }
  };

  const handleOrderPageChange = (newPage: number) => {
    setOrderPage(newPage);
    document
      .getElementById("orders-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePaymentPageChange = (newPage: number) => {
    setPaymentPage(newPage);
    document
      .getElementById("payments-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownloadReceipt = (payment: any) => {
    try {
      generatePaymentReceipt(payment, user);
      toast.success("Receipt downloaded successfully");
    } catch (error) {
      toast.error("Failed to generate receipt");
    }
  };

  const handleImageError = (itemId: string) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  const getProductImage = (item: any) => {
    // Check if we have the image from productImages state
    if (item.productId && productImages[item.productId]) {
      return productImages[item.productId];
    }

    // Check if item has direct imageUrl (from order items)
    if (item.imageUrl) {
      return item.imageUrl;
    }

    // Check if product object exists with images
    if (item.product?.images && item.product.images.length > 0) {
      return item.product.images[0].url;
    }

    // Check if images array exists directly on item
    if (item.images && item.images.length > 0) {
      return item.images[0].url;
    }

    // Return null if no image found
    return null;
  };

  const isGlobalLoading = addressLoading || ordersLoading || paymentsLoading;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container max-w-6xl mx-auto py-8 lg:py-12 px-4">
        <div className="mb-8 lg:mb-12 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-light tracking-tighter uppercase mb-2">
            My Account
          </h1>
          <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Identity, security, and order history
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-64">
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar border-b lg:border-none border-border pb-2 lg:pb-0 gap-1">
              {[
                { id: "info", label: "Security", icon: User },
                { id: "orders", label: "Orders", icon: Package },
                { id: "addresses", label: "Addresses", icon: MapPin },
                { id: "payments", label: "Payments", icon: CreditCard },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center whitespace-nowrap gap-3 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-all border-b-2 lg:border-b-0 lg:border-l-2 ${
                    activeTab === tab.id
                      ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
                      : "hover:bg-secondary text-muted-foreground border-transparent"
                  }`}
                >
                  <tab.icon className="h-4 w-4 hidden lg:block" />
                  {tab.label}
                </button>
              ))}
            </nav>
            <button
              onClick={() => signOut()}
              className="hidden lg:flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-red-500 hover:bg-red-50 mt-4 w-full"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </aside>

          <div className="flex-1">
            {isGlobalLoading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin opacity-20" />
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* SECURITY TAB */}
                {activeTab === "info" && (
                  <div className="space-y-8 lg:space-y-12">
                    <section className="bg-white dark:bg-zinc-950 border border-border p-5 lg:p-8">
                      <h3 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] mb-6 pb-4 border-b">
                        Identity
                      </h3>
                      <div className="grid gap-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[9px] uppercase font-bold opacity-60">
                              Full Name
                            </Label>
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="input-minimal"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[9px] uppercase font-bold opacity-60">
                              Email Address
                            </Label>
                            <Input
                              value={user?.email || ""}
                              readOnly
                              className="input-minimal bg-secondary/20"
                            />
                          </div>
                        </div>
                        <Button
                          onClick={handleUpdateName}
                          className="w-full lg:w-fit rounded-none text-[10px] uppercase font-bold h-12 px-8"
                        >
                          <Save className="h-3 w-3 mr-2" /> Save Profile
                        </Button>
                      </div>
                    </section>

                    <section className="bg-white dark:bg-zinc-950 border border-border p-5 lg:p-8">
                      <h3 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] mb-6 pb-4 border-b">
                        Security
                      </h3>
                      <form
                        onSubmit={handleChangePassword}
                        className="grid gap-6"
                      >
                        <div className="space-y-2">
                          <Label className="text-[9px] uppercase font-bold opacity-60">
                            Current Password
                          </Label>
                          <Input
                            type="password"
                            required
                            value={passwordData.oldPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                oldPassword: e.target.value,
                              })
                            }
                            className="input-minimal"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[9px] uppercase font-bold opacity-60">
                              New Password
                            </Label>
                            <Input
                              type="password"
                              required
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                              className="input-minimal"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[9px] uppercase font-bold opacity-60">
                              Confirm New Password
                            </Label>
                            <Input
                              type="password"
                              required
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className="input-minimal"
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          variant="outline"
                          className="w-full lg:w-fit rounded-none text-[10px] uppercase font-bold h-12 px-8"
                        >
                          <Lock className="h-3 w-3 mr-2" /> Update Password
                        </Button>
                      </form>
                    </section>
                  </div>
                )}

                {/* ADDRESSES TAB */}
                {activeTab === "addresses" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        Addresses
                      </h3>
                      <Dialog
                        open={isAddrModalOpen}
                        onOpenChange={setIsAddrModalOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-none text-[9px] uppercase font-bold"
                          >
                            <Plus className="h-3 w-3 mr-2" /> Add New
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-none">
                          <DialogHeader>
                            <DialogTitle className="text-xs uppercase font-bold tracking-widest">
                              New Address
                            </DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={handleAddAddress}
                            className="grid gap-4 py-4"
                          >
                            <Input
                              required
                              placeholder="Address Line 1"
                              value={addressForm.line1}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  line1: e.target.value,
                                })
                              }
                              className="input-minimal"
                            />
                            <Input
                              placeholder="Line 2 (Optional)"
                              value={addressForm.line2}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  line2: e.target.value,
                                })
                              }
                              className="input-minimal"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                required
                                placeholder="City"
                                value={addressForm.city}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    city: e.target.value,
                                  })
                                }
                                className="input-minimal"
                              />
                              <Input
                                placeholder="State"
                                value={addressForm.state}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    state: e.target.value,
                                  })
                                }
                                className="input-minimal"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                required
                                placeholder="Zip Code"
                                value={addressForm.zipCode}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    zipCode: e.target.value,
                                  })
                                }
                                className="input-minimal"
                              />
                              <Input
                                required
                                placeholder="Country"
                                value={addressForm.country}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    country: e.target.value,
                                  })
                                }
                                className="input-minimal"
                              />
                            </div>
                            <Button
                              type="submit"
                              className="w-full rounded-none uppercase text-[10px] font-bold h-12 mt-4"
                            >
                              Save Address
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.length > 0 ? (
                        addresses.map((addr: any) => (
                          <div
                            key={addr.id}
                            className="border border-border p-5 bg-white dark:bg-zinc-950"
                          >
                            <h4 className="font-bold text-xs uppercase mb-1">
                              {addr.city}, {addr.country}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {addr.line1}{" "}
                              {addr.line2 && (
                                <span className="block">{addr.line2}</span>
                              )}
                            </p>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="mt-4 text-[9px] font-bold uppercase text-red-500 flex items-center gap-1 hover:underline"
                            >
                              <Trash2 className="h-3 w-3" /> Remove
                            </button>
                          </div>
                        ))
                      ) : (
                        <EmptyState icon={MapPin} label="No addresses saved" />
                      )}
                    </div>
                  </div>
                )}

                {/* ORDERS TAB WITH DETAILS AND PAGINATION */}
                {activeTab === "orders" && (
                  <div id="orders-section" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        Order History
                      </h3>
                      {orders.length > ITEMS_PER_PAGE && (
                        <span className="text-[8px] uppercase text-muted-foreground">
                          Showing {visibleOrders.length} of {orders.length}{" "}
                          orders
                        </span>
                      )}
                    </div>

                    {orders.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {visibleOrders.map((order) => {
                            const orderAddress =
                              order.shippingAddr || order.billingAddress;

                            return (
                              <Dialog key={order.id}>
                                <DialogTrigger asChild>
                                  <div className="border border-border p-5 flex justify-between items-center bg-white dark:bg-zinc-950 hover:border-primary cursor-pointer transition-all group">
                                    <div className="flex items-center gap-4">
                                      <Package className="h-5 w-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                                      <div>
                                        <p className="font-bold text-xs uppercase tracking-tight">
                                          #{order.orderNumber}
                                        </p>
                                        <p className="text-[9px] text-muted-foreground uppercase">
                                          {new Date(
                                            order.createdAt,
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="rounded-none text-[9px] uppercase font-bold"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          generateInvoice(order, orderAddress);
                                        }}
                                      >
                                        Download Invoice
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(
                                            `/track-order?orderNumber=${order.orderNumber}`,
                                            "_blank",
                                          );
                                        }}
                                        className="h-10 w-10 p-2 hover:bg-secondary rounded-full transition-colors group/link"
                                        title="Track Order"
                                      >
                                        <ExternalLink className="h-4 w-4 opacity-40 group-hover/link:opacity-100 group-hover/link:text-primary transition-all" />
                                      </Button>
                                      <ChevronRight className="h-4 w-4 opacity-20 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                  </div>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[500px] rounded-none overflow-hidden p-0 border-none">
                                  <DialogHeader className="p-6 pb-4 border-b pr-12 text-left bg-white dark:bg-zinc-950">
                                    <DialogTitle className="text-xs uppercase font-bold flex flex-wrap gap-2 items-center">
                                      Order Details
                                      <span className="text-muted-foreground font-medium">
                                        #{order.orderNumber}
                                      </span>
                                    </DialogTitle>
                                    <DialogDescription className="text-[10px] uppercase tracking-wide">
                                      Placed on{" "}
                                      {new Date(
                                        order.createdAt,
                                      ).toLocaleString()}
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="p-6 py-4 space-y-4 max-h-[50vh] overflow-y-auto bg-white dark:bg-zinc-950">
                                    {order.items?.map((item: any) => {
                                      const imageUrl = getProductImage(item);
                                      const hasImageError =
                                        imageErrors[item.id || item.productId];

                                      return (
                                        <div
                                          key={item.id || item.productId}
                                          className="flex gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0"
                                        >
                                          <div className="h-16 w-16 bg-secondary/30 border border-border flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            {imageUrl && !hasImageError ? (
                                              <img
                                                src={imageUrl}
                                                alt={item.productName}
                                                className="w-full h-full object-cover"
                                                onError={() =>
                                                  handleImageError(
                                                    item.id || item.productId,
                                                  )
                                                }
                                                loading="lazy"
                                              />
                                            ) : (
                                              <div className="flex items-center justify-center w-full h-full bg-secondary/50">
                                                <ImageOff className="h-6 w-6 opacity-30" />
                                              </div>
                                            )}
                                          </div>

                                          <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold uppercase truncate">
                                              {item.productName}
                                            </p>
                                            <p className="text-[9px] text-muted-foreground mt-1">
                                              QUANTITY: {item.quantity}
                                            </p>
                                            {item.variant && (
                                              <p className="text-[8px] text-muted-foreground mt-0.5">
                                                {item.variant}
                                              </p>
                                            )}
                                          </div>

                                          <div className="text-right">
                                            <p className="text-xs font-bold whitespace-nowrap">
                                              Rs.{" "}
                                              {(
                                                item.price * item.quantity
                                              ).toLocaleString()}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <div className="bg-secondary/20 p-6 pt-4 space-y-3 border-t">
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-[10px] uppercase">
                                        <span className="text-muted-foreground font-bold">
                                          Subtotal
                                        </span>
                                        <span className="font-bold">
                                          Rs. {order.subtotal?.toLocaleString()}
                                        </span>
                                      </div>

                                      {order.discount && order.discount > 0 && (
                                        <div className="flex justify-between text-[10px] uppercase">
                                          <span className="text-green-600 font-bold">
                                            Discount
                                          </span>
                                          <span className="text-green-600 font-bold">
                                            -Rs.{" "}
                                            {order.discount.toLocaleString()}
                                          </span>
                                        </div>
                                      )}

                                      <div className="flex justify-between text-[10px] uppercase">
                                        <span className="text-muted-foreground font-bold">
                                          Shipping
                                        </span>
                                        <span className="font-bold">
                                          Rs.{" "}
                                          {order.shippingFee?.toLocaleString()}
                                        </span>
                                      </div>

                                      <div className="border-t border-border pt-2 flex justify-between text-[10px] uppercase">
                                        <span className="text-muted-foreground font-bold">
                                          Total Amount
                                        </span>
                                        <span className="text-primary font-bold">
                                          Rs. {order.total.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="pt-2 flex flex-col gap-2">
                                      <Button
                                        className="w-full rounded-none uppercase text-[10px] font-bold h-10 tracking-widest"
                                        variant="default"
                                        onClick={() =>
                                          window.open(
                                            `/track-order?orderNumber=${order.orderNumber}`,
                                            "_blank",
                                          )
                                        }
                                      >
                                        <ExternalLink className="h-3 w-3 mr-2" />
                                        Track Live Shipment
                                      </Button>
                                      <Button
                                        className="w-full rounded-none uppercase text-[10px] font-bold h-10 tracking-widest"
                                        variant="outline"
                                        onClick={() =>
                                          generateInvoice(order, orderAddress)
                                        }
                                      >
                                        Download Invoice
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            );
                          })}
                        </div>

                        {/* Orders Pagination */}
                        {orderTotalPages > 1 && (
                          <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOrderPageChange(0)}
                              disabled={orderPage === 0}
                              className="rounded-none text-[9px] uppercase font-bold h-8 px-3"
                            >
                              <ChevronsLeft className="h-3 w-3 mr-1" />
                              First
                            </Button>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleOrderPageChange(orderPage - 1)
                                }
                                disabled={orderPage === 0}
                                className="rounded-none text-[9px] uppercase font-bold h-8 w-8 p-0"
                              >
                                <ChevronLeft className="h-3 w-3" />
                              </Button>
                              <span className="text-[9px] font-bold px-4">
                                Page {orderPage + 1} of {orderTotalPages}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleOrderPageChange(orderPage + 1)
                                }
                                disabled={orderPage === orderTotalPages - 1}
                                className="rounded-none text-[9px] uppercase font-bold h-8 w-8 p-0"
                              >
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleOrderPageChange(orderTotalPages - 1)
                              }
                              disabled={orderPage === orderTotalPages - 1}
                              className="rounded-none text-[9px] uppercase font-bold h-8 px-3"
                            >
                              Last
                              <ChevronsRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="border border-dashed border-border p-12 flex flex-col items-center justify-center opacity-50">
                        <Package className="h-8 w-8 mb-2 stroke-1" />
                        <p className="text-[10px] uppercase font-bold tracking-widest">
                          No orders found
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* PAYMENTS TAB WITH DETAILS AND PAGINATION */}
                {activeTab === "payments" && (
                  <div id="payments-section" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        Payment Logs
                      </h3>
                      {payments.length > ITEMS_PER_PAGE && (
                        <span className="text-[8px] uppercase text-muted-foreground">
                          Showing {visiblePayments.length} of {payments.length}{" "}
                          payments
                        </span>
                      )}
                    </div>

                    {payments.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {visiblePayments.map((payment) => (
                            <Dialog key={payment.id}>
                              <DialogTrigger asChild>
                                <div className="border border-border p-5 bg-white dark:bg-zinc-950 hover:border-primary cursor-pointer transition-all group">
                                  <div className="flex justify-between items-start mb-4">
                                    <CreditCard className="h-5 w-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                                    <Badge
                                      className={`rounded-none text-[8px] uppercase ${payment.status === "SUCCESS" ? "bg-green-500/10 text-green-600 border-green-200" : "bg-amber-500/10 text-amber-600 border-amber-200"}`}
                                    >
                                      {payment.status}
                                    </Badge>
                                  </div>
                                  <p className="text-[10px] font-bold uppercase tracking-tighter">
                                    {payment.method} Transaction
                                  </p>
                                  <p className="text-[9px] text-muted-foreground font-mono mt-1">
                                    REF: {payment.id.slice(0, 12)}...
                                  </p>
                                  <div className="mt-4 flex justify-between items-end border-t pt-4">
                                    <p className="text-xs font-bold">
                                      Rs. {payment.amount.toLocaleString()}
                                    </p>
                                    <p className="text-[8px] uppercase text-muted-foreground">
                                      {new Date(
                                        payment.createdAt,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="rounded-none sm:max-w-[400px]">
                                <DialogHeader>
                                  <DialogTitle className="text-xs uppercase font-bold">
                                    Transaction Receipt
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="py-6 space-y-4">
                                  <div className="text-center pb-6 border-b border-dashed">
                                    <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-600 opacity-50" />
                                    <h2 className="text-xl font-bold tracking-tighter">
                                      Rs. {payment.amount.toLocaleString()}
                                    </h2>
                                    <p className="text-[10px] uppercase text-muted-foreground">
                                      Paid via {payment.method}
                                    </p>
                                  </div>
                                  <div className="space-y-3 text-[10px] uppercase">
                                    <div className="flex justify-between">
                                      <span className="opacity-60">Status</span>
                                      <span className="font-bold text-green-600">
                                        {payment.status}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="opacity-60">
                                        Date & Time
                                      </span>
                                      <span>
                                        {new Date(
                                          payment.createdAt,
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="opacity-60">
                                        Transaction ID
                                      </span>
                                      <span className="font-mono lowercase">
                                        {payment.id}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="opacity-60">
                                        Order Reference
                                      </span>
                                      <span>
                                        #{payment.orderId?.slice(-8) || "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="opacity-60">
                                        Customer
                                      </span>
                                      <span>
                                        {user?.name || user?.email || "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  className="w-full rounded-none uppercase text-[10px] font-bold"
                                  onClick={() => handleDownloadReceipt(payment)}
                                >
                                  <Printer className="h-3 w-3 mr-2" />
                                  Download Receipt
                                </Button>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>

                        {/* Payments Pagination */}
                        {paymentTotalPages > 1 && (
                          <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePaymentPageChange(0)}
                              disabled={paymentPage === 0}
                              className="rounded-none text-[9px] uppercase font-bold h-8 px-3"
                            >
                              <ChevronsLeft className="h-3 w-3 mr-1" />
                              First
                            </Button>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePaymentPageChange(paymentPage - 1)
                                }
                                disabled={paymentPage === 0}
                                className="rounded-none text-[9px] uppercase font-bold h-8 w-8 p-0"
                              >
                                <ChevronLeft className="h-3 w-3" />
                              </Button>
                              <span className="text-[9px] font-bold px-4">
                                Page {paymentPage + 1} of {paymentTotalPages}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePaymentPageChange(paymentPage + 1)
                                }
                                disabled={paymentPage === paymentTotalPages - 1}
                                className="rounded-none text-[9px] uppercase font-bold h-8 w-8 p-0"
                              >
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handlePaymentPageChange(paymentTotalPages - 1)
                              }
                              disabled={paymentPage === paymentTotalPages - 1}
                              className="rounded-none text-[9px] uppercase font-bold h-8 px-3"
                            >
                              Last
                              <ChevronsRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <EmptyState
                        icon={CreditCard}
                        label="No payment history"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const EmptyState = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="text-center py-16 border border-dashed border-border w-full">
    <Icon className="h-6 w-6 mx-auto mb-4 opacity-10" />
    <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-muted-foreground">
      {label}
    </p>
  </div>
);

export default Profile;
