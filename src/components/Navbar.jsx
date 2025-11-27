"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="w-full fixed top-0 left-0 bg-black text-white z-50 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-5 flex justify-between items-center h-16">
        <h1 className="text-xl font-bold">
          Carlos<span className="text-blue-400">Dev</span>
        </h1>

        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Projects", "Contact", "Blog"].map((link, i) => (
            <motion.div
              key={link}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="hover:text-blue-400"
              >
                {link}
              </Link>
            </motion.div>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black flex flex-col items-center space-y-4 py-4 border-t border-gray-700">
          {["Home", "About", "Projects", "Contact", "Blog"].map((link) => (
            <Link
              key={link}
              href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-400"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
