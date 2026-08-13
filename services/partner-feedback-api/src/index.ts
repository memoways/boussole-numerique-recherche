import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express, { type Request, type Response } from "express";
import helmet from "helmet";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";
import { getConfig } from "./config.js";
import { closePool, getPool } from "./db.js";
import { sendOptionalMail } from "./mail.js";
import { PARTNER_QUESTIONNAIRE_V1 } from "./questionnaire.js";
import { createResponseRecap } from "./response-recap.js";

const config = getConfig();
const app = express();
const tokenPepper = new TextEncoder().encode(config.INVITATION_TOKEN_PEPPER);
const adminSecret = new TextEncoder().encode(config.ADMIN_SESSION_SECRET);
const schemaPath = fileURLToPath(new URL("./schema.sql", import.meta.url));
const rateLimits = new Map<string, { count: number; resetAt: number }>();

type InvitationContext = {
  invitationId: string;
  invitationStatus: string;
  expiresAt: string;
  contactId: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationId: string;
  organizationName: string;
};

const requestSchema = z.object({
  organizationName: z.string().trim().min(2).max(200),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(320),
});

const answersSchema = z.object({
  consent: z.boolean(),
  answers: z.array(z.object({
    questionKey: z.string().min(1).max(100),
    value: z.unknown(),
    source: z.enum(["typed", "voice"]).default("typed"),
  })).max(40),
});

const organizationSchema = z.object({ name: z.string().trim().min(2).max(200), status: z.enum(["candidate", "confirmed", "archived"]).default("candidate"), notes: z.string().trim().max(3000).optional() });
const contactSchema = z.object({ organizationId: z.string().uuid(), firstName: z.string().trim().min(1).max(100), lastName: z.string().trim().min(1).max(100), email: z.string().trim().email(), roleLabel: z.string().trim().max(160).optional() });
const invitationSchema = z.object({ contactId: z.string().uuid(), expiresInDays: z.number().int().min(1).max(180).default(45) });
const adminLoginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

function hashToken(token: string) {
  return createHash("sha256").update(token).update(tokenPepper).digest("hex");
}

function createInvitationToken() {
  return randomBytes(32).toString("base64url");
}

function parseCookies(req: Request) {
  return Object.fromEntries((req.headers.cookie ?? "").split(";").filter(Boolean).map((part) => {
    const [key, ...value] = part.trim().split("=");
    return [key, decodeURIComponent(value.join("="))];
  }));
}

function compareSecret(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function consumeRateLimit(req: Request, res: Response, scope: string, limit: number, windowMs: number) {
  const now = Date.now();
  const key = `${scope}:${req.ip ?? "unknown"}`;
  const active = rateLimits.get(key);
  const bucket = !active || active.resetAt <= now ? { count: 0, resetAt: now + windowMs } : active;
  bucket.count += 1;
  rateLimits.set(key, bucket);
  if (bucket.count <= limit) return true;
  res.setHeader("Retry-After", String(Math.ceil((bucket.resetAt - now) / 1000)));
  res.status(429).json({ error: "Trop de tentatives. Réessayez dans quelques minutes." });
  return false;
}

async function signAdminSession() {
  return new SignJWT({ role: "partner-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(config.ADMIN_EMAIL)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(adminSecret);
}

async function requireAdmin(req: Request, res: Response, next: () => void) {
  try {
    const token = parseCookies(req).partner_admin_session;
    if (!token) throw new Error("Missing session");
    const result = await jwtVerify(token, adminSecret);
    if (result.payload.sub !== config.ADMIN_EMAIL || result.payload.role !== "partner-admin") throw new Error("Invalid session");
    next();
  } catch {
    res.status(401).json({ error: "Accès administrateur requis." });
  }
}

async function runSchema() {
  const schema = await readFile(schemaPath, "utf8");
  await getPool().query(schema);
  await getPool().query(
    `INSERT INTO questionnaire_versions (id, code, title, status, definition_json, published_at)
     VALUES ($1, $2, $3, 'published', $4, NOW())
     ON CONFLICT (code) DO NOTHING`,
    [randomUUID(), PARTNER_QUESTIONNAIRE_V1.code, PARTNER_QUESTIONNAIRE_V1.title, JSON.stringify(PARTNER_QUESTIONNAIRE_V1)],
  );
}

async function getInvitationContext(token: string): Promise<InvitationContext | null> {
  const tokenHash = hashToken(token);
  const result = await getPool().query<InvitationContext>(
    `SELECT i.id AS "invitationId", i.status AS "invitationStatus", i.expires_at AS "expiresAt",
            c.id AS "contactId", c.first_name AS "firstName", c.last_name AS "lastName", c.email,
            o.id AS "organizationId", o.name AS "organizationName"
     FROM partner_invitations i
     JOIN partner_contacts c ON c.id = i.contact_id
     JOIN partner_organizations o ON o.id = c.organization_id
     WHERE i.token_hash = $1
     LIMIT 1`,
    [tokenHash],
  );
  const invitation = result.rows[0] ?? null;
  if (!invitation) return null;
  if (invitation.invitationStatus === "active" && new Date(invitation.expiresAt).getTime() < Date.now()) {
    await getPool().query("UPDATE partner_invitations SET status = 'expired' WHERE id = $1", [invitation.invitationId]);
    invitation.invitationStatus = "expired";
  }
  return invitation;
}

async function getPublishedQuestionnaire() {
  const result = await getPool().query<{ id: string; definition_json: typeof PARTNER_QUESTIONNAIRE_V1 }>(
    "SELECT id, definition_json FROM questionnaire_versions WHERE code = $1 AND status = 'published' LIMIT 1",
    [PARTNER_QUESTIONNAIRE_V1.code],
  );
  if (!result.rows[0]) throw new Error("Questionnaire published version missing");
  return result.rows[0];
}

async function getOrCreateResponse(invitationId: string) {
  const questionnaire = await getPublishedQuestionnaire();
  const existing = await getPool().query<{ id: string; status: string; consented_at: string | null }>(
    "SELECT id, status, consented_at FROM partner_responses WHERE invitation_id = $1 AND questionnaire_version_id = $2 LIMIT 1",
    [invitationId, questionnaire.id],
  );
  if (existing.rows[0]) return { ...existing.rows[0], questionnaire };
  const responseId = randomUUID();
  await getPool().query(
    "INSERT INTO partner_responses (id, invitation_id, questionnaire_version_id) VALUES ($1, $2, $3)",
    [responseId, invitationId, questionnaire.id],
  );
  return { id: responseId, status: "draft", consented_at: null, questionnaire };
}

async function fetchResponseAnswers(responseId: string) {
  const result = await getPool().query<{ question_key: string; value_json: unknown; source: "typed" | "voice" }>(
    "SELECT question_key, value_json, source FROM partner_response_answers WHERE response_id = $1 ORDER BY updated_at",
    [responseId],
  );
  return result.rows.map((row) => ({ questionKey: row.question_key, value: row.value_json, source: row.source }));
}

async function notifyInvitation(email: string, firstName: string, invitationUrl: string) {
  try {
    await sendOptionalMail(config, {
      to: email,
      subject: "Votre invitation — questionnaire Boussole Numérique Culture",
      text: `Bonjour ${firstName},\n\nVous êtes invité·e à partager vos idées et feedbacks pour la co-construction de la Boussole Numérique Culture.\n\nVotre lien personnel : ${invitationUrl}\n\nCe lien est individuel. Vos réponses peuvent être enregistrées en brouillon avant envoi.\n\nL’équipe de projet`,
    });
  } catch (error) {
    console.error("Invitation e-mail failed", error);
  }
}

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: config.ALLOWED_ORIGIN, credentials: true, methods: ["GET", "POST", "PUT"] }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", async (_req, res) => {
  await getPool().query("SELECT 1");
  res.json({ status: "ok" });
});

app.post("/api/public/invitation-requests", async (req, res) => {
  if (!consumeRateLimit(req, res, "invitation-request", 10, 60 * 60 * 1000)) return;
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Les informations de demande sont incomplètes." });
  const value = parsed.data;
  const existing = await getPool().query("SELECT id FROM partner_invitation_requests WHERE email = $1 AND status = 'pending' LIMIT 1", [value.email]);
  if (!existing.rowCount) {
    await getPool().query(
      `INSERT INTO partner_invitation_requests (id, organization_name, first_name, last_name, email)
       VALUES ($1, $2, $3, $4, $5)`,
      [randomUUID(), value.organizationName, value.firstName, value.lastName, value.email],
    );
  }
  res.status(202).json({ message: "Votre demande a bien été enregistrée. L’équipe vous recontactera après vérification." });
});

app.get("/api/public/invitations/:token", async (req, res) => {
  const invitation = await getInvitationContext(req.params.token);
  if (!invitation) return res.status(404).json({ error: "Lien d’invitation introuvable." });
  if (invitation.invitationStatus !== "active") return res.status(410).json({ error: "Cette invitation n’est plus active.", status: invitation.invitationStatus });
  await getPool().query("UPDATE partner_invitations SET last_opened_at = NOW() WHERE id = $1", [invitation.invitationId]);
  const response = await getOrCreateResponse(invitation.invitationId);
  const answers = await fetchResponseAnswers(response.id);
  res.json({
    invitation: { organizationName: invitation.organizationName, firstName: invitation.firstName, lastName: invitation.lastName, expiresAt: invitation.expiresAt },
    response: { id: response.id, status: response.status, consentedAt: response.consented_at, answers },
    questionnaire: response.questionnaire.definition_json,
    voiceEnabled: Boolean(config.DEEPGRAM_API_KEY),
  });
});

app.put("/api/public/invitations/:token/draft", async (req, res) => {
  const invitation = await getInvitationContext(req.params.token);
  if (!invitation || invitation.invitationStatus !== "active") return res.status(410).json({ error: "Cette invitation n’est plus active." });
  const parsed = answersSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Le brouillon contient un format de réponse invalide." });
  const response = await getOrCreateResponse(invitation.invitationId);
  if (response.status === "submitted") return res.status(409).json({ error: "Ce questionnaire a déjà été soumis." });
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    if (parsed.data.consent) await client.query("UPDATE partner_responses SET consented_at = COALESCE(consented_at, NOW()), updated_at = NOW() WHERE id = $1", [response.id]);
    for (const answer of parsed.data.answers) {
      await client.query(
        `INSERT INTO partner_response_answers (id, response_id, question_key, value_json, source)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (response_id, question_key)
         DO UPDATE SET value_json = EXCLUDED.value_json, source = EXCLUDED.source, updated_at = NOW()`,
        [randomUUID(), response.id, answer.questionKey, JSON.stringify(answer.value), answer.source],
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  res.json({ message: "Brouillon enregistré.", responseId: response.id });
});

app.post("/api/public/invitations/:token/submit", async (req, res) => {
  const invitation = await getInvitationContext(req.params.token);
  if (!invitation || invitation.invitationStatus !== "active") return res.status(410).json({ error: "Cette invitation n’est plus active." });
  const response = await getOrCreateResponse(invitation.invitationId);
  if (!response.consented_at) return res.status(400).json({ error: "Votre consentement est nécessaire avant l’envoi." });
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const submitted = await client.query("UPDATE partner_responses SET status = 'submitted', submitted_at = NOW(), updated_at = NOW() WHERE id = $1 AND status = 'draft' RETURNING id", [response.id]);
    if (!submitted.rowCount) {
      await client.query("ROLLBACK");
      return res.status(409).json({ error: "Ce questionnaire a déjà été soumis." });
    }
    const answers = await client.query<{ question_key: string; value_json: unknown }>(
      "SELECT question_key, value_json FROM partner_response_answers WHERE response_id = $1 ORDER BY updated_at",
      [response.id],
    );
    const summary = createResponseRecap(answers.rows.map((answer) => ({ questionKey: answer.question_key, value: answer.value_json })));
    await client.query("UPDATE partner_invitations SET status = 'completed' WHERE id = $1", [invitation.invitationId]);
    await client.query("INSERT INTO response_events (id, response_id, event_type) VALUES ($1, $2, 'submitted')", [randomUUID(), response.id]);
    await client.query(
      `INSERT INTO notifications.partner_response_recap_outbox
       (id, response_id, recipient_email, recipient_name, organization_name, subject, summary_text)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        randomUUID(),
        response.id,
        invitation.email,
        invitation.firstName,
        invitation.organizationName,
        "Copie de vos réponses — Boussole Numérique Culture",
        summary,
      ],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  res.json({ message: "Merci, vos idées et feedbacks ont bien été enregistrés." });
});

app.post("/api/public/invitations/:token/transcribe", express.raw({ type: ["audio/*", "application/octet-stream"], limit: "15mb" }), async (req, res) => {
  const invitation = await getInvitationContext(req.params.token);
  if (!invitation || invitation.invitationStatus !== "active") return res.status(410).json({ error: "Cette invitation n’est plus active." });
  if (!config.DEEPGRAM_API_KEY) return res.status(503).json({ error: "La réponse vocale n’est pas encore activée." });
  if (!Buffer.isBuffer(req.body) || !req.body.length) return res.status(400).json({ error: "Aucun enregistrement audio reçu." });
  const contentType = req.headers["content-type"] ?? "audio/webm";
  const deepgramResponse = await fetch("https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&language=fr", {
    method: "POST",
    headers: { Authorization: `Token ${config.DEEPGRAM_API_KEY}`, "Content-Type": contentType },
    body: req.body,
  });
  if (!deepgramResponse.ok) {
    console.error("Deepgram transcription failed", deepgramResponse.status);
    return res.status(502).json({ error: "La transcription n’a pas pu être réalisée. Vous pouvez répondre par écrit." });
  }
  const payload = await deepgramResponse.json() as { results?: { channels?: Array<{ alternatives?: Array<{ transcript?: string }> }> } };
  const transcript = payload.results?.channels?.[0]?.alternatives?.[0]?.transcript?.trim() ?? "";
  res.json({ transcript });
});

app.post("/api/admin/login", async (req, res) => {
  if (!consumeRateLimit(req, res, "admin-login", 8, 15 * 60 * 1000)) return;
  const parsed = adminLoginSchema.safeParse(req.body);
  if (!parsed.success || parsed.data.email !== config.ADMIN_EMAIL || !compareSecret(parsed.data.password, config.ADMIN_PASSWORD)) {
    return res.status(401).json({ error: "Identifiants administrateur invalides." });
  }
  const token = await signAdminSession();
  res.cookie("partner_admin_session", token, { httpOnly: true, secure: config.PUBLIC_APP_URL.startsWith("https://"), sameSite: "lax", maxAge: 8 * 60 * 60 * 1000, path: "/api/admin" });
  res.json({ email: config.ADMIN_EMAIL });
});

app.post("/api/admin/logout", requireAdmin, (_req, res) => {
  res.clearCookie("partner_admin_session", { path: "/api/admin" });
  res.status(204).end();
});

app.get("/api/admin/overview", requireAdmin, async (_req, res) => {
  const [organizations, contacts, requests, responses] = await Promise.all([
    getPool().query("SELECT id, name, status, created_at FROM partner_organizations ORDER BY name"),
    getPool().query("SELECT c.id, c.first_name, c.last_name, c.email, c.organization_id, o.name AS organization_name FROM partner_contacts c JOIN partner_organizations o ON o.id = c.organization_id ORDER BY o.name, c.last_name"),
    getPool().query("SELECT id, organization_name, first_name, last_name, email, status, created_at FROM partner_invitation_requests ORDER BY created_at DESC"),
    getPool().query("SELECT r.id, r.status, r.submitted_at, o.name AS organization_name, c.email FROM partner_responses r JOIN partner_invitations i ON i.id = r.invitation_id JOIN partner_contacts c ON c.id = i.contact_id JOIN partner_organizations o ON o.id = c.organization_id ORDER BY r.updated_at DESC"),
  ]);
  res.json({ organizations: organizations.rows, contacts: contacts.rows, invitationRequests: requests.rows, responses: responses.rows });
});

app.post("/api/admin/organizations", requireAdmin, async (req, res) => {
  const parsed = organizationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Organisation invalide." });
  const value = parsed.data;
  const result = await getPool().query("INSERT INTO partner_organizations (id, name, status, notes) VALUES ($1, $2, $3, $4) RETURNING *", [randomUUID(), value.name, value.status, value.notes ?? null]);
  res.status(201).json(result.rows[0]);
});

app.post("/api/admin/contacts", requireAdmin, async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Contact invalide." });
  const value = parsed.data;
  const result = await getPool().query("INSERT INTO partner_contacts (id, organization_id, first_name, last_name, email, role_label) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [randomUUID(), value.organizationId, value.firstName, value.lastName, value.email, value.roleLabel ?? null]);
  res.status(201).json(result.rows[0]);
});

app.post("/api/admin/invitations", requireAdmin, async (req, res) => {
  const parsed = invitationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invitation invalide." });
  const token = createInvitationToken();
  const expiresAt = new Date(Date.now() + parsed.data.expiresInDays * 24 * 60 * 60 * 1000);
  const contact = await getPool().query<{ email: string; first_name: string }>("SELECT email, first_name FROM partner_contacts WHERE id = $1", [parsed.data.contactId]);
  if (!contact.rows[0]) return res.status(404).json({ error: "Contact introuvable." });
  const result = await getPool().query(
    "INSERT INTO partner_invitations (id, contact_id, token_hash, expires_at) VALUES ($1, $2, $3, $4) RETURNING id, expires_at",
    [randomUUID(), parsed.data.contactId, hashToken(token), expiresAt],
  );
  const invitationUrl = `${config.PUBLIC_APP_URL}/partenaires/questionnaire/${token}`;
  await notifyInvitation(contact.rows[0].email, contact.rows[0].first_name, invitationUrl);
  res.status(201).json({ ...result.rows[0], invitationUrl });
});

app.post("/api/admin/invitation-requests/:id/approve", requireAdmin, async (req, res) => {
  const parsed = z.object({ expiresInDays: z.number().int().min(1).max(180).default(45) }).safeParse(req.body ?? {});
  if (!parsed.success) return res.status(400).json({ error: "Durée d’invitation invalide." });
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const request = await client.query<{ organization_name: string; first_name: string; last_name: string; email: string }>(
      "SELECT organization_name, first_name, last_name, email FROM partner_invitation_requests WHERE id = $1 AND status = 'pending' FOR UPDATE",
      [req.params.id],
    );
    const data = request.rows[0];
    if (!data) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Demande en attente introuvable." });
    }
    const organization = await client.query<{ id: string }>(
      `INSERT INTO partner_organizations (id, name, status) VALUES ($1, $2, 'candidate')
       ON CONFLICT (name) DO UPDATE SET updated_at = NOW() RETURNING id`,
      [randomUUID(), data.organization_name],
    );
    const contact = await client.query<{ id: string }>(
      `INSERT INTO partner_contacts (id, organization_id, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET organization_id = EXCLUDED.organization_id, first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, updated_at = NOW()
       RETURNING id`,
      [randomUUID(), organization.rows[0].id, data.first_name, data.last_name, data.email],
    );
    const token = createInvitationToken();
    const expiresAt = new Date(Date.now() + parsed.data.expiresInDays * 24 * 60 * 60 * 1000);
    const invitation = await client.query<{ id: string; expires_at: string }>(
      "INSERT INTO partner_invitations (id, contact_id, token_hash, expires_at) VALUES ($1, $2, $3, $4) RETURNING id, expires_at",
      [randomUUID(), contact.rows[0].id, hashToken(token), expiresAt],
    );
    await client.query("UPDATE partner_invitation_requests SET status = 'approved', reviewed_at = NOW() WHERE id = $1", [req.params.id]);
    await client.query("COMMIT");
    const invitationUrl = `${config.PUBLIC_APP_URL}/partenaires/questionnaire/${token}`;
    await notifyInvitation(data.email, data.first_name, invitationUrl);
    res.status(201).json({ ...invitation.rows[0], invitationUrl });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
});

app.post("/api/admin/invitations/:id/revoke", requireAdmin, async (req, res) => {
  const result = await getPool().query("UPDATE partner_invitations SET status = 'revoked', revoked_at = NOW() WHERE id = $1 AND status = 'active' RETURNING id", [req.params.id]);
  if (!result.rowCount) return res.status(404).json({ error: "Invitation active introuvable." });
  res.status(204).end();
});

app.get("/api/admin/export.csv", requireAdmin, async (_req, res) => {
  const result = await getPool().query<{ organization: string; contact_email: string; status: string; submitted_at: string | null; question_key: string; value_json: unknown }>(
    `SELECT o.name AS organization, c.email AS contact_email, r.status, r.submitted_at, a.question_key, a.value_json
     FROM partner_responses r
     JOIN partner_invitations i ON i.id = r.invitation_id
     JOIN partner_contacts c ON c.id = i.contact_id
     JOIN partner_organizations o ON o.id = c.organization_id
     LEFT JOIN partner_response_answers a ON a.response_id = r.id
     ORDER BY o.name, c.email, a.question_key`,
  );
  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const rows = ["organisation,email,statut,soumis_le,question,reponse", ...result.rows.map((row) => [row.organization, row.contact_email, row.status, row.submitted_at ?? "", row.question_key, JSON.stringify(row.value_json ?? "")].map(escape).join(","))];
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=responses-partenaires.csv");
  res.send(rows.join("\n"));
});

async function start() {
  if (process.env.RUN_MIGRATIONS === "true") await runSchema();
  app.listen(config.PORT, () => console.log(`Partner feedback API listening on ${config.PORT}`));
}

process.on("SIGTERM", () => closePool().finally(() => process.exit(0)));
process.on("SIGINT", () => closePool().finally(() => process.exit(0)));

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
