import "server-only";
import nodemailer from "nodemailer";
import { company } from "@/config/company";

/** Versand ausschließlich über SMTP-Zugangsdaten aus Umgebungsvariablen. */
export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && (process.env.LEAD_TO || company.leadRecipientEmail));
}

/** Empfänger: Berater-E-Mail (falls hinterlegt) + zentrale Adresse in Kopie */
export async function sendLeadMail(subject: string, text: string, advisorEmail?: string | null, replyTo?: string) {
  const central = process.env.LEAD_TO || company.leadRecipientEmail || undefined;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: advisorEmail || central,
    cc: advisorEmail && central && advisorEmail !== central ? central : undefined,
    replyTo: replyTo || undefined,
    subject,
    text,
  });
}
