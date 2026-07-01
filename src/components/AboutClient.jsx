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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        
        {/* LEFT COLUMN: About Me, Journey, Soft Skills */}
        <div className="lg:col-span-7 flex flex-col space-y-10">
          
          <div>
            <Reveal>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">Me</span>
              </h1>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed font-light">
                I’m <span className="text-[var(--foreground)] font-medium">Carlos Miguel Sandrino</span>, a developer who bridges the gap between 
                <span className="text-[var(--foreground)] font-medium"> complex code</span> and <span className="text-[var(--foreground)] font-medium"> intuitive design</span>.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <SpotlightCard className="p-8 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">The Journey</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 font-light">
                A 24-year-old BSIT graduate from <span className="text-[var(--foreground)] font-medium">Bicol University</span> with nearly 2 years of freelancing experience.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed font-light">
                I specialize in the modern web stack—building scalable, fast, and secure applications. My goal isn't just to write code, but to solve real business problems.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.4}>
            <SpotlightCard className="p-8 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
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

        {/* RIGHT COLUMN: Tech Stack Carousel */}
        <div className="lg:col-span-5 flex flex-col mt-10 lg:mt-0">
          <Reveal delay={0.5} className="h-full">
            
            <div className="relative h-full min-h-[400px] w-full flex flex-col justify-center">
              
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
              </div>

              {/* Dots indicator */}
              <div className="mt-8 flex justify-center gap-3">
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

      </div>
    </section>
  );
}