"use client";

import Reveal from "../components/Reveal";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 text-center">
      <Reveal>
        <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_rgba(147,51,234,0.6)]">
          Hi, I&apos;m{" "}
          <span className="font-extrabold text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">
            Carlos Miguel Sandrino
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
          A passionate web developer crafting modern and responsive websites
          using{" "}
          <span className="text-blue-400 font-semibold">Next.js</span>,{" "}
          <span className="text-purple-400 font-semibold">Tailwind CSS</span>, and{" "}
          <span className="text-pink-400 font-semibold">Supabase</span>.
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {/* Download CV Button */}
          <motion.a
            href="/CarlosMiguelSandrino_CV.pdf"
            download
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all"
          >
            <FaDownload className="text-lg" />
            Download CV
          </motion.a>

          {/* Message Me Button */}
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-blue-400 text-blue-400 font-semibold hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all"
            >
              <FaEnvelope className="text-lg" />
              Message Me
            </motion.button>
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
