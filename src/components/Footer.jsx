"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/10 pt-16 pb-8 px-6 text-gray-400 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-linear-to-r from-transparent via-green-500/50 to-transparent opacity-50" />
      
      {/* MAIN CONTAINER: Flex-Column sa Mobile, Flex-Row sa Desktop */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
        
        {/* 1. BRAND & SOCIALS */}
        <div className="text-center md:text-left space-y-4 w-full md:w-auto flex flex-col items-center md:items-start">
          <Link href="/" className="text-2xl font-bold text-white tracking-tight">
            Carlos<span className="text-green-400">Dev</span>
          </Link>
          <p className="text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
            Building digital experiences with code and creativity.
          </p>
          
          <div className="flex gap-6 mt-4">
            <SocialIcon href="https://github.com/Crl0sDEV" icon={<FaGithub />} />
            <SocialIcon href="https://www.linkedin.com/in/sandrino-carlos-miguel" icon={<FaLinkedin />} />
            <SocialIcon href="https://www.facebook.com/KreizzyCarl" icon={<FaFacebook />} />
          </div>
        </div>

        {/* 2. QUICK LINKS (Grid sa Mobile para pantay) */}
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
            {/* Pages */}
            <div className="flex flex-col gap-3">
                <h4 className="text-white font-bold mb-1">Explore</h4>
                <FooterLink href="/" text="Home" />
                <FooterLink href="/about" text="About" />
                <FooterLink href="/projects" text="Projects" />
            </div>
            
            {/* Connect */}
            <div className="flex flex-col gap-3">
                <h4 className="text-white font-bold mb-1">Connect</h4>
                <FooterLink href="/blog" text="Blog" />
                <FooterLink href="/contact" text="Contact" />
            </div>
        </div>

        {/* 3. BACK TO TOP BUTTON */}
        <div className="flex flex-col items-center md:items-end gap-3">
            <button 
                onClick={scrollToTop}
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-white/10 text-white hover:bg-green-500 hover:border-green-500 hover:text-black transition-all duration-300 shadow-lg"
                title="Back to Top"
            >
                <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
            <span className="text-xs text-zinc-500">Back to Top</span>
        </div>
      </div>

      {/* COPYRIGHT SECTION */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 text-center md:text-left">
        <p>
            © {new Date().getFullYear()} Carlos Miguel Sandrino.
        </p>
        <p className="flex items-center gap-1">
            Built with <span className="text-white">Next.js</span> & <span className="text-green-400">Tailwind</span>
        </p>
      </div>

    </footer>
  );
}

// --- HELPER COMPONENTS ---

function SocialIcon({ href, icon }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-green-400 hover:-translate-y-1 transition-all duration-300"
        >
            {icon}
        </a>
    )
}

function FooterLink({ href, text }) {
    return (
        <Link 
            href={href} 
            className="text-sm hover:text-green-400 hover:translate-x-1 transition-all duration-200"
        >
            {text}
        </Link>
    )
}