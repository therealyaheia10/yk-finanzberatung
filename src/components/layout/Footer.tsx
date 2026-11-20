import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { advisor } from "@/config/advisor";
import { href, serviceKeys, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { Missing } from "@/components/ui/Missing";
import { isPreview } from "@/lib/site";
import { advisorName } from "@/content";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const year = new Date().getFullYear();
  const showPartner = advisor.partnerMentionApproved || isPreview;
  const city = locale === "ar" ? advisor.office.cityAr : advisor.office.city;
  return (
    <footer className="navy-surface on-dark text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo locale={locale} light />
            <p className="display mt-8 max-w-xs text-3xl text-white/90">{t.footer.claim}</p>
          </div>
          <div>
            <h3 className="tracking-label mb-5 text-[0.78rem] font-semibold text-champagne-light">{t.footer.navTitle}</h3>
            <ul className="space-y-2">
              {(["private", "business", "tools", "about", "contact"] as const).map((k) => (
                <li key={k}><Link className="inline-block py-1 text-mist hover:text-white" href={href(locale, k)}>{t.nav[k]}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="tracking-label mb-5 text-[0.78rem] font-semibold text-champagne-light">{t.footer.servicesTitle}</h3>
            <ul className="space-y-2">
              {serviceKeys.map((k) => (
                <li key={k}><Link className="inline-block py-1 text-mist hover:text-white" href={href(locale, k)}>{t.services.items[k].title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="tracking-label mb-5 text-[0.78rem] font-semibold text-champagne-light">{t.footer.contactTitle}</h3>
            <address className="space-y-3 not-italic text-mist">
              <p className="flex gap-3"><MapPin size={20} className="mt-1 shrink-0 text-champagne-light" aria-hidden="true" />
                <span>{advisorName(locale)}<br />{advisor.office.street}<br />
                  {advisor.office.postalCode ? `${advisor.office.postalCode} ` : <><Missing label={`${t.common.missing}: PLZ`} />{" "}</>}{city}</span>
              </p>
              {advisor.phone && (
                <p className="flex gap-3"><Phone size={20} className="mt-1 shrink-0 text-champagne-light" aria-hidden="true" />
                  <a href={`tel:${advisor.phone}`} className="hover:text-white" data-track="call_footer"><span className="ltr-nums">{advisor.phoneDisplay}</span></a>
                </p>
              )}
              <p className="flex gap-3"><Mail size={20} className="mt-1 shrink-0 text-champagne-light" aria-hidden="true" />
                {advisor.email ? <a href={`mailto:${advisor.email}`} className="hover:text-white">{advisor.email}</a> : <Missing label={`${t.common.missing}: E-Mail`} />}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-line-dark pt-8 text-[0.95rem] text-mist">
          <p className="max-w-3xl">
            {showPartner ? t.footer.partnerNote(advisor.partnerShortName) : t.footer.statusPending}{" "}
            {!advisor.partnerMentionApproved && <Missing label={`${t.common.toVerify}: ${advisor.partnerShortName}-Freigabe & Vermittlerstatus`} />}
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><Link className="inline-block py-1 underline-offset-4 hover:text-white hover:underline" href={href(locale, "imprint")}>{t.footer.imprint}</Link></li>
              <li><Link className="inline-block py-1 underline-offset-4 hover:text-white hover:underline" href={href(locale, "privacy")}>{t.footer.privacy}</Link></li>
              <li><Link className="inline-block py-1 underline-offset-4 hover:text-white hover:underline" href={href(locale, "firstInfo")}>{t.footer.firstInfo}</Link></li>
            </ul>
            <p className="text-[0.88rem]">© {year} {advisorName(locale)} · {t.footer.rights}</p>
          </div>
        </div>
      </Container>
      {/* Platz für mobile Kontaktleiste */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </footer>
  );
}
