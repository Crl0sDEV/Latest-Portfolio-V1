"use client";

import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="border border-gray-700 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition bg-gray-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        className="text-blue-400 hover:underline"
      >
        View Project →
      </a>
    </motion.div>
  );
}
