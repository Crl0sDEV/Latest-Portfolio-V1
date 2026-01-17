"use server";

import { createClient } from "@supabase/supabase-js";

export async function getMorePosts(offset = 0, limit = 3) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching more posts:", error);
    return [];
  }

  return data;
}