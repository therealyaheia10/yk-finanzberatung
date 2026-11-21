import "server-only";
/** Einfaches In-Memory-Rate-Limit (pro Instanz). IP wird nur gehasht im RAM gehalten. */
import crypto from "crypto";
const hits = new Map<string, number[]>();

export function rateLimit(ip: string, limit = Number(process.env.RATE_LIMIT || 5), windowMs = 10 * 60 * 1000) {
  const key = crypto.createHash("sha256").update(ip + (process.env.RATE_SALT || "yk")).digest("hex").slice(0, 16);
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return arr.length <= limit;
}

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}
