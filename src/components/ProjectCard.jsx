"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaCode } from "react-icons/fa";

export default function ProjectCard({ project, priority = false }) {
  // --- SPOTLIGHT LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="group relative rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* 1. SPOTLIGHT EFFECT LAYER */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(74, 222, 128, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full flex flex-col z-20">
        
        {/* 2. IMAGE SECTION */}
        <div className="relative h-56 w-full overflow-hidden border-b border-white/5 bg-zinc-800/50 group-hover:border-green-500/30 transition-colors duration-500">
          {project.img ? (
            <Image
              src={project.img}
              alt={project.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-zinc-900">
              <FaCode className="text-5xl text-gray-700 group-hover:text-green-500 transition-colors duration-500" />
            </div>
          )}

          {/* OVERLAY BUTTON (Visit Site) */}
          {project.link && project.link !== "#" && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
               <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
               >
                 <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20">
                   View Live Demo <FaExternalLinkAlt className="text-xs" />
                 </span>
               </a>
            </div>
          )}
        </div>

        {/* 3. CONTENT SECTION */}
        <div className="p-6 flex flex-col grow bg-zinc-900/40 backdrop-blur-sm">
          
          <div className="flex justify-between items-start mb-3">
             <h2 className="text-xl font-bold text-gray-100 group-hover:text-green-400 transition-colors duration-300 leading-tight">
               {project.title}
             </h2>
             
             {/* Optional: GitHub Link icon kung meron, or just external link */}
             <div className="flex gap-3 text-gray-500">
                 {/* Pwede mo dagdagan ng github link field sa data mo if meron */}
                 {project.link && project.link !== "#" && (
                    <a href={project.link} target="_blank" className="hover:text-green-400 transition-colors">
                        <FaExternalLinkAlt />
                    </a>
                 )}
             </div>
          </div>

          <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* TECH STACK PILLS */}
          <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
            {project.tech && project.tech.length > 0 ? (
              project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5 group-hover:border-green-500/30 group-hover:text-green-300 transition-colors"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-600 italic">In Development</span>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}