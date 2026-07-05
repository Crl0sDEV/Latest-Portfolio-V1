"use client";

import Reveal from "../components/Reveal";
import VisitorCounter from "@/components/VisitorCounter";
import LikeButton from "@/components/LikeButton";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Download, Mail, ChevronRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AutomationDemo from "../components/AutomationDemo";
import Testimonials from "../components/Testimonials";

function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-[var(--border)] bg-[var(--background)]/50 overflow-hidden rounded-2xl ${className}`}
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
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[var(--background)] min-h-screen text-[var(--foreground)]">
      <main className="relative w-full min-h-screen px-6 flex flex-col items-center justify-center overflow-hidden py-20 lg:py-0">
        
        {/* Soft, neutral glowing background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--muted)] rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px] pointer-events-none opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content Section (Left) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 mt-10 lg:mt-0">
            <Reveal>
              <div className="mb-6 uppercase tracking-widest text-xs font-bold text-[var(--muted-foreground)]">
                Available for new opportunities
              </div>
            </Reveal>

            <Reveal>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                <span className="inline-flex items-center gap-3">
                  <span className="text-[var(--foreground)]">
                    Carlos Miguel Sandrino
                  </span>
                  <BadgeCheck className="w-8 h-8 md:w-10 md:h-10 text-blue-500 fill-blue-500/20" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="text-xl md:text-2xl font-medium text-[var(--muted-foreground)] h-10 flex items-center justify-center lg:justify-start gap-2 mb-6">
                <ChevronRight className="w-6 h-6 opacity-50" />
                Full Stack Web Developer
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed font-light max-w-lg mb-10">
                I engineer scalable web systems and applications designed to solve real-world problems. My focus is on turning complex challenges into efficient digital solutions that help businesses streamline operations and drive measurable growth.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <motion.a
                  href="/SANDRINO_CARLOS_MIGUEL.pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium shadow-md transition-all hover:opacity-90"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </motion.a>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-[var(--border)] bg-transparent text-[var(--foreground)] font-medium hover:bg-[var(--muted)] hover:border-[var(--muted-foreground)]/50 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact</span>
                  </motion.button>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="mt-12 lg:self-start flex items-center gap-6 p-2">
                <LikeButton />
                <div className="w-px h-8 bg-[var(--border)]"></div>
                <VisitorCounter />
              </div>
            </Reveal>
          </div>

          {/* Profile Image Section (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end items-center relative order-1 lg:order-2 w-full"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] rounded-2xl overflow-hidden bg-[var(--muted)] border border-[var(--border)] shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/profile.png"
                alt="Carlos Miguel Sandrino"
                width={480}
                height={480}
                className="object-cover w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </motion.div>
        </div>
      </main>
      
      <Testimonials />
      <AutomationDemo />
    </div>
  );
}