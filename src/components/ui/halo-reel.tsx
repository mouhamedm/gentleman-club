"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "../../lib/utils.ts";

export type HaloReelItem = {
  src?: string;
  alt?: string;
  bgColor?: string;
  textColor?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  price?: number;
  tag?: string;
};

export interface HaloReelProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  items: HaloReelItem[];
  cardWidth?: number;
  cardHeight?: number;
  minScale?: number;
  radiusXRatio?: number;
  centerXRatio?: number;
  radiusYRatio?: number;
  autoPlay?: boolean;
  holdDuration?: number;
  stepDuration?: number;
  pauseOnHover?: boolean;
  draggable?: boolean;
  spread?: number;
  maxCards?: number;
  dragSensitivity?: number;
  centerLabel?:
    | React.ReactNode
    | ((activeItem: HaloReelItem, activeIndex: number) => React.ReactNode);
  showCenterLabel?: boolean;
  onActiveItemChange?: (item: HaloReelItem, index: number) => void;
}

const TAU = Math.PI * 2;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function HaloReel({
  items,
  cardWidth = 130,
  cardHeight = 180,
  minScale = 0.4,
  radiusXRatio = 0.45,
  centerXRatio = 0,
  radiusYRatio = 0.36,
  autoPlay = true,
  holdDuration = 1000,
  stepDuration = 700,
  pauseOnHover = true,
  draggable = true,
  spread = 1.2,
  maxCards = 64,
  dragSensitivity = 1,
  centerLabel,
  showCenterLabel = true,
  onActiveItemChange,
  className,
  style,
  ...props
}: HaloReelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const count = items.length;

  const rotation = useMotionValue(0);
  const draggingRef = React.useRef(false);
  const hoverRef = React.useRef(false);
  const hasDraggedRef = React.useRef(false);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const [size, setSize] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () =>
      setSize({ w: node.offsetWidth, h: node.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const radiusX = size.w * radiusXRatio;
  const radiusY = size.h * radiusYRatio;

  const slots = clamp(
    Math.ceil(
      TAU *
        Math.max(
          radiusX / (cardWidth * spread),
          radiusY / (cardHeight * spread),
        ),
    ),
    count,
    Math.max(count, maxCards),
  );
  const step = slots ? TAU / slots : 0;

  const fit = size.w
    ? clamp(
        Math.min(
          size.w / (radiusX + cardWidth * 0.7),
          (size.h * 1.1) / (2 * radiusY + cardHeight),
        ),
        0.5,
        1,
      )
    : 1;
  const cardW = cardWidth * fit;
  const cardH = cardHeight * fit;

  /* ── Suivi de l'index de la carte au premier plan ─────────── */
  const getActiveItemIndex = React.useCallback(
    (rot: number) => {
      if (!step || !slots || !count) return 0;
      const normalized = -rot / step;
      const nearestSlot = ((Math.round(normalized) % slots) + slots) % slots;
      return nearestSlot % count;
    },
    [step, slots, count],
  );

  useMotionValueEvent(rotation, "change", (latest) => {
    const itemIndex = getActiveItemIndex(latest);
    setActiveIndex((prev) => {
      if (prev !== itemIndex) {
        onActiveItemChange?.(items[itemIndex], itemIndex);
        return itemIndex;
      }
      return prev;
    });
  });

  // Check initial index
  React.useEffect(() => {
    const initIdx = getActiveItemIndex(rotation.get());
    setActiveIndex(initIdx);
    onActiveItemChange?.(items[initIdx], initIdx);
  }, [getActiveItemIndex, rotation, items, onActiveItemChange]);

  /* ── Autoplay ──────────────────────────────────────────────── */
  React.useEffect(() => {
    if (!autoPlay || reduceMotion || !count) return;

    let timer = 0;
    let controls: ReturnType<typeof animate> | undefined;

    const tick = () => {
      timer = window.setTimeout(() => {
        if (draggingRef.current || (pauseOnHover && hoverRef.current)) {
          tick();
          return;
        }
        controls = animate(rotation, rotation.get() - step, {
          duration: stepDuration / 1000,
          ease: [0.4, 0, 0.2, 1],
          onComplete: tick,
        });
      }, holdDuration);
    };

    tick();
    return () => {
      window.clearTimeout(timer);
      controls?.stop();
    };
  }, [
    autoPlay,
    count,
    holdDuration,
    pauseOnHover,
    reduceMotion,
    rotation,
    step,
    stepDuration,
  ]);

  /* ── Drag interaction ──────────────────────────────────────── */
  const dragRef = React.useRef({ left: 0, top: 0, angle: 0 });

  const pointerAngle = (e: React.PointerEvent) => {
    const { left, top } = dragRef.current;
    return Math.atan2(
      (e.clientY - top - size.h / 2) / (radiusY || 1),
      (e.clientX - left - size.w * centerXRatio) / (radiusX || 1),
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Si l'utilisateur clique sur un bouton interactif, ne pas détourner vers le drag !
    const targetEl = e.target as HTMLElement;
    if (targetEl.closest("button, a, input, select")) {
      return;
    }
    if (!draggable || (e.pointerType === "mouse" && e.button !== 0)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = { left: rect.left, top: rect.top, angle: 0 };
    dragRef.current.angle = pointerAngle(e);
    draggingRef.current = true;
    hasDraggedRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const angle = pointerAngle(e);
    const delta =
      ((angle - dragRef.current.angle + Math.PI * 3) % TAU) - Math.PI;
    if (Math.abs(delta) > 0.01) {
      hasDraggedRef.current = true;
    }
    dragRef.current.angle = angle;
    rotation.set(rotation.get() + delta * dragSensitivity);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const snapped = Math.round(rotation.get() / step) * step;
    if (reduceMotion) {
      rotation.set(snapped);
      return;
    }
    animate(rotation, snapped, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
  };

  const spinBy = (direction: number) => {
    const target = Math.round(rotation.get() / step) * step - direction * step;
    if (reduceMotion) {
      rotation.set(target);
      return;
    }
    animate(rotation, target, {
      duration: stepDuration / 1000,
      ease: [0.4, 0, 0.2, 1],
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const direction = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!direction) return;
    e.preventDefault();
    spinBy(direction);
  };

  /* ── Clic sur une carte : l'amène devant ET fait sortir ses infos ─ */
  const handleCardClick = (slotIndex: number) => {
    if (hasDraggedRef.current) return;

    const currentRot = rotation.get();
    const baseTarget = -slotIndex * step;
    const diff = (baseTarget - currentRot) % TAU;
    const shortestDiff = ((diff + Math.PI * 3) % TAU) - Math.PI;
    const target = currentRot + shortestDiff;

    // Fait tourner la carte vers le devant
    if (reduceMotion) {
      rotation.set(target);
    } else {
      animate(rotation, target, {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      });
    }

    // Déclenche l'affichage immédiat des informations du produit
    const item = items[slotIndex % count];
    if (item && item.onClick) {
      item.onClick();
    }
  };

  if (!count) return null;

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={props["aria-label"] ?? "Image carousel"}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "relative h-dvh w-full touch-pan-y overflow-hidden outline-none",
        draggable && "cursor-grab active:cursor-grabbing",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        className,
      )}
      style={style}
      {...props}
    >
      {/* Panneau de droite : Textes + Bouton Commander */}
      {showCenterLabel && centerLabel ? (
        <div
          className="pointer-events-none absolute inset-y-0 z-30 flex items-center justify-center px-6 sm:px-10 text-center"
          style={{
            left: size.w * centerXRatio + radiusX + cardW / 2,
            right: 0,
          }}
        >
          <div className="pointer-events-auto flex flex-col items-center justify-center">
            {typeof centerLabel === "function"
              ? centerLabel(items[activeIndex] ?? items[0], activeIndex)
              : centerLabel}
          </div>
        </div>
      ) : null}

      {/* Cartes en orbite 3D */}
      {Array.from({ length: slots }, (_, i) => (
        <WheelCard
          key={i}
          item={items[i % count]}
          decorative={i >= count}
          index={i}
          step={step}
          rotation={rotation}
          radiusX={radiusX}
          radiusY={radiusY}
          centerXRatio={centerXRatio}
          minScale={minScale}
          width={cardW}
          height={cardH}
          onCardClick={handleCardClick}
          onHoverChange={(hovered) => {
            hoverRef.current = hovered;
          }}
        />
      ))}
    </div>
  );
}

/* ── Carte ───────────────────────────────────────────────────── */
function WheelCard({
  item,
  index,
  step,
  rotation,
  radiusX,
  radiusY,
  centerXRatio,
  minScale,
  width,
  height,
  decorative,
  onCardClick,
  onHoverChange,
}: {
  item: HaloReelItem;
  index: number;
  step: number;
  rotation: MotionValue<number>;
  radiusX: number;
  radiusY: number;
  centerXRatio: number;
  minScale: number;
  width: number;
  height: number;
  decorative: boolean;
  onCardClick: (index: number) => void;
  onHoverChange: (hovered: boolean) => void;
}) {
  const cos = useTransform(rotation, (r) => Math.cos(index * step + r));
  const sin = useTransform(rotation, (r) => Math.sin(index * step + r));

  const x = useTransform(cos, (c) => c * radiusX);
  const y = useTransform(sin, (s) => s * radiusY);
  const scale = useTransform(
    cos,
    (c) => minScale + (1 - minScale) * ((c + 1) / 2),
  );
  const zIndex = useTransform(scale, (s) => Math.round(s * 1000));

  return (
    <motion.div
      role={decorative ? undefined : "group"}
      aria-roledescription={decorative ? undefined : "slide"}
      aria-hidden={decorative || undefined}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
      onClick={(e) => {
        e.stopPropagation();
        onCardClick(index);
      }}
      style={{
        x,
        y,
        scale,
        zIndex,
        width,
        height,
        left: `${centerXRatio * 100}%`,
        top: "50%",
        marginLeft: -width / 2,
        marginTop: -height / 2,
      }}
      className={cn(
        "absolute overflow-hidden rounded-3xl shadow-[0_20px_45px_-12px_rgba(20,16,12,0.22)] transition-all duration-300 border border-[#D5CFBE]/70 bg-[#FAF8F5] cursor-pointer hover:border-[#1A1918] hover:shadow-[0_25px_55px_-10px_rgba(20,16,12,0.3)]"
      )}
    >
      {item.src ? (
        <div className="relative w-full h-full group">
          <img
            src={item.src}
            alt={decorative ? "" : (item.alt ?? "")}
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {(item.title || item.price) && (
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
              {item.tag && (
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#D5CFBE] mb-1">
                  {item.tag}
                </span>
              )}
              {item.title && (
                <span className="font-serif-luxury text-base sm:text-lg font-medium leading-snug truncate drop-shadow-sm">
                  {item.title}
                </span>
              )}
              {item.price !== undefined && (
                <span className="text-sm font-mono font-medium text-white/95 mt-1">
                  {item.price} €
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-1 p-3 text-center bg-[#FAF8F5] text-[#1A1918]"
          style={{
            backgroundColor: item.bgColor,
            color: item.textColor,
          }}
        >
          {item.title ? (
            <span className="text-lg font-serif-luxury font-medium leading-tight">
              {item.title}
            </span>
          ) : null}
          {item.subtitle ? (
            <span className="text-[0.65rem] uppercase tracking-[0.2em] opacity-70 font-mono">
              {item.subtitle}
            </span>
          ) : null}
          {item.price !== undefined && (
            <span className="text-xs font-mono font-semibold mt-1">
              {item.price} €
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default HaloReel;
