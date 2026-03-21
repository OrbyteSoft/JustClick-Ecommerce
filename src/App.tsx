import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { AddressProvider } from "@/contexts/AddressContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { CouponProvider } from "@/contexts/CouponContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { PaymentProvider } from "@/contexts/PaymentContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ChatBot from "@/components/chat/ChatBot";
import ScrollToTop from "@/components/ScrollToTop";

import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import CategoryItem from "./pages/CategoryItems";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import HotDeals from "./pages/HotDeals";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AddressProvider>
          {" "}
          <CategoryProvider>
            <ProductProvider>
              <ReviewProvider>
                <OrderProvider>
                  <PaymentProvider>
                    <CartProvider>
                      <CouponProvider>
                        <WishlistProvider>
                          <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            <BrowserRouter
                              future={{
                                v7_startTransition: true,
                                v7_relativeSplatPath: true,
                              }}
                            >
                              <ScrollToTop />
                              <ChatBot />
                              <Routes>
                                <Route path="/" element={<Index />} />
                                <Route
                                  path="/products"
                                  element={<Products />}
                                />
                                <Route
                                  path="/category"
                                  element={<Category />}
                                />
                                <Route
                                  path="/category/:slug"
                                  element={<CategoryItem />}
                                />
                                <Route
                                  path="/product/:slug"
                                  element={<ProductDetail />}
                                />
                                <Route path="/cart" element={<Cart />} />
                                <Route
                                  path="/wishlist"
                                  element={<Wishlist />}
                                />
                                <Route path="/auth" element={<Auth />} />
                                <Route
                                  path="/hot-deals"
                                  element={<HotDeals />}
                                />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/help" element={<Help />} />
                                <Route
                                  path="/shipping"
                                  element={<Shipping />}
                                />
                                <Route path="/returns" element={<Returns />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/privacy" element={<Privacy />} />
                                <Route path="/terms" element={<Terms />} />
                                <Route
                                  path="/refund-policy"
                                  element={<RefundPolicy />}
                                />
                                <Route
                                  path="/checkout"
                                  element={
                                    <ProtectedRoute>
                                      <Checkout />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/order-success"
                                  element={
                                    <ProtectedRoute>
                                      <OrderSuccess />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/track-order"
                                  element={
                                    <ProtectedRoute>
                                      <TrackOrder />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/profile"
                                  element={
                                    <ProtectedRoute>
                                      <Profile />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </BrowserRouter>
                          </TooltipProvider>
                        </WishlistProvider>
                      </CouponProvider>
                    </CartProvider>
                  </PaymentProvider>
                </OrderProvider>
              </ReviewProvider>
            </ProductProvider>
          </CategoryProvider>
        </AddressProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
