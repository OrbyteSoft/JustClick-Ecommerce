import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProductFilters {
  category?: string;
  featured?: boolean;
  deals?: boolean;
  limit?: number;
  search?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  discount?: number;
  description?: string;
  brand?: string;
  images?: string[];
  rating?: number;
  reviews_count?: number;
  stock?: number;
  is_featured?: boolean;
  is_deal?: boolean;
  is_new?: boolean;
  is_best_seller?: boolean;
  deal_ends_at?: string;
  features?: string[];
  specifications?: Record<string, unknown>;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
  sellers?: {
    id: string;
    business_name: string;
    rating?: number;
  };
}

interface ProductsResponse {
  products: Product[];
  cached: boolean;
  cache_key: string;
}

const fetchProducts = async (filters: ProductFilters): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append("category", filters.category);
  if (filters.featured) params.append("featured", "true");
  if (filters.deals) params.append("deals", "true");
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.search) params.append("search", filters.search);

  const { data, error } = await supabase.functions.invoke("get-products", {
    body: null,
    method: "GET",
  });

  if (error) {
    // Fall back to direct query if edge function fails
    console.warn("Edge function failed, falling back to direct query:", error);
    
    let query = supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(filters.limit || 50);

    if (filters.featured) {
      query = query.eq("is_featured", true);
    }
    if (filters.deals) {
      query = query.eq("is_deal", true);
    }
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data: products, error: queryError } = await query;
    
    if (queryError) throw queryError;
    
    // Transform the data to match the Product interface
    const transformedProducts = (products || []).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      original_price: p.original_price ?? undefined,
      discount: p.discount ?? undefined,
      description: p.description ?? undefined,
      brand: p.brand ?? undefined,
      images: p.images ?? undefined,
      rating: p.rating ?? undefined,
      reviews_count: p.reviews_count ?? undefined,
      stock: p.stock ?? undefined,
      is_featured: p.is_featured ?? undefined,
      is_deal: p.is_deal ?? undefined,
      is_new: p.is_new ?? undefined,
      is_best_seller: p.is_best_seller ?? undefined,
      deal_ends_at: p.deal_ends_at ?? undefined,
      features: p.features ?? undefined,
      specifications: (p.specifications as Record<string, unknown>) ?? undefined,
    }));
    
    return { 
      products: transformedProducts, 
      cached: false, 
      cache_key: "" 
    };
  }

  return data as ProductsResponse;
};

export const useProducts = (filters: ProductFilters = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
  });

  const invalidateCache = async () => {
    await supabase.functions.invoke("invalidate-cache", {
      body: { pattern: "products:*" },
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return {
    ...query,
    invalidateCache,
  };
};

export const useFeaturedProducts = (limit = 8) => {
  return useProducts({ featured: true, limit });
};

export const useDealProducts = (limit = 8) => {
  return useProducts({ deals: true, limit });
};

export const useProductsByCategory = (category: string, limit = 20) => {
  return useProducts({ category, limit });
};

export const useSearchProducts = (search: string, limit = 20) => {
  return useProducts({ search, limit });
};
