import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const UPSTASH_REDIS_REST_URL = Deno.env.get("UPSTASH_REDIS_REST_URL");
    const UPSTASH_REDIS_REST_TOKEN = Deno.env.get("UPSTASH_REDIS_REST_TOKEN");

    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
      return new Response(JSON.stringify({ 
        message: "Redis not configured, no cache to invalidate" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { pattern } = await req.json();
    const keyPattern = pattern || "products:*";

    console.log(`Invalidating cache with pattern: ${keyPattern}`);

    // Get all keys matching the pattern
    const keysResponse = await fetch(`${UPSTASH_REDIS_REST_URL}/keys/${encodeURIComponent(keyPattern)}`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      },
    });

    if (!keysResponse.ok) {
      throw new Error("Failed to fetch keys from Redis");
    }

    const keysData = await keysResponse.json();
    const keys = keysData.result || [];

    console.log(`Found ${keys.length} keys to invalidate`);

    // Delete all matching keys
    let deletedCount = 0;
    for (const key of keys) {
      const deleteResponse = await fetch(`${UPSTASH_REDIS_REST_URL}/del/${encodeURIComponent(key)}`, {
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
      });

      if (deleteResponse.ok) {
        deletedCount++;
      }
    }

    console.log(`Successfully invalidated ${deletedCount} cache entries`);

    return new Response(JSON.stringify({ 
      message: "Cache invalidated successfully",
      keys_deleted: deletedCount 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error invalidating cache:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
