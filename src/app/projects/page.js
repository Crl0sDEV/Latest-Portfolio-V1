"use client";

import Reveal from "../../components/Reveal";
import ProjectCard from "../../components/ProjectCard";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

export const metadata = {
  title: "Projects | Carlos Miguel Sandrino",
  description: "See all projects developed by Carlos Miguel Sandrino.",
};

export default function Projects() {
  const projects = [
    {
      title: "Capstone Title Generator",
      description: "AI-powered title suggestion system for BSIT/BSCS/BSIS.",
      link: "#",
    },
    {
      title: "QR Code Generator",
      description: "Generates custom QR codes with vCard or URLs.",
      link: "#",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-center" id="projects">
      <Reveal>
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Projects</h1>
      </Reveal>

      {/* ⚙️ Under Development Notice */}
      <Reveal delay={0.2}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/40 rounded-xl text-yellow-400 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.3)]"
        >
          <FaTools className="text-2xl animate-spin-slow" />
          <span className="font-medium">
            This section is still under development — more projects coming soon!
          </span>
        </motion.div>
      </Reveal>

      {/* Project Cards (will appear below the notice) */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Reveal key={index} delay={index * 0.2 + 0.4}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* More Projects - GitHub Link */}
<Reveal delay={0.2}>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mt-12"
  >
    <a
      href="https://github.com/Crl0sDEV"
      target="_blank"
      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-all backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.38-3.87-1.38-.53-1.36-1.31-1.72-1.31-1.72-1.07-.73.09-.72.09-.72 1.18.08 1.8 1.2 1.8 1.2 1.05 1.79 2.76 1.27 3.44.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.21-1.5 3.17-1.19 3.17-1.19.63 1.65.23 2.87.11 3.17.75.81 1.19 1.85 1.19 3.11 0 4.44-2.69 5.4-5.25 5.68.42.36.81 1.09.81 2.22v3.3c0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>

      <span className="font-medium">See more Projects on my GitHub</span>
    </a>
  </motion.div>
</Reveal>

    </section>
  );
}
