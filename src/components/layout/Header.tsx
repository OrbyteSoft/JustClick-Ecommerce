import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Shield,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import SearchBar from "@/components/search/SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, profile, loading, signOut, isAdmin, isSeller } = useAuth();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getDisplayName = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main header - Flipkart style */}
      <div className="gradient-primary">
        <div className="container-custom py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5">
                <span className="text-white font-bold text-xl tracking-tight">Supply<span className="text-accent">Sewa</span></span>
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Link 
                to="/wishlist" 
                className="relative hidden sm:flex items-center gap-1.5 text-white/90 hover:text-white transition-colors px-3 py-2"
              >
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium hidden lg:inline">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-0.5 left-5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground border-0">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Link>

              <Link 
                to="/cart" 
                className="relative flex items-center gap-1.5 text-white/90 hover:text-white transition-colors px-3 py-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-medium hidden lg:inline">Cart</span>
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-0.5 left-5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground border-0">
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>

              {/* User Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-auto py-2 px-3 text-white/90 hover:text-white hover:bg-white/10">
                    {loading ? (
                      <div className="h-7 w-7 rounded-full bg-white/20 animate-pulse" />
                    ) : user ? (
                      <Avatar className="h-7 w-7 border-2 border-white/30">
                        <AvatarImage src={profile?.avatar_url || undefined} alt={getDisplayName()} />
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="text-sm font-medium hidden lg:inline">
                      {loading ? "..." : user ? getDisplayName() : "Login"}
                    </span>
                    <ChevronDown className="h-3 w-3 hidden lg:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {user ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {profile?.first_name && profile?.last_name 
                              ? `${profile.first_name} ${profile.last_name}`
                              : getDisplayName()}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/account/orders" className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/account/profile" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/wishlist" className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          My Wishlist
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin() && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/admin" className="flex items-center gap-2 text-primary font-medium">
                              <Shield className="h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      {isSeller() && !isAdmin() && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/seller/dashboard" className="flex items-center gap-2 text-primary">
                              <Package className="h-4 w-4" />
                              Seller Dashboard
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/auth" className="font-medium">Login / Sign Up</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/track-order">Track Order</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/help">Help & Support</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-3">
            <SearchBar isMobile />
          </div>
        </div>
      </div>

      {/* Category navigation - Desktop */}
      <nav className="hidden md:block bg-card border-b border-border shadow-sm">
        <div className="container-custom">
          <ul className="flex items-center gap-1 py-2 overflow-x-auto">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 font-semibold text-foreground hover:text-primary hover:bg-primary/5">
                    <Menu className="h-4 w-4" />
                    All Categories
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link to={`/products?category=${category.slug}`} className="flex items-center justify-between">
                        {category.name}
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {category.productCount}
                        </Badge>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {categories.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link to={`/products?category=${category.slug}`}>
                  <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5">
                    {category.name}
                  </Button>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/hot-deals">
                <Button variant="ghost" className="text-sm font-semibold text-destructive hover:bg-destructive/5">
                  🔥 Deals
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-down shadow-lg">
          <nav className="container-custom py-4">
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary">{category.productCount}</Badge>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/hot-deals"
                  className="flex items-center p-3 rounded-lg bg-destructive/10 text-destructive font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔥 Hot Deals
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
