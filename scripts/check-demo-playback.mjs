/**
 * Contrôle Playwright de la démo playback (Claire, Marc et Nadia, comparaison ; lots 3 et 4), à lancer contre un serveur en marche :
 *   node scripts/check-demo-playback.mjs http://localhost:5173 /tmp/captures-demo
 * Couvre les trois parcours à 1280 et 390 px, la comparaison des trois parcours, sauts de chapitre,
 * rechargement direct, bouton retour, clavier, mouvement réduit, tiroir mobile, « Un premier regard »
 * replié et sa mesure d’ouverture, légende des niveaux, débordement horizontal et erreurs console. Lot 4 : ancien bloc
 * « La Boussole retient » absent, « D’autres regards » aux bons échanges (liens en nouvel onglet, mesure `demo_ressource_ouverte`),
 * signal du tiroir mobile. Retours du 24 novembre 2026 (principes valables pour les trois parcours) : questions de la Boussole en grand,
 * synthèse étiquetée (une fiche de données structurées) qui vient après la réponse sans citer ce qui n’est pas sur la page, une seule question
 * de la Boussole en tête de chaque page, précision à la voix, niveaux validés une seule fois à la fin de chaque dimension,
 * toutes les réponses en playback, niveaux écrits sur le radar dans leur couleur, lettre courte et aérée. `CHROME_BIN` permet d’utiliser un Chromium déjà
 * installé si la version attendue par Playwright manque. Sort en code 1 si au moins un contrôle échoue.
 */
import { mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const [BASE = "http://localhost:5173", OUT = join(tmpdir(), "boussole-demo-captures")] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });

const results = [];
const ok = (cond, msg) => { results.push(`${cond ? "PASS" : "FAIL"} ${msg}`); };
const browser = await chromium.launch(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {});

async function newPage(viewport, opts = {}) {
  const context = await browser.newContext({ viewport, ...opts });
  const page = await context.newPage();
  const goto = page.goto.bind(page);
  page.goto = async (url) => { const r = await goto(url); await page.locator("main h1").first().waitFor(); await page.waitForTimeout(300); return r; };
  page.errors = [];
  page.on("console", (m) => { if (m.type() === "error") page.errors.push(m.text()); });
  page.on("pageerror", (e) => page.errors.push(String(e)));
  return { context, page };
}
// Débordement : largeur du document, et tout élément visible qui dépasse à droite du viewport.
const overflow = (page) => page.evaluate(() => {
  const doc = document.documentElement.scrollWidth - window.innerWidth;
  const widest = Math.max(0, ...[...document.querySelectorAll("body *")].filter((el) => !el.closest(".skip-link, [aria-hidden='true'], .sr-only")).map((el) => el.getBoundingClientRect().right - window.innerWidth));
  return Math.max(doc, Math.round(widest));
});
const path = (page) => new URL(page.url()).pathname;
// Repères du lot 4 tirés du contenu lui-même : échanges avec des ressources liées et curseurs induits sous la réponse.
const CONTENT = JSON.parse(readFileSync(new URL("../client/src/data/demo-parcours.json", import.meta.url), "utf8"));
const contentSteps = (id) => CONTENT.personas.find((persona) => persona.id === id).etapes;
const resourceSteps = (id) => new Map(contentSteps(id).filter((step) => step.ressources?.length).map((step) => [step.id, step.ressources.length]));
// Niveaux d’une dimension (validés ensemble, à la fin) et corrections de curseur de cette dimension.
const dimensionSliders = (id, n) => { const dimension = contentSteps(id).find((step) => step.id === n).dimension; return contentSteps(id).filter((step) => step.dimension === dimension).flatMap((step) => step.retenu?.curseurs ?? []); };
const correctionLines = (id, n, prenom) => dimensionSliders(id, n).filter((slider) => slider.corrigeA).map((slider) => `${prenom} corrige « ${slider.libelle} » : ${slider.valeur} → ${slider.corrigeA}.`);
const RESOURCE_HOSTS = ["danslesalgorithmes.net", "medium.com", "uxdesign.cc", "substack.com", "ulrichfischer.net", "fredcavazza.net", "flint.media"];
// Repères propres à chaque parcours (annexe v2) : premiers regards, rebonds, correction de curseur, tiroir mobile.
const PERSONAS = {
  cinema: { prenom: "Claire", steps: 12, milestones: [2, 5, 7, 10, 12], rebonds: [7, 12], correction: { step: 5, text: "Claire corrige « Sauvegarde des médias » : Improvisation → Organisé." }, drawer: { step: 7, note: "e-mail au centre" } },
  scene: { prenom: "Marc", steps: 12, milestones: [3, 5, 8, 10, 12], rebonds: [5, 12], correction: { step: 8, text: "Marc corrige « Fiches techniques » : Improvisation → Organisé." }, drawer: { step: 6, note: "références difficiles à retrouver" } },
  "arts-visuels": { prenom: "Nadia", steps: 12, milestones: [2, 5, 8, 10, 12], rebonds: [2, 10], correction: { step: 8, text: "Nadia corrige « Présence en ligne » : Exploration → Improvisation." }, drawer: { step: 5, note: "inventaire numéroté depuis 1998" } },
};
const CORRECTION = PERSONAS.cinema.correction.text;
const regardButton = (page) => page.getByRole("button", { name: /Un premier regard/ });
// Libellés de l’échelle sous un curseur : aucun ne doit en chevaucher un autre (« Improvisation » à 390 px).
const labelsOverlap = (page) => page.evaluate(() => [...document.querySelectorAll("main .grid-cols-4.hyphens-auto")].some((row) => {
  const boxes = [...row.children].map((child) => { const range = document.createRange(); range.selectNodeContents(child); return range.getBoundingClientRect(); });
  return boxes.some((box, index) => index > 0 && box.left < boxes[index - 1].right - 0.5 && box.top < boxes[index - 1].bottom && boxes[index - 1].top < box.bottom);
}));

// Relevé d’une page d’échange : questions de la Boussole (taille du titre), synthèse (et sa place après la réponse), précision, validation.
const snapshot = (page) => page.evaluate(() => {
  const heading = (el) => parseFloat(getComputedStyle(el.querySelector("h1,h2")).fontSize);
  const synthese = document.querySelector("[data-demo-synthese]");
  const top = (el) => el.getBoundingClientRect().top + window.scrollY;
  const bottom = (el) => el.getBoundingClientRect().bottom + window.scrollY;
  const mains = [...document.querySelectorAll("[data-demo-reponse='main']")];
  return {
    questions: [...document.querySelectorAll("[data-demo-question]")].map((el) => ({ variant: el.dataset.demoQuestion, size: heading(el), text: el.innerText })),
    synthese: Boolean(synthese),
    // La fiche : une ligne (champ, valeur) par donnée, sans citation recopiée ni note répétée.
    ficheLignes: synthese ? synthese.querySelectorAll("dl > div").length : 0,
    syntheseCitations: synthese ? synthese.querySelectorAll("blockquote, mark").length : 0,
    titres: [...document.querySelectorAll("[data-demo-question='titre']")].map((el) => el.querySelector("h1").innerText),
    // La synthèse vient après la réponse (jamais en même temps), étiquetée.
    syntheseApresReponse: synthese ? mains.every((el) => top(synthese) >= bottom(el) - 1) && /Synthèse de la Boussole/i.test(synthese.innerText) : null,
    precision: document.querySelectorAll("[data-demo-precision]").length,
    validation: document.querySelectorAll("[data-demo-validation]").length,
    indices: document.querySelectorAll("[data-demo-indice]").length,
    capsules: synthese ? synthese.querySelectorAll("ul.lg\\:grid-cols-3 > li").length : 0,
  };
});

async function playStep(page, { skip = false, prenom = "Claire" } = {}) {
  await page.getByRole("button", { name: `Réponse de ${prenom}` }).click();
  const pages = [];
  // Un échange peut avoir plusieurs pages : on enchaîne les « Voir la suite » jusqu’au bouton de sortie.
  const exit = page.locator("main button").filter({ hasText: /^(Continuer|Voir la restitution|Voir la suite)/ });
  for (let guard = 0; guard < 4; guard += 1) {
    if (skip) await page.getByRole("button", { name: "Passer l’animation" }).click({ timeout: 2000 }).catch(() => {});
    await exit.waitFor({ timeout: 45000 });
    // En lecture réelle, la synthèse et la précision s’écrivent encore un instant après l’arrivée du bouton de sortie.
    await page.waitForTimeout(skip ? 0 : 200);
    pages.push(await snapshot(page));
    if (!/^Voir la suite/.test((await exit.textContent()) ?? "")) return { pages };
    await exit.click();
  }
  return { pages };
}

async function walk(label, viewport, { skip, persona: id = "cinema" }) {
  const P = PERSONAS[id];
  const { context, page } = await newPage(viewport);
  let maxOverflow = 0;
  const check = async (name) => { const o = await overflow(page); maxOverflow = Math.max(maxOverflow, o); if (o > 0) results.push(`FAIL ${label} débordement ${o}px sur ${name}`); };

  await page.goto(`${BASE}/experience`);
  ok((await page.getByRole("link", { name: /Voir une démonstration du parcours/ }).count()) === 2, `${label} /experience : bouton d’appel en haut de page et sous les écrans`);
  await check("/experience");
  const siteErrors = page.errors.splice(0);
  if (siteErrors.length) results.push(`NOTE ${label} /experience (hors démo, préexistant) : ${siteErrors.length} erreur(s) console : ${siteErrors[0].slice(0, 90)}`);
  await page.getByRole("link", { name: /Voir une démonstration du parcours/ }).first().click();
  await page.waitForURL("**/experience/demo");
  await page.locator("main h1").waitFor();
  ok((await page.getByText("En préparation", { exact: true }).count()) === 0, `${label} picker : trois parcours jouables, aucun « En préparation »`);
  await page.getByRole("link", { name: new RegExp(`Être ${P.prenom}`) }).click();
  await page.waitForURL(`**/${id}/accueil`);
  await check("accueil");
  // Accueil sans titre rédigé après coup : on dit qui est la personne, ce que fait la Boussole, et que c’est fictif.
  const persona = CONTENT.personas.find((item) => item.id === id);
  ok((await page.locator("main h1").textContent()) === `Tu es ${persona.prenom}, ${persona.metier.toLowerCase()}`, `${label} accueil : « Tu es ${persona.prenom}, ${persona.metier.toLowerCase()} », sans titre d’accroche`);
  ok((await page.locator("main").getByText(/\d+ ans/).count()) === 0, `${label} accueil : ni âge ni contexte`);
  ok((await page.getByText(`Imagine que tu es ${persona.prenom}`).count()) === 1 && (await page.getByText("ce serait différent", { exact: false }).count()) === 1 && (await page.getByText("à sa place", { exact: false }).count()) === 1, `${label} accueil : on répond à la place de la personne, c’est fictif, pour soi ce serait différent`);
  await page.screenshot({ path: `${OUT}/${label}-accueil.png`, fullPage: true });
  await page.getByRole("link", { name: /Commencer/ }).click();

  for (let n = 1; n <= P.steps; n++) {
    await page.waitForURL(`**/${id}/${n}`);
    // Le rappel « Tu disais plus tôt » est sur la première page de l’échange : on le mesure avant de jouer la suite.
    const rebondCount = await page.getByText("Tu disais plus tôt").count();
    const played = await playStep(page, { skip: skip && n % 2 === 0, prenom: P.prenom });
    await check(`étape ${n}`);
    if ([P.correction.step, P.drawer.step, P.steps].includes(n)) await page.screenshot({ path: `${OUT}/${label}-etape-${n}.png`, fullPage: true });
    const regard = await regardButton(page).count();
    ok((P.milestones.includes(n) ? regard === 1 : regard === 0), `${label} étape ${n} : premier regard ${P.milestones.includes(n) ? "présent" : "absent"}`);
    if (regard) {
      ok((await regardButton(page).getAttribute("aria-expanded")) === "false" && (await page.getByText("Ordre de grandeur illustratif", { exact: false }).count()) === 0, `${label} étape ${n} : premier regard replié par défaut`);
    }
    if (n === P.correction.step) {
      ok((await page.getByText(P.correction.text).count()) === 1, `${label} étape ${n} : correction de curseur affichée à la fin de la dimension`);
      ok(!(await labelsOverlap(page)), `${label} étape ${n} : libellés de l’échelle sans chevauchement`);
    }
    if (n === P.steps) {
      await regardButton(page).click();
      await check(`étape ${n}, regard ouvert`);
      await page.screenshot({ path: `${OUT}/${label}-etape-${n}-regard-ouvert.png`, fullPage: true });
    }
    ok(rebondCount === (P.rebonds.includes(n) ? 1 : 0), `${label} étape ${n} : rebond mémoire ${P.rebonds.includes(n) ? "présent" : "absent"}`);
    // Lot 4 : l’ancien bloc sous la réponse a disparu ; la validation humaine et « D’autres regards » restent.
    ok((await page.locator("main").getByText("La Boussole retient", { exact: true }).count()) === 0, `${label} étape ${n} : ancien bloc « La Boussole retient » absent`);
    // Principes des retours du 24 novembre 2026, vérifiés sur chaque échange des trois parcours.
    const stepContent = contentSteps(id).find((step) => step.id === n);
    const isEnd = P.milestones.includes(n);
    // 1. Toute question de la Boussole est en grand (20 px au moins) ; chaque page n’a qu’une question en tête, la sienne :
    //    jamais la question de la page précédente reprise au-dessus.
    const questions = played.pages.flatMap((snap) => snap.questions);
    ok(questions.length >= 1 && questions.every((question) => question.size >= 20), `${label} étape ${n} : questions de la Boussole en grand (${questions.map((question) => question.size).join("/")} px)`);
    ok(played.pages.every((snap) => snap.titres.length === 1) && new Set(played.pages.map((snap) => snap.titres[0])).size === played.pages.length, `${label} étape ${n} : une seule question en tête de chaque page, jamais répétée d’une page à l’autre`);
    // 2. Après chaque réponse, une synthèse étiquetée, placée sous la réponse et jamais en même temps qu’elle.
    const syntheses = played.pages.filter((snap) => snap.synthese);
    ok(syntheses.length === 1 && syntheses[0].syntheseApresReponse === true, `${label} étape ${n} : synthèse de la Boussole étiquetée, après la réponse`);
    ok(syntheses[0].ficheLignes === stepContent.retenu.fiche.length && syntheses[0].syntheseCitations === 0, `${label} étape ${n} : la synthèse est une fiche de ${stepContent.retenu.fiche.length} lignes, sans citation absente de la page`);
    // 3. Une précision à la voix seulement quand le passage retenu le demande.
    ok(played.pages.reduce((total, snap) => total + snap.precision, 0) === (stepContent.retenu?.precision ? 1 : 0), `${label} étape ${n} : précision ${stepContent.retenu?.precision ? "présente" : "absente"}`);
    // 4. Les niveaux se valident une seule fois, à la fin de la dimension, sur leur page : aucun curseur ailleurs.
    const validationPages = played.pages.filter((snap) => snap.validation > 0);
    ok(validationPages.length === (isEnd ? 1 : 0) && played.pages.filter((snap) => snap.validation === 0).every((snap) => snap.indices === 0), `${label} étape ${n} : niveaux ${isEnd ? "validés sur leur page, en fin de dimension" : "absents (validation seulement en fin de dimension)"}`);
    if (isEnd) {
      ok(validationPages[0].indices === dimensionSliders(id, n).length, `${label} étape ${n} : ${dimensionSliders(id, n).length} niveau(x) de la dimension, chacun avec ce qui a été dit`);
      const lines = correctionLines(id, n, P.prenom);
      const verdicts = lines.length ? await Promise.all(lines.map((line) => page.getByText(line).count())) : [Number(await page.getByText(`${P.prenom} valide.`).isVisible())];
      ok(verdicts.every((count) => count === 1), `${label} étape ${n} : ${lines.length ? `${lines.length} correction(s) à la voix affichée(s)` : "validation affichée"}`);
    }
    if (stepContent.outils?.approfondissement) {
      ok(syntheses[0].capsules === stepContent.outils.approfondissement.outils.length, `${label} étape ${n} : ce qui fonctionne et ce qui pèse n’arrive que dans la synthèse (${syntheses[0].capsules} capsules)`);
    }
    const expected = resourceSteps(id).get(n) ?? 0;
    const block = page.locator("[data-demo-ressources]");
    ok((await block.count()) === (expected ? 1 : 0), `${label} étape ${n} : « D’autres regards » ${expected ? "présent" : "absent"}`);
    if (expected) {
      const links = block.getByRole("link", { name: /Lire l’article/ });
      ok((await block.locator("blockquote").count()) === expected && (await links.count()) === expected, `${label} étape ${n} : ${expected} citation(s) et autant de liens`);
      const attrs = await links.evaluateAll((items) => items.map((a) => [a.target, a.rel, a.href.startsWith("https://"), a.textContent.includes("(nouvel onglet)")]));
      ok(attrs.every(([target, rel, https, mention]) => target === "_blank" && rel.includes("noopener") && rel.includes("noreferrer") && https && mention), `${label} étape ${n} : liens en nouvel onglet (target, rel, https, mention)`);
      ok(await block.getByRole("heading", { name: "D’autres regards" }).isVisible(), `${label} étape ${n} : titre « D’autres regards »`);
    }
    if (label.startsWith("mobile") && n === P.drawer.step) {
      const trigger = page.getByRole("button", { name: /Ce que je retiens \(\d+\)/ });
      const text = await trigger.textContent();
      ok(Number(await trigger.getAttribute("data-pulses")) > 0, `${label} bouton tiroir : signal d’ajout joué (${await trigger.getAttribute("data-pulses")})`);
      ok(/\((\d+)\)/.test(text) && Number(text.match(/\((\d+)\)/)[1]) > 5, `${label} bouton tiroir : ${text}`);
      const bar = await page.locator("main button").filter({ hasText: /Continuer/ }).boundingBox();
      const pill = await trigger.boundingBox();
      ok(pill.y + pill.height <= bar.y - 4, `${label} bouton tiroir au-dessus de la barre de commandes`);
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor();
      ok(await dialog.getByText(P.drawer.note, { exact: true }).isVisible(), `${label} tiroir : notes visibles`);
      await page.screenshot({ path: `${OUT}/${label}-tiroir.png` });
      await dialog.getByRole("button", { name: "Fermer" }).click();
      await dialog.waitFor({ state: "detached" });
    }
    await page.locator("main button").filter({ hasText: /^Continuer/ }).click();
  }
  await page.waitForURL(`**/${id}/ideal`);
  await playStep(page, { skip, prenom: P.prenom });
  await page.locator("main button").filter({ hasText: /Voir la restitution/ }).click();
  await page.waitForURL(`**/${id}/restitution`);
  await page.waitForTimeout(2500);
  await check("restitution");
  ok((await page.locator(".recharts-radar-polygon").count()) === 1, `${label} restitution : radar dessiné`);
  const radarText = await page.locator("figure svg").first().textContent();
  ok(!/\d/.test(radarText), `${label} restitution : aucun chiffre dans le radar`);
  ok((await page.getByText("Ni bien ni mal. Un point de départ.").count()) === 0, `${label} restitution : plus de phrase sous le radar`);
  // Lettre courte et aérée : trois ou quatre paragraphes distincts, sans le fil rouge « Ce qu’on peut évaluer… ».
  const letter = await page.locator("section[aria-labelledby=demo-lettre] p").allInnerTexts();
  ok(letter.length >= 3 && letter.length <= 4 && !letter.join(" ").includes("peut évaluer") && letter.join(" ").split(/\s+/).length <= 130, `${label} restitution : lettre courte en ${letter.length} paragraphes (${letter.join(" ").split(/\s+/).length} mots), sans phrase fil rouge`);
  // Les niveaux s’écrivent sur le radar, sous chaque dimension, dans la couleur de la légende.
  const onRadar = await page.locator("figure svg text tspan").evaluateAll((items) => items.map((item) => [item.textContent, item.getAttribute("fill")]).filter(([text]) => ["Exploration", "Improvisation", "Organisé", "Orchestré"].includes(text)));
  const legend = await page.locator("figure dl dt").evaluateAll((items) => Object.fromEntries(items.map((item) => [item.textContent.trim(), getComputedStyle(item).color])));
  const toRgb = (hex) => { const n = parseInt(hex.slice(1), 16); return `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})`; };
  ok(onRadar.length === 5 && onRadar.every(([text, fill]) => legend[text] === toRgb(fill)), `${label} restitution : cinq niveaux écrits sur le radar, dans la couleur de la légende (${onRadar.map(([text]) => text).join(", ")})`);
  ok((await page.locator("figure ul.sr-only li").filter({ hasText: /: (Exploration|Improvisation|Organisé|Orchestré)$/ }).count()) === 5, `${label} restitution : la même information reste lisible au lecteur d’écran`);
  ok(await page.getByText("Légende : ce que veulent dire les niveaux", { exact: true }).isVisible(), `${label} restitution : légende des niveaux titrée`);
  ok((await page.locator("figure dl dt").allInnerTexts()).map((text) => text.trim()).join(" · ") === "Exploration · Improvisation · Organisé · Orchestré", `${label} restitution : définitions des 4 niveaux sous le radar`);

  // Détail au survol : le panneau suit la dimension survolée, à droite du radar sur grand écran, avec pourquoi, relevés et critères.
  const order = CONTENT.personas.find((persona) => persona.id === id).ordreDimensions;
  const dimensions = order.map((dimension) => CONTENT.dimensions[dimension]);
  const detail = page.locator("[data-demo-detail]");
  ok((await detail.count()) === 1 && (await detail.getAttribute("data-demo-detail")) === order[0], `${label} restitution : le détail de la première dimension est affiché d’emblée`);
  await page.locator("[data-demo-radar]").scrollIntoViewIfNeeded();
  const radarBox = await page.locator("[data-demo-radar]").boundingBox();
  const wide = page.viewportSize().width >= 1024;
  for (let index = 0; index < order.length; index += 1) {
    const angle = (index * 2 * Math.PI) / order.length;
    const cx = radarBox.x + radarBox.width / 2;
    const cy = radarBox.y + radarBox.height / 2;
    await page.mouse.move(cx + Math.sin(angle) * 90, cy - Math.cos(angle) * 90);
    await page.waitForTimeout(350);
    const dim = order[index];
    ok((await detail.getAttribute("data-demo-detail")) === dim, `${label} restitution : le survol de « ${dimensions[index]} » affiche son détail`);
    const sections = await detail.locator("h4").allTextContents();
    ok(sections.join("|") === "Pourquoi ce niveau|Ce que la Boussole a relevé|Les critères de cette dimension", `${label} restitution : ${dim} : pourquoi, relevés et critères`);
    ok((await detail.locator("ol li").count()) === 4 && (await detail.locator("ol li[aria-current=true]").count()) === 1, `${label} restitution : ${dim} : quatre critères, le niveau du parcours marqué`);
    ok((await detail.locator("ul li").count()) >= 1, `${label} restitution : ${dim} : au moins un niveau relevé`);
    if (wide) {
      const box = await detail.boundingBox();
      ok(box.x >= radarBox.x + radarBox.width - 4 && Math.abs(box.y - radarBox.y) < 140, `${label} restitution : ${dim} : le détail est à droite du radar`);
    }
  }
  const firstButton = page.getByRole("group", { name: "Choisir une dimension" }).getByRole("button").first();
  await firstButton.click();
  ok((await detail.getAttribute("data-demo-detail")) === order[0] && (await firstButton.getAttribute("aria-pressed")) === "true", `${label} restitution : la liste de dimensions pilote aussi le détail (clavier, toucher)`);

  // Pistes : chacune dit quelle dimension elle fait avancer et pourquoi son lien est là ; le lien mène à du contenu qui existe.
  const pistes = page.locator("#demo-pistes ~ ol > li");
  ok((await pistes.count()) === 3, `${label} restitution : 3 pistes`);
  ok((await page.getByText("Les citations de ce parcours viennent du corpus de veille du projet.").count()) === 0 && (await page.locator("#demo-pistes ~ p a[href='/ressources']").count()) === 0, `${label} restitution : plus de lien générique sans raison`);
  for (let index = 0; index < 3; index += 1) {
    const piste = pistes.nth(index);
    const text = await piste.textContent();
    ok(/Fait avancer : /.test(text) && /Pourquoi ce lien/.test(text), `${label} restitution : piste ${index + 1} : dimension visée et raison du lien`);
    ok((await piste.locator("a").count()) === 1, `${label} restitution : piste ${index + 1} : un seul lien`);
    const link = piste.locator("a");
    const href = await link.getAttribute("href");
    if (href.startsWith("http")) ok((await link.getAttribute("target")) === "_blank" && /noopener/.test(await link.getAttribute("rel")) && /nouvel onglet/.test(await link.innerText()), `${label} restitution : piste ${index + 1} : lien externe en nouvel onglet, annoncé`);
    else ok(/\/demos#demo-micro-[a-z-]+$/.test(href), `${label} restitution : piste ${index + 1} : lien vers une animation précise (${href})`);
  }
  ok(await page.getByRole("heading", { name: "Ce qui pourrait être plus léger" }).isVisible(), `${label} restitution : « Ce qui pourrait être plus léger »`);
  await page.screenshot({ path: `${OUT}/${label}-restitution.png`, fullPage: true });
  await page.getByRole("link", { name: /Voir à quoi ça pourrait ressembler/ }).click();
  await page.waitForURL(`**/${id}/demos`);
  for (const button of await page.getByRole("button", { name: "Lancer l’animation" }).all()) await button.click();
  await page.waitForTimeout(8000);
  ok((await page.getByText("Après", { exact: true }).count()) === 3, `${label} micro-démos : 3 animations terminées`);
  await check("demos");
  await page.screenshot({ path: `${OUT}/${label}-demos.png`, fullPage: true });
  await page.getByRole("link", { name: /Et ensuite/ }).click();
  await page.waitForURL(`**/${id}/futur`);
  ok((await page.getByText("Bientôt", { exact: true }).count()) === 5, `${label} futur : 5 fonctions grisées`);
  await check("futur");
  await page.getByRole("link", { name: /Comparer les trois parcours/ }).click();
  await page.waitForURL(`**/${id}/comparaison`);
  await page.waitForTimeout(500);
  await check("comparaison");
  ok((await page.locator(".recharts-radar-polygon").count()) === 3, `${label} comparaison : 3 radars`);
  ok((await page.locator("main blockquote").count()) === 3, `${label} comparaison : la même dimension formulée 3 fois`);
  ok(!/\d/.test((await page.locator("main figure").allInnerTexts()).join(" ")), `${label} comparaison : aucun chiffre dans les radars`);
  ok((await page.locator("main figure svg text tspan").evaluateAll((items) => items.filter((item) => ["Exploration", "Improvisation", "Organisé", "Orchestré"].includes(item.textContent)).length)) === 15, `${label} comparaison : le niveau est écrit sur chacun des trois radars`);
  ok(await page.getByText("Ni bien ni mal. Un point de départ.").first().isVisible(), `${label} comparaison : phrase « Ni bien ni mal. Un point de départ. »`);
  ok((await page.getByText("Le parcours que tu as suivi").count()) === 1, `${label} comparaison : parcours suivi signalé`);
  const others = Object.values(PERSONAS).filter((item) => item !== P).map((item) => item.prenom);
  ok((await Promise.all(others.map((prenom) => page.getByRole("link", { name: `Voir le parcours de ${prenom}` }).count()))).every((count) => count === 1), `${label} comparaison : liens vers ${others.join(" et ")}`);
  await page.screenshot({ path: `${OUT}/${label}-comparaison.png`, fullPage: true });
  await page.getByRole("link", { name: /Donner mon avis/ }).click();
  await page.waitForURL(`**/${id}/avis`);
  await check("avis");
  ok(page.errors.length === 0, `${label} parcours complet sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  ok(maxOverflow <= 0, `${label} aucun débordement horizontal`);
  await context.close();
}

for (const id of Object.keys(PERSONAS)) {
  await walk(`desktop-${id}`, { width: 1280, height: 900 }, { skip: false, persona: id });
  await walk(`mobile-${id}`, { width: 390, height: 844 }, { skip: true, persona: id });
}

// Sauts de chapitre, rechargement direct, bouton retour, clavier.
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  await page.goto(`${BASE}/experience/demo/cinema/3`);
  await page.getByRole("navigation", { name: "Progression du parcours" }).getByRole("link", { name: "Partage & cohérence" }).click();
  ok(path(page) === "/experience/demo/cinema/6", `saut de chapitre Partage → ${path(page)}`);
  await page.getByRole("navigation", { name: "Progression du parcours" }).getByRole("link", { name: "Restitution" }).click();
  ok(path(page) === "/experience/demo/cinema/restitution", `saut de chapitre Restitution → ${path(page)}`);

  await page.goto(`${BASE}/experience/demo/cinema/7`);
  const panel = page.locator("aside[aria-labelledby='demo-memoire-titre']");
  ok(await panel.getByText("e-mail au centre", { exact: true }).isVisible(), "rechargement direct étape 7 : panneau cumulé (étape 1)");
  ok(await panel.getByText("Sauvegarde des médias : Organisé", { exact: true }).isVisible(), "rechargement direct étape 7 : curseur corrigé conservé");
  ok((await panel.locator(".ring-2").count()) === 1, "rechargement direct étape 7 : élément cité mis en évidence");
  ok(await panel.getByText("Outils & workflows", { exact: true }).first().isVisible(), "rechargement direct étape 7 : jauges des dimensions passées");

  await page.goto(`${BASE}/experience/demo/cinema/5`);
  await playStep(page, { skip: true });
  await page.locator("main button").filter({ hasText: /^Continuer/ }).click();
  await page.waitForURL("**/cinema/6");
  await page.goBack();
  ok(path(page) === "/experience/demo/cinema/5", `bouton retour du navigateur → ${path(page)}`);

  await page.goto(`${BASE}/experience/demo/cinema/1`);
  await page.locator("main").focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  ok((await page.getByRole("button", { name: "Passer l’animation" }).count()) === 1, "clavier : Entrée lance la réponse");
  await page.keyboard.press(" ");
  ok((await page.locator("main button").filter({ hasText: /^Voir la suite/ }).count()) === 1, "clavier : Espace passe l’animation et s’arrête à la fin de la page 1");
  // L’échange 1 (outils) compte deux pages : réponse, puis classement et approfondissement.
  await page.keyboard.press("Enter");
  await page.keyboard.press(" ");
  ok((await page.locator("main button").filter({ hasText: /^Continuer/ }).count()) === 1, "clavier : page 2 (classement) jouée, Continuer disponible");
  await page.keyboard.press("Enter");
  await page.waitForURL("**/cinema/2");
  ok(true, "clavier : Entrée continue vers l’étape 2");
  await page.keyboard.press("ArrowRight");
  await page.waitForURL("**/cinema/3");
  await page.keyboard.press("ArrowLeft");
  await page.waitForURL("**/cinema/2");
  ok(true, "clavier : flèches droite/gauche changent d’étape");
  // Tabulation : le bouton principal est atteignable et garde le focus quand son libellé change.
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    if (await page.evaluate(() => document.activeElement?.textContent?.includes("Réponse de Claire"))) break;
  }
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  ok(await page.evaluate(() => document.activeElement?.tagName === "BUTTON"), "clavier : le focus reste sur le bouton principal pendant la lecture");
  ok(page.errors.length === 0, `navigation et clavier sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// « Un premier regard » : ouverture au clic et au clavier sans changer d’étape, mesure `demo_regard_ouvert`, aide sur les niveaux.
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  await context.route("https://tag.grainql.com/**", (route) => route.fulfill({
    contentType: "application/javascript",
    body: "window.__demoEvents = []; window.GrainTag = { track: (name, props) => window.__demoEvents.push({ name, props }) };",
  }));
  await page.goto(`${BASE}/experience/demo/cinema/2`);
  await playStep(page, { skip: true });
  const regard = regardButton(page);
  await regard.click();
  ok((await regard.getAttribute("aria-expanded")) === "true", "premier regard : ouvert au clic");
  ok(await page.getByText("Ordre de grandeur illustratif : 1 à 2 h par semaine", { exact: false }).isVisible(), "premier regard : texte et ordre de grandeur visibles une fois ouvert");
  const events = await page.evaluate(() => window.__demoEvents ?? []);
  const opened = events.filter((event) => event.name === "demo_regard_ouvert");
  ok(opened.length === 1 && opened[0].props.persona === "cinema" && opened[0].props.etape === "2" && opened[0].props.dimension === "outils", `premier regard : ouverture mesurée (${JSON.stringify(opened)})`);
  await regard.press("Enter");
  ok((await regard.getAttribute("aria-expanded")) === "false" && path(page) === "/experience/demo/cinema/2", "premier regard : Entrée replie sans changer d’étape");
  await regard.press(" ");
  ok((await regard.getAttribute("aria-expanded")) === "true" && path(page) === "/experience/demo/cinema/2", "premier regard : Espace rouvre sans changer d’étape");
  ok((await page.evaluate(() => (window.__demoEvents ?? []).filter((event) => event.name === "demo_regard_ouvert").length)) === 2, "premier regard : chaque ouverture est mesurée, pas les replis");

  // L’aide des niveaux se trouve sur la page de validation de fin de dimension, repliée sous les curseurs.
  await page.goto(`${BASE}/experience/demo/cinema/2`);
  await playStep(page, { skip: true });
  const help = page.locator("main summary").filter({ hasText: "Ce que veulent dire les niveaux" });
  ok((await help.count()) === 1 && !(await page.getByText("Une source fait foi", { exact: false }).isVisible()), "aide des niveaux : repliée sous les curseurs");
  await help.focus();
  await page.keyboard.press("Enter");
  ok(await page.getByText("Une source fait foi", { exact: false }).isVisible() && path(page) === "/experience/demo/cinema/2", "aide des niveaux : ouverte au clavier sans changer d’étape");
  ok(page.errors.length === 0, `premier regard et aide sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// Parole et transcription simultanées : le texte s’écrit dès que l’onde s’anime, l’onde s’apaise quand il se termine.
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  await page.goto(`${BASE}/experience/demo/scene/3`);
  ok(await page.getByText("La question de la Boussole", { exact: true }).isVisible(), "libellé « La question de la Boussole » au-dessus de la question");
  await page.getByRole("button", { name: "Réponse de Marc" }).click();
  await page.waitForTimeout(700);
  const typed = await page.evaluate(() => {
    const span = document.querySelector("main [aria-hidden='true'].grid > span:last-child");
    return span ? span.textContent.replace(/\s+/g, " ").trim().length : 0;
  });
  ok(typed > 3 && (await page.getByText("Marc parle…").count()) === 0, `parole : le texte s’écrit pendant l’onde, sans attente préalable (${typed} caractères à 0,7 s)`);
  ok((await page.getByRole("button", { name: "Passer l’animation" }).count()) === 1, "parole : la lecture est encore en cours pendant l’écriture");
  await page.locator("main button").filter({ hasText: /^(Continuer|Voir la suite)/ }).waitFor({ timeout: 45000 });
  const amplitude = await page.evaluate(() => document.querySelector("main .h-8[aria-hidden='true']")?.style.transform ?? "");
  ok(/scaleY\(0\.45\)/.test(amplitude), `parole : l’onde est au repos quand le texte est terminé (${amplitude})`);
  ok(page.errors.length === 0, `parole et transcription sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// « D’autres regards » : un lien ouvre la source dans un nouvel onglet et l’ouverture est mesurée (`demo_ressource_ouverte`).
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  await context.route("https://tag.grainql.com/**", (route) => route.fulfill({
    contentType: "application/javascript",
    body: "window.__demoEvents = []; window.GrainTag = { track: (name, props) => window.__demoEvents.push({ name, props }) };",
  }));
  // Les sources externes ne sont pas chargées pendant le contrôle : seule l’ouverture de l’onglet compte.
  await context.route((url) => RESOURCE_HOSTS.some((host) => url.hostname.endsWith(host)), (route) => route.fulfill({ contentType: "text/html", body: "<title>source</title>" }));
  await page.goto(`${BASE}/experience/demo/scene/1`);
  await playStep(page, { skip: true, prenom: "Marc" });
  const block = page.locator("[data-demo-ressources]");
  const before = await page.evaluate(() => window.scrollY);
  const [popup] = await Promise.all([context.waitForEvent("page"), block.getByRole("link", { name: /Lire l’article/ }).first().click()]);
  await popup.waitForLoadState();
  ok(new URL(popup.url()).hostname === "danslesalgorithmes.net" && path(page) === "/experience/demo/scene/1", `ressource : la source s’ouvre dans un nouvel onglet, la démo reste sur l’échange (${popup.url()})`);
  await popup.close();
  const opened = (await page.evaluate(() => window.__demoEvents ?? [])).filter((event) => event.name === "demo_ressource_ouverte");
  ok(opened.length === 1 && opened[0].props.persona === "scene" && opened[0].props.etape === "1" && opened[0].props.ressource === "guillaud-travail-intellectuel" && Object.keys(opened[0].props).length === 3, `ressource : ouverture mesurée sans donnée personnelle (${JSON.stringify(opened)})`);
  ok(Math.abs((await page.evaluate(() => window.scrollY)) - before) < 400, "ressource : la page de la démo ne saute pas au clic");
  ok(page.errors.length === 0, `ressources liées sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// Outils (Claire, échange 1) : la relance propose des boutons, la réponse à la voix les active, de nouveaux boutons arrivent, les autres restent à cliquer.
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  await page.goto(`${BASE}/experience/demo/cinema/1`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  const chip = (name) => page.locator("main section button[aria-pressed]").filter({ hasText: name });
  await chip("Logiciel de montage").waitFor({ timeout: 15000 });
  ok((await chip("WhatsApp").getAttribute("aria-pressed")) === "false", "outils : avant la réponse, aucun bouton n’est activé");
  ok((await chip("Signal").count()) === 0, "outils : les boutons de suite n’existent pas encore");
  await page.waitForFunction(() => [...document.querySelectorAll("main section button[aria-pressed]")].filter((button) => button.getAttribute("aria-pressed") === "true").length >= 3, null, { timeout: 15000 });
  await page.waitForTimeout(500);
  ok((await chip("WhatsApp").getAttribute("aria-pressed")) === "true" && (await chip("Dropbox").getAttribute("aria-pressed")) === "true", "outils : la réponse à la voix active WhatsApp, Word et Dropbox");
  ok((await chip("Signal").count()) === 1 && (await chip("OneDrive").count()) === 1, "outils : de nouveaux boutons arrivent selon ce qui a été dit");
  ok((await chip("Signal").getAttribute("aria-pressed")) === "false" && (await chip("Logiciel de montage").getAttribute("aria-pressed")) === "false", "outils : les outils proposés restent non sélectionnés");
  await chip("Signal").click();
  ok((await chip("Signal").getAttribute("aria-pressed")) === "true", "outils : un bouton non sélectionné s’active au clic");
  await chip("Signal").click();
  ok((await chip("Signal").getAttribute("aria-pressed")) === "false", "outils : un second clic le désactive");
  ok(page.errors.length === 0, `outils sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// Classement (Claire, échange 1, page 2) : la parole s’écrit en haut, les outils démarrent en désordre puis se placent au fil des mots, les numéros arrivent à la fin.
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  await page.goto(`${BASE}/experience/demo/cinema/1`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  await page.locator("main button").filter({ hasText: /^Voir la suite/ }).waitFor({ timeout: 45000 });
  await page.locator("main button").filter({ hasText: /^Voir la suite/ }).click();
  const names = () => page.locator("main ol li").evaluateAll((items) => items.map((item) => item.textContent?.replace(/^\d+/, "").trim()));
  await page.locator("main ol li").first().waitFor({ timeout: 10000 });
  const start = await names();
  const expected = CONTENT.personas.find((persona) => persona.id === "cinema").etapes[0].outils.ordre.map((item) => item.outil);
  ok(JSON.stringify(start) !== JSON.stringify(expected), "classement : les outils démarrent dans un ordre qui n’est pas le classement final");
  ok((await page.locator("main ol li span.text-transparent").count()) === expected.length, "classement : aucun numéro tant que la parole n’est pas finie");
  // Approfondissement : la question en grand, la réponse en playback avec l’onde ; ce qui fonctionne et ce qui pèse n’arrive qu’après, dans la synthèse.
  await page.waitForFunction(() => [...document.querySelectorAll("main [data-demo-question]")].some((el) => /Sur les trois premiers/.test(el.innerText)), null, { timeout: 45000 });
  ok((await page.locator("main [data-demo-synthese]").count()) === 0 && (await page.locator("main ul.lg\\:grid-cols-3 > li").count()) === 0, "approfondissement : la question est posée, rien n’est encore synthétisé");
  ok((await page.locator("main [aria-hidden='true'].flex.h-8").count()) >= 2, "approfondissement : l’onde accompagne chaque parole de la page");
  await page.waitForFunction(() => document.querySelectorAll("main [data-demo-synthese]").length === 1, null, { timeout: 45000 });
  await page.locator("main button").filter({ hasText: /^Continuer/ }).waitFor({ timeout: 45000 });
  ok(JSON.stringify(await names()) === JSON.stringify(expected), "classement : à la fin, les outils sont dans l’ordre dit par Claire");
  ok((await page.locator("main [data-demo-synthese] ul.lg\\:grid-cols-3 > li").count()) === 3, "approfondissement : les trois capsules sont là à la fin, dans la synthèse");
  ok((await page.locator("main ol li span.text-transparent").count()) === 0, "classement : les numéros s’affichent à la fin");
  ok(page.errors.length === 0, `classement sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// Mouvement réduit.
{
  const { context, page } = await newPage({ width: 1280, height: 900 }, { reducedMotion: "reduce" });
  await page.goto(`${BASE}/experience/demo/cinema/4`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  ok((await page.locator("main button").filter({ hasText: /^Continuer/ }).count()) === 1, "reduced-motion : réponse complète dès le clic");
  ok((await page.locator("main [data-demo-synthese]").count()) === 1 && (await regardButton(page).count()) === 0, "reduced-motion : synthèse affichée, pas de premier regard à l’étape 4");
  await page.goto(`${BASE}/experience/demo/cinema/8`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  ok((await page.locator("[data-demo-ressources] blockquote").count()) === 2, "reduced-motion : « D’autres regards » affiché dès la fin de la réponse");
  await page.goto(`${BASE}/experience/demo/cinema/5`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  await page.locator("main button").filter({ hasText: /^Voir la suite/ }).click();
  ok(await page.getByText(CORRECTION).isVisible(), "reduced-motion : validation de fin de dimension, correction affichée");
  await regardButton(page).click();
  ok(await page.getByText("Ordre de grandeur illustratif : une même fiche technique", { exact: false }).isVisible(), "reduced-motion : premier regard ouvert immédiatement");
  await page.goto(`${BASE}/experience/demo/cinema/restitution`);
  ok((await page.locator(".recharts-radar-polygon").count()) === 1, "reduced-motion : radar complet immédiatement");
  await page.goto(`${BASE}/experience/demo/cinema/demos`);
  await page.getByRole("button", { name: "Lancer l’animation" }).first().click();
  ok((await page.getByText("Après", { exact: true }).count()) >= 1, "reduced-motion : micro-démo à l’état final");
  await page.goto(`${BASE}/experience/demo/scene/demos`);
  await page.getByRole("button", { name: "Lancer l’animation" }).first().click();
  ok(await page.getByText("Après", { exact: true }).count() >= 1 && await page.getByText("Plan de la salle en PDF").isVisible(), "reduced-motion : références réunies dans le dossier du spectacle dès le clic");
  await page.goto(`${BASE}/experience/demo/arts-visuels/comparaison`);
  ok((await page.locator(".recharts-radar-polygon").count()) === 3, "reduced-motion : 3 radars de la comparaison");
  ok(page.errors.length === 0, "reduced-motion sans erreur console");
  await context.close();
}

// Marc et Nadia : rechargement direct sur un rebond ; comparaison : liens vers les autres parcours et clavier.
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  const panel = page.locator("aside[aria-labelledby='demo-memoire-titre']");
  await page.goto(`${BASE}/experience/demo/scene/12`);
  ok(await panel.getByText("références difficiles à retrouver", { exact: true }).isVisible() && await panel.getByText("Fiches techniques : Organisé", { exact: true }).isVisible(), "Marc, rechargement direct étape 12 : panneau cumulé, curseur corrigé conservé");
  ok((await panel.locator(".ring-2").count()) === 1, "Marc, rechargement direct étape 12 : élément cité mis en évidence");
  await page.goto(`${BASE}/experience/demo/arts-visuels/10`);
  ok(await panel.getByText("Présence en ligne : Improvisation", { exact: true }).isVisible() && (await panel.locator(".ring-2").count()) === 1, "Nadia, rechargement direct étape 10 : curseur corrigé, élément cité mis en évidence");
  await page.getByRole("navigation", { name: "Progression du parcours" }).getByRole("link", { name: "Publics & communication" }).click();
  ok(path(page) === "/experience/demo/arts-visuels/6", `Nadia, saut de chapitre Publics → ${path(page)}`);

  await page.goto(`${BASE}/experience/demo/scene/comparaison`);
  ok((await page.locator(".recharts-radar-polygon").count()) === 3, "comparaison en accès direct : 3 radars");
  await page.getByRole("link", { name: "Voir le parcours de Nadia" }).click();
  ok(path(page) === "/experience/demo/arts-visuels/accueil", `comparaison : « Voir le parcours de Nadia » → ${path(page)}`);
  await page.goto(`${BASE}/experience/demo/scene/comparaison`);
  await page.locator("main").focus();
  await page.keyboard.press("ArrowLeft");
  await page.waitForURL("**/scene/futur");
  await page.keyboard.press("ArrowRight");
  await page.waitForURL("**/scene/comparaison");
  await page.keyboard.press("ArrowRight");
  await page.waitForURL("**/scene/avis");
  ok(true, "clavier : futur ← comparaison → avis");
  ok(page.errors.length === 0, `Marc, Nadia et comparaison sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// Tiroir mobile en mouvement réduit : pas de pulsation, le compteur suffit.
{
  const { context, page } = await newPage({ width: 390, height: 844 }, { reducedMotion: "reduce" });
  await page.goto(`${BASE}/experience/demo/arts-visuels/6`);
  const trigger = page.getByRole("button", { name: /Ce que je retiens \(\d+\)/ });
  const countBefore = Number((await trigger.textContent()).match(/\((\d+)\)/)[1]);
  await page.getByRole("button", { name: "Réponse de Nadia" }).click();
  const countAfter = Number((await trigger.textContent()).match(/\((\d+)\)/)[1]);
  ok(countAfter > countBefore && (await trigger.getAttribute("data-pulses")) === "0", `reduced-motion mobile : compteur du tiroir mis à jour (${countBefore} → ${countAfter}) sans pulsation`);
  ok(page.errors.length === 0, "tiroir en mouvement réduit sans erreur console");
  await context.close();
}

// Redirections.
{
  const { context, page } = await newPage({ width: 390, height: 844 });
  await page.goto(`${BASE}/experience/demo/cinema/13`);
  await page.waitForURL("**/experience/demo");
  ok(true, "étape hors parcours (13) → choix du persona");
  await page.goto(`${BASE}/experience/demo/scene/13`);
  await page.waitForURL("**/experience/demo");
  ok(true, "Marc, étape 13 (absente) → choix du persona");
  await page.goto(`${BASE}/experience/demo/arts-visuels/13`);
  await page.waitForURL("**/experience/demo");
  ok(true, "Nadia, étape 13 (absente) → choix du persona");
  await page.goto(`${BASE}/experience/demo/inconnu/1`);
  await page.waitForURL("**/experience/demo");
  ok(true, "persona inconnu → choix du persona");
  ok(page.errors.length === 0, "redirections sans erreur console");
  await context.close();
}

await browser.close();
console.log(results.join("\n"));
const failed = results.filter((line) => line.startsWith("FAIL")).length;
console.log(`\n${results.length - failed} PASS, ${failed} FAIL`);
process.exit(failed ? 1 : 0);
