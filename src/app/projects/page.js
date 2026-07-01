import Reveal from "../../components/Reveal";
import ProjectCard from "../../components/ProjectCard";
import { Wrench } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const metadata = {
  title: "My Projects | Carlos Miguel Sandrino",
  description: "A showcase of applications and systems developed by Carlos Miguel Sandrino.",
};

export default function Projects() {
  const projects = [
    {
      title: "ApplyflowPH",
      description: "Track your job applications offline and online with ApplyflowPH. A comprehensive job application tracker designed to help you manage your job search effectively.",
      link: "https://applyflowph.vercel.app/",
      tech: ["Next.js", "Tailwind CSS", "Supabase", "Shadcn UI"],
      img: "/projects/applyflowph.png",
    },
    {
      title: "Rolyo Laundry Services | Cabanatuan City",
      description: "Premier laundry services in Cabanatuan. Wash, Dry, Fold, and Delivery.",
      link: "https://rolyo.vercel.app/",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"],
      img: "/projects/rolyo.png",
    },
    {
      title: "Tinig | Mga Bulong sa Kalawakan",
      description: "Ang mga salitang hindi masabi, sa bituin na lang ibubulong. Isang ligtas na espasyo para sa iyong mga kinikimkim.",
      link: "https://tinig.vercel.app/",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      img: "/projects/tinig.png",
    },
    {
      title: "Luxury Real Estate Landing Page",
      description:
        "A pixel-perfect, mobile-first real estate website featuring PWA installability, interactive galleries, and a high-end UI design.",
      link: "https://marci-metzger-madebycarlos.vercel.app/",
      tech: ["Next.js", "Tailwind CSS", "PWA (Serwist)", "Framer Motion"],
      img: "/projects/luxury-real-estate.png",
    },
    {
      title: "Ma anong Ulam?",
      description:
        "A Website that suggests random dishes to cook based on available ingredients using Gemini AI.",
      link: "https://ma-ano-ulam-cms.vercel.app/",
      tech: ["Next.js", "Gemini API", "Tailwind CSS", "Framer Motion", "Upstash Redis"],
      img: "/projects/ma-anong-ulam.png",
    },
    {
      title: "Listahan App",
      description:
        "A digital ledger for Sari-sari stores featuring real-time debt tracking, dashboard analytics, secure auth, and dark mode.",
      link: "https://listahan-app.vercel.app/",
      tech: ["Next.js", "Supabase", "Shadcn UI", "Tailwind CSS", "Zustand", "React Hook Form"],
      img: "/projects/listahan-app.png",
    },
    {
      title: "AI-resume-analyzer",
      description:
        "An AI-powered resume analyzer that provides feedback and suggestions to improve resumes.",
      link: "https://ats-radar.vercel.app/",
      tech: ["Next.js", "Gemini API", "Shadcn UI", "Tailwind CSS", "Upstash Redis"],
      img: "/projects/resume-analyzer.png",
    },
    {
      title: "E-Commerce Website",
      description:
        "A fully functional e-commerce website with product listings, shopping cart, and checkout features.",
      link: "https://e-commerce-by-carlos.vercel.app/",
      tech: ["Next.js", "Tailwind CSS", "Zustand", "Supabase", "Framer Motion"],
      img: "/projects/ecommerce.png",
    },
    {
      title: "Samsung Brand Inspired Website",
      description: "A modern and responsive Samsung Inspired Website built using Next.js, Tailwind CSS, Framer Motion, and Vercel.",
      link: "https://samsung-s24-website.vercel.app/",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      img: "/projects/samsung.png",
    },
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
      tech: ["IoT", "Javascript", "Real-time DB", "Arduino", "GSM Module", "Ultrasonic Sensor"],
      img: "/projects/water-web.png",
    },
    {
      title: "Water Level Monitoring – Mobile",
      description:
        "Android app built with Flutter and Supabase for live river water-level monitoring.",
      link: null,
      tech: ["Flutter", "Supabase", "Android", "Arduino", "GSM Module", "Ultrasonic Sensor"],
      img: null,
    },
    {
      title: "Byte & Brew – Loyalty System",
      description:
        "RFID-based customer rewards platform featuring balance tracking, reloading, and rewards.",
      link: "https://byteand-brew.vercel.app/",
      tech: ["React", "Supabase", "RFID Integration", "Tailwind CSS"],
      img: "/projects/byte-brew.png",
    },
    {
      title: "UNITRACK – Tracking App",
      description:
        "Flutter + Firebase application for real-time location tracking inside school campuses.",
      link: null,
      tech: ["Flutter", "Firebase", "Google Maps API"],
      img: null,
    },
    {
      title: "Personal Portfolio Website",
      description:
        "A modern and responsive developer portfolio built using Next.js, Tailwind CSS, and Vercel.",
      link: "https://carlos-miguel-sandrino-portfolio.vercel.app/",
      tech: ["Next.js", "Tailwind", "Framer Motion", "Gemini API", "Upstash Redis", "Supabase"],
      img: "/projects/portfolio.png",
    },
  ];

  return (
    <section className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] py-24 lg:py-16 px-6 overflow-hidden">
      
      {/* Soft, neutral glowing background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--muted)] rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto relative">
        
        <div className="mb-16 text-center">
              <Reveal>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">Projects</span>
                </h1>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg font-light">
                    A showcase of my technical journey—from IoT systems to modern web applications.
                </p>
              </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, i) => (
             <Reveal key={i} delay={0.1 * (i % 3)}> 
                <ProjectCard project={project} priority={i === 0} />
             </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="text-center">
            <a
              href="https://github.com/Crl0sDEV"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--muted)]/50 border border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--muted-foreground)]/50 transition-all duration-300 shadow-sm"
            >
              <FaGithub className="w-6 h-6 text-[var(--foreground)] group-hover:scale-110 transition-transform" />
              <span className="font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  Check out more on GitHub
              </span>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}