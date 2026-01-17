"use client";

import Reveal from "./Reveal";
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram, FaTelegram } from "react-icons/fa";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/sandrino-carlos-miguel",
    color: "text-blue-500",
    username: "Carlos Miguel Sandrino",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    url: "https://github.com/Crl0sDEV",
    color: "text-white",
    username: "Crl0sDEV",
  },
  {
    name: "Telegram",
    icon: <FaTelegram />,
    url: "https://t.me/Crlsm23",
    color: "text-blue-400",
    username: "@Crlsm23",
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    url: "https://www.facebook.com/KreizzyCarl",
    color: "text-blue-600",
    username: "Carlos Miguel",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/crls_mgx",
    color: "text-pink-500",
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
      className="group relative bg-zinc-900 border border-white/10 p-6 rounded-2xl flex flex-col items-center transition-all overflow-hidden h-full justify-center"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
          <div className={`text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 ${social.color}`}>
            {social.icon}
          </div>
          <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors">{social.name}</h4>
          <span className="text-xs text-gray-500 mt-1 group-hover:text-green-400 transition-colors">{social.username}</span>
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