import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  ChevronRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCategories } from "@/contexts/CategoryContext";
import { toast } from "sonner";
import SearchBar from "@/components/search/SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, signOut } = useAuth();
  const { categories } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getInitials = () => {
    if (user?.name) {
      const parts = user.name.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || "U";
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 py-3"
            : "bg-white dark:bg-zinc-950 py-4"
        }`}
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-[auto_1fr_auto] items-center gap-6 xl:gap-12">
            {/* 1. Brand & Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link to="/" className="group shrink-0">
                <span className="text-xl md:text-2xl font-light tracking-tighter uppercase text-zinc-900 dark:text-white">
                  Just<span className="font-black"> Click</span>
                </span>
              </Link>

              <nav className="hidden xl:flex items-center gap-6">
                <Link
                  to="/products"
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  Shop All
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 outline-none whitespace-nowrap group">
                    Categories{" "}
                    <ChevronDown className="h-3 w-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 mt-4 p-1.5 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-zinc-100 dark:border-zinc-800 shadow-xl">
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat.id}
                        asChild
                        className="focus:bg-zinc-50 dark:focus:bg-zinc-900 rounded-md cursor-pointer"
                      >
                        {/* Use categoryId query param to match backend QueryProductDto */}
                        <Link
                          to={`/products?categoryId=${cat.id}`}
                          className="text-[10px] uppercase tracking-[0.15em] font-light py-3 px-3 text-zinc-500 dark:text-zinc-400 block"
                        >
                          {cat.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  to="/hot-deals"
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-red-400 hover:text-red-600 transition-colors whitespace-nowrap"
                >
                  Flash Deals
                </Link>
              </nav>
            </div>

            {/* 2. Search Section */}
            <div className="hidden lg:flex justify-center w-full px-8">
              <div className="relative group w-full max-w-[680px]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center w-full bg-secondary/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-full border border-border/50 shadow-sm transition-all duration-300 group-focus-within:bg-background group-focus-within:border-primary/30 group-focus-within:shadow-lg group-focus-within:shadow-primary/5">
                  <SearchBar className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none hover:shadow-none" />
                </div>
              </div>
            </div>

            {/* 3. Action Icons */}
            <div className="flex items-center justify-end gap-1 md:gap-2">
              <Link
                to="/wishlist"
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Heart
                  className={`h-5 w-5 stroke-[1.2px] ${wishlistItems.length > 0 ? "fill-red-500 stroke-red-500" : ""}`}
                />
              </Link>

              <Link
                to="/cart"
                className="relative p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <ShoppingCart className="h-5 w-5 stroke-[1.2px]" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute top-1 right-1 h-4 min-w-[1rem] flex items-center justify-center p-0.5 text-[8px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-none font-bold">
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Avatar className="h-8 w-8 border border-zinc-100 dark:border-zinc-800">
                      <AvatarFallback className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] font-bold tracking-tighter">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 mt-4 p-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-none overflow-hidden"
                >
                  {user ? (
                    <>
                      <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-b border-zinc-100 dark:border-zinc-800">
                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-400 mb-1">
                          Account Access
                        </p>
                        <p className="text-xs font-light text-zinc-900 dark:text-white truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-1.5">
                        <DropdownMenuItem
                          onClick={() => navigate("/track-order")}
                          className="flex items-center gap-3 px-3 py-2.5 text-[10px] font-light uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 focus:bg-zinc-50 dark:focus:bg-zinc-900 rounded-md transition-all cursor-pointer"
                        >
                          <Package className="h-3.5 w-3.5 opacity-30" /> Track
                          Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/profile")}
                          className="flex items-center gap-3 px-3 py-2.5 text-[10px] font-light uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 focus:bg-zinc-50 dark:focus:bg-zinc-900 rounded-md transition-all cursor-pointer"
                        >
                          <Settings className="h-3.5 w-3.5 opacity-30" />{" "}
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1.5 bg-zinc-100 dark:bg-zinc-800" />
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-3 py-2.5 text-[10px] font-light uppercase tracking-[0.15em] text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20 rounded-md cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5 opacity-60" /> Sign Out
                        </DropdownMenuItem>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="h-10 w-10 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-5 w-5 text-zinc-300" />
                      </div>
                      <p className="text-[10px] font-light uppercase tracking-[0.2em] text-zinc-400 mb-4">
                        Welcome to JustClick
                      </p>
                      <Button
                        onClick={() => navigate("/auth")}
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-none py-6 text-[10px] font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-opacity shadow-none"
                      >
                        Login / Join
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-zinc-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Row */}
          <div className="mt-4 block lg:hidden">
            <div className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu List View */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 lg:hidden animate-in slide-in-from-bottom-5 duration-300 pt-24">
          <div className="container-custom h-full overflow-y-auto pb-20">
            <div className="space-y-10">
              {/* Navigation Links */}
              <div>
                <h3 className="text-[9px] font-medium uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-600 mb-6 px-2">
                  Main Menu
                </h3>
                <div className="flex flex-col">
                  {[
                    { name: "Home", path: "/" },
                    { name: "Shop All", path: "/products" },
                    {
                      name: "Flash Deals",
                      path: "/hot-deals",
                      highlight: true,
                    },
                    {
                      name: "New Arrivals",
                      path: "/products?sortBy=newest", // Matches backend sortFieldMap
                    },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between py-5 px-2 border-b border-zinc-50 dark:border-zinc-900"
                    >
                      <span
                        className={`text-[12px] font-light uppercase tracking-[0.15em] ${item.highlight ? "text-red-400" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        {item.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-zinc-200 dark:text-zinc-800" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Links */}
              <div>
                <h3 className="text-[9px] font-medium uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-600 mb-6 px-2">
                  Categories
                </h3>
                <div className="flex flex-col">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?categoryId=${cat.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between py-4 px-2 border-b border-zinc-50 dark:border-zinc-900"
                    >
                      <span className="text-[12px] font-light uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                        {cat.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-zinc-100 dark:text-zinc-800" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
