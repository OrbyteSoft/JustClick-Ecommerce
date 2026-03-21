import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { PaymentResponseDto, CreatePaymentDto } from "@/types/api";
import { toast } from "sonner";

interface PaymentContextType {
  payments: PaymentResponseDto[];
  isLoading: boolean;
  isProcessing: boolean;
  fetchMyPayments: () => Promise<void>;
  verifyPayment: (
    id: string,
    reference: string,
    status: string,
  ) => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payments, setPayments] = useState<PaymentResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchMyPayments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api<PaymentResponseDto[]>("/payments/my-history");
      setPayments(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load payment history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyPayment = async (
    paymentId: string,
    reference: string,
    status: string,
  ) => {
    setIsProcessing(true);
    try {
      const updatedPayment = await api<PaymentResponseDto>(
        `/payments/${paymentId}/verify`,
        {
          method: "PATCH",
          body: JSON.stringify({ reference, status }),
        },
      );

      setPayments((prev) =>
        prev.map((p) => (p.id === paymentId ? updatedPayment : p)),
      );

      if (status === "SUCCESS") {
        toast.success("Payment verified successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        payments,
        isLoading,
        isProcessing,
        fetchMyPayments,
        verifyPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error("usePayments must be used within a PaymentProvider");
  return context;
};
