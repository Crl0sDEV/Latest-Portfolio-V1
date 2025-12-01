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

      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Reveal>
        <h1 className="text-3xl font-bold mb-6 text-blue-400">About Me</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-gray-300 leading-relaxed mb-6">
          Hi! I’m{" "}
          <span className="text-white font-semibold">
            Carlos Miguel Sandrino
          </span>
          , a 23-year-old BSIT graduate from{" "}
          <span className="text-blue-400 font-semibold">Bicol University</span>.
          I have{" "}
          <span className="text-blue-400 font-semibold">
            1 year and 10 months of freelancing experience
          </span>
          , working on real-world projects in web and mobile development. I
          specialize in building clean, modern, and functional applications
          using <span className="text-blue-400">React</span>,{" "}
          <span className="text-blue-400">Next.js</span>,{" "}
          <span className="text-blue-400">Tailwind CSS</span>,{" "}
          <span className="text-blue-400">Supabase</span>, and{" "}
          <span className="text-blue-400">Flutter</span>.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <p className="text-gray-300 leading-relaxed mb-10">
          I enjoy creating projects that blend functionality with design — from
          interactive dashboards and API-powered systems to cross-platform
          mobile apps. Throughout my freelancing journey, I’ve collaborated with
          clients to build practical solutions that solve real problems. My goal
          is to continue improving my craft and deliver high-quality work that
          brings ideas to life.
        </p>
      </Reveal>

      {/* ========= SOFT SKILLS ========= */}
      <Reveal delay={0.5}>
        <h1 className="text-2xl font-semibold text-blue-400 mb-4">
          Soft Skills
        </h1>

        <p className="text-gray-300 leading-relaxed mb-8">
          Beyond technical tools, I value the importance of communication,
          consistency, and problem-solving. I always make sure that every
          project I work on is approached with clarity, focus, and patience —
          whether I’m working independently or collaborating with a team.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
          {[
            "Strong attention to detail",
            "Clear and consistent communication",
            "Adaptability and willingness to learn",
            "Time management and organization",
            "Problem-solving and analytical thinking",
            "Client collaboration and professionalism",
          ].map((skill, index) => (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:scale-[1.03] transition"
            >
              • {skill}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ========= WHY I BUILD THINGS ========= */}
      <Reveal delay={0.6}>
        <h1 className="text-2xl font-semibold text-blue-400 mt-12 mb-4">
          Why I Build Things
        </h1>

        <p className="text-gray-300 leading-relaxed mb-12">
          I love building projects that make life easier — whether it’s a
          dashboard, a mobile app, a system for automation, or a modern website.
          Every project I create is an opportunity to learn something new and
          turn ideas into something real and useful.
          <br />
          <br />
          For me, development is more than just writing code — it&apos;s about
          solving problems, improving processes, and creating meaningful digital
          experiences that help people and businesses.
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
              {
                Icon: FaJsSquare,
                color: "text-yellow-400",
                name: "JavaScript",
              },
              {
                Icon: SiTypescript,
                color: "text-blue-400",
                name: "TypeScript",
              },
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
