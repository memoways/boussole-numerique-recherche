/**
 * Ateliers Boussole : liste publique et inscriptions, stockées uniquement dans Notion.
 * Les deux bases (« Ateliers Boussole » et « Inscriptions ateliers Boussole ») sont lues et écrites par
 * l’intégration « Boussole démo » via les endpoints data sources de l’API Notion récente. Aucun e-mail n’est
 * envoyé, aucune donnée personnelle ne quitte l’API : la liste publique ne contient que des champs d’atelier.
 */
import { z } from "zod";

export const NOTION_ATELIERS_VERSION = "2025-09-03";
export const DEFAULT_CAPACITY = 15;
export const CACHE_TTL_MS = 5 * 60 * 1000;
export const ZURICH_TIME_ZONE = "Europe/Zurich";
const MAX_PAGES = 20;

export const inscriptionSchema = z.object({
  prenom: z.string().trim().min(1).max(100),
  nom: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().max(320).email(),
  structure: z.string().trim().min(1).max(200),
  remarque: z.string().trim().max(1000).optional(),
  consentement: z.literal(true),
  website: z.string().max(500).optional(),
});

export type InscriptionInput = z.infer<typeof inscriptionSchema>;

export type AtelierPublic = {
  id: string;
  slug: string;
  titre: string;
  statut: "Publié" | "Complet";
  /** Instant ISO (UTC) pour un horaire précis, `AAAA-MM-JJ` pour une date sans heure. */
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

export type AteliersFailure = "not_found" | "closed" | "full" | "duplicate";

export class AteliersError extends Error {
  constructor(readonly reason: AteliersFailure) {
    super(`Atelier registration refused (${reason})`);
  }
}

export class NotionApiError extends Error {
  constructor(readonly status: number, readonly notionCode: string) {
    super(`Notion request failed (${status} ${notionCode})`);
  }
}

export type AteliersConfig = {
  token: string;
  ateliersDataSourceId: string;
  inscriptionsDataSourceId: string;
};

type NotionRichText = Array<{ plain_text?: string }>;
type NotionDate = { start: string; end?: string | null; time_zone?: string | null } | null;
type NotionPage = { id: string; properties: Record<string, any> };

type RegistrationRow = { atelierId: string; email: string };

type Snapshot = { pages: NotionPage[]; registrations: RegistrationRow[] };

export const normalizeId = (id: string) => id.replaceAll("-", "").toLowerCase();

const richText = (property: { rich_text?: NotionRichText } | undefined) =>
  (property?.rich_text ?? []).map((part) => part.plain_text ?? "").join("").trim();

const titleText = (property: { title?: NotionRichText } | undefined) =>
  (property?.title ?? []).map((part) => part.plain_text ?? "").join("").trim();

const zurichParts = (instant: Date, timeZone = ZURICH_TIME_ZONE) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instant);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? "0");
  return { year: value("year"), month: value("month"), day: value("day"), hour: value("hour"), minute: value("minute"), second: value("second") };
};

/** `AAAA-MM-JJ` en heure de Zurich (même fuseau que Genève). */
export function zurichDay(instant: Date): string {
  const { year, month, day } = zurichParts(instant);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Convertit une heure locale sans décalage (`AAAA-MM-JJTHH:mm:ss`) en instant UTC, pour un fuseau IANA. */
export function wallClockToInstant(local: string, timeZone = ZURICH_TIME_ZONE): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(local);
  if (!match) return new Date(Number.NaN);
  const [, year, month, day, hour, minute, second] = match;
  const asUtc = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second ?? 0));
  // Deux passes suffisent pour absorber un changement d’heure proche de la valeur.
  let instant = asUtc;
  for (let pass = 0; pass < 2; pass += 1) {
    const shown = zurichParts(new Date(instant), timeZone);
    const shownAsUtc = Date.UTC(shown.year, shown.month - 1, shown.day, shown.hour, shown.minute, shown.second);
    instant += asUtc - shownAsUtc;
  }
  return new Date(instant);
}

const hasOffset = (value: string) => /(?:Z|[+-]\d{2}:?\d{2})$/i.test(value);
const isDateOnly = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

/** Date Notion → instant ISO (UTC) ou date seule ; `null` si la valeur est illisible. */
function normalizeNotionDate(value: string | null | undefined, timeZone?: string | null): { iso: string; dateOnly: boolean } | null {
  if (!value) return null;
  if (isDateOnly(value)) return { iso: value, dateOnly: true };
  const instant = hasOffset(value) ? new Date(value) : wallClockToInstant(value, timeZone || ZURICH_TIME_ZONE);
  if (Number.isNaN(instant.getTime())) return null;
  return { iso: instant.toISOString(), dateOnly: false };
}

const dayOf = (normalized: { iso: string; dateOnly: boolean }) =>
  normalized.dateOnly ? normalized.iso : zurichDay(new Date(normalized.iso));

const slugify = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

/** Inscriptions ouvertes : atelier « Publié », pas commencé, avant la date limite, avec des places. */
function isRegistrationOpen(input: { statut: string; start: { iso: string; dateOnly: boolean }; deadline: { iso: string; dateOnly: boolean } | null; placesRestantes: number; now: Date }): boolean {
  if (input.statut !== "Publié" || input.placesRestantes <= 0) return false;
  if (!input.start.dateOnly && new Date(input.start.iso).getTime() <= input.now.getTime()) return false;
  if (input.deadline) {
    if (input.deadline.dateOnly) {
      if (zurichDay(input.now) > input.deadline.iso) return false;
    } else if (new Date(input.deadline.iso).getTime() < input.now.getTime()) {
      return false;
    }
  }
  return true;
}

/** Page Notion → atelier public. `null` si l’atelier ne doit pas apparaître (statut, date absente ou passée). */
export function normalizeAtelier(page: NotionPage, activeRegistrations: number, now: Date): AtelierPublic | null {
  const properties = page.properties;
  const statut = properties["Statut"]?.select?.name;
  if (statut !== "Publié" && statut !== "Complet") return null;

  const dateProperty: NotionDate = properties["Date"]?.date ?? null;
  const start = normalizeNotionDate(dateProperty?.start, dateProperty?.time_zone);
  if (!dateProperty || !start) return null;
  if (dayOf(start) < zurichDay(now)) return null;
  const end = normalizeNotionDate(dateProperty.end, dateProperty.time_zone);

  const deadlineProperty: NotionDate = properties["Date limite d'inscription"]?.date ?? null;
  const deadline = normalizeNotionDate(deadlineProperty?.start, deadlineProperty?.time_zone);

  const rawCapacity = properties["Capacité"]?.number;
  const capacite = typeof rawCapacity === "number" && rawCapacity > 0 ? Math.floor(rawCapacity) : DEFAULT_CAPACITY;
  const placesRestantes = Math.max(0, capacite - activeRegistrations);
  const titre = titleText(properties["Titre"]);

  return {
    id: page.id,
    slug: richText(properties["Slug"]) || slugify(titre) || normalizeId(page.id),
    titre,
    statut,
    dateDebut: start.iso,
    dateFin: end?.iso ?? null,
    avecHoraires: !start.dateOnly,
    lieu: richText(properties["Lieu"]),
    adresse: richText(properties["Adresse"]),
    organisateur: richText(properties["Organisateur"]),
    objectifs: richText(properties["Objectifs"]),
    programme: richText(properties["Programme"]),
    infosPratiques: richText(properties["Infos pratiques"]),
    type: properties["Type d'atelier"]?.select?.name ?? null,
    publics: (properties["Public cible"]?.multi_select ?? []).map((option: { name: string }) => option.name),
    capacite,
    placesRestantes,
    dateLimiteInscription: deadline?.iso ?? null,
    inscriptionsOuvertes: isRegistrationOpen({ statut, start, deadline, placesRestantes, now }),
  };
}

export function buildInscriptionPage(input: Omit<InscriptionInput, "consentement" | "website">, atelierId: string, inscriptionsDataSourceId: string) {
  const text = (content: string) => [{ text: { content } }];
  const properties: Record<string, unknown> = {
    "Nom complet": { title: text(`${input.prenom} ${input.nom}`) },
    "Prénom": { rich_text: text(input.prenom) },
    "Nom": { rich_text: text(input.nom) },
    "Structure": { rich_text: text(input.structure) },
    "Email": { email: input.email },
    "Statut": { select: { name: "Inscrit" } },
    "Consentement": { checkbox: true },
    "Atelier": { relation: [{ id: atelierId }] },
  };
  if (input.remarque) properties["Remarque"] = { rich_text: text(input.remarque) };
  return { parent: { type: "data_source_id", data_source_id: inscriptionsDataSourceId }, properties };
}

async function notionRequest<T>(token: string, path: string, body: unknown): Promise<T> {
  const response = await fetch(`https://api.notion.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_ATELIERS_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    // Seuls le statut et le code d’erreur sont conservés : le message Notion peut citer des valeurs saisies.
    const payload = await response.json().catch(() => ({})) as { code?: string };
    throw new NotionApiError(response.status, payload.code ?? "unknown");
  }
  return await response.json() as T;
}

async function queryAll(config: AteliersConfig, dataSourceId: string, query: Record<string, unknown>): Promise<NotionPage[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  for (let index = 0; index < MAX_PAGES; index += 1) {
    const result = await notionRequest<{ results: NotionPage[]; has_more: boolean; next_cursor: string | null }>(
      config.token,
      `/v1/data_sources/${dataSourceId}/query`,
      { ...query, page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) },
    );
    pages.push(...result.results);
    if (!result.has_more || !result.next_cursor) return pages;
    cursor = result.next_cursor;
  }
  return pages;
}

export function createAteliersService(config: AteliersConfig, options: { now?: () => Date } = {}) {
  const now = options.now ?? (() => new Date());
  let cache: { expiresAt: number; ateliers: AtelierPublic[] } | null = null;
  const locks = new Map<string, Promise<unknown>>();

  async function loadSnapshot(): Promise<Snapshot> {
    const today = zurichDay(now());
    const [pages, inscriptionPages] = await Promise.all([
      queryAll(config, config.ateliersDataSourceId, {
        filter: {
          and: [
            { or: [{ property: "Statut", select: { equals: "Publié" } }, { property: "Statut", select: { equals: "Complet" } }] },
            { property: "Date", date: { on_or_after: today } },
          ],
        },
        sorts: [{ property: "Date", direction: "ascending" }],
      }),
      queryAll(config, config.inscriptionsDataSourceId, {
        filter: { property: "Statut", select: { does_not_equal: "Annulé" } },
      }),
    ]);
    const registrations = inscriptionPages.flatMap((page): RegistrationRow[] => {
      const atelierId = page.properties["Atelier"]?.relation?.[0]?.id;
      if (!atelierId) return [];
      return [{ atelierId: normalizeId(atelierId), email: String(page.properties["Email"]?.email ?? "").trim().toLowerCase() }];
    });
    return { pages, registrations };
  }

  function toAteliers(snapshot: Snapshot): AtelierPublic[] {
    const counts = new Map<string, number>();
    for (const row of snapshot.registrations) counts.set(row.atelierId, (counts.get(row.atelierId) ?? 0) + 1);
    const current = now();
    return snapshot.pages
      .map((page) => normalizeAtelier(page, counts.get(normalizeId(page.id)) ?? 0, current))
      .filter((atelier): atelier is AtelierPublic => atelier !== null)
      .sort((left, right) => left.dateDebut.localeCompare(right.dateDebut));
  }

  async function list(): Promise<AtelierPublic[]> {
    if (cache && cache.expiresAt > Date.now()) return cache.ateliers;
    const ateliers = toAteliers(await loadSnapshot());
    cache = { expiresAt: Date.now() + CACHE_TTL_MS, ateliers };
    return ateliers;
  }

  /** Un seul traitement à la fois par atelier : évite de dépasser la capacité avec deux demandes simultanées. */
  async function withLock<T>(key: string, task: () => Promise<T>): Promise<T> {
    const previous = locks.get(key) ?? Promise.resolve();
    const run = previous.catch(() => undefined).then(task);
    locks.set(key, run);
    try {
      return await run;
    } finally {
      if (locks.get(key) === run) locks.delete(key);
    }
  }

  async function register(atelierId: string, input: Omit<InscriptionInput, "website">): Promise<{ placesRestantes: number }> {
    const key = normalizeId(atelierId);
    return withLock(key, async () => {
      // Relecture complète, sans cache : l’ouverture et les places sont revérifiées côté serveur.
      const snapshot = await loadSnapshot();
      const atelier = toAteliers(snapshot).find((candidate) => normalizeId(candidate.id) === key);
      if (!atelier) throw new AteliersError("not_found");
      const alreadyRegistered = snapshot.registrations.some((row) => row.atelierId === key && row.email === input.email);
      if (alreadyRegistered) throw new AteliersError("duplicate");
      if (!atelier.inscriptionsOuvertes) throw new AteliersError(atelier.statut === "Complet" || atelier.placesRestantes <= 0 ? "full" : "closed");

      const { consentement: _consent, ...fields } = input;
      await notionRequest(config.token, "/v1/pages", buildInscriptionPage(fields, atelier.id, config.inscriptionsDataSourceId));
      cache = null;
      return { placesRestantes: Math.max(0, atelier.placesRestantes - 1) };
    });
  }

  return { list, register, invalidate: () => { cache = null; } };
}

export type AteliersService = ReturnType<typeof createAteliersService>;

const ID_PATTERN = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
export const isAtelierId = (value: string) => ID_PATTERN.test(value);
