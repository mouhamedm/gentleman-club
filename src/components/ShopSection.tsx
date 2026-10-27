import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Check, Sparkles, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

export interface ProductItem {
  id: string;
  name: string;
  category: 'OUTERWEAR' | 'HOODIES & TEES' | 'CARGOS & PANTS' | 'GEAR & FOOTWEAR';
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
    id: 'metallic-overdrive-puffer',
    name: 'Manteau Sartorial Chrome & Laine 140s',
    category: 'OUTERWEAR',
    price: 480,
    image: '/images/editorial-02.webp',
    hoverImage: '/images/hero-img/look-06.webp',
    tag: 'SÉRIE LIMITÉE • 24 PCS',
    sizes: ['46', '48', '50', '52'],
    description: 'Pardessus d\'hiver d\'une élégance souveraine, taillé dans une laine vierge d\'exception. Boutons de manchette et fermoirs usinés en chrome miroir.',
    details: [
      'Laine froide 140s peignée avec doublure en cupro soyeux',
      'Boutons et agrafes de col en chrome miroir satiné',
      'Revers tailleur cranté et fente d\'aisance dorsale',
      'Poches passepoilées intérieures pour montre et stylo',
    ],
    specs: {
      material: 'Laine Vierge 140s & Cupro',
      weight: '520 GSM Tissu Manteau',
      fit: 'Coupe Tailleur Droite Structurée',
      origin: 'Façonné à l\'Atelier Parisien',
    },
  },
  {
    id: 'heavyweight-hoodie',
    name: 'Veste Croisée Gréige & Revers Satin',
    category: 'OUTERWEAR',
    price: 395,
    image: '/images/hero-img/look-04.webp',
    hoverImage: '/images/hero-img/look-07.webp',
    tag: 'PIÈCE MAÎTRESSE',
    sizes: ['46', '48', '50', '52'],
    description: 'Veste de costume croisée six boutons en twill de laine beige et soie. Ligne d\'épaule nette et tombé majestueux pour les grandes occasions.',
    details: [
      'Mélange exclusif 70% laine d\'agneau, 30% soie naturelle',
      'Boutons gravés au laser finition chrome brossé',
      'Construction semi-entoilée traditionnelle',
      'Double fente d\'aisance à l\'arrière',
    ],
    specs: {
      material: 'Laine d\'Agneau & Soie',
      weight: '380 GSM Drap de Costume',
      fit: 'Coupe Sartoriale Ajustée',
      origin: 'Filature Biella, Italie',
    },
  },
  {
    id: 'cyber-tactical-trench',
    name: 'Trench Structuré Noir & Boucles Argent',
    category: 'OUTERWEAR',
    price: 540,
    image: '/images/hero-img/look-08.webp',
    hoverImage: '/images/hero-img/look-02.webp',
    tag: 'ÉDITION NUMÉROTÉE',
    sizes: ['48', '50', '52'],
    description: 'Interprétation contemporaine du trench d\'apparat. Gabardine imperméable haute densité et quincaillerie bijouterie argentée.',
    details: [
      'Gabardine de coton imperméabilisée tissée serrée',
      'Ceinture à boucle étrier chromée polie à la main',
      'Bavolet tempête doublé et pattes d\'épaules tailleur',
      'Fermeture croisée à double boutonnage',
    ],
    specs: {
      material: 'Gabardine Coton Haute Densité',
      weight: '440 GSM Imperméable',
      fit: 'Longueur Mi-Mollet Évasée',
      origin: 'Montage Artisanal',
    },
  },
  {
    id: 'modular-nylon-cargos',
    name: 'Pantalon Tailleur à Pinces Sable Chaud',
    category: 'CARGOS & PANTS',
    price: 260,
    image: '/images/editorial-01.webp',
    hoverImage: '/images/hero-img/look-07.webp',
    tag: 'INTEMPOREL',
    sizes: ['40', '42', '44', '46'],
    description: 'Pantalon habillé à double pli inversé, confectionné dans une serge gréige souple. Pattes de serrage latérales en métal poli.',
    details: [
      'Serge de laine infroissable et lin d\'été',
      'Pattes de serrage latérales en métal chromé (sans ceinture)',
      'Revers de bas de pantalon de 4,5 cm',
      'Ceinture intérieure gansée à bande anti-glisse',
    ],
    specs: {
      material: 'Serge de Laine & Lin',
      weight: '290 GSM Souple',
      fit: 'Taille Haute & Jambe Fuselée',
      origin: 'Confection Atelier',
    },
  },
  {
    id: 'heavy-archive-tee',
    name: 'Chemise Col Officier & Soie Albâtre',
    category: 'HOODIES & TEES',
    price: 195,
    image: '/images/hero-img/look-03.webp',
    hoverImage: '/images/hero-img/look-06.webp',
    tag: 'ESSENTIEL',
    sizes: ['38', '39', '40', '41', '42'],
    description: 'Chemise d\'apparat en popeline de coton double retors et crêpe de soie blanche. Boutons de manchettes dissimulés sous patte.',
    details: [
      'Popeline double retors 120/2 et crêpe de soie',
      'Gorge cachée avec bouton supérieur bijou en métal poli',
      'Poignets mousquetaires pour boutons de manchette',
      'Hirondelles de renfort brodées aux hanches',
    ],
    specs: {
      material: '100% Coton d\'Égypte Double Retors',
      weight: '140 GSM Aérien',
      fit: 'Coupe Tailleur Près du Corps',
      origin: 'Atelier de Chemiserie',
    },
  },
  {
    id: 'tech-runner-sneakers',
    name: 'Souliers Derby Finition Cuir Miroir',
    category: 'GEAR & FOOTWEAR',
    price: 490,
    image: '/images/hero-img/look-05.webp',
    hoverImage: '/images/editorial-02.webp',
    tag: 'FAIT MAIN',
    sizes: ['41', '42', '43', '44', '45'],
    description: 'Derbies modernes en veau glacé noir profond avec insertion d\'une trépointe métallique brossée. Montage Goodyear.',
    details: [
      'Cuir de veau box pleine fleur tanné végétal',
      'Semelle cuir avec insert chrome protecteur sous cambrure',
      'Montage Goodyear ressemelable à vie',
      'Cirage et glaçage miroir réalisés à la main',
    ],
    specs: {
      material: 'Cuir Pleine Fleur Glaçage Miroir',
      weight: 'Semelle Cuir Épais',
      fit: 'Forme Anglaise Amortie',
      origin: 'Northamptonshire, Royaume-Uni',
    },
  },
  {
    id: 'balaclava-chest-rig',
    name: 'Gilet de Costume Tailleur & Bijoux Chrome',
    category: 'GEAR & FOOTWEAR',
    price: 240,
    image: '/images/hero-img/look-02.webp',
    hoverImage: '/images/hero-img/look-04.webp',
    tag: 'SUR-MESURE',
    sizes: ['46', '48', '50', '52'],
    description: 'Gilet sans manches tailleur réversible, dos en satin albâtre et martingale réglable en boucle chromée.',
    details: [
      'Drap de laine superfine et satin de soie au dos',
      'Martingale avec boucle double chrome satiné',
      'Quatre poches passepoilées sur le devant',
      'Boutons bombés en métal poli',
    ],
    specs: {
      material: 'Laine Superfine & Soie Albâtre',
      weight: '260 GSM Étoffé',
      fit: 'Ajusté au Buste',
      origin: 'Atelier de Tailleur',
    },
  },
  {
    id: 'reflective-cyber-hoodie',
    name: 'Pull Col Roulé Cachemire & Soie Crème',
    category: 'HOODIES & TEES',
    price: 320,
    image: '/images/hero-img/look-06.webp',
    hoverImage: '/images/editorial-02.webp',
    tag: 'DOUCEUR ULTIME',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Maille d\'une douceur incomparable tricotée en jauge fine. Idéale sous une veste de costume ou portée seule avec un pantalon à pinces.',
    details: [
      '70% cachemire de Mongolie, 30% soie de mûrier',
      'Col roulé montant sans couture gênante',
      'Bord-côtes élastiqués aux poignets et à la taille',
      'Écusson miniature discret en métal chromé cousu main',
    ],
    specs: {
      material: 'Cachemire 2 Fils & Soie',
      weight: 'Jauge 18 Fine',
      fit: 'Élégant & Fluide',
      origin: 'Filé en Écosse',
    },
  },
];

interface ShopSectionProps {
  onQuickView: (product: ProductItem) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ onQuickView }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('TOUT');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'metallic-overdrive-puffer': '48',
    'heavyweight-hoodie': '48',
    'cyber-tactical-trench': '50',
    'modular-nylon-cargos': '42',
    'heavy-archive-tee': '40',
    'tech-runner-sneakers': '43',
    'balaclava-chest-rig': '48',
    'reflective-cyber-hoodie': 'M',
  });
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = [
    { label: 'Tout le Vestiaire', value: 'TOUT' },
    { label: 'Manteaux & Vestes', value: 'OUTERWEAR' },
    { label: 'Costumes & Pantalons', value: 'CARGOS & PANTS' },
    { label: 'Chemises & Mailles', value: 'HOODIES & TEES' },
    { label: 'Souliers & Finitions', value: 'GEAR & FOOTWEAR' },
  ];

  const filteredProducts =
    selectedCategory === 'TOUT'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
    });
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <section id="shop" className="relative w-full bg-[#F7F5F0] py-24 sm:py-32 px-5 sm:px-8 md:px-14 select-none border-t border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] text-[#5A554E] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-taupe" />
              <span>Vestiaire Sartorial • Édition Hiver 2026</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal leading-none tracking-tight text-obsidian">
              Le Vestiaire d'Exception
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#6B655C] max-w-md font-sans-clean leading-relaxed">
            Coupes d'atelier pensées pour sublimer le costume contemporain. Laines froides 140s, soies pures et fermoirs usinés en chrome miroir.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <Filter className="w-4 h-4 text-taupe shrink-0 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-xs font-sans-clean font-medium uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-obsidian text-alabaster shadow-md scale-[1.02]'
                  : 'bg-white/80 text-[#5A554E] hover:text-obsidian hover:bg-white border border-[#E2DDD2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid with Smooth Scroll Stagger Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product, index) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];
            const isJustAdded = addedItem === product.id;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.65,
                  delay: (index % 4) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col bg-alabaster border border-[#E5DFCE] rounded-[24px] overflow-hidden hover:border-[#C5BDAA] hover:shadow-[0_20px_45px_-10px_rgba(30,24,18,0.14)] transition-all duration-300 shadow-[0_8px_25px_-5px_rgba(30,24,18,0.05)]"
              >
                {/* Image Container with Hover reveal */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE8DF]">
                  {/* Badge */}
                  <span className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-alabaster/90 backdrop-blur-md text-obsidian border border-[#D5CFBE] shadow-sm">
                    {product.tag}
                  </span>

                  {/* Primary Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Hover Secondary Image (if present) */}
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} porté en silhouette`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}

                  {/* Quick View Overlay Button */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian/60 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="px-4 py-2 rounded-full bg-alabaster/95 hover:bg-white text-obsidian text-xs font-sans-clean uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-obsidian" />
                      <span>Détails & Coupe</span>
                    </button>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-taupe font-mono mb-1.5">
                      <span className="tracking-widest uppercase">{product.category}</span>
                      <span className="font-serif-luxury text-xl font-normal text-obsidian">
                        {product.price} €
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-lg font-medium text-obsidian tracking-normal group-hover:text-taupe transition-colors line-clamp-1 leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#6B655C] font-sans-clean font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-4 pt-3 border-t border-[#EAE5D9]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-taupe">Taille atelier :</span>
                      <span className="text-[10px] font-mono text-obsidian font-semibold">{currentSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSelectSize(product.id, size)}
                          className={`min-w-[32px] h-7 px-2.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                            currentSize === size
                              ? 'bg-obsidian text-alabaster font-bold shadow-sm'
                              : 'bg-white text-[#5A554E] hover:bg-[#EAE5D9] hover:text-obsidian border border-[#E2DDD2]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add To Bag CTA Button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`chrome-button-sheen w-full py-3 rounded-full text-xs font-sans-clean font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        isJustAdded
                          ? 'bg-[#2A4736] text-white'
                          : 'bg-obsidian text-alabaster hover:bg-[#23211F]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté au Vestiaire</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Commander la Pièce</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
