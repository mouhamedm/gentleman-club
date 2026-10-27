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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#141413]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#E0DBCF] rounded-[32px] p-6 sm:p-9 shadow-[0_35px_90px_rgba(30,24,18,0.22)] z-10 my-8 max-h-[90vh] overflow-y-auto text-[#141413]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-[#8C867C] hover:text-[#141413] transition-colors p-2.5 rounded-full bg-white/70 border border-[#E2DDD2] hover:bg-white cursor-pointer z-20 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#ECE8DF] border border-[#E0DBCF] relative shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF9F5]/90 backdrop-blur-md text-[#141413] border border-[#D5CFBE] shadow-xs">
                  {product.tag}
                </span>
              </div>
              {product.hoverImage && (
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E0DBCF] shadow-xs">
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} vue détail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-between h-full pt-2">
              <div>
                <div className="chrome-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-[#5A554E] mb-3">
                  <Sparkles className="w-3 h-3 text-[#8C867C]" />
                  <span>{product.category}</span>
                </div>

                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#141413] tracking-normal leading-tight">
                  {product.name}
                </h2>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif-luxury text-3xl font-medium text-[#141413]">
                    {product.price} €
                  </span>
                  <span className="text-xs text-[#8C867C] font-mono">
                    TVA incluse • Livraison atelier offerte
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-[#6B655C] font-sans-clean font-light mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Key specs breakdown */}
                <div className="mt-6 p-4.5 rounded-2xl bg-white border border-[#E8E4DA] space-y-2.5 text-xs shadow-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8C867C] font-mono">Étoffe principale :</span>
                    <span className="text-[#141413] font-medium">{product.specs.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C867C] font-mono">Poids du drap :</span>
                    <span className="text-[#141413] font-medium">{product.specs.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C867C] font-mono">Ligne de coupe :</span>
                    <span className="text-[#141413] font-medium">{product.specs.fit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C867C] font-mono">Origine atelier :</span>
                    <span className="text-[#141413] font-medium">{product.specs.origin}</span>
                  </div>
                </div>

                {/* Garment Details List */}
                <div className="mt-6">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-[#8C867C] mb-2.5">
                    Détails Sartoriaux & Finitions :
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#6B655C]">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#141413] font-bold mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-[#EAE5D9]">
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs uppercase font-mono mb-2">
                    <span className="text-[#8C867C]">Sélectionner la taille :</span>
                    <span className="text-[#141413] font-bold">{currentSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[44px] h-10 px-3 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                          currentSize === size
                            ? 'bg-[#141413] text-[#FAF9F5] font-bold shadow-sm'
                            : 'bg-white text-[#5A554E] hover:bg-[#EAE5D9] hover:text-[#141413] border border-[#E2DDD2]'
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
                  className={`chrome-button-sheen w-full py-4 rounded-full text-xs font-sans-clean font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isAdded
                      ? 'bg-[#2A4736] text-white'
                      : 'bg-[#141413] text-[#FAF9F5] hover:bg-[#23211F]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au Panier d'Atelier</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Commander la Pièce • {product.price} €</span>
                    </>
                  )}
                </button>

                <div className="mt-3.5 flex items-center justify-center gap-2 text-[10px] text-[#8C867C] uppercase tracking-widest font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2A4736]" />
                  <span>Série Limitée Numérotée • Expédition Sous Housse Protectrice</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
