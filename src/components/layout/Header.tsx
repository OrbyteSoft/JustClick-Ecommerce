import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  LogOut,
  Settings,
  Package,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
      {/* Top bar */}
      <div className="gradient-dark text-primary-foreground py-2">
        <div className="container-custom flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+977-1-4123456" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">+977-1-4123456</span>
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Kathmandu, Nepal</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/seller/register" className="hover:text-primary transition-colors font-medium">
              Become a Seller
            </Link>
            <Link to="/track-order" className="hover:text-primary transition-colors hidden sm:block">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card shadow-soft border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="gradient-hero rounded-lg p-2">
                <span className="text-primary-foreground font-bold text-xl">SS</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">Supply Sewa</h1>
                <p className="text-xs text-muted-foreground">Your Trusted Supplier</p>
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 h-12 rounded-full border-2 border-muted focus:border-primary"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10 w-10"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/wishlist" className="relative hidden sm:flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
                <Heart className="h-5 w-5" />
                <span className="text-xs">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive border-0">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Link>

              <Link to="/cart" className="relative flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs hidden sm:block">Cart</span>
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gradient-hero border-0">
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>

              {/* User Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-auto py-1 px-2">
                    {loading ? (
                      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                    ) : user ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || undefined} alt={getDisplayName()} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="text-xs hidden sm:block">
                      {loading ? "..." : user ? getDisplayName() : "Account"}
                    </span>
                    <ChevronDown className="h-3 w-3 hidden sm:block" />
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
                            <Link to="/admin" className="flex items-center gap-2 text-primary">
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
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 h-11 rounded-full border-2 border-muted focus:border-primary"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-9 w-9"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category navigation - Desktop */}
        <nav className="hidden md:block border-t border-border">
          <div className="container-custom">
            <ul className="flex items-center gap-1 py-2 overflow-x-auto">
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 font-semibold text-primary">
                      <Menu className="h-4 w-4" />
                      All Categories
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link to={`/products?category=${category.slug}`} className="flex items-center gap-2">
                          {category.name}
                          <Badge variant="secondary" className="ml-auto">
                            {category.productCount}
                          </Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.slug}`}>
                    <Button variant="ghost" className="text-sm font-medium">
                      {category.name}
                    </Button>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/hot-deals">
                  <Button variant="ghost" className="text-sm font-medium text-destructive">
                    🔥 Hot Deals
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-down">
          <nav className="container-custom py-4">
            <ul className="space-y-2">
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
                  className="flex items-center p-3 rounded-lg bg-accent text-accent-foreground font-semibold"
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
