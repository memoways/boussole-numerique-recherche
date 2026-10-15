/**
 * Parole transcrite mot par mot, hors de la machine à états principale : les paroles secondaires d’un échange
 * (réponse à une relance, classement, approfondissement) s’écrivent comme la première, avec l’onde et le curseur.
 * `active` lance l’écriture après `introMs` ; `finished` (ou le mouvement réduit) affiche le texte en entier.
 */
import { useCallback, useEffect, useMemo, useState } from "react";

type Options = { active: boolean; finished: boolean; reducedMotion: boolean; introMs: number; wordMs: number };

export function useTypedSpeech(text: string, { active, finished, reducedMotion, introMs, wordMs }: Options) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const total = words.length;
  const [shown, setShown] = useState(0);
  const [forced, setForced] = useState(false);
  const running = active && !finished && !reducedMotion && !forced;

  useEffect(() => {
    if (!running) return;
    let count = 0;
    let timer = 0;
    const tick = () => {
      count += 1;
      setShown(count);
      if (count < total) timer = window.setTimeout(tick, wordMs);
    };
    timer = window.setTimeout(tick, introMs);
    return () => window.clearTimeout(timer);
  }, [running, total, introMs, wordMs]);

  const complete = finished || reducedMotion || forced || shown >= total;
  const wordsShown = complete ? total : shown;
  return {
    total,
    wordsShown,
    complete,
    /** Le curseur d’écriture clignote : la parole est en cours. */
    typing: active && !complete,
    /** Ce qui a déjà été dit, pour activer ce qui s’y rattache. */
    heard: complete ? text : words.slice(0, shown).join(" "),
    /** Niveau de l’onde : plein pendant la parole, apaisé sur le dernier quart. */
    level: total > 0 ? Math.min(1, (1 - wordsShown / total) * 4) : 0,
    accelerate: useCallback(() => setForced(true), []),
  };
}
