import Link from "next/link";
import {
  ArrowRight, MapPin, Phone, Building2, Plus, ExternalLink, Clock, Users, HeartHandshake, Sunset, Baby, Briefcase, HeartPulse,
  Landmark, Stethoscope, Scale, Car, Hand, Check, PhoneIncoming, Languages,
} from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName, teamLanguages, type Advisor } from "@/config/advisors";
import { extraKeys, href, languageNames, serviceKeys, teamHref, type ExtraKey, type Locale, type ServiceKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { Container, Section } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";

export function formModes() {
  const m: ("office" | "phone" | "video" | "callback")[] = [];
  if (company.consultationModes.office) m.push("office");
  if (company.consultationModes.phone) m.push("phone");
  if (company.consultationModes.video) m.push("video");
  m.push("callback");
  return m;
}

export const initials = (a: Advisor) => `${a.firstName[0]}${a.lastName[0]}`;
export const serviceIcons: Record<ServiceKey, typeof Sunset> = { retirement: Sunset, kids: Baby, bu: Briefcase, pkv: HeartPulse, bav: Landmark, bkv: Stethoscope };
export const extraIcons: Record<ExtraKey, typeof Scale> = { legal: Scale, assistance: Car, care: HeartHandshake, basic: Hand };
const arrow = "rtl:rotate-180";

/** Sprach-Chips */
export function LangChips({ langs, light = false, short = false }: { langs: Locale[]; light?: boolean; short?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {langs.map((l) => (
        <li key={l} lang={l} className={`rounded-full border px-2.5 py-0.5 text-[0.82rem] font-semibold ${light ? "border-white/20 text-white" : "border-line bg-paper text-navy"}`}
          style={l === "ar" ? { fontFamily: "var(--font-arabic)" } : undefined}>
          {short ? languageNames[l].short : languageNames[l].native}
        </li>
      ))}
    </ul>
  );
}

/** Kopf eines Abschnitts: Titel + optionaler Link rechts */
export function SectionHead({ title, link, id }: { title: string; link?: { href: string; label: string }; id?: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-9">
      <h2 id={id} className="display text-[1.65rem] text-navy sm:text-[2.2rem]">{title}</h2>
      {link && <Link href={link.href} className="link inline-flex min-h-11 items-center gap-1.5 text-[0.95rem]">{link.label} <ArrowRight size={16} className={arrow} aria-hidden="true" /></Link>}
    </div>
  );
}

/* ================================================================== Hero */
function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const team = activeAdvisors();
  return (
    <section className="navy-surface on-dark text-white" aria-labelledby="hero-title">
      <Container className="grid items-center gap-10 pb-12 pt-8 sm:pb-16 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-20 lg:pt-16">
        <div>
          <h1 id="hero-title" className="display reveal text-[2.05rem] sm:text-[3rem] lg:text-[3.5rem]">
            {t.home.titleA} <span className="text-champagne-light">{t.home.titleB}</span>
          </h1>
          <p className="reveal reveal-delay-1 mt-4 max-w-xl text-[1.05rem] text-mist sm:mt-5 sm:text-[1.15rem]">{t.home.subtitle}</p>
          <div className="reveal reveal-delay-2 mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row">
            <Link href={href(locale, "contact")} className="btn btn-gold" data-track="cta_hero">{t.home.primary} <ArrowRight size={18} className={arrow} aria-hidden="true" /></Link>
            {company.phone && <a href={`tel:${company.phone}`} className="btn btn-ghost-light" data-track="call_hero"><Phone size={18} aria-hidden="true" /> {t.home.call}</a>}
          </div>
          <div className="reveal reveal-delay-3 mt-6 flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-[0.88rem] text-mist"><Languages size={16} aria-hidden="true" /> {t.home.langLabel}</span>
            <LangChips langs={teamLanguages()} light />
          </div>

          {/* Mobil: Berater kompakt im ersten Bildschirm */}
          <Link href={href(locale, "about")} className="mt-6 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.04] p-3 lg:hidden" data-track="hero_team_mobile">
            <span className="flex shrink-0 -space-x-3 rtl:space-x-reverse">
              {team.slice(0, 3).map((a) => <Portrait key={a.id} src={a.portrait} alt="" initials={initials(a)} placeholderLabel="" className="h-12 w-12 rounded-full ring-2 ring-navy-deep" sizes="48px" />)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.8rem] text-mist">{t.home.advisorsLabel}</span>
              <span className="block truncate font-semibold">{team.map((a) => advisorName(a, locale).split(" ")[0]).join(" & ")}</span>
            </span>
            <ArrowRight size={18} className={`shrink-0 text-champagne-light ${arrow}`} aria-hidden="true" />
          </Link>
        </div>

        {/* Desktop: echte Berater im Bild */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            {team.slice(0, 2).map((a, i) => (
              <Link key={a.id} href={teamHref(locale, a.slug)} className={`group relative block overflow-hidden rounded-2xl ${i === 1 ? "mt-10" : ""}`} data-track={`hero_advisor_${a.slug}`}>
                <Portrait src={a.portrait} alt={advisorName(a, locale)} initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} className="aspect-[4/5] w-full" sizes="280px" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent p-4 pt-12">
                  <span className="block font-semibold">{advisorName(a, locale)}</span>
                  <span className="block text-[0.8rem] font-semibold tracking-wide text-champagne-light" dir="ltr">{a.languages.map((l) => languageNames[l].short).join(" · ")}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[0.9rem] font-semibold text-white">
            <MapPin size={16} className="text-champagne-light" aria-hidden="true" /> {company.office.street}, {company.office.postalCode} {company.office.cityLocalized[locale]}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ================================================== Privat / Unternehmen */
function HelpChooser({ locale, t }: { locale: Locale; t: Dict }) {
  const items = [
    { k: "private" as const, icon: HeartHandshake, d: t.home.private },
    { k: "business" as const, icon: Users, d: t.home.business },
  ];
  return (
    <Section tone="ivory" labelledBy="help-title" compact>
      <SectionHead id="help-title" title={t.home.helpTitle} />
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {items.map(({ k, icon: Icon, d }) => (
          <Link key={k} href={href(locale, k)} className="card card-hover group flex items-start gap-4 p-5 sm:p-7" data-track={`help_${k}`}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sand text-brass"><Icon size={24} aria-hidden="true" /></span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-3">
                <span className="text-[1.15rem] font-semibold text-navy sm:text-[1.3rem]">{d.title}</span>
                <ArrowRight size={20} className={`shrink-0 text-navy transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${arrow}`} aria-hidden="true" />
              </span>
              <span className="mt-1 block text-[0.98rem] text-muted">{d.text}</span>
              <span className="mt-3 flex flex-wrap gap-1.5">
                {d.chips.map((c) => <span key={c} className="rounded-full bg-ivory px-2.5 py-0.5 text-[0.8rem] font-medium text-navy">{c}</span>)}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ====================================================== Lösungen (6) */
export function SolutionsGrid({ locale, t, keys = [...serviceKeys] }: { locale: Locale; t: Dict; keys?: ServiceKey[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
      {keys.map((k) => {
        const Icon = serviceIcons[k];
        return (
          <li key={k}>
            <Link href={href(locale, k)} className="card card-hover group flex h-full items-center gap-4 p-4 sm:items-start sm:p-6" data-track={`solution_${k}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-champagne-light"><Icon size={22} aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug text-navy sm:text-[1.1rem]">{t.services.items[k].title}</span>
                <span className="mt-0.5 block text-[0.9rem] leading-snug text-muted">{t.services.items[k].short}</span>
              </span>
              <ArrowRight size={18} className={`shrink-0 text-navy/60 transition-transform group-hover:translate-x-1 sm:hidden ${arrow}`} aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
/** Kompatibilität für Unterseiten */
export const ServiceList = SolutionsGrid;

export function ExtrasStrip({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      {extraKeys.map((k) => {
        const Icon = extraIcons[k];
        return (
          <li key={k}>
            <Link href={href(locale, "extras", undefined, k)} className="flex h-full min-h-12 items-center gap-2.5 rounded-xl border border-line bg-paper px-3 py-2.5 text-[0.92rem] font-semibold text-navy hover:border-navy/40">
              <Icon size={18} className="shrink-0 text-brass" aria-hidden="true" /> <span lang={locale} className="min-w-0 hyphens-auto [overflow-wrap:anywhere]">{t.extras.items[k].title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ================================================================ Team */
export function AdvisorCard({ a, locale, t, compact = false }: { a: Advisor; locale: Locale; t: Dict; compact?: boolean }) {
  const name = advisorName(a, locale);
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={teamHref(locale, a.slug)} className="block" tabIndex={-1} aria-hidden="true">
        <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} className="aspect-[4/5] w-full" sizes="(min-width:1024px) 300px, 45vw" />
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h3 className="font-semibold leading-tight text-navy sm:text-[1.15rem]"><Link href={teamHref(locale, a.slug)} className="hover:text-brass">{name}</Link></h3>
        {!compact && <p className="mt-1 hidden text-[0.9rem] text-muted sm:block">{a.short[locale]}</p>}
        <p className="mt-2 text-[0.78rem] font-bold tracking-wide text-brass" dir="ltr">{a.languages.map((l) => languageNames[l].short).join(" · ")}</p>
        <Link href={`${teamHref(locale, a.slug)}#termin`} className="link mt-auto inline-flex min-h-11 items-center gap-1 pt-2 text-[0.9rem]" data-track={`team_book_${a.slug}`}>
          {t.team.meet} <ArrowRight size={15} className={arrow} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function TeamSection({ locale, t, tone = "ivory" }: { locale: Locale; t: Dict; tone?: "paper" | "sand" | "ivory" }) {
  const team = activeAdvisors();
  return (
    <Section id="team" tone={tone} labelledBy="team-title" compact>
      <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <p className="tracking-label mb-3 text-[0.78rem] font-bold text-brass">{t.team.eyebrow}</p>
          <h2 id="team-title" className="display text-[1.65rem] text-navy sm:text-[2.2rem]">{t.home.teamTitle}</h2>
          <p className="mt-3 text-muted">{t.home.teamText}</p>
          <Link href={href(locale, "about")} className="link mt-4 inline-flex min-h-11 items-center gap-1.5">{t.home.teamLink} <ArrowRight size={16} className={arrow} aria-hidden="true" /></Link>
        </div>
        <div className={`grid gap-3 sm:gap-4 lg:ms-auto lg:max-w-[560px] ${team.length > 2 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
          {team.map((a) => <AdvisorCard key={a.id} a={a} locale={locale} t={t} />)}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================ Ablauf */
function Steps({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <Section tone="paper" labelledBy="steps-title" compact>
      <SectionHead id="steps-title" title={t.home.stepsTitle} />
      <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
        {t.home.steps.map((s, i) => (
          <li key={s.t} className="flex gap-4 rounded-2xl bg-ivory p-4 sm:p-6 md:flex-col md:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-semibold text-champagne-light" aria-hidden="true">{i + 1}</span>
            <span>
              <span className="block font-semibold text-navy sm:text-[1.1rem]">{s.t}</span>
              <span className="mt-0.5 block text-[0.95rem] text-muted">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] font-medium text-navy">
        {t.home.facts.map((f) => <li key={f} className="flex items-center gap-1.5"><Check size={16} className="text-success" aria-hidden="true" /> {f}</li>)}
      </ul>
    </Section>
  );
}

/* =========================================================== Abschluss */
export function Closing({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="navy-surface on-dark text-white" aria-labelledby="closing-title">
      <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
        <div>
          <h2 id="closing-title" className="display text-[1.9rem] sm:text-[2.6rem]">{t.home.closingTitle}</h2>
          <p className="mt-3 max-w-xl text-mist">{t.home.closingText}</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link href={href(locale, "contact")} className="btn btn-gold" data-track="cta_closing">{t.home.primary} <ArrowRight size={18} className={arrow} aria-hidden="true" /></Link>
            <Link href={href(locale, "contact", { mode: "callback" })} className="btn btn-ghost-light" data-track="cta_callback"><PhoneIncoming size={18} aria-hidden="true" /> {t.home.callback}</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6">
          {company.phone && (
            <a href={`tel:${company.phone}`} className="flex items-center gap-3 border-b border-white/10 pb-4" data-track="call_closing">
              <Phone size={20} className="text-champagne-light" aria-hidden="true" />
              <span className="ltr-nums text-[1.2rem] font-semibold">{company.phoneDisplay}</span>
            </a>
          )}
          <div className="flex items-start gap-3 pt-4">
            <MapPin size={20} className="mt-0.5 shrink-0 text-champagne-light" aria-hidden="true" />
            <div>
              <p className="font-semibold">{company.office.street}, {company.office.postalCode} {company.office.cityLocalized[locale]}</p>
              <a href={company.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-flex min-h-11 items-center gap-1.5 text-[0.92rem]" data-track="map_link">
                {t.common.directions} <ExternalLink size={14} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================== FAQ */
export function Faq({ items, idPrefix = "faq" }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
      {items.map((f, i) => (
        <details key={f.q} className="group" id={`${idPrefix}-${i}`}>
          <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-start">
            <span className="font-semibold text-navy">{f.q}</span>
            <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory text-navy transition-transform"><Plus size={18} aria-hidden="true" /></span>
          </summary>
          <p className="px-5 pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ====================================================== Kontaktblock */
export function ContactBlock({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <div className="space-y-3">
      {company.phone && (
        <a href={`tel:${company.phone}`} className="card card-hover flex items-center gap-4 p-4" data-track="call_contactblock">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-champagne-light"><Phone size={20} aria-hidden="true" /></span>
          <span><span className="block text-[0.88rem] text-muted">{t.common.phoneLabel}</span><span className="ltr-nums block text-[1.2rem] font-bold text-navy">{company.phoneDisplay}</span></span>
        </a>
      )}
      <div className="card flex items-start gap-4 p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sand text-brass"><Building2 size={20} aria-hidden="true" /></span>
        <div>
          <p className="text-[0.88rem] text-muted">{t.common.addressLabel}</p>
          <address className="font-semibold not-italic text-navy">{company.office.street}, {company.office.postalCode} {company.office.cityLocalized[locale]}</address>
          <a href={company.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center gap-1.5 text-[0.92rem]" data-track="map_link">
            {t.common.directions} <ExternalLink size={14} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span>
          </a>
        </div>
      </div>
      <div className="card flex items-start gap-4 p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sand text-brass"><Clock size={20} aria-hidden="true" /></span>
        <div>
          <p className="text-[0.88rem] text-muted">{t.common.hoursLabel}</p>
          <p className="font-semibold text-navy">{company.openingHours ? company.openingHours[locale] : t.common.byAppointment}</p>
          <div className="mt-2"><LangChips langs={teamLanguages()} /></div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================ Seite */
export function HomePage({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <>
      <Hero locale={locale} t={t} />
      <HelpChooser locale={locale} t={t} />
      <Section tone="paper" labelledBy="solutions-title" compact>
        <SectionHead id="solutions-title" title={t.home.solutionsTitle} link={{ href: href(locale, "solutions"), label: t.home.solutionsLink }} />
        <SolutionsGrid locale={locale} t={t} />
        <p className="mt-5 text-[0.95rem] text-muted">
          {t.home.extrasLine}{" "}
          <Link href={href(locale, "extras")} className="link whitespace-nowrap">{t.common.learnMore}</Link>
        </p>
      </Section>
      <TeamSection locale={locale} t={t} />
      <Steps locale={locale} t={t} />
      <Closing locale={locale} t={t} />
    </>
  );
}
