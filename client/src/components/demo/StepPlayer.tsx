/**
 * Une interaction jouée de bout en bout, selon la grammaire du PRD : la Boussole pose la question (en grand),
 * la personne répond (cases, scénario ou voix, toujours en playback), puis la Boussole en tire une synthèse étiquetée
 * (extraction puis transformation : la réponse rangée dans une fiche de données structurées), parfois une précision
 * (relance à la voix). Les niveaux qualitatifs se valident une seule fois, à la fin de chaque dimension, sur leur propre page :
 * la personne valide ou corrige à la voix. « D’autres regards » et « Un premier regard » viennent en dernier.
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, FastForward, Mic, MousePointerClick, Plus } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DEMO_CONTENT,
  fillTemplate,
  getDimensionSliders,
  getGauges,
  getRetainedItems,
  getRetainedUntil,
  isDimensionEnd,
  stepPath,
  type DemoPersona,
  type DemoStep,
  type NamedStep,
} from "@/lib/demoContent";
import { ChecklistAnswer, InducedSliders, LevelHelp, MemoryEcho, ScenarioAnswer } from "./DemoAnswers";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";
import { DIMENSION_COLORS } from "./demoTheme";
import { MemoryColumn, MemoryDrawer } from "./MemoryPanel";
import MilestoneCard from "./MilestoneCard";
import QuestionCard from "./QuestionCard";
import RelatedResources from "./RelatedResources";
import SpokenBubble from "./SpokenBubble";
import SyntheseCard from "./SyntheseCard";
import ToolsAnswer, { ToolFocusCards } from "./ToolsAnswer";
import TypedTranscript from "./TypedTranscript";
import { useDemoKeyboard } from "./useDemoKeyboard";
import { phaseReached, useStepPlayback, VOICE_INTRO_MS, VOICE_WORD_MS } from "./useStepPlayback";
import { useTypedSpeech } from "./useTypedSpeech";
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

const wordCount = (text: string | undefined) => (text ?? "").split(/\s+/).filter(Boolean).length;

export default function StepPlayer({ persona, step, previous, next, continueLabel, panelOpen, onTogglePanel }: Props) {
  const { lecture, dimensions } = DEMO_CONTENT;
  const [, navigate] = useLocation();
  const choix = step.reponse.choix ?? [];
  const retenu = step.retenu;
  const precision = retenu?.precision;
  const tools = step.type === "cases" ? step.outils : undefined;
  // La validation des niveaux appartient au dernier échange de chaque dimension : un seul moment, une seule page.
  const validation = step.id !== null && isDimensionEnd(persona, step as DemoStep) ? step.validation : undefined;
  const validationSliders = validation ? getDimensionSliders(persona, step as DemoStep) : [];
  const hasCorrection = validationSliders.some((slider) => slider.corrigeA);
  const playback = useStepPlayback({
    // Un échange « outils » commence par la parole : rien n’est coché d’avance.
    choices: !tools && (step.type === "cases" || step.type === "scenario") ? choix.length : 0,
    tools: tools ? { detected: tools.cites.length, spokenWords: wordCount(tools.complement), rankWords: wordCount(tools.classement), probeWords: wordCount(tools.approfondissement?.transcription) } : undefined,
    transcription: step.reponse.transcription,
    hasSynthesis: Boolean(retenu),
    precisionWords: wordCount(precision?.transcription),
    validation: validation ? { words: wordCount(validation.voix), hasCorrection } : undefined,
  });
  const { phase, reducedMotion, reached, page, pageCount } = playback;
  const isFirstPage = page === 1;
  const isToolsPage = Boolean(tools) && page === 2;
  const isValidationPage = Boolean(validation) && page === pageCount;
  // Page où la synthèse arrive : la première, ou la deuxième après un échange « outils » (classement et approfondissement d’abord).
  const isSynthesisPage = page === (tools ? 2 : 1);
  const pageRef = useRef(1);

  const answerRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const synthesisRef = useRef<HTMLDivElement>(null);
  const precisionRef = useRef<HTMLDivElement>(null);
  const validationRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLElement>(null);
  const milestoneRef = useRef<HTMLDivElement>(null);

  const color = step.dimension ? DIMENSION_COLORS[step.dimension] : DIMENSION_COLORS.outils;
  const showChoices = !tools && (step.type === "cases" || step.type === "scenario");
  const voiceStarted = reached("transcribing");
  // L’onde s’apaise sur le dernier quart de la transcription et s’arrête avec elle.
  const speechLevel = playback.totalWords > 0 ? Math.min(1, (1 - playback.wordsShown / playback.totalWords) * 4) : 0;
  const fade = (delay = 0) => (reducedMotion ? { initial: false as const } : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } });

  // Précision et validation : des réponses à la voix, écrites mot à mot comme la première.
  const precisionSpeech = useTypedSpeech(precision?.transcription ?? "", { active: phase === "precising", finished: reached("pauseB"), reducedMotion, introMs: VOICE_INTRO_MS, wordMs: VOICE_WORD_MS });
  const validationSpeech = useTypedSpeech(validation?.voix ?? "", { active: phase === "validating", finished: phase === "done", reducedMotion, introMs: VOICE_INTRO_MS, wordMs: VOICE_WORD_MS });

  // Ce qui est déjà joué : le panneau « Ce que la Boussole retient » ne s’enrichit qu’à ces moments-là.
  const extracted = reached("synthesizing");
  const precised = !precision ? extracted : reached("pauseB") || (phase === "precising" && precisionSpeech.complete);
  const validated = phase === "done" || (phase === "validating" && validationSpeech.complete);
  const levelsMoved = validated && validation !== undefined;

  // Le dernier bloc apparu reste visible, y compris sous la barre de commandes du smartphone.
  useEffect(() => {
    const lastBlock = isValidationPage ? validationRef.current : precision ? precisionRef.current : synthesisRef.current;
    const doneTarget = step.pointEtape ? milestoneRef.current : (step.ressources ?? []).length > 0 ? resourcesRef.current : lastBlock;
    const target =
      phase === "done" ? doneTarget
      : phase === "validating" ? validationRef.current
      : phase === "precising" ? precisionRef.current
      : phase === "synthesizing" ? synthesisRef.current
      : phase === "detecting" || phase === "proposing" || phase === "ranking" || phase === "probing" ? toolsRef.current
      : phase === "transcribing" || phase === "selecting" ? answerRef.current
      : null;
    target?.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
  }, [phase, reducedMotion, step.pointEtape, step.ressources, precision, isValidationPage]);

  // À chaque nouvelle page, on repart du haut : l’écran n’est jamais plus long que ce qu’il montre.
  useEffect(() => {
    if (pageRef.current === page) return;
    pageRef.current = page;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [page, reducedMotion]);

  const go = (target: NamedStep | number | null) => { if (target !== null) navigate(stepPath(persona.id, target)); };
  const primaryAction = playback.isWaiting ? playback.start : playback.isPlaying ? playback.skip : playback.isPaused ? playback.resume : () => go(next);
  useDemoKeyboard({ onAdvance: primaryAction, onNext: () => go(next), onPrevious: () => go(previous) });

  const panelStep = step.id ?? persona.etapes.length + 1;
  const panelProps = {
    persona,
    items: getRetainedUntil(persona, panelStep, { extracted, precised, validated }),
    gauges: getGauges(persona, panelStep, validated),
    currentStep: extracted ? step.id : null,
    highlight: step.rebond?.rappel,
    reducedMotion,
  };

  const corrections = validationSliders.filter((slider) => slider.corrigeA);
  const extractionItems = step.id !== null && extracted ? getRetainedItems(step as DemoStep, persona).filter((item) => item.stage === "extraction") : [];
  const announce = [
    extractionItems.length > 0 ? fillTemplate(lecture.annonceRetenu, { elements: extractionItems.map((item) => item.texte).join(", ") }) : "",
    levelsMoved ? fillTemplate(lecture.annonceNiveaux, { niveaux: validationSliders.map((slider) => `${slider.libelle} : ${slider.corrigeA ?? slider.valeur}`).join(", ") }) : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={`lg:grid lg:gap-8 ${panelOpen ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : "lg:grid-cols-[minmax(0,1fr)_auto]"}`}>
      <section aria-labelledby="demo-question" className="min-w-0 space-y-3 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
          <p className="font-semibold" style={{ color: color.text }}>
            {step.id === null ? DEMO_CONTENT.ideal.libelle : `${fillTemplate(lecture.echange, { n: String(step.id), total: String(persona.etapes.length) })} · ${dimensions[step.dimension!]}`}
            {pageCount > 1 && <span className="font-normal text-slate-700"> · {fillTemplate(lecture.partie, { n: String(page), total: String(pageCount) })}</span>}
          </p>
          <Link href={stepPath(persona.id, "restitution")} className="font-semibold text-slate-700 underline underline-offset-4 hover:text-[#515792]">{lecture.allerRestitution}</Link>
        </div>

        {isFirstPage && step.rebond && <MemoryEcho etape={step.rebond.etape} rappel={step.rebond.rappel} reducedMotion={reducedMotion} />}

        {/* La question de la Boussole est toujours en grand, et chaque page n’affiche que la sienne : page 1, la question de l’échange ;
            page de classement (outils), la question de classement ; page de validation, la question de validation. */}
        {isFirstPage && <QuestionCard id="demo-question" variant="titre" label={lecture.boussole} text={step.question} color={color.base} reducedMotion={reducedMotion} />}
        {isValidationPage && step.dimension && <QuestionCard id="demo-question" variant="titre" label={lecture.validationTitre} text={fillTemplate(lecture.validationQuestion, { dimension: dimensions[step.dimension] })} color={color.base} reducedMotion={reducedMotion} />}

        {isFirstPage && showChoices && step.options && (
          <motion.div {...fade(0.15)}>
            {step.type === "cases"
              ? <ChecklistAnswer options={step.options} choix={choix} selecting={phase === "selecting"} finished={voiceStarted} prenom={persona.prenom} />
              : <ScenarioAnswer options={step.options} choix={choix} selecting={phase === "selecting"} finished={voiceStarted} prenom={persona.prenom} />}
          </motion.div>
        )}

        {isFirstPage && voiceStarted && (
          <motion.div ref={answerRef} data-demo-reponse="main" {...fade()} className="scroll-mb-32 rounded-2xl bg-[#515792]/[0.06] p-3.5 sm:ml-8 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">{persona.prenom}</p>
              <Waveform active={phase === "transcribing"} level={speechLevel} reducedMotion={reducedMotion} />
            </div>
            <div className="mt-2">
              <TypedTranscript
                text={step.reponse.transcription}
                wordsShown={playback.wordsShown}
                typing={phase === "transcribing"}
                highlight={retenu?.extrait}
                showHighlight={extracted && !tools}
                onAccelerate={playback.accelerate}
                hint={lecture.accelerer}
              />
            </div>
          </motion.div>
        )}

        {tools && step.options && phaseReached(phase, "detecting") && (isFirstPage || isToolsPage) && (
          <div ref={toolsRef} className="scroll-mb-32">
            <ToolsAnswer tools={tools} options={step.options} prenom={persona.prenom} phase={phase} reducedMotion={reducedMotion} color={color.base} part={isToolsPage ? 2 : 1} />
          </div>
        )}

        {phase === "digesting" && isSynthesisPage && (
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

        {/* Synthèse : toujours après la réponse, étiquetée, avec comment c’est lu, ce qui est retenu et à quoi ça sert. */}
        {retenu && step.dimension && extracted && isSynthesisPage && (
          <div ref={synthesisRef} className="scroll-mb-32 sm:ml-8">
            <SyntheseCard fiche={retenu.fiche} highlighted={Boolean(retenu.extrait) && !tools} reducedMotion={reducedMotion}>
              {tools?.approfondissement && <ToolFocusCards outils={tools.approfondissement.outils} />}
            </SyntheseCard>
          </div>
        )}

        {/* Précision : quand un passage retenu reste ambigu, la Boussole relance et la personne répond à la voix. */}
        {precision && reached("precising") && isSynthesisPage && (
          <div ref={precisionRef} data-demo-precision className="scroll-mb-32 space-y-3 sm:ml-8">
            <QuestionCard variant="relance" label={lecture.precisionTitre} text={precision.question} color={color.base} reducedMotion={reducedMotion} />
            <SpokenBubble kind="precision" prenom={persona.prenom} text={precision.transcription} speech={precisionSpeech} reducedMotion={reducedMotion} />
            {precisionSpeech.complete && (
              <motion.p {...fade()} className="flex items-start gap-2 rounded-xl border border-[#515792]/25 bg-white px-3 py-2.5 text-base leading-snug text-slate-900">
                <Plus className="mt-1 h-4 w-4 shrink-0 text-[#515792]" aria-hidden="true" />
                <span><span className="font-semibold">{lecture.precisionAjoutee}{"\u00a0:"}</span> {precision.note}</span>
              </motion.p>
            )}
          </div>
        )}

        {/* Validation de fin de dimension : les niveaux proposés, la voix de la personne, puis le curseur qui glisse si elle corrige. */}
        {isValidationPage && validation && (
          <div ref={validationRef} data-demo-validation className="scroll-mb-32 space-y-3">
            <InducedSliders sliders={validationSliders} corrected={levelsMoved || validationSpeech.complete} reducedMotion={reducedMotion} />
            <LevelHelp />
            {reached("validating") && <SpokenBubble kind="validation" prenom={persona.prenom} text={validation.voix} speech={validationSpeech} reducedMotion={reducedMotion} />}
            {(levelsMoved || validationSpeech.complete) && (
              <motion.div {...fade()} data-demo-validation-result className="sm:ml-8">
                {corrections.length > 0
                  ? corrections.map((slider) => (
                    <p key={slider.libelle} className="text-base font-semibold text-[#A8440D]">
                      {fillTemplate(lecture.corrige, { prenom: persona.prenom, libelle: slider.libelle, avant: slider.valeur, apres: slider.corrigeA! })}
                    </p>
                  ))
                  : <p className="text-base font-semibold text-slate-900">{fillTemplate(lecture.valide, { prenom: persona.prenom })}</p>}
                {playback.isDone && <p className="mt-1 text-sm text-slate-700">{lecture.validationAide}</p>}
              </motion.div>
            )}
          </div>
        )}
        <p className="sr-only" aria-live="polite">{announce}</p>

        {playback.isWaiting && step.id === 1 && isFirstPage && (
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
            {playback.isWaiting ? fillTemplate(lecture.reponseDe, { prenom: persona.prenom }) : playback.isPlaying ? lecture.passerAnimation : playback.isPaused ? lecture.suite : continueLabel ?? lecture.continuer}
            {(playback.isDone || playback.isPaused) && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
          </button>
          <MemoryDrawer {...panelProps} />
        </DemoActions>
      </section>

      <MemoryColumn {...panelProps} open={panelOpen} onToggle={onTogglePanel} />
    </div>
  );
}
