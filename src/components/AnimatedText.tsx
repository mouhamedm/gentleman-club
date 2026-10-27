import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const displayChar = char === ' ' ? '\u00A0' : char;

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{displayChar}</span>
      <motion.span
        className="absolute left-0 top-0 select-text"
        style={{ opacity }}
      >
        {displayChar}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const total = characters.length;

  return (
    <p
      ref={containerRef}
      className={`font-medium text-center leading-relaxed ${className}`}
      style={style}
    >
      {characters.map((char, i) => {
        const start = i / total;
        const end = Math.min(1, start + 1 / total);
        return (
          <Character
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};
