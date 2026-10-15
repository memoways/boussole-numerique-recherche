import { hasPartnerApi, PARTNER_API_URL } from "./partnerApi";

export type Atelier = {
  id: string;
  slug: string;
  titre: string;
  statut: "Publié" | "Complet";
  dateDebut: string;
  dateFin: string | null;
  avecHoraires: boolean;
  lieu: string;
  adresse: string;
  organisateur: string;
  objectifs: string;
  programme: string;
  infosPratiques: string;
  type: string | null;
  publics: string[];
  capacite: number;
  placesRestantes: number;
  dateLimiteInscription: string | null;
  inscriptionsOuvertes: boolean;
};

export type InscriptionPayload = {
  prenom: string;
  nom: string;
  email: string;
  structure: string;
  remarque?: string;
  consentement: true;
  website: string;
};

/** Issues possibles d’une inscription ; `unavailable` couvre toute erreur technique (message générique). */
export type InscriptionFailure = "duplicate" | "full" | "closed" | "not_found" | "invalid" | "rate_limited" | "unavailable";
export type InscriptionResult = { ok: true } | { ok: false; reason: InscriptionFailure };

export const ateliersAvailable = hasPartnerApi;

export async function fetchAteliers(signal?: AbortSignal): Promise<Atelier[]> {
  if (!hasPartnerApi()) throw new Error("ateliers-unavailable");
  const response = await fetch(`${PARTNER_API_URL}/api/ateliers`, { signal });
  if (!response.ok) throw new Error("ateliers-unavailable");
  const payload = await response.json() as { ateliers?: Atelier[] };
  return Array.isArray(payload.ateliers) ? payload.ateliers : [];
}

export async function registerForAtelier(atelierId: string, payload: InscriptionPayload): Promise<InscriptionResult> {
  if (!hasPartnerApi()) return { ok: false, reason: "unavailable" };
  try {
    const response = await fetch(`${PARTNER_API_URL}/api/ateliers/${encodeURIComponent(atelierId)}/inscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { ok: true };
    if (response.status === 429) return { ok: false, reason: "rate_limited" };
    const body = await response.json().catch(() => ({})) as { code?: string };
    const known: InscriptionFailure[] = ["duplicate", "full", "closed", "not_found", "invalid"];
    return { ok: false, reason: known.find((reason) => reason === body.code) ?? "unavailable" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

const ZURICH = "Europe/Zurich";

/** Une date sans heure est lue à midi UTC pour ne jamais changer de jour en fuseau Zurich. */
const toDate = (value: string) => new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value);

const dayFormat = new Intl.DateTimeFormat("fr-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: ZURICH });
const timeFormat = new Intl.DateTimeFormat("fr-CH", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: ZURICH });
const dayKey = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: ZURICH });

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/** « Jeudi 12 novembre 2026, 18:00 – 20:30 » (fr-CH, heure de Genève). */
export function formatAtelierDate(atelier: Pick<Atelier, "dateDebut" | "dateFin" | "avecHoraires">): string {
  const start = toDate(atelier.dateDebut);
  const end = atelier.dateFin ? toDate(atelier.dateFin) : null;
  const startDay = capitalize(dayFormat.format(start));
  const sameDay = !end || dayKey.format(end) === dayKey.format(start);
  if (!atelier.avecHoraires) return sameDay ? startDay : `${startDay} au ${dayFormat.format(end!)}`;
  if (!end) return `${startDay}, ${timeFormat.format(start)}`;
  if (sameDay) return `${startDay}, ${timeFormat.format(start)} – ${timeFormat.format(end)}`;
  return `${startDay}, ${timeFormat.format(start)} – ${dayFormat.format(end)}, ${timeFormat.format(end)}`;
}

export function formatDeadline(value: string): string {
  const date = toDate(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? dayFormat.format(date) : `${dayFormat.format(date)}, ${timeFormat.format(date)}`;
}
