/**
 * Contrôle du contenu de la démonstration playback (`client/src/data/demo-parcours.json`).
 * Les règles de structure s’appliquent à tous les personas ; les règles de contenu (interactions,
 * curseurs, rebonds, numérique responsable, radar, pistes) ne s’appliquent qu’aux personas au statut « pret ».
 * Le lot 1 livre les trois fiches en préparation ; chaque parcours rédigé sera contrôlé dès qu’il passe à « pret ».
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
const STEP_NAMES = new Set(["accueil", "ideal", "restitution", "demos", "futur", "comparaison", "avis"]);

// --- Textes communs ---------------------------------------------------------------------------------
assert(JSON.stringify(content.dimensions) === JSON.stringify(EXPECTED_LABELS), "Les libellés de dimensions doivent reprendre ceux du PRD, dans l’ordre.");
assert(JSON.stringify(content.niveauxRadar) === JSON.stringify(["Exploration", "Bricolage", "Structuré", "Fluide"]), "Les quatre niveaux qualitatifs du radar doivent être Exploration, Bricolage, Structuré, Fluide.");
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
  for (const dimension of order) {
    const inDimension = steps.filter((step) => step.dimension === dimension);
    assert(inDimension.some((step) => step.pointEtape), `${where} : un point d’étape est attendu pour la dimension ${dimension}.`);
  }
  for (const step of steps.filter((item) => item.pointEtape)) {
    if (step.pointEtape.ordreDeGrandeur) assert(/illustratif/i.test(step.pointEtape.ordreDeGrandeur), `${where}, étape ${step.id} : ordre de grandeur sans mention « illustratif ».`);
  }
  const sliders = steps.flatMap((step) => step.retenu?.curseurs ?? []);
  assert(sliders.some((slider) => slider.corrigeA !== null && slider.corrigeA !== undefined), `${where} : au moins une correction de curseur (corrigeA) est attendue.`);
  assert(steps.filter((step) => step.type === "rebond").length + steps.filter((step) => step.rebond).length >= 2, `${where} : au moins 2 rebonds mémoire sont attendus.`);
  assert(steps.filter((step) => step.numeriqueResponsable).length === 1, `${where} : exactement une question sur le numérique responsable est attendue.`);

  const restitution = persona.restitution;
  assert(Boolean(restitution), `${where} : la restitution est requise.`);
  const levels = Object.values(restitution?.radar ?? {});
  assert(levels.length === 5 && levels.every((level) => content.niveauxRadar.includes(level)), `${where} : le radar doit utiliser les 4 niveaux qualitatifs, sans chiffre.`);
  for (const piste of restitution?.pistes ?? []) {
    assert(existingRoutes.has(piste.lien), `${where} : le lien de piste ${piste.lien} ne correspond à aucune route existante.`);
  }
  assert((restitution?.pistes ?? []).length === 3, `${where} : trois pistes (2 semaines, 1 mois, 3–6 mois) sont attendues.`);
}

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
