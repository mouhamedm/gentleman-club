import React, { useRef, useEffect, useMemo } from 'react';

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
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1Images = useMemo(() => {
    const row1 = ALL_IMAGES.slice(0, 9);
    return [...row1, ...row1, ...row1];
  }, []);

  const row2Images = useMemo(() => {
    const row2 = ALL_IMAGES.slice(4, 12);
    return [...row2, ...row2, ...row2];
  }, []);

  // Transform is written straight to the DOM (no React re-render, no CSS
  // transition) so the rows track the scroll 1:1 — avoids flicker on iOS.
  // Offset is measured against a stable layout position (offsetTop based) so
  // the iOS URL bar collapsing does not make the rows jump.
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section enters the viewport bottom, grows while scrolling
      const offset = (vh - rect.top) * 0.22;
      if (row1Ref.current) row1Ref.current.style.transform = `translate3d(${offset - 200}px,0,0)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translate3d(${-(offset - 200)}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="w-full bg-[#F7F5F0] pt-16 sm:pt-24 pb-16 overflow-hidden border-t border-[#EAE5D9]"
    >
      {/* Clean Editorial Header (No slashes, no tags) */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-obsidian">
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
          ref={row1Ref}
          className="flex gap-4"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden', marginLeft: -600 }}
        >
          {row1Images.map((src, index) => (
            <div
              key={`row1-${index}`}
              className="relative w-64 h-44 sm:w-100 sm:h-66.25 shrink-0 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E4DEC3] shadow-[0_12px_32px_rgba(30,24,18,0.06)] group"
            >
              <img
                src={src}
                alt={`Silhouette Runway Row 1 #${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/90">
                  Silhouette {String((index % 9) + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: moves LEFT on scroll */}
        <div
          ref={row2Ref}
          className="flex gap-4"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden', marginLeft: -600 }}
        >
          {row2Images.map((src, index) => (
            <div
              key={`row2-${index}`}
              className="relative w-64 h-44 sm:w-100 sm:h-66.25 shrink-0 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E4DEC3] shadow-[0_12px_32px_rgba(30,24,18,0.06)] group"
            >
              <img
                src={src}
                alt={`Silhouette Runway Row 2 #${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
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
