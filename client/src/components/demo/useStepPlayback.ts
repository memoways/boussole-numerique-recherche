/**
 * Machine à états d’une interaction jouée : question → prêt → (sélection) → parole → transcription
 * → digestion → retenu → terminé. Chaque phase avance seule après sa durée ; « Passer l’animation » va
 * directement à la fin. Avec `prefers-reduced-motion`, la question s’affiche d’un coup et la réponse
 * complète apparaît dès le clic, sans onde animée ni écriture mot par mot.
 */
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useReducedMotion } from "framer-motion";

export const PLAYBACK_PHASES = ["question", "ready", "selecting", "speaking", "transcribing", "digesting", "retained", "done"] as const;
export type PlaybackPhase = (typeof PLAYBACK_PHASES)[number];

export type PlaybackScript = {
  /** Nombre d’options cochées ou choisies par la personne (0 si la réponse est seulement orale). */
  choices: number;
  transcription: string;
  /** La réception (« La Boussole retient ») est jouée seulement si l’étape retient quelque chose. */
  hasRetained: boolean;
  /** Une correction de curseur prolonge la phase « retenu » pour que le glissement reste visible. */
  hasCorrection: boolean;
};

const WORDS_PER_SECOND = 30;
const QUESTION_FADE_MS = 700;
const SELECTION_STEP_MS = 420;
const DIGEST_MS = 800;

type State = { phase: PlaybackPhase; wordsShown: number };
type Action = { type: "goto"; phase: PlaybackPhase } | { type: "word" } | { type: "finish" };

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
      if (action.type === "finish") return { phase: "done", wordsShown: totalWords };
      return { ...current, wordsShown: Math.min(totalWords, current.wordsShown + 1) };
    },
    { phase: reducedMotion ? "ready" : "question", wordsShown: 0 },
  );
  const { phase, wordsShown } = state;

  const afterTranscription: PlaybackPhase = script.hasRetained ? "digesting" : "done";
  const speakingMs = Math.min(3000, Math.max(1500, totalWords * 120));
  const retainedMs = script.hasCorrection ? 1800 : 900;

  // Durée propre à chaque phase automatique ; les phases « ready » et « done » attendent un clic.
  useEffect(() => {
    let next: PlaybackPhase | null = null;
    let delay = 0;
    if (phase === "question") { next = "ready"; delay = QUESTION_FADE_MS; }
    if (phase === "selecting") { next = totalWords > 0 ? "speaking" : afterTranscription; delay = script.choices * SELECTION_STEP_MS + 400; }
    if (phase === "speaking") { next = "transcribing"; delay = speakingMs; }
    if (phase === "digesting") { next = "retained"; delay = DIGEST_MS; }
    if (phase === "retained") { next = "done"; delay = retainedMs; }
    if (!next) return;
    const timer = window.setTimeout(() => dispatch({ type: "goto", phase: next }), delay);
    return () => window.clearTimeout(timer);
  }, [phase, afterTranscription, script.choices, speakingMs, retainedMs, totalWords]);

  // Écriture mot par mot, environ 30 mots par seconde.
  useEffect(() => {
    if (phase !== "transcribing") return;
    if (wordsShown >= totalWords) {
      dispatch({ type: "goto", phase: afterTranscription });
      return;
    }
    const timer = window.setTimeout(() => dispatch({ type: "word" }), 1000 / WORDS_PER_SECOND);
    return () => window.clearTimeout(timer);
  }, [phase, wordsShown, totalWords, afterTranscription]);

  const start = useCallback(() => {
    if (phase !== "question" && phase !== "ready") return;
    if (reducedMotion) { dispatch({ type: "finish" }); return; }
    dispatch({ type: "goto", phase: script.choices > 0 ? "selecting" : "speaking" });
  }, [phase, reducedMotion, script.choices]);

  const skip = useCallback(() => dispatch({ type: "finish" }), []);

  /** Un clic sur la transcription en cours l’affiche en entier. */
  const accelerate = useCallback(() => {
    if (phase !== "transcribing") return;
    dispatch({ type: "goto", phase: afterTranscription });
  }, [phase, afterTranscription]);

  const isWaiting = phase === "question" || phase === "ready";
  const isPlaying = !isWaiting && phase !== "done";

  return {
    phase,
    reducedMotion,
    wordsShown: phaseReached(phase, "digesting") || phase === "done" ? totalWords : wordsShown,
    totalWords,
    isWaiting,
    isPlaying,
    isDone: phase === "done",
    reached: (target: PlaybackPhase) => phaseReached(phase, target),
    start,
    skip,
    accelerate,
  };
}

export type StepPlayback = ReturnType<typeof useStepPlayback>;
