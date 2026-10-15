/**
 * Contenu typé de la démonstration playback `/experience/demo`.
 * Tous les textes des parcours viennent de `data/demo-parcours.json` ; ce module ne contient que des types et des fonctions dérivées.
 */
import rawContent from "@/data/demo-parcours.json";
import rawResources from "@/data/demo-ressources.json";

export type DimensionId = "outils" | "competences" | "donnees" | "publics" | "partage";
export type PersonaId = "cinema" | "scene" | "arts-visuels";
export type PersonaStatus = "en-preparation" | "pret";

/** Échelle qualitative de l’annexe v2 : chaque niveau a une définition affichée (`niveauxDefinitions`). */
export type RadarLevel = "Exploration" | "Improvisation" | "Organisé" | "Orchestré";
export type StepType = "cases" | "question" | "scenario" | "curseurs" | "relance";

/**
 * Curseur qualitatif induit : position proposée par la Boussole, puis éventuelle correction par la personne.
 * `dit` rappelle les mots exacts qui justifient le niveau ; `nonAborde` signale un niveau proposé sans que la
 * personne en ait encore parlé (c’est souvent là qu’elle corrige).
 */
export type DemoSlider = { libelle: string; valeur: RadarLevel; corrigeA: RadarLevel | null; dit?: string; nonAborde?: boolean };

export type DemoRetained = {
  /** Résumé d’une phrase de ce qui a été dit, affiché avec les curseurs pour qu’ils ne tombent pas hors contexte. */
  resume?: string;
  /** Passage de la transcription surligné (niveau 1 du panneau). */
  extrait?: string;
  /** Notes taguées par la dimension de l’étape (niveau 2). */
  tags?: string[];
  curseurs?: DemoSlider[];
};

/** Une interaction du parcours, jouée selon la grammaire du PRD (question, réponse, réception). */
export type DemoStep = {
  id: number;
  dimension: DimensionId;
  type: StepType;
  question: string;
  /** Pour les curseurs proposés avant la réponse : la fin de la question, affichée après les curseurs. */
  questionSuite?: string;
  options?: string[];
  reponse: { choix?: string[]; transcription: string };
  retenu?: DemoRetained;
  /** Rebond mémoire : l’élément retenu plus tôt que la Boussole cite. */
  rebond?: { etape: number; rappel: string };
  numeriqueResponsable?: boolean;
  /** Échange où la personne dit ce qui lui pèse (trame concret → général → ce qui pèse) : au moins un par dimension. */
  pese?: boolean;
  /** « Un premier regard », replié par défaut sous l’échange de fin de dimension. */
  pointEtape?: { texte: string; ordreDeGrandeur: string | null };
  /** « D’autres regards » : une ou deux citations du corpus de veille, présentées comme inspiration (annexe v3). */
  ressources?: DemoStepResource[];
};

export type ResourceRole = "pratique" | "ouverture" | "contrepoint";

/** Citation d’une ressource du catalogue ; une source anglaise s’affiche traduite, l’original reste pour vérification. */
export type DemoStepResource = { ref: string; citation: string; citationOriginale?: string; role: ResourceRole };

/** Ressource du corpus « Ressources web MW » lié au projet ; `notionId` garde la trace de la page Notion. */
export type DemoResource = {
  id: string;
  notionId: string;
  titre: string;
  auteur: string;
  media: string;
  url: string;
  langue: "fr" | "en";
  /** Pour mémoire, sans effet sur l’affichage. */
  statutEditorial: string;
};

export type DemoCitation = { texte: string; etape: number; citation: string; ordreDeGrandeur?: string };
export type DemoPiste = { horizon: string; texte: string; lien: string; libelleLien: string };

/** Gabarits de micro-démos, tous centrés sur les données : quelle information va où, quelle source fait foi, comment on valide. */
export type DemoMicro =
  | {
      id: "convergence";
      titre: string;
      texte: string;
      /** Informations comparées (durée, crédits…) ; `valeurs` et `reference` suivent cet ordre. */
      champs: string[];
      endroits: { nom: string; valeurs: string[] }[];
      source: string;
      reference: string[];
    }
  | { id: "tri"; titre: string; texte: string; places: { nom: string; elements: string[] }[] }
  | {
      id: "validation";
      titre: string;
      texte: string;
      avant: { messages: string[]; resume: string };
      document: string;
      validations: { qui: string; statut: "valide" | "attente" }[];
      libelles: Record<"valide" | "attente", string>;
      historique: string[];
    }
  | { id: "fiche"; titre: string; texte: string; source: string; elements: { libelle: string; cibles: string[] }[]; sorties: string[] }
  | { id: "source-unique"; titre: string; texte: string; pieces: string[]; destination: string }
  | {
      id: "note";
      titre: string;
      texte: string;
      /** Phrases dictées à la voix, qui deviennent une note structurée (décision, personnes concernées, scène…). */
      dicteeTitre: string;
      dictee: string[];
      note: { titre: string; champs: { libelle: string; valeur: string }[] };
      partage: string;
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
  ideal?: { question: string; transcription: string };
  restitution?: {
    lettre: string;
    radar: Record<DimensionId, RadarLevel>;
    fonctionne: DemoCitation[];
    /** Affiché sous le titre « Ce qui pourrait être plus léger ». */
    ameliorer: DemoCitation[];
    pistes: DemoPiste[];
  };
  demos?: DemoMicro[];
};

export type DemoContent = {
  version: number;
  bandeau: string;
  quitter: string;
  dimensions: Record<DimensionId, string>;
  restitutionLibelle: string;
  niveauxRadar: RadarLevel[];
  niveauxDefinitions: Record<RadarLevel, string>;
  niveauxTitre: string;
  choixPersona: { titre: string; intro: string; bouton: string; badgePreparation: string };
  confiance: {
    debut: { titre: string; texte: string; engagementsTitre: string; engagements: string[] };
    fin: { texte: string };
  };
  accueil: { texte: string; avertissementPreparation: string; boutonCommencer: string; aideLecture: string; boutonAvis: string; boutonChangerPersona: string };
  preparation: { titre: string; texte: string; comparaisonTexte: string; boutonAccueil: string; boutonAvis: string };
  lecture: Record<
    | "boussole" | "echange" | "reponseDe" | "passerAnimation" | "continuer" | "retour" | "allerRestitution"
    | "selectionCases" | "selectionScenario" | "accelerer" | "digestion" | "induction" | "indiceDit" | "indiceNonAborde"
    | "valide" | "corrige" | "rebondTitre" | "rebondEchange" | "pointEtapeTitre" | "pointEtapeOuvrir" | "pointEtapeReplier" | "annonceRetenu"
    | "ressourcesTitre" | "ressourceLire" | "nouvelOnglet" | "traduitAnglais",
    string
  >;
  memoire: Record<"titre" | "boutonMobile" | "vide" | "extraits" | "notes" | "jauges" | "replier" | "deplier" | "fermer", string>;
  ideal: { libelle: string; boutonSuite: string };
  restitution: Record<
    | "surtitre" | "titre" | "lettreTitre" | "radarTitre" | "radarPhrase" | "fonctionneTitre" | "ameliorerTitre" | "citationLien" | "pistesTitre" | "pistesIntro" | "boutonSuite"
    | "corpus" | "corpusLien",
    string
  >;
  demos: Record<"titre" | "intro" | "lancer" | "rejouer" | "avant" | "apres" | "boutonSuite", string>;
  futur: { titre: string; intro: string; badge: string; fonctions: { titre: string; texte: string }[]; boutonSuite: string };
  /** Comparaison des trois parcours : la même dimension, formulée par chaque persona, et les trois radars. */
  comparaison: {
    surtitre: string;
    titre: string;
    texte: string;
    dimension: DimensionId;
    questionTitre: string;
    questionLien: string;
    radarTitre: string;
    parcoursSuivi: string;
    boutonVoir: string;
    boutonAvis: string;
  };
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

export const DEMO_CONTENT = rawContent as unknown as DemoContent;

/** Catalogue des ressources citées : aucun appel à Notion au runtime, la démo reste en playback. */
export const DEMO_RESOURCES = (rawResources as unknown as { ressources: DemoResource[] }).ressources;

export function getResource(id: string): DemoResource | null {
  return DEMO_RESOURCES.find((resource) => resource.id === id) ?? null;
}

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

/** Valeur interne (1 à 4) d’un niveau qualitatif, pour le dessin seulement : aucun chiffre n’est affiché. */
export function levelValue(level: RadarLevel) {
  return DEMO_CONTENT.niveauxRadar.indexOf(level) + 1;
}

/** La comparaison n’a de sens que si les trois parcours sont jouables. */
export function isComparisonReady() {
  return DEMO_CONTENT.personas.every((persona) => persona.statut === "pret");
}

/** Ordre de lecture d’un parcours jouable : la comparaison des trois parcours précède l’avis. */
export function getStepSequence(persona: DemoPersona): (NamedStep | number)[] {
  const comparison: NamedStep[] = isComparisonReady() ? ["comparaison"] : [];
  return ["accueil", ...persona.etapes.map((step) => step.id), "ideal", "restitution", "demos", "futur", ...comparison, "avis"];
}

export function stepKey(step: StepRef): NamedStep | number {
  return step.kind === "named" ? step.name : step.index;
}

/** Étapes voisines dans l’ordre de lecture, ou `null` en bout de parcours. */
export function getNeighbours(persona: DemoPersona, step: StepRef) {
  const sequence = getStepSequence(persona);
  const index = sequence.indexOf(stepKey(step));
  if (index === -1) return { previous: null, next: null };
  return { previous: sequence[index - 1] ?? null, next: sequence[index + 1] ?? null };
}

export type RetainedItem = {
  key: string;
  kind: "extrait" | "tag" | "curseur";
  dimension: DimensionId;
  etape: number;
  texte: string;
  /** Niveau final d’un curseur, après correction éventuelle. */
  niveau?: RadarLevel;
};

/** Éléments retenus par une étape, dans l’ordre d’apparition dans le panneau. */
export function getRetainedItems(step: DemoStep): RetainedItem[] {
  const retenu = step.retenu;
  if (!retenu) return [];
  const base = { dimension: step.dimension, etape: step.id };
  return [
    ...(retenu.extrait ? [{ ...base, key: `${step.id}-extrait`, kind: "extrait" as const, texte: retenu.extrait }] : []),
    ...(retenu.tags ?? []).map((tag, index) => ({ ...base, key: `${step.id}-tag-${index}`, kind: "tag" as const, texte: tag })),
    ...(retenu.curseurs ?? []).map((slider, index) => ({
      ...base,
      key: `${step.id}-curseur-${index}`,
      kind: "curseur" as const,
      texte: slider.libelle,
      niveau: slider.corrigeA ?? slider.valeur,
    })),
  ];
}

/**
 * Cumul de ce que la Boussole a retenu : toutes les étapes avant `beforeStep`, plus l’étape courante
 * si sa réception est jouée. Déduit du JSON seul, une URL rechargée affiche donc le même panneau.
 */
export function getRetainedUntil(persona: DemoPersona, beforeStep: number, includeCurrent: boolean): RetainedItem[] {
  return persona.etapes
    .filter((step) => step.id < beforeStep || (includeCurrent && step.id === beforeStep))
    .flatMap(getRetainedItems);
}

/** Jauges qualitatives : une dimension est renseignée dès que son point d’étape est passé. */
export function getGauges(persona: DemoPersona, beforeStep: number, includeCurrent: boolean) {
  return persona.ordreDimensions.flatMap((dimension) => {
    const milestone = persona.etapes.filter((step) => step.dimension === dimension && step.pointEtape).at(-1);
    const reached = milestone && (milestone.id < beforeStep || (includeCurrent && milestone.id === beforeStep));
    const level = persona.restitution?.radar[dimension];
    return reached && level ? [{ dimension, level }] : [];
  });
}
