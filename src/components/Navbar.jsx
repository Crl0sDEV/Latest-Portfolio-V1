"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import para sa Active Link
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // 2. State para sa Scroll
  const pathname = usePathname(); // Get current route

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  // Logic para ma-detect kung nag scroll na si user
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      // DYNAMIC CLASS: Transparent pag taas, Glass pag scroll
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold cursor-pointer relative group">
          Carlos<span className="text-green-400"> / Dev</span>
          {/* Subtle Glow sa Logo */}
          <span className="absolute -inset-2 bg-green-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {/* Background Pill pag Active */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Text Color logic */}
                <span className={`relative z-10 transition-colors ${isActive ? "text-green-400 font-bold" : "text-gray-300 hover:text-white"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* HAMBURGER BUTTON */}
        <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden text-2xl text-white focus:outline-none hover:text-green-400 transition"
        >
          <FaBars />
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[75%] max-w-sm bg-zinc-900 border-l border-white/10 shadow-2xl z-50 md:hidden flex flex-col p-6 overflow-hidden"
            >
              
              {/* Background Glows sa Mobile Menu */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex justify-between items-center mb-10">
                <span className="text-lg font-bold text-white">
                  Carlos<span className="text-green-400">Dev</span>
                </span>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:text-red-400 transition"
                >
                    <FaTimes />
                </button>
              </div>

              <div className="relative z-10 flex flex-col space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl font-medium block py-3 border-b border-white/5 transition-all ${
                          isActive 
                            ? "text-green-400 pl-4 border-green-500/30 bg-green-500/5 rounded-r-lg" 
                            : "text-gray-300 hover:text-white hover:pl-2"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Footer */}
              <div className="mt-auto relative z-10 text-center text-xs text-gray-500">
                 <p>© 2024 Carlos Miguel Sandrino</p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}