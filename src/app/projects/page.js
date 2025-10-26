import Reveal from "../../components/Reveal";
import ProjectCard from "../../components/ProjectCard";

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
    <section className="max-w-6xl mx-auto py-24 px-6" id="projects">
      <Reveal>
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Projects</h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Reveal key={index} delay={index * 0.2}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
