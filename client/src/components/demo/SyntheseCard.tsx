/**
 * Synthèse de la Boussole : ce qu’elle tire d’une réponse une fois celle-ci terminée (extraction, puis transformation).
 * La réponse devient une fiche de données structurées (champ, valeur) ; rien n’y répète la réponse ni les notes du panneau,
 * et rien n’y cite un passage absent de la page. Le bloc porte toujours son étiquette et une phrase qui dit ce que fait la Boussole.
 */
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DEMO_CONTENT, type DemoFicheRow } from "@/lib/demoContent";

type Props = {
  fiche: DemoFicheRow[];
  /** Vrai si un passage de la réponse, visible sur la page, vient d’être surligné. */
  highlighted: boolean;
  reducedMotion: boolean;
  /** Données structurées propres à l’échange (outil par outil, après un approfondissement). */
  children?: ReactNode;
};

export default function SyntheseCard({ fiche, highlighted, reducedMotion, children }: Props) {
  const { lecture } = DEMO_CONTENT;
  // Les lignes arrivent l’une après l’autre : on voit la réponse devenir des données.
  const row = (index: number) => (reducedMotion ? { initial: false as const } : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: index * 0.2 } });
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
      <p className="mt-1 text-sm leading-snug text-slate-700">{highlighted ? lecture.syntheseSurligne : lecture.syntheseSansSurlignage}</p>
      <dl className="mt-3 divide-y divide-slate-200 rounded-xl bg-white px-3 sm:px-4">
        {fiche.map((item, index) => (
          <motion.div key={item.champ} {...row(index)} className="grid gap-0.5 py-2.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-sm font-semibold text-slate-700">{item.champ}</dt>
            <dd className="text-base leading-snug text-slate-950">{item.valeur}</dd>
          </motion.div>
        ))}
      </dl>
      {children && <motion.div {...row(fiche.length)} className="mt-4">{children}</motion.div>}
    </motion.section>
  );
}
