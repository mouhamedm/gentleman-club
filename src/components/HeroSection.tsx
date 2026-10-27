import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowDown } from "lucide-react";
import { ContactButton } from "./ContactButton.tsx";
import { WorksWheel, WorksWheelItem } from "./ui/works-wheel.tsx";
import { useCart } from "../context/CartContext.tsx";

interface HeroSectionProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
}

const HERO_WHEEL_ITEMS: WorksWheelItem[] = [
  {
    title: "Costume Laine Froide & Boutons Chrome",
    image: "/images/hero-img/look-01.webp",
    href: "#shop",
  },
  {
    title: "Veste Croisée Gréige & Revers Éperon",
    image: "/images/hero-img/look-02.webp",
    href: "#shop",
  },
  {
    title: "Smoking Soie Albâtre & Épingle d'Argent",
    image: "/images/hero-img/look-03.webp",
    href: "#shop",
  },
  {
    title: "Manteau Tailleur Cachemire Épais",
    image: "/images/hero-img/look-04.webp",
    href: "#shop",
  },
  {
    title: "Ensemble Structuré Noir & Bijouterie Métal",
    image: "/images/hero-img/look-05.webp",
    href: "#shop",
  },
  {
    title: "Redingote Moderne Minimaliste",
    image: "/images/hero-img/look-06.webp",
    href: "#shop",
  },
  {
    title: "Pardessus Laine 140s Coupe Sartoriale",
    image: "/images/hero-img/look-07.webp",
    href: "#shop",
  },
  {
    title: "Costume Monochrome Sable Chaud",
    image: "/images/hero-img/look-08.webp",
    href: "#shop",
  },
  {
    title: "Blazer Déstructuré Lin & Soie",
    image: "/images/hero-img/look-09.webp",
    href: "#shop",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onNavigate,
}) => {
  const { cartCount, openCart } = useCart();

  return (
    <section className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#F7F5F0] select-none text-[#1A1918]">
      {/* Subtle luxury ambient backlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 25%, rgba(232, 226, 214, 0.75), transparent 70%)",
        }}
      />

      {/* 1. Haute Couture Balanced Navbar (2 links - Center Brand - 2 links + Cart) */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full grid grid-cols-3 items-center px-6 sm:px-10 lg:px-14 pt-6 md:pt-8 z-30 pointer-events-auto"
      >
        {/* Left Nav items (2 items) */}
        <div className="flex items-center gap-6 sm:gap-8 justify-start">
          <button
            type="button"
            onClick={() => onNavigate("shop")}
            className="text-[#1A1918] font-sans-clean font-medium uppercase tracking-[0.18em] text-[12px] sm:text-[13px] transition-opacity duration-200 hover:opacity-60 cursor-pointer bg-transparent border-0 p-0"
          >
            Vestiaire
          </button>
          <button
            type="button"
            onClick={() => onNavigate("projects")}
            className="text-[#1A1918] font-sans-clean font-medium uppercase tracking-[0.18em] text-[12px] sm:text-[13px] transition-opacity duration-200 hover:opacity-60 cursor-pointer bg-transparent border-0 p-0"
          >
            Capsules
          </button>
        </div>

        {/* Center Brand Monogram */}
        <div className="text-center justify-self-center pointer-events-auto">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group cursor-pointer inline-flex flex-col items-center border-0 bg-transparent"
          >
            <span className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.2em] text-[#141413] group-hover:opacity-80 transition-opacity whitespace-nowrap">
              GENTLEMAN CLUB
            </span>
            <span className="text-[9px] font-sans-clean uppercase tracking-[0.32em] text-[#8C867C] -mt-0.5">
              Atelier Sartorial
            </span>
          </button>
        </div>

        {/* Right Nav items (2 items + Bag) */}
        <div className="flex items-center gap-5 sm:gap-7 justify-end">
          <button
            type="button"
            onClick={() => onNavigate("services")}
            className="hidden sm:inline-block text-[#1A1918] font-sans-clean font-medium uppercase tracking-[0.18em] text-[12px] sm:text-[13px] transition-opacity duration-200 hover:opacity-60 cursor-pointer bg-transparent border-0 p-0"
          >
            Savoir-Faire
          </button>
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="hidden sm:inline-block text-[#1A1918] font-sans-clean font-medium uppercase tracking-[0.18em] text-[12px] sm:text-[13px] transition-opacity duration-200 hover:opacity-60 cursor-pointer bg-transparent border-0 p-0"
          >
            L'Atelier
          </button>

          <button
            type="button"
            onClick={openCart}
            className="chrome-badge flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[#1A1918] font-sans-clean font-medium uppercase tracking-wider text-xs transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#141413]" />
            <span className="text-[11px] tracking-wider hidden sm:inline">
              Panier
            </span>
            <span className="w-4 h-4 rounded-full bg-[#141413] text-[#FAF9F5] text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </motion.nav>

      {/* 2. Central 3D Interactive WorksWheel (Vertical Drum Mode) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-14 pb-14">
        <WorksWheel
          items={HERO_WHEEL_ITEMS}
          label="GENTLEMAN CLUB"
          action="Explorer"
          className="w-full h-full bg-transparent"
        />
      </div>

      {/* 3. Bottom Editorial Bar */}
      <div className="w-full flex justify-between items-end pb-6 sm:pb-8 px-6 sm:px-10 lg:px-14 z-20 pointer-events-auto">
        {/* Left spacing for WorksWheel title and chevrons */}
        <div className="w-32 hidden md:block" />

        {/* Center Scroll Hint */}
        <motion.button
          type="button"
          onClick={() => onNavigate("shop")}
          whileHover={{ y: 2 }}
          className="flex flex-col items-center gap-1.5 text-[#8C867C] hover:text-[#141413] transition-colors cursor-pointer group mx-auto md:mx-0"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em]">
            Découvrir le Vestiaire
          </span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </motion.button>

        {/* Right CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <ContactButton
            onClick={() => onNavigate("shop")}
            label="Commander la Pièce"
          />
        </motion.div>
      </div>
    </section>
  );
};
