"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
  onActiveChange?: (index: number) => void;
}

/* Sensitivity and damping for luxury feel */
const WHEEL_SENSITIVITY = 100;
const DRAG_SENSITIVITY = 220;
const SETTLE_DELAY = 180;
const EASE = 0.12;
const DEG_STEP = 20; // 20 degrees per card gives a majestic 4-left / center / 4-right arch

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const rad = (deg: number) => (deg * Math.PI) / 180;

type Stage = { w: number; h: number };

export function WorksWheel({
  items,
  label = "GENTLEMAN CLUB",
  action = "Explorer",
  className,
  onActiveChange,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);

  const count = items.length;
  const last = Math.max(count - 1, 0);
  // Start at Look 5 (index 4) so there are 4 on the left and 4 on the right
  const initialIndex = Math.min(4, Math.floor(count / 2));

  const turn = React.useRef(initialIndex);
  const target = React.useRef(initialIndex);
  const [active, setActive] = React.useState(initialIndex);
  const [stage, setStage] = React.useState<Stage>({ w: 1200, h: 700 });

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Geometry: Grand landscape cards with generous padding, displaying only 3 images on screen (center + two up top)
  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    // Grand landscape card dimensions enlarged
    const cardW = clamp(w * 0.45, 420, 640);
    const cardH = cardW / 1.52; // Cinema landscape ratio
    // Generous padding / horizontal spread between center and side cards
    const spreadX = clamp(w * 0.44, cardW + 80, cardW + 200);
    // Elevation for the two upper cards
    const spreadY = clamp(h * 0.22, 90, 160);
    // Lower the center card slightly down as requested
    const centerY = clamp(cardH * 0.04, 10, 28);

    return {
      cardW,
      cardH,
      spreadX,
      spreadY,
      centerY,
    };
  }, [stage]);

  // Turn to specific index with clamping
  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last);
    },
    [last],
  );

  // Pre-decode every image once so no JPEG/WebP decode happens mid-animation
  React.useEffect(() => {
    items.forEach((item) => {
      const img = new Image();
      img.decoding = "async";
      img.src = item.image;
      if (img.decode) img.decode().catch(() => {});
    });
  }, [items]);

  // Animation frame loop: moves cards so only 3 images are visually visible on screen (center + two up top)
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { cardW, cardH, spreadX, spreadY, centerY } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) {
        turn.current = target.current;
      } else {
        turn.current += gap * (reduced ? 1 : EASE);
      }

      const currentPos = turn.current;

      for (let i = 0; i < count; i++) {
        const d = i - currentPos; // Distance in index from center card
        const card = cardRefs.current[i];
        if (!card) continue;

        const absD = Math.abs(d);

        // Visually show only 3 images on screen: center (d=0) and the two upper ones (d=-1 and d=+1)
        // Opacity stays at 0.01 (not 0) so the browser keeps the layer rasterized: no stall when it enters
        if (absD > 1.65) {
          card.style.opacity = "0.01";
          card.style.pointerEvents = "none";
          continue;
        }

        // Scale: Center card is 1.0 (grand), side cards scale gracefully to ~0.84
        const scale = clamp(1 - absD * 0.16, 0.76, 1);

        // Horizontal positioning with generous padding/spacing
        const sign = Math.sign(d);
        const x = sign * (absD * spreadX);

        // Upward arc: Center card is lower, the two side cards are elevated up top
        const y = centerY - Math.pow(absD, 1.35) * spreadY;
        const z = -absD * 35;

        // Inward tilt and yaw along the amphitheater arc
        const tiltZ = clamp(-d * 5.5, -12, 12);
        const yawY = clamp(-d * 10, -20, 20);

        // Smooth fade so only the 3 main cards are visible at rest
        const opacity = clamp(1 - (absD - 1.05) * 1.6, 0.01, 1);

        card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${tiltZ}deg) rotateY(${yawY}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(Math.round(100 - absD * 15));
        card.style.pointerEvents = absD < 1.3 ? "auto" : "none";
      }

      const nearest = clamp(Math.round(currentPos), 0, last);
      setActive((prev) => {
        if (prev !== nearest) {
          if (onActiveChange) onActiveChange(nearest);
          return nearest;
        }
        return prev;
      });
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced, onActiveChange]);

  // Wheel listener: Natural vertical scroll passes through to page; horizontal wheel scrolls carousel!
  const settling = React.useRef<number>(0);
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      // If user scrolls horizontally (trackpad swipe or shift+wheel), turn the carousel!
      if (
        Math.abs(event.deltaX) > Math.abs(event.deltaY) &&
        Math.abs(event.deltaX) > 4
      ) {
        event.preventDefault();
        const step = event.deltaX / WHEEL_SENSITIVITY;
        const next = clamp(target.current + step, 0, last);
        target.current = next;

        window.clearTimeout(settling.current);
        settling.current = window.setTimeout(() => {
          target.current = Math.round(target.current);
        }, SETTLE_DELAY);
      }
      // If user scrolls vertically (deltaY), DO NOT preventDefault: page scrolls down naturally to next section!
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [last]);

  // Pointer drag interaction (horizontal drag turns the carousel)
  const dragStart = React.useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: React.PointerEvent) => {
    dragStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!dragStart.current) return;
    const deltaX = dragStart.current.x - event.clientX;
    const deltaY = dragStart.current.y - event.clientY;
    // Turn wheel when horizontal drag is dominant
    if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
      to(target.current + deltaX / DRAG_SENSITIVITY);
      dragStart.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handlePointerUp = () => {
    dragStart.current = null;
    target.current = Math.round(target.current);
  };

  const handlePrev = () => {
    to(Math.max(0, Math.round(target.current) - 1));
  };

  const handleNext = () => {
    to(Math.min(last, Math.round(target.current) + 1));
  };

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[30rem] w-full overflow-hidden select-none bg-transparent",
        className,
      )}
      {...props}
    >
      {/* Side Navigation Arrow: Left Flank */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={active === 0}
        title="Silhouette Précédente"
        className="z-30 absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#D5CFBE] bg-[#FAF9F5]/90 backdrop-blur-md text-[#141413] hover:bg-[#141413] hover:text-[#FAF9F5] transition-all flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Side Navigation Arrow: Right Flank */}
      <button
        type="button"
        onClick={handleNext}
        disabled={active === last}
        title="Silhouette Suivante"
        className="z-30 absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#D5CFBE] bg-[#FAF9F5]/90 backdrop-blur-md text-[#141413] hover:bg-[#141413] hover:text-[#FAF9F5] transition-all flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 3D Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label="Grande Roue Sartoriale"
        className="absolute inset-0 cursor-grab active:cursor-grabbing outline-none flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            handleNext();
            event.preventDefault();
          } else if (event.key === "ArrowLeft") {
            handlePrev();
            event.preventDefault();
          }
        }}
      >
        {/* Gondolas / Landscape Cards Container positioned at central origin */}
        <div className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]">
          {items.map((item, i) => {
            return (
              <div
                key={item.title}
                id={`works-wheel-${i}`}
                role="button"
                tabIndex={0}
                aria-label={item.title}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
                onClick={(e) => {
                  if (Math.round(target.current) !== i) {
                    e.preventDefault();
                    to(i);
                  }
                }}
                className="group absolute [backface-visibility:hidden] cursor-pointer will-change-transform"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <div
                  className={cn(
                    "relative block size-full overflow-hidden rounded-2xl bg-[#FAF8F5] border border-[#D5CFBE] shadow-[0_20px_50px_-14px_rgba(25,22,18,0.18)]",
                  )}
                >
                  {/* Fashion Artwork Image in Landscape Cinema format */}
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    decoding="async"
                    loading="eager"
                    className="size-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Front active item title at bottom left (only the title text) */}
      <div className="pointer-events-none absolute left-[6%] sm:left-[8%] bottom-[5%] sm:bottom-[4.5%] max-w-[340px] sm:max-w-[460px] z-20">
        <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#141413] leading-snug line-clamp-2">
          {items[active]?.title}
        </h2>
      </div>
    </section>
  );
}

export default WorksWheel;
