"use client";

import Reveal from "./Reveal";
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-8 h-8" />,
    url: "https://www.linkedin.com/in/sandrino-carlos-miguel",
    username: "Carlos Miguel Sandrino",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-8 h-8" />,
    url: "https://github.com/Crl0sDEV",
    username: "Crl0sDEV",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="w-8 h-8" />,
    url: "https://www.facebook.com/KreizzyCarl",
    username: "Carlos Miguel",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="w-8 h-8" />,
    url: "https://www.instagram.com/crls_mgx",
    username: "@crls_mgx",
  },
];

function SocialCard({ social }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      className="group relative bg-[var(--background)] border border-[var(--border)] p-6 rounded-2xl flex flex-col items-center transition-all overflow-hidden h-full justify-center shadow-sm hover:shadow-md"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              var(--muted),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
          <div className="text-[var(--muted-foreground)] mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:text-[var(--foreground)]">
            {social.icon}
          </div>
          <h4 className="font-bold text-[var(--foreground)] transition-colors">{social.name}</h4>
          <span className="text-xs text-[var(--muted-foreground)] mt-1 group-hover:text-[var(--foreground)] transition-colors font-light">{social.username}</span>
      </div>
    </a>
  );
}

export default function SocialLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {socialLinks.map((social, index) => (
        <Reveal key={index} delay={0.4 + index * 0.1}>
           <SocialCard social={social} />
        </Reveal>
      ))}
    </div>
  );
}