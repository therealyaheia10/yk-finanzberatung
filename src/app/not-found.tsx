import "./globals.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="de">
      <body className="flex min-h-screen items-center justify-center bg-ivory p-8">
        <div className="max-w-lg text-center">
          <p className="display text-7xl text-brass">404</p>
          <h1 className="display mt-4 text-4xl text-navy">Seite nicht gefunden</h1>
          <p className="mt-3 text-muted">Page not found · الصفحة غير موجودة</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="btn btn-primary" href="/de">Startseite</Link>
            <Link className="btn btn-ghost" href="/en">Home</Link>
            <Link className="btn btn-ghost" href="/ar">الرئيسية</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
