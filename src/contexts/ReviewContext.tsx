import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Reviewer {
  name: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: Reviewer;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

interface CreateReviewDto {
  productId: string;
  rating: number;
  comment?: string;
}

interface ReviewContextType {
  productReviews: ReviewStats | null;
  isLoading: boolean;
  isSubmitting: boolean;
  fetchReviews: (productId: string) => Promise<ReviewStats | undefined>;
  submitReview: (dto: CreateReviewDto) => Promise<boolean>;
  deleteReview: (reviewId: string, productId: string) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productReviews, setProductReviews] = useState<ReviewStats | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingState, setIsSubmittingState] = useState(false);

  const fetchReviews = useCallback(async (productId: string) => {
    setIsLoading(true);
    try {
      const response = await api<ReviewStats>(`/reviews/product/${productId}`);
      setProductReviews(response);
      return response;
    } catch (error: any) {
      console.error("Failed to fetch reviews:", error);
      toast.error(error.message || "Could not load reviews");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitReview = async (dto: CreateReviewDto): Promise<boolean> => {
    setIsSubmittingState(true);
    try {
      await api("/reviews", {
        method: "POST",
        body: JSON.stringify(dto),
      });

      toast.success("Review submitted successfully!");
      await fetchReviews(dto.productId);
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
      return false;
    } finally {
      setIsSubmittingState(false);
    }
  };

  const deleteReview = async (reviewId: string, productId: string) => {
    try {
      await api(`/reviews/${reviewId}`, {
        method: "DELETE",
      });
      toast.success("Review deleted");
      await fetchReviews(productId);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        productReviews,
        isLoading,
        isSubmitting: isSubmittingState,
        fetchReviews,
        submitReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context)
    throw new Error("useReview must be used within a ReviewProvider");
  return context;
};
