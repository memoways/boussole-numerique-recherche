/**
 * Radar animé — même langage visuel et interactions que le radar de la page d’accueil.
 * Il peut devenir exploratoire dans le deck partenaire, sans panneau décoratif intermédiaire.
 */
import { useEffect, useRef, useState } from "react";

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

export function AnimatedRadarGraphic({
  dimensions,
  className = "h-56 w-56 sm:h-64 sm:w-64",
  ariaLabel = "Radar animé des cinq dimensions",
  interactive = false,
}: AnimatedRadarGraphicProps) {
  const [values, setValues] = useState(PROFILE_A);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef(0);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);
  const cx = 150;
  const cy = 150;
  const radius = 100;
  const controlRadius = 138;

  useEffect(() => {
    const duration = 4000;
    const tick = (timestamp: number) => {
      const delta = timestamp - (lastTimeRef.current || timestamp);
      lastTimeRef.current = timestamp;
      progressRef.current = Math.min(progressRef.current + delta / duration, 1);
      const ease = (1 - Math.cos(progressRef.current * Math.PI)) / 2;
      const from = phaseRef.current === 0 ? PROFILE_A : PROFILE_B;
      const to = phaseRef.current === 0 ? PROFILE_B : PROFILE_A;
      setValues(from.map((value, index) => value + (to[index] - value) * ease));
      if (progressRef.current >= 1) {
        progressRef.current = 0;
        phaseRef.current ^= 1;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
