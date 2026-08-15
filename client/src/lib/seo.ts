import rawSeoPages from "@shared/seo-pages.json";

export type BreadcrumbItem = {
  label: string;
  path: string;
};

export type SeoPage = {
  title: string;
  description: string;
  canonicalPath?: string;
  index?: boolean;
  breadcrumbs?: BreadcrumbItem[];
};

export const SITE_NAME = "Boussole Numérique Culture";
export const DEFAULT_DESCRIPTION = "Le site compagnon d’un outil en co-conception pour aider les partenaires culturels à définir des pratiques numériques plus utiles.";

export const SEO_PAGES = rawSeoPages as Record<string, SeoPage>;

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

  return [HOME_BREADCRUMB, { label: currentLabel, path: canonicalPath }];
}
