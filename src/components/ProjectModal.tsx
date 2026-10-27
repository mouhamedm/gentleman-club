import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Box, Sparkles } from 'lucide-react';
import { ProjectData } from './ProjectCard.tsx';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#141413]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#FAF9F5] border border-[#E0DBCF] rounded-[32px] p-6 sm:p-10 shadow-[0_35px_90px_rgba(30,24,18,0.22)] z-10 my-8 max-h-[90vh] overflow-y-auto text-[#141413]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-[#8C867C] hover:text-[#141413] transition-colors p-2.5 rounded-full bg-white/70 border border-[#E2DDD2] hover:bg-white cursor-pointer z-20 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[#EAE5D9]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="chrome-badge font-mono text-xs uppercase px-3.5 py-1 rounded-full text-[#5A554E]">
                  {project.category}
                </span>
                {project.year && (
                  <span className="font-mono text-xs text-[#8C867C] tracking-wider uppercase">
                    Collection {project.year}
                  </span>
                )}
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#141413] tracking-normal">
                {project.number} &mdash; {project.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                const shopEl = document.getElementById('shop');
                if (shopEl) {
                  shopEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="chrome-button-sheen inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#141413] text-[#FAF9F5] text-xs font-sans-clean font-medium uppercase tracking-wider hover:bg-[#23211F] transition-all cursor-pointer shadow-sm"
            >
              <span>Voir le Vestiaire</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Description & Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#EAE5D9]">
            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#8C867C] mb-2 font-mono">
                Architecture de Coupe & Drapé
              </h4>
              <p className="font-sans-clean text-[#5A554E] text-sm sm:text-base font-light leading-relaxed">
                {project.description}
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#8C867C] mb-2 font-mono">
                Matières Nobles & Métaux
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools?.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E2DDD2] text-xs text-[#141413] font-mono shadow-xs"
                  >
                    <Box className="w-3 h-3 text-[#8C867C]" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image Showcase Grid */}
          <div className="pt-6 space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#8C867C] font-mono">
              Lookbook Éditorial & Silhouettes
            </h4>

            {/* Primary Hero image */}
            <div className="rounded-3xl overflow-hidden border border-[#E0DBCF] shadow-md bg-[#ECE8DF]">
              <img
                src={project.col2Img}
                alt={`${project.title} vue d'ensemble`}
                className="w-full h-auto object-cover max-h-[580px]"
              />
            </div>

            {/* Two secondary images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-[#E0DBCF] shadow-sm bg-[#ECE8DF]">
                <img
                  src={project.col1Img1}
                  alt={`${project.title} détail atelier`}
                  className="w-full h-auto object-cover max-h-[360px]"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#E0DBCF] shadow-sm bg-[#ECE8DF]">
                <img
                  src={project.col1Img2}
                  alt={`${project.title} tombé d'étoffe`}
                  className="w-full h-auto object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
