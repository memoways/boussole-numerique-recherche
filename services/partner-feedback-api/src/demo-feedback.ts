/**
 * Avis final de la démo « playback » : seul envoi réel du parcours.
 * Les avis sont écrits dans la base Notion « Retours démo Boussole » et jamais dans PostgreSQL.
 */
import { z } from "zod";

export const DEMO_PERSONAS = ["cinema", "scene", "arts-visuels"] as const;
export type DemoPersona = (typeof DEMO_PERSONAS)[number];
export type DemoFeedbackMode = "texte" | "voix";

export const PERSONA_LABELS: Record<DemoPersona, string> = {
  cinema: "Cinéma",
  scene: "Scène",
  "arts-visuels": "Arts visuels",
};

const MODE_LABELS: Record<DemoFeedbackMode, string> = { texte: "Texte", voix: "Voix" };

/** Limite d’un segment `rich_text` de l’API Notion. */
export const NOTION_TEXT_LIMIT = 2000;
/** Plafond total accepté pour un commentaire. */
export const COMMENT_MAX_LENGTH = 5000;

export const demoFeedbackSchema = z.object({
  persona: z.enum(DEMO_PERSONAS),
  mode: z.enum(["texte", "voix"]),
  comment: z.string().trim().min(1).max(COMMENT_MAX_LENGTH),
  email: z.string().trim().max(320).optional(),
  website: z.string().max(500).optional(),
});

export type DemoFeedbackInput = z.infer<typeof demoFeedbackSchema>;

const emailSchema = z.string().email();

export function splitComment(comment: string, size = NOTION_TEXT_LIMIT, maxLength = COMMENT_MAX_LENGTH): string[] {
  const text = comment.trim().slice(0, maxLength);
  const segments: string[] = [];
  for (let index = 0; index < text.length; index += size) segments.push(text.slice(index, index + size));
  return segments;
}

/** `AAAA-MM-JJ HH:mm` en heure de Zurich (même fuseau que Genève). */
export function formatZurichTimestamp(date: Date): string {
  const parts = new Intl.DateTimeFormat("fr-CH", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")} ${value("hour")}:${value("minute")}`;
}

export function buildNotionFeedbackPage(input: {
  persona: DemoPersona;
  mode: DemoFeedbackMode;
  comment: string;
  email?: string;
  now?: Date;
}, databaseId: string) {
  const personaLabel = PERSONA_LABELS[input.persona];
  const email = input.email?.trim();
  const properties: Record<string, unknown> = {
    Retour: { title: [{ text: { content: `${formatZurichTimestamp(input.now ?? new Date())} — ${personaLabel}` } }] },
    Commentaire: { rich_text: splitComment(input.comment).map((content) => ({ text: { content } })) },
    Persona: { select: { name: personaLabel } },
    Mode: { select: { name: MODE_LABELS[input.mode] } },
    Suivi: { status: { name: "Nouveau" } },
  };
  if (email && emailSchema.safeParse(email).success) properties["E-mail"] = { email };
  return { parent: { database_id: databaseId }, properties };
}

export class NotionWriteError extends Error {
  constructor(readonly status: number) {
    super(`Notion page creation failed (${status})`);
  }
}

export async function createNotionPage(token: string, page: ReturnType<typeof buildNotionFeedbackPage>) {
  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(page),
  });
  if (!response.ok) throw new NotionWriteError(response.status);
}
