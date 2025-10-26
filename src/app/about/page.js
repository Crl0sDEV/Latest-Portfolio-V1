"use client";

import Reveal from "../../components/Reveal";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPhp,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiMysql,
  SiTypescript,
  SiFirebase,
  SiLaravel,
  SiPostman,
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";


export default function About() {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6">
      <Reveal>
        <h1 className="text-3xl font-bold mb-6 text-blue-400">About Me</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-gray-300 leading-relaxed mb-6">
          Hi! I’m{" "}
          <span className="text-white font-semibold">
            Carlos Miguel Sandrino
          </span>
          , a BSIT graduate passionate about building clean and modern web
          applications using technologies like{" "}
          <span className="text-blue-400">React</span>,{" "}
          <span className="text-blue-400">Next.js</span>,{" "}
          <span className="text-blue-400">Tailwind CSS</span>, and{" "}
          <span className="text-blue-400">Supabase</span>.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <p className="text-gray-300 leading-relaxed mb-10">
          I love creating projects that blend functionality with design — from
          interactive dashboards to full-stack web apps. My goal is to keep
          improving and collaborate with clients to bring their ideas to life.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
      <h1 className="text-2xl font-semibold text-blue-400 mb-6">
            Programming Skills
          </h1>
      </Reveal>

      {/* ================= FRONTEND ================= */}
      <Reveal delay={0.6}>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 underline">
            Frontend
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaHtml5 className="text-4xl text-orange-500 mb-2 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
              <span>HTML</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaCss3Alt className="text-4xl text-blue-500 mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              <span>CSS</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaJsSquare className="text-4xl text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
              <span>JavaScript</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiTypescript className="text-4xl text-blue-400 mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
              <span>TypeScript</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaReact className="text-4xl text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
              <span>React</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiNextdotjs className="text-4xl text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <span>Next.js</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiTailwindcss className="text-4xl text-sky-400 mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
              <span>Tailwind</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ================= BACKEND ================= */}
      <Reveal delay={0.8}>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 underline">
            Backend
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaPhp className="text-4xl text-indigo-400 mb-2 drop-shadow-[0_0_10px_rgba(129,140,248,0.6)]" />
              <span>PHP</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaNodeJs className="text-4xl text-green-500 mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span>Node.js</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiLaravel className="text-4xl text-red-400 mb-2 drop-shadow-[0_0_10px_rgba(248,113,113,0.6)]" />
              <span>Laravel</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiSupabase className="text-4xl text-green-500 mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span>Supabase</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiFirebase className="text-4xl text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
              <span>Firebase</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiMysql className="text-4xl text-blue-300 mb-2 drop-shadow-[0_0_10px_rgba(147,197,253,0.6)]" />
              <span>MySQL</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ================= TOOLS ================= */}
      <Reveal delay={1.0}>
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 underline">
            Tools & Others
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaGitAlt className="text-4xl text-orange-500 mb-2 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
              <span>Git</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <FaGithub className="text-4xl text-gray-300 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <span>GitHub</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
  <VscCode className="text-4xl text-blue-400 mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
  <span>VS Code</span>
</div>

            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition">
              <SiPostman className="text-4xl text-orange-400 mb-2 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
              <span>Postman</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
