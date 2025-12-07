import Reveal from "../../components/Reveal";
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaPhp, FaNodeJs, FaGitAlt, FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiSupabase, SiMysql, SiTypescript, SiFirebase, SiLaravel, SiPostman, SiFlutter, SiDart,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

export const metadata = {
  title: "Skills | Carlos Miguel Sandrino",
  description: "Technologies and tools used by Carlos Miguel Sandrino.",
};

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

const SkillCard = ({ Icon, color, name }) => (
  <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition duration-300 border border-gray-700/50 hover:border-green-500/30">
    <Icon className={`text-4xl mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] ${color}`} />
    <span className="text-gray-200 font-medium">{name}</span>
  </div>
);

const SkillSection = ({ title, skills, delay }) => (
  <Reveal delay={delay}>
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-green-400 mb-6 underline decoration-green-500/30 underline-offset-8">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
        {skills.map((skill, i) => (
          <SkillCard key={i} {...skill} />
        ))}
      </div>
    </div>
  </Reveal>
);

export default function About() {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6">
      
      <Reveal>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">About Me</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5 backdrop-blur-sm mb-8">
          <p className="text-gray-300 leading-relaxed text-lg">
            Hi! I’m <span className="text-white font-semibold">Carlos Miguel Sandrino</span>, 
            a 23-year-old BSIT graduate from <span className="text-green-400 font-semibold">Bicol University</span>.
            I have <span className="text-green-400 font-semibold">1 year and 11 months of freelancing experience</span>, 
            working on real-world projects. I specialize in building clean, modern applications using 
            <span className="text-green-400"> React, Next.js, Tailwind CSS, Supabase, and Flutter</span>.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
         <p className="text-gray-400 leading-relaxed mb-12 max-w-4xl">
            I enjoy creating projects that blend functionality with design — from interactive dashboards 
            to cross-platform mobile apps. My goal is to continue improving my craft and deliver 
            high-quality work that brings ideas to life.
         </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-green-400 mb-6">Soft Skills</h2>
          <p className="text-gray-300 mb-6">
            Beyond technical tools, I value clarity, focus, and patience.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {softSkills.map((skill, index) => (
              <li key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex items-center gap-3 hover:bg-gray-800 transition">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-gray-300">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.5}>
        <div className="mb-16 border-l-4 border-green-500 pl-6 py-2">
          <h2 className="text-2xl font-semibold text-white mb-4">Why I Build Things</h2>
          <p className="text-gray-300 leading-relaxed">
            I love building projects that make life easier. Every project is an opportunity to learn something new. 
            For me, development is about solving problems and creating meaningful digital experiences.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.6}>
        <h1 className="text-3xl font-bold text-green-400 mb-8 border-b border-gray-800 pb-4">
          Programming Skills
        </h1>
      </Reveal>
      
      <SkillSection title="Frontend" skills={skillsData.frontend} delay={0.7} />
      <SkillSection title="Backend" skills={skillsData.backend} delay={0.8} />
      <SkillSection title="Mobile Development" skills={skillsData.mobile} delay={0.9} />
      <SkillSection title="Tools & Others" skills={skillsData.tools} delay={1.0} />

    </section>
  );
}