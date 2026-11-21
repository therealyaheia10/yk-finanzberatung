import Link from "next/link";
import { company } from "@/config/company";
import { activeAdvisors, advisorName } from "@/config/advisors";
import { href, serviceKeys, teamHref, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import { fill } from "@/lib/format";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const head = "mb-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-champagne-light";
  const link = "inline-flex min-h-9 items-center py-1 text-[0.92rem] leading-snug text-mist [overflow-wrap:anywhere] hover:text-white";
  return (
    <footer className="border-t border-line-dark bg-navy-deep text-white on-dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">{company.name}</h2>
      <Container className="py-12 sm:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo light />
            <p className="mt-4 max-w-xs text-[0.95rem] text-mist">{t.footer.claim}</p>
            <p className="mt-4 text-[0.95rem] text-mist">{company.office.street}<br />{company.office.postalCode} {company.office.cityLocalized[locale]}</p>
            {company.phone && <a href={`tel:${company.phone}`} className="mt-2 inline-flex min-h-9 items-center font-semibold text-white" data-track="call_footer"><span className="ltr-nums">{company.phoneDisplay}</span></a>}
            {company.email && <a href={`mailto:${company.email}`} className="block text-mist hover:text-white">{company.email}</a>}
          </div>
          <div>
            <h3 className={head}>{t.footer.servicesTitle}</h3>
            <ul lang={locale} className="hyphens-auto">{serviceKeys.map((k) => <li key={k}><Link className={link} href={href(locale, k)}>{t.services.items[k].title}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className={head}>{t.footer.navTitle}</h3>
            <ul>
              {(["private", "business", "tools", "about", "contact"] as const).map((k) => <li key={k}><Link className={link} href={href(locale, k)}>{t.nav[k]}</Link></li>)}
              {activeAdvisors().map((a) => <li key={a.id}><Link className={link} href={teamHref(locale, a.slug)}>{advisorName(a, locale)}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.footer.legalTitle}</h3>
            <ul>{(["imprint", "privacy", "firstInfo"] as const).map((k) => <li key={k}><Link className={link} href={href(locale, k)}>{t.footer[k]}</Link></li>)}</ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-line-dark pt-6 text-[0.85rem] text-mist sm:flex-row sm:justify-between">
          <p className="max-w-2xl">{company.partnerMentionApproved ? fill(t.footer.partnerNote, { partner: company.partnerShortName }) : t.footer.statusPending}</p>
          <p className="shrink-0">© {new Date().getFullYear()} {company.name}</p>
        </div>
      </Container>
      <div className="h-[4.5rem] md:hidden" aria-hidden="true" />
    </footer>
  );
}
