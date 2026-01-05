"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 20;

      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <motion.nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold cursor-pointer relative group z-50"
        >
          Carlos<span className="text-green-400"> / Dev</span>
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
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive
                      ? "text-green-400 font-bold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl text-white focus:outline-none hover:text-green-400 transition z-50"
          aria-label="Open Menu"
        >
          <FaBars />
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
            />
            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-[75%] max-w-sm bg-zinc-900 border-l border-white/10 shadow-2xl z-50 md:hidden flex flex-col p-6 overflow-hidden will-change-transform"
            >
              <div className="absolute inset-0 bg-linear-to-b from-zinc-900 to-black pointer-events-none -z-10" />

              <div className="relative z-10 flex justify-between items-center mb-10">
                <span className="text-lg font-bold text-white">
                  Carlos<span className="text-green-400">Dev</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl hover:text-red-400 transition"
                  aria-label="Close Menu"
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
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
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

              <div className="mt-auto relative z-10 text-center text-xs text-gray-500">
                <p>© {new Date().getFullYear()} Carlos Miguel Sandrino.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
