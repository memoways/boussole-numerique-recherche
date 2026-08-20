import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import seoMetadata from "../shared/seo-pages.json" with { type: "json" };

const siteUrl = (process.env.SITE_URL || "https://boussole-culture-recherche.memoways.com").replace(/\/$/, "");
const distDir = resolve("dist/public");
const buildDate = new Date().toISOString().slice(0, 10);
const siteName = "Boussole Numérique Culture";
const organizationName = "Memoways Research";
const organizationUrl = "https://memoways.com";
const logoUrl = `${siteUrl}/logo-memoways.png`;

const navigation = [
  { label: "Accueil", path: "/" },
  { label: "L’outil", path: "/projet" },
  { label: "Phases", path: "/timeline" },
  { label: "Démonstration", path: "/experience" },
  { label: "Méthode", path: "/methode" },
  { label: "Partenaires", path: "/partenaires" },
];

const pages = {
  "/": {
    title: "Boussole en préparation | Site compagnon pour la culture",
    description: "Le site compagnon d’une Boussole Numérique Culture en préparation : retours, co-conception à l’automne 2026 et prototype à tester visé fin 2026.",
    h1: "Boussole Numérique Culture",
    intro: "Ce site compagnon accompagne la préparation d’une Boussole pour les artistes des milieux culturels genevois. La Boussole n’existe pas encore : le site informe, recueille les retours et prépare sa co-conception avec les partenaires et les artistes.",
    sections: [
      { heading: "Ce que le futur prototype devra apporter", text: "La Boussole devra proposer un état des lieux non jugeant et des conseils actionnables pour choisir de meilleurs outils, procédures et manières de collaborer. Elle ne donnera ni note ni classement." },
      { heading: "Deux points de départ", text: "Le site propose un parcours pour les partenaires culturels qui relient la co-conception aux artistes, et un parcours pour les artistes qui aideront à définir les situations et conseils utiles." },
      { heading: "Ce qui se construit maintenant", text: "Le site recueille les retours aujourd’hui. L’atelier et le cadrage sont prévus entre septembre et octobre 2026, un prototype à tester est visé fin 2026 et une ouverture publique début 2027." },
    ],
    links: [{ label: "Découvrir le rôle des partenaires", path: "/partenaires" }, { label: "Explorer l’expérience Boussole", path: "/experience" }, { label: "Voir les phases du site compagnon", path: "/timeline" }],
  },
  "/projet": {
    title: "L’outil en co-conception | Boussole Numérique Culture",
    description: "Découvrez comment les partenaires contribuent à définir la Boussole Numérique Culture, un outil de pratiques numériques à co-concevoir.",
    h1: "Un outil à définir avec les personnes concernées",
    intro: "La Boussole Numérique Culture est un outil en co-conception. Le site compagnon rend son développement lisible, recueille les réactions des partenaires et accompagnera les décisions qui mèneront à un premier prototype.",
    sections: [{ heading: "Le rôle des partenaires", text: "Les partenaires précisent les questions, les dimensions et les formes de restitution ; ils relient l’outil aux artistes, aux équipes et aux communautés qu’ils accompagnent." }],
    links: [{ label: "Voir les phases du site compagnon", path: "/timeline" }, { label: "Contribuer comme partenaire", path: "/partenaires" }],
  },
  "/timeline": {
    title: "Calendrier de la Boussole en préparation | Culture",
    description: "Atelier et cadrage à l’automne 2026, prototype à tester visé fin 2026, ouverture publique visée début 2027 et phases indicatives du projet.",
    h1: "Du site compagnon à l’ouverture de la Boussole",
    intro: "La Boussole n’existe pas encore. Ce site compagnon informe et recueille les retours avant l’atelier et le cadrage de l’automne 2026. Le prototype à tester est visé fin 2026, puis une ouverture publique au début de 2027.",
    sections: [{ heading: "Quatre étapes indicatives", text: "Atelier et cadrage de co-conception ; développement d’un prototype à tester ; tests et préparation de l’ouverture publique ; diffusion et accompagnement. Le calendrier s’ajuste avec les retours recueillis." }],
    links: [{ label: "Comprendre le rôle des partenaires", path: "/partenaires" }, { label: "Lire la méthode", path: "/methode" }],
  },
  "/experience": {
    title: "Prévisualiser le futur prototype | Boussole Culture",
    description: "Quatre écrans illustratifs pour discuter le futur prototype : se situer, décrire une situation, lire un panorama et choisir une première amélioration.",
    h1: "Imaginer l’expérience Boussole, écran par écran",
    intro: "Cette page prévisualise quatre écrans du futur prototype : se situer, décrire une situation, lire un panorama et choisir une première amélioration. La Boussole n’existe pas encore et cette démonstration ne collecte aucune donnée.",
    sections: [{ heading: "Quatre écrans à discuter", text: "Les interfaces montrent comment le futur outil pourrait adapter ses questions, préparer un état des lieux non jugeant, rendre les repères visuels discutables et proposer des pistes d’action sans décider à la place des personnes concernées." }],
    links: [{ label: "Répondre au questionnaire partenaire", path: "/partenaires/questionnaire" }, { label: "Voir la méthode", path: "/methode" }],
  },
  "/methode": {
    title: "Méthode de co-conception | Boussole Numérique Culture",
    description: "Découvrez comment les partenaires, les artistes et l’équipe de projet définissent ensemble les questions, le prototype et les principes de la Boussole.",
    h1: "Méthode, co-conception et gouvernance",
    intro: "La Boussole est construite avec des partenaires qui relient l’outil aux artistes, aux équipes et aux communautés culturelles. Le site compagnon rend les étapes et les choix de cette co-conception discutables.",
    sections: [{ heading: "Une méthode traçable", text: "Écouter, formuler, prototyper, tester, ajuster et documenter : les retours de terrain orientent les décisions de conception et de gouvernance." }],
    links: [{ label: "Accéder au questionnaire partenaire", path: "/partenaires/questionnaire" }, { label: "Voir les phases", path: "/timeline" }],
  },
  "/partenaires": {
    title: "Co-concevoir la Boussole en préparation | Partenaires",
    description: "Le site compagnon rassemble les retours des partenaires culturels afin de cadrer puis tester une Boussole avec les artistes.",
    h1: "Co-concevoir une Boussole encore à construire",
    intro: "La Boussole n’existe pas encore. Ce site compagnon rassemble les retours des institutions, structures, associations, réseaux et collectifs afin de la co-concevoir avec les artistes, avant le développement d’un prototype.",
    sections: [{ heading: "Contribuer au cadrage", text: "Le questionnaire recueille besoins, priorités, idées et situations à comprendre. Il prépare l’atelier et le cadrage de l’automne, avant le développement du prototype à tester visé fin 2026." }],
    links: [{ label: "Découvrir la Boussole", path: "/partenaires/presentation" }, { label: "Répondre au questionnaire partenaire", path: "/partenaires/questionnaire" }],
  },
  "/partenaires/presentation": {
    title: "Découvrir la Boussole | Partenaires",
    description: "Une présentation courte pour comprendre le problème traité, le rôle des partenaires et le prototype de la Boussole à décider ensemble.",
    h1: "Découvrir la Boussole",
    intro: "La présentation partenaire condense le problème traité, les principes de l’outil, les étapes de co-conception et les formes possibles de contribution.",
    sections: [{ heading: "Une contribution utile", text: "Les partenaires apportent des réalités de terrain, mettent les hypothèses à l’épreuve et aident à relier le prototype aux artistes et aux communautés concernées." }],
    links: [{ label: "Retour aux partenaires", path: "/partenaires" }, { label: "Accéder au questionnaire", path: "/partenaires/questionnaire" }],
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Partenaires", path: "/partenaires" }, { label: "Découvrir la Boussole", path: "/partenaires/presentation" }],
  },
  "/recherche": {
    title: "Recherche et enseignements | Boussole Numérique Culture",
    description: "Les enseignements de la recherche sur les pratiques numériques culturelles qui orientent la conception de la Boussole.",
    h1: "Recherche et enseignements",
    intro: "La Boussole s’appuie sur une recherche documentée concernant la transformation numérique culturelle, les besoins de terrain et les approches comparables.",
    sections: [{ heading: "Une recherche au service de la conception", text: "Les références ne déterminent pas le prototype à l’avance : elles donnent des repères que les partenaires confrontent ensuite aux pratiques locales." }],
    links: [{ label: "Consulter les références comparables", path: "/references" }, { label: "Explorer les documents et sources", path: "/ressources" }],
  },
  "/references": {
    title: "Références comparables | Boussole Numérique Culture",
    description: "Une sélection documentée d’outils comparables et de démarches inspirantes pour le diagnostic numérique culturel.",
    h1: "Références comparables",
    intro: "Cette sélection compare des outils et démarches existants afin d’identifier leurs apports, leurs limites et les idées à discuter pour la Boussole.",
    sections: [{ heading: "Apprendre de l’existant", text: "Les exemples servent de points de comparaison. Ils ne sont pas des modèles à reproduire sans les adapter au contexte et aux besoins exprimés par les partenaires." }],
    links: [{ label: "Lire les enseignements de la recherche", path: "/recherche" }, { label: "Voir le projet", path: "/projet" }],
  },
  "/ressources": {
    title: "Documents et sources | Boussole Numérique Culture",
    description: "Accédez aux études, sources et ressources qui accompagnent la co-conception de la Boussole Numérique Culture.",
    h1: "Documents et sources",
    intro: "Les documents internes, études externes et sources web rassemblés ici accompagnent la recherche et les décisions de co-conception.",
    sections: [{ heading: "Des références vérifiables", text: "Chaque fiche précise la nature du document, son statut et, lorsque nécessaire, son contexte d’archive ou de vérification." }],
    links: [{ label: "Revenir aux enseignements de recherche", path: "/recherche" }, { label: "Découvrir les références comparables", path: "/references" }],
  },
};

const nonIndexablePages = {
  "/partenaires/questionnaire": {
    title: "Questionnaire partenaire | Boussole Numérique Culture",
    description: "Partagez besoins, priorités, idées et points de vigilance pour préparer l’atelier de co-conception de la Boussole Numérique Culture.",
    h1: "Questionnaire partenaire",
    intro: "Le questionnaire est accessible avec une invitation personnelle. Les personnes intéressées peuvent demander une invitation depuis cette page.",
    sections: [],
    links: [{ label: "Revenir à la page Partenaires", path: "/partenaires" }],
    index: false,
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Partenaires", path: "/partenaires" }, { label: "Questionnaire", path: "/partenaires/questionnaire" }],
  },
  "/partenaires/admin": {
    title: "Administration partenaire | Boussole Numérique Culture",
    description: "Espace privé de gestion des invitations et des réponses partenaires.",
    h1: "Administration partenaire",
    intro: "Cet espace est réservé à l’administration du programme partenaire.",
    sections: [],
    links: [{ label: "Retour à l’accueil", path: "/" }],
    index: false,
  },
  "/admin": {
    title: "Administration partenaire | Boussole Numérique Culture",
    description: "Espace privé de gestion des invitations et des réponses partenaires.",
    h1: "Administration partenaire",
    intro: "Cet espace est réservé à l’administration du programme partenaire.",
    sections: [],
    links: [{ label: "Retour à l’accueil", path: "/" }],
    index: false,
  },
  "/ressources/etude-complete": {
    title: "Étude complète | Ressources Boussole",
    description: "Document consolidé de recherche sur la transformation numérique dans la culture.",
    h1: "Étude complète",
    intro: "Document d’archive disponible depuis les documents et sources de la Boussole.",
    sections: [],
    links: [{ label: "Retour aux documents et sources", path: "/ressources" }],
    index: false,
  },
  "/ressources/etat-des-lieux": {
    title: "État des lieux | Ressources Boussole",
    description: "Rapport de synthèse sur la transformation numérique dans le secteur culturel.",
    h1: "État des lieux",
    intro: "Document d’archive disponible depuis les documents et sources de la Boussole.",
    sections: [],
    links: [{ label: "Retour aux documents et sources", path: "/ressources" }],
    index: false,
  },
  "/ressources/analyse-outils": {
    title: "Analyse d’outils | Ressources Boussole",
    description: "Document d’archive sur les outils de diagnostic étudiés pour la recherche.",
    h1: "Analyse d’outils",
    intro: "Document d’archive disponible depuis les documents et sources de la Boussole.",
    sections: [],
    links: [{ label: "Retour aux documents et sources", path: "/ressources" }],
    index: false,
  },
  "/ressources/synthese-documents": {
    title: "Synthèse documentaire | Ressources Boussole",
    description: "Synthèse des documents clés qui ont éclairé la recherche du projet.",
    h1: "Synthèse documentaire",
    intro: "Document d’archive disponible depuis les documents et sources de la Boussole.",
    sections: [],
    links: [{ label: "Retour aux documents et sources", path: "/ressources" }],
    index: false,
  },
  "/ressources/sources": {
    title: "Sources documentaires | Ressources Boussole",
    description: "Liste des sources documentées mobilisées pour la recherche du projet.",
    h1: "Sources documentaires",
    intro: "Document d’archive disponible depuis les documents et sources de la Boussole.",
    sections: [],
    links: [{ label: "Retour aux documents et sources", path: "/ressources" }],
    index: false,
  },
  "/ressources/references-inspirantes": {
    title: "Références inspirantes | Ressources Boussole",
    description: "Document d’archive sur les références inspirantes de la recherche initiale.",
    h1: "Références inspirantes",
    intro: "Document d’archive disponible depuis les documents et sources de la Boussole.",
    sections: [],
    links: [{ label: "Retour aux documents et sources", path: "/ressources" }],
    index: false,
  },
};

const notFoundPage = {
  title: "Page introuvable | Boussole Numérique Culture",
  description: "Cette adresse ne mène pas à une page active. Recherchez un document ou revenez aux principaux parcours de la Boussole Numérique Culture.",
  h1: "Cette adresse ne mène plus à la bonne page.",
  intro: "Vous pouvez revenir à l’accueil, consulter les partenaires ou explorer les documents et sources du projet.",
  sections: [],
  links: [{ label: "Retour à l’accueil", path: "/" }, { label: "Consulter les documents et sources", path: "/ressources" }],
  index: false,
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const canonicalUrl = (path) => `${siteUrl}${path === "/" ? "/" : path}`;

function breadcrumbsFor(path, page) {
  if (page.breadcrumbs) return page.breadcrumbs;
  if (path === "/") return [];
  return [{ label: "Accueil", path: "/" }, { label: page.h1, path }];
}

function renderStructuredData(path, page) {
  const canonical = canonicalUrl(path);
  const webSiteId = `${siteUrl}/#website`;
  const organizationId = `${siteUrl}/#organization`;
  const pageId = `${canonical}#webpage`;
  const breadcrumbs = breadcrumbsFor(path, page);
  const graph = [
    {
      "@type": "WebSite",
      "@id": webSiteId,
      name: siteName,
      url: `${siteUrl}/`,
      inLanguage: "fr-CH",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: organizationName,
      url: organizationUrl,
      logo: { "@type": "ImageObject", url: logoUrl },
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: "fr-CH",
      isPartOf: { "@id": webSiteId },
      publisher: { "@id": organizationId },
      about: { "@type": "Thing", name: "Transformation numérique et pratiques culturelles" },
    },
  ];

  if (breadcrumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: canonicalUrl(item.path),
      })),
    });
  }

  return escapeJson({ "@context": "https://schema.org", "@graph": graph });
}

function renderMetadata(path, page) {
  const canonical = canonicalUrl(path);
  return `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="${page.index === false ? "noindex,follow" : "index,follow"}" />
    <meta name="author" content="${organizationName}" />
    <meta name="theme-color" content="#515792" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_CH" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(logoUrl)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(logoUrl)}" />
    <meta property="og:image:alt" content="Logo ${siteName}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(logoUrl)}" />
    <script id="seo-schema" type="application/ld+json">${renderStructuredData(path, page)}</script>`;
}

function renderStaticMarkup(path, page) {
  const nav = navigation.map((item) => `<a href="${escapeHtml(item.path)}">${escapeHtml(item.label)}</a>`).join(" · ");
  const sections = page.sections.map((section) => `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        <p>${escapeHtml(section.text)}</p>
      </section>`).join("");
  const links = page.links.map((link) => `<li><a href="${escapeHtml(link.path)}">${escapeHtml(link.label)}</a></li>`).join("");
  const breadcrumb = path === "/" ? "" : `<p><a href="/">Accueil</a> / ${escapeHtml(page.h1)}</p>`;

  return `<div id="root">
    <main id="contenu-principal">
      <header>
        <p><a href="/">${siteName}</a></p>
        <nav aria-label="Navigation principale">${nav}</nav>
      </header>
      ${breadcrumb}
      <article>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.intro)}</p>${sections}
        ${links ? `<nav aria-label="Parcours associés"><h2>Aller plus loin</h2><ul>${links}</ul></nav>` : ""}
      </article>
      <footer><p>Site compagnon de la Boussole Numérique Culture.</p></footer>
    </main>
  </div>`;
}

function withStaticPage(template, path, page) {
  const withoutGeneratedMetadata = template.replace(/\s*<!-- seo:generated:start -->[\s\S]*?<!-- seo:generated:end -->/i, "");
  const withoutExistingTitle = withoutGeneratedMetadata.replace(/<title>[\s\S]*?<\/title>/i, "");
  const withoutTemplateMetadata = withoutExistingTitle
    .replace(/\s*<meta\s+name=["'](?:description|robots|theme-color)["'][^>]*>/gi, "")
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+(?:property|name)=["'](?:og:[^"']+|twitter:[^"']+)["'][^>]*>/gi, "")
    .replace(/\s*<script\s+id=["']seo-schema["'][\s\S]*?<\/script>/gi, "");
  const withMetadata = withoutTemplateMetadata.replace("</head>", `<!-- seo:generated:start -->${renderMetadata(path, page)}\n    <!-- seo:generated:end -->\n  </head>`);
  return withMetadata.replace(/<div id="root">[\s\S]*?<\/div>/i, renderStaticMarkup(path, page));
}

async function writeRoute(template, path, page) {
  const outputPath = path === "/"
    ? resolve(distDir, "index.html")
    : resolve(distDir, path.slice(1), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, withStaticPage(template, path, page));
}

async function writeTextFile(name, content) {
  await writeFile(resolve(distDir, name), content);
}

async function generate() {
  const template = await readFile(resolve(distDir, "index.html"), "utf8");
  const allPages = { ...pages, ...nonIndexablePages };

  for (const [path, page] of Object.entries(allPages)) {
    await writeRoute(template, path, { ...page, ...(seoMetadata[path] ?? {}) });
  }
  await writeTextFile("404.html", withStaticPage(template, "/404", { ...notFoundPage, ...(seoMetadata["/404"] ?? {}) }));

  const sitemapEntries = Object.keys(pages).map((path) => {
    const priority = path === "/" ? "1.0" : path === "/projet" || path === "/partenaires" ? "0.9" : "0.7";
    return `  <url>\n    <loc>${escapeHtml(canonicalUrl(path))}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join("\n");
  await writeTextFile("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);
  await writeTextFile("robots.txt", `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /partenaires/admin\nDisallow: /partenaires/questionnaire\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  await writeTextFile("llms.txt", `# ${siteName}\n\n> Site compagnon d’une Boussole Numérique Culture en préparation pour les artistes des milieux culturels genevois.\n\n## Statut\n\nLa Boussole n’existe pas encore comme outil utilisable. Le site informe, recueille les retours et prépare la co-conception avec les partenaires culturels et les artistes. L’atelier et le cadrage sont prévus entre septembre et octobre 2026. Un prototype à tester est visé fin 2026, puis une ouverture publique début 2027.\n\n## Ce que le futur outil devra apporter\n\nLa Boussole devra proposer un état des lieux non jugeant et des conseils actionnables pour choisir des outils, procédures et pratiques de collaboration plus utiles. Elle ne donnera pas de note ni de classement.\n\n## Deux parcours\n\n- **Partenaires culturels** : institutions, associations, réseaux ou collectifs qui font remonter les situations des artistes et contribuent à cadrer, tester puis ajuster le prototype.\n- **Artistes** : personnes qui partagent les pratiques, contraintes et améliorations à prendre en compte avant le développement de l’outil.\n\n## Parcours publics\n\n- [Accueil](${canonicalUrl("/")}) : comprendre le statut du projet et choisir un profil de contribution.\n- [L’outil en co-conception](${canonicalUrl("/projet")})\n- [Calendrier indicatif](${canonicalUrl("/timeline")})\n- [Méthode de co-conception](${canonicalUrl("/methode")})\n- [Partenaires](${canonicalUrl("/partenaires")})\n- [Recherche et enseignements](${canonicalUrl("/recherche")})\n- [Références comparables](${canonicalUrl("/references")})\n- [Documents et sources](${canonicalUrl("/ressources")})\n\n## Contact\n\nulrich.fischer@memoways.com\n\n## Mise à jour\n\n${buildDate}\n`);
  console.log(`Pages HTML statiques, sitemap, robots et llms.txt générés pour ${Object.keys(pages).length} routes indexables.`);
}

await generate();
