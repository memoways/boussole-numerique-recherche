/**
 * Contenu typé de la démonstration playback `/experience/demo`.
 * Tous les textes des parcours viennent de `data/demo-parcours.json` ; ce module ne contient que des types et des fonctions dérivées.
 */
import rawContent from "@/data/demo-parcours.json";

export type DimensionId = "outils" | "competences" | "donnees" | "publics" | "partage";
export type PersonaId = "cinema" | "scene" | "arts-visuels";
export type PersonaStatus = "en-preparation" | "pret";

/** Une interaction du parcours. Le détail des types de réponse est précisé avec le lot 2. */
export type DemoStep = {
  id: number;
  dimension: DimensionId;
  type: string;
  question: string;
};

export type DemoPersona = {
  id: PersonaId;
  statut: PersonaStatus;
  prenom: string;
  age: number;
  metier: string;
  accroche: string;
  ordreDimensions: DimensionId[];
  etapes: DemoStep[];
};

export type DemoContent = {
  version: number;
  bandeau: string;
  quitter: string;
  dimensions: Record<DimensionId, string>;
  restitutionLibelle: string;
  niveauxRadar: string[];
  choixPersona: { titre: string; intro: string; bouton: string };
  confiance: {
    debut: { titre: string; texte: string; engagementsTitre: string; engagements: string[] };
    fin: { texte: string };
  };
  accueil: { texte: string; avertissementPreparation: string; boutonAvis: string; boutonChangerPersona: string };
  preparation: { titre: string; texte: string; boutonAccueil: string; boutonAvis: string };
  avis: {
    titre: string;
    intro: string;
    libelleCommentaire: string;
    placeholderCommentaire: string;
    libelleEmail: string;
    aideEmail: string;
    micro: {
      titre: string;
      demarrer: string;
      arreter: string;
      transcrire: string;
      transcriptionEnCours: string;
      recommencer: string;
      reecoute: string;
      aide: string;
      indisponible: string;
      transcriptionVide: string;
      transcriptionErreur: string;
    };
    envoyer: string;
    envoiEnCours: string;
    erreurEnvoi: string;
    confirmation: string;
    confirmationSuite: string;
    retourSite: string;
    indisponible: string;
  };
  personas: DemoPersona[];
};

export const DEMO_CONTENT = rawContent as DemoContent;

export const DEMO_ROOT = "/experience/demo";

/** Étapes nommées de l’URL `/experience/demo/:persona/:etape`. Les étapes numériques (`1`…`12`) s’y ajoutent. */
export const NAMED_STEPS = ["accueil", "ideal", "restitution", "demos", "futur", "comparaison", "avis"] as const;
export type NamedStep = (typeof NAMED_STEPS)[number];
export const MAX_NUMBERED_STEP = 12;

export type StepRef = { kind: "named"; name: NamedStep } | { kind: "numbered"; index: number };

export function getPersona(id: string | undefined): DemoPersona | null {
  return DEMO_CONTENT.personas.find((persona) => persona.id === id) ?? null;
}

export function parseStep(value: string | undefined): StepRef | null {
  if (!value) return null;
  if ((NAMED_STEPS as readonly string[]).includes(value)) return { kind: "named", name: value as NamedStep };
  if (/^[1-9]\d?$/.test(value)) {
    const index = Number(value);
    if (index <= MAX_NUMBERED_STEP) return { kind: "numbered", index };
  }
  return null;
}

export function stepPath(persona: PersonaId, step: NamedStep | number) {
  return `${DEMO_ROOT}/${persona}/${step}`;
}

/** Première étape numérotée de chaque dimension, ou `null` tant que le parcours n’est pas rédigé. */
export function firstStepOfDimension(persona: DemoPersona, dimension: DimensionId): number | null {
  return persona.etapes.find((step) => step.dimension === dimension)?.id ?? null;
}

export type ProgressSegment = {
  key: string;
  label: string;
  /** Étape numérotée de destination, `"restitution"` pour le dernier segment, `null` si indisponible. */
  target: number | "restitution" | null;
  current: boolean;
};

/** Segments de la barre de progression : cinq dimensions dans l’ordre du persona, puis la restitution. */
export function getProgressSegments(persona: DemoPersona, step: StepRef): ProgressSegment[] {
  const currentDimension = step.kind === "numbered" ? persona.etapes.find((item) => item.id === step.index)?.dimension : undefined;
  const inRestitution = step.kind === "named" && ["ideal", "restitution", "demos", "futur", "comparaison", "avis"].includes(step.name);

  const segments: ProgressSegment[] = persona.ordreDimensions.map((dimension) => ({
    key: dimension,
    label: DEMO_CONTENT.dimensions[dimension],
    target: firstStepOfDimension(persona, dimension),
    current: currentDimension === dimension,
  }));
  segments.push({ key: "restitution", label: DEMO_CONTENT.restitutionLibelle, target: "restitution", current: inRestitution });
  return segments;
}

export function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
