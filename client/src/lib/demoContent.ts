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
export type StepType = "cases" | "question" | "scenario" | "relance";

/**
 * Curseur qualitatif induit : position proposée par la Boussole, validée ou corrigée par la personne à la voix, une seule fois,
 * à la fin de la dimension (`validation` du dernier échange). `dit` rappelle les mots exacts qui justifient le niveau ;
 * `nonAborde` signale un niveau proposé sans que la personne en ait encore parlé (c’est souvent là qu’elle corrige).
 */
export type DemoSlider = { libelle: string; valeur: RadarLevel; corrigeA: RadarLevel | null; dit?: string; nonAborde?: boolean };

/** Question de précision : la Boussole creuse un passage retenu qui reste ambigu, la personne répond à la voix, une note s’ajoute. */
export type DemoPrecision = { question: string; transcription: string; note: string };

/** Une ligne de la fiche : un champ et sa valeur, tirés de ce qui a été dit. */
export type DemoFicheRow = { champ: string; valeur: string };

/**
 * Ce que la Boussole tire d’une réponse (extraction puis transformation). Après la réponse, une « synthèse » étiquetée range
 * ce qui a été dit dans une fiche de données structurées (`fiche`) : des champs et des valeurs reformulés, jamais une
 * répétition de la réponse ni des notes. `extrait` est le passage surligné dans la réponse (il n’apparaît que s’il est sur la même page),
 * `tags` les notes courtes du panneau « Ce que la Boussole retient ».
 */
export type DemoRetained = {
  /** Passage de la transcription surligné (niveau 1 du panneau). */
  extrait?: string;
  /** Notes taguées par la dimension de l’échange (niveau 2). */
  tags?: string[];
  /** Fiche structurée tirée de la réponse : de deux à quatre lignes. */
  fiche: DemoFicheRow[];
  /** Question de relance quand un passage retenu mérite d’être précisé (facultatif). */
  precision?: DemoPrecision;
  /** Niveaux proposés d’après la réponse ; ils ne s’affichent qu’à la validation de fin de dimension. */
  curseurs?: DemoSlider[];
};

/** Validation de fin de dimension, portée par le dernier échange de la dimension : la personne valide ou corrige à la voix. */
export type DemoValidation = { voix: string };

/** Outil repéré dans la parole : `dit` reprend les mots exacts de la transcription qui le justifient. */
export type DemoToolMention = { outil: string; dit: string };
/** `dit` : les mots de la réponse qui font apparaître la capsule de l’outil. */
export type DemoToolFocus = { outil: string; dit: string; fonctionne: string; pese: string };

/**
 * Réponse d’un échange « cases » jouée dans l’ordre inverse d’une liste cochée : la personne parle, la Boussole repère
 * les outils cités (`cites`), propose des outils du même registre parmi `options`, la personne en ajoute (`ajoutes`,
 * souvent un oubli, avec de nouveaux boutons `suites`), puis classe l’ensemble du plus au moins important (`ordre`). `approfondissement` (facultatif,
 * un seul parcours) creuse ce qui fonctionne et ce qui pèse sur les outils en tête.
 */
export type DemoTools = {
  cites: DemoToolMention[];
  /** Relance de la Boussole : des boutons d’outils du même registre, que la personne active à la voix. */
  question: string;
  /** Outils activés par la réponse ; `dit` reprend les mots de `complement` qui déclenchent l’activation. */
  ajoutes: DemoToolMention[];
  complement: string;
  /** Nouveaux boutons qui arrivent quand un outil est activé : des outils proches, restant à choisir. */
  suites?: { apres: string; propositions: string[] }[];
  /** Classement du plus au moins important ; `dit` reprend les mots de `classement` qui placent l’outil. */
  ordre: DemoToolMention[];
  classement: string;
  approfondissement?: { question: string; transcription: string; outils: DemoToolFocus[] };
};

/** Une interaction du parcours, jouée selon la grammaire du PRD (question, réponse, réception). */
export type DemoStep = {
  id: number;
  dimension: DimensionId;
  type: StepType;
  question: string;
  options?: string[];
  reponse: { choix?: string[]; transcription: string };
  /** Pour une étape « cases » : outils repérés dans la parole, ajouts, classement et approfondissement. */
  outils?: DemoTools;
  retenu?: DemoRetained;
  /** Dernier échange d’une dimension : la Boussole propose les niveaux de la dimension, la personne valide ou corrige à la voix. */
  validation?: DemoValidation;
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
/**
 * Piste de la restitution : la dimension du radar qu’elle fait avancer, et un lien qui dit pourquoi il est là.
 * Le lien renvoie soit à l’animation de la page « À quoi ça pourrait ressembler », soit à une ressource du corpus.
 */
export type DemoPiste = {
  horizon: string;
  dimension: DimensionId;
  texte: string;
  lien: { demo: string; raison: string } | { ressource: string; raison: string };
};

/** Critères d’une dimension : ce que la Boussole regarde, et l’échelle des quatre niveaux appliquée à cette dimension. */
export type DemoCriteria = { regarde: string; echelle: Record<RadarLevel, string> };

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
  ordreDimensions: DimensionId[];
  etapes: DemoStep[];
  ideal?: { question: string; transcription: string };
  restitution?: {
    /** Courts paragraphes séparés par une ligne vide ; le dernier reprend le fil rouge. */
    lettre: string;
    radar: Record<DimensionId, RadarLevel>;
    fonctionne: DemoCitation[];
    /** Affiché sous le titre « Ce qui pourrait être plus léger ». */
    ameliorer: DemoCitation[];
    pistes: DemoPiste[];
    /** Par dimension : pourquoi le parcours est à ce niveau, en une synthèse tirée de ce qui a été relevé. */
    detail: Record<DimensionId, { pourquoi: string }>;
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
  accueil: { titre: string; fictifTitre: string; fictif: string; avertissementPreparation: string; boutonCommencer: string; aideTitre: string; aideLecture: string; boutonAvis: string; boutonChangerPersona: string };
  preparation: { titre: string; texte: string; comparaisonTexte: string; boutonAccueil: string; boutonAvis: string };
  lecture: Record<
    | "boussole" | "echange" | "reponseDe" | "passerAnimation" | "continuer" | "suite" | "partie" | "consigne" | "retour" | "allerRestitution"
    | "selectionCases" | "selectionScenario"
    | "syntheseTitre" | "syntheseSurligne" | "syntheseSansSurlignage" | "syntheseOutils" | "precisionTitre" | "precisionAjoutee" | "validationTitre" | "validationQuestion" | "validationAide" | "annonceNiveaux"
    | "outilsReperes" | "outilsPropositions" | "outilsAjoutes" | "outilsAjoute" | "outilsManuel" | "outilsClassement" | "outilsApprofondir" | "outilsFonctionne" | "outilsPese"
    | "accelerer" | "digestion" | "indiceDit" | "indiceNonAborde"
    | "valide" | "corrige" | "rebondTitre" | "rebondEchange" | "pointEtapeTitre" | "pointEtapeOuvrir" | "pointEtapeReplier" | "annonceRetenu"
    | "ressourcesTitre" | "ressourceLire" | "nouvelOnglet" | "traduitAnglais",
    string
  >;
  memoire: Record<"titre" | "boutonMobile" | "vide" | "extraits" | "notes" | "jauges" | "replier" | "deplier" | "fermer", string>;
  ideal: { libelle: string; boutonSuite: string };
  restitution: Record<
    | "surtitre" | "titre" | "lettreTitre" | "radarTitre" | "radarPhrase" | "legendeTitre" | "fonctionneTitre" | "ameliorerTitre" | "citationLien" | "pistesTitre" | "pistesIntro" | "boutonSuite"
    | "radarAide" | "radarChoix" | "detailPourquoi" | "detailReleve" | "detailCriteres" | "detailLienEchange" | "detailTonNiveau" | "detailCorrige" | "detailNonAborde"
    | "pisteVise" | "pisteLienTitre" | "pisteLireDemo" | "pisteLireRessource" | "pisteAnglais",
    string
  > & { criteres: Record<DimensionId, DemoCriteria> };
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

/** Moment de l’échange où un élément retenu apparaît dans le panneau : extraction, précision ou validation de la dimension. */
export type RetainedStage = "extraction" | "precision" | "validation";

export type RetainedItem = {
  key: string;
  kind: "extrait" | "tag" | "curseur";
  dimension: DimensionId;
  etape: number;
  stage: RetainedStage;
  texte: string;
  /** Niveau final d’un curseur, après correction éventuelle. */
  niveau?: RadarLevel;
};

/** Dernier échange de sa dimension : c’est là que les niveaux sont validés et que le « premier regard » s’ouvre. */
export function isDimensionEnd(persona: DemoPersona, step: DemoStep) {
  return persona.etapes.filter((item) => item.dimension === step.dimension).at(-1)?.id === step.id;
}

/** Curseurs de toute la dimension, dans l’ordre des échanges : ils sont validés ensemble, à la fin. */
export function getDimensionSliders(persona: DemoPersona, step: DemoStep): DemoSlider[] {
  return persona.etapes.filter((item) => item.dimension === step.dimension).flatMap((item) => item.retenu?.curseurs ?? []);
}

/** Un niveau relevé pendant le parcours : l’aspect, son niveau final, ce qui a été dit, et l’échange où la Boussole l’a relevé. */
export type DimensionReading = { libelle: string; niveau: RadarLevel; propose: RadarLevel | null; dit?: string; nonAborde: boolean; etape: number };

/** Tous les niveaux relevés dans une dimension, échange par échange : la matière du détail affiché au survol du radar. */
export function getDimensionReadings(persona: DemoPersona, dimension: DimensionId): DimensionReading[] {
  return persona.etapes
    .filter((step) => step.dimension === dimension)
    .flatMap((step) => (step.retenu?.curseurs ?? []).map((slider) => ({
      libelle: slider.libelle,
      niveau: slider.corrigeA ?? slider.valeur,
      propose: slider.corrigeA ? slider.valeur : null,
      dit: slider.dit,
      nonAborde: Boolean(slider.nonAborde),
      etape: step.id,
    })));
}

/** Éléments retenus par un échange, dans l’ordre d’apparition dans le panneau (extrait, notes, précision, puis niveaux validés en fin de dimension). */
export function getRetainedItems(step: DemoStep, persona?: DemoPersona): RetainedItem[] {
  const retenu = step.retenu;
  if (!retenu) return [];
  const base = { dimension: step.dimension, etape: step.id };
  const validated = persona && isDimensionEnd(persona, step) ? getDimensionSliders(persona, step) : [];
  return [
    ...(retenu.extrait ? [{ ...base, key: `${step.id}-extrait`, stage: "extraction" as const, kind: "extrait" as const, texte: retenu.extrait }] : []),
    ...(retenu.tags ?? []).map((tag, index) => ({ ...base, key: `${step.id}-tag-${index}`, stage: "extraction" as const, kind: "tag" as const, texte: tag })),
    ...(retenu.precision ? [{ ...base, key: `${step.id}-precision`, stage: "precision" as const, kind: "tag" as const, texte: retenu.precision.note }] : []),
    ...validated.map((slider, index) => ({
      ...base,
      key: `${step.id}-curseur-${index}`,
      stage: "validation" as const,
      kind: "curseur" as const,
      texte: slider.libelle,
      niveau: slider.corrigeA ?? slider.valeur,
    })),
  ];
}

/** Ce qui est déjà joué dans l’échange courant : l’extraction, la précision et la validation de fin de dimension. */
export type ReceptionState = { extracted: boolean; precised: boolean; validated: boolean };

const received = (state: ReceptionState, stage: RetainedStage) => (stage === "extraction" ? state.extracted : stage === "precision" ? state.precised : state.validated);

/**
 * Cumul de ce que la Boussole a retenu : tous les échanges avant `beforeStep`, plus ce que l’échange courant a déjà joué.
 * Déduit du JSON seul, une URL rechargée affiche donc le même panneau.
 */
export function getRetainedUntil(persona: DemoPersona, beforeStep: number, state: ReceptionState): RetainedItem[] {
  return persona.etapes
    .filter((step) => step.id <= beforeStep)
    .flatMap((step) => getRetainedItems(step, persona).filter((item) => step.id < beforeStep || received(state, item.stage)));
}

/** Jauges qualitatives : une dimension est renseignée dès que ses niveaux sont validés (fin de la dimension). */
export function getGauges(persona: DemoPersona, beforeStep: number, validated: boolean) {
  return persona.ordreDimensions.flatMap((dimension) => {
    const last = persona.etapes.filter((step) => step.dimension === dimension).at(-1);
    const reached = last && (last.id < beforeStep || (validated && last.id === beforeStep));
    const level = persona.restitution?.radar[dimension];
    return reached && level ? [{ dimension, level }] : [];
  });
}
