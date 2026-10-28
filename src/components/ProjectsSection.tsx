import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./FadeIn.tsx";
import { ProjectCard, ProjectData } from "./ProjectCard.tsx";
import { Sparkles } from "lucide-react";

const PROJECTS: ProjectData[] = [
  {
    id: "capsule-01-outerwear",
    number: "01",
    title: "Le Grand Manteau & Revers Cranté",
    category: "Capsule Sartoriale 01",
    description:
      "Pardessus d'hiver en laine vierge peignée 140s et doublure satinée. Boutons de manchette et agrafes d'apparat usinées en chrome poli miroir.",
    col1Img1: "/images/hero-img/look-06.webp",
    col1Img2: "/images/hero-img/look-03.webp",
    col2Img: "/images/editorial-02.webp",
    tools: [
      "Laine Vierge 140s",
      "Finition Chrome Miroir",
      "Doublure Cupro",
      "Boutonnières Main",
    ],
    year: "Hiver 2026",
  },
  {
    id: "capsule-02-fleece",
    number: "02",
    title: "La Veste Croisée & Laine Peignée",
    category: "Capsule Sartoriale 02",
    description:
      "Costume croisé six boutons en twill gréige et boutons gravés. Construction semi-entoilée traditionnelle garantissant un drapé sculptural naturel.",
    col1Img1: "/images/hero-img/look-07.webp",
    col1Img2: "/images/editorial-01.webp",
    col2Img: "/images/hero-img/look-04.webp",
    tools: [
      "Drap de Laine Biella",
      "Entoilage Plastron Crin",
      "Revers Éperon",
      "Poches Passepoilées",
    ],
    year: "Hiver 2026",
  },
  {
    id: "capsule-03-tactical",
    number: "03",
    title: "Le Smoking Noir & Épingle d'Argent",
    category: "Capsule Sartoriale 03",
    description:
      "Smoking d'apparat contemporain à col châle en satin de soie noir profond. Accompagné de boutons de manchettes et d'épingles de col en métal précieux.",
    col1Img1: "/images/hero-img/look-05.webp",
    col1Img2: "/images/hero-img/look-02.webp",
    col2Img: "/images/hero-img/look-08.webp",
    tools: [
      "Grain de Poudre Noir",
      "Satin de Soie Pure",
      "Bijouterie Argent Poli",
      "Montage Tailleur",
    ],
    year: "Hiver 2026",
  },
];

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Card 01 scale: starts at 1, gently scales down as cards 2 and 3 stack on top
  const scale0 = useTransform(
    scrollYProgress,
    [0.05, 0.42, 0.8],
    [1, 0.99, 0.98],
  );

  // Card 02 animation: arrives from below between 0.08 and 0.42, docks at top offset
  const y1 = useTransform(scrollYProgress, [0.08, 0.42], ["80vh", "0vh"]);
  const opacity1 = useTransform(scrollYProgress, [0.08, 0.16], [0, 1]);
  const scale1 = useTransform(scrollYProgress, [0.46, 0.8], [1, 0.99]);
  const pointerEvents1 = useTransform(scrollYProgress, (v) =>
    v < 0.08 ? "none" : "auto",
  );

  // Card 03 animation: arrives from below between 0.46 and 0.80, docks on top (closed book)
  const y2 = useTransform(scrollYProgress, [0.46, 0.8], ["80vh", "0vh"]);
  const opacity2 = useTransform(scrollYProgress, [0.46, 0.54], [0, 1]);
  const pointerEvents2 = useTransform(scrollYProgress, (v) =>
    v < 0.46 ? "none" : "auto",
  );

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#F7F5F0] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 border-t border-[#EAE5D9]"
    >
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 mb-12 sm:mb-16 md:mb-20 text-center">
        <FadeIn delay={0} y={30} className="w-full">
          <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] text-[#5A554E] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-taupe" />
            <span>Grandes Séries • Silhouettes Exclusives</span>
          </div>
          <h2
            className="font-serif-luxury font-light uppercase text-center leading-none tracking-tight text-obsidian"
            style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
          >
            Les Capsules
          </h2>
        </FadeIn>
      </div>

      {/* Synchronized Stacking Cards Track */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: "260vh" }}
      >
        <div className="sticky top-12 sm:top-16 md:top-18 max-w-7xl mx-auto w-full px-3 sm:px-6 md:px-8">
          <div className="relative w-full">
            {/* Card 01 - Base Card in flow */}
            <div className="w-full">
              <ProjectCard
                project={PROJECTS[0]}
                index={0}
                totalCards={PROJECTS.length}
                onSelectProject={onSelectProject}
                style={{ scale: scale0, transformOrigin: "top center" }}
                className="relative z-10"
              />
            </div>

            {/* Card 02 - Absolute overlay */}
            <motion.div
              style={{
                y: y1,
                opacity: opacity1,
                pointerEvents: pointerEvents1,
              }}
              className="absolute inset-x-0 top-6 sm:top-7 z-20"
            >
              <ProjectCard
                project={PROJECTS[1]}
                index={1}
                totalCards={PROJECTS.length}
                onSelectProject={onSelectProject}
                style={{ scale: scale1, transformOrigin: "top center" }}
              />
            </motion.div>

            {/* Card 03 - Absolute overlay (Final top card / closed book) */}
            <motion.div
              style={{
                y: y2,
                opacity: opacity2,
                pointerEvents: pointerEvents2,
              }}
              className="absolute inset-x-0 top-12 sm:top-14 z-30"
            >
              <ProjectCard
                project={PROJECTS[2]}
                index={2}
                totalCards={PROJECTS.length}
                onSelectProject={onSelectProject}
                style={{ transformOrigin: "top center" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
