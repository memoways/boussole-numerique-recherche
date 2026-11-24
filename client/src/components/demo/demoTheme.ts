/** Couleurs des dimensions : teinte de la charte pour les surfaces, variante accessible (AA sur blanc) pour le texte. */
import type { CSSProperties } from "react";
import type { DimensionId, RadarLevel } from "@/lib/demoContent";

export const DIMENSION_COLORS: Record<DimensionId, { base: string; text: string }> = {
  outils: { base: "#515792", text: "#515792" },
  competences: { base: "#E07428", text: "#A8440D" },
  donnees: { base: "#3aab8a", text: "#167A5E" },
  publics: { base: "#3a7fc1", text: "#2B619D" },
  partage: { base: "#7ab648", text: "#4C741B" },
};

/**
 * Couleur de chaque niveau de l’échelle, la même partout (libellés du radar, liste, légende, jauges) : le niveau se reconnaît
 * à sa couleur d’un écran à l’autre. Les quatre teintes sont AA sur blanc (5,3 à 6,7) ; le mot du niveau reste toujours écrit.
 */
export const LEVEL_COLORS: Record<RadarLevel, string> = {
  Exploration: "#8A5A00",
  Improvisation: "#A8440D",
  Organisé: "#515792",
  Orchestré: "#167A5E",
};

/**
 * Couleur de dimension passée par variable CSS. Les règles globales de `index.css` qui assombrissent
 * `[style*="color: rgb(…)"]` captent aussi un `border-color` en ligne et recoloreraient le texte :
 * la variable évite ce faux positif.
 */
export function dimensionVar(color: string): CSSProperties {
  return { "--dim": color } as CSSProperties;
}
