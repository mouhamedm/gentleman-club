import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
  href?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  label = 'Découvrir la Capsule',
  href,
}) => {
  const content = (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`chrome-button-sheen rounded-full border border-[#D5CFBE] bg-[#FAF9F5] hover:bg-[#141413] text-[#141413] hover:text-[#FAF9F5] font-sans-clean font-medium uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer select-none px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-[13px] shadow-sm hover:shadow-md ${className}`}
    >
      {label}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};
