import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop — remonte automatiquement en haut de page à chaque changement de route.
 * À placer dans App.tsx, à l'intérieur du Router.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}
