import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Compass, ExternalLink, Home, Search, X } from "lucide-react";
import { normalizeSearchValue, RESSOURCES, SEARCH_SUGGESTIONS } from "./Ressources";

/**
 * Page /404 — Boussole Numérique Culture
 * Style : repère éditorial clair, bleu #515792 et orange #E07428 pour réorienter sans dramatiser.
 * Le parcours privilégie la recherche et des sorties utiles, en grille fluide de la largeur du portail.
 */

const QUICK_LINKS = [
  { href: "/projet", label: "Projet", description: "Comprendre l’intention et le cadre de la Boussole.", color: "#515792" },
  { href: "/experience", label: "Expérience", description: "Découvrir le parcours envisagé pour les structures.", color: "#3a7fc1" },
  { href: "/methode", label: "Méthode", description: "Consulter les principes de conception et de gouvernance.", color: "#3aab8a" },
  { href: "/partenaires", label: "Partenaires", description: "Suivre la démarche de co-construction.", color: "#E07428" },
  { href: "/ressources", label: "Documents et sources", description: "Explorer les études, analyses et références.", color: "#515792" },
];

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = normalizeSearchValue(searchQuery);

  const matchingResources = useMemo(() => {
    if (!normalizedQuery) return [];

    return RESSOURCES.filter((resource) => {
      const searchableText = normalizeSearchValue([
        resource.titre,
        resource.desc,
        resource.type,
        resource.dateGroup,
        resource.dateLabel,
        resource.temps,
      ].join(" "));

      return normalizedQuery.split(/\s+/).every((term) => searchableText.includes(term));
    }).slice(0, 4);
  }, [normalizedQuery]);

  const visibleSuggestions = SEARCH_SUGGESTIONS.filter((suggestion) =>
    !normalizedQuery || normalizeSearchValue(suggestion).includes(normalizedQuery),
  ).slice(0, 5);

  return (
    <div className="relative overflow-hidden bg-[#f8f9fc] py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_10%_0%,rgba(81,87,146,0.14),transparent_52%),radial-gradient(circle_at_91%_22%,rgba(58,171,138,0.13),transparent_48%)]" />

      <section className="relative mx-auto max-w-5xl px-4 sm:px-6" aria-labelledby="not-found-title">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-start">
          <div className="rounded-2xl border border-[#515792]/15 bg-white p-6 shadow-[0_18px_45px_-30px_rgba(34,40,84,0.45)] sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#515792] text-lg font-extrabold text-white shadow-sm" aria-hidden="true">404</span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#515792]">Repère introuvable</span>
            </div>

            <h1 id="not-found-title" className="max-w-2xl text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl">
              Cette adresse ne mène plus à la bonne page.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Le contenu a peut-être été déplacé, renommé ou retiré. Recherchez un document ou reprenez le parcours depuis l’une des pages principales.
            </p>

            <div className="mt-7">
              <label htmlFor="not-found-search" className="mb-2 block text-sm font-bold text-slate-800">Rechercher dans les documents et sources</label>
              <div className="relative max-w-2xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#515792]" aria-hidden="true" />
                <input
                  id="not-found-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  list="not-found-search-suggestions"
                  placeholder="Ex. intelligence artificielle, UNESCO, 2026"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-11 text-base text-slate-900 shadow-sm outline-none transition focus:border-[#515792] focus:ring-4 focus:ring-[#515792]/15"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#515792]/40" aria-label="Effacer la recherche">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                <datalist id="not-found-search-suggestions">
                  {SEARCH_SUGGESTIONS.map((suggestion) => <option key={suggestion} value={suggestion} />)}
                </datalist>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Suggestions de recherche">
                <span className="mr-1 text-xs text-slate-500">Suggestions :</span>
                {visibleSuggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => setSearchQuery(suggestion)} className="rounded-full bg-[#515792]/8 px-2.5 py-1 text-xs font-semibold text-[#515792] ring-1 ring-inset ring-[#515792]/15 transition hover:bg-[#515792] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#515792]/40">
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-2xl bg-[#515792] p-6 text-white shadow-[0_18px_45px_-30px_rgba(34,40,84,0.55)] sm:p-7" aria-label="Retour au portail">
            <Compass className="h-9 w-9 text-white" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold">Retrouver son chemin</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">La page d’accueil présente le projet, le parcours et les accès utiles pour contribuer à la réflexion.</p>
            <Link href="/" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E07428] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c95f18] focus:outline-none focus:ring-4 focus:ring-white/30">
              <Home className="h-4 w-4" aria-hidden="true" />
              Revenir à l’accueil
            </Link>
          </aside>
        </div>

        {normalizedQuery && (
          <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="not-found-results">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="not-found-results" className="text-xl font-bold text-slate-900">Résultats dans les ressources</h2>
              <span className="text-sm text-slate-500" aria-live="polite">
                {matchingResources.length === 0 ? "Aucun résultat" : `${matchingResources.length} résultat${matchingResources.length > 1 ? "s" : ""} affiché${matchingResources.length > 1 ? "s" : ""}`}
              </span>
            </div>

            {matchingResources.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {matchingResources.map((resource) => {
                  const content = (
                    <>
                      <span className="text-xs font-bold uppercase tracking-wide" style={{ color: resource.couleur }}>{resource.type}</span>
                      <h3 className="mt-1 font-bold leading-snug text-slate-900">{resource.titre}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{resource.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold" style={{ color: resource.couleur }}>
                        {resource.interne ? "Lire le document" : "Ouvrir la source"}
                        {resource.interne ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : <ExternalLink className="h-4 w-4" aria-hidden="true" />}
                      </span>
                    </>
                  );

                  return resource.interne ? (
                    <Link key={resource.href} href={resource.href} className="rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-[#515792]/35 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#515792]/40">{content}</Link>
                  ) : (
                    <a key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-[#515792]/35 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#515792]/40">{content}</a>
                  );
                })}
              </div>
            ) : (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">Aucun document ne correspond à ces termes. Vous pouvez parcourir l’ensemble des ressources ou essayer une suggestion ci-dessus.</p>
            )}

            <Link href="/ressources" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#515792] underline decoration-[#515792]/30 underline-offset-4 transition hover:decoration-[#515792]">
              Voir tous les documents et sources <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        )}

        <section className="mt-10" aria-labelledby="not-found-shortcuts">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#515792]">Accès directs</p>
              <h2 id="not-found-shortcuts" className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Explorer le portail</h2>
            </div>
            <BookOpen className="mb-1 h-7 w-7 text-[#3aab8a]" aria-hidden="true" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#515792]/40">
                <span className="block text-xs font-bold uppercase tracking-wide" style={{ color: link.color }}>{link.label}</span>
                <span className="mt-2 block text-sm leading-relaxed text-slate-600">{link.description}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-slate-900 transition group-hover:gap-2">Ouvrir <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
