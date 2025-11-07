"use client";

import Reveal from "../../components/Reveal";
import ProjectCard from "../../components/ProjectCard";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

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
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/40 rounded-xl text-yellow-400 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.3)]"
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
    </section>
  );
}
