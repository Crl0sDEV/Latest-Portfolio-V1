"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Reveal from "./Reveal";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
           {isExpanded ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({node, ...props}) => <h3 className="text-lg font-bold text-blue-200 mt-6 mb-3" {...props} />,
                    h2: ({node, ...props}) => <h4 className="text-base font-bold text-blue-200 mt-5 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 text-gray-300" {...props} />,
                    li: ({node, ...props}) => <li className="ml-4 list-disc marker:text-blue-500" {...props} />,
                    ul: ({node, ...props}) => <ul className="mb-3 pl-2" {...props} />,
                    
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        
                        return !inline && match ? (
                          <div className="relative group my-4 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                            {/* Optional: Mac-style dots decoration */}
                            <div className="flex items-center gap-1.5 px-4 py-2 bg-[#1e1e1e] border-b border-white/5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                <span className="ml-auto text-xs text-gray-500 font-mono">{match[1]}</span>
                            </div>
                            
                            <SyntaxHighlighter
                                {...props}
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    background: '#0d0d0d',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.5',
                                }}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded font-mono text-xs border border-blue-500/20" {...props}>
                            {children}
                          </code>
                        );
                    }
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
                className="cursor-pointer group relative px-6 py-2 rounded-full bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 transition-all duration-300 text-sm font-medium text-blue-200 active:scale-95"
            >
                {isExpanded ? "Show Less" : "Read Full Post"}
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></span>
            </button>
        </div>

      </article>
    </Reveal>
  );
}