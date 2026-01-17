"use client";

import Reveal from "../components/Reveal";
import ParticlesBackground from "../components/ParticlesBackground";
import VisitorCounter from "@/components/VisitorCounter";
import LikeButton from "@/components/LikeButton";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import Image from "next/image";

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
      className={`group relative border border-white/10 bg-zinc-900/50 overflow-hidden rounded-2xl ${className}`}
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
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white px-6 flex flex-col items-center justify-center overflow-hidden ">
      <ParticlesBackground />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end items-center relative order-1 lg:order-1 h-full"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green-500 blur-[60px] opacity-30 rounded-full scale-90 animate-pulse" />

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full p-0.5 bg-linear-to-br bg-green-300 shadow-2xl shadow-green-500/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-[6px] border-black relative">
                <Image
                  src="/profile.png"
                  alt="Carlos Miguel Sandrino"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-6 backdrop-blur-sm shadow-[0_0_10px_rgba(74,222,128,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Open to Full-time Roles</span>
            </div>
          </Reveal>

          <Reveal>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-green-200 to-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                Carlos Miguel
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="text-xl md:text-3xl font-semibold text-green-400 h-10 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-gray-400">&gt;</span>
              <Typewriter
                options={{
                  strings: [
                    "Web Developer",
                    "Frontend Developer",
                    "Next.js Enthusiast",
                    "Supabase Builder",
                    "Full Stack Developer",
                    "App Developer",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-6 max-w-lg">
              <SpotlightCard className="p-6 backdrop-blur-md">
                <p className="text-gray-300 text-lg leading-relaxed">
                  A passionate web developer crafting modern and responsive
                  websites using{" "}
                  <span className="text-green-400 font-bold">Next.js</span>,{" "}
                  <span className="text-green-400 font-bold">Tailwind CSS</span>
                  , and{" "}
                  <span className="text-green-400 font-bold">Supabase</span>.
                </p>
              </SpotlightCard>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-5">
              <motion.a
                href="/SANDRINO_CARLOS_MIGUEL.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500 text-black font-bold shadow-[0_0_20px_rgba(74,222,128,0.4)] overflow-hidden transition-all hover:bg-green-400"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <FaDownload className="text-xl" />
                <span>Download Resume</span>
              </motion.a>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 font-bold hover:bg-green-500/10 hover:border-green-500 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)] transition-all"
                >
                  <FaEnvelope className="text-xl" />
                  <span>Message Me</span>
                </motion.button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-6 lg:self-start flex items-center gap-6 p-2 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <LikeButton />
              <div className="w-px h-8 bg-white/10"></div>
              <VisitorCounter />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}