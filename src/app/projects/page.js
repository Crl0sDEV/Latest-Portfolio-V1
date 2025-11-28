export const metadata = {
  title: "My Projects | Carlos Miguel Sandrino",
  description: "A showcase of applications and systems developed by Carlos Miguel Sandrino.",
};

import Reveal from "../../components/Reveal";
import ProjectCard from "../../components/ProjectCard";
import { FaTools } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "Capstone Title Generator",
      description:
        "An AI-powered generator that creates thesis and capstone titles for BSIT, BSCS, and BSIS students.",
      link: "https://capstone-title-generator-by-carlos.vercel.app/",
      tech: ["Next.js", "OpenAI API", "Tailwind CSS"],
      img: "/projects/capstone-preview.png",
    },
    {
      title: "Water Level Monitoring – Web",
      description:
        "A real-time monitoring dashboard built using JSN-SR40T ultrasonic sensor and GSM 900A module.",
      link: "https://waterlevelmonitoring.vercel.app/",
      tech: ["IoT", "Javascript", "Real-time DB"],
      img: "/projects/water-web.png",
    },
    {
      title: "Water Level Monitoring – Mobile",
      description:
        "Android app built with Flutter and Supabase for live river water-level monitoring.",
      link: "#",
      tech: ["Flutter", "Supabase", "Android"],
      img: null,
    },
    {
      title: "Byte & Brew – Loyalty System",
      description:
        "RFID-based customer rewards platform featuring balance tracking, reloading, and rewards.",
      link: "https://byteand-brew.vercel.app/",
      tech: ["React", "Supabase", "RFID Integration"],
      img: "/projects/byte-brew.png",
    },
    {
      title: "UNITRACK – Tracking App",
      description:
        "Flutter + Firebase application for real-time location tracking inside school campuses.",
      link: "#",
      tech: ["Flutter", "Firebase", "Google Maps API"],
      img: null,
    },
    {
      title: "Personal Portfolio Website",
      description:
        "A modern and responsive developer portfolio built using Next.js, Tailwind CSS, and Vercel.",
      link: "https://carlos-miguel-sandrino-portfolio.vercel.app/",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      img: "/projects/portfolio.png",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-24 px-6" id="projects">
      <Reveal>
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">Projects</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex justify-center">
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
        </div>
      </Reveal>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <Reveal key={i} delay={i * 0.1 + 0.2}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 text-center">
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