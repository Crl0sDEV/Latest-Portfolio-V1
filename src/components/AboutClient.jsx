"use client";

import Reveal from "./Reveal";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaPhp, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiSupabase, SiMysql, SiTypescript, SiFirebase, SiLaravel, SiPostman, SiFlutter, SiDart } from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const softSkills = [
  "Strong attention to detail",
  "Clear and consistent communication",
  "Adaptability and willingness to learn",
  "Time management and organization",
  "Problem-solving and analytical thinking",
  "Client collaboration and professionalism",
];

const skillsData = {
  frontend: [
    { Icon: FaHtml5, color: "text-orange-500", name: "HTML" },
    { Icon: FaCss3Alt, color: "text-blue-500", name: "CSS" },
    { Icon: FaJsSquare, color: "text-yellow-400", name: "JavaScript" },
    { Icon: SiTypescript, color: "text-blue-400", name: "TypeScript" },
    { Icon: FaReact, color: "text-cyan-400", name: "React" },
    { Icon: SiNextdotjs, color: "text-white", name: "Next.js" },
    { Icon: SiTailwindcss, color: "text-sky-400", name: "Tailwind" },
  ],
  backend: [
    { Icon: FaPhp, color: "text-indigo-400", name: "PHP" },
    { Icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
    { Icon: SiLaravel, color: "text-red-400", name: "Laravel" },
    { Icon: SiSupabase, color: "text-green-500", name: "Supabase" },
    { Icon: SiFirebase, color: "text-yellow-400", name: "Firebase" },
    { Icon: SiMysql, color: "text-blue-300", name: "MySQL" },
  ],
  mobile: [
    { Icon: SiFlutter, color: "text-sky-400", name: "Flutter" },
    { Icon: SiDart, color: "text-blue-500", name: "Dart" },
  ],
  tools: [
    { Icon: FaGitAlt, color: "text-orange-500", name: "Git" },
    { Icon: FaGithub, color: "text-gray-300", name: "GitHub" },
    { Icon: VscCode, color: "text-blue-400", name: "VS Code" },
    { Icon: SiPostman, color: "text-orange-400", name: "Postman" },
  ]
};

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
      className={`group relative border border-white/10 bg-zinc-900/50 overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
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

const SkillIcon = ({ Icon, color, name }) => (
  <SpotlightCard className="p-6 flex flex-col items-center justify-center transition-transform hover:scale-[1.02]">
    <div className="bg-white/5 p-3 rounded-full mb-3 ring-1 ring-white/10">
      <Icon className={`text-3xl ${color} drop-shadow-lg`} />
    </div>
    <span className="text-gray-300 font-medium text-sm tracking-wide group-hover:text-white transition-colors">
      {name}
    </span>
  </SpotlightCard>
);

export default function AboutClient() {
  return (
    <section className="max-w-6xl mx-auto py-24 px-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* --- INTRO SECTION --- */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">Me</span>
            </h1>
        </Reveal>
        
        <Reveal delay={0.2}>
            <p className="text-xl text-gray-400 leading-relaxed">
            I’m <span className="text-white font-semibold">Carlos Miguel Sandrino</span>, a developer who bridges the gap between 
            <span className="text-green-400"> complex code</span> and <span className="text-green-400"> intuitive design</span>.
            </p>
        </Reveal>
      </div>

      {/* --- GRID LAYOUT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        
        {/* LEFT: BIO */}
        {/* GAMIT NA NATIN ANG REVEAL DITO */}
        <Reveal delay={0.3}>
          <SpotlightCard className="p-8 h-full">
            <h3 className="text-2xl font-bold text-white mb-4">The Journey</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              A 23-year-old BSIT graduate from <span className="text-green-400">Bicol University</span> with nearly 2 years of freelancing experience.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I specialize in the modern web stack—building scalable, fast, and secure applications. My goal isn't just to write code, but to solve real business problems.
            </p>
          </SpotlightCard>
        </Reveal>

        {/* RIGHT: SOFT SKILLS */}
        <Reveal delay={0.4}>
          <SpotlightCard className="p-8 h-full">
            <h3 className="text-2xl font-bold text-white mb-6">Soft Skills</h3>
            <div className="space-y-3">
              {softSkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="h-px w-4 bg-green-500/50 group-hover:w-8 transition-all duration-300" />
                  <span className="text-gray-300 group-hover:text-green-400 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      {/* --- TECH STACK --- */}
      <div className="space-y-16">
        <Section title="Frontend Arsenal" skills={skillsData.frontend} delay={0.5} />
        <Section title="Backend Powerhouse" skills={skillsData.backend} delay={0.6} />
        <Section title="Mobile & Tools" skills={[...skillsData.mobile, ...skillsData.tools]} delay={0.7} />
      </div>

    </section>
  );
}

function Section({ title, skills, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="mb-8">
         <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="h-px flex-1 bg-linear-to-r from-green-500/50 to-transparent" />
         </div>
      
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
               <SkillIcon key={i} {...skill} />
            ))}
         </div>
      </div>
    </Reveal>
  );
}