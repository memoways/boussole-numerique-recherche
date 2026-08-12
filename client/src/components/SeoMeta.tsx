import { useEffect } from "react";
import { getSeoPage, normalizePathname, SITE_NAME } from "@/lib/seo";

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
    const origin = window.location.origin;
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
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, page.title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, page.description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);

    const schemaId = "seo-page-schema";
    const schema = {
      "@context": "https://schema.org",
      "@type": normalizedPath === "/" ? "WebSite" : "WebPage",
      name: page.title,
      description: page.description,
      url: canonicalUrl,
      inLanguage: "fr-CH",
      isPartOf: normalizedPath === "/" ? undefined : { "@type": "WebSite", name: SITE_NAME, url: origin },
    };
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
