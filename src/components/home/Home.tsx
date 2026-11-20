import Link from "next/link";
import { ArrowRight, MapPin, Phone, Building2, Languages, CalendarCheck, Plus, Quote, ExternalLink, Clock } from "lucide-react";
import { advisor } from "@/config/advisor";
import { href, serviceKeys, type Locale, type ServiceKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { advisorName } from "@/content";
import { isPreview } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { Missing } from "@/components/ui/Missing";
import { Finder } from "./Finder";
import { PensionGap } from "@/components/calculators/Calculators";
import { LeadForm } from "@/components/forms/LeadForm";

export function formModes() {
  const m: ("office" | "phone" | "video" | "callback")[] = [];
  if (advisor.consultationModes.office && advisor.office.inPersonConfirmed) m.push("office");
  if (advisor.consultationModes.phone) m.push("phone");
  if (advisor.consultationModes.video) m.push("video");
  m.push("callback");
  return m;
}

/* ------------------------------------------------------------------ Hero */
function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const name = advisorName(locale);
  return (
    <section className="relative overflow-hidden bg-ivory" aria-labelledby="hero-title">
      {/* feine Linienornamentik */}
      <svg className="pointer-events-none absolute -end-40 top-10 hidden h-[640px] w-[640px] text-line lg:block" viewBox="0 0 600 600" aria-hidden="true">
        <circle cx="300" cy="300" r="299" fill="none" stroke="currentColor" />
        <circle cx="300" cy="300" r="220" fill="none" stroke="currentColor" />
      </svg>
      <Container className="relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28 lg:pt-16">
        <div>
          <p className="reveal tracking-label flex items-center gap-3 text-[0.78rem] font-semibold text-brass sm:text-[0.82rem]">
            <span className="gold-rule" aria-hidden="true" /> {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="display reveal reveal-delay-1 mt-6 text-[2.85rem] text-navy sm:text-[4rem] lg:text-[4.6rem] xl:text-[5.1rem]">
            {t.hero.titleA}{" "}
            <em className="block text-brass" style={{ fontStyle: locale === "ar" ? "normal" : "italic" }}>{t.hero.titleB}</em>
          </h1>

          {/* Mobile: Ansprechpartner sofort sichtbar */}
          <div className="reveal reveal-delay-2 mt-7 flex items-center gap-4 lg:hidden">
            <Portrait src={advisor.images.portraitMain} alt="" placeholderLabel={t.common.portraitPlaceholder} className="h-16 w-16 shrink-0 rounded-full" sizes="64px" />
            <div>
              <p className="font-semibold text-navy">{name}</p>
              <p className="text-[0.95rem] text-muted">{t.hero.signatureNote} · {locale === "ar" ? advisor.office.cityAr : advisor.office.city}</p>
            </div>
          </div>

          <p className="reveal reveal-delay-2 mt-7 max-w-[36rem] text-[1.15rem] leading-relaxed text-muted sm:text-[1.25rem]">{t.hero.subtitle}</p>

          <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={href(locale, "contact")} className="btn btn-primary" data-track="cta_hero">
              <CalendarCheck size={20} aria-hidden="true" /> {t.hero.primary}
            </Link>
            <a href="#anliegen" className="btn btn-ghost" data-track="cta_hero_finder">
              {t.hero.secondary} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
            </a>
          </div>

          <ul className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[0.98rem] text-muted">
            <li className="flex items-center gap-2"><MapPin size={18} className="text-brass" aria-hidden="true" /> {t.hero.facts[0]}</li>
            <li className="flex items-center gap-2"><Phone size={18} className="text-brass" aria-hidden="true" /> {t.hero.facts[1]}</li>
            <li className="flex items-center gap-2"><Languages size={18} className="text-brass" aria-hidden="true" />
              <span>{t.hero.facts[2]}: <span lang="de">Deutsch</span> · <span lang="ar" style={{ fontFamily: "var(--font-arabic)" }}>العربية</span> · <span lang="en">English</span></span>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[460px] lg:block">
          <div className="absolute -inset-3 translate-x-6 translate-y-6 border border-champagne rtl:-translate-x-6" aria-hidden="true" />
          <Portrait src={advisor.images.portraitMain} alt={t.hero.portraitAlt} placeholderLabel={t.common.portraitPlaceholder} priority className="aspect-[4/5] w-full" />
          <div className="absolute -bottom-8 start-[-2.5rem] bg-paper px-6 py-5 shadow-[0_24px_50px_-24px_rgba(16,42,67,.45)]">
            <p className="display text-[1.6rem] leading-none text-navy">{name}</p>
            <p className="mt-2 text-[0.9rem] text-muted">{t.hero.signatureNote}</p>
            <p className="mt-1 flex items-center gap-1.5 text-[0.9rem] text-brass"><MapPin size={15} aria-hidden="true" /> {t.common.location}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Services */
export function ServiceList({ locale, t, keys = [...serviceKeys] }: { locale: Locale; t: Dict; keys?: ServiceKey[] }) {
  return (
    <ul className="border-t border-line">
      {keys.map((k, i) => (
        <li key={k} className="border-b border-line">
          <Link href={href(locale, k)} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 sm:gap-10 sm:py-9">
            <span className="display text-[1.4rem] text-brass sm:text-[1.8rem]" aria-hidden="true">0{i + 1}</span>
            <span className="min-w-0">
              <span className="display block text-[1.7rem] leading-tight text-navy transition-colors group-hover:text-brass sm:text-[2.3rem]">{t.services.items[k].title}</span>
              <span className="mt-2 block max-w-2xl text-muted">{t.services.items[k].short}</span>
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
              <ArrowRight size={20} className="rtl:rotate-180" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------- FAQ */
export function Faq({ items, idPrefix = "faq" }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <details key={f.q} className="group" id={`${idPrefix}-${i}`}>
          <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-start">
            <span className="text-[1.15rem] font-semibold text-navy sm:text-[1.25rem]">{f.q}</span>
            <span className="faq-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-transform duration-300">
              <Plus size={20} aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* --------------------------------------------------------- Contact box */
export function ContactBlock({ locale, t }: { locale: Locale; t: Dict }) {
  const city = locale === "ar" ? advisor.office.cityAr : advisor.office.city;
  return (
    <div className="space-y-6">
      {advisor.phone && (
        <a href={`tel:${advisor.phone}`} className="group flex items-center gap-5 rounded-[var(--radius-soft)] border border-line bg-paper p-5 transition-colors hover:border-navy" data-track="call_contactblock">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-white"><Phone size={22} aria-hidden="true" /></span>
          <span>
            <span className="block text-[0.95rem] text-muted">{t.common.phoneLabel}</span>
            <span className="ltr-nums block text-[1.35rem] font-bold text-navy">{advisor.phoneDisplay}</span>
          </span>
        </a>
      )}
      <div className="flex items-start gap-5 rounded-[var(--radius-soft)] border border-line bg-paper p-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand text-brass"><Building2 size={22} aria-hidden="true" /></span>
        <div>
          <p className="text-[0.95rem] text-muted">{t.common.addressLabel}</p>
          <address className="not-italic font-semibold text-navy">
            {advisor.office.street}<br />
            {advisor.office.postalCode ? `${advisor.office.postalCode} ` : <><Missing label={`${t.common.missing}: PLZ`} />{" "}</>}{city}
          </address>
          <a href={advisor.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-flex min-h-11 items-center gap-1.5 text-[0.98rem]" data-track="map_link">
            {t.location.directions} <ExternalLink size={15} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span>
          </a>
        </div>
      </div>
      <div className="flex items-start gap-5 rounded-[var(--radius-soft)] border border-line bg-paper p-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand text-brass"><Clock size={22} aria-hidden="true" /></span>
        <div>
          <p className="text-[0.95rem] text-muted">{t.common.hoursLabel}</p>
          <p className="font-semibold text-navy">{advisor.openingHours ? advisor.openingHours[locale] : t.common.byAppointment}</p>
          <p className="text-[0.95rem] text-muted">{t.common.languagesLine}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Page */
export function HomePage({ locale, t }: { locale: Locale; t: Dict }) {
  const name = advisorName(locale);
  const reviews = advisor.reviews.filter((r) => r.consentDocumented);

  return (
    <>
      <Hero locale={locale} t={t} />

      {/* 2. Anliegen-Finder */}
      <Section id="anliegen" tone="sand" labelledBy="finder-title">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow>{t.finder.eyebrow}</Eyebrow>
            <h2 id="finder-title" className="display text-[2.6rem] text-navy sm:text-[3.6rem]">{t.finder.title}</h2>
          </div>
          <p className="text-[1.15rem] text-muted lg:pb-3">{t.finder.intro}</p>
        </div>
        <Finder locale={locale} t={t.finder} learnMore={t.common.learnMore} />
      </Section>

      {/* 3. Beratungsschwerpunkte */}
      <Section labelledBy="services-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 id="services-title" className="display text-[2.6rem] text-navy sm:text-[3.4rem]">{t.services.title}</h2>
            <p className="mt-6 text-muted">{t.services.intro}</p>
          </div>
          <ServiceList locale={locale} t={t} />
        </div>
      </Section>

      {/* 4. Persönliche Vorstellung */}
      <Section tone="navy" labelledBy="intro-title">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[420px]">
            <Portrait src={advisor.images.portraitIntro} alt={t.hero.portraitAlt} placeholderLabel={t.common.portraitPlaceholder} className="aspect-[4/5] w-full" />
            <div className="absolute -bottom-5 -end-5 hidden h-24 w-24 border-b border-e border-champagne-light sm:block" aria-hidden="true" />
          </div>
          <div>
            <Eyebrow light>{t.intro.eyebrow}</Eyebrow>
            <h2 id="intro-title" className="display text-[2.4rem] text-white sm:text-[3.2rem]">{t.intro.title}</h2>
            <div className="mt-8 space-y-5 text-[1.12rem] text-mist">
              <p>{advisor.bioShort[locale]}</p>
            </div>
            <figure className="mt-10 border-s-2 border-champagne-light ps-6">
              <Quote size={26} className="text-champagne-light rtl:-scale-x-100" aria-hidden="true" />
              <blockquote className="display mt-3 text-[1.8rem] leading-snug text-white sm:text-[2.1rem]" style={{ fontStyle: locale === "ar" ? "normal" : "italic" }}>
                {t.intro.quote}
              </blockquote>
              <figcaption className="mt-4 font-semibold text-champagne-light">— {name}</figcaption>
            </figure>
            <Link href={href(locale, "about")} className="btn btn-ghost-light mt-10">
              {t.intro.cta} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      {/* 5. Beratung in drei Sprachen */}
      <Section labelledBy="lang-title">
        <div className="max-w-3xl">
          <Eyebrow>{t.languages.eyebrow}</Eyebrow>
          <h2 id="lang-title" className="display text-[2.4rem] text-navy sm:text-[3.3rem]">{t.languages.title}</h2>
          <p className="mt-6 text-muted">{t.languages.text}</p>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-soft)] border border-line bg-line md:grid-cols-3">
          {t.languages.items.map((l) => {
            const code = l.lang === "العربية" ? "ar" : l.lang === "English" ? "en" : "de";
            return (
              <li key={l.lang} lang={code} dir={code === "ar" ? "rtl" : "ltr"} className="bg-paper p-8 sm:p-10">
                <p className="text-[2.6rem] leading-none text-navy sm:text-[3rem]" style={{ fontFamily: code === "ar" ? "var(--font-arabic)" : "var(--font-serif)", fontWeight: code === "ar" ? 600 : 500 }}>{l.lang}</p>
                <p className="mt-4 text-muted" style={code === "ar" ? { fontFamily: "var(--font-arabic)" } : { fontFamily: "var(--font-sans)" }}>{l.text}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-muted">{t.languages.note}</p>
      </Section>

      {/* 6. Interaktiver Rentenlücke-Rechner */}
      <Section tone="sand" labelledBy="tools-title">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{t.toolsTeaser.eyebrow}</Eyebrow>
            <h2 id="tools-title" className="display text-[2.4rem] text-navy sm:text-[3.3rem]">{t.toolsTeaser.title}</h2>
          </div>
          <div className="lg:pb-3">
            <p className="text-muted">{t.toolsTeaser.text}</p>
            <Link href={href(locale, "tools")} className="link mt-3 inline-flex min-h-11 items-center gap-2 font-semibold">{t.toolsTeaser.more} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" /></Link>
          </div>
        </div>
        <PensionGap locale={locale} t={t.calc} compact />
      </Section>

      {/* 7. Warum persönliche Beratung */}
      <Section labelledBy="why-title">
        <div className="max-w-3xl">
          <Eyebrow>{t.why.eyebrow}</Eyebrow>
          <h2 id="why-title" className="display text-[2.4rem] text-navy sm:text-[3.3rem]">{t.why.title}</h2>
        </div>
        <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((w, i) => (
            <li key={w.title} className="border-t border-navy pt-6">
              <p className="display text-[1.3rem] text-brass" aria-hidden="true">0{i + 1}</p>
              <h3 className="mt-3 text-[1.25rem] font-bold text-navy">{w.title}</h3>
              <p className="mt-3 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. Ablauf */}
      <Section tone="navy" labelledBy="process-title">
        <div className="max-w-3xl">
          <Eyebrow light>{t.process.eyebrow}</Eyebrow>
          <h2 id="process-title" className="display text-[2.4rem] text-white sm:text-[3.3rem]">{t.process.title}</h2>
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-champagne-light text-[1.3rem] font-semibold text-champagne-light" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-6 text-[1.25rem] font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-mist">{s.text}</p>
            </li>
          ))}
        </ol>
        <Link href={href(locale, "contact")} className="btn btn-gold mt-14" data-track="cta_process">
          <CalendarCheck size={20} aria-hidden="true" /> {t.common.book}
        </Link>
      </Section>

      {/* 9. Privat & Unternehmen */}
      <Section labelledBy="split-title">
        <h2 id="split-title" className="sr-only">{t.split.private.eyebrow} / {t.split.business.eyebrow}</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {(["private", "business"] as const).map((k) => (
            <Link key={k} href={href(locale, k)} className={`group flex min-h-[340px] flex-col justify-between rounded-[var(--radius-soft)] p-8 transition-all duration-300 sm:p-12 ${k === "private" ? "bg-sand text-navy hover:bg-[#e8e1d2]" : "navy-surface text-white"}`}>
              <div>
                <p className={`tracking-label text-[0.8rem] font-semibold ${k === "private" ? "text-brass" : "text-champagne-light"}`}>{t.split[k].eyebrow}</p>
                <h3 className="display mt-5 text-[2.3rem] sm:text-[2.8rem]">{t.split[k].title}</h3>
                <p className={`mt-4 max-w-md ${k === "private" ? "text-muted" : "text-mist"}`}>{t.split[k].text}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-3 font-semibold">
                {t.split[k].cta}
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${k === "private" ? "border-navy" : "border-white/60"}`}>
                  <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Bewertungen – nur mit echten, freigegebenen Bewertungen */}
      {reviews.length > 0 && (
        <Section tone="sand" labelledBy="reviews-title">
          <Eyebrow>{t.reviews.eyebrow}</Eyebrow>
          <h2 id="reviews-title" className="display text-[2.4rem] text-navy sm:text-[3.3rem]">{t.reviews.title}</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.author + r.date} className="rounded-[var(--radius-soft)] bg-paper p-8">
                <blockquote className="text-ink">„{r.text[locale]}“</blockquote>
                <p className="mt-5 font-semibold text-navy">{r.author}</p>
                <p className="text-[0.9rem] text-muted">{r.source}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 10. FAQ */}
      <Section tone="paper" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
            <h2 id="faq-title" className="display text-[2.4rem] text-navy sm:text-[3rem]">{t.faq.title}</h2>
          </div>
          <Faq items={t.faq.items} />
        </div>
      </Section>

      {/* 11. Standort + Termin (abschließende Handlungsaufforderung) */}
      <Section id="termin" tone="sand" labelledBy="final-title">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>{t.finalCta.eyebrow}</Eyebrow>
            <h2 id="final-title" className="display text-[2.6rem] text-navy sm:text-[3.4rem]">{t.finalCta.title}</h2>
            <p className="mt-5 text-muted">{t.finalCta.text}</p>
            <div className="mt-10">
              <h3 className="mb-5 text-[1.2rem] font-bold text-navy">{t.location.title}</h3>
              <ContactBlock locale={locale} t={t} />
            </div>
          </div>
          <div className="lg:self-start"><LeadForm locale={locale} t={t.form} modes={formModes()} isPreview={isPreview} phone={advisor.phone} phoneDisplay={advisor.phoneDisplay} backLabel={t.common.back} idPrefix="home-lead" /></div>
        </div>
      </Section>
    </>
  );
}
