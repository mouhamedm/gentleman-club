import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton.tsx';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  tools?: string[];
  year?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const isLast = index === totalCards - 1;
  const topOffset = 80 + index * 22;

  return (
    <div
      ref={containerRef}
      className={`flex items-start justify-center select-none ${
        isLast ? 'h-auto min-h-[68vh] mb-16 sm:mb-20' : 'h-[74vh] sticky'
      }`}
      style={{
        top: isLast ? undefined : `${topOffset}px`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-6xl rounded-4xl sm:rounded-[42px] border border-[#E5DFCE] bg-alabaster p-5 sm:p-7 md:p-9 flex flex-col justify-between shadow-[0_24px_55px_-12px_rgba(30,24,18,0.12)] transition-shadow duration-300 hover:shadow-[0_32px_70px_-15px_rgba(30,24,18,0.18)]"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#EAE5D9]">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            {/* Number */}
            <span
              className="font-serif-luxury font-light italic text-[#B8AF9E] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {project.number}
            </span>

            {/* Category + Title */}
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-taupe font-mono mb-0.5">
                {project.category}
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-medium text-obsidian tracking-normal">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Live Project Button */}
          <LiveProjectButton onClick={() => onSelectProject(project)} />
        </div>

        {/* Bottom Row: 2-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 md:gap-5 pt-4 sm:pt-6">
          {/* Left Column (40% width) */}
          <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-5">
            <div
              className="overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#ECE8DF] border border-[#E0DBCF] cursor-pointer group"
              style={{ height: 'clamp(120px, 15vw, 210px)' }}
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.col1Img1}
                alt={`${project.title} détail 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div
              className="overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#ECE8DF] border border-[#E0DBCF] cursor-pointer group"
              style={{ height: 'clamp(150px, 20vw, 300px)' }}
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.col1Img2}
                alt={`${project.title} détail 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column (60% width) */}
          <div className="md:col-span-6 flex">
            <div
              className="w-full h-full min-h-62.5 md:min-h-87.5 overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#ECE8DF] border border-[#E0DBCF] cursor-pointer group"
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.col2Img}
                alt={`${project.title} vue d'ensemble`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
