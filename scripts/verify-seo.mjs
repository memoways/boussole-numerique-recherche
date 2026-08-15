import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist/public");
const siteUrl = (process.env.SITE_URL || "https://boussole-culture-recherche.memoways.com").replace(/\/$/, "");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function getSingleMatch(content, pattern) {
  const matches = [...content.matchAll(pattern)];
  return matches;
}

const sitemap = await readFile(resolve(distDir, "sitemap.xml"), "utf8");
const robots = await readFile(resolve(distDir, "robots.txt"), "utf8");
const llms = await readFile(resolve(distDir, "llms.txt"), "utf8");
const indexedUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

assert(indexedUrls.length > 0, "Le sitemap ne contient aucune URL indexable.");
assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), "robots.txt ne référence pas le sitemap du domaine public.");
assert(!robots.includes(":8080"), "robots.txt ne doit pas contenir de port interne.");
assert(llms.includes("Site compagnon"), "llms.txt doit décrire le rôle du site compagnon.");
assert(llms.includes(`${siteUrl}/partenaires`), "llms.txt doit présenter le parcours partenaire.");

for (const url of indexedUrls) {
  assert(url.startsWith(siteUrl), `Le sitemap contient une URL hors du domaine public : ${url}`);
  const pathname = url.replace(siteUrl, "") || "/";
  const htmlPath = pathname === "/" ? resolve(distDir, "index.html") : resolve(distDir, pathname.slice(1), "index.html");
  assert(await exists(htmlPath), `Page HTML manquante pour ${pathname}.`);
  if (!(await exists(htmlPath))) continue;

  const html = await readFile(htmlPath, "utf8");
  const descriptionMatches = getSingleMatch(html, /<meta name="description"[^>]*>/g);
  const titleMatches = getSingleMatch(html, /<title>[^<]+<\/title>/g);
  const canonicalMatches = getSingleMatch(html, /<link rel="canonical" href="([^"]+)"\s*\/>/g);
  const schemaMatches = getSingleMatch(html, /<script id="seo-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/g);

  assert(/<html lang="fr">/i.test(html), `${pathname} doit déclarer le français dans sa balise html.`);
  assert(titleMatches.length === 1, `${pathname} doit avoir un titre unique.`);
  assert(descriptionMatches.length === 1, `${pathname} doit avoir une meta description unique.`);
  assert(canonicalMatches.length === 1, `${pathname} doit avoir une canonique unique.`);
  assert(canonicalMatches[0]?.[1] === url, `${pathname} doit canoniser vers ${url}.`);
  assert(/<h1>[^<]+<\/h1>/.test(html), `${pathname} doit contenir un h1 dans le HTML initial.`);
  assert(!html.includes("src/main.tsx"), `${pathname} ne doit pas référencer un module de développement.`);
  assert(schemaMatches.length === 1, `${pathname} doit contenir un graphe JSON-LD unique.`);

  if (schemaMatches.length === 1) {
    try {
      const schema = JSON.parse(schemaMatches[0][1]);
      const types = schema["@graph"]?.map((item) => item["@type"]) ?? [];
      assert(types.includes("WebSite"), `${pathname} doit déclarer le WebSite dans son graphe JSON-LD.`);
      assert(types.includes("Organization"), `${pathname} doit déclarer l’Organization dans son graphe JSON-LD.`);
      assert(types.includes("WebPage"), `${pathname} doit déclarer la WebPage dans son graphe JSON-LD.`);
    } catch {
      failures.push(`${pathname} contient un JSON-LD invalide.`);
    }
  }

  const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map((match) => match[1]);
  for (const assetPath of assetPaths) {
    assert(await exists(resolve(distDir, assetPath.slice(1))), `${pathname} référence un asset introuvable : ${assetPath}.`);
  }
}

for (const path of ["/partenaires/questionnaire", "/partenaires/admin", "/admin"]) {
  const htmlPath = resolve(distDir, path.slice(1), "index.html");
  const html = await readFile(htmlPath, "utf8");
  assert(/<meta name="robots" content="noindex,follow"\s*\/>/.test(html), `${path} doit être explicitement non indexable.`);
  assert(!indexedUrls.includes(`${siteUrl}${path}`), `${path} ne doit pas figurer dans le sitemap.`);
}

const notFound = await readFile(resolve(distDir, "404.html"), "utf8");
assert(/<meta name="robots" content="noindex,follow"\s*\/>/.test(notFound), "La page 404 statique doit être non indexable.");
assert(/<h1>Cette adresse ne mène plus à la bonne page\.<\/h1>/.test(notFound), "La page 404 statique doit contenir son message d’orientation.");

if (failures.length > 0) {
  console.error("Vérification SEO-GEO échouée :");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Vérification SEO-GEO réussie : ${indexedUrls.length} pages indexables et 3 parcours privés contrôlés.`);
