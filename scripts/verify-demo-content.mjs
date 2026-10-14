/**
 * Contrôle du contenu de la démonstration playback (`client/src/data/demo-parcours.json`).
 * Les règles de structure s’appliquent à tous les personas ; les règles de contenu (interactions,
 * curseurs, rebonds, numérique responsable, radar, pistes) ne s’appliquent qu’aux personas au statut « pret ».
 * Lot 2bis : le parcours de Claire suit l’annexe v2 (échelle Exploration · Improvisation · Organisé · Orchestré,
 * trame concret → général → ce qui pèse, « Un premier regard » en fin de dimension) ; Marc et Nadia seront
 * contrôlés dès qu’ils passeront à « pret » (lot 3).
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const content = JSON.parse(await readFile(resolve("client/src/data/demo-parcours.json"), "utf8"));
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const DIMENSIONS = ["outils", "competences", "donnees", "publics", "partage"];
const EXPECTED_LABELS = {
  outils: "Outils & workflows",
  competences: "Compétences & IA",
  donnees: "Données & archivage",
  publics: "Publics & communication",
  partage: "Partage & cohérence",
};
const PERSONA_IDS = ["cinema", "scene", "arts-visuels"];
const EXPECTED_ORDER = {
  cinema: ["outils", "donnees", "partage", "competences", "publics"],
  scene: ["partage", "publics", "donnees", "outils", "competences"],
  "arts-visuels": ["donnees", "outils", "publics", "competences", "partage"],
};
const LEVELS = ["Exploration", "Improvisation", "Organisé", "Orchestré"];
const MICRO_DEMOS = new Set(["convergence", "tri", "validation", "fiche", "source-unique"]);
const STEP_NAMES = new Set(["accueil", "ideal", "restitution", "demos", "futur", "comparaison", "avis"]);

// --- Textes communs ---------------------------------------------------------------------------------
assert(JSON.stringify(content.dimensions) === JSON.stringify(EXPECTED_LABELS), "Les libellés de dimensions doivent reprendre ceux du PRD, dans l’ordre.");
assert(JSON.stringify(content.niveauxRadar) === JSON.stringify(LEVELS), `Les quatre niveaux qualitatifs doivent être ${LEVELS.join(", ")}.`);
const definitions = content.niveauxDefinitions ?? {};
assert(JSON.stringify(Object.keys(definitions)) === JSON.stringify(LEVELS), "Chaque niveau doit avoir sa définition (niveauxDefinitions), dans l’ordre de l’échelle.");
assert(Object.values(definitions).every((text) => typeof text === "string" && text.length > 10 && !/\d/.test(text)), "Les définitions de niveaux doivent être rédigées, sans chiffre.");
assert(Boolean(content.niveauxTitre), "Le titre des définitions de niveaux (niveauxTitre) est requis.");
const rawJson = await readFile(resolve("client/src/data/demo-parcours.json"), "utf8");
assert(!/Bricolage|Structuré|Fluide/.test(rawJson), "L’ancienne échelle (Bricolage, Structuré, Fluide) ne doit plus apparaître dans le contenu.");
assert(content.lecture?.pointEtapeTitre === "Un premier regard", "Le point d’étape doit s’intituler « Un premier regard ».");
assert(content.lecture?.pointEtapeOuvrir && content.lecture?.pointEtapeReplier, "Les libellés d’ouverture et de repli du premier regard sont requis.");
assert(content.restitution?.ameliorerTitre === "Ce qui pourrait être plus léger", "La restitution doit titrer « Ce qui pourrait être plus léger ».");
assert(content.bandeau === "Démonstration — parcours fictif", "Le bandeau permanent doit afficher « Démonstration — parcours fictif ».");
assert(/fictif/.test(content.confiance?.debut?.texte ?? "") && /fictif/.test(content.confiance?.fin?.texte ?? ""), "Le message de confiance doit apparaître au début et à la fin, et préciser que le parcours est fictif.");
assert(content.avis?.confirmation === "Merci, ton avis est bien arrivé.", "La confirmation d’avis doit être « Merci, ton avis est bien arrivé. ».");
assert(content.avis?.erreurEnvoi === "L’envoi n’a pas abouti, tu peux réessayer.", "Le message d’erreur d’envoi doit être « L’envoi n’a pas abouti, tu peux réessayer. ».");
assert(!/\d/.test((content.niveauxRadar ?? []).join("")), "Les niveaux du radar ne doivent contenir aucun chiffre.");

// --- Personas -----------------------------------------------------------------------------------------
const personas = content.personas ?? [];
assert(JSON.stringify(personas.map((persona) => persona.id)) === JSON.stringify(PERSONA_IDS), "Les trois personas doivent être cinema, scene et arts-visuels, dans cet ordre.");

// Routes existantes pour les liens de pistes : déclarées dans App.tsx.
const appSource = await readFile(resolve("client/src/App.tsx"), "utf8");
const existingRoutes = new Set([...appSource.matchAll(/<Route path=\{"([^"]+)"\}/g)].map((match) => match[1]));

for (const persona of personas) {
  const where = `Persona ${persona.id}`;
  assert(["pret", "en-preparation"].includes(persona.statut), `${where} : statut « pret » ou « en-preparation » attendu.`);
  assert(persona.prenom && persona.metier && persona.accroche, `${where} : prénom, métier et accroche sont requis.`);
  const order = persona.ordreDimensions ?? [];
  assert(order.length === 5 && DIMENSIONS.every((dimension) => order.includes(dimension)), `${where} : les 5 dimensions doivent apparaître une fois chacune.`);
  assert(JSON.stringify(order) === JSON.stringify(EXPECTED_ORDER[persona.id]), `${where} : l’ordre des dimensions diffère de celui du PRD.`);
  if (persona.statut !== "pret") continue;

  const steps = persona.etapes ?? [];
  assert(steps.length >= 10 && steps.length <= 12, `${where} : 10 à 12 interactions attendues (${steps.length} trouvées).`);
  assert(steps.every((step, index) => step.id === index + 1), `${where} : les étapes doivent être numérotées de 1 à N sans trou.`);
  const stepDimensions = [...new Set(steps.map((step) => step.dimension))];
  assert(JSON.stringify(stepDimensions) === JSON.stringify(order), `${where} : les étapes doivent suivre l’ordre déclaré des dimensions.`);
  // Trame d’une dimension : concret → général → ce qui pèse, puis « Un premier regard » sous le dernier échange.
  for (const dimension of order) {
    const inDimension = steps.filter((step) => step.dimension === dimension);
    assert(inDimension.length >= 2 && inDimension.length <= 3, `${where} : 2 à 3 échanges attendus pour la dimension ${dimension} (${inDimension.length} trouvés).`);
    const milestones = inDimension.filter((step) => step.pointEtape);
    assert(milestones.length === 1 && milestones[0] === inDimension.at(-1), `${where} : un seul « premier regard » est attendu pour la dimension ${dimension}, sous son dernier échange.`);
    const weighing = inDimension.filter((step) => step.pese);
    assert(weighing.length >= 1, `${where} : la dimension ${dimension} doit contenir au moins un échange « ce qui pèse » (pese: true).`);
    assert(weighing.every((step) => step !== inDimension[0]), `${where} : dans la dimension ${dimension}, « ce qui pèse » vient après l’entrée concrète.`);
    assert(weighing.every((step) => step.retenu && (step.retenu.extrait || step.retenu.tags?.length || step.retenu.curseurs?.length)), `${where} : chaque échange « ce qui pèse » de la dimension ${dimension} doit être retenu.`);
  }
  for (const step of steps.filter((item) => item.pointEtape)) {
    if (step.pointEtape.ordreDeGrandeur) assert(/illustratif/i.test(step.pointEtape.ordreDeGrandeur), `${where}, étape ${step.id} : ordre de grandeur sans mention « illustratif ».`);
  }
  const sliders = steps.flatMap((step) => step.retenu?.curseurs ?? []);
  assert(sliders.some((slider) => slider.corrigeA !== null && slider.corrigeA !== undefined), `${where} : au moins une correction de curseur (corrigeA) est attendue.`);
  assert(steps.filter((step) => step.type === "rebond").length + steps.filter((step) => step.rebond).length >= 2, `${where} : au moins 2 rebonds mémoire sont attendus.`);
  assert(steps.filter((step) => step.numeriqueResponsable).length === 1, `${where} : exactement une question sur le numérique responsable est attendue.`);

  // Grammaire des interactions : chaque étape doit pouvoir être jouée sans texte codé en dur.
  const STEP_TYPES = new Set(["cases", "question", "scenario", "curseurs", "relance"]);
  const levelsOk = (value) => content.niveauxRadar.includes(value);
  for (const step of steps) {
    const at = `${where}, étape ${step.id}`;
    assert(STEP_TYPES.has(step.type), `${at} : type « ${step.type} » inconnu.`);
    assert(step.question && step.reponse?.transcription, `${at} : question et transcription sont requises.`);
    if (step.type === "cases" || step.type === "scenario") {
      assert(Array.isArray(step.options) && step.options.length >= 2, `${at} : options attendues.`);
      assert((step.reponse.choix ?? []).length > 0 && step.reponse.choix.every((choice) => step.options.includes(choice)), `${at} : les choix doivent figurer parmi les options.`);
      if (step.type === "scenario") assert(step.reponse.choix.length === 1 && step.options.length === 4, `${at} : un micro-scénario a 4 options et un seul choix.`);
    }
    if (step.type === "curseurs") assert((step.retenu?.curseurs ?? []).length > 0, `${at} : une étape « curseurs » doit proposer des curseurs.`);
    for (const slider of step.retenu?.curseurs ?? []) {
      assert(levelsOk(slider.valeur), `${at} : niveau de curseur « ${slider.valeur} » inconnu.`);
      assert(slider.corrigeA === null || levelsOk(slider.corrigeA), `${at} : correction « ${slider.corrigeA} » inconnue.`);
    }
    if (step.retenu?.extrait) assert(step.reponse.transcription.includes(step.retenu.extrait), `${at} : l’extrait retenu doit être un passage exact de la transcription.`);
    if (step.rebond) {
      const source = steps.find((item) => item.id === step.rebond.etape);
      assert(source && source.id < step.id, `${at} : le rebond doit citer une étape antérieure.`);
      const remembered = [source?.retenu?.extrait, ...(source?.retenu?.tags ?? [])];
      assert(remembered.includes(step.rebond.rappel), `${at} : le rappel du rebond doit être un élément retenu à l’étape ${step.rebond.etape}.`);
    }
  }
  const retainedSteps = steps.filter((step) => step.retenu).length;
  // Annexe v2 : chaque échange peut retenir quelque chose ; le panneau doit au moins s’animer une étape sur deux.
  assert(retainedSteps * 2 >= steps.length, `${where} : le panneau doit s’animer au moins une étape sur deux.`);
  assert(persona.ideal?.question && persona.ideal?.transcription, `${where} : la question du numérique idéal est requise.`);

  const restitution = persona.restitution;
  assert(Boolean(restitution), `${where} : la restitution est requise.`);
  const levels = Object.values(restitution?.radar ?? {});
  assert(levels.length === 5 && levels.every((level) => content.niveauxRadar.includes(level)), `${where} : le radar doit utiliser les 4 niveaux qualitatifs, sans chiffre.`);
  for (const piste of restitution?.pistes ?? []) {
    assert(existingRoutes.has(piste.lien), `${where} : le lien de piste ${piste.lien} ne correspond à aucune route existante.`);
  }
  assert(JSON.stringify((restitution?.pistes ?? []).map((piste) => piste.horizon)) === JSON.stringify(["2 semaines", "1 mois", "3–6 mois"]), `${where} : trois pistes (2 semaines, 1 mois, 3–6 mois) sont attendues.`);
  for (const key of ["fonctionne", "ameliorer"]) {
    const items = restitution?.[key] ?? [];
    assert(items.length === 3, `${where} : trois éléments « ${key} » sont attendus.`);
    for (const item of items) {
      const said = steps.find((step) => step.id === item.etape)?.reponse.transcription ?? "";
      assert(said.includes(item.citation), `${where} : « ${item.texte} » doit citer une phrase dite à l’étape ${item.etape}.`);
      if (item.ordreDeGrandeur) assert(/illustratif/i.test(item.ordreDeGrandeur), `${where} : ordre de grandeur sans mention « illustratif » (${item.texte}).`);
    }
  }
  assert([...(restitution?.fonctionne ?? []), ...(restitution?.ameliorer ?? [])].some((item) => item.ordreDeGrandeur), `${where} : au moins une métrique concrète (ordre de grandeur illustratif) est attendue dans la restitution.`);
  assert(/Ce qu’on peut évaluer, on peut l’améliorer\./.test(restitution?.lettre ?? ""), `${where} : la lettre doit rappeler le fil rouge « Ce qu’on peut évaluer, on peut l’améliorer. ».`);
  assert(!/nommage/i.test(JSON.stringify(restitution ?? {})), `${where} : le nommage de fichiers n’est plus un sujet de la restitution.`);
  const demos = persona.demos ?? [];
  const demoIds = demos.map((demo) => demo.id);
  assert(demoIds.length === 3 && new Set(demoIds).size === 3 && demoIds.every((id) => MICRO_DEMOS.has(id)), `${where} : 3 micro-démos distinctes, de gabarits connus, sont attendues.`);
  for (const demo of demos) {
    assert(demo.titre && demo.texte, `${where}, micro-démo ${demo.id} : titre et texte requis.`);
    if (demo.id === "convergence") {
      const width = demo.champs?.length ?? 0;
      assert(width > 0 && demo.reference?.length === width && demo.endroits?.length >= 2 && demo.endroits.every((endroit) => endroit.valeurs?.length === width), `${where}, micro-démo convergence : chaque endroit et la référence donnent une valeur par champ.`);
      assert(demo.endroits.some((endroit) => endroit.valeurs.some((value, index) => value !== demo.reference[index])), `${where}, micro-démo convergence : au moins une valeur doit diverger de la référence.`);
    }
    if (demo.id === "tri") assert(demo.places?.length >= 2 && demo.places.every((place) => place.elements?.length > 0), `${where}, micro-démo tri : au moins deux places, chacune avec des éléments.`);
    if (demo.id === "validation") assert(demo.validations?.length > 0 && demo.validations.every((item) => demo.libelles?.[item.statut]) && demo.historique?.length > 0, `${where}, micro-démo validation : validations avec statut connu et historique requis.`);
  }
}

assert(content.restitution?.radarPhrase === "Ce n’est ni bien ni mal : c’est ton point de départ.", "La phrase sous le radar doit être « Ce n’est ni bien ni mal : c’est ton point de départ. ».");
assert((content.futur?.fonctions ?? []).length === 5, "Les cinq fonctions futures du PRD sont attendues.");

// Les étapes nommées acceptées par le routeur doivent rester alignées avec le contrat d’URL.
const contentSource = await readFile(resolve("client/src/lib/demoContent.ts"), "utf8");
for (const name of STEP_NAMES) assert(contentSource.includes(`"${name}"`), `demoContent.ts doit déclarer l’étape nommée « ${name} ».`);

if (failures.length > 0) {
  console.error("Vérification du contenu de la démo échouée :");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const ready = personas.filter((persona) => persona.statut === "pret").length;
console.log(`Contenu de la démo vérifié : ${personas.length} personas (${ready} jouable${ready > 1 ? "s" : ""}, ${personas.length - ready} en préparation).`);
