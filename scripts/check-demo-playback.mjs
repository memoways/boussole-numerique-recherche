/**
 * Contrôle Playwright de la démo playback (parcours Claire v2, lot 2bis), à lancer contre un serveur en marche :
 *   node scripts/check-demo-playback.mjs http://localhost:5173 /tmp/captures-demo
 * Couvre 1280 et 390 px, sauts de chapitre, rechargement direct, bouton retour, clavier, mouvement réduit,
 * tiroir mobile, « Un premier regard » replié et sa mesure d’ouverture, définitions des niveaux,
 * débordement horizontal et erreurs console. `CHROME_BIN` permet d’utiliser un Chromium déjà
 * installé si la version attendue par Playwright manque. Sort en code 1 si au moins un contrôle échoue.
 */
import { mkdirSync } from "node:fs";
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
const MILESTONES = [2, 5, 7, 10, 12];
const REBONDS = [7, 12];
const CORRECTION = "Claire corrige « Sauvegarde des médias » : Improvisation → Organisé.";
const regardButton = (page) => page.getByRole("button", { name: /Un premier regard/ });
// Libellés de l’échelle sous un curseur : aucun ne doit en chevaucher un autre (« Improvisation » à 390 px).
const labelsOverlap = (page) => page.evaluate(() => [...document.querySelectorAll("main .grid-cols-4.hyphens-auto")].some((row) => {
  const boxes = [...row.children].map((child) => { const range = document.createRange(); range.selectNodeContents(child); return range.getBoundingClientRect(); });
  return boxes.some((box, index) => index > 0 && box.left < boxes[index - 1].right - 0.5 && box.top < boxes[index - 1].bottom && boxes[index - 1].top < box.bottom);
}));

async function playStep(page, { skip = false } = {}) {
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  if (skip) await page.getByRole("button", { name: "Passer l’animation" }).click();
  await page.locator("main button").filter({ hasText: /^(Continuer|Voir la restitution)/ }).waitFor({ timeout: 15000 });
}

async function walk(label, viewport, { skip }) {
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
  ok((await page.getByText("En préparation", { exact: true }).count()) === 2, `${label} picker : Marc et Nadia « En préparation »`);
  await page.getByRole("link", { name: /Suivre Claire/ }).click();
  await page.waitForURL("**/cinema/accueil");
  await check("accueil");
  await page.screenshot({ path: `${OUT}/${label}-accueil.png`, fullPage: true });
  await page.getByRole("link", { name: /Commencer/ }).click();

  for (let n = 1; n <= 12; n++) {
    await page.waitForURL(`**/cinema/${n}`);
    await playStep(page, { skip: skip && n % 2 === 0 });
    await check(`étape ${n}`);
    if ([2, 4, 7, 12].includes(n)) await page.screenshot({ path: `${OUT}/${label}-etape-${n}.png`, fullPage: true });
    const regard = await regardButton(page).count();
    ok((MILESTONES.includes(n) ? regard === 1 : regard === 0), `${label} étape ${n} : premier regard ${MILESTONES.includes(n) ? "présent" : "absent"}`);
    if (regard) {
      ok((await regardButton(page).getAttribute("aria-expanded")) === "false" && (await page.getByText("Ordre de grandeur illustratif", { exact: false }).count()) === 0, `${label} étape ${n} : premier regard replié par défaut`);
    }
    if (n === 4) {
      ok((await page.getByText(CORRECTION).count()) === 1, `${label} étape 4 : correction de curseur affichée`);
      ok(!(await labelsOverlap(page)), `${label} étape 4 : libellés de l’échelle sans chevauchement`);
    }
    if (n === 12) {
      await regardButton(page).click();
      await check("étape 12, regard ouvert");
      await page.screenshot({ path: `${OUT}/${label}-etape-12-regard-ouvert.png`, fullPage: true });
    }
    if (REBONDS.includes(n)) ok((await page.getByText("Tu disais plus tôt").count()) === 1, `${label} étape ${n} : rebond mémoire`);
    if (label.startsWith("mobile") && n === 7) {
      const trigger = page.getByRole("button", { name: /Ce que je retiens \(\d+\)/ });
      const text = await trigger.textContent();
      ok(/\((\d+)\)/.test(text) && Number(text.match(/\((\d+)\)/)[1]) > 5, `${label} bouton tiroir : ${text}`);
      const bar = await page.locator("main button").filter({ hasText: /Continuer/ }).boundingBox();
      const pill = await trigger.boundingBox();
      ok(pill.y + pill.height <= bar.y - 4, `${label} bouton tiroir au-dessus de la barre de commandes`);
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor();
      ok(await dialog.getByText("e-mail au centre").isVisible(), `${label} tiroir : notes visibles`);
      await page.screenshot({ path: `${OUT}/${label}-tiroir.png` });
      await dialog.getByRole("button", { name: "Fermer" }).click();
      await dialog.waitFor({ state: "detached" });
    }
    await page.locator("main button").filter({ hasText: /^Continuer/ }).click();
  }
  await page.waitForURL("**/cinema/ideal");
  await playStep(page, { skip });
  await page.locator("main button").filter({ hasText: /Voir la restitution/ }).click();
  await page.waitForURL("**/cinema/restitution");
  await page.waitForTimeout(2500);
  await check("restitution");
  ok((await page.locator(".recharts-radar-polygon").count()) === 1, `${label} restitution : radar dessiné`);
  const radarText = await page.locator("figure").innerText();
  ok(!/\d/.test(radarText), `${label} restitution : aucun chiffre dans le radar`);
  ok(await page.getByText("Ce n’est ni bien ni mal : c’est ton point de départ.").isVisible(), `${label} restitution : phrase sous le radar`);
  ok((await page.locator("#demo-pistes ~ ol li").count()) === 3, `${label} restitution : 3 pistes`);
  ok(await page.getByRole("heading", { name: "Ce qui pourrait être plus léger" }).isVisible(), `${label} restitution : « Ce qui pourrait être plus léger »`);
  ok((await page.locator("figure dl dt").allInnerTexts()).join(" · ") === "Exploration · Improvisation · Organisé · Orchestré", `${label} restitution : définitions des 4 niveaux sous le radar`);
  await page.screenshot({ path: `${OUT}/${label}-restitution.png`, fullPage: true });
  await page.getByRole("link", { name: /Voir à quoi ça pourrait ressembler/ }).click();
  await page.waitForURL("**/cinema/demos");
  for (const button of await page.getByRole("button", { name: "Lancer l’animation" }).all()) await button.click();
  await page.waitForTimeout(6500);
  ok((await page.getByText("Après", { exact: true }).count()) === 3, `${label} micro-démos : 3 animations terminées`);
  await check("demos");
  await page.screenshot({ path: `${OUT}/${label}-demos.png`, fullPage: true });
  await page.getByRole("link", { name: /Et ensuite/ }).click();
  await page.waitForURL("**/cinema/futur");
  ok((await page.getByText("Bientôt", { exact: true }).count()) === 5, `${label} futur : 5 fonctions grisées`);
  await check("futur");
  await page.getByRole("link", { name: /Donner mon avis/ }).click();
  await page.waitForURL("**/cinema/avis");
  await check("avis");
  ok(page.errors.length === 0, `${label} parcours complet sans erreur console${page.errors.length ? ` : ${page.errors.join(" | ")}` : ""}`);
  ok(maxOverflow <= 0, `${label} aucun débordement horizontal`);
  await context.close();
}

await walk("desktop", { width: 1280, height: 900 }, { skip: false });
await walk("mobile", { width: 390, height: 844 }, { skip: true });

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

// Mouvement réduit.
{
  const { context, page } = await newPage({ width: 1280, height: 900 }, { reducedMotion: "reduce" });
  await page.goto(`${BASE}/experience/demo/cinema/4`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  ok((await page.locator("main button").filter({ hasText: /^Continuer/ }).count()) === 1, "reduced-motion : réponse complète dès le clic");
  ok(await page.getByText(CORRECTION).isVisible(), "reduced-motion : correction affichée");
  ok((await regardButton(page).count()) === 0, "reduced-motion : pas de premier regard à l’étape 4");
  await page.goto(`${BASE}/experience/demo/cinema/5`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  await regardButton(page).click();
  ok(await page.getByText("Ordre de grandeur illustratif : une même fiche technique", { exact: false }).isVisible(), "reduced-motion : premier regard ouvert immédiatement");
  await page.goto(`${BASE}/experience/demo/cinema/restitution`);
  ok((await page.locator(".recharts-radar-polygon").count()) === 1, "reduced-motion : radar complet immédiatement");
  await page.goto(`${BASE}/experience/demo/cinema/demos`);
  await page.getByRole("button", { name: "Lancer l’animation" }).first().click();
  ok((await page.getByText("Après", { exact: true }).count()) >= 1, "reduced-motion : micro-démo à l’état final");
  ok(page.errors.length === 0, "reduced-motion sans erreur console");
  await context.close();
}

// Redirections et personas en préparation.
{
  const { context, page } = await newPage({ width: 390, height: 844 });
  await page.goto(`${BASE}/experience/demo/cinema/13`);
  await page.waitForURL("**/experience/demo");
  ok(true, "étape hors parcours (13) → choix du persona");
  await page.goto(`${BASE}/experience/demo/cinema/comparaison`);
  ok(await page.getByText(/La comparaison des trois parcours arrive/).isVisible(), "comparaison : écran en préparation dédié");
  await page.goto(`${BASE}/experience/demo/scene/3`);
  ok(await page.getByText("Cette étape est en préparation").isVisible(), "Marc : étape en préparation");
  await page.goto(`${BASE}/experience/demo/arts-visuels/accueil`);
  ok(await page.getByText(/en cours de préparation/).isVisible(), "Nadia : accueil avec avertissement");
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
