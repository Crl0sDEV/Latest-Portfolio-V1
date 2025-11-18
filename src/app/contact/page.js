"use client";

import Reveal from "../../components/Reveal";
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section className="relative max-w-5xl mx-auto py-28 px-6 text-center overflow-hidden">
      {/* Subtle gradient background glow */}
      <div  />

      <Reveal>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-blue-500">
          Contact Me
        </h1>
      </Reveal>

      {/* Animated underline */}
      <Reveal delay={0.2}>
        <div className="w-24 h-1 mx-auto mb-10 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
          Interested in working together or just want to say hi?  
          Feel free to reach out through any of my socials below 👇
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <div className="flex flex-wrap justify-center gap-10 text-gray-400">
          {/* Email */}
          <a
            href="mailto:sandrinocarlosmiguel@gmail.com"
            className="text-5xl hover:text-blue-400 transition transform hover:scale-125 drop-shadow-[0_0_15px_rgba(56,189,248,0.7)] animate-float"
            title="Email"
          >
            <FaEnvelope />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Crl0sDEV"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-white transition transform hover:scale-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] animate-float delay-200"
            title="GitHub"
          >
            <FaGithub />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sandrino-carlos-miguel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-blue-500 transition transform hover:scale-125 drop-shadow-[0_0_15px_rgba(59,130,246,0.7)] animate-float delay-400"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/KreizzyCarl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-blue-600 transition transform hover:scale-125 drop-shadow-[0_0_15px_rgba(37,99,235,0.7)] animate-float delay-600"
            title="Facebook"
          >
            <FaFacebook />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/crls_mgx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-pink-500 transition transform hover:scale-125 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)] animate-float delay-800"
            title="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </Reveal>

    </section>
  );
}

/* Add this custom animation in your globals.css or tailwind.css */
