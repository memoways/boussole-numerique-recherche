import assert from "node:assert/strict";
import {
  buildNotionFeedbackPage,
  COMMENT_MAX_LENGTH,
  createNotionPage,
  demoFeedbackSchema,
  formatZurichTimestamp,
  NOTION_TEXT_LIMIT,
  NotionWriteError,
  splitComment,
} from "../src/demo-feedback.js";

const DATABASE_ID = "db-test";
type RichText = Array<{ text: { content: string } }>;
const richText = (page: ReturnType<typeof buildNotionFeedbackPage>) => (page.properties.Commentaire as { rich_text: RichText }).rich_text;

// Titre : heure de Zurich (été UTC+2, hiver UTC+1).
assert.equal(formatZurichTimestamp(new Date("2026-10-14T12:05:00Z")), "2026-10-14 14:05");
assert.equal(formatZurichTimestamp(new Date("2026-12-01T08:30:00Z")), "2026-12-01 09:30");

// Mapping des personas et des modes, statut initial.
const base = { comment: "Très clair.", now: new Date("2026-10-14T12:05:00Z") };
const cinema = buildNotionFeedbackPage({ ...base, persona: "cinema", mode: "texte" }, DATABASE_ID);
assert.deepEqual(cinema.parent, { database_id: DATABASE_ID });
assert.deepEqual(cinema.properties.Retour, { title: [{ text: { content: "2026-10-14 14:05 — Cinéma" } }] });
assert.deepEqual(cinema.properties.Persona, { select: { name: "Cinéma" } });
assert.deepEqual(cinema.properties.Mode, { select: { name: "Texte" } });
assert.deepEqual(cinema.properties.Suivi, { status: { name: "Nouveau" } });
assert.deepEqual(buildNotionFeedbackPage({ ...base, persona: "scene", mode: "voix" }, DATABASE_ID).properties.Persona, { select: { name: "Scène" } });
assert.deepEqual(buildNotionFeedbackPage({ ...base, persona: "scene", mode: "voix" }, DATABASE_ID).properties.Mode, { select: { name: "Voix" } });
assert.deepEqual(buildNotionFeedbackPage({ ...base, persona: "arts-visuels", mode: "texte" }, DATABASE_ID).properties.Persona, { select: { name: "Arts visuels" } });

// E-mail : conservé seulement s’il est valide.
assert.equal("E-mail" in cinema.properties, false);
assert.equal("E-mail" in buildNotionFeedbackPage({ ...base, persona: "cinema", mode: "texte", email: "pas-un-email" }, DATABASE_ID).properties, false);
assert.equal("E-mail" in buildNotionFeedbackPage({ ...base, persona: "cinema", mode: "texte", email: "   " }, DATABASE_ID).properties, false);
assert.deepEqual(buildNotionFeedbackPage({ ...base, persona: "cinema", mode: "texte", email: " claire@example.org " }, DATABASE_ID).properties["E-mail"], { email: "claire@example.org" });

// Découpage en segments de 2000 caractères, plafond de 5000.
assert.deepEqual(splitComment("court"), ["court"]);
assert.deepEqual(splitComment("a".repeat(NOTION_TEXT_LIMIT)).map((segment) => segment.length), [2000]);
assert.deepEqual(splitComment("a".repeat(4500)).map((segment) => segment.length), [2000, 2000, 500]);
assert.deepEqual(splitComment("a".repeat(9000)).map((segment) => segment.length), [2000, 2000, 1000]);
const long = buildNotionFeedbackPage({ ...base, persona: "cinema", mode: "texte", comment: "b".repeat(COMMENT_MAX_LENGTH) }, DATABASE_ID);
assert.equal(richText(long).length, 3);
assert.equal(richText(long).map((item) => item.text.content).join("").length, COMMENT_MAX_LENGTH);

// Validation de la requête : persona, mode et commentaire (1 à 5000 caractères).
const valid = { persona: "cinema", mode: "texte", comment: " Merci ", website: "" };
assert.equal(demoFeedbackSchema.parse(valid).comment, "Merci");
assert.equal(demoFeedbackSchema.safeParse({ ...valid, persona: "autre" }).success, false);
assert.equal(demoFeedbackSchema.safeParse({ ...valid, mode: "audio" }).success, false);
assert.equal(demoFeedbackSchema.safeParse({ ...valid, comment: "   " }).success, false);
assert.equal(demoFeedbackSchema.safeParse({ ...valid, comment: "c".repeat(COMMENT_MAX_LENGTH + 1) }).success, false);
assert.equal(demoFeedbackSchema.safeParse({ ...valid, email: "invalide" }).success, true);

// Appel Notion (fetch simulé) : URL, version d’API, jeton en en-tête, corps JSON ; une erreur HTTP devient NotionWriteError.
const realFetch = globalThis.fetch;
try {
  let captured: { url: string; init: RequestInit } | undefined;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    captured = { url: String(url), init: init ?? {} };
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  await createNotionPage("secret-test", cinema);
  assert.equal(captured?.url, "https://api.notion.com/v1/pages");
  assert.equal(captured?.init.method, "POST");
  const headers = captured?.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer secret-test");
  assert.equal(headers["Notion-Version"], "2022-06-28");
  assert.deepEqual(JSON.parse(String(captured?.init.body)), JSON.parse(JSON.stringify(cinema)));

  globalThis.fetch = (async () => new Response("{}", { status: 400 })) as typeof fetch;
  await assert.rejects(createNotionPage("secret-test", cinema), (error: unknown) => error instanceof NotionWriteError && error.status === 400 && !error.message.includes("secret-test"));
} finally {
  globalThis.fetch = realFetch;
}

console.log("Avis démo vérifié : titre, mapping, e-mail, découpage, validation et appel Notion.");
