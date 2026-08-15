import { useEffect } from "react";
import { getBreadcrumbs, getSeoPage, normalizePathname, SITE_NAME } from "@/lib/seo";

/** Métadonnées publiques : les canoniques restent sur le domaine HTTPS configuré, sans port interne Coolify. */
const PUBLIC_SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://boussole-culture-recherche.memoways.com").replace(/\/+$/, "");

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(selector: string, attributes: Record<string, string>, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SeoMeta({ pathname }: { pathname: string }) {
  useEffect(() => {
    const normalizedPath = normalizePathname(pathname);
    const page = getSeoPage(normalizedPath);
    const canonicalPath = page.canonicalPath ?? normalizedPath;
    const origin = PUBLIC_SITE_URL;
    const canonicalUrl = new URL(canonicalPath, origin).toString();
    const imageUrl = new URL("/logo-memoways.png", origin).toString();
    const robots = page.index === false ? "noindex,follow" : "index,follow";

    document.title = page.title;
    upsertMeta('meta[name="description"]', { name: "description" }, page.description);
    upsertMeta('meta[name="robots"]', { name: "robots" }, robots);
    upsertLink('link[rel="canonical"]', { rel: "canonical" }, canonicalUrl);

    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[property="og:locale"]', { property: "og:locale" }, "fr_CH");
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, page.title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, page.description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, imageUrl);
    upsertMeta('meta[property="og:image:secure_url"]', { property: "og:image:secure_url" }, imageUrl);
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, `Logo ${SITE_NAME}`);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, page.title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, page.description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);

    const schemaId = "seo-schema";
    const websiteId = `${origin}/#website`;
    const organizationId = `${origin}/#organization`;
    const pageId = `${canonicalUrl}#webpage`;
    const breadcrumbs = getBreadcrumbs(normalizedPath);
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": websiteId,
          name: SITE_NAME,
          url: `${origin}/`,
          inLanguage: "fr-CH",
          publisher: { "@id": organizationId },
        },
        {
          "@type": "Organization",
          "@id": organizationId,
          name: "Memoways Research",
          url: "https://memoways.com",
          logo: { "@type": "ImageObject", url: imageUrl },
        },
        {
          "@type": "WebPage",
          "@id": pageId,
          name: page.title,
          description: page.description,
          url: canonicalUrl,
          inLanguage: "fr-CH",
          isPartOf: { "@id": websiteId },
          publisher: { "@id": organizationId },
          about: { "@type": "Thing", name: "Transformation numérique et pratiques culturelles" },
        },
        ...(breadcrumbs.length > 1 ? [{
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: new URL(item.path, origin).toString(),
          })),
        }] : []),
      ],
    };
    document.getElementById("seo-page-schema")?.remove();
    document.getElementById("seo-breadcrumb-schema")?.remove();
    let schemaElement = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!schemaElement) {
      schemaElement = document.createElement("script");
      schemaElement.id = schemaId;
      schemaElement.type = "application/ld+json";
      document.head.appendChild(schemaElement);
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [pathname]);

  return null;
}
