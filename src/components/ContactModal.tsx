import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, MapPin, CheckCircle2, Sparkles, Clock } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Costume & Smoking Sur-Mesure',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', service: 'Costume & Smoking Sur-Mesure', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-alabaster border border-[#E0DBCF] rounded-4xl p-6 sm:p-10 shadow-[0_35px_90px_rgba(30,24,18,0.22)] z-10 my-8 text-obsidian"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 text-taupe hover:text-obsidian transition-colors p-2.5 rounded-full bg-white/70 border border-[#E2DDD2] hover:bg-white cursor-pointer shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white border border-[#D5CFBE] flex items-center justify-center text-obsidian shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#2A4736]" />
                </div>
                <h3 className="text-3xl font-serif-luxury font-normal text-obsidian">
                  Rendez-Vous Enregistré
                </h3>
                <p className="text-[#6B655C] max-w-md font-sans-clean text-xs sm:text-sm leading-relaxed">
                  Merci {formData.name || 'cher client'}. Notre maître tailleur prendra contact avec vous sous 24 heures pour convenir d'un essayage privé.
                </p>
                <div className="p-3.5 bg-white border border-[#E2DDD2] rounded-2xl text-xs font-mono text-[#5A554E] shadow-xs">
                  Code privilège cercle privé : <span className="font-bold text-obsidian">SARTORIAL10</span>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full bg-obsidian text-alabaster px-8 py-3 text-xs uppercase tracking-widest font-sans-clean hover:bg-[#23211F] transition-colors cursor-pointer shadow-sm"
                  >
                    Fermer la Fenêtre
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <div className="chrome-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-[#5A554E] mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-taupe" />
                    <span>Salon Privé & Atelier Sartorial</span>
                  </div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-obsidian tracking-tight">
                    Prendre Rendez-Vous
                  </h3>
                  <p className="text-[#6B655C] text-xs sm:text-sm font-light mt-1">
                    Échangez directement avec nos artisans pour une pièce sur-mesure ou une commande privée.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-taupe mb-1.5">
                        Nom & Prénom
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jean de Saint-Germain"
                        className="w-full bg-white border border-[#E2DDD2] rounded-xl px-4 py-3 text-xs sm:text-sm text-obsidian placeholder-[#B8AF9E] focus:outline-none focus:border-obsidian transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-taupe mb-1.5">
                        Adresse E-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@domaine.com"
                        className="w-full bg-white border border-[#E2DDD2] rounded-xl px-4 py-3 text-xs sm:text-sm text-obsidian placeholder-[#B8AF9E] focus:outline-none focus:border-obsidian transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-taupe mb-1.5">
                      Type de Prestation Souhaitée
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-[#E2DDD2] rounded-xl px-4 py-3 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors cursor-pointer"
                    >
                      <option value="Costume & Smoking Sur-Mesure">Costume & Smoking Sur-Mesure</option>
                      <option value="Pardessus & Manteau en Laine 140s">Pardessus & Manteau en Laine 140s</option>
                      <option value="Chemiserie & Boutons de Manchette Chrome">Chemiserie & Boutons de Manchette Chrome</option>
                      <option value="Commande Spéciale Défilé">Commande Spéciale Défilé</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-taupe mb-1.5">
                      Vos Précisions ou Mensurations
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez l'occasion, le style de coupe recherché ou vos disponibilités..."
                      className="w-full bg-white border border-[#E2DDD2] rounded-xl px-4 py-3 text-xs sm:text-sm text-obsidian placeholder-[#B8AF9E] focus:outline-none focus:border-obsidian transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="chrome-button-sheen w-full py-4 rounded-full bg-obsidian hover:bg-[#23211F] text-alabaster font-sans-clean font-medium uppercase tracking-widest text-xs transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Transmission en cours...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Confirmer le Rendez-Vous</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-[#EAE5D9] flex flex-wrap items-center justify-between gap-4 text-[11px] text-taupe font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-obsidian" />
                    <span>Atelier Paris 8e — Sur Rendez-Vous</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-obsidian" />
                    <span>Réponse sous 24h</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
