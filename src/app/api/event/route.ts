import { NextResponse } from "next/server";
import { analyticsEnabled } from "@/lib/site";
import { bumpMetric, storeEnabled } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Anonyme Zählung: speichert nur Zähler pro Seite/Button. Keine IP, keine IDs. */
export async function POST(req: Request) {
  if (!analyticsEnabled || !storeEnabled()) return new NextResponse(null, { status: 204 });
  try {
    const b = (await req.json()) as { type?: string; path?: string; name?: string };
    const path = String(b.path || "").slice(0, 120).replace(/[^\w\-/]/g, "");
    if (b.type === "pageview" && path) await bumpMetric("pageviews", path);
    if (b.type === "click" && b.name) await bumpMetric("clicks", String(b.name).slice(0, 60).replace(/[^\w-]/g, ""));
  } catch { /* ignorieren */ }
  return new NextResponse(null, { status: 204 });
}
