import Reveal from "../../components/Reveal";
import { createClient } from "@supabase/supabase-js";
import BlogCard from "../../components/BlogCard";

export const metadata = {
  title: "AI Blog | Carlos Miguel Sandrino",
  description: "Daily AI-generated blog posts by Carlos Miguel Sandrino.",
};

export const revalidate = 0; 

export default async function BlogPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq('is_published', true) 
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <section className="relative w-full min-h-screen py-24 px-4 md:px-8 text-center overflow-hidden bg-black text-white">
      
      {/* 1. BACKGROUND ATMOSPHERE (Para consistent sa ibang pages) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <Reveal>
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    Daily <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">AI Insights</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Exploring technology, code, and creativity through the lens of Artificial Intelligence.
                </p>
            </div>
        </Reveal>

        {(!posts || posts.length === 0) && (
             <Reveal delay={0.2}>
              <div className="text-gray-500 italic mt-10 py-20 border border-white/5 rounded-2xl bg-zinc-900/50 backdrop-blur-md">
                 <p>No blog posts found yet. Wait for the daily update!</p>
              </div>
             </Reveal>
        )}

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 items-start">
            {posts?.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
            ))}
        </div>

      </div>
    </section>
  );
}