import { NextResponse, type NextRequest } from "next/server";

/**
 * Zugriffsschutz & Sprachweiterleitung
 * - PREVIEW (Standard): ganze Website per Basic Auth (PREVIEW_USER / PREVIEW_PASSWORD),
 *   auf localhost ohne Passwort. Ohne Passwort auf einem Server → gesperrt.
 * - /intern (Lead-Dashboard): immer Basic Auth mit ADMIN_USER / ADMIN_PASSWORD.
 */
const LOCALES = ["de", "ar", "en"];

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

function isLocalHost(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const preview = process.env.SITE_MODE !== "production";

  // 1) Internes Dashboard
  if (pathname.startsWith("/intern") || pathname.startsWith("/api/intern")) {
    if (!process.env.ADMIN_PASSWORD) return new NextResponse("Dashboard deaktiviert (ADMIN_PASSWORD fehlt).", { status: 404 });
    if (!checkAuth(req, process.env.ADMIN_USER, process.env.ADMIN_PASSWORD)) return unauthorized("Lead-Dashboard");
    return NextResponse.next();
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
