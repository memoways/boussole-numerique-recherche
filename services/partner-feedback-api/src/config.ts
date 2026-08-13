import { z } from "zod";

const environmentSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1, "DATABASE_URL est requis"),
  PUBLIC_APP_URL: z.string().url(),
  ALLOWED_ORIGIN: z.string().url(),
  INVITATION_TOKEN_PEPPER: z.string().min(32, "INVITATION_TOKEN_PEPPER doit contenir au moins 32 caractères"),
  ADMIN_SESSION_SECRET: z.string().min(32, "ADMIN_SESSION_SECRET doit contenir au moins 32 caractères"),
  ADMIN_EMAIL: z.string().email().default("ulrich.fischer@memoways.com"),
  ADMIN_PASSWORD: z.string().min(12, "ADMIN_PASSWORD doit contenir au moins 12 caractères"),
  DEEPGRAM_API_KEY: z.string().min(1).optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASSWORD: z.string().min(1).optional(),
  MAIL_FROM: z.string().email().optional(),
});

export type PartnerApiConfig = z.infer<typeof environmentSchema>;

export function getConfig(): PartnerApiConfig {
  return environmentSchema.parse(process.env);
}
