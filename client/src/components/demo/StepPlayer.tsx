/**
 * Une interaction jouée de bout en bout, selon la grammaire du PRD : la Boussole pose la question,
 * la personne répond (cases, scénario ou voix), la Boussole prend note puis retient. Le panneau
 * « Ce que la Boussole retient » est la somme des étapes précédentes, plus celle-ci une fois reçue.
 * Sous la réponse ne restent que la validation humaine (curseurs induits, correction) et, quand ça
 * fait sens, « D’autres regards » : notes et extraits ne sont plus répétés hors du panneau (lot 4).
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Compass, FastForward, Mic, MousePointerClick } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DEMO_CONTENT,
  fillTemplate,
  getGauges,
  getRetainedItems,
  getRetainedUntil,
  stepPath,
  type DemoPersona,
  type DemoStep,
  type NamedStep,
} from "@/lib/demoContent";
import { ChecklistAnswer, InducedSliders, LevelHelp, MemoryEcho, ScenarioAnswer } from "./DemoAnswers";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";
import { DIMENSION_COLORS, dimensionVar } from "./demoTheme";
import { MemoryColumn, MemoryDrawer } from "./MemoryPanel";
import MilestoneCard from "./MilestoneCard";
import RelatedResources from "./RelatedResources";
import TypedTranscript from "./TypedTranscript";
import { useDemoKeyboard } from "./useDemoKeyboard";
import { useStepPlayback } from "./useStepPlayback";
import Waveform from "./Waveform";

/** Une étape numérotée, ou l’écran « numérique idéal » (sans dimension ni numéro). */
export type PlayerStep = Omit<DemoStep, "id" | "dimension"> & { id: number | null; dimension: DemoStep["dimension"] | null };

type Props = {
  persona: DemoPersona;
  step: PlayerStep;
  previous: NamedStep | number | null;
  next: NamedStep | number | null;
  continueLabel?: string;
  panelOpen: boolean;
  onTogglePanel: () => void;
};

export default function StepPlayer({ persona, step, previous, next, continueLabel, panelOpen, onTogglePanel }: Props) {
  const { lecture, dimensions } = DEMO_CONTENT;
  const [, navigate] = useLocation();
  const choix = step.reponse.choix ?? [];
  const retainedItems = step.id === null ? [] : getRetainedItems(step as DemoStep);
  const sliders = step.retenu?.curseurs ?? [];
  const hasCorrection = sliders.some((slider) => slider.corrigeA);
  const playback = useStepPlayback({
    choices: step.type === "cases" || step.type === "scenario" ? choix.length : 0,
    transcription: step.reponse.transcription,
    hasRetained: retainedItems.length > 0,
    hasCorrection,
  });
  const { phase, reducedMotion, reached } = playback;

  const answerRef = useRef<HTMLDivElement>(null);
  const inducedRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLElement>(null);
  const milestoneRef = useRef<HTMLDivElement>(null);

  // Le dernier bloc apparu reste visible, y compris sous la barre de commandes du smartphone.
  useEffect(() => {
    const doneTarget = step.pointEtape ? milestoneRef.current : resourcesRef.current;
    const target = phase === "done" ? doneTarget : phase === "retained" ? inducedRef.current : phase === "transcribing" || phase === "selecting" ? answerRef.current : null;
    target?.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
  }, [phase, reducedMotion, step.pointEtape]);

  const go = (target: NamedStep | number | null) => { if (target !== null) navigate(stepPath(persona.id, target)); };
  const primaryAction = playback.isWaiting ? playback.start : playback.isPlaying ? playback.skip : () => go(next);
  useDemoKeyboard({ onAdvance: primaryAction, onNext: () => go(next), onPrevious: () => go(previous) });

  const receptionPlayed = reached("retained");
  const panelStep = step.id ?? persona.etapes.length + 1;
  const panelProps = {
    persona,
    items: getRetainedUntil(persona, panelStep, receptionPlayed),
    gauges: getGauges(persona, panelStep, receptionPlayed),
    currentStep: receptionPlayed ? step.id : null,
    highlight: step.rebond?.rappel,
    reducedMotion,
  };

  const color = step.dimension ? DIMENSION_COLORS[step.dimension] : DIMENSION_COLORS.outils;
  const isSliderQuestion = step.type === "curseurs";
  const showChoices = step.type === "cases" || step.type === "scenario";
  const voiceStarted = reached("transcribing");
  // L’onde s’apaise sur le dernier quart de la transcription et s’arrête avec elle.
  const speechLevel = playback.totalWords > 0 ? Math.min(1, (1 - playback.wordsShown / playback.totalWords) * 4) : 0;
  const fade = (delay = 0) => (reducedMotion ? { initial: false as const } : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } });
  const correction = sliders.find((slider) => slider.corrigeA);
  const announce = receptionPlayed && retainedItems.length > 0 ? fillTemplate(lecture.annonceRetenu, { elements: retainedItems.map((item) => (item.kind === "curseur" ? `${item.texte} : ${item.niveau}` : item.texte)).join(", ") }) : "";

  return (
    <div className={`lg:grid lg:gap-8 ${panelOpen ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : "lg:grid-cols-[minmax(0,1fr)_auto]"}`}>
      <section aria-labelledby="demo-question" className="min-w-0 space-y-3 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
          <p className="font-semibold" style={{ color: color.text }}>
            {step.id === null ? DEMO_CONTENT.ideal.libelle : `${fillTemplate(lecture.echange, { n: String(step.id), total: String(persona.etapes.length) })} · ${dimensions[step.dimension!]}`}
          </p>
          <Link href={stepPath(persona.id, "restitution")} className="font-semibold text-slate-700 underline underline-offset-4 hover:text-[#515792]">{lecture.allerRestitution}</Link>
        </div>

        {step.rebond && <MemoryEcho etape={step.rebond.etape} rappel={step.rebond.rappel} reducedMotion={reducedMotion} />}

        <motion.div {...fade()} className="rounded-2xl border border-slate-200 border-l-4 bg-white p-3.5 [border-left-color:var(--dim)] sm:p-5" style={dimensionVar(color.base)}>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">
            <Compass className="h-4 w-4" aria-hidden="true" />
            {lecture.boussole}
          </p>
          <h1 id="demo-question" className="mt-1.5 text-xl font-normal leading-snug text-slate-950 sm:text-2xl">{step.question}</h1>
          {isSliderQuestion && (
            <div className="mt-5">
              {step.retenu?.resume && <p data-demo-resume className="mb-3 text-base leading-relaxed text-slate-800">{step.retenu.resume}</p>}
              <InducedSliders sliders={sliders} corrected={receptionPlayed} reducedMotion={reducedMotion} />
              <LevelHelp />
              {step.questionSuite && <p className="mt-3 text-lg font-normal text-slate-950 sm:text-xl">{step.questionSuite}</p>}
            </div>
          )}
        </motion.div>

        {showChoices && step.options && (
          <motion.div {...fade(0.15)}>
            {step.type === "cases"
              ? <ChecklistAnswer options={step.options} choix={choix} selecting={phase === "selecting"} finished={voiceStarted} prenom={persona.prenom} />
              : <ScenarioAnswer options={step.options} choix={choix} selecting={phase === "selecting"} finished={voiceStarted} prenom={persona.prenom} />}
          </motion.div>
        )}

        {voiceStarted && (
          <motion.div ref={answerRef} {...fade()} className="scroll-mb-32 rounded-2xl bg-[#515792]/[0.06] p-3.5 sm:ml-8 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">{persona.prenom}</p>
              <Waveform active={phase === "transcribing"} level={speechLevel} reducedMotion={reducedMotion} />
            </div>
            <div className="mt-2">
              <TypedTranscript
                text={step.reponse.transcription}
                wordsShown={playback.wordsShown}
                typing={phase === "transcribing"}
                highlight={step.retenu?.extrait}
                showHighlight={receptionPlayed}
                onAccelerate={playback.accelerate}
                hint={lecture.accelerer}
              />
            </div>
          </motion.div>
        )}

        {phase === "digesting" && (
          <p role="status" className="flex items-center gap-3 text-sm font-semibold text-slate-700">
            <motion.span
              aria-hidden="true"
              className="h-3 w-3 rounded-full bg-[#515792]"
              animate={reducedMotion ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            {lecture.digestion}
          </p>
        )}

        {/* Validation humaine : la Boussole propose des niveaux d’après la réponse, la personne valide ou corrige. */}
        {receptionPlayed && sliders.length > 0 && !isSliderQuestion && (
          <motion.div ref={inducedRef} {...fade()} data-demo-induction className="scroll-mb-32 rounded-2xl border border-[#515792]/25 bg-white p-3 sm:ml-8 sm:p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#515792]">{lecture.induction}</p>
            {step.retenu?.resume && <p data-demo-resume className="mb-3 mt-1 text-base leading-relaxed text-slate-800">{step.retenu.resume}</p>}
            <InducedSliders sliders={sliders} corrected={false} reducedMotion={reducedMotion} />
            <p className="mt-3 text-sm text-slate-700">{fillTemplate(lecture.valide, { prenom: persona.prenom })}</p>
            <LevelHelp />
          </motion.div>
        )}
        {receptionPlayed && isSliderQuestion && correction && (
          <motion.div ref={inducedRef} {...fade()} className="scroll-mb-32 sm:ml-8">
            <p className="text-sm font-semibold text-[#A8440D]">
              {fillTemplate(lecture.corrige, { prenom: persona.prenom, libelle: correction.libelle, avant: correction.valeur, apres: correction.corrigeA! })}
            </p>
          </motion.div>
        )}
        <p className="sr-only" aria-live="polite">{announce}</p>

        {playback.isWaiting && step.id === 1 && (
          <p data-demo-consigne className="flex items-start gap-2 rounded-xl border border-[#E07428]/50 bg-[#E07428]/10 px-3 py-2 text-sm font-semibold leading-snug text-slate-900">
            <MousePointerClick className="mt-0.5 h-4 w-4 shrink-0 text-[#A8440D]" aria-hidden="true" />
            {lecture.consigne}
          </p>
        )}

        {playback.isDone && step.id !== null && (step.ressources ?? []).length > 0 && (
          <RelatedResources ref={resourcesRef} personaId={persona.id} etape={step.id} ressources={step.ressources!} reducedMotion={reducedMotion} />
        )}

        {playback.isDone && step.pointEtape && step.dimension && step.id !== null && (
          <div ref={milestoneRef}>
            <MilestoneCard personaId={persona.id} etape={step.id} dimension={step.dimension} texte={step.pointEtape.texte} ordreDeGrandeur={step.pointEtape.ordreDeGrandeur} reducedMotion={reducedMotion} />
          </div>
        )}

        {/* Sur smartphone, le bouton flottant du tiroir ne recouvre jamais le dernier bloc de l’échange. */}
        <div aria-hidden="true" className="h-10 lg:hidden" />
        <DemoActions compact>
          {previous !== null ? (
            <Link href={stepPath(persona.id, previous)} className={`${demoSecondaryButton} px-4 sm:px-6`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {lecture.retour}
            </Link>
          ) : <span />}
          {/* Un seul bouton dont le libellé suit la phase : le focus clavier n’est jamais perdu. */}
          <button type="button" onClick={primaryAction} disabled={playback.isDone && next === null} className={`${playback.isPlaying ? demoSecondaryButton : demoPrimaryButton} flex-1 sm:flex-none`}>
            {playback.isWaiting && <Mic className="h-5 w-5" aria-hidden="true" />}
            {playback.isPlaying && <FastForward className="h-4 w-4" aria-hidden="true" />}
            {playback.isWaiting ? fillTemplate(lecture.reponseDe, { prenom: persona.prenom }) : playback.isPlaying ? lecture.passerAnimation : continueLabel ?? lecture.continuer}
            {playback.isDone && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
          </button>
          <MemoryDrawer {...panelProps} />
        </DemoActions>
      </section>

      <MemoryColumn {...panelProps} open={panelOpen} onToggle={onTogglePanel} />
    </div>
  );
}
