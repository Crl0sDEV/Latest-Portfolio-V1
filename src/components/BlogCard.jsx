"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Reveal from "./Reveal";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"; // Import Motion

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function cleanMarkdown(content) {
  if (!content) return "";
  return content.replace(/\*\*/g, "").replace(/^#([^\s#])/gm, "# $1");
}

export default function BlogCard({ post, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cleanedContent = cleanMarkdown(post.content);
  const previewContent = cleanedContent.slice(0, 200) + "...";

  // --- SPOTLIGHT LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Reveal delay={0.1 * index}>
      <motion.article
        className={`group relative p-6 text-left bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
          isExpanded ? "h-auto" : "h-full"
        }`}
        onMouseMove={handleMouseMove} // Track Mouse
      >
        
        {/* SPOTLIGHT GLOW LAYER */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(74, 222, 128, 0.10),
                transparent 80%
              )
            `,
          }}
        />

        {/* CONTENT WRAPPER (Relative z-10 para nasa ibabaw ng glow) */}
        <div className="relative z-10 flex flex-col h-full">

            {/* Header Section */}
            <div className="mb-5">
            <div className="flex justify-between items-start mb-3">
                {/* Modern Date Tag */}
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
                </span>
                
                {/* Modern Topic Tag */}
                {post.topic && (
                <span className="text-[10px] uppercase tracking-wider font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20 group-hover:border-green-500/40 transition-colors">
                    {post.topic}
                </span>
                )}
            </div>

            <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 leading-tight">
                {post.title}
            </h2>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-5 opacity-50"></div>

            {/* Content Body */}
            <div className={`prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed ${
                !isExpanded ? "line-clamp-4" : ""
            }`}
            >
            {isExpanded ? (
                <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => (
                    <h3 className="text-lg font-bold text-green-200 mt-6 mb-3" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                    <h4 className="text-base font-bold text-green-200 mt-5 mb-2" {...props} />
                    ),
                    
                    // FIX: Use div instead of p to avoid Hydration Error
                    p: ({ node, ...props }) => (
                    <div className="mb-3 text-gray-300 block leading-relaxed" {...props} />
                    ),

                    li: ({ node, ...props }) => (
                    <li className="ml-4 list-disc marker:text-green-500" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                    <ul className="mb-3 pl-2" {...props} />
                    ),

                    code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isBlock = !inline;

                    return isBlock ? (
                        <div className="relative group/code my-4 rounded-lg overflow-hidden border border-white/10 shadow-lg block w-full bg-[#1e1e1e]">
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#252526] border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                            <span className="ml-auto text-xs text-gray-500 font-mono">
                            {match ? match[1] : "text"}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <SyntaxHighlighter
                                {...props}
                                style={vscDarkPlus}
                                language={match ? match[1] : "text"}
                                PreTag="div"
                                wrapLongLines={true}
                                customStyle={{
                                margin: 0,
                                padding: "1.5rem",
                                background: "#0d0d0d",
                                fontSize: "0.85rem",
                                lineHeight: "1.5",
                                minWidth: "100%",
                                }}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        </div>
                        </div>
                    ) : (
                        <code
                        className="bg-green-500/10 text-green-300 px-1.5 py-0.5 rounded font-mono text-xs border border-green-500/20"
                        {...props}
                        >
                        {children}
                        </code>
                    );
                    },
                }}
                >
                {cleanedContent}
                </ReactMarkdown>
            ) : (
                <p>{previewContent}</p>
            )}
            </div>

            {/* Footer / Button Area */}
            <div className="mt-auto pt-6 flex justify-center">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="cursor-pointer group/btn relative px-6 py-2.5 rounded-full bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/50 transition-all duration-300 text-sm font-medium text-gray-300 hover:text-green-300 active:scale-95"
            >
                {isExpanded ? "Show Less" : "Read Full Post"}
                {/* Animated Dot */}
                <span
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full transition-all duration-300 ${
                    isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                ></span>
            </button>
            </div>
        </div>
      </motion.article>
    </Reveal>
  );
}