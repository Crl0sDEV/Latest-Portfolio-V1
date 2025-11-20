export const metadata = {
  title: "Projects | Carlos Miguel Sandrino",
  description: "See all projects developed by Carlos Miguel Sandrino.",
};

import Reveal from "../../components/Reveal";
import ProjectCard from "../../components/ProjectCard";
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

      <Reveal delay={0.2}>
        <div
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 
          bg-linear-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 
          border border-yellow-500/40 rounded-xl text-yellow-400 
          backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.3)]"
        >
          <FaTools className="text-2xl animate-spin-slow" />
          <span className="font-medium">
            This section is still under development — more projects coming soon!
          </span>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <Reveal key={i} delay={i * 0.2 + 0.4}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12">
          <a
            href="https://github.com/Crl0sDEV"
            target="_blank"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl 
            border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 
            transition-all backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            More Projects in my GitHub →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
