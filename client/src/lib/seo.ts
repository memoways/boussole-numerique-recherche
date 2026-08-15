export type SeoPage = {
  title: string;
  description: string;
  canonicalPath?: string;
  index?: boolean;
  breadcrumbs?: BreadcrumbItem[];
};

export type BreadcrumbItem = {
  label: string;
  path: string;
};

export const SITE_NAME = "Boussole Numérique Culture";
export const DEFAULT_DESCRIPTION =
  "Le site compagnon d’un outil en co-conception pour aider les partenaires culturels à définir des pratiques numériques plus utiles.";

export const SEO_PAGES: Record<string, SeoPage> = {
  "/": {
    title: "Boussole Numérique Culture | Outil en co-conception",
    description:
      "Le site compagnon d’un outil en co-conception pour les institutions, structures, associations, réseaux et collectifs culturels qui accompagnent des artistes.",
  },
  "/404": {
    title: "Page introuvable | Boussole Numérique Culture",
    description:
      "Cette adresse ne mène pas à une page active. Recherchez un document ou revenez aux principaux parcours de la Boussole Numérique Culture.",
    index: false,
  },
  "/projet": {
    title: "L’outil en co-conception | Boussole Numérique Culture",
    description:
      "Découvrez comment les partenaires contribuent à définir la Boussole Numérique Culture, un outil de pratiques numériques à co-concevoir.",
  },
  "/timeline": {
    title: "Phases du site compagnon | Boussole Numérique Culture",
    description:
      "Suivez les phases indicatives de mobilisation, de prototype, de test et d’accompagnement de la Boussole Numérique Culture.",
  },
  "/experience": {
    title: "Démonstration de la Boussole | Partenaires",
    description:
      "Une démonstration du futur parcours destinée à aider les partenaires à réagir aux dimensions et aux choix de conception de la Boussole.",
  },
  "/methode": {
    title: "Méthode de co-conception | Boussole Numérique Culture",
    description:
      "Découvrez comment les partenaires, les artistes et l’équipe de projet définissent ensemble les questions, le prototype et les principes de la Boussole.",
  },
  "/partenaires": {
    title: "Partenaires de co-conception | Boussole Numérique Culture",
    description:
      "Institutions, structures, associations, réseaux et collectifs : découvrez votre rôle, le questionnaire partenaire et les phases de co-conception.",
  },
  "/partenaires/presentation": {
    title: "Découvrir la Boussole | Partenaires",
    description:
      "Une présentation courte pour comprendre le problème traité, le rôle des partenaires et le prototype de la Boussole à décider ensemble.",
    breadcrumbs: [
      { label: "Accueil", path: "/" },
      { label: "Partenaires", path: "/partenaires" },
      { label: "Découvrir la Boussole", path: "/partenaires/presentation" },
    ],
  },
  "/partenaires/questionnaire": {
    title: "Questionnaire partenaire | Boussole Numérique Culture",
    description:
      "Partagez besoins, priorités, idées et points de vigilance pour préparer l’atelier de co-conception de la Boussole Numérique Culture.",
    index: false,
    breadcrumbs: [
      { label: "Accueil", path: "/" },
      { label: "Partenaires", path: "/partenaires" },
      { label: "Questionnaire", path: "/partenaires/questionnaire" },
    ],
  },
  "/partenaires/admin": {
    title: "Administration partenaire | Boussole Numérique Culture",
    description: "Espace privé de gestion des invitations et des réponses partenaires.",
    index: false,
    breadcrumbs: [
      { label: "Accueil", path: "/" },
      { label: "Partenaires", path: "/partenaires" },
      { label: "Administration", path: "/partenaires/admin" },
    ],
  },
  "/admin": {
    title: "Administration partenaire | Boussole Numérique Culture",
    description: "Espace privé de gestion des invitations et des réponses partenaires.",
    canonicalPath: "/admin",
    index: false,
    breadcrumbs: [
      { label: "Accueil", path: "/" },
      { label: "Administration", path: "/admin" },
    ],
  },
  "/recherche": {
    title: "Recherche et enseignements | Boussole Numérique Culture",
    description:
      "Les enseignements de la recherche sur les pratiques numériques culturelles qui orientent la conception de la Boussole.",
  },
  "/references": {
    title: "Références comparables | Boussole Numérique Culture",
    description:
      "Une sélection documentée d'outils comparables et de démarches inspirantes pour le diagnostic numérique culturel.",
  },
  "/ressources": {
    title: "Ressources | Boussole Numérique Culture",
    description:
      "Accédez aux études, sources et ressources qui accompagnent le projet Boussole Numérique Culture.",
  },
  "/ressources/etude-complete": {
    title: "Étude complète | Ressources Boussole",
    description: "Document consolidé de recherche sur la transformation numérique dans la culture.",
    index: false,
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Ressources", path: "/ressources" }, { label: "Étude complète", path: "/ressources/etude-complete" }],
  },
  "/ressources/etat-des-lieux": {
    title: "État des lieux | Ressources Boussole",
    description: "Rapport de synthèse sur la transformation numérique dans le secteur culturel.",
    index: false,
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Ressources", path: "/ressources" }, { label: "État des lieux", path: "/ressources/etat-des-lieux" }],
  },
  "/ressources/analyse-outils": {
    title: "Analyse d’outils | Ressources Boussole",
    description: "Document d’archive sur les outils de diagnostic étudiés pour la recherche.",
    index: false,
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Ressources", path: "/ressources" }, { label: "Analyse d’outils", path: "/ressources/analyse-outils" }],
  },
  "/ressources/synthese-documents": {
    title: "Synthèse documentaire | Ressources Boussole",
    description: "Synthèse des documents clés qui ont éclairé la recherche du projet.",
    index: false,
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Ressources", path: "/ressources" }, { label: "Synthèse documentaire", path: "/ressources/synthese-documents" }],
  },
  "/ressources/sources": {
    title: "Sources documentaires | Ressources Boussole",
    description: "Liste des sources documentées mobilisées pour la recherche du projet.",
    index: false,
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Ressources", path: "/ressources" }, { label: "Sources", path: "/ressources/sources" }],
  },
  "/ressources/references-inspirantes": {
    title: "Références inspirantes | Ressources Boussole",
    description: "Document d’archive sur les références inspirantes de la recherche initiale.",
    index: false,
    breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Ressources", path: "/ressources" }, { label: "Références inspirantes", path: "/ressources/references-inspirantes" }],
  },
  "/etude-complete": {
    title: "Étude complète | Boussole Numérique Culture",
    description:
      "Consultez l'étude complète sur la transformation numérique dans les secteurs culturels et créatifs.",
    canonicalPath: "/ressources/etude-complete",
    index: false,
  },
  "/etat-des-lieux": {
    title: "État des lieux | Boussole Numérique Culture",
    description:
      "Un état des lieux des pratiques, besoins et conditions de transformation numérique dans le secteur culturel.",
    canonicalPath: "/ressources/etat-des-lieux",
    index: false,
  },
  "/analyse-outils": {
    title: "Analyse d'outils | Boussole Numérique Culture",
    description:
      "Une analyse des outils de diagnostic et d'accompagnement numérique utiles au secteur culturel.",
    canonicalPath: "/ressources/analyse-outils",
    index: false,
  },
  "/sources": {
    title: "Sources | Boussole Numérique Culture",
    description:
      "Retrouvez les sources et publications qui étayent la recherche Boussole Numérique Culture.",
    canonicalPath: "/ressources/sources",
    index: false,
  },
  "/synthese-documents": {
    title: "Synthèse documentaire | Boussole Numérique Culture",
    description:
      "Une synthèse des documents clés mobilisés pour concevoir la Boussole Numérique Culture.",
    canonicalPath: "/ressources/synthese-documents",
    index: false,
  },
  "/references-inspirantes": {
    title: "Références comparables | Boussole Numérique Culture",
    description:
      "Une sélection documentée d'outils comparables et de démarches inspirantes pour le diagnostic numérique culturel.",
    canonicalPath: "/ressources/references-inspirantes",
    index: false,
  },
  "/description-projet": {
    title: "Le projet | Boussole Numérique Culture",
    description:
      "Découvrez le projet Boussole Numérique Culture : un diagnostic numérique co-construit pour renforcer les pratiques du secteur culturel.",
    canonicalPath: "/projet",
    index: false,
  },
  "/gouvernance": {
    title: "Méthode et principes | Boussole Numérique Culture",
    description:
      "Découvrez la méthode de co-conception, les principes de service public et les engagements de gouvernance de la Boussole.",
    canonicalPath: "/methode",
    index: false,
  },
};

const BREADCRUMB_LABELS: Record<string, string> = {
  "/projet": "Projet",
  "/timeline": "Calendrier",
  "/experience": "Expérience",
  "/methode": "Méthode",
  "/partenaires": "Partenaires",
  "/partenaires/presentation": "Découvrir la Boussole",
  "/partenaires/questionnaire": "Questionnaire",
  "/partenaires/admin": "Administration",
  "/admin": "Administration",
  "/recherche": "Recherche",
  "/references": "Références",
  "/ressources": "Ressources",
  "/ressources/etude-complete": "Étude complète",
  "/ressources/etat-des-lieux": "État des lieux",
  "/ressources/analyse-outils": "Analyse d’outils",
  "/ressources/synthese-documents": "Synthèse documentaire",
  "/ressources/sources": "Sources",
  "/ressources/references-inspirantes": "Références inspirantes",
  "/etude-complete": "Étude complète",
  "/etat-des-lieux": "État des lieux",
  "/analyse-outils": "Analyse d’outils",
  "/sources": "Sources",
  "/synthese-documents": "Synthèse documentaire",
};

const HOME_BREADCRUMB: BreadcrumbItem = { label: "Accueil", path: "/" };

export function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

export function getSeoPage(pathname: string): SeoPage {
  return SEO_PAGES[normalizePathname(pathname)] ?? {
    title: `${SITE_NAME} | Ressource`,
    description: DEFAULT_DESCRIPTION,
    index: false,
  };
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const normalizedPath = normalizePathname(pathname);
  const page = getSeoPage(normalizedPath);
  const canonicalPath = page.canonicalPath ?? normalizedPath;
  const currentLabel = BREADCRUMB_LABELS[canonicalPath];

  if (page.breadcrumbs?.length) return page.breadcrumbs;

  if (!currentLabel) return [];

  return [
    HOME_BREADCRUMB,
    { label: currentLabel, path: canonicalPath },
  ];
}
