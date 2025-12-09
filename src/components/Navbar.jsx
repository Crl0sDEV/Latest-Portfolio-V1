"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "About", "Projects", "Contact", "Blog"];

  return (
    <motion.nav
      className="w-full fixed top-0 left-0 bg-black/90 backdrop-blur-md text-white z-50 shadow-md border-b border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-5 flex justify-between items-center h-16">
        
        <Link href="/" className="text-xl font-bold cursor-pointer">
          Carlos<span className="text-green-400">Dev</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="hover:text-green-400 font-medium transition-colors"
              >
                {link}
              </Link>
            </motion.div>
          ))}
        </div>

        <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden text-2xl text-white focus:outline-none hover:text-green-400 transition"
        >
          <FaBars />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
      
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[70%] max-w-sm bg-zinc-900 border-l border-white/10 shadow-2xl z-50 md:hidden flex flex-col p-6"
            >
              
              <div className="flex justify-between items-center mb-10">
                <span className="text-lg font-bold">Menu</span>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:text-red-400 transition"
                >
                    <FaTimes />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-medium text-gray-300 hover:text-green-400 transition block py-2 border-b border-white/5"
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}