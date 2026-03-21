import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";
import {
  ProductResponseDto,
  ProductListResponseDto,
  ProductSingleResponseDto,
  HomepageSectionsResponseDto,
} from "@/types/api";

interface ProductContextType {
  products: ProductResponseDto[];
  homepageData: HomepageSectionsResponseDto | null;
  isLoading: boolean;
  meta: ProductListResponseDto["meta"] | null;
  fetchProducts: (params?: Record<string, any>) => Promise<void>;
  fetchHomepageSections: () => Promise<void>;
  getProductBySlug: (slug: string) => Promise<ProductResponseDto | null>;
  getProductById: (id: string) => Promise<ProductResponseDto | null>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [homepageData, setHomepageData] =
    useState<HomepageSectionsResponseDto | null>(null);
  const [meta, setMeta] = useState<ProductListResponseDto["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async (params?: Record<string, any>) => {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            // Mapping frontend 'q' to backend 'search' if necessary
            const apiKey = key === "q" ? "search" : key;
            searchParams.append(apiKey, String(value));
          }
        });
      }

      const response = await api<ProductListResponseDto>(
        `/products?${searchParams.toString()}`,
      );
      setProducts(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHomepageSections = useCallback(async () => {
    setIsLoading(true);
    try {
      const response =
        await api<HomepageSectionsResponseDto>("/products/homepage");
      setHomepageData(response);
    } catch (error) {
      console.error("Error fetching homepage sections:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProductBySlug = useCallback(async (slug: string) => {
    try {
      const response = await api<ProductSingleResponseDto>(
        `/products/slug/${slug}`,
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }, []);

  const getProductById = useCallback(async (id: string) => {
    try {
      const response = await api<ProductSingleResponseDto>(`/products/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        homepageData,
        isLoading,
        meta,
        fetchProducts,
        fetchHomepageSections,
        getProductBySlug,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
