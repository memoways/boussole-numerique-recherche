/**
 * Forme d’onde décorative de la « réponse vocale », masquée aux lecteurs d’écran. Elle s’anime pendant que
 * la transcription s’écrit ; `level` (de 1 à 0) apaise son amplitude à mesure que la parole se termine.
 */
import { motion } from "framer-motion";

const BARS = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.55, 0.8, 0.4, 0.95, 0.6, 0.3, 0.7, 0.9, 0.45, 0.65, 1, 0.5, 0.8, 0.35, 0.6, 0.85, 0.4, 0.55];

export default function Waveform({ active, level = 1, reducedMotion }: { active: boolean; level?: number; reducedMotion: boolean }) {
  const animate = active && !reducedMotion;
  const amplitude = active ? 0.25 + 0.75 * Math.max(0, Math.min(1, level)) : 0.45;
  return (
    <div aria-hidden="true" className="flex h-8 items-center gap-[3px] transition-transform duration-300 ease-out" style={{ transform: `scaleY(${amplitude})` }}>
      {BARS.map((height, index) => (
        <motion.span
          key={index}
          className="w-1 rounded-full bg-[#515792] transition-opacity duration-500"
          style={{ height: `${Math.round(height * 100)}%`, opacity: active ? 1 : 0.35, originY: 0.5 }}
          animate={animate ? { scaleY: [0.35, 1, 0.5, 0.9, 0.35] } : { scaleY: 1 }}
          transition={animate ? { duration: 1.1, repeat: Infinity, delay: (index % 6) * 0.09, ease: "easeInOut" } : { duration: 0.4 }}
        />
      ))}
    </div>
  );
}
