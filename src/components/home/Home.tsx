import Link from "next/link";
import { ArrowRight, MapPin, Phone, Building2, CalendarCheck, Plus, ExternalLink, Clock, ShieldCheck, Languages, UserRound, Scale, Car, HeartHandshake, Hand } from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName, teamLanguages, type Advisor } from "@/config/advisors";
import { href, languageNames, serviceKeys, teamHref, type Locale, type ServiceKey, type ExtraKey, extraKeys } from "@/lib/i18n";
import type { Dict } from "@/content";
import { isPreview } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { Finder } from "./Finder";
import { PensionGap } from "@/components/calculators/Calculators";
import { LeadForm } from "@/components/forms/LeadForm";

export function formModes() {
  const m: ("office" | "phone" | "video" | "callback")[] = [];
  if (company.consultationModes.office) m.push("office");
  if (company.consultationModes.phone) m.push("phone");
  if (company.consultationModes.video) m.push("video");
  m.push("callback");
  return m;
}

export const initials = (a: Advisor) => `${a.firstName[0]}${a.lastName[0]}`;

/** Sprach-Chips */
export function LangChips({ langs, light = false }: { langs: Locale[]; light?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {langs.map((l) => (
        <li key={l} lang={l} className={`rounded-full border px-2.5 py-0.5 text-[0.85rem] font-semibold ${light ? "border-white/30 text-white" : "border-line bg-ivory text-navy"}`}
          style={l === "ar" ? { fontFamily: "var(--font-arabic)" } : undefined}>
          {languageNames[l].native}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ Hero */
function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const team = activeAdvisors();
  return (
    <section className="relative overflow-hidden bg-ivory" aria-labelledby="hero-title">
      <svg className="pointer-events-none absolute -end-48 -top-24 hidden h-[760px] w-[760px] text-line lg:block" viewBox="0 0 600 600" aria-hidden="true">
        <circle cx="300" cy="300" r="299" fill="none" stroke="currentColor" />
        <ellipse cx="300" cy="300" rx="140" ry="299" fill="none" stroke="currentColor" />
        <line x1="0" y1="300" x2="600" y2="300" stroke="currentColor" />
      </svg>
      <Container className="relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-24 lg:pt-16">
        <div>
          <p className="reveal tracking-label flex items-center gap-3 text-[0.78rem] font-semibold text-brass sm:text-[0.82rem]">
            <span className="gold-rule" aria-hidden="true" /> {company.name}
          </p>
          <h1 id="hero-title" className="display reveal reveal-delay-1 mt-6 text-[2.75rem] text-navy sm:text-[3.9rem] lg:text-[4.4rem] xl:text-[4.9rem]">
            {t.hero.titleA}{" "}
            <em className="block text-brass" style={{ fontStyle: locale === "ar" ? "normal" : "italic" }}>{t.hero.titleB}</em>
          </h1>
          <p className="reveal reveal-delay-2 mt-7 max-w-[36rem] text-[1.12rem] leading-relaxed text-muted sm:text-[1.22rem]">{t.hero.subtitle}</p>

          <div className="reveal reveal-delay-2 mt-7 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-navy"><Languages size={18} className="text-brass" aria-hidden="true" /></span>
            <LangChips langs={teamLanguages()} />
          </div>

          <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={href(locale, "contact")} className="btn btn-primary" data-track="cta_hero"><CalendarCheck size={20} aria-hidden="true" /> {t.hero.primary}</Link>
            <a href="#anliegen" className="btn btn-ghost" data-track="cta_hero_finder">{t.hero.secondary} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></a>
          </div>

          <ul className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-muted">
            {t.hero.trust.map((x, i) => (
              <li key={x} className="flex items-center gap-2">
                {i === 0 ? <UserRound size={17} className="text-brass" aria-hidden="true" /> : i === 1 ? <MapPin size={17} className="text-brass" aria-hidden="true" /> : <ShieldCheck size={17} className="text-brass" aria-hidden="true" />} {x}
              </li>
            ))}
          </ul>
        </div>

        {/* Team-Visual: echte Menschen hinter der Marke */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <p className="tracking-label mb-4 text-[0.75rem] font-semibold text-brass">{t.hero.teamLabel}</p>
          <div className="grid grid-cols-2 gap-4">
            {team.slice(0, 2).map((a, i) => (
              <Link key={a.id} href={teamHref(locale, a.slug)} className={`group block ${i === 1 ? "sm:mt-12" : ""}`} data-track={`hero_advisor_${a.slug}`}>
                <div className="relative">
                  <Portrait src={a.portrait} alt={advisorName(a, locale)} initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} priority className="aspect-[3/4] w-full transition-transform duration-500 group-hover:-translate-y-1" sizes="(min-width:1024px) 250px, 45vw" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/40 to-transparent p-3 pt-10 sm:p-4 sm:pt-14">
                    <p className="display text-[1.25rem] leading-tight text-white sm:text-[1.5rem]">{advisorName(a, locale)}</p>
                    <p className="mt-1 text-[0.78rem] font-semibold tracking-wide text-champagne-light" dir="ltr">{a.languages.map((l) => languageNames[l].short).join(" · ")}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
            <MapPin size={20} className="text-brass" aria-hidden="true" />
            <div>
              <p className="font-semibold text-navy">{company.office.street}</p>
              <p className="text-[0.9rem] text-muted">{company.office.postalCode} {company.office.cityLocalized[locale]}</p>
            </div>
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
      {keys.map((k) => (
        <li key={k} className="border-b border-line">
          <Link href={href(locale, k)} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 sm:gap-8 sm:py-8">
            <span className="display text-[1.3rem] text-brass sm:text-[1.6rem]" aria-hidden="true">0{serviceKeys.indexOf(k) + 1}</span>
            <span className="min-w-0">
              <span className="display block text-[1.6rem] leading-tight text-navy transition-colors group-hover:text-brass sm:text-[2.1rem]">{t.services.items[k].title}</span>
              <span className="mt-1.5 block max-w-2xl text-muted">{t.services.items[k].short}</span>
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

export const extraIcons: Record<ExtraKey, typeof Scale> = { legal: Scale, assistance: Car, care: HeartHandshake, basic: Hand };

export function ExtrasStrip({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <div className="mt-12">
      <p className="tracking-label text-[0.78rem] font-semibold text-brass">{t.services.extrasTitle}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {extraKeys.map((k) => {
          const Icon = extraIcons[k];
          return (
            <li key={k}>
              <Link href={href(locale, "extras", undefined, k)} className="flex h-full items-center gap-3 rounded-[var(--radius-soft)] border border-line bg-paper p-4 hover:border-navy/50">
                <Icon size={22} className="shrink-0 text-brass" aria-hidden="true" />
                <span className="min-w-0 font-semibold text-navy">{t.extras.items[k].title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href={href(locale, "extras")} className="link mt-4 inline-flex min-h-11 items-center gap-2 font-semibold">{t.services.extrasLink} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" /></Link>
    </div>
  );
}

/* ------------------------------------------------------------- Team */
export function AdvisorCard({ a, locale, t, compact = false }: { a: Advisor; locale: Locale; t: Dict; compact?: boolean }) {
  const name = advisorName(a, locale);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-soft)] border border-line bg-paper">
      <Link href={teamHref(locale, a.slug)} className="block" tabIndex={-1} aria-hidden="true">
        <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} className={`${compact ? "aspect-[4/3]" : "aspect-[4/4]"} w-full`} sizes="(min-width:1024px) 420px, 90vw" />
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="display text-[1.9rem] leading-tight text-navy"><Link href={teamHref(locale, a.slug)} className="hover:text-brass">{name}</Link></h3>
        <p className="mt-1 text-[0.95rem] font-semibold text-brass">{a.position ? a.position[locale] : t.team.positionFallback}</p>
        <p className="mt-4 text-muted">{a.short[locale]}</p>
        <div className="mt-5">
          <p className="mb-2 text-[0.85rem] font-semibold text-navy">{t.team.languages}</p>
          <LangChips langs={a.languages} />
        </div>
        {!compact && (
          <div className="mt-4">
            <p className="mb-2 text-[0.85rem] font-semibold text-navy">{t.team.focus}</p>
            <p className="text-[0.95rem] text-muted">{a.focus.filter((f) => (serviceKeys as readonly string[]).includes(f)).map((f) => t.services.items[f as ServiceKey].title).join(" · ")}</p>
          </div>
        )}
        <div className="mt-auto flex flex-col gap-2 pt-7 sm:flex-row">
          <Link href={teamHref(locale, a.slug)} className="btn btn-ghost !min-h-12 flex-1 !px-4 !text-base" data-track={`team_meet_${a.slug}`}>{t.team.meet}</Link>
          <Link href={`${teamHref(locale, a.slug)}#termin`} className="btn btn-primary !min-h-12 flex-1 !px-4 !text-base" data-track={`team_book_${a.slug}`}>{t.team.book}</Link>
        </div>
      </div>
    </article>
  );
}

export function TeamSection({ locale, t, tone = "paper" as "paper" | "sand" | "ivory" }: { locale: Locale; t: Dict; tone?: "paper" | "sand" | "ivory" }) {
  const team = activeAdvisors();
  return (
    <Section id="team" tone={tone} labelledBy="team-title">
      <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <Eyebrow>{t.team.eyebrow}</Eyebrow>
          <h2 id="team-title" className="display text-[2.4rem] text-navy sm:text-[3.3rem]">{t.team.title}</h2>
        </div>
        <p className="text-[1.12rem] text-muted lg:pb-3">{t.team.intro}</p>
      </div>
      <div className={`grid gap-6 ${team.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {team.map((a) => <AdvisorCard key={a.id} a={a} locale={locale} t={t} />)}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- FAQ */
export function Faq({ items, idPrefix = "faq" }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <details key={f.q} className="group" id={`${idPrefix}-${i}`}>
          <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-start">
            <span className="text-[1.12rem] font-semibold text-navy sm:text-[1.22rem]">{f.q}</span>
            <span className="faq-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-transform duration-300"><Plus size={20} aria-hidden="true" /></span>
          </summary>
          <p className="max-w-3xl pb-7 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* --------------------------------------------------------- Contact box */
export function ContactBlock({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <div className="space-y-4">
      {company.phone && (
        <a href={`tel:${company.phone}`} className="flex items-center gap-5 rounded-[var(--radius-soft)] border border-line bg-paper p-5 transition-colors hover:border-navy" data-track="call_contactblock">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-white"><Phone size={22} aria-hidden="true" /></span>
          <span><span className="block text-[0.95rem] text-muted">{t.common.phoneLabel}</span><span className="ltr-nums block text-[1.35rem] font-bold text-navy">{company.phoneDisplay}</span></span>
        </a>
      )}
      <div className="flex items-start gap-5 rounded-[var(--radius-soft)] border border-line bg-paper p-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand text-brass"><Building2 size={22} aria-hidden="true" /></span>
        <div>
          <p className="text-[0.95rem] text-muted">{t.common.addressLabel}</p>
          <address className="font-semibold not-italic text-navy">{company.name}<br />{company.office.street}<br />{company.office.postalCode} {company.office.cityLocalized[locale]}</address>
          <a href={company.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-flex min-h-11 items-center gap-1.5 text-[0.98rem]" data-track="map_link">
            {t.common.directions} <ExternalLink size={15} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span>
          </a>
        </div>
      </div>
      <div className="flex items-start gap-5 rounded-[var(--radius-soft)] border border-line bg-paper p-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand text-brass"><Clock size={22} aria-hidden="true" /></span>
        <div>
          <p className="text-[0.95rem] text-muted">{t.common.hoursLabel}</p>
          <p className="font-semibold text-navy">{company.openingHours ? company.openingHours[locale] : t.common.byAppointment}</p>
          <div className="mt-2"><LangChips langs={teamLanguages()} /></div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Page */
export function HomePage({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <>
      <Hero locale={locale} t={t} />

      <Section id="anliegen" tone="sand" labelledBy="finder-title">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{t.finder.eyebrow}</Eyebrow>
            <h2 id="finder-title" className="display text-[2.6rem] text-navy sm:text-[3.6rem]">{t.finder.title}</h2>
          </div>
          <p className="text-[1.12rem] text-muted lg:pb-3">{t.finder.intro}</p>
        </div>
        <Finder locale={locale} t={t.finder} learnMore={t.common.learnMore} />
      </Section>

      <Section labelledBy="services-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 id="services-title" className="display text-[2.6rem] text-navy sm:text-[3.3rem]">{t.services.title}</h2>
            <p className="mt-6 text-muted">{t.services.intro}</p>
          </div>
          <div>
            <ServiceList locale={locale} t={t} />
            <ExtrasStrip locale={locale} t={t} />
          </div>
        </div>
      </Section>

      <TeamSection locale={locale} t={t} tone="sand" />

      <Section tone="navy" labelledBy="lang-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow light>{t.languages.eyebrow}</Eyebrow>
            <h2 id="lang-title" className="display text-[2.4rem] text-white sm:text-[3.2rem]">{t.languages.title}</h2>
            <p className="mt-6 text-mist">{t.languages.text}</p>
            <p className="mt-4 text-champagne-light">{t.languages.note}</p>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-soft)] border border-line-dark bg-line-dark">
            {teamLanguages().map((l) => (
              <li key={l} lang={l} className="bg-navy p-7 sm:p-9">
                <p className="text-[2.1rem] leading-none text-white sm:text-[2.6rem]" style={{ fontFamily: l === "ar" ? "var(--font-arabic)" : "var(--font-serif)", fontWeight: l === "ar" ? 600 : 500 }}>{languageNames[l].native}</p>
                <p className="mt-3 text-[0.85rem] font-semibold tracking-wide text-champagne-light" dir="ltr">
                  {activeAdvisors().filter((a) => a.languages.includes(l)).map((a) => a.firstName).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

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

      <Section labelledBy="why-title">
        <div className="max-w-3xl">
          <Eyebrow>{t.why.eyebrow}</Eyebrow>
          <h2 id="why-title" className="display text-[2.4rem] text-navy sm:text-[3.3rem]">{t.why.title}</h2>
        </div>
        <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((w, i) => (
            <li key={w.title} className="border-t border-navy pt-6">
              <p className="display text-[1.3rem] text-brass" aria-hidden="true">0{i + 1}</p>
              <h3 className="mt-3 text-[1.22rem] font-bold text-navy">{w.title}</h3>
              <p className="mt-3 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="navy" labelledBy="process-title">
        <div className="max-w-3xl">
          <Eyebrow light>{t.process.eyebrow}</Eyebrow>
          <h2 id="process-title" className="display text-[2.4rem] text-white sm:text-[3.3rem]">{t.process.title}</h2>
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((s, i) => (
            <li key={s.title}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-champagne-light text-[1.3rem] font-semibold text-champagne-light" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-6 text-[1.22rem] font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-mist">{s.text}</p>
            </li>
          ))}
        </ol>
        <Link href={href(locale, "contact")} className="btn btn-gold mt-14" data-track="cta_process"><CalendarCheck size={20} aria-hidden="true" /> {t.common.book}</Link>
      </Section>

      <Section labelledBy="split-title">
        <h2 id="split-title" className="sr-only">{t.split.private.eyebrow} / {t.split.business.eyebrow}</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {(["private", "business"] as const).map((k) => (
            <Link key={k} href={href(locale, k)} className={`group flex min-h-[320px] flex-col justify-between rounded-[var(--radius-soft)] p-8 transition-all duration-300 sm:p-12 ${k === "private" ? "bg-sand text-navy hover:bg-[#e8e1d2]" : "navy-surface text-white"}`}>
              <div>
                <p className={`tracking-label text-[0.8rem] font-semibold ${k === "private" ? "text-brass" : "text-champagne-light"}`}>{t.split[k].eyebrow}</p>
                <h3 className="display mt-5 text-[2.3rem] sm:text-[2.8rem]">{t.split[k].title}</h3>
                <p className={`mt-4 max-w-md ${k === "private" ? "text-muted" : "text-mist"}`}>{t.split[k].text}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-3 font-semibold">
                {t.split[k].cta}
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${k === "private" ? "border-navy" : "border-white/60"}`}><ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="paper" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
            <h2 id="faq-title" className="display text-[2.4rem] text-navy sm:text-[3rem]">{t.faq.title}</h2>
          </div>
          <Faq items={t.faq.items} />
        </div>
      </Section>

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
          <div className="lg:self-start">
            <LeadForm locale={locale} t={t.form} modes={formModes()} isPreview={isPreview} phone={company.phone} phoneDisplay={company.phoneDisplay} backLabel={t.common.back} idPrefix="home-lead" />
          </div>
        </div>
      </Section>
    </>
  );
}
