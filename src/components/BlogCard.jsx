"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Reveal from "./Reveal";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function cleanMarkdown(content) {
  if (!content) return "";
  return content.replace(/\*\*/g, "").replace(/^#([^\s#])/gm, "# $1");
}

export default function BlogCard({ post, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cleanedContent = cleanMarkdown(post.content);
  const previewContent = cleanedContent.slice(0, 250) + "...";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Lock scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const MarkdownComponents = {
    h1: ({ node, ...props }) => (
      <h3 className="text-2xl font-extrabold text-[var(--foreground)] mt-8 mb-4 tracking-tight" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h4 className="text-xl font-bold text-[var(--foreground)] mt-6 mb-3 tracking-tight" {...props} />
    ),
    p: ({ node, ...props }) => (
      <div className="mb-4 text-[var(--muted-foreground)] block leading-relaxed text-lg font-light" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="ml-4 list-disc marker:text-[var(--foreground)] text-[var(--muted-foreground)] font-light text-lg mb-1" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="mb-5 pl-2" {...props} />
    ),
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const isBlock = !inline;

      return isBlock ? (
        <div className="relative group/code my-6 rounded-xl overflow-hidden border border-[var(--border)] shadow-md block w-full bg-[#1e1e1e]">
          <div className="flex items-center gap-1.5 px-4 py-3 bg-[#252526] border-b border-[var(--border)]/10">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-auto text-xs text-gray-500 font-mono uppercase tracking-widest">
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
                fontSize: "0.9rem",
                lineHeight: "1.6",
                minWidth: "100%",
              }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <code
          className="bg-[var(--muted)]/50 text-[var(--foreground)] px-1.5 py-0.5 rounded-md font-mono text-sm border border-[var(--border)]"
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <Reveal delay={0.1 * index} className="w-full">
        <motion.article
          className="group relative w-full p-6 md:p-8 bg-[var(--background)]/80 backdrop-blur-md border border-[var(--border)] rounded-[2rem] overflow-hidden transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-10 hover:shadow-xl hover:border-[var(--muted-foreground)]/30 items-start md:items-center"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  var(--muted),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="relative z-10 flex flex-col w-full md:w-1/4 shrink-0">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--muted-foreground)] mb-2 block">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.topic && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--foreground)] bg-[var(--muted)] px-3 py-1.5 rounded-full border border-[var(--border)] w-fit">
                {post.topic}
              </span>
            )}
          </div>

          <div className="relative z-10 flex flex-col flex-1 w-full border-l-0 md:border-l md:border-[var(--border)] md:pl-10 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] mb-3 leading-tight tracking-tight">
              {post.title}
            </h2>
            <p className="text-[var(--muted-foreground)] font-light leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
              {previewContent}
            </p>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-fit cursor-pointer group/btn flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium transition-all duration-300 hover:opacity-90 active:scale-95 shadow-md"
            >
              <span>Read Full Post</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.article>
      </Reveal>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background)] border border-[var(--border)] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-10 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--border)] bg-[var(--muted)]/20 backdrop-blur-md">
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest font-bold text-[var(--muted-foreground)] mb-1">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-[var(--foreground)] truncate max-w-[250px] md:max-w-[500px]">
                      {post.title}
                    </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] text-[var(--foreground)] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-10 overflow-y-auto w-full">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {cleanedContent}
                </ReactMarkdown>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
