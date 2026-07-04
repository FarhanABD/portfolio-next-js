import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { Project } from '@/types/project';


interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-2xl bg-zinc-900/90 backdrop-blur-sm rounded-2xl p-6 glass-card border border-white/5"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex flex-col gap-4">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={500}
              className="rounded-xl object-cover w-full"
            />
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-zinc-300">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-800 text-zinc-400 border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Code Repository
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
