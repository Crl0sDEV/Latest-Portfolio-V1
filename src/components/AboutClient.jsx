"use client";

import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";

const softSkills = [
  "Strong attention to detail",
  "Clear and consistent communication",
  "Adaptability and willingness to learn",
  "Time management and organization",
  "Problem-solving and analytical thinking",
  "Client collaboration and professionalism",
];

const techStacks = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with modern frameworks.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    description: "Creating robust APIs, managing servers, and database architectures.",
    skills: ["PHP", "Node.js", "Laravel", "Supabase", "Firebase", "MySQL"],
  },
  {
    title: "Mobile & Tools",
    description: "Cross-platform app development and essential developer tools.",
    skills: ["Flutter", "Dart", "Git", "GitHub", "VS Code", "Postman"],
  }
];

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
      className={`group relative border border-[var(--border)] bg-[var(--background)]/50 overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--muted),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default function AboutClient() {
  const [currentStack, setCurrentStack] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStack((prev) => (prev + 1) % techStacks.length);
    }, 4500); // Auto slide every 4.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-24 lg:py-16 px-6 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--muted)] rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="relative z-10 flex flex-col space-y-20 lg:space-y-32 mt-10">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto px-4">
            <Reveal>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">Me</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed font-light">
                I’m <span className="text-[var(--foreground)] font-medium">Carlos Miguel Sandrino</span>, a Full Stack Web Developer dedicated to building 
                <span className="text-[var(--foreground)] font-medium"> powerful web systems</span> and <span className="text-[var(--foreground)] font-medium"> scalable solutions</span> for modern businesses.
              </p>
            </Reveal>
        </div>

        {/* Zigzag Pattern */}
        <div className="flex flex-col gap-12 lg:gap-24 relative pb-10">
            {/* Center Vertical Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent -translate-x-1/2 opacity-50" />

            {/* Item 1: The Journey (Left) */}
            <div className="flex flex-col lg:flex-row items-center w-full">
               <div className="w-full lg:w-1/2 lg:pr-12 flex justify-end">
                   <Reveal delay={0.3} className="w-full max-w-xl relative">
                       {/* Timeline Dot */}
                       <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[54px] w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--foreground)] z-20" />
                       
                       <SpotlightCard className="p-8 md:p-10 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Professional Background</h3>
                          <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 font-light">
                            With a solid foundation in Information Technology from <span className="text-[var(--foreground)] font-medium">Bicol University</span>, I've spent the last two years partnering with businesses as an independent developer to deliver high-quality digital solutions.
                          </p>
                          <p className="text-[var(--muted-foreground)] leading-relaxed font-light">
                            My expertise lies in architecting scalable, high-performance web systems. I don't just write code—I engineer robust applications designed to optimize workflows, enhance user experiences, and drive measurable business growth.
                          </p>
                       </SpotlightCard>
                   </Reveal>
               </div>
               <div className="w-full lg:w-1/2 hidden lg:block" />
            </div>

            {/* Item 2: Tech Stack (Right) */}
            <div className="flex flex-col lg:flex-row-reverse items-center w-full mt-10 lg:mt-0">
               <div className="w-full lg:w-1/2 lg:pl-12 flex justify-start">
                   <Reveal delay={0.4} className="w-full max-w-xl relative">
                       {/* Timeline Dot */}
                       <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-[54px] w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--foreground)] z-20" />
                       
                       <div className="relative w-full h-[380px]">
                         <AnimatePresence mode="wait">
                           <motion.div
                             key={currentStack}
                             initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                             exit={{ opacity: 0, y: -30, filter: "blur(5px)" }}
                             transition={{ duration: 0.5, ease: "easeOut" }}
                             className="absolute inset-0 h-full w-full"
                           >
                             <SpotlightCard className="h-full p-8 md:p-10 flex flex-col justify-center backdrop-blur-sm shadow-md border border-[var(--border)]/60">
                               
                               <div className="mb-8">
                                 <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted-foreground)] bg-[var(--muted)]/50 px-3 py-1.5 rounded-full border border-[var(--border)] mb-4 inline-block">
                                   Tech Stack
                                 </span>
                                 <h4 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] mb-3 leading-tight">
                                   {techStacks[currentStack].title}
                                 </h4>
                                 <p className="text-[var(--muted-foreground)] font-light text-sm md:text-base leading-relaxed">
                                   {techStacks[currentStack].description}
                                 </p>
                               </div>

                               <div className="flex flex-wrap gap-2.5">
                                 {techStacks[currentStack].skills.map((skill, i) => (
                                   <span
                                     key={i}
                                     className="px-4 py-2 text-xs md:text-sm font-medium rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]/50 transition-all duration-300 shadow-sm"
                                   >
                                     {skill}
                                   </span>
                                 ))}
                               </div>

                             </SpotlightCard>
                           </motion.div>
                         </AnimatePresence>
                         
                         {/* Dots indicator */}
                         <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-3">
                           {techStacks.map((_, i) => (
                             <button
                               key={i}
                               onClick={() => setCurrentStack(i)}
                               className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                 currentStack === i
                                   ? "bg-[var(--foreground)] scale-125 shadow-md"
                                   : "bg-[var(--border)] hover:bg-[var(--muted-foreground)]"
                               }`}
                               aria-label={`Go to slide ${i + 1}`}
                             />
                           ))}
                         </div>
                       </div>
                   </Reveal>
               </div>
               <div className="w-full lg:w-1/2 hidden lg:block" />
            </div>

            {/* Item 3: Soft Skills (Left) */}
            <div className="flex flex-col lg:flex-row items-center w-full mt-24 lg:mt-0">
               <div className="w-full lg:w-1/2 lg:pr-12 flex justify-end">
                   <Reveal delay={0.5} className="w-full max-w-xl relative">
                        {/* Timeline Dot */}
                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[54px] w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--foreground)] z-20" />
                        
                        <SpotlightCard className="p-8 md:p-10 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">Soft Skills</h3>
                          <div className="space-y-4">
                            {softSkills.map((skill, i) => (
                              <div key={i} className="flex items-center gap-4 group">
                                <div className="h-px w-4 bg-[var(--border)] group-hover:w-8 group-hover:bg-[var(--foreground)] transition-all duration-300" />
                                <span className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors font-light">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </SpotlightCard>
                   </Reveal>
               </div>
               <div className="w-full lg:w-1/2 hidden lg:block" />
            </div>

        </div>
      </div>
    </section>
  );
}