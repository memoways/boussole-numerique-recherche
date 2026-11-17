/**
 * Radar illustratif — même langage visuel et interactions que le radar de la page d’accueil.
 * Il joue une seule lecture de 4 s et reste statique sous « mouvement réduit ».
 * Il peut devenir exploratoire dans le deck partenaire, sans panneau décoratif intermédiaire.
 */
import { useEffect, useState } from "react";

export type RadarDimension = {
  label: string;
  couleur: string;
  emoji?: string;
  resume?: string;
};

type AnimatedRadarGraphicProps = {
  dimensions: RadarDimension[];
  className?: string;
  ariaLabel?: string;
  interactive?: boolean;
};

const PROFILE_A = [0.72, 0.5, 0.83, 0.45, 0.68];
const PROFILE_B = [0.4, 0.78, 0.55, 0.82, 0.35];
const READING_DURATION_MS = 4000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Préférence système de mouvement réduit, suivie en direct (WCAG 2.2.2 et 2.3.3). */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(REDUCED_MOTION_QUERY).matches);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function AnimatedRadarGraphic({
  dimensions,
  className = "h-56 w-56 sm:h-64 sm:w-64",
  ariaLabel = "Radar illustratif des cinq dimensions",
  interactive = false,
}: AnimatedRadarGraphicProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [values, setValues] = useState(PROFILE_A);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cx = 150;
  const cy = 150;
  const radius = 100;
  const controlRadius = 138;

  // Une seule lecture de 4 s (profil A vers profil B), puis le radar reste immobile.
  // Sous « mouvement réduit », il reste statique sur le profil A et s'arrête si la préférence change en cours de lecture.
  useEffect(() => {
    if (reducedMotion) {
      setValues(PROFILE_A);
      return;
    }
    let frame = 0;
    let start: number | null = null;
    const tick = (timestamp: number) => {
      start ??= timestamp;
      const progress = Math.min((timestamp - start) / READING_DURATION_MS, 1);
      const ease = (1 - Math.cos(progress * Math.PI)) / 2;
      setValues(PROFILE_A.map((value, index) => value + (PROFILE_B[index] - value) * ease));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  const points = dimensions.map((_, index) => {
    const angle = (index * 72 - 90) * Math.PI / 180;
    return {
      x: cx + radius * (values[index] ?? 0.6) * Math.cos(angle),
      y: cy + radius * (values[index] ?? 0.6) * Math.sin(angle),
    };
  });
  const shape = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ") + " Z";
  const polygon = (scale: number) => dimensions.map((_, index) => {
    const angle = (index * 72 - 90) * Math.PI / 180;
    return `${(cx + radius * scale * Math.cos(angle)).toFixed(1)},${(cy + radius * scale * Math.sin(angle)).toFixed(1)}`;
  }).join(" ");

  const activeDimension = dimensions[activeIndex];

  return (
    <div className="flex w-full flex-col items-center">
      <div className={className}>
        <svg viewBox="0 0 300 300" className="h-full w-full" style={{ overflow: "visible" }} role={interactive ? "group" : "img"} aria-label={ariaLabel}>
        {[1, 0.75, 0.5, 0.25].map((scale) => <polygon key={scale} points={polygon(scale)} fill="none" stroke="#e5e7eb" strokeWidth="1" />)}
        {dimensions.map((_, index) => {
          const angle = (index * 72 - 90) * Math.PI / 180;
          return <line key={index} x1={cx} y1={cy} x2={(cx + radius * Math.cos(angle)).toFixed(1)} y2={(cy + radius * Math.sin(angle)).toFixed(1)} stroke="#e5e7eb" strokeWidth="1" />;
        })}
        <path d={shape} fill="#515792" fillOpacity="0.18" stroke="#515792" strokeWidth="2" strokeLinejoin="round" />
        {points.map((point, index) => <circle key={dimensions[index].label} cx={point.x.toFixed(2)} cy={point.y.toFixed(2)} r="4.5" fill={dimensions[index].couleur} stroke="white" strokeWidth="1.5" aria-hidden="true" />)}
        {interactive && dimensions.map((dimension, index) => {
          const angle = (index * 72 - 90) * Math.PI / 180;
          const controlX = cx + controlRadius * Math.cos(angle);
          const controlY = cy + controlRadius * Math.sin(angle);
          const active = activeIndex === index;
          const hovered = hoveredIndex === index;
          const controlSize = active || hovered ? 18 : 16;
          const activate = () => setActiveIndex(index);
          return <g
            key={`${dimension.label}-control`}
            role="button"
            tabIndex={0}
            aria-label={`Afficher la dimension ${dimension.label}`}
            aria-pressed={active}
            style={{ cursor: "pointer", outline: "none" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => { setHoveredIndex(index); activate(); }}
            onBlur={() => setHoveredIndex(null)}
            onClick={activate}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activate();
              }
            }}
          >
            <title>{dimension.label}</title>
            <circle cx={controlX.toFixed(2)} cy={controlY.toFixed(2)} r="23" fill="transparent" />
            <circle cx={controlX.toFixed(2)} cy={controlY.toFixed(2)} r={controlSize} fill={active ? `${dimension.couleur}16` : "white"} stroke={dimension.couleur} strokeWidth={active || hovered ? "2.5" : "1.5"} style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.12))", transition: "r 180ms ease, fill 180ms ease, stroke-width 180ms ease" }} />
            <text x={controlX.toFixed(2)} y={controlY.toFixed(2)} textAnchor="middle" dominantBaseline="middle" fontSize="14" aria-hidden="true">{dimension.emoji ?? "•"}</text>
          </g>;
        })}
        </svg>
      </div>
      {interactive && activeDimension && (
        <p className="mt-4 max-w-[320px] text-center text-sm leading-relaxed text-slate-500" aria-live="polite">
          <span className="font-bold" style={{ color: activeDimension.couleur }}>{activeDimension.label}</span>
          {activeDimension.resume ? ` — ${activeDimension.resume}` : ". Sélectionnez une icône autour du radar pour explorer une autre dimension."}
        </p>
      )}
    </div>
  );
}
