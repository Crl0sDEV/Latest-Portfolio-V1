import Reveal from "./Reveal";
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram, FaTelegram } from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/sandrino-carlos-miguel",
    color: "group-hover:text-blue-500",
    username: "Carlos Miguel Sandrino",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    url: "https://github.com/Crl0sDEV",
    color: "group-hover:text-white",
    username: "Crl0sDEV",
  },
  {
    name: "Telegram",
    icon: <FaTelegram />,
    url: "https://t.me/Crlsm23",
    color: "group-hover:text-blue-400",
    username: "@Crlsm23",
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    url: "https://www.facebook.com/KreizzyCarl",
    color: "group-hover:text-blue-600",
    username: "Carlos Miguel",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/crls_mgx",
    color: "group-hover:text-pink-500",
    username: "@crls_mgx",
  },
];

export default function SocialLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {socialLinks.map((social, index) => (
        <Reveal key={index} delay={0.4 + index * 0.1}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center hover:bg-white/5 transition-all hover:-translate-y-1 hover:border-green-500/30 shadow-lg"
          >
            <div className={`text-4xl mb-3 transition-colors duration-300 text-gray-400 ${social.color}`}>
              {social.icon}
            </div>
            <h4 className="font-bold text-gray-200">{social.name}</h4>
            <span className="text-xs text-gray-500 mt-1">{social.username}</span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}