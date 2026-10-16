import { useCallback, useEffect, useState } from "react";
import { ArrowRight, CalendarDays, CircleAlert, Clock, MapPin, RefreshCw, Users } from "lucide-react";
import { Link } from "wouter";
import InscriptionDialog from "@/components/ateliers/InscriptionDialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAteliers, formatAtelierDate, formatDeadline, type Atelier } from "@/lib/ateliersApi";

/**
 * Liste des ateliers à venir, lus dans Notion par l’API, avec inscription en ligne.
 * Les ateliers publiés restent éditables dans Notion ; le site ne stocke rien d’autre.
 * Chaque carte montre d’abord à qui l’atelier s’adresse et les informations pratiques, sans clic,
 * puis les objectifs et le programme en puces.
 */

const TYPE_COLORS: Record<string, string> = {
  "Co-conception": "#515792",
  "Découverte": "#3aab8a",
  "Formation": "#3a7fc1",
};

/** Libellés d’affichage des publics (la base Notion porte les valeurs au singulier, l’une avec une faute). */
const PUBLIC_LABELS: Record<string, string> = {
  "Professionel du cinéma": "Professionnel·les du cinéma",
  "Professionnel du cinéma": "Professionnel·les du cinéma",
  "Partenaire culturel": "Partenaires culturels",
  "Artiste": "Artistes",
};

const primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#E07428] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c9651f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07428]";

const placesLabel = (places: number) => (places === 1 ? "1 place restante" : `${places} places restantes`);

/** Un texte Notion devient une liste : une ligne par puce, ou une phrase par puce quand le texte tient en un bloc. */
export function toBullets(text: string): string[] {
  return text
    .split(/\n+/)
    .flatMap((line) => line.trim().split(/(?<=[.!?])\s+(?=[A-ZÀ-ÖØ-Þ])/))
    .map((item) => item.replace(/^[-•–*]\s*/, "").trim())
    .filter(Boolean);
}

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AtelierCard({ atelier, targeted, onChanged }: { atelier: Atelier; targeted: boolean; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const color = (atelier.type && TYPE_COLORS[atelier.type]) || "#515792";
  const complet = atelier.statut === "Complet" || atelier.placesRestantes <= 0;
  const titleId = `atelier-${atelier.slug}-titre`;
  const publics = atelier.publics.map((value) => PUBLIC_LABELS[value] ?? value);
  const infos = toBullets(atelier.infosPratiques);
  const objectifs = toBullets(atelier.objectifs);
  const programme = toBullets(atelier.programme);

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

      {publics.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-900">
            <Users className="h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
            À qui s’adresse cet atelier
          </p>
          <ul className="flex flex-wrap gap-2">
            {publics.map((label) => (
              <li key={label} className="rounded-full border px-3 py-1 text-sm font-semibold text-slate-900" style={{ borderColor: `${color}66`, backgroundColor: `${color}12` }}>{label}</li>
            ))}
          </ul>
        </div>
      )}

      <section aria-label="Informations pratiques" className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <h4 className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-700">Informations pratiques</h4>
        <dl className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
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
        </dl>
        {infos.length > 0 && <Bullets items={infos} color={color} />}

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
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {objectifs.length > 0 && (
          <section aria-label="Objectifs">
            <h4 className="text-base font-bold text-slate-950">Objectifs</h4>
            <Bullets items={objectifs} color={color} />
          </section>
        )}
        {programme.length > 0 && (
          <section aria-label="Programme">
            <h4 className="text-base font-bold text-slate-950">Programme</h4>
            <Bullets items={programme} color={color} />
          </section>
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

export default function AteliersList() {
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

  // Ancre /participer#slug : les cartes arrivent après le chargement, le défilement attend donc la liste.
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

  if (failed) {
    return (
      <div role="alert" className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-3 font-semibold"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />Les ateliers ne peuvent pas être affichés pour le moment.</p>
        <button type="button" onClick={() => void load(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-5 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />Réessayer
        </button>
      </div>
    );
  }
  if (ateliers === null) return <LoadingState />;
  if (ateliers.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900">Dates en cours de confirmation</h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">Aucun atelier n’est ouvert aux inscriptions pour l’instant. Les prochaines dates seront publiées ici dès qu’elles seront confirmées.</p>
        <Link href="/partenaires" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#515792] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#515792]">
          Découvrir le rôle des partenaires <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      {ateliers.map((atelier) => (
        <AtelierCard key={atelier.id} atelier={atelier} targeted={targetSlug === atelier.slug} onChanged={() => void load(true)} />
      ))}
    </div>
  );
}
