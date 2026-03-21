import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api"; // Your API utility
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import {
  WishlistItemResponseDto,
  WishlistListResponseDto,
  WishlistToggleResponseDto,
  WishlistProductResponseDto,
} from "@/types/api";

interface WishlistContextType {
  wishlistItems: WishlistProductResponseDto[];
  toggleWishlist: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<
    WishlistProductResponseDto[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    if (!user) {
      setWishlistItems([]);
      return;
    }
    try {
      setIsLoading(true);
      const response: WishlistListResponseDto = await api("/wishlist");

      // We extract the 'product' object from each WishlistItemResponseDto
      // to make it easy for the frontend to render ProductCards
      const products = response.data.map((item) => item.product);
      setWishlistItems(products);
    } catch (error) {
      console.error("Failed to sync vault:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  // Toggle Logic (Add/Remove)
  const toggleWishlist = async (productId: string) => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please login to access your secure vault.",
      });
      return;
    }

    try {
      // Body matches AddToWishlistDto { productId: string }
      const res: WishlistToggleResponseDto = await api("/wishlist/toggle", {
        method: "POST",
        body: JSON.stringify({ productId }),
      });

      // Optimistic or Fetch-based update
      // Fetching is safer here to ensure we get the full Product DTO from the server
      await fetchWishlist();

      if (res.added) {
        toast.success("Asset archived to vault");
      } else {
        toast.info("Asset purged from vault");
      }
    } catch (error) {
      toast.error("Protocol Error", {
        description: "Failed to update wishlist status.",
      });
    }
  };

  const clearWishlist = async () => {
    try {
      await api("/wishlist", { method: "DELETE" });
      setWishlistItems([]);
      toast.success("Vault Cleared", {
        description: "All assets have been purged.",
      });
    } catch (error) {
      toast.error("Failed to clear vault");
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
