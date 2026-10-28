"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface TestimonialItem {
  tempId: number | string;
  testimonial: string;
  by: string;
  imgSrc: string;
  id?: string;
  title?: string;
  tag?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with COMPANY.",
    by: "Alex, CEO at TechCorp",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with COMPANY. I can't say that about other providers.",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 2,
    testimonial: "I know it's cliche, but we were lost before we found COMPANY. Can't thank you guys enough!",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 3,
    testimonial: "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andre, Head of Design at CreativeSolutions",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on COMPANY, we're never going back.",
    by: "Pam, Marketing Director at BrandBuilders",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 7,
    testimonial: "I would be lost without COMPANY's in-depth analytics. The ROI is EASILY 100X for us.",
    by: "Daniel, Data Scientist at AnalyticsPro",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period.",
    by: "Fernando, UX Designer at UserFirst",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 9,
    testimonial: "I switched 5 years ago and never looked back.",
    by: "Andy, DevOps Engineer at CloudMasters",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
    by: "Pete, Sales Director at RevenueRockets",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Marina, HR Manager at TalentForge",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 12,
    testimonial: "COMPANY's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia, Customer Success Manager at ClientCare",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains we've seen since implementing COMPANY are off the charts!",
    by: "Raj, Operations Manager at StreamlineSolutions",
    imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 14,
    testimonial: "COMPANY has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Lila, Workflow Specialist at ProcessPro",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 15,
    testimonial: "The scalability of COMPANY's solution is impressive. It grows with our business seamlessly.",
    by: "Trevor, Scaling Officer at GrowthGurus",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how COMPANY continually innovates. They're always one step ahead.",
    by: "Naomi, Innovation Lead at FutureTech",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with COMPANY is incredible. It's paid for itself many times over.",
    by: "Victor, Finance Analyst at ProfitPeak",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 18,
    testimonial: "COMPANY's platform is so robust, yet easy to use. It's the perfect balance.",
    by: "Yuki, Tech Lead at BalancedTech",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    tempId: 19,
    testimonial: "We've tried many solutions, but COMPANY stands out in terms of reliability and performance.",
    by: "Zoe, Performance Manager at ReliableSystems",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
  hasDraggedRef?: React.MutableRefObject<boolean>;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  hasDraggedRef,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => {
        if (hasDraggedRef?.current) return;
        handleMove(position);
      }}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out select-none",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary shadow-[0_20px_50px_rgba(0,0,0,0.4)]" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50 opacity-85 hover:opacity-100"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -55 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 12px 28px rgba(0, 0, 0, 0.25)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-[#524E48]" : "bg-border"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <img
          src={testimonial.imgSrc}
          alt={`${testimonial.by.split(',')[0]}`}
          draggable={false}
          className="h-14 w-12 bg-muted object-cover object-top rounded-sm shadow-md pointer-events-none"
        />
        {testimonial.id && (
          <span className={cn(
            "font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded-full border",
            isCenter ? "border-white/20 text-[#D5CFBE] bg-white/10" : "border-[#D5CFBE] text-[#8C867C]"
          )}>
            Standard {testimonial.id}
          </span>
        )}
      </div>

      {testimonial.title && (
        <h4 className={cn(
          "font-serif-luxury text-lg sm:text-xl font-normal mb-2 leading-tight",
          isCenter ? "text-white" : "text-obsidian"
        )}>
          {testimonial.title}
        </h4>
      )}

      <h3 className={cn(
        "text-xs sm:text-sm font-light leading-relaxed line-clamp-4",
        isCenter ? "text-alabaster/90" : "text-obsidian/80 font-sans-clean"
      )}>
        "{testimonial.testimonial}"
      </h3>

      <p className={cn(
        "absolute bottom-6 left-6 right-6 text-xs font-mono uppercase tracking-wider truncate",
        isCenter ? "text-[#D5CFBE]" : "text-[#7A746B]"
      )}>
        — {testimonial.by}
      </p>
    </div>
  );
};

export interface StaggerTestimonialsProps {
  items?: TestimonialItem[];
  onActiveChange?: (activeItem: TestimonialItem, activeIndex: number) => void;
  className?: string;
  height?: number;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  items,
  onActiveChange,
  className,
  height = 620,
}) => {
  const listToUse = items && items.length > 0 ? items : DEFAULT_TESTIMONIALS;
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(listToUse);

  const containerRef = useRef<HTMLDivElement>(null);
  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;

  // Trackpad 2-finger wheel scroll handling
  const lastWheelTime = useRef<number>(0);
  const wheelDeltaAcc = useRef<number>(0);

  // Touch / pointer horizontal swipe handling
  const pointerStartX = useRef<number>(0);
  const pointerStartY = useRef<number>(0);
  const isPointerDown = useRef<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);

  useEffect(() => {
    if (items && items.length > 0) {
      setTestimonialsList(items);
    }
  }, [items]);

  const handleMove = useCallback((steps: number) => {
    setTestimonialsList((prevList) => {
      const newList = [...prevList];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prevList;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prevList;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }

      // Identify the new center card
      const centerIdx = Math.floor(newList.length / 2);
      if (newList[centerIdx] && onActiveChangeRef.current) {
        onActiveChangeRef.current(newList[centerIdx], centerIdx);
      }
      return newList;
    });
  }, []);

  // 1. Détection du glissement à deux doigts à l'horizontale (Trackpad / Touchpad wheel horizontal)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Évalue la composante horizontale (glissement trackpad 2 doigts ou shift + molette)
      const isHorizontalDominant = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const horizontalDelta = isHorizontalDominant ? e.deltaX : (e.shiftKey ? e.deltaY : 0);

      if (Math.abs(horizontalDelta) > 8) {
        // Empêche le rebond d'historique horizontal natif du navigateur
        e.preventDefault();

        const now = Date.now();
        wheelDeltaAcc.current += horizontalDelta;

        // Seuil d'accumulation pour déclencher le décalage (40px) avec temporisation pour un glissement fluide
        if (Math.abs(wheelDeltaAcc.current) >= 40 && now - lastWheelTime.current > 220) {
          if (wheelDeltaAcc.current > 0) {
            handleMove(1); // Défilement vers la droite -> carte suivante
          } else {
            handleMove(-1); // Défilement vers la gauche -> carte précédente
          }
          lastWheelTime.current = now;
          wheelDeltaAcc.current = 0;
        }
      } else {
        wheelDeltaAcc.current = 0;
      }
    };

    // Écouteur non-passif pour permettre e.preventDefault() sur le glissement horizontal
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleMove]);

  // 2. Détection du glissement tactile / pointer swipe horizontal
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    isPointerDown.current = true;
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    const diffX = e.clientX - pointerStartX.current;
    const diffY = e.clientY - pointerStartY.current;

    if (Math.abs(diffX) > 12 && Math.abs(diffX) > Math.abs(diffY)) {
      hasDraggedRef.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;

    const diffX = e.clientX - pointerStartX.current;
    const diffY = e.clientY - pointerStartY.current;

    // Seuil de déclenchement du swipe horizontal (40px)
    if (Math.abs(diffX) >= 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleMove(1); // Balayage vers la gauche -> carte suivante
      } else {
        handleMove(-1); // Balayage vers la droite -> carte précédente
      }
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
    } else {
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Compute active item initially
  useEffect(() => {
    const centerIdx = Math.floor(testimonialsList.length / 2);
    if (testimonialsList[centerIdx] && onActiveChangeRef.current) {
      onActiveChangeRef.current(testimonialsList[centerIdx], centerIdx);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn("relative w-full overflow-hidden bg-transparent touch-pan-y cursor-grab active:cursor-grabbing", className)}
      style={{ height }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            hasDraggedRef={hasDraggedRef}
          />
        );
      })}

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-20 pointer-events-auto">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center transition-all duration-300 rounded-full cursor-pointer",
            "bg-white/80 backdrop-blur-md border border-[#D5CFBE] text-obsidian hover:bg-obsidian hover:text-white shadow-md hover:shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center transition-all duration-300 rounded-full cursor-pointer",
            "bg-white/80 backdrop-blur-md border border-[#D5CFBE] text-obsidian hover:bg-obsidian hover:text-white shadow-md hover:shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
