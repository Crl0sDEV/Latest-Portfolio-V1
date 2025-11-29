import Reveal from "../../components/Reveal";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown"; 
import remarkGfm from "remark-gfm";

export const metadata = {
  title: "AI Blog | Carlos Miguel Sandrino",
  description: "Daily AI-generated blog posts by Carlos Miguel Sandrino.",
};

export const revalidate = 0; 

function cleanMarkdown(content) {
  if (!content) return "";
  return content
    .replace(/\*\* /g, '**') 
    
    .replace(/ \*\*/g, '**')
    
    .replace(/^#([^\s#])/gm, '# $1');
}

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
    <section className="relative w-full min-h-screen py-28 px-6 text-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none blur-3xl bg-blue-900/20" />

      <Reveal>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-400 drop-shadow-lg">
          Daily AI Blog
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="w-28 h-1 mx-auto mb-10 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
          Fresh blog posts generated automatically every day using AI.  
          Stay updated with the latest topics in tech, programming, and creativity.
        </p>
      </Reveal>

      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        {(!posts || posts.length === 0) && (
             <div className="text-gray-500 italic mt-10">
                <p>No blog posts found yet. Wait for the daily update!</p>
             </div>
        )}

        {posts?.map((post, index) => (
          <Reveal key={post.id} delay={0.2 + index * 0.1}>
            <article className="p-8 text-left bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-purple-300 mb-4">
                {post.title}
              </h2>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-800 pb-4">
                <span>
                    📅 {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
                {post.topic && (
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/20">
                        {post.topic}
                    </span>
                )}
              </div>

              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]} 
                  components={{
                    h1: ({node, ...props}) => <h3 className="text-xl font-bold text-blue-200 mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h4 className="text-lg font-bold text-blue-200 mt-6 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h5 className="text-lg font-semibold text-blue-200 mt-5 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-white font-bold bg-white/5 px-1 rounded-sm" {...props} />,
                    li: ({node, ...props}) => <li className="ml-4 list-disc marker:text-blue-500 mb-1" {...props} />,
                    ul: ({node, ...props}) => <ul className="mb-4 pl-4" {...props} />,
                  }}
                >
                  {/* Clean the content before rendering */}
                  {cleanMarkdown(post.content)}
                </ReactMarkdown>
              </div>

            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}