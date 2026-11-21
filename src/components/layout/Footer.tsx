import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName } from "@/config/advisors";
import { href, serviceKeys, teamHref, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import { fill } from "@/lib/format";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { Missing } from "@/components/ui/Missing";
import { isPreview } from "@/lib/site";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const year = new Date().getFullYear();
  const showPartner = company.partnerMentionApproved || isPreview;
  const head = "tracking-label mb-5 text-[0.78rem] font-semibold text-champagne-light";
  const link = "inline-block py-1 text-mist hover:text-white";
  return (
    <footer className="navy-surface on-dark text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">{company.name}</h2>
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="display mt-8 max-w-xs text-[1.7rem] text-white/90">{t.footer.claim}</p>
          </div>
          <div>
            <h3 className={head}>{t.footer.navTitle}</h3>
            <ul className="space-y-1.5">
              {(["about", "private", "business", "solutions", "tools", "contact"] as const).map((k) => (
                <li key={k}><Link className={link} href={href(locale, k)}>{t.nav[k]}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.footer.servicesTitle}</h3>
            <ul className="space-y-1.5">
              {serviceKeys.map((k) => <li key={k}><Link className={link} href={href(locale, k)}>{t.services.items[k].title}</Link></li>)}
              <li><Link className={link} href={href(locale, "extras")}>{t.extras.eyebrow}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.nav.team}</h3>
            <ul className="space-y-1.5">
              {activeAdvisors().map((a) => <li key={a.id}><Link className={link} href={teamHref(locale, a.slug)}>{advisorName(a, locale)}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.footer.contactTitle}</h3>
            <address className="space-y-3 not-italic text-mist">
              <p className="flex gap-3"><MapPin size={20} className="mt-1 shrink-0 text-champagne-light" aria-hidden="true" />
                <span>{company.office.street}<br />{company.office.postalCode} {company.office.cityLocalized[locale]}</span></p>
              {company.phone && <p className="flex gap-3"><Phone size={20} className="mt-1 shrink-0 text-champagne-light" aria-hidden="true" />
                <a href={`tel:${company.phone}`} className="hover:text-white" data-track="call_footer"><span className="ltr-nums">{company.phoneDisplay}</span></a></p>}
              <p className="flex gap-3"><Mail size={20} className="mt-1 shrink-0 text-champagne-light" aria-hidden="true" />
                {company.email ? <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a> : <Missing label={`${t.common.missing}: E-Mail`} />}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-line-dark pt-8 text-[0.95rem] text-mist">
          <p className="max-w-3xl">
            {showPartner ? fill(t.footer.partnerNote, { partner: company.partnerShortName }) : t.footer.statusPending}{" "}
            {!company.partnerMentionApproved && <Missing label={`${t.common.toVerify}: ${company.partnerShortName}-Freigabe`} />}
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {(["imprint", "privacy", "firstInfo"] as const).map((k) => (
                <li key={k}><Link className="inline-block py-1 underline-offset-4 hover:text-white hover:underline" href={href(locale, k)}>{t.footer[k]}</Link></li>
              ))}
            </ul>
            <p className="text-[0.88rem]">© {year} {company.name} · {t.footer.rights}</p>
          </div>
        </div>
      </Container>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </footer>
  );
}
