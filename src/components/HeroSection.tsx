import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowDown } from "lucide-react";
import { ContactButton } from "./ContactButton.tsx";
import { WorksWheel, WorksWheelItem } from "./ui/works-wheel.tsx";
import { useCart } from "../context/CartContext.tsx";
import { ProductItem } from "./ShopSection.tsx";

interface HeroSectionProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
  onQuickView?: (product: ProductItem) => void;
}

const HERO_WHEEL_ITEMS: WorksWheelItem[] = [
  {
    title: "Costume Trois-Pièces Sartorial",
    image: "/images/hero-img/look-01.webp",
    href: "#shop",
  },
  {
    title: "Costume Prince de Galles",
    image: "/images/hero-img/look-02.webp",
    href: "#shop",
  },
  {
    title: "Costume Croisé Gris Anthracite",
    image: "/images/hero-img/look-03.webp",
    href: "#shop",
  },
  {
    title: "Manteau Tailleur Cachemire Épais",
    image: "/images/hero-img/look-04.webp",
    href: "#shop",
  },
  {
    title: "Ensemble Sartorial Sur Mesure",
    image: "/images/hero-img/look-05.webp",
    href: "#shop",
  },
  {
    title: "Pardessus Laine Brun Tabac",
    image: "/images/hero-img/look-06.webp",
    href: "#shop",
  },
  {
    title: "Blazer Croisé Brun Chocolat",
    image: "/images/hero-img/look-07.webp",
    href: "#shop",
  },
  {
    title: "Costume Rayé Bleu Nuit",
    image: "/images/hero-img/look-08.webp",
    href: "#shop",
  },
  {
    title: "Veste Sartoriale Vert Forêt",
    image: "/images/hero-img/look-09.webp",
    href: "#shop",
  },
];

export const HERO_PRODUCTS: ProductItem[] = [
  {
    id: "hero-look-01",
    name: "Costume Trois-Pièces Sartorial",
    category: "OUTERWEAR",
    price: 650,
    image: "/images/hero-img/look-01.webp",
    tag: "SÉRIE LIMITÉE • ATELIER",
    sizes: ["46", "48", "50", "52", "54"],
    description:
      "Ensemble trois-pièces d'apparat comprenant veste à revers cranté, gilet croisé et pantalon à pinces. Façonné dans un drap de laine vierge 140s italienne.",
    details: [
      "Construction semi-entoilée traditionnelle avec plastron crin de cheval",
      "Gilet croisé assorti à boutons chromés polis miroir",
      "Boutonnières milanaises cousues main au fil de soie",
      "Doublure respirante en cupro lustré",
    ],
    specs: {
      material: "100% Laine Vierge 140s Superfine",
      weight: "340 GSM 4 Saisons",
      fit: "Coupe Sartoriale Structurée",
      origin: "Atelier Paris & Filature Biella",
    },
  },
  {
    id: "hero-look-02",
    name: "Costume Prince de Galles",
    category: "OUTERWEAR",
    price: 590,
    image: "/images/hero-img/look-02.webp",
    tag: "MOTIF HISTORIQUE",
    sizes: ["46", "48", "50", "52"],
    description:
      "Costume d'inspiration savile row revisité au motif Prince de Galles subtil. Épaules légèrement structurées et revers généreux façonnés à la vapeur.",
    details: [
      "Tissage exclusif Prince de Galles en laine peignée",
      "Fermoirs étriers et agrafes en métal argenté",
      "Poches à rabat passepoilées et ticket pocket intérieure",
      "Fente d'aisance centrale",
    ],
    specs: {
      material: "Laine Peignée & Soie",
      weight: "320 GSM",
      fit: "Coupe Tailleur Ajustée",
      origin: "Tissé en Angleterre, Confection Paris",
    },
  },
  {
    id: "hero-look-03",
    name: "Costume Croisé Gris Anthracite",
    category: "OUTERWEAR",
    price: 560,
    image: "/images/hero-img/look-03.webp",
    tag: "ARCHIVE 03",
    sizes: ["46", "48", "50", "52", "54"],
    description:
      "Veste croisée six boutons en flanelle de laine anthracite profonde. Équilibre parfait entre autorité classique et modernité graphique.",
    details: [
      "Flanelle de laine cardée au toucher doux et feutré",
      "Boutons métalliques brossés au fini palladium",
      "Revers en pointe imposants et équilibrés",
      "Double fente dorsale tailleur",
    ],
    specs: {
      material: "100% Flanelle de Laine Vierge",
      weight: "360 GSM Hiver",
      fit: "Coupe Croisée Masculine",
      origin: "Filature Piémontaise",
    },
  },
  {
    id: "hero-look-04",
    name: "Manteau Tailleur Cachemire Épais",
    category: "OUTERWEAR",
    price: 690,
    image: "/images/hero-img/look-04.webp",
    tag: "PIÈCE MAÎTRESSE",
    sizes: ["46", "48", "50", "52"],
    description:
      "Pardessus droit d'une douceur absolue alliant laine vierge et cachemire noble. Tombé sculptural conçu pour être porté confortablement sur costume.",
    details: [
      "Drap lourd 90% laine vierge, 10% pur cachemire de Mongolie",
      "Sous-col en feutre de laine brodé",
      "Poches réchauffe-mains passepoilées",
      "Fermeture trois boutons en corne véritable et anneau chrome",
    ],
    specs: {
      material: "Laine Vierge & Cachemire Mongole",
      weight: "560 GSM Drap Manteau",
      fit: "Coupe Droite Ample Élégante",
      origin: "Atelier Parisien",
    },
  },
  {
    id: "hero-look-05",
    name: "Ensemble Sartorial Sur Mesure",
    category: "OUTERWEAR",
    price: 720,
    image: "/images/hero-img/look-05.webp",
    tag: "CONFIDENTIEL • ÉDITION 18 PCS",
    sizes: ["46", "48", "50", "52"],
    description:
      "Silhouette signature de la maison : costume contemporain aux finitions sellier et détails de bijouterie chrome poli montés sur mesure.",
    details: [
      "Laine 140s double retors traitée déperlante naturelle",
      "Agrafes de fermeture et boucles de serrage en chrome usiné",
      "Montage entièrement artisanal avec plus de 45 heures de travail",
      "Certificat nominatif numéroté gravé au laser",
    ],
    specs: {
      material: "Super 140s Double Retors",
      weight: "310 GSM Tout Climat",
      fit: "Coupe Sculpturale Fendue",
      origin: "Haute Confection Paris",
    },
  },
  {
    id: "hero-look-06",
    name: "Pardessus Laine Brun Tabac",
    category: "OUTERWEAR",
    price: 580,
    image: "/images/hero-img/look-06.webp",
    tag: "NUANCE TABAC EXCLUSIVE",
    sizes: ["48", "50", "52", "54"],
    description:
      "Pardessus d'hiver en drap de laine dense teinte tabac chaud. Revers généreux et surpiqûres sellier ton sur ton le long des parementures.",
    details: [
      "Laine vierge teinte en fil exclusif brun tabac",
      "Doublure satinée cupro champagne",
      "Martingale dorsale amovible à boucles argentées",
      "Poche poitrine gansée",
    ],
    specs: {
      material: "100% Laine Dense de Biella",
      weight: "480 GSM",
      fit: "Coupe Droite Mi-Longue",
      origin: "Confection Traditionnelle",
    },
  },
  {
    id: "hero-look-07",
    name: "Blazer Croisé Brun Chocolat",
    category: "OUTERWEAR",
    price: 460,
    image: "/images/hero-img/look-07.webp",
    tag: "SERGE DE LAINE",
    sizes: ["46", "48", "50", "52"],
    description:
      "Blazer déstructuré aux épaules naturelles napolitaines. Drapé fluide et boutons métalliques siglés Gentleman Club.",
    details: [
      "Serge de laine fine 130s au tombé souple",
      "Épaule spalla camicia sans rembourrage rigide",
      "Poches plaquées biseautées esprit tailleur italien",
      "Boutons bombés gravés au laser",
    ],
    specs: {
      material: "Serge de Laine 130s",
      weight: "290 GSM",
      fit: "Coupe Italienne Souple",
      origin: "Naples & Paris",
    },
  },
  {
    id: "hero-look-08",
    name: "Costume Rayé Bleu Nuit",
    category: "OUTERWEAR",
    price: 620,
    image: "/images/hero-img/look-08.webp",
    tag: "RAYURE BANQUIER DISCRÈTE",
    sizes: ["46", "48", "50", "52", "54"],
    description:
      "Costume deux pièces en laine peignée bleu nuit à fines rayures craie. L'incarnation du raffinement sartorial classique et contemporain.",
    details: [
      "Laine peignée superfine 150s d'une finesse incomparable",
      "Rayure craie filigranée tissée ton sur ton",
      "Revers tailleur roulé à la vapeur",
      "Pantalon taille haute avec pattes de serrage",
    ],
    specs: {
      material: "100% Laine Super 150s",
      weight: "270 GSM Léger & Soyeux",
      fit: "Coupe Ajustée Élégante",
      origin: "Filature Italienne",
    },
  },
  {
    id: "hero-look-09",
    name: "Veste Sartoriale Vert Forêt",
    category: "OUTERWEAR",
    price: 480,
    image: "/images/hero-img/look-09.webp",
    tag: "COLORIS ATELIER",
    sizes: ["46", "48", "50", "52"],
    description:
      "Veste de costume contemporaine dans un vert forêt profond et mystérieux. Détails métalliques chrome poli pour un contraste spectaculaire.",
    details: [
      "Twill de laine peignée vert impérial",
      "Boutonnières cousues main en fil de soie vert émeraude",
      "Boutons en acier chromé brossé",
      "Doublure jacquard noire et verte",
    ],
    specs: {
      material: "Twill de Laine Vierge",
      weight: "330 GSM",
      fit: "Coupe Structurée Découpée",
      origin: "Atelier Paris",
    },
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onNavigate,
  onQuickView,
}) => {
  const { cartCount, openCart } = useCart();
  const [activeLookIndex, setActiveLookIndex] = useState(4); // Commence sur Look 5 au centre
  const activeLookIndexRef = useRef(4);

  const handleActiveLookChange = useCallback((index: number) => {
    activeLookIndexRef.current = index;
    setActiveLookIndex(index);
  }, []);

  const handleOrderPiece = () => {
    const currentIndex = activeLookIndexRef.current;
    const currentProduct = HERO_PRODUCTS[currentIndex] || HERO_PRODUCTS[0];
    if (onQuickView) {
      onQuickView(currentProduct);
    }
  };

  return (
    <section className="relative w-full h-screen min-h-160 flex flex-col justify-between overflow-hidden bg-background text-[#1A1918]">
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
            <span className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.2em] text-obsidian group-hover:opacity-80 transition-opacity whitespace-nowrap">
              GENTLEMAN CLUB
            </span>
            <span className="text-[9px] font-sans-clean uppercase tracking-[0.32em] text-taupe -mt-0.5">
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
            onClick={onContactClick}
            className="hidden sm:inline-block text-[#1A1918] font-sans-clean font-medium uppercase tracking-[0.18em] text-[12px] sm:text-[13px] transition-opacity duration-200 hover:opacity-60 cursor-pointer bg-transparent border-0 p-0"
          >
            Contact
          </button>

          <button
            type="button"
            onClick={openCart}
            className="chrome-badge flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[#1A1918] font-sans-clean font-medium uppercase tracking-wider text-xs transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-obsidian" />
            <span className="text-[11px] tracking-wider hidden sm:inline">
              Panier
            </span>
            <span className="w-4 h-4 rounded-full bg-obsidian text-alabaster text-[10px] font-bold flex items-center justify-center">
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
          action="Commander"
          onActiveChange={handleActiveLookChange}
          onCardClick={(index) => {
            const product = HERO_PRODUCTS[index] || HERO_PRODUCTS[0];
            if (onQuickView) onQuickView(product);
          }}
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
          className="flex flex-col items-center gap-1.5 text-taupe hover:text-obsidian transition-colors cursor-pointer group mx-auto md:mx-0"
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
            onClick={handleOrderPiece}
            label="Commander la Pièce"
          />
        </motion.div>
      </div>
    </section>
  );
};
