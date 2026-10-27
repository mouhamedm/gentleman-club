import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { ContactButton } from './ContactButton.tsx';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full bg-obsidian text-alabaster border-t border-[#2A2826] pt-24 pb-14 px-6 sm:px-10 lg:px-14 select-none">
      <div className="max-w-6xl mx-auto flex flex-col justify-between">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-16 border-b border-[#2A2826]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#A69F92] font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D5CFBE]" />
              Atelier Haute Confection • Séries Confidentielles • Zéro Réassort
            </div>
            <h2
              className="font-serif-luxury font-light text-alabaster tracking-tight leading-none text-4xl sm:text-6xl md:text-7xl"
            >
              Gentleman Club.
            </h2>
            <p className="font-sans-clean font-light text-xs sm:text-sm text-[#A69F92] mt-3 max-w-md leading-relaxed">
              Pour ceux qui célèbrent le costume sur-mesure, la noblesse des étoffes et l'élégance froide du chrome poli.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <ContactButton onClick={onContactClick} label="Prendre Rendez-Vous" />
            <button
              type="button"
              onClick={scrollToTop}
              className="p-4 rounded-full border border-[#3A3835] text-alabaster hover:bg-white/10 hover:border-white transition-all cursor-pointer shadow-sm"
              title="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cities */}
        <div className="py-8 border-b border-[#2A2826] flex flex-wrap items-center justify-between gap-4 text-xs font-mono tracking-[0.25em] text-taupe uppercase">
          <span>Paris — 8e Arr.</span>
          <span>Milan — Quadrilatero</span>
          <span>Londres — Savile Row</span>
          <span>Tokyo — Ginza</span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-taupe uppercase tracking-widest font-sans-clean">
          <div>&copy; {new Date().getFullYear()} GENTLEMAN CLUB — ATELIER SARTORIAL. TOUS DROITS RÉSERVÉS.</div>
          <div className="flex items-center gap-6 text-[11px] tracking-[0.2em]">
            <span className="hover:text-white transition-colors cursor-pointer">LOOKBOOK</span>
            <span className="hover:text-white transition-colors cursor-pointer">SUR-MESURE</span>
            <span className="hover:text-white transition-colors cursor-pointer">SAVOIR-FAIRE</span>
            <span className="hover:text-white transition-colors cursor-pointer">CONTACT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
