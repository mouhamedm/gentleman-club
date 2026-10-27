import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface CartDrawerProps {
  onCheckoutSuccess?: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckoutSuccess }) => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartCount,
    subtotal,
    discount,
    discountCode,
    total,
    removeFromCart,
    updateQuantity,
    applyDiscount,
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const freeShippingThreshold = 300;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const ok = applyDiscount(promoInput);
    if (ok) {
      setPromoSuccess(true);
      setPromoError(false);
      setTimeout(() => setPromoSuccess(false), 3000);
    } else {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 3000);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedOrderId = 'JK-' + Math.floor(100000 + Math.random() * 900000);
      setOrderComplete(generatedOrderId);
      if (onCheckoutSuccess) {
        onCheckoutSuccess(generatedOrderId);
      }
    }, 1200);
  };

  const handleFinishOrder = () => {
    setOrderComplete(null);
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#141413]/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E2DDD2] flex flex-col shadow-2xl text-[#141413]"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-[#141413]" />
                  <span className="font-serif-luxury font-medium text-2xl text-[#141413]">
                    Le Panier d'Atelier
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#EAE5D9] text-[#141413] font-semibold">
                    {cartCount}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-2 text-[#8C867C] hover:text-[#141413] transition-colors rounded-full hover:bg-black/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping bar */}
              <div className="px-6 py-3.5 bg-[#F2EFE8] border-b border-[#EAE5D9] text-xs">
                {subtotal >= freeShippingThreshold ? (
                  <p className="text-[#2A4736] font-medium flex items-center gap-2">
                    <Check className="w-4 h-4" /> Vous bénéficiez de la livraison d'atelier offerte.
                  </p>
                ) : (
                  <p className="text-[#5A554E]">
                    Plus que <span className="font-semibold text-[#141413]">{remainingForFreeShipping} €</span> pour la <span className="font-semibold text-[#141413]">Livraison Express Offerte</span>
                  </p>
                )}
                <div className="w-full bg-[#E5DFCE] rounded-full h-1 mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#141413] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Order confirmation view */}
              {orderComplete ? (
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#FAF9F5] border border-[#D5CFBE] flex items-center justify-center mb-6 shadow-sm">
                    <Check className="w-7 h-7 text-[#141413]" />
                  </div>
                  <h3 className="text-3xl font-serif-luxury font-normal text-[#141413] mb-2">
                    Commande Confirmée
                  </h3>
                  <p className="text-xs font-mono text-[#8C867C] mb-4">
                    Numéro d'atelier : #{orderComplete}
                  </p>
                  <p className="text-xs sm:text-sm text-[#6B655C] mb-8 max-w-xs leading-relaxed font-sans-clean">
                    Nous vous remercions de votre confiance. Votre pièce sera préparée avec soin et expédiée sous housse de protection sartoriale.
                  </p>
                  <button
                    type="button"
                    onClick={handleFinishOrder}
                    className="w-full py-3.5 rounded-full bg-[#141413] text-[#FAF9F5] font-sans-clean text-xs uppercase tracking-widest hover:bg-[#23211F] transition-all cursor-pointer shadow-md"
                  >
                    Retourner au Vestiaire
                  </button>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center text-[#8C867C] py-16">
                        <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 opacity-40 text-[#141413]" />
                        <p className="font-serif-luxury text-xl text-[#141413]">Votre vestiaire est vide</p>
                        <p className="text-xs mt-1 max-w-xs text-[#7A746B]">Explorez les créations de la collection Hiver 2026 et sélectionnez votre taille.</p>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#E8E4DA] shadow-[0_4px_16px_rgba(30,24,18,0.04)]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-24 object-cover rounded-xl bg-[#ECE8DF]"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-serif-luxury text-base font-medium text-[#141413] leading-snug line-clamp-2">
                                  {item.name}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id, item.size)}
                                  className="text-[#8C867C] hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-[#8C867C] font-mono">
                                <span>Taille : {item.size}</span>
                                {item.color && <span>• {item.color}</span>}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <span className="font-serif-luxury font-medium text-base text-[#141413]">{item.price} €</span>
                              <div className="flex items-center gap-2 bg-[#FAF9F5] border border-[#E2DDD2] rounded-full px-2 py-0.5 shadow-xs">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                  className="text-[#141413] hover:opacity-60 p-1"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs w-4 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                  className="text-[#141413] hover:opacity-60 p-1"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Promo code & Totals */}
                  {cartItems.length > 0 && (
                    <div className="p-6 pt-0 space-y-4 border-t border-[#EAE5D9] bg-[#FAF9F5]">
                      <form onSubmit={handleApplyPromo} className="flex gap-2 pt-4">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C867C]" />
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="Code privilège (ex: SARTORIAL10)"
                            className="w-full bg-white border border-[#E2DDD2] rounded-full pl-9 pr-3 py-2 text-xs uppercase tracking-wider text-[#141413] placeholder-[#8C867C] focus:outline-none focus:border-[#141413]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#141413] hover:bg-[#23211F] text-[#FAF9F5] rounded-full text-xs font-sans-clean font-medium uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Appliquer
                        </button>
                      </form>
                      {promoSuccess && (
                        <p className="text-[#2A4736] text-xs flex items-center gap-1 font-mono">
                          <Check className="w-3 h-3" /> Remise appliquée : {discountCode} (-{discount} €)
                        </p>
                      )}
                      {promoError && (
                        <p className="text-rose-600 text-xs font-mono">
                          Code non reconnu. Utilisez &quot;SARTORIAL10&quot; ou &quot;DROP20&quot;
                        </p>
                      )}

                      {/* Calculations */}
                      <div className="space-y-1.5 text-xs text-[#6B655C] pt-2 border-t border-[#EAE5D9]">
                        <div className="flex justify-between">
                          <span>Sous-total</span>
                          <span className="font-mono font-medium text-[#141413]">{subtotal} €</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-[#2A4736] font-medium">
                            <span>Remise ({discountCode})</span>
                            <span className="font-mono">-{discount} €</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Livraison Sécurisée</span>
                          <span className="font-mono text-[#141413]">
                            {subtotal >= freeShippingThreshold ? 'OFFERTE' : '15 €'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-[#141413] pt-2 border-t border-[#EAE5D9]">
                          <span className="font-serif-luxury text-lg">Total</span>
                          <span className="font-serif-luxury text-xl font-normal">
                            {total + (subtotal >= freeShippingThreshold ? 0 : 15)} €
                          </span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="chrome-button-sheen w-full py-3.5 rounded-full bg-[#141413] hover:bg-[#23211F] text-[#FAF9F5] font-sans-clean font-medium uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_10px_30px_rgba(20,20,19,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isCheckingOut ? (
                          <span>Sécurisation de la commande...</span>
                        ) : (
                          <>
                            <span>Procéder au Paiement</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C867C] uppercase tracking-widest pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2A4736]" />
                        <span>Paiement Chiffré SSL • Pièce Certifiée d'Atelier</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
