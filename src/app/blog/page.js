import Reveal from "../../components/Reveal";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "AI Blog | Carlos Miguel Sandrino",
  description: "Daily AI-generated blog posts by Carlos Miguel Sandrino.",
};

export default async function BlogPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="relative max-w-5xl mx-auto py-28 px-6 text-center overflow-hidden">
      {/* Background glow (subtle) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none blur-3xl bg-blue-900/20" />

      <Reveal>
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Daily AI Blog
        </h1>
      </Reveal>

      {/* Animated underline */}
      <Reveal delay={0.2}>
        <div className="w-28 h-1 mx-auto mb-10 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
          Fresh blog posts generated automatically every day using AI.  
          Stay updated with the latest topics in tech, programming, and creativity.
        </p>
      </Reveal>

      {/* Blog posts */}
      <div className="space-y-10">
        {posts?.map((post, index) => (
          <Reveal key={post.id} delay={0.2 + index * 0.1}>
            <article className="p-6 text-left bg-black/40 border border-gray-700 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.01]">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-blue-300 mb-2">
                {post.title}
              </h2>

              {/* Content */}
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-200 leading-relaxed">
                {post.content}
              </div>

              {/* Date */}
              <p className="text-gray-500 text-sm mt-4">
                Posted on{" "}
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
