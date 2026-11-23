import { NextResponse, type NextRequest } from "next/server";

/**
 * Zugriffsschutz & Sprachweiterleitung
 * - PREVIEW (Standard): ganze Website per Basic Auth (PREVIEW_USER / PREVIEW_PASSWORD),
 *   auf localhost ohne Passwort. Ohne Passwort auf einem Server → gesperrt.
 * - /intern (Lead-Dashboard): Basic Auth. Admin (ADMIN_USER / ADMIN_PASSWORD) sieht alles;
 *   Berater (ADVISOR_ACCESS="slug:passwort,slug2:passwort2") sehen nur ihre eigenen Anfragen.
 */
const LOCALES = ["de", "ar", "en", "fr"];

function unauthorized(realm: string) {
  return new NextResponse("Zugriff nur für autorisierte Personen.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${realm}", charset="UTF-8"`, "X-Robots-Tag": "noindex, nofollow" },
  });
}

function checkAuth(req: NextRequest, user?: string, pass?: string) {
  if (!pass) return false;
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Basic ")) return false;
  try {
    const [u, ...rest] = atob(h.slice(6)).split(":");
    const p = rest.join(":");
    return (user ? u === user : true) && p === pass;
  } catch {
    return false;
  }
}

/** Rolle im internen Bereich: Admin oder ein einzelner Berater (Slug) */
function internRole(req: NextRequest): { admin: true } | { advisor: string } | null {
  if (process.env.ADMIN_PASSWORD && checkAuth(req, process.env.ADMIN_USER, process.env.ADMIN_PASSWORD)) return { admin: true };
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Basic ") || !process.env.ADVISOR_ACCESS) return null;
  try {
    const [u, ...rest] = atob(h.slice(6)).split(":");
    const p = rest.join(":");
    for (const entry of process.env.ADVISOR_ACCESS.split(",")) {
      const [slug, ...pw] = entry.trim().split(":");
      const pass = pw.join(":");
      if (slug && pass && u === slug && p === pass) return { advisor: slug };
    }
  } catch { /* ungültiger Header */ }
  return null;
}

function isLocalHost(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const preview = process.env.SITE_MODE !== "production";

  // 1) Internes Dashboard
  if (pathname.startsWith("/intern") || pathname.startsWith("/api/intern")) {
    if (!process.env.ADMIN_PASSWORD && !process.env.ADVISOR_ACCESS) return new NextResponse("Dashboard deaktiviert (ADMIN_PASSWORD fehlt).", { status: 404 });
    const role = internRole(req);
    if (!role) return unauthorized("Lead-Dashboard");
    // Rolle serverseitig weitergeben – ein vom Browser mitgeschickter Wert wird immer überschrieben
    const headers = new Headers(req.headers);
    headers.delete("x-intern-advisor");
    if ("advisor" in role) headers.set("x-intern-advisor", role.advisor);
    return NextResponse.next({ request: { headers } });
  }

  // 2) Vorschau-Schutz
  if (preview && !isLocalHost(req)) {
    if (!process.env.PREVIEW_PASSWORD) {
      return new NextResponse("Interne Vorschau gesperrt: PREVIEW_PASSWORD ist nicht gesetzt.", { status: 503, headers: { "X-Robots-Tag": "noindex" } });
    }
    if (!checkAuth(req, process.env.PREVIEW_USER, process.env.PREVIEW_PASSWORD)) return unauthorized("Interne Vorschau");
  }

  // 3) Startseite → Sprache
  if (pathname === "/") {
    const al = (req.headers.get("accept-language") || "").toLowerCase();
    const pref = al.split(",").map((s) => s.trim().slice(0, 2)).find((l) => LOCALES.includes(l)) || "de";
    const url = req.nextUrl.clone();
    url.pathname = `/${pref}`;
    return NextResponse.redirect(url, 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|images/|fonts/).*)"],
};
