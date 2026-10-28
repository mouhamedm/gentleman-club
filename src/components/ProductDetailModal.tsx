import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductItem } from './ShopSection.tsx';
import { useCart } from '../context/CartContext.tsx';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0];

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: currentSize,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1100);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop sombre avec flou */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Drawer compact qui glisse de la droite vers la gauche */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 pointer-events-none">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="w-screen max-w-md bg-alabaster border-l border-[#E2DDD2] flex flex-col shadow-[-20px_0_60px_rgba(20,16,12,0.25)] text-obsidian h-full overflow-hidden pointer-events-auto"
          >
            {/* Header compact du tiroir */}
            <div className="px-5 py-4 border-b border-[#EAE5D9] flex items-center justify-between bg-white/70 backdrop-blur-xs sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <span className="font-serif-luxury font-medium text-xl text-obsidian">
                  Fiche de Confection
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#EAE5D9] text-obsidian font-semibold tracking-wider">
                  {product.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-taupe hover:text-obsidian transition-colors rounded-full hover:bg-black/5 cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenu compact avec défilement fluide */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {/* Image unique bien proportionnée (pas deux) */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#ECE8DF] border border-[#E0DBCF] shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-alabaster/90 backdrop-blur-md text-obsidian border border-[#D5CFBE] shadow-xs">
                  {product.tag}
                </span>
              </div>

              {/* Informations pièce */}
              <div className="space-y-3">
                <div className="chrome-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] text-[#5A554E]">
                  <Sparkles className="w-3 h-3 text-taupe" />
                  <span>{product.category}</span>
                </div>

                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-obsidian tracking-normal leading-snug">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif-luxury text-2xl font-medium text-obsidian">
                    {product.price} €
                  </span>
                  <span className="text-[11px] text-taupe font-mono">
                    TVA incluse • Port offert
                  </span>
                </div>

                <p className="text-xs text-[#6B655C] font-sans-clean font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Spécifications atelier compactes */}
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E4DA] space-y-2 text-xs shadow-xs">
                  <div className="flex justify-between">
                    <span className="text-taupe font-mono text-[11px]">Étoffe :</span>
                    <span className="text-obsidian font-medium text-[11px]">{product.specs.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-taupe font-mono text-[11px]">Poids drap :</span>
                    <span className="text-obsidian font-medium text-[11px]">{product.specs.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-taupe font-mono text-[11px]">Coupe :</span>
                    <span className="text-obsidian font-medium text-[11px]">{product.specs.fit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-taupe font-mono text-[11px]">Origine :</span>
                    <span className="text-obsidian font-medium text-[11px]">{product.specs.origin}</span>
                  </div>
                </div>

                {/* Détails sartoriaux */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-mono text-taupe mb-2">
                    Finitions d'atelier :
                  </h4>
                  <ul className="space-y-1 text-xs text-[#6B655C]">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-obsidian font-bold mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer d'action fixe et compact en bas du drawer */}
            <div className="p-5 border-t border-[#EAE5D9] bg-white/95 backdrop-blur-xs sticky bottom-0 z-20 space-y-3">
              <div>
                <div className="flex justify-between items-center text-[11px] uppercase font-mono mb-2">
                  <span className="text-taupe">Taille atelier :</span>
                  <span className="text-obsidian font-bold">{currentSize}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-9 h-8 px-2.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        currentSize === size
                          ? 'bg-obsidian text-alabaster font-bold shadow-xs'
                          : 'bg-white text-[#5A554E] hover:bg-[#EAE5D9] hover:text-obsidian border border-[#E2DDD2]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isAdded}
                className={`chrome-button-sheen w-full py-3 rounded-full text-xs font-sans-clean font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  isAdded
                    ? 'bg-[#2A4736] text-white'
                    : 'bg-obsidian text-alabaster hover:bg-[#23211F]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Ajouté au Panier</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Commander la Pièce • {product.price} €</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-taupe uppercase tracking-widest font-mono">
                <ShieldCheck className="w-3 h-3 text-[#2A4736]" />
                <span>Série Limitée • Confection d'Atelier</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
