/**
 * Mesure de la démonstration via GrainQL (`window.GrainTag.track`).
 * Sans le script, ou si le suivi échoue, l’appel ne fait rien : la démo ne dépend jamais de la mesure.
 * Aucune donnée personnelle n’est transmise : l’e-mail est réduit à un booléen.
 */
export type DemoEventName =
  | "demo_persona_choisi"
  | "demo_etape_vue"
  | "demo_saut_chapitre"
  | "demo_regard_ouvert"
  | "demo_ressource_ouverte"
  | "demo_restitution_vue"
  | "demo_comparaison_vue"
  | "demo_avis_commence"
  | "demo_avis_micro"
  | "demo_avis_envoye"
  | "demo_avis_erreur";

type DemoEventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    GrainTag?: { track?: (name: string, props?: Record<string, unknown>) => void };
  }
}

export function trackDemoEvent(name: DemoEventName, props: DemoEventProps = {}) {
  try {
    window.GrainTag?.track?.(name, props);
  } catch {
    // La mesure est facultative.
  }
}
