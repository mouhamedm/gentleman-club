import React from 'react';
import { FadeIn } from './FadeIn.tsx';
import { ProjectCard, ProjectData } from './ProjectCard.tsx';
import { Sparkles } from 'lucide-react';

const PROJECTS: ProjectData[] = [
  {
    id: 'capsule-01-outerwear',
    number: '01',
    title: 'Le Grand Manteau & Revers Cranté',
    category: 'Capsule Sartoriale 01',
    description:
      'Pardessus d\'hiver en laine vierge peignée 140s et doublure satinée. Boutons de manchette et agrafes d\'apparat usinées en chrome poli miroir.',
    col1Img1: '/images/hero-img/look-06.webp',
    col1Img2: '/images/hero-img/look-03.webp',
    col2Img: '/images/editorial-02.webp',
    tools: ['Laine Vierge 140s', 'Finition Chrome Miroir', 'Doublure Cupro', 'Boutonnières Main'],
    year: 'Hiver 2026',
  },
  {
    id: 'capsule-02-fleece',
    number: '02',
    title: 'La Veste Croisée & Laine Peignée',
    category: 'Capsule Sartoriale 02',
    description:
      'Costume croisé six boutons en twill gréige et boutons gravés. Construction semi-entoilée traditionnelle garantissant un drapé sculptural naturel.',
    col1Img1: '/images/hero-img/look-07.webp',
    col1Img2: '/images/editorial-01.webp',
    col2Img: '/images/hero-img/look-04.webp',
    tools: ['Drap de Laine Biella', 'Entoilage Plastron Crin', 'Revers Éperon', 'Poches Passepoilées'],
    year: 'Hiver 2026',
  },
  {
    id: 'capsule-03-tactical',
    number: '03',
    title: 'Le Smoking Noir & Épingle d\'Argent',
    category: 'Capsule Sartoriale 03',
    description:
      'Smoking d\'apparat contemporain à col châle en satin de soie noir profond. Accompagné de boutons de manchettes et d\'épingles de col en métal précieux.',
    col1Img1: '/images/hero-img/look-05.webp',
    col1Img2: '/images/hero-img/look-02.webp',
    col2Img: '/images/hero-img/look-08.webp',
    tools: ['Grain de Poudre Noir', 'Satin de Soie Pure', 'Bijouterie Argent Poli', 'Montage Tailleur'],
    year: 'Hiver 2026',
  },
];

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#F7F5F0] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-32 sm:pb-40 px-5 sm:px-8 md:px-12 border-t border-[#EAE5D9]"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={30} className="w-full mb-16 sm:mb-20 md:mb-24 text-center">
          <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] text-[#5A554E] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8C867C]" />
            <span>Grandes Séries • Silhouettes Exclusives</span>
          </div>
          <h2
            className="font-serif-luxury font-light uppercase text-center leading-none tracking-tight text-[#141413] select-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
          >
            Les Capsules
          </h2>
        </FadeIn>

        {/* 3 Stacking Cards */}
        <div className="relative w-full pb-12 sm:pb-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
