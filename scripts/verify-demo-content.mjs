/**
 * Contrôle du contenu de la démonstration playback (`client/src/data/demo-parcours.json`).
 * Les règles de structure s’appliquent à tous les personas ; les règles de contenu (interactions,
 * curseurs, rebonds, numérique responsable, radar, pistes) ne s’appliquent qu’aux personas au statut « pret ».
 * Lot 3 : les trois parcours suivent l’annexe v2 (échelle Exploration · Improvisation · Organisé · Orchestré,
 * trame concret → général → ce qui pèse, « Un premier regard » en fin de dimension) ; la comparaison
 * (section 5) est contrôlée dès que les trois personas sont « pret ».
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
  "arts-visuels": ["outils", "donnees", "publics", "competences", "partage"],
};
const LEVELS = ["Exploration", "Improvisation", "Organisé", "Orchestré"];
const MICRO_DEMOS = new Set(["convergence", "tri", "validation", "fiche", "source-unique", "note"]);
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

// L’accueil dit qui est la personne, ce que la Boussole fait et que le parcours est fictif, sans titre rédigé après coup.
const welcome = content.accueil ?? {};
for (const key of ["surtitre", "titre", "situation", "objectif", "fictifTitre", "fictif"]) assert(typeof welcome[key] === "string" && welcome[key].length > 0, `Accueil : le texte « ${key} » est requis.`);
assert(/^Tu es \{prenom\}, \{metier\}$/.test(welcome.titre ?? ""), "Accueil : le titre doit dire « Tu es {prenom}, {metier} », sans accroche.");
assert(/\{prenom\}.*\{age\}.*\{contexte\}/.test(welcome.situation ?? ""), "Accueil : la situation donne le prénom, l’âge et le contexte de la personne.");
assert(/à la place de \{prenom\}/.test(welcome.objectif ?? "") && /faire le point/.test(welcome.objectif ?? ""), "Accueil : l’objectif rappelle qu’on répond à la place de la personne et que la Boussole fait le point.");
assert(/ce serait différent/.test(welcome.fictif ?? "") && /mécanique/.test(welcome.fictif ?? "") && /principes/.test(welcome.fictif ?? ""), "Accueil : le texte fictif dit que ce serait différent pour soi et que la démo montre la mécanique et les principes.");
assert(!("texte" in welcome), "Accueil : l’ancien texte d’accueil est remplacé par la situation, l’objectif et le texte fictif.");

// --- Personas -----------------------------------------------------------------------------------------
const personas = content.personas ?? [];
assert(JSON.stringify(personas.map((persona) => persona.id)) === JSON.stringify(PERSONA_IDS), "Les trois personas doivent être cinema, scene et arts-visuels, dans cet ordre.");

// Routes existantes pour les liens de pistes : déclarées dans App.tsx.
const appSource = await readFile(resolve("client/src/App.tsx"), "utf8");
const existingRoutes = new Set([...appSource.matchAll(/<Route path=\{"([^"]+)"\}/g)].map((match) => match[1]));

for (const persona of personas) {
  const where = `Persona ${persona.id}`;
  assert(["pret", "en-preparation"].includes(persona.statut), `${where} : statut « pret » ou « en-preparation » attendu.`);
  assert(persona.prenom && persona.metier && persona.contexte && persona.age, `${where} : prénom, âge, métier et contexte sont requis.`);
  assert(!("accroche" in persona), `${where} : aucune accroche ni titre ne précède le parcours ; le contexte reste factuel.`);
  const order = persona.ordreDimensions ?? [];
  assert(order.length === 5 && DIMENSIONS.every((dimension) => order.includes(dimension)), `${where} : les 5 dimensions doivent apparaître une fois chacune.`);
  assert(JSON.stringify(order) === JSON.stringify(EXPECTED_ORDER[persona.id]), `${where} : l’ordre des dimensions diffère de celui du PRD.`);
  if (persona.statut !== "pret") continue;

  const steps = persona.etapes ?? [];
  assert(steps.length >= 10 && steps.length <= 12, `${where} : 10 à 12 interactions attendues (${steps.length} trouvées).`);
  // Même exigence pour les trois parcours : Claire est la référence, Marc et Nadia la rejoignent (14 octobre 2026, retours d’Ulrich).
  assert(steps.length === 12, `${where} : les trois parcours comptent 12 échanges (${steps.length} trouvés).`);
  assert(steps.filter((step) => (step.retenu?.curseurs ?? []).length > 0).length >= 4, `${where} : au moins quatre échanges avec des curseurs induits sont attendus.`);
  assert(steps.filter((step) => step.pointEtape?.ordreDeGrandeur).length >= 3, `${where} : au moins trois « premiers regards » avec un ordre de grandeur illustratif sont attendus.`);
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
    // Échanges « outils » (Ulrich, 15 octobre 2026) : la personne parle d’abord, la Boussole repère, propose, la personne ajoute et classe.
    if (step.type === "cases") {
      const tools = step.outils;
      assert(Boolean(tools), `${at} : un échange « cases » doit déclarer ses outils (outils : cites, ajoutes, ordre…).`);
      if (tools) {
        const cited = tools.cites.map((item) => item.outil);
        assert(cited.length > 0, `${at} : au moins un outil doit être cité à la voix.`);
        for (const item of tools.cites) assert(step.reponse.transcription.includes(item.dit), `${at} : « ${item.dit} » (outil « ${item.outil} ») doit être un passage exact de la transcription.`);
        const added = tools.ajoutes.map((item) => item.outil);
        assert([...cited, ...added].every((tool) => step.options.includes(tool)), `${at} : outils cités et ajoutés doivent figurer parmi les options.`);
        assert(added.length > 0 && added.every((tool) => !cited.includes(tool)), `${at} : les ajouts doivent compléter les outils cités, sans les répéter.`);
        assert(tools.question && tools.complement && tools.classement, `${at} : la relance (question), la parole d’ajout (complement) et de classement (classement) sont requises.`);
        for (const item of tools.ajoutes) assert(tools.complement.toLowerCase().includes(item.dit.toLowerCase()), `${at} : « ${item.dit} » (outil « ${item.outil} ») doit figurer dans la réponse à la relance.`);
        const suiteTools = (tools.suites ?? []).flatMap((suite) => suite.propositions);
        assert((tools.suites ?? []).length > 0 && (tools.suites ?? []).every((suite) => added.includes(suite.apres) && suite.propositions.length > 0), `${at} : de nouveaux boutons (suites) arrivent après au moins un outil activé.`);
        assert(suiteTools.every((tool) => !step.options.includes(tool)) && new Set(suiteTools).size === suiteTools.length, `${at} : les boutons qui arrivent ne répètent ni les options ni les autres suites.`);
        const everything = [...cited, ...added];
        const ranked = tools.ordre.map((item) => item.outil);
        assert(ranked.length === everything.length && everything.every((tool) => ranked.includes(tool)), `${at} : le classement doit contenir chaque outil cité ou ajouté, une fois.`);
        assert(new Set(step.reponse.choix).size === everything.length && everything.every((tool) => step.reponse.choix.includes(tool)), `${at} : reponse.choix doit être la somme des outils cités et ajoutés.`);
        // Les mots qui placent chaque outil se suivent dans l’ordre du classement : l’outil prend sa place quand ils sont dits.
        let cursor = -1;
        for (const item of tools.ordre) {
          const at2 = tools.classement.toLowerCase().indexOf(item.dit.toLowerCase());
          assert(at2 > cursor, `${at} : « ${item.dit} » (classement de « ${item.outil} ») doit figurer dans la parole de classement, après l’outil précédent.`);
          cursor = at2;
        }
        const focus = tools.approfondissement;
        if (focus) {
          assert(focus.question && focus.transcription && focus.outils.length > 0, `${at} : l’approfondissement demande une question, une réponse et des outils.`);
          let probeCursor = -1;
          for (const item of focus.outils) {
            const at3 = focus.transcription.toLowerCase().indexOf(item.dit?.toLowerCase() ?? "\u0000");
            assert(at3 > probeCursor, `${at} : « ${item.dit} » (capsule de « ${item.outil} ») doit figurer dans la réponse d’approfondissement, après la capsule précédente.`);
            probeCursor = at3;
          }
          assert(focus.outils.every((item) => ranked.slice(0, 3).includes(item.outil) && item.fonctionne && item.pese), `${at} : l’approfondissement porte sur les outils en tête du classement, avec ce qui fonctionne et ce qui pèse.`);
        }
      }
    }
    if (step.type === "curseurs") assert((step.retenu?.curseurs ?? []).length > 0, `${at} : une étape « curseurs » doit proposer des curseurs.`);
    for (const slider of step.retenu?.curseurs ?? []) {
      assert(levelsOk(slider.valeur), `${at} : niveau de curseur « ${slider.valeur} » inconnu.`);
      assert(slider.corrigeA === null || levelsOk(slider.corrigeA), `${at} : correction « ${slider.corrigeA} » inconnue.`);
      // Contexte des curseurs (Ulrich, 15 octobre 2026) : chaque niveau se rattache à des mots vraiment dits, ou dit qu’il n’en a pas encore été question.
      assert(Boolean(slider.dit) !== Boolean(slider.nonAborde), `${at} : le curseur « ${slider.libelle} » doit citer ce qui a été dit (dit) ou être marqué nonAborde.`);
      if (slider.dit) {
        const saidSoFar = steps.filter((item) => item.id <= step.id).map((item) => item.reponse.transcription).join(" ");
        assert(saidSoFar.includes(slider.dit), `${at} : « ${slider.dit} » (curseur « ${slider.libelle} ») doit être un passage exact d’une réponse déjà donnée.`);
      }
    }
    if ((step.retenu?.curseurs ?? []).length > 0) {
      const resume = step.retenu.resume ?? "";
      assert(resume.length > 0 && resume.split(/\s+/).length <= 25, `${at} : des curseurs sans résumé de ce qui a été dit (resume, 25 mots au plus) arrivent hors contexte.`);
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
    if (demo.id === "fiche") assert(demo.source && demo.sorties?.length >= 2 && demo.elements?.length >= 2 && demo.elements.every((element) => element.cibles?.length > 0 && element.cibles.every((cible) => demo.sorties.includes(cible))), `${where}, micro-démo fiche : une source, au moins deux sorties, et des éléments qui ne visent que ces sorties.`);
    if (demo.id === "source-unique") assert(demo.destination && demo.pieces?.length >= 2 && new Set(demo.pieces).size === demo.pieces.length, `${where}, micro-démo source unique : une destination et au moins deux pièces distinctes.`);
    if (demo.id === "note") assert(demo.dicteeTitre && demo.dictee?.length >= 2 && demo.note?.titre && demo.note?.champs?.length >= 2 && demo.note.champs.every((champ) => champ.libelle && champ.valeur) && demo.partage, `${where}, micro-démo note : au moins deux phrases dictées, une note d’au moins deux champs remplis et la mention de partage.`);
    if (demo.id === "validation") assert(demo.validations?.length > 0 && demo.validations.every((item) => demo.libelles?.[item.statut]) && demo.historique?.length > 0, `${where}, micro-démo validation : validations avec statut connu et historique requis.`);
  }
}

// --- Comparaison des trois parcours (annexe v2, section 5) ---------------------------------------------
const comparison = content.comparaison ?? {};
for (const key of ["surtitre", "titre", "texte", "questionTitre", "questionLien", "radarTitre", "parcoursSuivi", "boutonVoir", "boutonAvis"]) {
  assert(typeof comparison[key] === "string" && comparison[key].length > 0, `Comparaison : le texte « ${key} » est requis.`);
}
assert(DIMENSIONS.includes(comparison.dimension), "Comparaison : la dimension comparée doit être l’une des cinq dimensions.");
assert(/\{prenom\}/.test(comparison.boutonVoir ?? ""), "Comparaison : le bouton « Voir le parcours de… » doit nommer le persona ({prenom}).");
if (personas.every((persona) => persona.statut === "pret")) {
  const questions = personas.map((persona) => persona.etapes.find((step) => step.dimension === comparison.dimension)?.question);
  assert(questions.every(Boolean) && new Set(questions).size === personas.length, "Comparaison : chaque parcours doit poser sa propre question d’entrée sur la dimension comparée.");
  assert(content.futur?.boutonSuite && !/avis/i.test(content.futur.boutonSuite), "Comparaison : depuis l’écran « futur », le bouton mène à la comparaison, pas encore à l’avis.");
}

assert(content.restitution?.radarPhrase === "Ni bien ni mal. Un point de départ.", "La phrase sous le radar doit être « Ni bien ni mal. Un point de départ. ».");

// --- Écriture (retours d’Ulrich, 15 octobre 2026) --------------------------------------------------------
// Phrases courtes, sans tics d’écriture générée : ni « concret », ni « ce n’est pas X, c’est Y ».
// Les citations de « D’autres regards » restent celles de leurs auteurs et ne sont pas contrôlées ici.
const ownTexts = [];
const collectTexts = (value, where) => {
  if (typeof value === "string") { ownTexts.push({ where, text: value }); return; }
  if (Array.isArray(value)) { value.forEach((item, index) => collectTexts(item, `${where}[${index}]`)); return; }
  if (value && typeof value === "object") for (const [key, item] of Object.entries(value)) if (key !== "ressources") collectTexts(item, `${where}.${key}`);
};
collectTexts(content, "contenu");
const BANNED_STYLE = [
  { pattern: /concr[eè]t/i, label: "le mot « concret »" },
  { pattern: /(n’est|ne sont|n’était|n’étaient)( même)? pas [^.!?]{0,60}?[:,;]\s*(mais )?(c’est|ce sont|c’était)/i, label: "la tournure « ce n’est pas X, c’est Y »" },
  { pattern: /\bnon (pas )?par [^,.]{1,40}, mais\b/i, label: "la tournure « non par X, mais par Y »" },
];
for (const { where, text } of ownTexts) {
  for (const { pattern, label } of BANNED_STYLE) assert(!pattern.test(text), `${where} : ${label} est à bannir (« ${text.slice(0, 80)}… »).`);
}
assert((content.futur?.fonctions ?? []).length === 5, "Les cinq fonctions futures du PRD sont attendues.");

// --- « D’autres regards » : ressources liées (lot 4, annexe v3) ------------------------------------------
// Citations courtes, exactes et attribuées, tirées du corpus « Ressources web MW » : inspiration, jamais preuve.
const catalog = JSON.parse(await readFile(resolve("client/src/data/demo-ressources.json"), "utf8")).ressources ?? [];
const catalogById = new Map(catalog.map((resource) => [resource.id, resource]));
const ROLES = new Set(["pratique", "ouverture", "contrepoint"]);
const STATUSES = new Set(["À définir", "Interne MW", "En ligne"]);
const wordCount = (text) => text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
assert(catalogById.size === catalog.length, "Ressources : chaque identifiant du catalogue doit être unique.");
for (const resource of catalog) {
  const at = `Ressource ${resource.id}`;
  assert(/^[0-9a-f]{32}$/.test(resource.notionId ?? ""), `${at} : identifiant de page Notion (32 caractères hexadécimaux) requis pour la traçabilité.`);
  assert(resource.titre && resource.auteur && resource.media, `${at} : titre, auteur et média sont requis.`);
  assert(["fr", "en"].includes(resource.langue), `${at} : langue « fr » ou « en » attendue.`);
  assert(STATUSES.has(resource.statutEditorial), `${at} : statut éditorial Notion inconnu (« ${resource.statutEditorial} »).`);
  let url = null;
  try { url = new URL(resource.url); } catch { /* signalé ci-dessous */ }
  assert(url?.protocol === "https:", `${at} : URL publique en https requise.`);
  assert(url && [...url.searchParams.keys()].every((key) => !/^(utm_|mc_|fbclid|gclid|ref$|r$|publication_id|post_id|triedRedirect|isFreemail)/.test(key)), `${at} : l’URL ne doit porter aucun paramètre de suivi.`);
  assert(url && !/(brevo|sendinblue|mailchimp|list-manage|substack\.com\/redirect|beehiiv\.com\/redirect|r\.sp1)/.test(url.hostname + url.pathname), `${at} : l’URL ne doit pas être une redirection de newsletter.`);
}
assert(content.lecture?.boussole === "La question de la Boussole", "Le libellé au-dessus de la question doit être « La question de la Boussole ».");
assert(content.lecture?.indiceDit && content.lecture?.indiceNonAborde && !("ecoute" in content.lecture), "Libellés des indices de curseurs requis ; « {prénom} parle… » disparaît, la transcription s’écrit pendant la parole.");
assert(content.lecture?.ressourcesTitre === "D’autres regards", "Le bloc des ressources liées doit s’intituler « D’autres regards ».");
assert(content.lecture?.ressourceLire && content.lecture?.nouvelOnglet && content.lecture?.traduitAnglais, "Les libellés du lien, du nouvel onglet et de la traduction sont requis.");
assert(!("retenuTitre" in (content.lecture ?? {})), "L’ancien bloc « La Boussole retient » sous la réponse est retiré : le libellé retenuTitre ne doit plus exister.");
assert(content.restitution?.corpus === "Les citations de ce parcours viennent du corpus de veille du projet." && content.restitution?.corpusLien, "La restitution doit rappeler l’origine des citations, avec un lien vers les ressources.");
const usedResources = new Set();
for (const persona of personas.filter((item) => item.statut === "pret")) {
  const where = `Persona ${persona.id}`;
  const withResources = persona.etapes.filter((step) => (step.ressources ?? []).length > 0);
  assert(withResources.length >= 4 && withResources.length <= 7, `${where} : quatre à sept échanges avec des ressources liées sont attendus (${withResources.length} trouvés).`);
  assert(withResources.every((step, index) => index === 0 || step.id - withResources[index - 1].id > 1), `${where} : jamais deux échanges de suite avec des ressources liées.`);
  const refs = withResources.flatMap((step) => step.ressources.map((item) => item.ref));
  assert(new Set(refs).size === refs.length, `${where} : une ressource ne doit apparaître qu’une fois par parcours.`);
  assert(withResources.some((step) => step.ressources.some((item) => item.role === "ouverture")), `${where} : au moins une ouverture est attendue dans le parcours.`);
  for (const step of withResources) {
    const at = `${where}, étape ${step.id}`;
    const items = step.ressources;
    assert(items.length <= 2, `${at} : deux citations au plus par échange.`);
    if (items.length === 2) assert(items[0].role === "pratique" && ["ouverture", "contrepoint"].includes(items[1].role), `${at} : deux citations se répondent, un regard pratique puis une ouverture ou un contrepoint.`);
    for (const item of items) {
      const resource = catalogById.get(item.ref);
      usedResources.add(item.ref);
      assert(Boolean(resource), `${at} : la ressource « ${item.ref} » n’existe pas dans le catalogue.`);
      assert(ROLES.has(item.role), `${at} : rôle « ${item.role} » inconnu (pratique, ouverture ou contrepoint).`);
      assert(item.citation && wordCount(item.citation) <= 30, `${at} : la citation de « ${item.ref} » doit compter 30 mots au plus (${wordCount(item.citation ?? "")}).`);
      if (resource && resource.langue !== "fr") {
        assert(item.citationOriginale && wordCount(item.citationOriginale) <= 30, `${at} : une source qui n’est pas en français garde sa citation originale (30 mots au plus) pour vérification.`);
      } else {
        assert(!item.citationOriginale, `${at} : une source en français est citée telle quelle, sans citationOriginale.`);
      }
    }
  }
}
assert(catalog.every((resource) => usedResources.has(resource.id)), `Ressources : chaque ressource du catalogue doit être citée au moins une fois (orphelines : ${catalog.filter((resource) => !usedResources.has(resource.id)).map((resource) => resource.id).join(", ")}).`);

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
