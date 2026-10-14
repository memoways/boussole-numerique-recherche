/** Point d’étape en fin de dimension : un constat court, déculpabilisant, et un ordre de grandeur marqué « illustratif ». */
import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { DEMO_CONTENT, type DimensionId } from "@/lib/demoContent";
import { DIMENSION_COLORS } from "./demoTheme";

type Props = { dimension: DimensionId; texte: string; ordreDeGrandeur: string | null; reducedMotion: boolean };

export default function MilestoneCard({ dimension, texte, ordreDeGrandeur, reducedMotion }: Props) {
  const color = DIMENSION_COLORS[dimension];
  return (
    <motion.aside
      aria-label={DEMO_CONTENT.lecture.pointEtapeTitre}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="scroll-mb-32 rounded-2xl border-2 bg-white p-5 sm:p-6"
      style={{ borderColor: `${color.base}66` }}
    >
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: color.text }}>
        <Flag className="h-4 w-4" aria-hidden="true" />
        {DEMO_CONTENT.lecture.pointEtapeTitre} · {DEMO_CONTENT.dimensions[dimension]}
      </p>
      <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-900">{texte}</p>
      {ordreDeGrandeur && <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm leading-relaxed text-slate-700">{ordreDeGrandeur}</p>}
    </motion.aside>
  );
}
