/**
 * Synthèse de la Boussole : ce qu’elle tire d’une réponse une fois celle-ci terminée (extraction, puis transformation).
 * Le bloc dit comment la réponse est interprétée (`lecture`), montre le passage surligné et les notes structurées,
 * puis à quoi tout cela sert. Il porte toujours son étiquette : on ne le confond jamais avec la réponse de la personne.
 */
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { DEMO_CONTENT, type DemoRetained, type DimensionId } from "@/lib/demoContent";
import { DIMENSION_COLORS, dimensionVar } from "./demoTheme";

type Props = {
  retenu: DemoRetained;
  dimension: DimensionId;
  reducedMotion: boolean;
  /** Données structurées propres à l’échange (outil par outil, après un approfondissement). */
  children?: ReactNode;
};

const LABEL = "text-xs font-semibold uppercase tracking-[0.08em] text-slate-700";

export default function SyntheseCard({ retenu, dimension, reducedMotion, children }: Props) {
  const { lecture } = DEMO_CONTENT;
  const color = DIMENSION_COLORS[dimension];
  // Les rangées arrivent l’une après l’autre : on voit la réponse devenir des données.
  const row = (index: number) => (reducedMotion ? { initial: false as const } : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: index * 0.25 } });
  return (
    <motion.section
      data-demo-synthese
      aria-labelledby="demo-synthese-titre"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="scroll-mb-32 rounded-2xl border border-[#515792]/30 bg-[#515792]/[0.04] p-3.5 sm:p-5"
    >
      <h2 id="demo-synthese-titre" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        {lecture.syntheseTitre}
      </h2>
      <motion.p {...row(0)} className="mt-2 text-lg leading-snug text-slate-950">{retenu.lecture}</motion.p>

      {retenu.extrait && (
        <motion.div {...row(1)} className="mt-4">
          <p className={LABEL}>{lecture.syntheseExtrait}</p>
          <blockquote className="mt-1 border-l-4 bg-white px-3 py-2 text-base leading-snug text-slate-900 [border-left-color:var(--dim)]" style={dimensionVar(color.base)}>
            <mark className="rounded bg-[#E07428]/20 px-0.5 text-inherit">« {retenu.extrait} »</mark>
          </blockquote>
        </motion.div>
      )}

      {(retenu.tags ?? []).length > 0 && (
        <motion.div {...row(2)} className="mt-4">
          <p className={LABEL}>{lecture.syntheseNotes}</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {retenu.tags!.map((tag) => (
              <li key={tag} className="rounded-full border px-2.5 py-1 text-sm font-semibold text-slate-800" style={{ borderColor: `${color.base}80`, backgroundColor: `${color.base}14` }}>{tag}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {children && <motion.div {...row(3)} className="mt-4">{children}</motion.div>}

      <motion.p {...row(children ? 4 : 3)} className="mt-4 flex items-start gap-2 rounded-xl bg-white px-3 py-2.5 text-base leading-snug text-slate-900">
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#515792]" aria-hidden="true" />
        <span><span className="font-semibold">{lecture.syntheseSert}{" :"}</span> {retenu.sert}</span>
      </motion.p>
    </motion.section>
  );
}
