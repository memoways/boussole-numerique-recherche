/**
 * Radar animé — même langage visuel que le radar de la page d’accueil.
 * Utilisé comme illustration non interactive dans le deck partenaire.
 */
import { useEffect, useRef, useState } from "react";

export type RadarDimension = {
  label: string;
  couleur: string;
};

type AnimatedRadarGraphicProps = {
  dimensions: RadarDimension[];
  className?: string;
  ariaLabel?: string;
};

const PROFILE_A = [0.72, 0.5, 0.83, 0.45, 0.68];
const PROFILE_B = [0.4, 0.78, 0.55, 0.82, 0.35];

export function AnimatedRadarGraphic({
  dimensions,
  className = "h-56 w-56 sm:h-64 sm:w-64",
  ariaLabel = "Radar animé des cinq dimensions",
}: AnimatedRadarGraphicProps) {
  const [values, setValues] = useState(PROFILE_A);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef(0);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);
  const cx = 150;
  const cy = 150;
  const radius = 100;

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

  return <svg viewBox="0 0 300 300" className={className} style={{ overflow: "visible" }} role="img" aria-label={ariaLabel}>
    {[1, 0.75, 0.5, 0.25].map((scale) => <polygon key={scale} points={polygon(scale)} fill="none" stroke="#e5e7eb" strokeWidth="1" />)}
    {dimensions.map((_, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      return <line key={index} x1={cx} y1={cy} x2={(cx + radius * Math.cos(angle)).toFixed(1)} y2={(cy + radius * Math.sin(angle)).toFixed(1)} stroke="#e5e7eb" strokeWidth="1" />;
    })}
    <path d={shape} fill="#515792" fillOpacity="0.18" stroke="#515792" strokeWidth="2" strokeLinejoin="round" />
    {points.map((point, index) => <circle key={dimensions[index].label} cx={point.x.toFixed(2)} cy={point.y.toFixed(2)} r="4.5" fill={dimensions[index].couleur} stroke="white" strokeWidth="1.5" />)}
  </svg>;
}
