import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const siteUrl = (process.env.SITE_URL || "https://boussole-culture-recherche.memoways.com").replace(/\/$/, "");
const sourcePath = resolve("client/index.html");
const publicDir = resolve("client/public");
const siteName = "Boussole Numérique Culture";
const defaultDescription = "Un outil de diagnostic numérique pour aider les actrices, acteurs et structures culturelles à situer leurs pratiques et choisir des pistes d'action utiles.";
const mode = process.argv[2] ?? "pages";

const pages = {
  "/": { title: "Boussole Numérique Culture | Diagnostic numérique", description: defaultDescription },
  "/projet": { title: "Le projet | Boussole Numérique Culture", description: "Découvrez le projet Boussole Numérique Culture : un diagnostic numérique co-construit pour renforcer les pratiques du secteur culturel." },
  "/timeline": { title: "Calendrier du projet | Boussole Numérique Culture", description: "Suivez les quatre phases et les 24 mois de conception, de test et d'amélioration continue de la Boussole Numérique Culture." },
  "/experience": { title: "L'expérience Boussole | Boussole Numérique Culture", description: "Explorez les cinq dimensions d'un diagnostic numérique pensé pour les pratiques et les réalités du secteur culturel." },
  "/methode": { title: "Méthode et principes | Boussole Numérique Culture", description: "Découvrez la méthode de co-conception, les principes de service public et les engagements de gouvernance de la Boussole." },
  "/partenaires": { title: "Partenaires | Boussole Numérique Culture", description: "Découvrez comment les structures, les professionnelles et professionnels, et les partenaires contribuent à la Boussole Numérique Culture." },
  "/recherche": { title: "Recherche et enseignements | Boussole Numérique Culture", description: "Les enseignements de la recherche sur les pratiques numériques culturelles qui orientent la conception de la Boussole." },
  "/references": { title: "Références comparables | Boussole Numérique Culture", description: "Une sélection documentée d'outils comparables et de démarches inspirantes pour le diagnostic numérique culturel." },
  "/ressources": { title: "Ressources | Boussole Numérique Culture", description: "Accédez aux études, sources et ressources qui accompagnent le projet Boussole Numérique Culture." },
  "/etude-complete": { title: "Étude complète | Boussole Numérique Culture", description: "Consultez l'étude complète sur la transformation numérique dans les secteurs culturels et créatifs." },
  "/etat-des-lieux": { title: "État des lieux | Boussole Numérique Culture", description: "Un état des lieux des pratiques, besoins et conditions de transformation numérique dans le secteur culturel." },
  "/analyse-outils": { title: "Analyse d'outils | Boussole Numérique Culture", description: "Une analyse des outils de diagnostic et d'accompagnement numérique utiles au secteur culturel." },
  "/sources": { title: "Sources | Boussole Numérique Culture", description: "Retrouvez les sources et publications qui étayent la recherche Boussole Numérique Culture." },
  "/synthese-documents": { title: "Synthèse documentaire | Boussole Numérique Culture", description: "Une synthèse des documents clés mobilisés pour concevoir la Boussole Numérique Culture." },
};

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);

function renderTags({ title, description, canonicalPath = "/", index = true }) {
  const canonicalUrl = `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const imageUrl = `${siteUrl}/logo-memoways.png`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": canonicalPath === "/" ? "WebSite" : "WebPage",
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: "fr-CH",
    ...(canonicalPath !== "/" ? { isPartOf: { "@type": "WebSite", name: siteName, url: `${siteUrl}/` } } : {}),
  }).replace(/</g, "\\u003c");

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${index ? "index,follow" : "noindex,follow"}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_CH" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <script id="seo-page-schema" type="application/ld+json">${schema}</script>`;
}

function withMetadata(template, page) {
  const withoutGeneratedMetadata = template.replace(/\s*<!-- seo:generated:start -->[\s\S]*?<!-- seo:generated:end -->/i, "");
  const withoutExistingTitle = withoutGeneratedMetadata.replace(/<title>[\s\S]*?<\/title>/i, "");
  const metadata = renderTags(page);
  return withoutExistingTitle.replace("</head>", `<!-- seo:generated:start -->${metadata}\n    <!-- seo:generated:end -->\n  </head>`);
}

const aliases = {
  "/references-inspirantes": { ...pages["/references"], canonicalPath: "/references", index: false },
  "/description-projet": { ...pages["/projet"], canonicalPath: "/projet", index: false },
  "/gouvernance": { ...pages["/methode"], canonicalPath: "/methode", index: false },
};

if (mode === "pages") {
  const template = await readFile(sourcePath, "utf8");
  for (const [path, page] of Object.entries({ ...pages, ...aliases })) {
    if (path === "/") continue;
    const outputPath = resolve(publicDir, path.slice(1), "index.html");
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, withMetadata(template, { ...page, canonicalPath: page.canonicalPath ?? path }));
  }

  const indexablePaths = Object.keys(pages);
  const sitemapUrls = indexablePaths
    .map((path) => `  <url><loc>${escapeHtml(`${siteUrl}${path === "/" ? "/" : path}`)}</loc>`)
    .map((url) => `${url}</url>`)
    .join("\n");
  await writeFile(resolve(publicDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`);
  await writeFile(resolve(publicDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`Pages SEO générées pour ${indexablePaths.length} routes indexables (${siteUrl}).`);
} else if (mode === "root") {
  const outputPath = resolve("dist/public/index.html");
  const builtIndex = await readFile(outputPath, "utf8");
  await writeFile(outputPath, withMetadata(builtIndex, pages["/"]));
  console.log(`Métadonnées SEO injectées dans la page racine (${siteUrl}).`);
} else {
  throw new Error(`Mode de génération SEO inconnu : ${mode}`);
}
