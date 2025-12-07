"use client";

import Reveal from "../components/Reveal";
import ParticlesBackground from "../components/ParticlesBackground";
import VisitorCounter from "@/components/VisitorCounter";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import Image from "next/image"; // 1. Don't forget to import Image

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white px-6 flex flex-col items-center justify-center overflow-hidden py-20">
  
      <ParticlesBackground />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end relative order-1 lg:order-1"
        >
          <div className="absolute inset-0 bg-green-400 blur-[80px] opacity-40 rounded-full w-[80%] h-[80%] top-10 left-10" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full p-1.5 bg-green-500 shadow-2xl shadow-blue-500/20 animate-float">

             <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-4 border-black relative">
                <Image 
                  src="/profile.png"
                  alt="Carlos Miguel Sandrino"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
             </div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">
            
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold bg-green-400 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_rgba(147,51,234,0.6)] py-2 leading-tight">
                Hi, I&apos;m <br />
                <span className="font-extrabold text-zinc-100">
                  Carlos Miguel
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-4 text-xl md:text-3xl font-semibold text-green-400 h-10">
                <Typewriter
                  options={{
                    strings: [
                      "Web Developer",
                      "Frontend Developer",
                      "Next.js Enthusiast",
                      "Supabase Builder",
                      "Full Stack Developer",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 40,
                  }}
                />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 text-zinc-300 text-lg leading-relaxed backdrop-blur-sm bg-zinc-900/30 p-6 rounded-2xl border border-white/10 shadow-xl max-w-lg lg:mx-0">
                A passionate web developer crafting modern and responsive websites
                using <span className="text-green-400 font-bold">Next.js</span>,{" "}
                <span className="text-green-400 font-bold">Tailwind CSS</span>, and{" "}
                <span className="text-green-400 font-bold">Supabase</span>.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-5">
                <motion.a
                  href="/SANDRINO_CARLOS_MIGUEL.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-400 text-white font-bold shadow-lg overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <FaDownload className="text-xl" />
                  <span>Download Resume</span>
                </motion.a>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-green-500 text-green-400 font-bold hover:bg-blue-500/10 hover:text-green-300 transition-all"
                  >
                    <FaEnvelope className="text-xl" />
                    <span>Message Me</span>
                  </motion.button>
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 lg:self-start">
               <VisitorCounter />
            </div>

        </div>
      
      </div>
    </main>
  );
}