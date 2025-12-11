"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt, FaCode } from "react-icons/fa";

export default function ProjectCard({ project, priority = false }) {
  return (
    <motion.div
      className="flex flex-col h-full bg-gray-900 border border-gray-700 rounded-xl overflow-hidden group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-800 border-b border-gray-700">
        {project.img ? (
          <Image
            src={project.img}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-800/50">
            <FaCode className="text-4xl text-gray-600 group-hover:text-green-500/50 transition-colors" />
          </div>
        )}

        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10"
          >
            <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
              View Project <FaExternalLinkAlt className="text-sm" />
            </span>
          </a>
        )}
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-100 group-hover:text-green-400 transition-colors">
            {project.title}
          </h2>

          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-400 transition-colors z-20"
            >
              <FaExternalLinkAlt className="text-sm" />
            </a>
          )}
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-800 flex flex-wrap gap-2">
          {project.tech && project.tech.length > 0 ? (
            project.tech.map((tech, index) => (
              <span
                key={index}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-900/20 text-green-300 border border-blue-500/20"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-600 italic">No tech listed</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}