import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';
import { FadeIn } from './FadeIn.tsx';
import { StaggerTestimonials, type TestimonialItem } from './ui/stagger-testimonials.tsx';

const SARTORIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    tempId: 1,
    id: '01',
    title: 'Une Architecture Sans Égal',
    testimonial:
      "Une coupe d'une rigueur absolue. Le tombé de la laine froide 140s surpasse tout ce que j'ai pu porter chez les grands tailleurs napolitains et parisiens.",
    by: 'Alexandre de V. • Architecte & Collectionneur Sartorial',
    imgSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 2,
    id: '02',
    title: 'De la Haute Horlogerie Portable',
    testimonial:
      'Les agrafes de gilet et les boutons usinés en chrome miroir transforment complètement la silhouette. On a le sentiment de porter une pièce d’orfèvrerie.',
    by: 'Stanislas M. • Directeur Artistique, Genève',
    imgSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 3,
    id: '03',
    title: 'Précision Chirurgicale des Revers',
    testimonial:
      'Revers sculpté à la vapeur, boutonnière milanaise faite à la main au fil de soie... Le niveau d’exigence est tout simplement bluffant.',
    by: 'Julien B. • Designer & Chroniqueur Tailleur',
    imgSrc:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 4,
    id: '04',
    title: 'Séries Strictement Numérotées',
    testimonial:
      'L’assurance qu’aucune silhouette n’est produite à la chaîne. Savoir que mon manteau ne sera tiré qu’à 24 exemplaires dans le monde confère une valeur inestimable.',
    by: 'Marc-Antoine F. • Esthète & Collectionneur Privé',
    imgSrc:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 5,
    id: '05',
    title: 'Le Confort d’une Seconde Peau',
    testimonial:
      'L’entoilage semi-traditionnel en crin de cheval vit et respire. Plus je porte la veste, plus elle s’ajuste à mes mouvements sans aucun pli parasite.',
    by: 'Édouard D. • Curateur Design, Milan',
    imgSrc:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 6,
    id: '06',
    title: 'L’Élégance Contemporaine Redéfinie',
    testimonial:
      'Gentleman Club a réussi à marier la solennité du vestiaire classique avec une audace métallique avant-gardiste. Une claque visuelle.',
    by: 'Thomas R. • Fondateur d’Agence Créative',
    imgSrc:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
  },
  // Répétition pour un carrousel infini fluide
  {
    tempId: 7,
    id: '01',
    title: 'Une Architecture Sans Égal',
    testimonial:
      "Une coupe d'une rigueur absolue. Le tombé de la laine froide 140s surpasse tout ce que j'ai pu porter chez les grands tailleurs napolitains et parisiens.",
    by: 'Alexandre de V. • Architecte & Collectionneur Sartorial',
    imgSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 8,
    id: '02',
    title: 'De la Haute Horlogerie Portable',
    testimonial:
      'Les agrafes de gilet et les boutons usinés en chrome miroir transforment complètement la silhouette. On a le sentiment de porter une pièce d’orfèvrerie.',
    by: 'Stanislas M. • Directeur Artistique, Genève',
    imgSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 9,
    id: '03',
    title: 'Précision Chirurgicale des Revers',
    testimonial:
      'Revers sculpté à la vapeur, boutonnière milanaise faite à la main au fil de soie... Le niveau d’exigence est tout simplement bluffant.',
    by: 'Julien B. • Designer & Chroniqueur Tailleur',
    imgSrc:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    tempId: 10,
    id: '04',
    title: 'Séries Strictement Numérotées',
    testimonial:
      'L’assurance qu’aucune silhouette n’est produite à la chaîne. Savoir que mon manteau ne sera tiré qu’à 24 exemplaires dans le monde confère une valeur inestimable.',
    by: 'Marc-Antoine F. • Esthète & Collectionneur Privé',
    imgSrc:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<TestimonialItem>(SARTORIAL_TESTIMONIALS[0]);

  return (
    <section
      id="testimonials"
      className="relative w-full bg-card text-obsidian rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pt-20 sm:pt-28 pb-20 overflow-hidden border-t border-[#EAE5D9]"
    >
      {/* Halo lumineux d'ambiance */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle 700px at 50% 35%, rgba(220, 214, 201, 0.45), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 relative z-10">
        {/* En-tête de section */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-10 sm:mb-14">
            <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.22em] text-[#5A554E] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-taupe" />
              <span>Échos du Cercle • Critiques Sartoriales</span>
            </div>
            <h2
              className="font-serif-luxury font-light uppercase leading-none tracking-tight text-center text-obsidian"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              Le Cercle Privé
            </h2>
            <p className="font-sans-clean font-light text-[#6B655C] text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Ce que disent les esthètes, directeurs artistiques et collectionneurs de nos pièces. Glissez horizontalement à deux doigts pour parcourir les avis.
            </p>
          </div>
        </FadeIn>

        {/* Gros numéro dynamique en arrière-plan discret */}
        <div className="relative w-full flex items-center justify-center -mb-28 pointer-events-none select-none opacity-15">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id || '01'}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.15, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury font-light text-[#1A1918] leading-none tracking-tighter"
              style={{ fontSize: 'clamp(8rem, 24vw, 24rem)' }}
            >
              {activeItem.id || '01'}.
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cartes en disposition décalée (Stagger Cards) */}
        <div className="w-full relative z-20">
          <StaggerTestimonials
            items={SARTORIAL_TESTIMONIALS}
            onActiveChange={(item) => setActiveItem(item)}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};
