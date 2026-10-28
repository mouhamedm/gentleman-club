import React from 'react';
import { motion, MotionStyle } from 'framer-motion';
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
  style?: MotionStyle;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onSelectProject,
  style,
  className = '',
}) => {
  const isLast = index === totalCards - 1;

  return (
    <motion.div
      style={style}
      className={`w-full max-w-7xl mx-auto rounded-3xl sm:rounded-[36px] border border-[#E5DFCE] bg-alabaster p-4 sm:p-6 md:p-7 ${
        isLast ? 'pb-6 sm:pb-8' : 'pb-4 sm:pb-6'
      } flex flex-col justify-between shadow-[0_24px_55px_-12px_rgba(30,24,18,0.12)] transition-shadow duration-300 hover:shadow-[0_32px_70px_-15px_rgba(30,24,18,0.18)] select-none ${className}`}
    >
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#EAE5D9]">
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          {/* Number */}
          <span
            className="font-serif-luxury font-light italic text-[#B8AF9E] leading-none select-none"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
          >
            {project.number}
          </span>

          {/* Category + Title */}
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-taupe font-mono mb-0.5">
              {project.category}
            </span>
            <h3 className="font-serif-luxury text-lg sm:text-xl md:text-2xl font-medium text-obsidian tracking-normal">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Live Project Button */}
        <LiveProjectButton onClick={() => onSelectProject(project)} />
      </div>

      {/* Bottom Row: 2-column image grid with uniform height across all cards */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 md:gap-5 pt-3 sm:pt-4 md:h-97.5 lg:h-105">
        {/* Left Column (40% width) */}
        <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4 md:h-full">
          <div
            className="overflow-hidden rounded-xl sm:rounded-2xl bg-[#ECE8DF] border border-[#E0DBCF] cursor-pointer group h-30 sm:h-35 md:h-auto md:flex-4"
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
            className="overflow-hidden rounded-xl sm:rounded-2xl bg-[#ECE8DF] border border-[#E0DBCF] cursor-pointer group h-35 sm:h-42.5 md:h-auto md:flex-5"
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
        <div className="md:col-span-6 flex md:h-full">
          <div
            className="w-full h-60 sm:h-70 md:h-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#ECE8DF] border border-[#E0DBCF] cursor-pointer group"
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
  );
};
