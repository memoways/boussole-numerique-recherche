/** Forme d’onde décorative de la « réponse vocale » : animée pendant la parole, statique sinon. Masquée aux lecteurs d’écran. */
import { motion } from "framer-motion";

const BARS = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.55, 0.8, 0.4, 0.95, 0.6, 0.3, 0.7, 0.9, 0.45, 0.65, 1, 0.5, 0.8, 0.35, 0.6, 0.85, 0.4, 0.55];

export default function Waveform({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const animate = active && !reducedMotion;
  return (
    <div aria-hidden="true" className="flex h-10 items-center gap-[3px]">
      {BARS.map((height, index) => (
        <motion.span
          key={index}
          className="w-1 rounded-full bg-[#515792]"
          style={{ height: `${Math.round(height * 100)}%`, opacity: active ? 1 : 0.35, originY: 0.5 }}
          animate={animate ? { scaleY: [0.35, 1, 0.5, 0.9, 0.35] } : { scaleY: active ? 1 : 0.45 }}
          transition={animate ? { duration: 1.1, repeat: Infinity, delay: (index % 6) * 0.09, ease: "easeInOut" } : { duration: 0.2 }}
        />
      ))}
    </div>
  );
}
