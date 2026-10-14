/**
 * Contrôle Playwright de la démo playback (parcours Claire, lot 2), à lancer contre un serveur en marche :
 *   node scripts/check-demo-playback.mjs http://localhost:5173 /tmp/captures-demo
 * Couvre 1280 et 390 px, sauts de chapitre, rechargement direct, bouton retour, clavier, mouvement réduit,
 * tiroir mobile, débordement horizontal et erreurs console. `CHROME_BIN` permet d’utiliser un Chromium déjà
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
const primary = (page) => page.locator("main button").filter({ hasText: /Réponse de Claire|Passer l’animation|Continuer|Voir la restitution/ }).first();

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

  for (let n = 1; n <= 11; n++) {
    await page.waitForURL(`**/cinema/${n}`);
    await playStep(page, { skip: skip && n % 2 === 0 });
    await check(`étape ${n}`);
    if ([2, 4, 7, 11].includes(n)) await page.screenshot({ path: `${OUT}/${label}-etape-${n}.png`, fullPage: true });
    const milestone = await page.getByText("Premier constat", { exact: false }).count();
    ok(([2, 5, 7, 9, 11].includes(n) ? milestone > 0 : milestone === 0), `${label} étape ${n} : point d’étape ${[2, 5, 7, 9, 11].includes(n) ? "présent" : "absent"}`);
    if (n === 4) ok((await page.getByText("Claire corrige « Sauvegarde » : Exploration → Bricolage.").count()) === 1, `${label} étape 4 : correction de curseur affichée`);
    if (n === 7) ok((await page.getByText("Tu disais plus tôt").count()) === 1, `${label} étape 7 : rebond mémoire`);
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
      ok(await dialog.getByText("tableur maître").isVisible(), `${label} tiroir : notes visibles`);
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
  ok(await panel.getByText("tableur maître").isVisible(), "rechargement direct étape 7 : panneau cumulé (étape 1)");
  ok(await panel.getByText("Sauvegarde : Bricolage").isVisible(), "rechargement direct étape 7 : curseur corrigé conservé");
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

// Mouvement réduit.
{
  const { context, page } = await newPage({ width: 1280, height: 900 }, { reducedMotion: "reduce" });
  await page.goto(`${BASE}/experience/demo/cinema/4`);
  await page.getByRole("button", { name: "Réponse de Claire" }).click();
  ok((await page.locator("main button").filter({ hasText: /^Continuer/ }).count()) === 1, "reduced-motion : réponse complète dès le clic");
  ok(await page.getByText("Claire corrige « Sauvegarde » : Exploration → Bricolage.").isVisible(), "reduced-motion : correction affichée");
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
  await page.goto(`${BASE}/experience/demo/cinema/12`);
  await page.waitForURL("**/cinema/accueil");
  ok(true, "étape inexistante → accueil du parcours");
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
