import React, { useRef, useState, useEffect, useCallback } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  className = '',
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState<string>(inactiveTransition);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const minX = rect.left - padding;
    const maxX = rect.right + padding;
    const minY = rect.top - padding;
    const maxY = rect.bottom + padding;

    const isNear = mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY;

    if (isNear) {
      const offsetX = (mouseX - centerX) / strength;
      const offsetY = (mouseY - centerY) / strength;
      setTransition(activeTransition);
      setTransform(`translate3d(${offsetX}px, ${offsetY}px, 0px)`);
    } else {
      setTransition(inactiveTransition);
      setTransform('translate3d(0px, 0px, 0px)');
    }
  }, [padding, strength, activeTransition, inactiveTransition]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
