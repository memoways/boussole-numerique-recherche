import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Style Boussole : contrôle flottant sobre, bleu Memoways, cible tactile généreuse
 * et apparence uniquement après une progression de lecture significative.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const nextVisible = window.scrollY > 480;
      setVisible((current) => current === nextVisible ? current : nextVisible);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      title="Retour en haut"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full border-2 border-white bg-[#515792] px-3 text-sm font-bold text-white shadow-lg shadow-[#515792]/25 transition hover:-translate-y-0.5 hover:bg-[#3d4275] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#515792] sm:bottom-6 sm:right-6"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">Haut</span>
    </button>
  );
}
