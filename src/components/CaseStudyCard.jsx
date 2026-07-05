"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function CaseStudyCard({ project }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="group relative rounded-3xl bg-[var(--background)] border border-[var(--border)] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--foreground)]/5 mb-16"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              var(--muted),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-20 flex flex-col lg:flex-row h-full">
        {/* Left Side: Image */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px] overflow-hidden bg-[var(--muted)]/30 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
          {project.img && (
            <Image
              src={project.img}
              alt={project.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90 grayscale-[10%] group-hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          <div className="absolute top-4 left-4 z-30">
            <span className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg">
              Featured Case Study
            </span>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-12 bg-[var(--background)]/80 backdrop-blur-sm">
          
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] leading-tight tracking-tight">
              {project.title}
            </h2>
          </div>

          <p className="text-[var(--muted-foreground)] text-lg mb-8 leading-relaxed font-light">
            {project.description}
          </p>

          {/* Problem & Solution Blocks */}
          <div className="space-y-6 mb-10">
            {project.problem && (
              <div className="flex gap-4">
                <div className="mt-1">
                  <AlertCircle className="w-6 h-6 text-orange-500/80" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--foreground)] mb-1">The Challenge</h4>
                  <p className="text-[var(--muted-foreground)] font-light leading-relaxed text-sm">
                    {project.problem}
                  </p>
                </div>
              </div>
            )}
            {project.solution && (
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-green-500/80" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--foreground)] mb-1">The Solution</h4>
                  <p className="text-[var(--muted-foreground)] font-light leading-relaxed text-sm">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="mb-10 flex flex-wrap gap-2">
            {project.tech && project.tech.map((tech, index) => (
              <span
                key={index}
                className="text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] border border-[var(--border)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 mt-auto">
            {project.link && project.link !== "#" && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                View Live Site <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
                title="View Source Code"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
