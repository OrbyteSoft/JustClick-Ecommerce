import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useProducts } from "@/contexts/ProductContext";
import { CategoryResponseDto, CategorySingleResponseDto } from "@/types/api";
import {
  Loader2,
  ChevronRight,
  LayoutGrid,
  List,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";

const CategoryItems = () => {
  const { slug } = useParams<{ slug: string }>();

  const [category, setCategory] = useState<CategoryResponseDto | null>(null);
  const [catLoading, setCatLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // View Mode State
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { products, fetchProducts, isLoading: productsLoading } = useProducts();

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    const fetchCategoryAndInventory = async () => {
      setCatLoading(true);
      setError(null);
      try {
        const response = await api<CategorySingleResponseDto>(
          `/categories/slug/${slug}`,
        );
        if (!isMounted) return;
        const categoryData = response.data;

        if (!categoryData) {
          setError("Category not found");
          return;
        }

        setCategory(categoryData);
        if (categoryData.id) {
          await fetchProducts({ categoryId: categoryData.id, isActive: true });
        }
      } catch (err) {
        if (isMounted) setError("Failed to load collection.");
      } finally {
        if (isMounted) setCatLoading(false);
      }
    };

    fetchCategoryAndInventory();
    return () => {
      isMounted = false;
    };
  }, [slug, fetchProducts]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Helmet>
        <title>
          {category ? `${category.name} | Just Click` : "Loading Category..."}
        </title>
      </Helmet>

      <Header />

      <main className="flex-1">
        {error ? (
          <div className="py-20 text-center">
            <p className="text-sm text-red-500 font-bold uppercase tracking-widest">
              {error}
            </p>
            <Link
              to="/category"
              className="mt-4 inline-flex items-center text-xs font-bold uppercase underline"
            >
              Back to Categories
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10">
              <div className="container max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="h-3 w-3" />
                  <Link
                    to="/category"
                    className="hover:text-primary transition-colors"
                  >
                    Categories
                  </Link>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-zinc-900 dark:text-white">
                    {category?.name || "..."}
                  </span>
                </nav>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-zinc-900 dark:text-white leading-[0.9]">
                      {category?.name || "Loading"}
                      <span className="text-primary">.</span>
                    </h1>
                    <p className="text-zinc-500 text-sm md:text-base mt-4 leading-relaxed max-w-xl font-medium">
                      {category?.description ??
                        `Explore our curated selection of ${category?.name || "items"}.`}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 px-6 py-4 border border-zinc-200 dark:border-zinc-800 shadow-sm min-w-[160px]">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest block mb-1">
                      Available Inventory
                    </span>
                    <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {productsLoading ? "..." : products.length} Products
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Toolbar */}
            <div className="container max-w-7xl mx-auto px-4 md:px-6 py-6 border-b border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center justify-between">
                <Link
                  to="/category"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-all group"
                >
                  <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />{" "}
                  Back to Categories
                </Link>

                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 transition-all",
                      viewMode === "grid"
                        ? "bg-white dark:bg-zinc-800 text-primary shadow-sm"
                        : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200",
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 transition-all",
                      viewMode === "list"
                        ? "bg-white dark:bg-zinc-800 text-primary shadow-sm"
                        : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200",
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing */}
            <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
              {productsLoading || catLoading ? (
                <div className="py-32 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4 opacity-40" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                    Loading Collections
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div
                  className={cn(
                    "grid gap-4 md:gap-6 transition-all duration-500",
                    viewMode === "grid"
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-1",
                  )}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant={viewMode === "list" ? "default" : "default"}
                      // Pass viewMode as a prop to ProductCard
                      // @ts-ignore (Assuming you'll update ProductCard interface as discussed earlier)
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center border border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    This collection is currently empty.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryItems;
