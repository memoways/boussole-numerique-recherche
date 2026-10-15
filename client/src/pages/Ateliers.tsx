import { useCallback, useEffect, useState } from "react";
import { ArrowRight, CalendarDays, ChevronDown, CircleAlert, Clock, MapPin, RefreshCw, Target, UserRound, Users } from "lucide-react";
import { Link } from "wouter";
import InscriptionDialog from "@/components/ateliers/InscriptionDialog";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAteliers, formatAtelierDate, formatDeadline, type Atelier } from "@/lib/ateliersApi";

/**
 * Page /ateliers — ateliers à venir lus dans Notion par l’API, avec inscription en ligne.
 * Les ateliers publiés restent éditables dans Notion ; le site ne stocke rien d’autre.
 */

const TYPE_COLORS: Record<string, string> = {
  "Co-conception": "#515792",
  "Découverte": "#3aab8a",
  "Formation": "#3a7fc1",
};

const primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#E07428] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c9651f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07428]";

const placesLabel = (places: number) => (places === 1 ? "1 place restante" : `${places} places restantes`);

function Expandable({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <Collapsible className="border-t border-slate-200">
      <CollapsibleTrigger className="group flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left text-sm font-bold text-[#515792] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#515792]">
        {label}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="whitespace-pre-line pb-4 text-sm leading-relaxed text-slate-700">{text}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

function AtelierCard({ atelier, targeted, onChanged }: { atelier: Atelier; targeted: boolean; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const color = (atelier.type && TYPE_COLORS[atelier.type]) || "#515792";
  const complet = atelier.statut === "Complet" || atelier.placesRestantes <= 0;
  const titleId = `atelier-${atelier.slug}-titre`;

  return (
    <article
      id={atelier.slug}
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`scroll-mt-24 rounded-2xl border border-slate-200 border-l-4 bg-white p-5 shadow-sm outline-none sm:p-7 ${targeted ? "ring-2 ring-[#515792]/40" : ""}`}
      style={{ borderLeftColor: color }}
    >
      <div className="flex flex-wrap items-center gap-2">
        {atelier.type && <Badge className="text-[11px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: color }}>{atelier.type}</Badge>}
        {complet && <Badge className="border-amber-300 bg-amber-100 text-xs font-bold text-amber-900">Complet</Badge>}
        {!complet && !atelier.inscriptionsOuvertes && <Badge className="border-slate-300 bg-slate-100 text-xs font-bold text-slate-800">Inscriptions closes</Badge>}
      </div>

      <h3 id={titleId} className="mt-3 text-xl font-extrabold leading-snug text-slate-950 sm:text-2xl">{atelier.titre}</h3>

      <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
          <div><dt className="sr-only">Date et horaires</dt><dd className="font-semibold text-slate-900">{formatAtelierDate(atelier)}</dd></div>
        </div>
        {(atelier.lieu || atelier.adresse) && (
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
            <div><dt className="sr-only">Lieu</dt><dd>{atelier.lieu && <span className="font-semibold text-slate-900">{atelier.lieu}</span>}{atelier.lieu && atelier.adresse && <br />}{atelier.adresse}</dd></div>
          </div>
        )}
        {atelier.publics.length > 0 && (
          <div className="flex items-start gap-2.5">
            <Users className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
            <div><dt className="sr-only">Public</dt><dd>{atelier.publics.join(" · ")}</dd></div>
          </div>
        )}
        {atelier.organisateur && (
          <div className="flex items-start gap-2.5">
            <UserRound className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
            <div><dt className="sr-only">Organisateur</dt><dd>{atelier.organisateur}</dd></div>
          </div>
        )}
      </dl>

      {atelier.objectifs && (
        <div className="mt-4 flex items-start gap-2.5 text-sm">
          <Target className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
          <div>
            <p className="font-bold text-slate-900">Objectifs</p>
            <p className="mt-0.5 whitespace-pre-line leading-relaxed text-slate-700">{atelier.objectifs}</p>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Expandable label="Programme" text={atelier.programme} />
        <Expandable label="Informations pratiques" text={atelier.infosPratiques} />
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm">
          <p className="inline-flex items-center gap-2 font-semibold text-slate-900">
            <Clock className="h-4 w-4" style={{ color }} aria-hidden="true" />
            {complet ? "Aucune place restante" : `${placesLabel(atelier.placesRestantes)} sur ${atelier.capacite}`}
          </p>
          {atelier.inscriptionsOuvertes && atelier.dateLimiteInscription && (
            <p className="text-slate-700">Inscriptions jusqu’au {formatDeadline(atelier.dateLimiteInscription)}.</p>
          )}
        </div>
        {atelier.inscriptionsOuvertes && (
          <button type="button" onClick={() => setOpen(true)} className={`${primaryButton} w-full sm:w-auto`}>
            S’inscrire<span className="sr-only"> à l’atelier {atelier.titre}</span>
          </button>
        )}
      </div>

      <InscriptionDialog atelier={atelier} open={open} onOpenChange={setOpen} onChanged={onChanged} />
    </article>
  );
}

function LoadingState() {
  return (
    <div role="status" aria-live="polite" className="space-y-5">
      <p className="sr-only">Chargement des ateliers…</p>
      {[0, 1].map((index) => (
        <div key={index} className="rounded-2xl border border-slate-200 bg-white p-7" aria-hidden="true">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="mt-4 h-7 w-3/4" />
          <Skeleton className="mt-5 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default function Ateliers() {
  const [ateliers, setAteliers] = useState<Atelier[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [targetSlug, setTargetSlug] = useState("");

  const load = useCallback(async (silent: boolean) => {
    if (!silent) { setAteliers(null); setFailed(false); }
    try {
      setAteliers(await fetchAteliers());
      setFailed(false);
    } catch {
      // Un rafraîchissement silencieux raté garde la liste affichée.
      if (!silent) setFailed(true);
    }
  }, []);

  useEffect(() => { void load(false); }, [load]);

  // Ancre /ateliers#slug : les cartes arrivent après le chargement, le défilement attend donc la liste.
  useEffect(() => {
    if (!ateliers) return;
    const goToHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      setTargetSlug(slug);
      if (!slug) return;
      const card = document.getElementById(slug);
      card?.scrollIntoView({ block: "start" });
      card?.focus({ preventScroll: true });
    };
    goToHash();
    window.addEventListener("hashchange", goToHash);
    return () => window.removeEventListener("hashchange", goToHash);
  }, [ateliers]);

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white px-4 pb-8 pt-10 sm:pb-10 sm:pt-16">
        <div className="mx-auto max-w-4xl">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: "#515792", color: "#fff" }}>Ateliers</Badge>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Ateliers de la Boussole</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Des rencontres pour co-concevoir la Boussole avec les partenaires culturels et les artistes. Les ateliers confirmés apparaissent ici ; l’inscription se fait en ligne, sans compte.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 pt-6 sm:pb-20" aria-labelledby="ateliers-liste-titre">
        <div className="mx-auto max-w-4xl">
          <h2 id="ateliers-liste-titre" className="mb-6 text-2xl font-bold text-gray-900">Prochains ateliers</h2>

          {failed ? (
            <div role="alert" className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-3 font-semibold"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />Les ateliers ne peuvent pas être affichés pour le moment.</p>
              <button type="button" onClick={() => void load(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-5 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />Réessayer
              </button>
            </div>
          ) : ateliers === null ? (
            <LoadingState />
          ) : ateliers.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900">Dates en cours de confirmation</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">Aucun atelier n’est ouvert aux inscriptions pour l’instant. Les prochaines dates seront publiées ici dès qu’elles seront confirmées.</p>
              <Link href="/partenaires" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#515792] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#515792]">
                Découvrir le rôle des partenaires <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {ateliers.map((atelier) => (
                <AtelierCard key={atelier.id} atelier={atelier} targeted={targetSlug === atelier.slug} onChanged={() => void load(true)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
