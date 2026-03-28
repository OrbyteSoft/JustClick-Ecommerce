// --- Common / Shared DTOs ---

export interface MetaDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ImageResponseDto {
  id: string;
  url: string;
}

// --- Brand Types ---

export interface BrandResponseDto {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Category Types ---

export interface CategoryResponseDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  parentId?: string;
  productsCount?: number;
  createdAt: string;
  updatedAt: string;
  children?: CategoryResponseDto[];
  parent?: CategoryResponseDto;
}

/** Response for a single category lookup by slug or ID */
export interface CategorySingleResponseDto {
  data: CategoryResponseDto;
}

/** Response for fetching a list of categories */
export interface CategoryListResponseDto {
  data: CategoryResponseDto[];
}

// --- Product Types ---

export interface ProductResponseDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number | null;
  compareAt?: number | null;
  sku?: string | null;
  // --- Updated to support both string or full Brand object returned by backend ---
  brand?: string | BrandResponseDto | null;
  stock: number;
  averageRating?: number | null;
  isActive: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isFlashDeal: boolean;
  flashDealEnd?: string | null;
  categoryId?: string | null;
  category?: CategoryResponseDto;
  images: ImageResponseDto[];
  createdAt: string;
  updatedAt: string;
}

/** UI Model: Normalized with images as string array */
export interface UIProduct extends Omit<ProductResponseDto, "images"> {
  images: string[];
}

/** Filter parameters for fetching products */
export interface ProductFilters {
  categoryId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  search?: string;
}

/** Response for fetching a list of products with pagination */
export interface ProductListResponseDto {
  data: ProductResponseDto[];
  meta: MetaDto;
}

/** Response for fetching a single product */
export interface ProductSingleResponseDto {
  data: ProductResponseDto;
}

/** Response for fetching homepage sections */
export interface HomepageSectionsResponseDto {
  featured: ProductResponseDto[];
  newArrivals: ProductResponseDto[];
  bestSellers: ProductResponseDto[];
  flashDeals?: ProductResponseDto[];
}

// --- Order & Payment Types ---

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  ESEWA = "ESEWA",
  KHALTI = "KHALTI",
  STRIPE = "STRIPE",
  COD = "COD",
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  total: number;
  subtotal?: number;
  discount?: number;
  shippingFee?: number;
  createdAt: string;
  shippingAddress?: any;
  billingAddress?: any;
  items: any[];
  phone?: string;
  notes?: string;
}

export interface CreateOrderDto {
  shippingAddrId: string;
  billingAddrId: string;
  paymentMethod: PaymentMethod;
  phone?: string;
  notes?: string;
  transactionId?: string;
  items?: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total?: number;
}

export interface OrderListResponseDto {
  data: Order[];
  meta: MetaDto;
}

// --- Payment Types ---

export interface PaymentResponseDto {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: "pending" | "processing" | "success" | "failed";
  reference?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentDto {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
}

// --- Wishlist Types ---

export interface WishlistProductResponseDto {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string }[];
  category: { name: string; slug: string };
  stock: number;
}

export interface WishlistItemResponseDto {
  id: string;
  createdAt: string;
  product: WishlistProductResponseDto;
}

export interface WishlistListResponseDto {
  data: WishlistItemResponseDto[];
}

export interface WishlistToggleResponseDto {
  added: boolean;
}
