import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { Order, CreateOrderDto } from "@/types/api";
import { toast } from "sonner";

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  fetchOrderByNumber: (orderNumber: string) => Promise<void>;
  createOrder: (dto: CreateOrderDto) => Promise<Order | null>;
  clearCurrentOrder: () => void;
  getShippingAddress: () => Order["shippingAddress"] | null;
  getBillingAddress: () => Order["billingAddress"] | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api<Order[]>("/orders");
      setOrders(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load order history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const data = await api<Order>(`/orders/${id}`);
      setCurrentOrder(data);
    } catch (error: any) {
      toast.error(error.message || "Order details not found");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrderByNumber = useCallback(async (orderNumber: string) => {
    setIsLoading(true);
    try {
      const data = await api<Order>(`/orders/number/${orderNumber}`);
      setCurrentOrder(data);
    } catch (error: any) {
      toast.error(error.message || "Tracking info not found");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createOrder = async (dto: CreateOrderDto): Promise<Order | null> => {
    setIsLoading(true);
    try {
      const newOrder = await api<Order>("/orders", {
        method: "POST",
        body: JSON.stringify(dto),
      });

      setOrders((prev) => [newOrder, ...prev]);
      setCurrentOrder(newOrder);

      if (dto.paymentMethod === "COD") {
        toast.success("Order successful! Please pay upon delivery.");
      } else {
        toast.success("Order created! Redirecting to payment...");
      }

      return newOrder;
    } catch (error: any) {
      toast.error(error.message || "Checkout failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getShippingAddress = useCallback(() => {
    return currentOrder?.shippingAddress || null;
  }, [currentOrder]);

  const getBillingAddress = useCallback(() => {
    return currentOrder?.billingAddress || null;
  }, [currentOrder]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        isLoading,
        fetchOrders,
        fetchOrderById,
        fetchOrderByNumber,
        createOrder,
        clearCurrentOrder,
        getShippingAddress,
        getBillingAddress,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
