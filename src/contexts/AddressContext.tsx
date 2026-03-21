import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface Address {
  id: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  country: string;
  zipCode: string;
}

export interface CreateAddressDto {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country: string;
  zipCode: string;
}

interface AddressContextType {
  addresses: Address[];
  isLoading: boolean;
  fetchAddresses: () => Promise<void>;
  createAddress: (dto: CreateAddressDto) => Promise<Address | null>;
  deleteAddress: (id: string) => Promise<void>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api<Address[]>("/addresses");
      setAddresses(data);
    } catch (error: any) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAddress = async (
    dto: CreateAddressDto,
  ): Promise<Address | null> => {
    setIsLoading(true);
    try {
      const newAddress = await api<Address>("/addresses", {
        method: "POST",
        body: JSON.stringify(dto),
      });
      setAddresses((prev) => [newAddress, ...prev]);
      return newAddress;
    } catch (error: any) {
      toast.error(error.message || "Failed to save address");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await api(`/addresses/${id}`, { method: "DELETE" });
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete address");
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        isLoading,
        fetchAddresses,
        createAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressProvider");
  }
  return context;
};
