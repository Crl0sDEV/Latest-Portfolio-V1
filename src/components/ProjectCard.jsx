"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Code, X, Monitor, Smartphone, Tablet, AlertCircle, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project, index = 0, priority = false }) {
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // desktop, tablet, mobile
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <motion.div
        className="group relative rounded-2xl bg-[var(--background)] border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg w-full max-w-5xl mx-auto"
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                var(--muted),
                transparent 80%
              )
            `,
          }}
        />

        <div className={`relative h-full flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} z-20`}>
          
          <div className="relative h-64 lg:h-auto lg:w-5/12 overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--muted)]/30 group-hover:border-[var(--muted-foreground)]/30 transition-colors duration-500">
            {project.img ? (
              <Image
                src={project.img}
                alt={project.title}
                fill
                priority={priority}
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90 grayscale-[15%] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-[var(--muted)]/10">
                <Code className="w-12 h-12 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-500" />
              </div>
            )}

            {project.link && project.link !== "#" && (
              <div className="absolute inset-0 bg-[var(--background)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-30">
                 <button
                  onClick={(e) => { e.preventDefault(); setShowModal(true); }}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                 >
                   <span className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-xl hover:opacity-90 transition-opacity shadow-md">
                     Live Preview <ExternalLink className="w-4 h-4" />
                   </span>
                 </button>
              </div>
            )}
          </div>

          <div className="p-6 lg:p-8 flex flex-col grow lg:w-7/12 bg-[var(--background)]/80 backdrop-blur-sm justify-center">
            
            <div className="flex justify-between items-start mb-4">
               <h2 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300 leading-tight">
                 {project.title}
               </h2>
              
               <div className="flex gap-3 text-[var(--muted-foreground)]">
                   {project.link && project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                          <ExternalLink className="w-5 h-5" />
                      </a>
                   )}
                   {project.github && project.github !== "#" && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                          <FaGithub className="w-5 h-5" />
                      </a>
                   )}
               </div>
            </div>

            <p className={`text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed font-light ${project.isCaseStudy ? 'mb-6' : 'mb-6 lg:line-clamp-3'}`}>
              {project.description}
            </p>

            {project.isCaseStudy && project.problem && (
              <div className="mb-4 flex gap-3">
                <div className="mt-0.5">
                  <AlertCircle className="w-5 h-5 text-orange-500/80" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">The Challenge</h4>
                  <p className="text-xs md:text-sm text-[var(--muted-foreground)] font-light leading-relaxed">{project.problem}</p>
                </div>
              </div>
            )}
            
            {project.isCaseStudy && project.solution && (
              <div className="mb-6 flex gap-3">
                <div className="mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-green-500/80" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">The Solution</h4>
                  <p className="text-xs md:text-sm text-[var(--muted-foreground)] font-light leading-relaxed">{project.solution}</p>
                </div>
              </div>
            )}

            {/* TECH STACK PILLS */}
            <div className="mt-auto pt-4 border-t border-[var(--border)] flex flex-wrap gap-2">
              {project.tech && project.tech.length > 0 ? (
                project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-[var(--muted)]/50 text-[var(--muted-foreground)] border border-[var(--border)] group-hover:border-[var(--muted-foreground)]/30 group-hover:text-[var(--foreground)] transition-colors"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[var(--muted-foreground)] italic font-light">In Development</span>
              )}
            </div>

          </div>
        </div>
      </motion.div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {showModal && project.link && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[var(--background)]/95 backdrop-blur-md"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--background)] shadow-sm">
              <div className="flex items-center gap-6">
                 <h3 className="text-sm md:text-base font-bold text-[var(--foreground)] truncate max-w-[150px] md:max-w-xs lg:max-w-md">
                   {project.title}
                 </h3>
                 
                 {/* Device Toggles - Hidden on mobile, visible on md+ */}
                 <div className="hidden md:flex items-center bg-[var(--muted)]/50 rounded-lg p-1 border border-[var(--border)]">
                    <button 
                      onClick={() => setViewMode('desktop')} 
                      className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`} 
                      title="Desktop View"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode('tablet')} 
                      className={`p-1.5 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`} 
                      title="Tablet View"
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode('mobile')} 
                      className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`} 
                      title="Mobile View"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-xs md:text-sm flex items-center gap-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5 rounded-md bg-[var(--muted)]/50 border border-[var(--border)]"
                 >
                   Open <span className="hidden md:inline">in new tab</span> <ExternalLink className="w-3.5 h-3.5" />
                 </a>
                 <button 
                   onClick={() => setShowModal(false)} 
                   className="p-1.5 bg-[var(--muted)]/80 hover:bg-[var(--border)] text-[var(--foreground)] rounded-full transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Modal Body / Iframe Container */}
            <div className="flex-1 overflow-hidden bg-[var(--muted)]/20 flex items-center justify-center p-0 md:p-6 lg:p-8">
               <motion.div
                 layout
                 className={`relative w-full h-full bg-white transition-all duration-300 mx-auto ${
                   viewMode === 'desktop' ? 'max-w-full rounded-none md:rounded-xl shadow-2xl overflow-hidden' :
                   viewMode === 'tablet' ? 'max-w-[768px] rounded-xl shadow-2xl overflow-hidden border-[8px] border-[var(--border)]' :
                   'max-w-[375px] rounded-[2rem] shadow-2xl overflow-hidden border-[12px] border-[var(--border)]'
                 }`}
               >
                 <iframe
                   src={project.link}
                   className="w-full h-full border-none"
                   title={`${project.title} Preview`}
                 />
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}