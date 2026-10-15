/**
 * Machine à états d’une interaction jouée : question → prêt → (sélection) → parole transcrite
 * → (outils : repérage → propositions et ajouts → classement → approfondissement) → digestion → retenu → terminé. La parole et sa transcription sont simultanées : l’onde s’anime dès que
 * le texte commence à s’écrire et s’apaise quand il se termine. Chaque phase avance seule après sa durée ;
 * « Passer l’animation » va directement à la fin. Avec `prefers-reduced-motion`, la question s’affiche
 * d’un coup et la réponse complète apparaît dès le clic, sans onde animée ni écriture mot par mot.
 */
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useReducedMotion } from "framer-motion";

export const PLAYBACK_PHASES = ["question", "ready", "selecting", "transcribing", "detecting", "proposing", "pauseA", "ranking", "probing", "pauseB", "digesting", "retained", "done"] as const;
export type PlaybackPhase = (typeof PLAYBACK_PHASES)[number];

export type PlaybackScript = {
  /** Nombre d’options cochées ou choisies par la personne (0 si la réponse est seulement orale). */
  choices: number;
  transcription: string;
  /** Échange « outils » : nombre d’outils repérés, ajoutés, classés et d’outils creusés (0 hors approfondissement). */
  tools?: { detected: number; spokenWords: number; rankWords: number; probeWords: number };
  /** La réception (« La Boussole retient ») est jouée seulement si l’étape retient quelque chose. */
  hasRetained: boolean;
  /** Une correction de curseur prolonge la phase « retenu » pour que le glissement reste visible. */
  hasCorrection: boolean;
  /** Hors outils : l’échange est coupé en deux pages (réponse, puis ce que la Boussole retient) quand la réception est chargée. */
  splitReception: boolean;
};

/** Rythme d’une parole transcrite en direct : la durée suit la longueur de la réponse, dans des bornes lisibles. */
const MS_PER_WORD = 55;
const SPEECH_MIN_MS = 900;
const SPEECH_MAX_MS = 2800;
const QUESTION_FADE_MS = 700;
const SELECTION_STEP_MS = 420;
const DIGEST_MS = 800;
const TOOL_STEP_MS = 380;
/** Relance sur d’autres outils : la question se pose, puis la réponse s’égrène mot à mot et active les boutons. */
export const TOOL_INTRO_MS = 900;
export const TOOL_WORD_MS = 230;
/** Classement : la parole s’écrit en haut et les outils se placent au fil des mots, les numéros arrivent à la fin. */
export const TOOL_RANK_INTRO_MS = 500;
export const TOOL_RANK_WORD_MS = 130;

type State = { phase: PlaybackPhase; wordsShown: number };
type Action = { type: "goto"; phase: PlaybackPhase } | { type: "jump"; phase: PlaybackPhase } | { type: "word" } | { type: "finish" };

export function phaseReached(current: PlaybackPhase, target: PlaybackPhase) {
  return PLAYBACK_PHASES.indexOf(current) >= PLAYBACK_PHASES.indexOf(target);
}

export function useStepPlayback(script: PlaybackScript) {
  const reducedMotion = useReducedMotion() ?? false;
  const words = useMemo(() => script.transcription.split(/\s+/).filter(Boolean), [script.transcription]);
  const totalWords = words.length;

  const [state, dispatch] = useReducer(
    (current: State, action: Action): State => {
      if (action.type === "goto") return { ...current, phase: action.phase };
      if (action.type === "jump") return { phase: action.phase, wordsShown: totalWords };
      if (action.type === "finish") return { phase: "done", wordsShown: totalWords };
      return { ...current, wordsShown: Math.min(totalWords, current.wordsShown + 1) };
    },
    { phase: reducedMotion ? "ready" : "question", wordsShown: 0 },
  );
  const { phase, wordsShown } = state;

  // Valeurs simples : l’objet `tools` change à chaque rendu et relancerait les minuteurs.
  const hasTools = Boolean(script.tools);
  const { detected = 0, spokenWords = 0, rankWords = 0, probeWords = 0 } = script.tools ?? {};
  const afterTools: PlaybackPhase = script.hasRetained ? "digesting" : "done";
  // Pages : 1 = réponse (et repérage des outils), 2 = classement et approfondissement (outils), dernière = ce que la Boussole retient.
  const splitReception = !hasTools && script.splitReception && script.hasRetained;
  // Outils : la réception a sa propre page seulement quand elle est chargée ; sinon elle suit le classement.
  const hasPauseB = hasTools && script.splitReception && script.hasRetained;
  const afterTranscription: PlaybackPhase = hasTools ? "detecting" : splitReception ? "pauseA" : afterTools;
  const wordMs = totalWords > 0 ? Math.min(SPEECH_MAX_MS, Math.max(SPEECH_MIN_MS, totalWords * MS_PER_WORD)) / totalWords : 0;
  const retainedMs = script.hasCorrection ? 1800 : 900;

  // Durée propre à chaque phase automatique ; les phases « ready » et « done » attendent un clic.
  useEffect(() => {
    let next: PlaybackPhase | null = null;
    let delay = 0;
    if (phase === "question") { next = "ready"; delay = QUESTION_FADE_MS; }
    if (phase === "selecting") { next = totalWords > 0 ? "transcribing" : afterTranscription; delay = script.choices * SELECTION_STEP_MS + 400; }
    if (hasTools && phase === "detecting") { next = "proposing"; delay = detected * TOOL_STEP_MS + 900; }
    if (hasTools && phase === "proposing") { next = "pauseA"; delay = TOOL_INTRO_MS + spokenWords * TOOL_WORD_MS + 1800; }
    if (hasTools && phase === "ranking") { next = probeWords > 0 ? "probing" : hasPauseB ? "pauseB" : afterTools; delay = TOOL_RANK_INTRO_MS + rankWords * TOOL_RANK_WORD_MS + 1600; }
    if (hasTools && phase === "probing") { next = hasPauseB ? "pauseB" : afterTools; delay = TOOL_RANK_INTRO_MS + probeWords * TOOL_RANK_WORD_MS + 1500; }
    if (phase === "digesting") { next = "retained"; delay = DIGEST_MS; }
    if (phase === "retained") { next = "done"; delay = retainedMs; }
    if (!next) return;
    const timer = window.setTimeout(() => dispatch({ type: "goto", phase: next }), delay);
    return () => window.clearTimeout(timer);
  }, [phase, afterTranscription, afterTools, hasTools, hasPauseB, detected, spokenWords, rankWords, probeWords, script.choices, retainedMs, totalWords]);

  // Écriture mot par mot, au rythme de la parole.
  useEffect(() => {
    if (phase !== "transcribing") return;
    if (wordsShown >= totalWords) {
      dispatch({ type: "goto", phase: afterTranscription });
      return;
    }
    const timer = window.setTimeout(() => dispatch({ type: "word" }), wordMs);
    return () => window.clearTimeout(timer);
  }, [phase, wordsShown, totalWords, afterTranscription, wordMs]);

  /** Prochain arrêt (pause ou fin) à partir d’une phase : la fin de la page en cours. */
  const nextStop = useCallback((from: PlaybackPhase): PlaybackPhase => {
    const before = (target: PlaybackPhase) => PLAYBACK_PHASES.indexOf(from) < PLAYBACK_PHASES.indexOf(target);
    if ((hasTools || splitReception) && before("pauseA")) return "pauseA";
    if (hasPauseB && before("pauseB")) return "pauseB";
    return "done";
  }, [hasTools, hasPauseB, splitReception]);

  const start = useCallback(() => {
    if (phase !== "question" && phase !== "ready") return;
    if (reducedMotion) { dispatch({ type: "jump", phase: nextStop(phase) }); return; }
    dispatch({ type: "goto", phase: script.choices > 0 ? "selecting" : "transcribing" });
  }, [phase, reducedMotion, script.choices, nextStop]);

  /** « Passer l’animation » : la page en cours s’affiche en entier, sans sauter les pages suivantes. */
  const skip = useCallback(() => dispatch({ type: "jump", phase: nextStop(phase) }), [phase, nextStop]);

  /** Page suivante, depuis une pause. */
  const resume = useCallback(() => {
    if (phase !== "pauseA" && phase !== "pauseB") return;
    if (reducedMotion) { dispatch({ type: "jump", phase: nextStop(phase) }); return; }
    dispatch({ type: "goto", phase: phase === "pauseA" && hasTools ? "ranking" : afterTools });
  }, [phase, reducedMotion, hasTools, afterTools, nextStop]);

  /** Un clic sur la transcription en cours l’affiche en entier. */
  const accelerate = useCallback(() => {
    if (phase !== "transcribing") return;
    dispatch({ type: "goto", phase: afterTranscription });
  }, [phase, afterTranscription]);

  const isWaiting = phase === "question" || phase === "ready";
  const isPaused = phase === "pauseA" || phase === "pauseB";
  const isPlaying = !isWaiting && !isPaused && phase !== "done";
  const pageCount = hasTools ? (hasPauseB ? 3 : 2) : splitReception ? 2 : 1;
  const afterA = PLAYBACK_PHASES.indexOf(phase) > PLAYBACK_PHASES.indexOf("pauseA");
  const afterB = PLAYBACK_PHASES.indexOf(phase) > PLAYBACK_PHASES.indexOf("pauseB");
  const page = pageCount === 1 ? 1 : hasTools ? (afterB && hasPauseB ? 3 : afterA ? 2 : 1) : afterA ? 2 : 1;

  return {
    phase,
    reducedMotion,
    wordsShown: phaseReached(phase, "detecting") ? totalWords : wordsShown,
    totalWords,
    isWaiting,
    isPaused,
    isPlaying,
    page,
    pageCount,
    resume,
    isDone: phase === "done",
    reached: (target: PlaybackPhase) => phaseReached(phase, target),
    start,
    skip,
    accelerate,
  };
}

export type StepPlayback = ReturnType<typeof useStepPlayback>;
