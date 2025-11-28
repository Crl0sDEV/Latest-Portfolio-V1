"use client";

import Reveal from "../components/Reveal";
import ParticlesBackground from "../components/ParticlesBackground"; // BAGO: Eto na yung hacker style
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND LAYER - Techy Network Effect */}
      <ParticlesBackground />

      {/* 2. CONTENT LAYER (Naka z-10 pa rin para lumutang sa lines) */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
        
        <Reveal>
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_rgba(147,51,234,0.6)] py-2">
            Hi, I&apos;m{" "}
            <span className="font-extrabold text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] block mt-2 md:inline">
              Carlos Miguel Sandrino
            </span>
          </h1>
        </Reveal>

        {/* TYPEWRITER EFFECT */}
        <Reveal delay={0.2}>
          <div className="mt-6 text-xl md:text-2xl font-semibold text-blue-400">
            <Typewriter
              options={{
                strings: [
                  "Web Developer",
                  "Frontend Developer",
                  "Next.js Enthusiast",
                  "Supabase Builder",
                  "Mobile App Developer",
                ],
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 40,
              }}
            />
          </div>
        </Reveal>

        {/* DESCRIPTION */}
        <Reveal delay={0.3}>
          {/* Binawasan ko ng konti opacity ng background ng box para mas kita yung lines sa likod */}
          <p className="mt-8 text-gray-300 text-lg leading-relaxed backdrop-blur-sm bg-black/60 p-6 rounded-2xl border border-white/10 shadow-xl">
            A passionate web developer crafting modern and responsive websites
            using{" "}
            <span className="text-blue-400 font-bold">Next.js</span>,{" "}
            <span className="text-purple-400 font-bold">Tailwind CSS</span>, and{" "}
            <span className="text-pink-400 font-bold">Supabase</span>.
          </p>
        </Reveal>

        {/* BUTTONS */}
        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <motion.a
              href="/CarlosMiguelSandrino_CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold shadow-lg overflow-hidden transition-all"
            >
               {/* Hover Shine Effect */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <FaDownload className="text-xl" />
              <span>Download CV</span>
            </motion.a>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-blue-500 text-blue-400 font-bold hover:bg-blue-500/10 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all"
              >
                <FaEnvelope className="text-xl" />
                <span>Message Me</span>
              </motion.button>
            </Link>
          </div>
        </Reveal>
      
      </div>
    </main>
  );
}