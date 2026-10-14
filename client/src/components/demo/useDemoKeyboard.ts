/**
 * Raccourcis de la démonstration : Entrée ou Espace avancent selon la phase, les flèches gauche/droite
 * changent d’étape. Ils sont ignorés quand le focus est dans un champ, sur un bouton ou un lien (le
 * navigateur les active déjà), dans un tiroir ouvert, ou avec une touche de modification.
 */
import { useEffect, useRef } from "react";

type Handlers = { onAdvance?: () => void; onNext?: () => void; onPrevious?: () => void };

const INTERACTIVE = "input, textarea, select, button, a[href], [contenteditable='true'], [role='button'], [role='slider'], [role='dialog']";

export function useDemoKeyboard(handlers: Handlers) {
  const latest = useRef(handlers);
  latest.current = handlers;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(INTERACTIVE)) return;
      const { onAdvance, onNext, onPrevious } = latest.current;
      if ((event.key === "Enter" || event.key === " ") && onAdvance) {
        event.preventDefault();
        onAdvance();
      } else if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
      } else if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
