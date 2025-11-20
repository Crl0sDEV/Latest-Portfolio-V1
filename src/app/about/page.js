import Reveal from "../../components/Reveal";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPhp,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiMysql,
  SiTypescript,
  SiFirebase,
  SiLaravel,
  SiPostman,
  SiFlutter,
  SiDart,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

export const metadata = {
  title: "Skills | Carlos Miguel Sandrino",
  description: "Technologies and tools used by Carlos Miguel Sandrino.",
};

export default function About() {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6">
      {/* ========= INTRO ========= */}
      <Reveal>
        <h1 className="text-3xl font-bold mb-6 text-blue-400">About Me</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-gray-300 leading-relaxed mb-6">
          Hi! I’m{" "}
          <span className="text-white font-semibold">
            Carlos Miguel Sandrino
          </span>
          , a BSIT graduate passionate about building clean and modern web and
          mobile applications using technologies like{" "}
          <span className="text-blue-400">React</span>,{" "}
          <span className="text-blue-400">Next.js</span>,{" "}
          <span className="text-blue-400">Tailwind CSS</span>,{" "}
          <span className="text-blue-400">Supabase</span>, and{" "}
          <span className="text-blue-400">Flutter</span>.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <p className="text-gray-300 leading-relaxed mb-10">
          I enjoy creating projects that blend functionality with design — from
          interactive dashboards to cross-platform mobile apps. My goal is to
          continuously improve my skills and collaborate with clients to bring
          their ideas to life.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <h1 className="text-2xl font-semibold text-blue-400 mb-6">
          Programming Skills
        </h1>
      </Reveal>

      {/* ========= FRONTEND ========= */}
      <Reveal delay={0.6}>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 underline">
            Frontend
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
            {[
              { Icon: FaHtml5, color: "text-orange-500", name: "HTML" },
              { Icon: FaCss3Alt, color: "text-blue-500", name: "CSS" },
              { Icon: FaJsSquare, color: "text-yellow-400", name: "JavaScript" },
              { Icon: SiTypescript, color: "text-blue-400", name: "TypeScript" },
              { Icon: FaReact, color: "text-cyan-400", name: "React" },
              { Icon: SiNextdotjs, color: "text-white", name: "Next.js" },
              { Icon: SiTailwindcss, color: "text-sky-400", name: "Tailwind" },
            ].map(({ Icon, color, name }, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition"
              >
                <Icon
                  className={`text-4xl mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] ${color}`}
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========= BACKEND ========= */}
      <Reveal delay={0.8}>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 underline">
            Backend
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
            {[
              { Icon: FaPhp, color: "text-indigo-400", name: "PHP" },
              { Icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
              { Icon: SiLaravel, color: "text-red-400", name: "Laravel" },
              { Icon: SiSupabase, color: "text-green-500", name: "Supabase" },
              { Icon: SiFirebase, color: "text-yellow-400", name: "Firebase" },
              { Icon: SiMysql, color: "text-blue-300", name: "MySQL" },
            ].map(({ Icon, color, name }, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition"
              >
                <Icon
                  className={`text-4xl mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] ${color}`}
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========= MOBILE DEVELOPMENT ========= */}
      <Reveal delay={1.0}>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 underline">
            Mobile Development
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
            {[
              { Icon: SiFlutter, color: "text-sky-400", name: "Flutter" },
              { Icon: SiDart, color: "text-blue-500", name: "Dart" },
            ].map(({ Icon, color, name }, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition"
              >
                <Icon
                  className={`text-4xl mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] ${color}`}
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========= TOOLS ========= */}
      <Reveal delay={1.2}>
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 underline">
            Tools & Others
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300">
            {[
              { Icon: FaGitAlt, color: "text-orange-500", name: "Git" },
              { Icon: FaGithub, color: "text-gray-300", name: "GitHub" },
              { Icon: VscCode, color: "text-blue-400", name: "VS Code" },
              { Icon: SiPostman, color: "text-orange-400", name: "Postman" },
            ].map(({ Icon, color, name }, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition"
              >
                <Icon
                  className={`text-4xl mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] ${color}`}
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
