import React, { useRef, useEffect, useState, useMemo } from 'react';

const ALL_IMAGES: string[] = [
  '/images/hero-img/look-01.webp',
  '/images/hero-img/look-02.webp',
  '/images/hero-img/look-03.webp',
  '/images/hero-img/look-04.webp',
  '/images/hero-img/look-05.webp',
  '/images/hero-img/look-06.webp',
  '/images/hero-img/look-07.webp',
  '/images/hero-img/look-08.webp',
  '/images/hero-img/look-09.webp',
  '/images/editorial-01.webp',
  '/images/editorial-02.webp',
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  const row1Images = useMemo(() => {
    const row1 = ALL_IMAGES.slice(0, 9);
    return [...row1, ...row1, ...row1];
  }, []);

  const row2Images = useMemo(() => {
    const row2 = ALL_IMAGES.slice(4, 12);
    return [...row2, ...row2, ...row2];
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.22;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="w-full bg-[#F7F5F0] pt-16 sm:pt-24 pb-16 overflow-hidden select-none border-t border-[#EAE5D9]"
    >
      {/* Clean Editorial Header (No slashes, no tags) */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#141413]">
            Le Mouvement Sartorial
          </h3>
        </div>
        <p className="text-xs sm:text-[13px] text-[#7A746B] font-sans-clean max-w-sm tracking-wide leading-relaxed">
          L'alliance des laines nobles et des reflets précis d'accessoires chromés en mouvement.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {/* Row 1: moves RIGHT on scroll */}
        <div
          className="flex gap-4 transition-transform duration-100 ease-out"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, index) => (
            <div
              key={`row1-${index}`}
              className="relative w-[340px] sm:w-[400px] h-[230px] sm:h-[265px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E4DEC3] shadow-[0_12px_32px_rgba(30,24,18,0.06)] group"
            >
              <img
                src={src}
                alt={`Silhouette Runway Row 1 #${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/90">
                  Silhouette {String((index % 9) + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: moves LEFT on scroll */}
        <div
          className="flex gap-4 transition-transform duration-100 ease-out"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, index) => (
            <div
              key={`row2-${index}`}
              className="relative w-[340px] sm:w-[400px] h-[230px] sm:h-[265px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E4DEC3] shadow-[0_12px_32px_rgba(30,24,18,0.06)] group"
            >
              <img
                src={src}
                alt={`Silhouette Runway Row 2 #${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/90">
                  Finitions {String((index % 8) + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
