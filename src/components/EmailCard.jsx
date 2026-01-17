"use client";

import { useState } from "react";
import { FaEnvelope, FaCopy, FaCheck } from "react-icons/fa";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Reveal from "./Reveal";

export default function EmailCard({ email }) {
  const [copied, setCopied] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Reveal delay={0.3}>
      <div
        className="group relative h-full bg-zinc-900 border border-white/10 p-8 rounded-2xl flex flex-col justify-center items-center text-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(74, 222, 128, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="relative w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-green-500/50">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <FaEnvelope className="text-4xl text-green-400 relative z-10" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Email Me</h3>
          <p className="text-gray-400 mb-8 text-sm md:text-base break-all font-mono bg-black/30 px-4 py-2 rounded-lg border border-white/5">
            {email}
          </p>

          <div className="flex gap-4 flex-wrap justify-center w-full">
            <a
              href={`mailto:${email}`}
              className="cursor-pointer min-w-[140px] flex justify-center items-center px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(74,222,128,0.3)] active:scale-95 hover:scale-105"
            >
              Send Email
            </a>

            <button
              onClick={handleCopy}
              className="cursor-pointer min-w-[140px] flex justify-center items-center px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-full transition-all gap-2 active:scale-95 hover:border-green-500/50 hover:text-green-300"
            >
              <span
                className={`transition-all duration-300 ${
                  copied ? "text-green-400" : "text-gray-300"
                }`}
              >
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
