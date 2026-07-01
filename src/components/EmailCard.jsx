"use client";

import { useState, useEffect } from "react";
import { Mail, Copy, Check, Send } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Reveal from "./Reveal";

export default function EmailCard({ email }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [isAwake, setIsAwake] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      const phTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(phTime);

      const hour = parseInt(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "numeric", hour12: false }));
      // Assume asleep between 2 AM and 7 AM
      if (hour >= 2 && hour < 8) {
        setIsAwake(false);
      } else {
        setIsAwake(true);
      }
    };
    
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

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
    <Reveal delay={0.3} className="h-full">
      <div
        className="group relative h-full bg-[var(--background)] border border-[var(--border)] p-8 rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                var(--muted),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full mb-8">
          
          {/* Status Indicator */}
          {mounted && (
            <div className="absolute top-0 right-0 flex items-center gap-2 bg-[var(--background)] px-3 py-1.5 rounded-full border border-[var(--border)] shadow-sm">
               <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAwake ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAwake ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                </span>
               <span className="text-xs font-medium text-[var(--muted-foreground)]">
                 {isAwake ? "Available" : "Sleeping"} • {time} PHT
               </span>
            </div>
          )}

          <div className="relative w-20 h-20 bg-[var(--muted)]/50 rounded-full flex items-center justify-center mb-6 mt-10 group-hover:scale-110 transition-transform duration-300 border border-[var(--border)] group-hover:border-[var(--muted-foreground)]/50">
            <div className="absolute inset-0 bg-[var(--foreground)]/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Mail className="w-8 h-8 text-[var(--foreground)] relative z-10 opacity-90" />
          </div>

          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Direct Message</h3>
          <p className="text-[var(--muted-foreground)] text-sm md:text-base text-center mb-6 font-light max-w-sm">
            Got a question, proposal, or just want to say hello? Go ahead.
          </p>
          
          <div className="w-full flex items-center justify-center mb-2">
            <p className="text-[var(--muted-foreground)] text-sm md:text-base break-all font-mono bg-[var(--muted)]/30 px-4 py-3 rounded-lg border border-[var(--border)] shadow-inner w-full text-center">
              {email}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 flex-wrap justify-center w-full">
          <a
            href={`mailto:${email}`}
            className="cursor-pointer flex-1 min-w-[140px] flex justify-center items-center gap-2 px-6 py-3.5 bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] font-medium rounded-xl transition-all shadow-md active:scale-95 hover:scale-105"
          >
            <Send className="w-4 h-4" /> Send Email
          </a>

          <button
            onClick={handleCopy}
            className="cursor-pointer flex-1 min-w-[140px] flex justify-center items-center gap-2 px-6 py-3.5 bg-[var(--background)] hover:bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] font-medium rounded-xl transition-all active:scale-95 hover:border-[var(--muted-foreground)]/50"
          >
            <span
              className={`transition-all duration-300 ${
                copied ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </span>
            <span>
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
      </div>
    </Reveal>
  );
}
