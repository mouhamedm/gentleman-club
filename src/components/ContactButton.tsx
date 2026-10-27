import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'chrome';
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'Explorer la Collection',
  variant = 'primary',
}) => {
  if (variant === 'chrome') {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`chrome-button-sheen relative inline-flex items-center justify-center rounded-full font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer select-none px-7 py-3 sm:px-9 sm:py-3.5 text-xs sm:text-sm text-[#1A1918] bg-white border border-[#D5CFBE] shadow-[0_4px_16px_rgba(30,26,20,0.06)] hover:shadow-[0_8px_24px_rgba(30,26,20,0.12)] ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1918]" />
          {label}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`chrome-button-sheen relative inline-flex items-center justify-center rounded-full font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer select-none px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm text-alabaster bg-obsidian hover:bg-[#23211F] shadow-[0_10px_30px_-5px_rgba(20,20,19,0.3)] hover:shadow-[0_14px_35px_-5px_rgba(20,20,19,0.45)] border border-[#3A3835]/40 ${className}`}
    >
      {/* Specular Chrome Rim highlight */}
      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D6CEBF] animate-pulse" />
        {label}
      </span>
    </motion.button>
  );
};
