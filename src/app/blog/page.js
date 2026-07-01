import Reveal from "../../components/Reveal";
import { createClient } from "@supabase/supabase-js";
import BlogList from "../../components/BlogList";

export const metadata = {
  title: "AI Blog | Carlos Miguel Sandrino",
  description: "Daily AI-generated blog posts by Carlos Miguel Sandrino.",
};

export const revalidate = 3600; // Cache for 1 hour to prevent lag

export default async function BlogPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { data: initialPosts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq('is_published', true) 
    .order("created_at", { ascending: false })
    .range(0, 2);

  if (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <section className="relative w-full min-h-screen py-24 lg:py-16 px-4 md:px-8 text-center overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      
      {/* Soft, neutral glowing background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--muted)] rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="relative max-w-6xl mx-auto">

        <Reveal>
            <div className="mb-16">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                    Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">AI Insights</span>
                </h1>
                <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg leading-relaxed font-light">
                    Exploring technology, code, and creativity through the lens of Artificial Intelligence.
                </p>
            </div>
        </Reveal>

        {(!initialPosts || initialPosts.length === 0) ? (
             <Reveal delay={0.2}>
              <div className="text-[var(--muted-foreground)] italic mt-10 py-20 border border-[var(--border)] rounded-2xl bg-[var(--muted)]/20 backdrop-blur-md">
                 <p>No blog posts found yet. Wait for the daily update!</p>
              </div>
             </Reveal>
        ) : (
            
            <BlogList initialPosts={initialPosts} />
        )}

      </div>
    </section>
  );
}