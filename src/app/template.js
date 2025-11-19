"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={Math.random()}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -80, opacity: 0 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
