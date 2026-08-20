import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.MOBILE_AUDIT_URL || "http://127.0.0.1:5173";
const routes = [
  "/",
  "/?public=partenaire",
  "/?public=artiste",
  "/projet",
  "/experience",
  "/methode",
  "/timeline",
  "/recherche",
  "/references",
  "/partenaires",
  "/partenaires/presentation",
  "/partenaires/questionnaire",
  "/ressources",
  "/ressources/etude-complete",
  "/ressources/etat-des-lieux",
  "/ressources/analyse-outils",
  "/ressources/synthese-documents",
  "/ressources/sources",
  "/ressources/references-inspirantes",
  "/404",
];
const viewports = [
  { name: "320", width: 320, height: 844 },
  { name: "390", width: 390, height: 844 },
];
const screenshotRoutes = new Set([
  "/",
  "/?public=partenaire",
  "/?public=artiste",
  "/projet",
  "/experience",
  "/methode",
  "/references",
  "/partenaires",
  "/partenaires/presentation",
  "/ressources",
]);

const isVisible = (rect, style) => rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0;

const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const route of routes) {
    pageErrors.length = 0;
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(150);
    const audit = await page.evaluate(() => {
      const vw = window.innerWidth;
      const scrollingElement = document.scrollingElement ?? document.documentElement;
      const overflowCandidates = [...document.querySelectorAll("body *")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return { tag: element.tagName.toLowerCase(), className: element.className?.toString().slice(0, 120) || "", text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "", left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width), visible: rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 };
        })
        .filter((item) => item.visible && item.width > 4 && (item.left < -2 || item.right > vw + 2))
        .slice(0, 12);

      const undersizedControls = [...document.querySelectorAll("button, input:not([type='hidden']), select, textarea, [role='button'], [role='tab']")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return { tag: element.tagName.toLowerCase(), className: element.className?.toString().slice(0, 120) || "", text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 70) || element.getAttribute("aria-label") || "", width: Math.round(rect.width), height: Math.round(rect.height), visible: rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 };
        })
        .filter((item) => item.visible && (item.width < 36 || item.height < 36))
        .slice(0, 12);

      return {
        viewport: vw,
        documentWidth: scrollingElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        horizontalOverflow: scrollingElement.scrollWidth > vw + 1,
        hasMain: Boolean(document.querySelector("main#contenu-principal")),
        overflowCandidates,
        undersizedControls,
      };
    });
    results.push({ viewport: viewport.name, route, status: response?.status() ?? null, pageErrors: [...pageErrors], ...audit });
    if (viewport.name === "390" && screenshotRoutes.has(route)) {
      const routeName = route === "/" ? "home" : route.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";
      await mkdir(resolve("tmp/mobile-audit-screenshots"), { recursive: true });
      await page.screenshot({ path: resolve("tmp/mobile-audit-screenshots", `${routeName}.png`), fullPage: true });
    }
  }
  await page.close();
}

await browser.close();
await mkdir(resolve("tmp"), { recursive: true });
await writeFile(resolve("tmp/mobile-audit.json"), `${JSON.stringify({ baseUrl, generatedAt: new Date().toISOString(), results }, null, 2)}\n`);

const failed = results.filter((result) => result.status !== 200 || result.pageErrors.length > 0 || result.horizontalOverflow);
const summary = {
  checked: results.length,
  failed: failed.length,
  overflow: results.filter((result) => result.horizontalOverflow).length,
  pageErrors: results.filter((result) => result.pageErrors.length > 0).length,
  non200: results.filter((result) => result.status !== 200).length,
  undersizedControls: results.reduce((total, result) => total + result.undersizedControls.length, 0),
  routesWithUndersizedControls: [...new Set(results.filter((result) => result.undersizedControls.length > 0).map((result) => `${result.viewport}px ${result.route}`))],
};
console.log(JSON.stringify(summary));
if (failed.length > 0) process.exitCode = 1;
