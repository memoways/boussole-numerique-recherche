import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.MOBILE_AUDIT_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const results = [];

async function verify(name, action) {
  try {
    await action();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, error: error instanceof Error ? error.message : String(error) });
  }
}

await verify("Menu burger : ouverture et fermeture", async () => {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Ouvrir le menu" });
  await trigger.click();
  await page.locator("#menu-navigation-mobile").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Fermer le menu" }).click();
  await page.locator("#menu-navigation-mobile").waitFor({ state: "detached" });
});

await verify("Menu burger : navigation vers Expérience", async () => {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await page.locator("#menu-navigation-mobile").getByRole("link", { name: "Expérience" }).click();
  await page.waitForURL(/\/experience$/);
});

await verify("Accueil : sélection Partenaire culturel", async () => {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Partenaire culturel/ }).first().click();
  await page.waitForURL(/\?public=partenaire$/);
  await page.getByRole("button", { name: "Revenir aux deux profils" }).waitFor({ state: "visible" });
});

await verify("Accueil : sélection Artiste puis retour", async () => {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Artiste/ }).first().click();
  await page.waitForURL(/\?public=artiste$/);
  await page.getByRole("button", { name: "Revenir aux deux profils" }).click();
  await page.waitForURL(`${baseUrl}/`);
});

await verify("Accueil : FAQ complémentaires des deux profils", async () => {
  await page.goto(`${baseUrl}/?public=partenaire`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Notre structure doit-elle mobiliser toute son équipe pour contribuer ?" }).click();
  await page.getByText("Une personne peut d’abord relayer des situations").waitFor({ state: "visible" });
  await page.goto(`${baseUrl}/?public=artiste`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Quelle place l’IA pourrait-elle prendre dans l’expérience ?" }).click();
  await page.getByText("Un dialogue guidé par IA est une piste à tester").waitFor({ state: "visible" });
});

await verify("Expérience : navigation des quatre écrans", async () => {
  await page.goto(`${baseUrl}/experience`, { waitUntil: "networkidle" });
  await page.getByRole("tab", { name: /04 Agir/ }).click();
  await page.getByRole("heading", { name: "Choisir une première amélioration" }).waitFor({ state: "visible" });
  await page.getByRole("button", { name: /Clarifier le partage de fichiers/ }).click();
});

await verify("Ressources : recherche, filtre et effacement", async () => {
  await page.goto(`${baseUrl}/ressources`, { waitUntil: "networkidle" });
  const search = page.locator("#resource-search");
  await search.fill("UNESCO");
  await page.getByRole("button", { name: "Effacer la recherche" }).click();
  await page.getByRole("button", { name: /PDF \(6\)/ }).click();
});

await verify("Page 404 : recherche et effacement", async () => {
  await page.goto(`${baseUrl}/404`, { waitUntil: "networkidle" });
  const search = page.locator("#not-found-search");
  await search.fill("UNESCO");
  await page.getByRole("button", { name: "Effacer la recherche" }).click();
});

await verify("Retour en haut : apparition et remontée de page", async () => {
  await page.goto(`${baseUrl}/ressources`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo({ top: 720, behavior: "instant" }));
  const backToTop = page.getByRole("button", { name: "Retour en haut de la page" });
  await backToTop.waitFor({ state: "visible" });
  await page.screenshot({ path: resolve("tmp/back-to-top-mobile.png"), fullPage: false });
  await backToTop.click();
  await page.waitForFunction(() => window.scrollY < 8);
});

await verify("Présentation partenaire : changement de slide", async () => {
  await page.goto(`${baseUrl}/partenaires/presentation`, { waitUntil: "networkidle" });
  const initialSlide = new URL(page.url()).searchParams.get("slide");
  await page.getByRole("button", { name: "Suivant" }).click();
  await page.waitForTimeout(150);
  const url = new URL(page.url());
  if (url.searchParams.get("slide") === initialSlide) throw new Error(`La pagination n’a pas changé de slide : ${initialSlide}`);
});

await browser.close();
await mkdir(resolve("tmp"), { recursive: true });
await writeFile(resolve("tmp/mobile-interactions.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)}\n`);
const failed = results.filter((result) => !result.passed);
console.log(JSON.stringify({ checked: results.length, failed: failed.length, results }));
if (failed.length > 0) process.exitCode = 1;
