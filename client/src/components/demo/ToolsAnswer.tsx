/**
 * Réponse d’un échange « outils », jouée à l’inverse d’une liste cochée d’avance : la personne parle d’abord,
 * la Boussole repère ce qu’elle a nommé, puis relance avec des boutons d’outils du même registre. La personne répond à
 * la voix : les boutons s’activent au fil de ce qu’elle dit et de nouveaux boutons arrivent, en rapport avec ce qui vient
 * d’être dit. Les autres restent non sélectionnés, mais un clic suffit à les ajouter. Elle classe ensuite l’ensemble du
 * plus au moins important. Sur un seul parcours, la Boussole creuse ce qui fonctionne et ce qui pèse sur les outils
 * en tête. Les boutons répondent au clic, sans rien enregistrer : le parcours joué reste celui de la personne fictive.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, Sparkles } from "lucide-react";
import { DEMO_CONTENT, fillTemplate, type DemoTools } from "@/lib/demoContent";
import { useSelectionProgress } from "./DemoAnswers";
import { phaseReached, TOOL_INTRO_MS, TOOL_WORD_MS, type PlaybackPhase } from "./useStepPlayback";

const DETECT_STEP_MS = 380;
const RANK_STEP_MS = 380;

type Props = {
  tools: DemoTools;
  options: string[];
  prenom: string;
  phase: PlaybackPhase;
  reducedMotion: boolean;
  /** Page de l’échange : 1 = repérage et propositions, 2 = classement et approfondissement. */
  part: 1 | 2;
};

/** Parole de la personne, sous la forme d’une citation courte rattachée à son prénom. */
function Said({ prenom, children }: { prenom: string; children: string }) {
  return (
    <p className="rounded-2xl bg-[#515792]/[0.06] px-4 py-3 text-base leading-relaxed text-slate-900 sm:ml-8">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">{prenom}</span>
      {"« "}{children}{" »"}
    </p>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      {children}
    </h2>
  );
}

export default function ToolsAnswer({ tools, options, prenom, phase, reducedMotion, part }: Props) {
  const { lecture } = DEMO_CONTENT;
  const reached = (target: PlaybackPhase) => phaseReached(phase, target);
  const mentioned = new Set(tools.cites.map((item) => item.outil));
  const approfondissement = tools.approfondissement;
  const words = tools.complement.split(/\s+/).filter(Boolean);

  // La réponse s’égrène mot à mot : un bouton s’active quand les mots qui le désignent ont été dits.
  const [spoken, setSpoken] = useState(0);
  const [manual, setManual] = useState<Set<string>>(new Set());
  const speaking = phase === "proposing" && !reducedMotion;
  useEffect(() => {
    if (!speaking) return;
    let count = 0;
    let timer = 0;
    const tick = () => {
      count += 1;
      setSpoken(count);
      if (count < words.length) timer = window.setTimeout(tick, TOOL_WORD_MS);
    };
    timer = window.setTimeout(tick, TOOL_INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [speaking, words.length]);
  const heard = reducedMotion || reached("pauseA") ? tools.complement : words.slice(0, spoken).join(" ");
  const active = new Set(tools.ajoutes.filter((item) => heard.toLowerCase().includes(item.dit.toLowerCase())).map((item) => item.outil));
  // Propositions de départ, puis celles qui arrivent après chaque outil activé, en rapport avec ce qui vient d’être dit.
  const arrivals = (tools.suites ?? []).filter((suite) => active.has(suite.apres)).flatMap((suite) => suite.propositions);
  const proposals = Array.from(new Set([...options.filter((option) => !mentioned.has(option) && option !== "Autre"), ...tools.ajoutes.map((item) => item.outil), ...arrivals]));
  const toggle = (outil: string) => setManual((current) => {
    const next = new Set(current);
    if (!next.delete(outil)) next.add(outil);
    return next;
  });

  const detectedCount = useSelectionProgress(tools.cites.length, phase === "detecting", reached("proposing"), DETECT_STEP_MS);
  const rankedCount = useSelectionProgress(tools.ordre.length, phase === "ranking", reached("probing"), RANK_STEP_MS);
  const fade = reducedMotion ? { initial: false as const } : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

  return (
    <div className="space-y-8">
      {part === 1 && reached("detecting") && (
        <motion.section {...fade} aria-label={fillTemplate(lecture.outilsReperes, { prenom })}>
          <SectionTitle>{fillTemplate(lecture.outilsReperes, { prenom })}</SectionTitle>
          <ul className="flex flex-wrap gap-2">
            {tools.cites.slice(0, detectedCount).map((item) => (
              <motion.li key={item.outil} {...fade} className="rounded-xl border border-[#515792] bg-[#515792]/10 px-3 py-2 text-sm text-slate-900">
                <span className="flex items-center gap-2 font-semibold">
                  <Check className="h-4 w-4 text-[#515792]" strokeWidth={3} aria-hidden="true" />
                  {item.outil}
                </span>
                <span className="mt-0.5 block text-xs italic text-slate-700">{"« "}{item.dit}{" »"}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      )}

      {part === 1 && reached("proposing") && (
        <motion.section {...fade} aria-label={fillTemplate(lecture.outilsPropositions, { prenom })}>
          <SectionTitle>{fillTemplate(lecture.outilsPropositions, { prenom })}</SectionTitle>
          <p className="mb-3 text-lg leading-snug text-slate-950">{tools.question}</p>
          <ul className="flex flex-wrap gap-2">
            {proposals.map((option) => {
              const byVoice = active.has(option);
              const pressed = byVoice || manual.has(option);
              return (
                <motion.li key={option} initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => !byVoice && toggle(option)}
                    className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors duration-300 ${pressed ? "border-[#E07428] bg-[#E07428]/10 font-semibold text-slate-900" : "border-dashed border-slate-300 bg-white text-slate-700 hover:border-[#E07428]"}`}
                  >
                    {pressed ? <Check className="h-4 w-4 text-[#A8440D]" strokeWidth={3} aria-hidden="true" /> : <Plus className="h-4 w-4 text-slate-500" aria-hidden="true" />}
                    {option}
                    {byVoice && <span className="sr-only"> ({lecture.outilsAjoute})</span>}
                  </button>
                </motion.li>
              );
            })}
          </ul>
          {heard && (
            <motion.div {...fade} className="mt-3">
              <Said prenom={prenom}>{heard}</Said>
            </motion.div>
          )}
          {reached("pauseA") && <p className="mt-3 text-sm text-slate-700">{lecture.outilsManuel}</p>}
        </motion.section>
      )}

      {part === 2 && reached("ranking") && (
        <motion.section {...fade} aria-label={lecture.outilsClassement}>
          <SectionTitle>{lecture.outilsClassement}</SectionTitle>
          <ol className="grid gap-2 sm:grid-cols-2">
            {tools.ordre.slice(0, rankedCount).map((outil, index) => (
              <motion.li key={outil} {...fade} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900">
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#515792] text-xs font-semibold text-white">{index + 1}</span>
                <span className={index < 3 ? "font-semibold" : ""}>{outil}</span>
              </motion.li>
            ))}
          </ol>
          {rankedCount > 0 && (
            <motion.div {...fade} className="mt-3">
              <Said prenom={prenom}>{tools.classement}</Said>
            </motion.div>
          )}
        </motion.section>
      )}

      {part === 2 && approfondissement && reached("probing") && (
        <motion.section {...fade} aria-label={lecture.outilsApprofondir}>
          <SectionTitle>{lecture.outilsApprofondir}</SectionTitle>
          <p className="mb-3 text-lg leading-snug text-slate-950">{approfondissement.question}</p>
          <Said prenom={prenom}>{approfondissement.transcription}</Said>
          <ul className="mt-4 grid gap-3 lg:grid-cols-3">
            {approfondissement.outils.map((item) => (
              <li key={item.outil} className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-snug">
                <p className="font-semibold text-slate-950">{item.outil}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#167A5E]">{lecture.outilsFonctionne}</p>
                <p className="mt-0.5 text-slate-800">{item.fonctionne}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#A8440D]">{lecture.outilsPese}</p>
                <p className="mt-0.5 text-slate-800">{item.pese}</p>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </div>
  );
}
