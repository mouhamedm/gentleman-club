import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { FadeIn } from './FadeIn.tsx';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: string[];
  atelierNote: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    name: 'Laine Froide 140s & Cachemire Peigné',
    category: 'Étoffes Nobles & Tissages',
    description:
      'Tissages prestigieux issus des plus grandes filatures piémontaises et japonaises. Étoffes soyeuses au tombé infroissable qui respirent et accompagnent chaque mouvement avec fluidité.',
    image: '/images/editorial-01.webp',
    specs: ['Super 140s Peigné', 'Origine Italie & Japon', 'Grammage 260g/m²', 'Infroissable Naturel'],
    atelierNote: "Un fil double torsion d'une finesse extrême offrant une tombée franche sans aucune raideur.",
  },
  {
    id: '02',
    name: "Architecture d'Épaule Sartoriale",
    category: 'Structure & Maintien',
    description:
      'Construction semi-entoilée traditionnelle avec plastron de crin de cheval, têtes de manches montées main et revers façonné à la vapeur pour un maintien sculptural impeccable.',
    image: '/images/hero-img/look-06.webp',
    specs: ['Plastron Crin de Cheval', "Cigarette d'Épaule Conique", 'Revers Roulé Vapeur', 'Liberté Articulaire'],
    atelierNote: "La structure intérieure s'adapte à la morphologie au fil des ports pour un tombé naturel.",
  },
  {
    id: '03',
    name: 'Bijouterie Métallique & Chrome Miroir',
    category: 'Orfèvrerie & Métal',
    description:
      "Boutons de manchette, agrafes de gilet et fermoirs étriers façonnés dans un alliage poli miroir qui apporte au costume le même éclat qu'une montre d'exception.",
    image: '/images/hero-img/look-03.webp',
    specs: ['Chrome Poli Miroir', 'Alliage Haute Résistance', 'Gravure Laser Monogramme', 'Fermoirs Étriers'],
    atelierNote: 'Chaque boucle et agrafe est polie à la main selon les techniques de la haute horlogerie.',
  },
  {
    id: '04',
    name: "Finitions Cousues Main à l'Atelier",
    category: 'Haute Façon Main',
    description:
      'Boutonnières milanaises gansées de fil de soie, doublures respirantes en cupro bemberg lustré et finitions intérieures aux surpiqûres sellier invisibles.',
    image: '/images/editorial-02.webp',
    specs: ['Boutonnière Milanaise', 'Fil de Soie Naturel', 'Cupro Bemberg Lustré', 'Points Sellier Invisibles'],
    atelierNote: "Plus de 38 heures d'assemblage artisanal sont requises pour chaque costume complet.",
  },
  {
    id: '05',
    name: 'Capsules Numérotées & Pièces Uniques',
    category: 'Édition Confidentielle',
    description:
      "Chaque vêtement possède son certificat d'authenticité gravé au laser et son numéro de confection exclusif. Des éditions strictement limitées de 25 à 80 pièces.",
    image: '/images/hero-img/look-08.webp',
    specs: ['Tirage 25 à 80 Exemplaires', 'Plaque Métal Matriculée', "Certificat d'Origine", 'Zéro Réassort'],
    atelierNote: 'Une rareté absolue garantie : dès la capsule épuisée, le patron est scellé dans nos archives.',
  },
];

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Élément couvrant la ligne de déclenchement
        if (rect.top <= triggerY && rect.bottom >= triggerY) {
          closestIndex = index;
          minDistance = 0;
        } else {
          const itemCenter = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(itemCenter - triggerY);
          if (minDistance !== 0 && dist < minDistance) {
            minDistance = dist;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToItem = (index: number) => {
    const target = itemRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeItem = SERVICES[activeIndex] ?? SERVICES[0];

  return (
    <section
      id="services"
      className="relative w-full bg-[#121110] text-[#FAF9F5] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 lg:px-14 pt-24 sm:pt-32 pb-24 z-10 border-t border-[#262420]"
    >
      {/* Halo lumineux d'ambiance */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(213, 207, 190, 0.15), transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* En-tête de section */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.22em] text-[#D5CFBE] bg-white/5 border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D5CFBE]" />
              <span>Savoir-Faire & Standards d'Excellence</span>
            </div>
            <h2
              className="font-serif-luxury font-light uppercase leading-none tracking-tight text-center text-white"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              Le Savoir-Faire
            </h2>
            <p className="font-sans-clean font-light text-[#A69F92] text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              L'art du sur-mesure et l'exigence des maîtres tailleurs parisiens au service d'une silhouette sculpturale.
            </p>
          </div>
        </FadeIn>

        {/* Mobile Sticky Indicator Bar */}
        <div className="lg:hidden sticky top-16 z-30 bg-[#121110]/95 backdrop-blur-md py-3 px-4 border-y border-[#262420] mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-3xl font-light text-white leading-none">
              {activeItem.id}.
            </span>
            <span className="font-serif-luxury text-sm text-alabaster font-light truncate max-w-50">
              {activeItem.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {SERVICES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToItem(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/20'
                }`}
                aria-label={`Étape ${item.id}`}
              />
            ))}
          </div>
        </div>

        {/* Contenu Split : Gauche Fixe (Sticky) / Droite Défilante */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* COLONNE GAUCHE FIXE (STICKY) */}
          <div className="hidden lg:flex lg:w-5/12 shrink-0 sticky top-28 h-[calc(100vh-9rem)] flex-col justify-between py-6 pr-6">
            {/* Haut de colonne */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-taupe flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                <span>Atelier Gentleman Club</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 text-xs uppercase tracking-[0.2em] font-mono text-[#D5CFBE]"
                >
                  {activeItem.category}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Centre : GROS NUMÉRO FIXE 01., 02., etc. */}
            <div className="my-auto py-4">
              <div className="relative pb-6 sm:pb-8 xl:pb-10 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif-luxury font-light text-white tracking-tight leading-none"
                    style={{ fontSize: 'clamp(7rem, 14vw, 14rem)' }}
                  >
                    {activeItem.id}.
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Titre du standard actif avec marge basse généreuse */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 sm:mt-12 xl:mt-14 pr-4"
                >
                  <h3 className="font-serif-luxury text-2xl xl:text-3xl text-alabaster font-normal leading-snug">
                    {activeItem.name}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bas de colonne : Indicateurs et navigation par étape */}
            <div className="pt-6 border-t border-[#262420]">
              <div className="flex items-center justify-between text-xs font-mono text-taupe mb-3">
                <span className="uppercase tracking-[0.2em]">Progression</span>
                <span className="text-white font-medium">{activeItem.id} / 05</span>
              </div>

              {/* Pistes de navigation cliquables */}
              <div className="grid grid-cols-5 gap-2">
                {SERVICES.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToItem(idx)}
                      className={`group flex flex-col gap-1.5 py-2 px-1 text-left transition-all duration-300 cursor-pointer border-t-2 ${
                        isActive
                          ? 'border-white text-white'
                          : 'border-white/20 text-taupe hover:border-white/40 hover:text-[#D5CFBE]'
                      }`}
                    >
                      <span className="font-mono text-[11px] font-medium">{item.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE DÉFILANTE */}
          <div className="w-full lg:w-7/12 flex flex-col space-y-16 lg:space-y-24">
            {SERVICES.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center py-8 sm:py-12"
                >
                  <div
                    className={`bg-[#1A1917] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 border transition-all duration-500 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ${
                      isActive
                        ? 'border-[#4A453D] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)]'
                        : 'border-[#262420] opacity-80 hover:opacity-100 hover:border-[#38352F]'
                    }`}
                  >
                    {/* Image d'illustration haute couture */}
                    <div className="relative aspect-16/10 sm:aspect-video rounded-2xl overflow-hidden mb-8 bg-black/60 group">
                      <img
                        src={service.image}
                        alt={service.name}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Badge flottant sur l'image */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md text-[#FAF9F5] border border-white/15">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D5CFBE]" />
                        <span>Standard {service.id}</span>
                      </div>

                      {/* Tag d'étape en bas de l'image */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                        <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#D5CFBE]">
                          {service.category}
                        </span>
                        <span className="font-serif-luxury text-2xl font-light italic">
                          {service.id}.
                        </span>
                      </div>
                    </div>

                    {/* Bloc texte éditorial */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#A69F92] mb-2">
                        {service.category}
                      </div>
                      <h3
                        className="font-serif-luxury font-light text-alabaster tracking-wide leading-tight mb-4"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                      >
                        {service.name}
                      </h3>
                      <p className="font-sans-clean font-light text-[#C5BDAA] leading-relaxed text-sm sm:text-[15px] mb-8">
                        {service.description}
                      </p>

                      {/* Spécifications techniques */}
                      <div className="pt-6 border-t border-[#2B2925]">
                        <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-taupe mb-3">
                          Spécifications Sartoriales
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.specs.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-white/5 border border-white/10 text-border"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Note de l'atelier */}
                      <div className="mt-6 p-4 rounded-xl bg-white/3 border border-white/5 flex items-start gap-3">
                        <span className="text-xs font-mono text-[#D5CFBE] mt-0.5">✦</span>
                        <p className="text-xs font-sans-clean font-light italic text-[#A69F92] leading-relaxed">
                          « {service.atelierNote} »
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
