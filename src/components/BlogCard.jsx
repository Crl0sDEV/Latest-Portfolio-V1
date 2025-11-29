"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Reveal from "./Reveal";

function cleanMarkdown(content) {
  if (!content) return "";
  return content
    .replace(/\*\*/g, '')
    .replace(/^#([^\s#])/gm, '# $1');
}

export default function BlogCard({ post, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cleanedContent = cleanMarkdown(post.content);
  
  const previewContent = cleanedContent.slice(0, 200) + "...";

  return (
    <Reveal delay={0.1 * index}>
      <article 
        className={`relative p-6 text-left bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/30 flex flex-col ${isExpanded ? 'h-auto' : 'h-full'}`}
      >
        {/* Header Section */}
        <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                    {new Date(post.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {post.topic && (
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px] font-bold border border-blue-500/20 uppercase tracking-wide">
                        {post.topic}
                    </span>
                )}
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-blue-100 to-blue-200 leading-tight">
                {post.title}
            </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-4 opacity-50"></div>

        {/* Content Body */}
        <div className={`prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
           {/* If expanded, render Markdown. If not, render plain text preview */}
           {isExpanded ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({node, ...props}) => <h3 className="text-lg font-bold text-blue-200 mt-6 mb-3" {...props} />,
                    h2: ({node, ...props}) => <h4 className="text-base font-bold text-blue-200 mt-5 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 text-gray-300" {...props} />,
                    li: ({node, ...props}) => <li className="ml-4 list-disc marker:text-blue-500" {...props} />,
                    ul: ({node, ...props}) => <ul className="mb-3 pl-2" {...props} />,
                    code: ({node, ...props}) => <code className="bg-black/30 px-1 py-0.5 rounded text-blue-300 font-mono text-xs" {...props} />
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
                className="group relative px-6 py-2 rounded-full bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 transition-all duration-300 text-sm font-medium text-blue-200"
            >
                {isExpanded ? "Show Less" : "Read Full Post"}
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></span>
            </button>
        </div>

      </article>
    </Reveal>
  );
}