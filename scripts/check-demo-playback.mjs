/**
 * Contrôle Playwright de la démo playback (Claire, Marc et Nadia, comparaison ; lots 3 et 4), à lancer contre un serveur en marche :
 *   node scripts/check-demo-playback.mjs http://localhost:5173 /tmp/captures-demo
 * Couvre les trois parcours à 1280 et 390 px, la comparaison des trois parcours, sauts de chapitre,
 * rechargement direct, bouton retour, clavier, mouvement réduit, tiroir mobile, « Un premier regard »
 * replié et sa mesure d’ouverture, définitions des niveaux, débordement horizontal et erreurs console. Lot 4 : ancien bloc
 * « La Boussole retient » absent, curseurs induits et correction toujours visibles, « D’autres regards » aux bons échanges
 * (liens en nouvel onglet, mesure `demo_ressource_ouverte`), signal du tiroir mobile. `CHROME_BIN` permet d’utiliser un Chromium déjà
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
const inducedSteps = (id) => new Set(contentSteps(id).filter((step) => step.type !== "curseurs" && step.retenu?.curseurs?.length).map((step) => step.id));
const RESOURCE_HOSTS = ["danslesalgorithmes.net", "medium.com", "uxdesign.cc", "substack.com", "ulrichfischer.net", "fredcavazza.net", "flint.media"];
// Repères propres à chaque parcours (annexe v2) : premiers regards, rebonds, correction de curseur, tiroir mobile.
const PERSONAS = {
  cinema: { prenom: "Claire", steps: 12, milestones: [2, 5, 7, 10, 12], rebonds: [7, 12], correction: { step: 4, text: "Claire corrige « Sauvegarde des médias » : Improvisation → Organisé." }, drawer: { step: 7, note: "e-mail au centre" } },
  scene: { prenom: "Marc", steps: 11, milestones: [3, 5, 7, 9, 11], rebonds: [5, 11], correction: { step: 7, text: "Marc corrige « Fiches techniques » : Improvisation → Organisé." }, drawer: { step: 6, note: "équipe qui se parle beaucoup" } },
  "arts-visuels": { prenom: "Nadia", steps: 10, milestones: [2, 4, 6, 8, 10], rebonds: [4, 8], correction: { step: 6, text: "Nadia corrige « Présence en ligne » : Exploration → Improvisation." }, drawer: { step: 5, note: "inventaire numéroté depuis 1998" } },
};
const CORRECTION = PERSONAS.cinema.correction.text;
const regardButton = (page) => page.getByRole("button", { name: /Un premier regard/ });
// Libellés de l’échelle sous un curseur : aucun ne doit en chevaucher un autre (« Improvisation » à 390 px).
const labelsOverlap = (page) => page.evaluate(() => [...document.querySelectorAll("main .grid-cols-4.hyphens-auto")].some((row) => {
  const boxes = [...row.children].map((child) => { const range = document.createRange(); range.selectNodeContents(child); return range.getBoundingClientRect(); });
  return boxes.some((box, index) => index > 0 && box.left < boxes[index - 1].right - 0.5 && box.top < boxes[index - 1].bottom && boxes[index - 1].top < box.bottom);
}));

async function playStep(page, { skip = false, prenom = "Claire" } = {}) {
  await page.getByRole("button", { name: `Réponse de ${prenom}` }).click();
  if (skip) await page.getByRole("button", { name: "Passer l’animation" }).click();
  await page.locator("main button").filter({ hasText: /^(Continuer|Voir la restitution)/ }).waitFor({ timeout: 15000 });
}

async function walk(label, viewport, { skip, persona: id = "cinema" }) {
  const P = PERSONAS[id];
  const { context, page } = await newPage(viewport);
  let maxOverflow = 0;
  const check = async (name) => { const o = await overflow(page); maxOverflow = Math.max(maxOverflow, o); if (o > 0) results.push(`FAIL ${label} débordement ${o}px sur ${name}`); };

  await page.goto(`${BASE}/experience`);
  ok((await page.getByRole("link", { name: /Voir une démonstration du parcours/ }).count()) === 2, `${label} /experience : 2 blocs d’appel`);
  await check("/experience");
  const siteErrors = page.errors.splice(0);
  if (siteErrors.length) results.push(`NOTE ${label} /experience (hors démo, préexistant) : ${siteErrors.length} erreur(s) console : ${siteErrors[0].slice(0, 90)}`);
  await page.getByRole("link", { name: /Voir une démonstration du parcours/ }).first().click();
  await page.waitForURL("**/experience/demo");
  await page.locator("main h1").waitFor();
  ok((await page.getByText("En préparation", { exact: true }).count()) === 0, `${label} picker : trois parcours jouables, aucun « En préparation »`);
  await page.getByRole("link", { name: new RegExp(`Suivre ${P.prenom}`) }).click();
  await page.waitForURL(`**/${id}/accueil`);
  await check("accueil");
  await page.screenshot({ path: `${OUT}/${label}-accueil.png`, fullPage: true });
  await page.getByRole("link", { name: /Commencer/ }).click();

  for (let n = 1; n <= P.steps; n++) {
    await page.waitForURL(`**/${id}/${n}`);
    await playStep(page, { skip: skip && n % 2 === 0, prenom: P.prenom });
    await check(`étape ${n}`);
    if ([P.correction.step, P.drawer.step, P.steps].includes(n)) await page.screenshot({ path: `${OUT}/${label}-etape-${n}.png`, fullPage: true });
    const regard = await regardButton(page).count();
    ok((P.milestones.includes(n) ? regard === 1 : regard === 0), `${label} étape ${n} : premier regard ${P.milestones.includes(n) ? "présent" : "absent"}`);
    if (regard) {
      ok((await regardButton(page).getAttribute("aria-expanded")) === "false" && (await page.getByText("Ordre de grandeur illustratif", { exact: false }).count()) === 0, `${label} étape ${n} : premier regard replié par défaut`);
    }
    if (n === P.correction.step) {
      ok((await page.getByText(P.correction.text).count()) === 1, `${label} étape ${n} : correction de curseur affichée`);
      ok(!(await labelsOverlap(page)), `${label} étape ${n} : libellés de l’échelle sans chevauchement`);
    }
    if (n === P.steps) {
      await regardButton(page).click();
      await check(`étape ${n}, regard ouvert`);
      await page.screenshot({ path: `${OUT}/${label}-etape-${n}-regard-ouvert.png`, fullPage: true });
    }
    ok((await page.getByText("Tu disais plus tôt").count()) === (P.rebonds.includes(n) ? 1 : 0), `${label} étape ${n} : rebond mémoire ${P.rebonds.includes(n) ? "présent" : "absent"}`);
    // Lot 4 : l’ancien bloc sous la réponse a disparu ; la validation humaine et « D’autres regards » restent.
    ok((await page.locator("main").getByText("La Boussole retient", { exact: true }).count()) === 0, `${label} étape ${n} : ancien bloc « La Boussole retient » absent`);
    const induced = inducedSteps(id).has(n);
    ok((await page.locator("[data-demo-induction]").count()) === (induced ? 1 : 0) && (!induced || (await page.getByText(`${P.prenom} valide.`).isVisible())), `${label} étape ${n} : curseurs induits ${induced ? "et validation visibles" : "absents"}`);
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
      ok(await dialog.getByText(P.drawer.note).isVisible(), `${label} tiroir : notes visibles`);
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
  const radarText = await page.locator("figure").innerText();
  ok(!/\d/.test(radarText), `${label} restitution : aucun chiffre dans le radar`);
  ok(await page.getByText("Ni bien ni mal. Un point de départ.").first().isVisible(), `${label} restitution : phrase sous le radar`);
  ok(await page.getByText("Les citations de ce parcours viennent du corpus de veille du projet.").isVisible() && (await page.getByRole("link", { name: "Voir les ressources" }).getAttribute("href")) === "/ressources", `${label} restitution : origine des citations, lien vers les ressources`);
  ok((await page.locator("#demo-pistes ~ ol li").count()) === 3, `${label} restitution : 3 pistes`);
  ok(await page.getByRole("heading", { name: "Ce qui pourrait être plus léger" }).isVisible(), `${label} restitution : « Ce qui pourrait être plus léger »`);
  ok((await page.locator("figure dl dt").allInnerTexts()).join(" · ") === "Exploration · Improvisation · Organisé · Orchestré", `${label} restitution : définitions des 4 niveaux sous le radar`);
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
  ok(await panel.getByText("e-mail au centre").isVisible(), "rechargement direct étape 7 : panneau cumulé (étape 1)");
  ok(await panel.getByText("Sauvegarde des médias : Organisé").isVisible(), "rechargement direct étape 7 : curseur corrigé conservé");
  ok((await panel.locator(".ring-2").count()) === 1, "rechargement direct étape 7 : élément cité mis en évidence");
  ok(await panel.getByText("Outils & workflows").first().isVisible(), "rechargement direct étape 7 : jauges des dimensions passées");

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
  ok((await page.locator("main button").filter({ hasText: /^Continuer/ }).count()) === 1, "clavier : Espace passe l’animation");
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

  await page.goto(`${BASE}/experience/demo/cinema/4`);
  const help = page.locator("main summary").filter({ hasText: "Ce que veulent dire les niveaux" });
  ok((await help.count()) === 1 && !(await page.getByText("Une source fait foi", { exact: false }).isVisible()), "aide des niveaux : repliée sous les curseurs");
  await help.focus();
  await page.keyboard.press("Enter");
  ok(await page.getByText("Une source fait foi", { exact: false }).isVisible() && path(page) === "/experience/demo/cinema/4", "aide des niveaux : ouverte au clavier sans lancer la réponse");
  ok((await page.getByRole("button", { name: "Réponse de Claire" }).count()) === 1, "aide des niveaux : la réponse attend toujours le clic");
  ok(page.errors.length === 0, `premier regard et aide sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
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
  const [popup] = await Promise.all([context.waitForEvent("page"), block.getByRole("link", { name: /Lire l’article/ }).nth(1).click()]);
  await popup.waitForLoadState();
  ok(new URL(popup.url()).hostname === "danslesalgorithmes.net" && path(page) === "/experience/demo/scene/1", `ressource : la source s’ouvre dans un nouvel onglet, la démo reste sur l’échange (${popup.url()})`);
  await popup.close();
  const opened = (await page.evaluate(() => window.__demoEvents ?? [])).filter((event) => event.name === "demo_ressource_ouverte");
  ok(opened.length === 1 && opened[0].props.persona === "scene" && opened[0].props.etape === "1" && opened[0].props.ressource === "guillaud-travail-intellectuel" && Object.keys(opened[0].props).length === 3, `ressource : ouverture mesurée sans donnée personnelle (${JSON.stringify(opened)})`);
  ok(Math.abs((await page.evaluate(() => window.scrollY)) - before) < 400, "ressource : la page de la démo ne saute pas au clic");
  ok(page.errors.length === 0, `ressources liées sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  await context.close();
}

// Mouvement réduit.
{
  const { context, page } = await newPage({ width: 1280, height: 900 }, { reducedMotion: "reduce" });
  await page.goto(`${BASE}/experience/demo/cinema/4`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  ok((await page.locator("main button").filter({ hasText: /^Continuer/ }).count()) === 1, "reduced-motion : réponse complète dès le clic");
  ok(await page.getByText(CORRECTION).isVisible(), "reduced-motion : correction affichée");
  ok((await regardButton(page).count()) === 0, "reduced-motion : pas de premier regard à l’étape 4");
  await page.goto(`${BASE}/experience/demo/cinema/8`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  ok((await page.locator("[data-demo-ressources] blockquote").count()) === 2, "reduced-motion : « D’autres regards » affiché dès la fin de la réponse");
  await page.goto(`${BASE}/experience/demo/cinema/5`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  await regardButton(page).click();
  ok(await page.getByText("Ordre de grandeur illustratif : une même fiche technique", { exact: false }).isVisible(), "reduced-motion : premier regard ouvert immédiatement");
  await page.goto(`${BASE}/experience/demo/cinema/restitution`);
  ok((await page.locator(".recharts-radar-polygon").count()) === 1, "reduced-motion : radar complet immédiatement");
  await page.goto(`${BASE}/experience/demo/cinema/demos`);
  await page.getByRole("button", { name: "Lancer l’animation" }).first().click();
  ok((await page.getByText("Après", { exact: true }).count()) >= 1, "reduced-motion : micro-démo à l’état final");
  await page.goto(`${BASE}/experience/demo/scene/demos`);
  await page.getByRole("button", { name: "Lancer l’animation" }).first().click();
  ok(await page.getByText("Note partagée avec l’équipe").isVisible(), "reduced-motion : note de répétition complète dès le clic");
  await page.goto(`${BASE}/experience/demo/arts-visuels/comparaison`);
  ok((await page.locator(".recharts-radar-polygon").count()) === 3, "reduced-motion : 3 radars de la comparaison");
  ok(page.errors.length === 0, "reduced-motion sans erreur console");
  await context.close();
}

// Marc et Nadia : rechargement direct sur un rebond ; comparaison : liens vers les autres parcours et clavier.
{
  const { context, page } = await newPage({ width: 1280, height: 900 });
  const panel = page.locator("aside[aria-labelledby='demo-memoire-titre']");
  await page.goto(`${BASE}/experience/demo/scene/11`);
  ok(await panel.getByText("équipe qui se parle beaucoup").isVisible() && await panel.getByText("Fiches techniques : Organisé").isVisible(), "Marc, rechargement direct étape 11 : panneau cumulé, curseur corrigé conservé");
  ok((await panel.locator(".ring-2").count()) === 1, "Marc, rechargement direct étape 11 : élément cité mis en évidence");
  await page.goto(`${BASE}/experience/demo/arts-visuels/8`);
  ok(await panel.getByText("Présence en ligne : Improvisation").isVisible() && (await panel.locator(".ring-2").count()) === 1, "Nadia, rechargement direct étape 8 : curseur corrigé, élément cité mis en évidence");
  await page.getByRole("navigation", { name: "Progression du parcours" }).getByRole("link", { name: "Publics & communication" }).click();
  ok(path(page) === "/experience/demo/arts-visuels/5", `Nadia, saut de chapitre Publics → ${path(page)}`);

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
  await page.goto(`${BASE}/experience/demo/arts-visuels/5`);
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
  await page.goto(`${BASE}/experience/demo/scene/12`);
  await page.waitForURL("**/scene/accueil");
  ok(true, "Marc, étape 12 (absente) → accueil du parcours");
  await page.goto(`${BASE}/experience/demo/arts-visuels/11`);
  await page.waitForURL("**/arts-visuels/accueil");
  ok(await page.getByRole("link", { name: /Commencer/ }).isVisible(), "Nadia, étape 11 (absente) → accueil jouable");
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
