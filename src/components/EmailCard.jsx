"use client";

import { useState } from "react";
import { FaEnvelope, FaCopy, FaCheck } from "react-icons/fa";
import Reveal from "./Reveal"; 

export default function EmailCard({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Reveal delay={0.3}>
      <div className="h-full bg-zinc-900/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-xl relative overflow-hidden group">
        
        <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center w-full">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <FaEnvelope />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Email Me</h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base break-all">
            {email}
            </p>

            <div className="flex gap-3 flex-wrap justify-center w-full">
            <a 
                href={`mailto:${email}`}

                className="cursor-pointer min-w-[140px] flex justify-center items-center px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-green-500/25 active:scale-95"
            >
                Send Email
            </a>
            
            <button 
                onClick={handleCopy}

                className="cursor-pointer min-w-[140px] flex justify-center items-center px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-full transition-all gap-2 active:scale-95"
            >
                
                <span className={`transition-all duration-300 ${copied ? 'text-green-400' : 'text-gray-300'}`}>
                    {copied ? <FaCheck /> : <FaCopy />}
                </span>

                <span className="w-[60px] text-left">
                    {copied ? "Copied!" : "Copy"}
                </span>
            </button>
            </div>
        </div>
      </div>
    </Reveal>
  );
}