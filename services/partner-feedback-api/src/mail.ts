import nodemailer from "nodemailer";
import type { PartnerApiConfig } from "./config.js";

function getTransport(config: PartnerApiConfig) {
  if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASSWORD || !config.MAIL_FROM) return null;
  return nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_PORT === 465,
    auth: { user: config.SMTP_USER, pass: config.SMTP_PASSWORD },
  });
}

export async function sendOptionalMail(config: PartnerApiConfig, message: { to: string; subject: string; text: string }) {
  const transport = getTransport(config);
  if (!transport) return false;
  await transport.sendMail({ from: config.MAIL_FROM, ...message });
  return true;
}
