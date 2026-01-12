import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CACHE_TTL = 300; // 5 minutes in seconds

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const UPSTASH_REDIS_REST_URL = Deno.env.get("UPSTASH_REDIS_REST_URL");
    const UPSTASH_REDIS_REST_TOKEN = Deno.env.get("UPSTASH_REDIS_REST_TOKEN");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase configuration");
    }

    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const featured = url.searchParams.get("featured");
    const deals = url.searchParams.get("deals");
    const limit = url.searchParams.get("limit") || "50";
    const search = url.searchParams.get("search");

    // Generate cache key based on query parameters
    const cacheKey = `products:${category || "all"}:${featured || "false"}:${deals || "false"}:${limit}:${search || ""}`;

    console.log(`Fetching products with cache key: ${cacheKey}`);

    // Try to get from Redis cache if configured
    if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
      try {
        const cacheResponse = await fetch(`${UPSTASH_REDIS_REST_URL}/get/${encodeURIComponent(cacheKey)}`, {
          headers: {
            Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
          },
        });

        if (cacheResponse.ok) {
          const cacheData = await cacheResponse.json();
          if (cacheData.result) {
            console.log("Cache hit! Returning cached products");
            const cachedProducts = JSON.parse(cacheData.result);
            return new Response(JSON.stringify({ 
              products: cachedProducts, 
              cached: true,
              cache_key: cacheKey 
            }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        }
        console.log("Cache miss, fetching from database");
      } catch (cacheError) {
        console.error("Redis cache error:", cacheError);
        // Continue to fetch from database
      }
    }

    // Fetch from Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    let query = supabase
      .from("products")
      .select(`
        *,
        categories:category_id(id, name, slug),
        sellers:seller_id(id, business_name, rating)
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(parseInt(limit));

    if (category) {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", category)
        .single();
      
      if (categoryData) {
        query = query.eq("category_id", categoryData.id);
      }
    }

    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    if (deals === "true") {
      query = query.eq("is_deal", true);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%`);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    console.log(`Fetched ${products?.length || 0} products from database`);

    // Cache the result in Redis if configured
    if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN && products) {
      try {
        await fetch(`${UPSTASH_REDIS_REST_URL}/setex/${encodeURIComponent(cacheKey)}/${CACHE_TTL}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
        });
        console.log("Products cached successfully");
      } catch (cacheError) {
        console.error("Failed to cache products:", cacheError);
        // Don't fail the request if caching fails
      }
    }

    return new Response(JSON.stringify({ 
      products: products || [], 
      cached: false,
      cache_key: cacheKey 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in get-products function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
