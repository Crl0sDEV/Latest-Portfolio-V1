"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full bg-[var(--background)] border-t border-[var(--border)] pt-12 pb-8 px-6 text-[var(--muted-foreground)] overflow-hidden transition-colors duration-300">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
        
        <div className="text-center md:text-left space-y-4 w-full md:w-auto flex flex-col items-center md:items-start">
          <Link href="/" className="text-2xl font-bold text-[var(--foreground)] tracking-tight flex items-center">
            <span className="text-[var(--foreground)]">Carlos</span>
            <span className="text-blue-500">.</span>
            <span className="text-[var(--muted-foreground)]">dev</span>
          </Link>
          <p className="text-sm max-w-xs mx-auto md:mx-0 leading-relaxed font-light text-[var(--muted-foreground)]">
            Building digital experiences with code and creativity.
          </p>
          
          <div className="flex gap-5 mt-2">
            <SocialIcon href="https://github.com/Crl0sDEV" icon={<FaGithub />} />
            <SocialIcon href="https://www.linkedin.com/in/sandrino-carlos-miguel" icon={<FaLinkedin />} />
            <SocialIcon href="https://www.facebook.com/KreizzyCarl" icon={<FaFacebook />} />
          </div>
        </div>

        <div className="w-full md:w-auto grid grid-cols-2 gap-10 md:flex md:gap-16 text-left border-t border-[var(--border)] pt-8 md:pt-0 md:border-none">
          
            <div className="flex flex-col gap-3">
                <h4 className="text-[var(--foreground)] font-bold mb-1 text-base">Explore</h4>
                <FooterLink href="/" text="Home" />
                <FooterLink href="/about" text="About" />
                <FooterLink href="/projects" text="Projects" />
            </div>
            
            <div className="flex flex-col gap-3">
                <h4 className="text-[var(--foreground)] font-bold mb-1 text-base">Connect</h4>
                <FooterLink href="/blog" text="Blog" />
                <FooterLink href="/contact" text="Contact" />
            </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto pt-4 md:pt-0">
            <button 
                onClick={scrollToTop}
                className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--muted)]/50 border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 shadow-sm hover:shadow-md"
                title="Back to Top"
            >
                <ArrowUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium">Top</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[var(--border)] flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-xs text-[var(--muted-foreground)] text-center md:text-left font-light">
        <p>
            © {new Date().getFullYear()} Carlos Miguel Sandrino.
        </p>
        <p className="flex items-center gap-1">
            Built with <span className="text-[var(--foreground)] font-medium">Next.js</span> & <span className="text-[var(--foreground)] font-medium">Tailwind</span>
        </p>
      </div>

    </footer>
  );
}

function SocialIcon({ href, icon }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:-translate-y-1 transition-all duration-300 p-2 bg-[var(--muted)]/30 rounded-full border border-[var(--border)] hover:border-[var(--foreground)]/50"
        >
            {icon}
        </a>
    )
}

function FooterLink({ href, text }) {
    return (
        <Link 
            href={href} 
            className="text-sm font-light text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:translate-x-1 transition-all duration-200 block"
        >
            {text}
        </Link>
    )
}