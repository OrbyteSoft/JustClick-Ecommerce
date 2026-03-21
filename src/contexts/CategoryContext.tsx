import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";
import { CategoryResponseDto, CategoryListResponseDto } from "@/types/api";

interface CategoryContextType {
  categories: CategoryResponseDto[];
  categoryTree: CategoryResponseDto[];
  isLoading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const [listData, treeData] = await Promise.all([
        api<CategoryListResponseDto>("/categories?limit=12&isActive=true"),
        api<CategoryListResponseDto>("/categories/tree"),
      ]);
      setCategories(listData.data);
      setCategoryTree(treeData.data);
    } catch (err: any) {
      setError(err.message || "Failed to sync categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryTree,
        isLoading,
        error,
        refreshCategories: fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error("useCategories must be used within CategoryProvider");
  return context;
};
