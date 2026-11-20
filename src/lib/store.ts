import "server-only";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Einfache Dateiablage für Leads & anonyme Kennzahlen (data/*.json).
 * Geeignet für lokalen Betrieb und eigene Server (VPS). Auf Serverless-Hosting
 * ist das Dateisystem flüchtig → dort LEAD_STORE=none setzen und die
 * Auswertungsvorlage (marketing/lead-tracking.xlsx) nutzen.
 */
const DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const LEADS = path.join(DIR, "leads.json");
const METRICS = path.join(DIR, "metrics.json");

export const leadStatuses = ["neu", "kontaktiert", "qualifiziert", "nicht_qualifiziert", "termin", "abgeschlossen"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type StoredLead = {
  id: string;
  createdAt: string;
  test: boolean;
  status: LeadStatus;
  topic: string;
  mode: string;
  name: string;
  phone: string;
  email: string;
  language: string;
  time: string;
  message: string;
  pageLocale: string;
  source: string;
  note: string;
  delivered: boolean;
};

export type Metrics = {
  since: string;
  pageviews: Record<string, number>; // "de:/de/kontakt" → n
  clicks: Record<string, number>; // "cta_header" → n
  manualVisits?: number | null;
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}
async function writeJson(file: string, data: unknown) {
  await fs.mkdir(DIR, { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), { mode: 0o600 });
  await fs.rename(tmp, file);
}

// Auf Vercel (schreibgeschütztes Dateisystem) automatisch aus
export const storeEnabled = () => (process.env.LEAD_STORE || (process.env.VERCEL ? "none" : "file")) === "file";

export async function listLeads() {
  return readJson<StoredLead[]>(LEADS, []);
}
export async function addLead(l: Omit<StoredLead, "id" | "createdAt" | "status" | "note">) {
  const leads = await listLeads();
  const lead: StoredLead = { ...l, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "neu", note: "" };
  leads.unshift(lead);
  await writeJson(LEADS, leads);
  return lead;
}
export async function updateLead(id: string, patch: Partial<Pick<StoredLead, "status" | "note">>) {
  const leads = await listLeads();
  const i = leads.findIndex((l) => l.id === id);
  if (i < 0) return null;
  leads[i] = { ...leads[i], ...patch };
  await writeJson(LEADS, leads);
  return leads[i];
}
export async function deleteLead(id: string) {
  const leads = await listLeads();
  await writeJson(LEADS, leads.filter((l) => l.id !== id));
}

export async function getMetrics() {
  return readJson<Metrics>(METRICS, { since: new Date().toISOString(), pageviews: {}, clicks: {} });
}
let queue: Promise<unknown> = Promise.resolve();
export function bumpMetric(kind: "pageviews" | "clicks", key: string) {
  queue = queue.then(async () => {
    const m = await getMetrics();
    m[kind][key] = (m[kind][key] || 0) + 1;
    await writeJson(METRICS, m);
  }).catch(() => undefined);
  return queue;
}
export async function setManualVisits(n: number | null) {
  const m = await getMetrics();
  m.manualVisits = n;
  await writeJson(METRICS, m);
}
