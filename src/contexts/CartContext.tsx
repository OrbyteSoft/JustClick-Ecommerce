import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { api } from "@/lib/api";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CartItem {
  id: string; // CartItem UUID from backend
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    image: string;
    brand?: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  subtotal: number;
  itemCount: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async (): Promise<void> => {
    if (!user) return;
    try {
      setIsLoading(true);
      const data = await api("/cart");

      // Map backend structure (product.images[0].url) to a flat UI-friendly image property
      const formattedItems = data.items.map((item: any) => ({
        ...item,
        product: {
          ...item.product,
          image: item.product.images?.[0]?.url || "/placeholder.png",
        },
      }));

      setCartItems(formattedItems);
      setSubtotal(data.subtotal);
      setItemCount(data.itemCount);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: string, quantity = 1): Promise<void> => {
    if (!user) {
      toast.error("Please login to manage cart");
      return;
    }
    try {
      await api("/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
      });
      await fetchCart();
      toast.success("Item added to shipment");
    } catch (error: any) {
      toast.error(error.message || "Failed to add item");
    }
  };

  const removeFromCart = async (productId: string): Promise<void> => {
    try {
      await api(`/cart/${productId}`, { method: "DELETE" });
      await fetchCart();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (
    productId: string,
    quantity: number,
  ): Promise<void> => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }
    try {
      await api(`/cart/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
      await fetchCart();
    } catch (error: any) {
      toast.error(error.message || "Quantity update failed");
    }
  };

  const clearCart = async (): Promise<void> => {
    try {
      await api("/cart", { method: "DELETE" });
      setCartItems([]);
      setSubtotal(0);
      setItemCount(0);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        subtotal,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
