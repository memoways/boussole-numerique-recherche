/**
 * Machine à états d’une interaction jouée : question → prêt → (sélection) → parole transcrite
 * → (outils : repérage → propositions et ajouts → classement → approfondissement) → synthèse de la Boussole
 * → (précision : question de relance et réponse à la voix) → (validation de fin de dimension : niveaux proposés,
 * réponse à la voix, correction) → terminé. La parole et sa transcription sont simultanées : l’onde s’anime dès que
 * le texte commence à s’écrire et s’apaise quand il se termine. Toute réponse se joue ainsi, y compris la précision et la validation.
 * La synthèse ne vient jamais en même temps que la réponse : elle arrive après, étiquetée comme telle.
 * Chaque phase avance seule après sa durée ; « Passer l’animation » va directement à la fin de la page. Avec `prefers-reduced-motion`,
 * la question s’affiche d’un coup et la page complète apparaît dès le clic, sans onde animée ni écriture mot par mot.
 */
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useReducedMotion } from "framer-motion";

export const PLAYBACK_PHASES = ["question", "ready", "selecting", "transcribing", "detecting", "proposing", "pauseA", "ranking", "probing", "digesting", "synthesizing", "precising", "pauseB", "validating", "done"] as const;
export type PlaybackPhase = (typeof PLAYBACK_PHASES)[number];

export type PlaybackScript = {
  /** Nombre d’options cochées ou choisies par la personne (0 si la réponse est seulement orale). */
  choices: number;
  transcription: string;
  /** Échange « outils » : nombre d’outils repérés, ajoutés, classés et d’outils creusés (0 hors approfondissement). */
  tools?: { detected: number; spokenWords: number; rankWords: number; probeWords: number };
  /** La synthèse de la Boussole est jouée seulement si l’échange retient quelque chose. */
  hasSynthesis: boolean;
  /** Nombre de mots de la réponse à la question de précision (0 s’il n’y en a pas). */
  precisionWords: number;
  /** Dernier échange d’une dimension : validation des niveaux à la voix (mots de la réponse, correction éventuelle). */
  validation?: { words: number; hasCorrection: boolean };
};

/** Rythme d’une parole transcrite en direct : la durée suit la longueur de la réponse, dans des bornes lisibles. */
const MS_PER_WORD = 55;
const SPEECH_MIN_MS = 900;
const SPEECH_MAX_MS = 2800;
const QUESTION_FADE_MS = 700;
const SELECTION_STEP_MS = 420;
const DIGEST_MS = 800;
const SYNTHESIS_MS = 1800;
const TOOL_STEP_MS = 380;
/** Relance sur d’autres outils : la question se pose, puis la réponse s’égrène mot à mot et active les boutons. */
export const TOOL_INTRO_MS = 900;
export const TOOL_WORD_MS = 230;
/** Classement : la parole s’écrit en haut et les outils se placent au fil des mots, les numéros arrivent à la fin. */
export const TOOL_RANK_INTRO_MS = 500;
export const TOOL_RANK_WORD_MS = 130;
/** Précision et validation : la question se pose, puis la réponse s’écrit mot à mot. */
export const VOICE_INTRO_MS = 500;
export const VOICE_WORD_MS = 100;
const PRECISION_TAIL_MS = 1400;
const VALIDATION_TAIL_MS = 1400;
/** Une correction de niveau a besoin de temps pour rester visible quand le curseur glisse. */
const VALIDATION_CORRECTION_TAIL_MS = 2800;

type State = { phase: PlaybackPhase; wordsShown: number };
type Action = { type: "goto"; phase: PlaybackPhase } | { type: "jump"; phase: PlaybackPhase } | { type: "word" } | { type: "finish" };

const indexOf = (phase: PlaybackPhase) => PLAYBACK_PHASES.indexOf(phase);

export function phaseReached(current: PlaybackPhase, target: PlaybackPhase) {
  return indexOf(current) >= indexOf(target);
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

  // Valeurs simples : les objets `tools` et `validation` changent à chaque rendu et relanceraient les minuteurs.
  const hasTools = Boolean(script.tools);
  const { detected = 0, spokenWords = 0, rankWords = 0, probeWords = 0 } = script.tools ?? {};
  const hasValidation = Boolean(script.validation);
  const validationWords = script.validation?.words ?? 0;
  const validationTail = script.validation?.hasCorrection ? VALIDATION_CORRECTION_TAIL_MS : VALIDATION_TAIL_MS;
  const { precisionWords, hasSynthesis } = script;

  /** Ce qui suit la réponse (ou les outils) : la synthèse quand l’échange retient quelque chose, sinon la fin. */
  const afterAnswer: PlaybackPhase = hasSynthesis ? "digesting" : "done";
  const afterTranscription: PlaybackPhase = hasTools ? "detecting" : afterAnswer;
  /** Après la synthèse : la précision, puis la validation de fin de dimension (sur sa propre page), puis la fin. */
  const afterSynthesis: PlaybackPhase = precisionWords > 0 ? "precising" : hasValidation ? "pauseB" : "done";
  const afterPrecision: PlaybackPhase = hasValidation ? "pauseB" : "done";
  const wordMs = totalWords > 0 ? Math.min(SPEECH_MAX_MS, Math.max(SPEECH_MIN_MS, totalWords * MS_PER_WORD)) / totalWords : 0;

  // Durée propre à chaque phase automatique ; les phases « ready », « pauseA », « pauseB » et « done » attendent un clic.
  useEffect(() => {
    let next: PlaybackPhase | null = null;
    let delay = 0;
    if (phase === "question") { next = "ready"; delay = QUESTION_FADE_MS; }
    if (phase === "selecting") { next = totalWords > 0 ? "transcribing" : afterTranscription; delay = script.choices * SELECTION_STEP_MS + 400; }
    if (hasTools && phase === "detecting") { next = "proposing"; delay = detected * TOOL_STEP_MS + 900; }
    if (hasTools && phase === "proposing") { next = "pauseA"; delay = TOOL_INTRO_MS + spokenWords * TOOL_WORD_MS + 1800; }
    if (hasTools && phase === "ranking") { next = probeWords > 0 ? "probing" : afterAnswer; delay = TOOL_RANK_INTRO_MS + rankWords * TOOL_RANK_WORD_MS + 1600; }
    if (hasTools && phase === "probing") { next = afterAnswer; delay = TOOL_RANK_INTRO_MS + probeWords * TOOL_RANK_WORD_MS + 1500; }
    if (phase === "digesting") { next = "synthesizing"; delay = DIGEST_MS; }
    if (phase === "synthesizing") { next = afterSynthesis; delay = SYNTHESIS_MS; }
    if (phase === "precising") { next = afterPrecision; delay = VOICE_INTRO_MS + precisionWords * VOICE_WORD_MS + PRECISION_TAIL_MS; }
    if (phase === "validating") { next = "done"; delay = VOICE_INTRO_MS + validationWords * VOICE_WORD_MS + validationTail; }
    if (!next) return;
    const timer = window.setTimeout(() => dispatch({ type: "goto", phase: next }), delay);
    return () => window.clearTimeout(timer);
  }, [phase, afterTranscription, afterAnswer, afterSynthesis, afterPrecision, hasTools, detected, spokenWords, rankWords, probeWords, precisionWords, validationWords, validationTail, script.choices, totalWords]);

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
    const before = (target: PlaybackPhase) => indexOf(from) < indexOf(target);
    if (hasTools && before("pauseA")) return "pauseA";
    if (hasValidation && before("pauseB")) return "pauseB";
    return "done";
  }, [hasTools, hasValidation]);

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
    dispatch({ type: "goto", phase: phase === "pauseA" ? "ranking" : "validating" });
  }, [phase, reducedMotion, nextStop]);

  /** Un clic sur la transcription en cours l’affiche en entier. */
  const accelerate = useCallback(() => {
    if (phase !== "transcribing") return;
    dispatch({ type: "goto", phase: afterTranscription });
  }, [phase, afterTranscription]);

  const isWaiting = phase === "question" || phase === "ready";
  const isPaused = phase === "pauseA" || phase === "pauseB";
  const isPlaying = !isWaiting && !isPaused && phase !== "done";
  // Pages : outils = (voix et repérage) puis (classement, approfondissement, synthèse) ; sinon (réponse et synthèse) ; la validation a toujours la sienne.
  const pageCount = (hasTools ? 2 : 1) + (hasValidation ? 1 : 0);
  const page = 1 + (hasTools && indexOf(phase) > indexOf("pauseA") ? 1 : 0) + (hasValidation && indexOf(phase) > indexOf("pauseB") ? 1 : 0);

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
