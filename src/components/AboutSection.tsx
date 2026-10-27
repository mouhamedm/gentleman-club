import React from 'react';
import { FadeIn } from './FadeIn.tsx';
import { ContactButton } from './ContactButton.tsx';
import { Sparkles, Scissors, Gem, Award } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-28 sm:py-36 bg-alabaster overflow-hidden select-none border-t border-[#EAE5D9]"
    >
      {/* Subtle luxury ambient backlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle 600px at 50% 40%, rgba(220, 214, 201, 0.4), transparent)',
        }}
      />

      <div className="relative z-20 flex flex-col items-center max-w-5xl w-full mx-auto text-center">
        {/* Top Atelier Badge */}
        <FadeIn delay={0.1} y={20}>
          <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.24em] text-[#5A554E] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-taupe" />
            <span>Gentleman Club • Maison Sartoriale Paris</span>
          </div>
        </FadeIn>

        {/* Heading: "L'Atelier Sartorial" */}
        <FadeIn delay={0.2} y={30} className="w-full">
          <h2
            className="font-serif-luxury font-light text-obsidian leading-[0.95] tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 9vw, 130px)' }}
          >
            L'Atelier Sartorial
          </h2>
        </FadeIn>

        {/* Subtitle Manifesto */}
        <FadeIn delay={0.3} y={20} className="w-full max-w-2xl mx-auto mt-8 sm:mt-10">
          <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#3A3835] font-light leading-relaxed italic">
            « À la croisée de l'architecture du costume et de la bijouterie contemporaine. Nous façonnons des pièces rares pour ceux qui exigent l'excellence absolue. »
          </p>
          <p className="font-sans-clean text-xs sm:text-sm text-[#7A746B] font-light mt-4 leading-relaxed max-w-xl mx-auto">
            Chaque silhouette est montée avec des boutonnières milanaises faites main, des doublures soyeuses et des garnitures métalliques chromées qui captent la lumière avec une précision chirurgicale.
          </p>
        </FadeIn>

        {/* 3 Pillars of Excellence Cards */}
        <FadeIn delay={0.4} y={30} className="w-full mt-14 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-7 rounded-2xl bg-white/70 border border-[#E5DFCE] shadow-[0_8px_25px_-5px_rgba(30,24,18,0.04)] backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full border border-[#D5CFBE] bg-alabaster flex items-center justify-center text-obsidian mb-4">
                <Scissors className="w-4 h-4 text-taupe" />
              </div>
              <h3 className="font-serif-luxury text-xl font-normal text-obsidian mb-2">
                Coupe 140s & Entoilage
              </h3>
              <p className="font-sans-clean text-xs text-[#6B655C] leading-relaxed">
                Construction semi-entoilée traditionnelle qui épouse la morphologie et garantit un tombé sculptural durable.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white/70 border border-[#E5DFCE] shadow-[0_8px_25px_-5px_rgba(30,24,18,0.04)] backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full border border-[#D5CFBE] bg-alabaster flex items-center justify-center text-obsidian mb-4">
                <Gem className="w-4 h-4 text-taupe" />
              </div>
              <h3 className="font-serif-luxury text-xl font-normal text-obsidian mb-2">
                Bijouterie Chrome Miroir
              </h3>
              <p className="font-sans-clean text-xs text-[#6B655C] leading-relaxed">
                Boutons de manchette, agrafes et détails métalliques usinés dans un acier chromé poli pour un éclat précieux et discret.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white/70 border border-[#E5DFCE] shadow-[0_8px_25px_-5px_rgba(30,24,18,0.04)] backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full border border-[#D5CFBE] bg-alabaster flex items-center justify-center text-obsidian mb-4">
                <Award className="w-4 h-4 text-taupe" />
              </div>
              <h3 className="font-serif-luxury text-xl font-normal text-obsidian mb-2">
                Séries Confidentielles
              </h3>
              <p className="font-sans-clean text-xs text-[#6B655C] leading-relaxed">
                Chaque pièce est numérotée individuellement dans nos ateliers. Zéro surproduction, réassort inexistant.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Gap & VIP Button */}
        <div className="mt-14 sm:mt-18">
          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={onContactClick} label="Prendre Rendez-Vous à l'Atelier" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
