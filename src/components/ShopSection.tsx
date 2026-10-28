import React, { useState, useMemo } from "react";
import { Sparkles, Filter, ShoppingBag } from "lucide-react";
import { HaloReel, type HaloReelItem } from "./ui/halo-reel.tsx";

export interface ProductItem {
  id: string;
  name: string;
  category:
    | "OUTERWEAR"
    | "HOODIES & TEES"
    | "CARGOS & PANTS"
    | "GEAR & FOOTWEAR";
  price: number;
  image: string;
  hoverImage?: string;
  tag: string;
  sizes: string[];
  description: string;
  details: string[];
  specs: {
    material: string;
    weight: string;
    fit: string;
    origin: string;
  };
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "metallic-overdrive-puffer",
    name: "Manteau Sartorial Chrome & Laine 140s",
    category: "OUTERWEAR",
    price: 480,
    image: "/images/editorial-02.webp",
    hoverImage: "/images/hero-img/look-06.webp",
    tag: "SÉRIE LIMITÉE • 24 PCS",
    sizes: ["46", "48", "50", "52"],
    description:
      "Pardessus d'hiver d'une élégance souveraine, taillé dans une laine vierge d'exception. Boutons de manchette et fermoirs usinés en chrome miroir.",
    details: [
      "Laine froide 140s peignée avec doublure en cupro soyeux",
      "Boutons et agrafes de col en chrome miroir satiné",
      "Revers tailleur cranté et fente d'aisance dorsale",
      "Poches passepoilées intérieures pour montre et stylo",
    ],
    specs: {
      material: "Laine Vierge 140s & Cupro",
      weight: "520 GSM Tissu Manteau",
      fit: "Coupe Tailleur Droite Structurée",
      origin: "Façonné à l'Atelier Parisien",
    },
  },
  {
    id: "heavyweight-hoodie",
    name: "Veste Croisée Gréige & Revers Satin",
    category: "OUTERWEAR",
    price: 395,
    image: "/images/hero-img/look-04.webp",
    hoverImage: "/images/hero-img/look-07.webp",
    tag: "PIÈCE MAÎTRESSE",
    sizes: ["46", "48", "50", "52"],
    description:
      "Veste de costume croisée six boutons en twill de laine beige et soie. Ligne d'épaule nette et tombé majestueux pour les grandes occasions.",
    details: [
      "Mélange exclusif 70% laine d'agneau, 30% soie naturelle",
      "Boutons gravés au laser finition chrome brossé",
      "Construction semi-entoilée traditionnelle",
      "Double fente d'aisance à l'arrière",
    ],
    specs: {
      material: "Laine d'Agneau & Soie",
      weight: "380 GSM Drap de Costume",
      fit: "Coupe Sartoriale Ajustée",
      origin: "Filature Biella, Italie",
    },
  },
  {
    id: "cyber-tactical-trench",
    name: "Trench Structuré Noir & Boucles Argent",
    category: "OUTERWEAR",
    price: 540,
    image: "/images/hero-img/look-08.webp",
    hoverImage: "/images/hero-img/look-02.webp",
    tag: "ÉDITION NUMÉROTÉE",
    sizes: ["48", "50", "52"],
    description:
      "Interprétation contemporaine du trench d'apparat. Gabardine imperméable haute densité et quincaillerie bijouterie argentée.",
    details: [
      "Gabardine de coton imperméabilisée tissée serrée",
      "Ceinture à boucle étrier chromée polie à la main",
      "Bavolet tempête doublé et pattes d'épaules tailleur",
      "Fermeture croisée à double boutonnage",
    ],
    specs: {
      material: "Gabardine Coton Haute Densité",
      weight: "440 GSM Imperméable",
      fit: "Longueur Mi-Mollet Évasée",
      origin: "Montage Artisanal",
    },
  },
  {
    id: "modular-nylon-cargos",
    name: "Pantalon Tailleur à Pinces Sable Chaud",
    category: "CARGOS & PANTS",
    price: 260,
    image: "/images/editorial-01.webp",
    hoverImage: "/images/hero-img/look-07.webp",
    tag: "INTEMPOREL",
    sizes: ["40", "42", "44", "46"],
    description:
      "Pantalon habillé à double pli inversé, confectionné dans une serge gréige souple. Pattes de serrage latérales en métal poli.",
    details: [
      "Serge de laine infroissable et lin d'été",
      "Pattes de serrage latérales en métal chromé (sans ceinture)",
      "Revers de bas de pantalon de 4,5 cm",
      "Ceinture intérieure gansée à bande anti-glisse",
    ],
    specs: {
      material: "Serge de Laine & Lin",
      weight: "290 GSM Souple",
      fit: "Taille Haute & Jambe Fuselée",
      origin: "Confection Atelier",
    },
  },
  {
    id: "heavy-archive-tee",
    name: "Chemise Col Officier & Soie Albâtre",
    category: "HOODIES & TEES",
    price: 195,
    image: "/images/hero-img/look-03.webp",
    hoverImage: "/images/hero-img/look-06.webp",
    tag: "ESSENTIEL",
    sizes: ["38", "39", "40", "41", "42"],
    description:
      "Chemise d'apparat en popeline de coton double retors et crêpe de soie blanche. Boutons de manchettes dissimulés sous patte.",
    details: [
      "Popeline double retors 120/2 et crêpe de soie",
      "Gorge cachée avec bouton supérieur bijou en métal poli",
      "Poignets mousquetaires pour boutons de manchette",
      "Hirondelles de renfort brodées aux hanches",
    ],
    specs: {
      material: "100% Coton d'Égypte Double Retors",
      weight: "140 GSM Aérien",
      fit: "Coupe Tailleur Près du Corps",
      origin: "Atelier de Chemiserie",
    },
  },
  {
    id: "tech-runner-sneakers",
    name: "Souliers Derby Finition Cuir Miroir",
    category: "GEAR & FOOTWEAR",
    price: 490,
    image: "/images/hero-img/look-05.webp",
    hoverImage: "/images/editorial-02.webp",
    tag: "FAIT MAIN",
    sizes: ["41", "42", "43", "44", "45"],
    description:
      "Derbies modernes en veau glacé noir profond avec insertion d'une trépointe métallique brossée. Montage Goodyear.",
    details: [
      "Cuir de veau box pleine fleur tanné végétal",
      "Semelle cuir avec insert chrome protecteur sous cambrure",
      "Montage Goodyear ressemelable à vie",
      "Cirage et glaçage miroir réalisés à la main",
    ],
    specs: {
      material: "Cuir Pleine Fleur Glaçage Miroir",
      weight: "Semelle Cuir Épais",
      fit: "Forme Anglaise Amortie",
      origin: "Northamptonshire, Royaume-Uni",
    },
  },
  {
    id: "balaclava-chest-rig",
    name: "Gilet de Costume Tailleur & Bijoux Chrome",
    category: "GEAR & FOOTWEAR",
    price: 240,
    image: "/images/hero-img/look-02.webp",
    hoverImage: "/images/hero-img/look-04.webp",
    tag: "SUR-MESURE",
    sizes: ["46", "48", "50", "52"],
    description:
      "Gilet sans manches tailleur réversible, dos en satin albâtre et martingale réglable en boucle chromée.",
    details: [
      "Drap de laine superfine et satin de soie au dos",
      "Martingale avec boucle double chrome satiné",
      "Quatre poches passepoilées sur le devant",
      "Boutons bombés en métal poli",
    ],
    specs: {
      material: "Laine Superfine & Soie Albâtre",
      weight: "260 GSM Étoffé",
      fit: "Ajusté au Buste",
      origin: "Atelier de Tailleur",
    },
  },
  {
    id: "reflective-cyber-hoodie",
    name: "Pull Col Roulé Cachemire & Soie Crème",
    category: "HOODIES & TEES",
    price: 320,
    image: "/images/hero-img/look-06.webp",
    hoverImage: "/images/editorial-02.webp",
    tag: "DOUCEUR ULTIME",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Maille d'une douceur incomparable tricotée en jauge fine. Idéale sous une veste de costume ou portée seule avec un pantalon à pinces.",
    details: [
      "70% cachemire de Mongolie, 30% soie de mûrier",
      "Col roulé montant sans couture gênante",
      "Bord-côtes élastiqués aux poignets et à la taille",
      "Écusson miniature discret en métal chromé cousu main",
    ],
    specs: {
      material: "Cachemire 2 Fils & Soie",
      weight: "Jauge 18 Fine",
      fit: "Élégant & Fluide",
      origin: "Filé en Écosse",
    },
  },
];

interface ShopSectionProps {
  onQuickView: (product: ProductItem) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("TOUT");

  const categories = [
    { label: "Tout le Vestiaire", value: "TOUT" },
    { label: "Manteaux & Vestes", value: "OUTERWEAR" },
    { label: "Costumes & Pantalons", value: "CARGOS & PANTS" },
    { label: "Chemises & Mailles", value: "HOODIES & TEES" },
    { label: "Souliers & Finitions", value: "GEAR & FOOTWEAR" },
  ];

  const filteredProducts =
    selectedCategory === "TOUT"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const haloItems: HaloReelItem[] = useMemo(() => {
    return filteredProducts.map((product) => ({
      src: product.image,
      alt: product.name,
      title: product.name,
      subtitle: `${product.category} • ${product.price} €`,
      price: product.price,
      tag: product.tag,
      onClick: () => onQuickView(product),
    }));
  }, [filteredProducts, onQuickView]);

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="shop"
      className="relative w-full bg-[#F7F5F0] pt-16 sm:pt-24 pb-12 sm:pb-16 border-t border-[#EAE5D9] overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full px-6 sm:px-10 text-center max-w-4xl mx-auto mb-6 sm:mb-8">
        <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] text-[#5A554E] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-taupe" />
          <span>Vestiaire Sartorial • Édition Hiver 2026</span>
        </div>
        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal leading-tight tracking-tight text-obsidian">
          Le Vestiaire d'Exception
        </h2>
        <p className="text-xs sm:text-sm text-[#6B655C] max-w-xl mx-auto font-sans-clean leading-relaxed mt-2.5">
          Coupes d'atelier pensées pour sublimer le costume contemporain. Laines
          froides 140s, soies pures et finitions tailleur architecturales.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto w-full px-4 pb-2 mb-4 sm:mb-6 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-taupe shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => {
              setSelectedCategory(cat.value);
              setActiveIdx(0);
            }}
            className={`px-4 py-2 rounded-full text-xs font-sans-clean font-medium uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
              selectedCategory === cat.value
                ? "bg-obsidian text-alabaster shadow-md scale-[1.02]"
                : "bg-white/80 text-[#5A554E] hover:text-obsidian hover:bg-white border border-[#E2DDD2]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* HaloReel 3D Pleine Largeur (Bord à Bord) et Très Grand Format */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle luxury ambient halo backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(255, 255, 255, 0.95), transparent 75%)",
          }}
        />

        <HaloReel
          items={haloItems}
          aria-label="Le Vestiaire d'Exception"
          onActiveItemChange={(_, idx) => setActiveIdx(idx)}
          centerLabel={(activeItem) => {
            const currentItem = activeItem || haloItems[activeIdx % haloItems.length] || haloItems[0];
            return (
              <div className="flex flex-col items-center justify-center text-center max-w-sm sm:max-w-md">
                <span className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-obsidian uppercase">
                  Atelier
                </span>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.38em] text-taupe mt-2">
                  Haute Confection
                </span>

                {/* Nom et prix du produit au milieu */}
                {currentItem?.title && (
                  <div className="mt-3.5 px-4 py-1 rounded-full bg-white/70 backdrop-blur-xs border border-[#D5CFBE] text-obsidian shadow-2xs">
                    <span className="font-serif-luxury text-xs sm:text-sm font-medium">
                      {currentItem.title}
                    </span>
                    {currentItem.price !== undefined && (
                      <span className="ml-2 font-mono text-xs text-[#7A746B] font-semibold">
                        • {currentItem.price} €
                      </span>
                    )}
                  </div>
                )}

                <span className="text-xs text-[#7A746B] font-sans-clean mt-3 max-w-xs leading-relaxed">
                  Glissez pour faire pivoter la roue • Cliquez sur une pièce pour
                  essayer
                </span>

                {/* Bouton Commander pour la carte au milieu / premier plan */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (currentItem?.onClick) {
                      currentItem.onClick();
                    } else {
                      const prod = filteredProducts[activeIdx % filteredProducts.length] || filteredProducts[0];
                      if (prod) onQuickView(prod);
                    }
                  }}
                  className="mt-6 px-8 py-3.5 rounded-full bg-obsidian text-alabaster font-sans-clean text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#2A2826] hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-xl flex items-center gap-2.5 cursor-pointer border border-[#1A1918]"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-alabaster" />
                  <span>Commander</span>
                </button>
              </div>
            );
          }}
          cardWidth={260}
          cardHeight={370}
          minScale={0.34}
          radiusXRatio={0.46}
          radiusYRatio={0.28}
          spread={1.15}
          centerXRatio={0}
          holdDuration={1600}
          stepDuration={700}
          autoPlay={true}
          draggable={true}
          className="h-187.5 sm:h-210 md:h-225 lg:h-235 w-full bg-transparent"
        />
      </div>
    </section>
  );
};
