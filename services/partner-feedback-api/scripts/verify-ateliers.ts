import assert from "node:assert/strict";
import {
  AteliersError,
  buildInscriptionPage,
  createAteliersService,
  DEFAULT_CAPACITY,
  inscriptionSchema,
  isAtelierId,
  normalizeAtelier,
  wallClockToInstant,
  zurichDay,
} from "../src/ateliers.js";

const ATELIERS_DS = "ds-ateliers";
const INSCRIPTIONS_DS = "ds-inscriptions";
const NOW = new Date("2026-10-15T10:00:00Z"); // 12:00 à Zurich

const text = (content: string) => [{ plain_text: content }];
const atelierPage = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  properties: {
    Titre: { title: text("Atelier de test") },
    Statut: { select: { name: "Publié" } },
    Date: { date: { start: "2026-11-12T18:00:00.000+01:00", end: "2026-11-12T20:30:00.000+01:00", time_zone: null } },
    Lieu: { rich_text: text("Salle des Rois") },
    Adresse: { rich_text: text("Rue du Lac 1, Genève") },
    Organisateur: { rich_text: text("Memoways") },
    Objectifs: { rich_text: text("Co-construire") },
    Programme: { rich_text: text("18:00 accueil") },
    "Infos pratiques": { rich_text: text("Entrée libre") },
    "Type d'atelier": { select: { name: "Co-conception" } },
    "Public cible": { multi_select: [{ name: "Partenaire culturel" }, { name: "Artiste" }] },
    Capacité: { number: 3 },
    "Date limite d'inscription": { date: { start: "2026-11-10", end: null, time_zone: null } },
    Slug: { rich_text: text("co-conception-novembre") },
    ...overrides,
  },
});
const inscriptionPage = (atelierId: string, email: string) => ({
  id: `insc-${email}`,
  properties: { Atelier: { relation: [{ id: atelierId }] }, Email: { email }, Statut: { select: { name: "Inscrit" } } },
});

type Call = { url: string; body: any };

function mockNotion(data: { ateliers: any[]; inscriptions: any[] }, options: { failWith?: number } = {}) {
  const calls: Call[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ url, body });
    assert.equal((init?.headers as Record<string, string>)["Notion-Version"], "2025-09-03");
    assert.equal((init?.headers as Record<string, string>).Authorization, "Bearer secret-token");
    if (options.failWith) return new Response(JSON.stringify({ code: "internal_server_error", message: "Prénom Nom secret@example.org" }), { status: options.failWith });
    if (url.endsWith(`/v1/data_sources/${ATELIERS_DS}/query`)) return Response.json({ results: data.ateliers, has_more: false, next_cursor: null });
    if (url.endsWith(`/v1/data_sources/${INSCRIPTIONS_DS}/query`)) return Response.json({ results: data.inscriptions, has_more: false, next_cursor: null });
    if (url.endsWith("/v1/pages")) {
      data.inscriptions.push(inscriptionPage(body.properties.Atelier.relation[0].id, body.properties.Email.email));
      return Response.json({ id: "new-page" });
    }
    return new Response("{}", { status: 404 });
  }) as typeof fetch;
  return { calls, restore: () => { globalThis.fetch = realFetch; } };
}

const config = { token: "secret-token", ateliersDataSourceId: ATELIERS_DS, inscriptionsDataSourceId: INSCRIPTIONS_DS };
const person = { prenom: "Claire", nom: "Dupont", email: "claire@example.org", structure: "Théâtre X", consentement: true as const };

// Fuseau Zurich : heure d’été (UTC+2) et d’hiver (UTC+1), conversion d’heure locale sans décalage.
assert.equal(zurichDay(new Date("2026-10-15T22:30:00Z")), "2026-10-16");
assert.equal(zurichDay(new Date("2026-12-01T22:30:00Z")), "2026-12-01");
assert.equal(wallClockToInstant("2026-07-01T09:00:00.000", "Europe/Zurich").toISOString(), "2026-07-01T07:00:00.000Z");
assert.equal(wallClockToInstant("2026-12-01T09:00:00", "Europe/Zurich").toISOString(), "2026-12-01T08:00:00.000Z");

// Normalisation : champs publics, places restantes, ouverture.
const base = normalizeAtelier(atelierPage("a1"), 1, NOW)!;
assert.equal(base.titre, "Atelier de test");
assert.equal(base.slug, "co-conception-novembre");
assert.equal(base.dateDebut, "2026-11-12T17:00:00.000Z");
assert.equal(base.dateFin, "2026-11-12T19:30:00.000Z");
assert.equal(base.avecHoraires, true);
assert.equal(base.dateLimiteInscription, "2026-11-10");
assert.deepEqual(base.publics, ["Partenaire culturel", "Artiste"]);
assert.equal(base.capacite, 3);
assert.equal(base.placesRestantes, 2);
assert.equal(base.inscriptionsOuvertes, true);
assert.equal(normalizeAtelier(atelierPage("a1"), 3, NOW)!.placesRestantes, 0);
assert.equal(normalizeAtelier(atelierPage("a1"), 3, NOW)!.inscriptionsOuvertes, false);
assert.equal(normalizeAtelier(atelierPage("a1"), 9, NOW)!.placesRestantes, 0);
// Capacité vide : 15 par défaut ; slug de repli depuis le titre.
const noCapacity = normalizeAtelier(atelierPage("a1", { Capacité: { number: null }, Slug: { rich_text: [] } }), 0, NOW)!;
assert.equal(noCapacity.capacite, DEFAULT_CAPACITY);
assert.equal(noCapacity.placesRestantes, DEFAULT_CAPACITY);
assert.equal(noCapacity.slug, "atelier-de-test");
// Statuts non publics, date absente ou passée : masqués.
for (const statut of ["Brouillon", "Passé", "Annulé"]) assert.equal(normalizeAtelier(atelierPage("a1", { Statut: { select: { name: statut } } }), 0, NOW), null);
assert.equal(normalizeAtelier(atelierPage("a1", { Date: { date: null } }), 0, NOW), null);
assert.equal(normalizeAtelier(atelierPage("a1", { Date: { date: { start: "2026-10-14", end: null } } }), 0, NOW), null);
// « Complet » reste visible mais fermé. Date limite dépassée : fermé. Date limite du jour : ouvert jusqu’à minuit.
assert.equal(normalizeAtelier(atelierPage("a1", { Statut: { select: { name: "Complet" } } }), 0, NOW)!.inscriptionsOuvertes, false);
assert.equal(normalizeAtelier(atelierPage("a1"), 0, new Date("2026-11-11T09:00:00Z"))!.inscriptionsOuvertes, false);
assert.equal(normalizeAtelier(atelierPage("a1"), 0, new Date("2026-11-10T21:00:00Z"))!.inscriptionsOuvertes, true);
assert.equal(normalizeAtelier(atelierPage("a1"), 0, new Date("2026-11-10T23:30:00Z"))!.inscriptionsOuvertes, false);
// Atelier déjà commencé aujourd’hui : encore listé, inscriptions fermées.
assert.equal(normalizeAtelier(atelierPage("a1", { Date: { date: { start: "2026-10-15T09:00:00.000+02:00", end: null } } }), 0, NOW)!.inscriptionsOuvertes, false);
// Date avec fuseau sans décalage.
const zoned = normalizeAtelier(atelierPage("a1", { Date: { date: { start: "2026-11-12T18:00:00.000", end: null, time_zone: "Europe/Zurich" } } }), 0, NOW)!;
assert.equal(zoned.dateDebut, "2026-11-12T17:00:00.000Z");
// Date sans heure.
const dateOnly = normalizeAtelier(atelierPage("a1", { Date: { date: { start: "2026-11-12", end: null } } }), 0, NOW)!;
assert.equal(dateOnly.avecHoraires, false);
assert.equal(dateOnly.dateDebut, "2026-11-12");
// Aucune donnée personnelle ni champ interne dans la sortie publique.
assert.deepEqual(Object.keys(base).sort(), ["adresse", "capacite", "dateDebut", "dateFin", "dateLimiteInscription", "avecHoraires", "id", "inscriptionsOuvertes", "infosPratiques", "lieu", "objectifs", "organisateur", "placesRestantes", "programme", "publics", "slug", "statut", "titre", "type"].sort());

// Page d’inscription Notion.
const page = buildInscriptionPage({ prenom: "Claire", nom: "Dupont", email: "claire@example.org", structure: "Théâtre X", remarque: "Accès PMR" }, "a1", INSCRIPTIONS_DS);
assert.deepEqual(page.parent, { type: "data_source_id", data_source_id: INSCRIPTIONS_DS });
assert.deepEqual(page.properties["Nom complet"], { title: [{ text: { content: "Claire Dupont" } }] });
assert.deepEqual(page.properties["Statut"], { select: { name: "Inscrit" } });
assert.deepEqual(page.properties["Consentement"], { checkbox: true });
assert.deepEqual(page.properties["Atelier"], { relation: [{ id: "a1" }] });
assert.deepEqual(page.properties["Remarque"], { rich_text: [{ text: { content: "Accès PMR" } }] });
assert.equal("Remarque" in buildInscriptionPage({ prenom: "A", nom: "B", email: "a@b.ch", structure: "C" }, "a1", INSCRIPTIONS_DS).properties, false);

// Validation Zod.
const valid = { prenom: " Claire ", nom: "Dupont", email: " Claire@Example.ORG ", structure: "Théâtre X", consentement: true };
assert.equal(inscriptionSchema.parse(valid).email, "claire@example.org");
assert.equal(inscriptionSchema.parse(valid).prenom, "Claire");
for (const patch of [{ prenom: "  " }, { nom: "" }, { email: "pas-un-email" }, { structure: "" }, { consentement: false }, { consentement: undefined }, { remarque: "x".repeat(1001) }]) {
  assert.equal(inscriptionSchema.safeParse({ ...valid, ...patch }).success, false, JSON.stringify(patch));
}
assert.equal(inscriptionSchema.safeParse({ ...valid, remarque: "" }).success, true);
assert.equal(isAtelierId("070a5d73-0636-4c77-b3bc-8ba2ac05cd6c"), true);
assert.equal(isAtelierId("070a5d7306364c77b3bc8ba2ac05cd6c"), true);
assert.equal(isAtelierId("../pages"), false);

// Service : requêtes Notion (data sources, filtres), comptage hors annulées, cache de 5 minutes.
{
  const data = { ateliers: [atelierPage("11111111-1111-1111-1111-111111111111")], inscriptions: [inscriptionPage("11111111-1111-1111-1111-111111111111", "a@example.org"), inscriptionPage("11111111-1111-1111-1111-111111111111", "b@example.org")] };
  const notion = mockNotion(data);
  try {
    const service = createAteliersService(config, { now: () => NOW });
    const first = await service.list();
    assert.equal(first.length, 1);
    assert.equal(first[0].placesRestantes, 1);
    const ateliersQuery = notion.calls.find((call) => call.url.includes(`/data_sources/${ATELIERS_DS}/query`))!;
    assert.deepEqual(ateliersQuery.body.filter.and[1], { property: "Date", date: { on_or_after: "2026-10-15" } });
    assert.deepEqual(ateliersQuery.body.sorts, [{ property: "Date", direction: "ascending" }]);
    const inscriptionsQuery = notion.calls.find((call) => call.url.includes(`/data_sources/${INSCRIPTIONS_DS}/query`))!;
    assert.deepEqual(inscriptionsQuery.body.filter, { property: "Statut", select: { does_not_equal: "Annulé" } });
    const callsAfterFirst = notion.calls.length;
    await service.list();
    assert.equal(notion.calls.length, callsAfterFirst, "la seconde lecture vient du cache");

    // Inscription : créée, cache invalidé, places mises à jour.
    const result = await service.register("11111111-1111-1111-1111-111111111111", person);
    assert.equal(result.placesRestantes, 0);
    const created = notion.calls.find((call) => call.url.endsWith("/v1/pages"))!;
    assert.deepEqual(created.body.parent, { type: "data_source_id", data_source_id: INSCRIPTIONS_DS });
    assert.equal(created.body.properties.Email.email, "claire@example.org");
    const refreshed = await service.list();
    assert.equal(refreshed[0].placesRestantes, 0);
    assert.equal(refreshed[0].inscriptionsOuvertes, false);

    // Complet (pas de place) puis doublon : refus typés.
    await assert.rejects(() => service.register("11111111-1111-1111-1111-111111111111", { ...person, email: "autre@example.org" }), (error) => error instanceof AteliersError && error.reason === "full");
    await assert.rejects(() => service.register("11111111-1111-1111-1111-111111111111", person), (error) => error instanceof AteliersError && error.reason === "duplicate");
    await assert.rejects(() => service.register("22222222-2222-2222-2222-222222222222", person), (error) => error instanceof AteliersError && error.reason === "not_found");
  } finally {
    notion.restore();
  }
}

// Doublon insensible à la casse, hors inscriptions annulées (déjà exclues par le filtre Notion) ; inscriptions closes.
{
  const id = "33333333-3333-3333-3333-333333333333";
  const data = { ateliers: [atelierPage(id, { Capacité: { number: 10 } })], inscriptions: [inscriptionPage(id, "Claire@Example.org")] };
  const notion = mockNotion(data);
  try {
    const service = createAteliersService(config, { now: () => NOW });
    await assert.rejects(() => service.register(id, person), (error) => error instanceof AteliersError && error.reason === "duplicate");
    const closed = createAteliersService(config, { now: () => new Date("2026-11-11T09:00:00Z") });
    await assert.rejects(() => closed.register(id, { ...person, email: "nouveau@example.org" }), (error) => error instanceof AteliersError && error.reason === "closed");
    assert.equal(notion.calls.some((call) => call.url.endsWith("/v1/pages")), false, "aucune page créée en cas de refus");
  } finally {
    notion.restore();
  }
}

// Deux demandes simultanées pour la dernière place : une seule passe.
{
  const id = "44444444-4444-4444-4444-444444444444";
  const data = { ateliers: [atelierPage(id, { Capacité: { number: 1 } })], inscriptions: [] as any[] };
  const notion = mockNotion(data);
  try {
    const service = createAteliersService(config, { now: () => NOW });
    const outcomes = await Promise.allSettled([
      service.register(id, { ...person, email: "un@example.org" }),
      service.register(id, { ...person, email: "deux@example.org" }),
    ]);
    assert.equal(outcomes.filter((outcome) => outcome.status === "fulfilled").length, 1);
    assert.equal(notion.calls.filter((call) => call.url.endsWith("/v1/pages")).length, 1);
  } finally {
    notion.restore();
  }
}

// Erreur Notion : seuls le statut et le code sont portés par l’erreur (aucune valeur saisie).
{
  const notion = mockNotion({ ateliers: [], inscriptions: [] }, { failWith: 500 });
  try {
    const service = createAteliersService(config, { now: () => NOW });
    await assert.rejects(() => service.list(), (error) => error instanceof Error && error.message === "Notion request failed (500 internal_server_error)" && !error.message.includes("example.org"));
  } finally {
    notion.restore();
  }
}

console.log("Ateliers : normalisation, places, doublons, cache et erreurs vérifiés.");
