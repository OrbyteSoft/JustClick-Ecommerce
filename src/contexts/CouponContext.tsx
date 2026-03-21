import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  active: boolean;
}

interface CouponContextType {
  appliedCoupon: Coupon | null;
  isValidating: boolean;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const applyCoupon = useCallback(async (code: string) => {
    if (!code) return;
    setIsValidating(true);
    try {
      const response = await api<Coupon>(`/coupons/validate?code=${code}`);
      setAppliedCoupon(response);
      toast.success(`Coupon "${code.toUpperCase()}" applied!`);
    } catch (error: any) {
      const message = error.response?.data?.message || "Invalid coupon code";
      toast.error(message);
      setAppliedCoupon(null);
    } finally {
      setIsValidating(false);
    }
  }, []);

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  const calculateDiscount = (subtotal: number) => {
    if (!appliedCoupon) return 0;
    return (subtotal * appliedCoupon.discount) / 100;
  };

  return (
    <CouponContext.Provider
      value={{
        appliedCoupon,
        isValidating,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context)
    throw new Error("useCoupon must be used within a CouponProvider");
  return context;
};
