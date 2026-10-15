/**
 * Rendus de réponse selon le type d’interaction : cases cochées une à une, micro-scénario A/B/C/D,
 * curseurs qualitatifs induits (avec correction animée) et rebond mémoire. Aucun n’est interactif :
 * c’est la personne fictive qui répond, la page se contente de le montrer.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, History, Info } from "lucide-react";
import { DEMO_CONTENT, fillTemplate, type DemoSlider, type RadarLevel } from "@/lib/demoContent";

const SELECTION_STEP_MS = 420;

/** Nombre d’éléments déjà « choisis » : progresse pendant la sélection, tout est choisi ensuite. */
function useSelectionProgress(total: number, selecting: boolean, finished: boolean) {
  const [count, setCount] = useState(finished ? total : 0);
  useEffect(() => {
    if (finished) { setCount(total); return; }
    if (!selecting) { setCount(0); return; }
    setCount(0);
    const timer = window.setInterval(() => setCount((value) => Math.min(total, value + 1)), SELECTION_STEP_MS);
    return () => window.clearInterval(timer);
  }, [total, selecting, finished]);
  return count;
}

type ChoiceProps = { options: string[]; choix: string[]; selecting: boolean; finished: boolean; prenom: string };

export function ChecklistAnswer({ options, choix, selecting, finished, prenom }: ChoiceProps) {
  const count = useSelectionProgress(choix.length, selecting, finished);
  const checked = new Set(choix.slice(0, count));
  return (
    <div>
      {(selecting || finished) && <p className="mb-2 text-sm font-semibold text-slate-700">{fillTemplate(DEMO_CONTENT.lecture.selectionCases, { prenom })}</p>}
      <ul className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isChecked = checked.has(option);
          return (
            <li
              key={option}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors duration-300 ${isChecked ? "border-[#515792] bg-[#515792]/10 font-semibold text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
            >
              <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors duration-300 ${isChecked ? "border-[#515792] bg-[#515792] text-white" : "border-slate-400 bg-white"}`}>
                {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              {option}
              {isChecked && <span className="sr-only"> (coché)</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const LETTERS = ["A", "B", "C", "D", "E"];

export function ScenarioAnswer({ options, choix, selecting, finished, prenom }: ChoiceProps) {
  const count = useSelectionProgress(1, selecting, finished);
  const chosen = count > 0 ? choix[0] : null;
  return (
    <div>
      {(selecting || finished) && <p className="mb-2 text-sm font-semibold text-slate-700">{fillTemplate(DEMO_CONTENT.lecture.selectionScenario, { prenom })}</p>}
      <ul className="space-y-2">
        {options.map((option, index) => {
          const isChosen = option === chosen;
          return (
            <li
              key={option}
              className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 text-sm leading-snug transition-colors duration-300 ${isChosen ? "border-[#E07428] bg-[#E07428]/10 font-semibold text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
            >
              <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${isChosen ? "bg-[#E07428] text-[#1F2937]" : "bg-slate-100 text-slate-700"}`}>{LETTERS[index]}</span>
              <span>
                <span className="sr-only">{LETTERS[index]} : </span>
                {option}
                {isChosen && <span className="sr-only"> (choisi)</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type SlidersProps = {
  sliders: DemoSlider[];
  /** Vrai une fois la correction jouée : les curseurs corrigés glissent vers leur nouvelle position. */
  corrected: boolean;
  reducedMotion: boolean;
};

/** Curseurs qualitatifs à quatre crans, sans chiffre : seuls les niveaux nommés sont affichés. */
export function InducedSliders({ sliders, corrected, reducedMotion }: SlidersProps) {
  const levels = DEMO_CONTENT.niveauxRadar;
  return (
    <ul className="space-y-4">
      {sliders.map((slider) => {
        const level: RadarLevel = corrected && slider.corrigeA ? slider.corrigeA : slider.valeur;
        const position = levels.indexOf(level);
        const isCorrection = corrected && Boolean(slider.corrigeA);
        return (
          <li key={slider.libelle} className={`rounded-xl border bg-white px-4 py-3 transition-colors duration-500 ${isCorrection ? "border-[#E07428]" : "border-slate-200"}`}>
            <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-base">
              <span className="text-slate-900">{slider.libelle}</span>
              <span className={`font-semibold ${isCorrection ? "text-[#A8440D]" : "text-[#515792]"}`}>{level}</span>
            </p>
            {/* Ce qui justifie le niveau : les mots de la personne, ou le fait qu’elle n’en a pas encore parlé. */}
            {(slider.dit || slider.nonAborde) && (
              <p data-demo-indice className="mt-1 text-sm text-slate-700">
                {slider.dit ? <>{DEMO_CONTENT.lecture.indiceDit}{"\u00a0: «\u00a0"}<span className="italic">{slider.dit}</span>{"\u00a0»"}</> : DEMO_CONTENT.lecture.indiceNonAborde}
              </p>
            )}
            <div aria-hidden="true" className="mt-3">
              <div className="relative mx-2 h-1.5 rounded-full bg-slate-200">
                {levels.map((item, index) => (
                  <span key={item} className="absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-slate-300" style={{ left: `${(index / (levels.length - 1)) * 100}%` }} />
                ))}
                <motion.span
                  className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow ${isCorrection ? "bg-[#E07428]" : "bg-[#515792]"}`}
                  initial={false}
                  animate={{ left: `${(position / (levels.length - 1)) * 100}%` }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: "easeInOut" }}
                />
              </div>
              {/* À 390 px, « Improvisation » dépasse un quart de largeur : césure française plutôt que chevauchement. */}
              <div lang="fr" className="mt-2 grid grid-cols-4 gap-1 text-[10px] leading-tight text-slate-600 hyphens-auto sm:text-[11px]">
                {levels.map((item, index) => (
                  <span key={item} className={index === 0 ? "text-left" : index === levels.length - 1 ? "text-right" : "text-center"}>{item}</span>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Définition de chaque niveau de l’échelle, pour que personne n’ait à deviner ce que veut dire un mot. */
export function LevelDefinitions({ className = "" }: { className?: string }) {
  const { niveauxRadar, niveauxDefinitions } = DEMO_CONTENT;
  return (
    <dl className={`grid gap-2 text-sm sm:grid-cols-2 ${className}`}>
      {niveauxRadar.map((level) => (
        <div key={level} className="rounded-lg bg-slate-50 px-3 py-2">
          <dt className="font-semibold text-[#515792]">{level}</dt>
          <dd className="mt-0.5 leading-snug text-slate-700">{niveauxDefinitions[level]}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Aide repliable sous les curseurs : les définitions de l’échelle, à ouvrir au besoin. */
export function LevelHelp() {
  return (
    <details className="mt-3 text-sm">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-semibold text-[#515792] underline underline-offset-4 [&::-webkit-details-marker]:hidden">
        <Info className="h-4 w-4" aria-hidden="true" />
        {DEMO_CONTENT.niveauxTitre}
      </summary>
      <LevelDefinitions className="mt-2" />
    </details>
  );
}

/** Rebond mémoire : la Boussole cite un élément retenu plus tôt, mis en évidence aussi dans le panneau. */
export function MemoryEcho({ etape, rappel, reducedMotion }: { etape: number; rappel: string; reducedMotion: boolean }) {
  const { lecture } = DEMO_CONTENT;
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-3 rounded-xl border-l-4 border-[#E07428] bg-[#E07428]/10 px-4 py-3"
    >
      <History className="mt-0.5 h-4 w-4 shrink-0 text-[#A8440D]" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-slate-800">
        <span className="font-semibold text-[#A8440D]">{lecture.rebondTitre}</span>
        <span className="text-slate-600"> ({fillTemplate(lecture.rebondEchange, { n: String(etape) })})</span> : « {rappel} »
      </p>
    </motion.div>
  );
}
