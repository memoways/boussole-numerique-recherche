/**
 * Toute question de la Boussole s’affiche dans ce bloc, assez grand pour ne jamais se perdre entre les réponses :
 * la question de l’échange, la relance sur d’autres outils, le classement, l’approfondissement, la précision et la validation.
 * Chaque page n’affiche que ses propres questions : la question de la page précédente n’est jamais reprise.
 */
import { Compass } from "lucide-react";
import { motion } from "framer-motion";
import { dimensionVar } from "./demoTheme";

type Props = {
  label: string;
  text: string;
  /** Couleur de la dimension, portée par le filet de gauche. */
  color: string;
  /** `titre` : la première question de la page (h1). `relance` : une autre question dans la même page (h2). */
  variant?: "titre" | "relance";
  id?: string;
  reducedMotion?: boolean;
};

export default function QuestionCard({ label, text, color, variant = "titre", id, reducedMotion = false }: Props) {
  const Heading = variant === "relance" ? "h2" : "h1";
  return (
    <motion.div
      data-demo-question={variant}
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-200 border-l-4 bg-white p-3.5 [border-left-color:var(--dim)] sm:p-5"
      style={dimensionVar(color)}
    >
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">
        <Compass className="h-4 w-4" aria-hidden="true" />
        {label}
      </p>
      <Heading id={id} className={`mt-1.5 font-normal leading-snug text-slate-950 text-xl sm:text-2xl`}>{text}</Heading>
    </motion.div>
  );
}
