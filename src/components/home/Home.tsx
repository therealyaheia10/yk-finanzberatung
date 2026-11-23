import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, MapPin, Phone, Building2, Plus, ExternalLink, Clock, Users, HeartHandshake, Sunset, Baby, Briefcase, HeartPulse,
  Landmark, Stethoscope, Scale, Car, Hand, Check, TrendingUp, Quote, Star,
} from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName, teamLanguages, type Advisor } from "@/config/advisors";
import { extraKeys, href, languageNames, serviceKeys, teamHref, type ExtraKey, type Locale, type RouteKey, type ServiceKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { isPreview } from "@/lib/site";
import { Container, Section } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { LangFlag, WhatsAppIcon } from "@/components/ui/Icons";
import { waLink } from "@/components/layout/MobileContactBar";

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
const d = (i: number) => ({ "data-reveal": "", style: { ["--d" as string]: `${i * 0.07}s` } });

/** Sprach-Chips mit Flagge */
export function LangChips({ langs, light = false, short = false }: { langs: Locale[]; light?: boolean; short?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {langs.map((l) => (
        <li key={l} lang={l} className={`inline-flex items-center gap-1.5 rounded-full border py-0.5 pe-2.5 ps-1 text-[0.82rem] font-semibold ${light ? "border-white/20 text-white" : "border-line bg-paper text-navy"}`}
          style={l === "ar" ? { fontFamily: "var(--font-arabic)" } : undefined}>
          <LangFlag l={l} size={18} /> {short ? languageNames[l].short : languageNames[l].native}
        </li>
      ))}
    </ul>
  );
}

export function WhatsAppButton({ t, className = "", track = "wa" }: { t: Dict; className?: string; track?: string }) {
  const wa = waLink(t.v3.waMessage);
  if (!wa) return null;
  return (
    <a href={wa} target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${className}`} data-track={track}>
      <WhatsAppIcon size={20} /> {t.v3.whatsapp}<span className="sr-only"> ({t.common.externalNote})</span>
    </a>
  );
}

export function SectionHead({ title, link, id, eyebrow }: { title: string; link?: { href: string; label: string }; id?: string; eyebrow?: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-9" data-reveal="">
      <div>
        {eyebrow && <p className="tracking-label mb-2 text-[0.78rem] font-bold text-brass">{eyebrow}</p>}
        <h2 id={id} className="display text-[1.65rem] text-navy sm:text-[2.2rem]">{title}</h2>
      </div>
      {link && <Link href={link.href} className="link inline-flex min-h-11 items-center gap-1.5 text-[0.95rem]">{link.label} <ArrowRight size={16} className={arrow} aria-hidden="true" /></Link>}
    </div>
  );
}

/* ================================================================== Hero */
function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const team = activeAdvisors();
  const order = company.teamPhotoOrder.map((s) => team.find((a) => a.slug === s)).filter(Boolean) as Advisor[];
  return (
    <section className="navy-surface on-dark overflow-hidden text-white" aria-labelledby="hero-title">
      <Container className="grid items-center gap-8 pb-12 pt-7 sm:pb-16 sm:pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-20 lg:pt-14">
        <div>
          <p className="reveal tracking-label text-[0.75rem] font-bold text-champagne-light">{t.v3.eyebrow}</p>
          <h1 id="hero-title" className="display reveal reveal-delay-1 mt-3 text-[1.75rem] hyphens-manual! sm:text-[2.5rem] lg:text-[2.8rem]">
            {t.v3.titleA} <span className="text-champagne-light">{t.v3.titleB}</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-4 max-w-xl text-[1.02rem] text-mist sm:text-[1.12rem]">{t.v3.subtitle}</p>
          <div className="reveal reveal-delay-2 mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link href={href(locale, "contact")} className="btn btn-gold" data-track="cta_hero">{t.v3.free} <ArrowRight size={18} className={arrow} aria-hidden="true" /></Link>
            <WhatsAppButton t={t} track="wa_hero" />
          </div>
          <div className="reveal reveal-delay-3 mt-6"><LangChips langs={teamLanguages()} light /></div>
        </div>

        <figure className="reveal reveal-delay-2 relative">
          <div className="zoom-img relative overflow-hidden rounded-[1.25rem] ring-1 ring-white/10">
            {company.teamPhoto && (
              <Image src={company.teamPhoto} alt={t.v3.teamPhotoAlt} width={1600} height={1067} priority sizes="(min-width:1024px) 620px, 100vw" className="h-auto w-full object-cover" />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-3 pt-12 sm:px-5 sm:pb-4">
              <ul className="grid grid-cols-3 text-center text-[0.78rem] font-semibold sm:text-[0.9rem]" dir="ltr">
                {order.map((a) => <li key={a.id}><Link href={teamHref(locale, a.slug)} className="hover:text-champagne-light">{advisorName(a, locale)}</Link></li>)}
              </ul>
            </div>
          </div>
          <figcaption className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[0.9rem] font-semibold">
            <MapPin size={16} className="text-champagne-light" aria-hidden="true" /> {company.office.street}, {company.office.postalCode} {company.office.cityLocalized[locale]}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

/* ====================================== Fragen, die Sie sich stellen */
function IssueArt({ kind }: { kind: "private" | "business" }) {
  const img = company.issueImages[kind];
  if (img) return <Image src={img} alt="" fill sizes="(min-width:768px) 600px, 100vw" className="object-cover" />;
  const Icons = kind === "private" ? [HeartHandshake, Baby, Sunset] : [Users, Landmark, Stethoscope];
  return (
    <div className={`absolute inset-0 flex items-center justify-center gap-4 ${kind === "private" ? "bg-[#e9e2d3]" : "bg-[#dfe2e4]"}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 160" preserveAspectRatio="none"><circle cx="330" cy="20" r="110" fill="none" stroke="#fff" strokeWidth="1.5" /><circle cx="60" cy="150" r="80" fill="none" stroke="#fff" strokeWidth="1.5" /></svg>
      {Icons.map((I, i) => (
        <span key={i} className={`relative flex items-center justify-center rounded-2xl bg-paper text-navy shadow-[0_10px_24px_-14px_rgba(17,21,25,.5)] ${i === 1 ? "h-16 w-16 -translate-y-2" : "h-12 w-12"}`}><I size={i === 1 ? 30 : 22} /></span>
      ))}
    </div>
  );
}

function Issues({ locale, t }: { locale: Locale; t: Dict }) {
  const cards = [
    { k: "private" as const, title: t.v3.issuesPrivate, items: t.v3.privateIssues, link: href(locale, "private") },
    { k: "business" as const, title: t.v3.issuesBusiness, items: t.v3.businessIssues, link: href(locale, "business") },
  ];
  return (
    <Section tone="ivory" labelledBy="issues-title" compact>
      <SectionHead id="issues-title" title={t.v3.issuesTitle} />
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c, ci) => (
          <article key={c.k} className="card lift overflow-hidden" {...d(ci)}>
            <div className="relative h-20 sm:h-36"><IssueArt kind={c.k} /></div>
            <div className="p-4 sm:p-6">
              <Link href={c.link} className="group flex items-center justify-between gap-3" data-track={`issues_${c.k}`}>
                <h3 className="text-[1.2rem] font-semibold text-navy sm:text-[1.35rem]">{c.title}</h3>
                <ArrowRight size={20} className={`shrink-0 text-navy transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${arrow}`} aria-hidden="true" />
              </Link>
              <ul className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                {c.items.map(([label, route], ii) => (
                  <li key={label} className={ii >= 4 ? "max-sm:hidden" : undefined}>
                    <Link href={href(locale, route as RouteKey)} className="inline-flex min-h-10 items-center rounded-full border border-line bg-ivory px-3.5 py-1.5 text-[0.92rem] font-medium text-navy transition-colors hover:border-navy hover:bg-paper" data-track={`issue_${route}`}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ======================================= Lösungen als Bubbles mit Icons */
type Bubble = { label: string; href: string; icon: typeof Sunset };
function bubbleGroups(locale: Locale, t: Dict): { title: string; items: Bubble[] }[] {
  const s = (k: ServiceKey): Bubble => ({ label: t.services.items[k].title, href: href(locale, k), icon: serviceIcons[k] });
  return [
    { title: t.v3.groupInvest, items: [s("retirement"), s("kids"), { label: t.v3.wealth, href: href(locale, "tools", undefined, "vermoegensaufbau"), icon: TrendingUp }] },
    { title: t.v3.groupInsure, items: [s("bu"), s("pkv"), ...extraKeys.map((k) => ({ label: t.extras.items[k].title, href: href(locale, "extras", undefined, k), icon: extraIcons[k] }))] },
    { title: t.v3.groupBusiness, items: [s("bav"), s("bkv")] },
  ];
}

export function SolutionBubbles({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      {bubbleGroups(locale, t).map((g, gi) => (
        <div key={g.title} {...d(gi)}>
          <h3 className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brass">{g.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {g.items.map(({ label, href: h, icon: I }) => (
              <li key={label}>
                <Link href={h} className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper py-1.5 pe-4 ps-1.5 text-[0.95rem] font-semibold text-navy transition-all hover:-translate-y-0.5 hover:border-navy hover:shadow-[0_10px_22px_-16px_rgba(17,21,25,.5)]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-champagne-light transition-colors group-hover:bg-champagne-light group-hover:text-navy"><I size={16} aria-hidden="true" /></span>
                  <span lang={locale} className="hyphens-auto">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Kompatibel für Unterseiten: Lösungen als Karten */
export function SolutionsGrid({ locale, t, keys = [...serviceKeys] }: { locale: Locale; t: Dict; keys?: ServiceKey[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
      {keys.map((k, i) => {
        const Icon = serviceIcons[k];
        return (
          <li key={k} {...d(i)}>
            <Link href={href(locale, k)} className="card lift group flex h-full items-center gap-4 p-4 sm:items-start sm:p-6" data-track={`solution_${k}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-champagne-light"><Icon size={22} aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug text-navy sm:text-[1.1rem]">{t.services.items[k].title}</span>
                <span className="mt-0.5 block text-[0.9rem] leading-snug text-muted">{t.services.items[k].short}</span>
              </span>
              <ArrowRight size={18} className={`shrink-0 text-navy/60 sm:hidden ${arrow}`} aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
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
    <article className="card lift group flex h-full flex-col overflow-hidden">
      <Link href={teamHref(locale, a.slug)} className="zoom-img block" tabIndex={-1} aria-hidden="true">
        <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} className="aspect-[4/5] w-full" sizes="(min-width:1024px) 240px, 60vw" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-tight text-navy sm:text-[1.08rem]"><Link href={teamHref(locale, a.slug)} className="hover:text-brass">{name}</Link></h3>
        {!compact && <p className="mt-1 line-clamp-3 text-[0.88rem] text-muted">{a.short[locale]}</p>}
        <div className="mt-2.5 flex gap-1">{a.languages.map((l) => <LangFlag key={l} l={l} size={18} />)}</div>
        <Link href={`${teamHref(locale, a.slug)}#termin`} className="link mt-auto inline-flex min-h-11 items-center gap-1 pt-2 text-[0.9rem]" data-track={`team_book_${a.slug}`}>
          {t.team.meet} <ArrowRight size={15} className={arrow} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function TeamSection({ locale, t, tone = "paper" }: { locale: Locale; t: Dict; tone?: "paper" | "sand" | "ivory" }) {
  const team = activeAdvisors();
  return (
    <Section id="team" tone={tone} labelledBy="team-title" compact>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
        <div data-reveal="">
          <p className="tracking-label mb-2 text-[0.78rem] font-bold text-brass">{t.team.eyebrow}</p>
          <h2 id="team-title" className="display text-[1.65rem] text-navy sm:text-[2.2rem]">{t.v3.teamTitle}</h2>
          <p className="mt-3 text-muted">{t.v3.teamText}</p>
          <p className="mt-5 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-navy sm:mt-6">{t.v3.howTitle}</p>
          <ol className="mt-3 grid grid-cols-3 gap-2 lg:grid-cols-1">
            {t.v3.how.map((s, i) => (
              <li key={s} className="flex flex-col items-start gap-2 rounded-xl bg-ivory px-3 py-2.5 text-[0.92rem] font-semibold leading-snug text-navy sm:flex-row sm:items-center sm:gap-3 sm:text-base">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-[0.9rem] text-champagne-light" aria-hidden="true">{i + 1}</span>{s}
              </li>
            ))}
          </ol>
          <Link href={href(locale, "about")} className="link mt-3 inline-flex min-h-11 items-center gap-1.5 sm:mt-5">{t.home.teamLink} <ArrowRight size={16} className={arrow} aria-hidden="true" /></Link>
        </div>
        {/* Mobil: wischbar, Desktop: drei Spalten */}
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
          {team.map((a, i) => <li key={a.id} className="w-[54%] shrink-0 snap-start sm:w-auto" {...d(i)}><AdvisorCard a={a} locale={locale} t={t} /></li>)}
        </ul>
      </div>
    </Section>
  );
}

/* ============================================================ Bewertungen */
function Reviews({ locale, t }: { locale: Locale; t: Dict }) {
  const real = company.reviews?.filter((r) => r.consentDocumented) ?? [];
  if (!real.length && !isPreview) return null; // ohne echte Bewertungen öffentlich unsichtbar
  const cards = real.length ? real.map((r) => ({ text: r.text[locale], author: r.author, meta: r.source, placeholder: false })) : Array.from({ length: 5 }, () => ({ text: t.v3.reviewPlaceholder, author: "—", meta: "", placeholder: true }));
  const loop = [...cards, ...cards];
  return (
    <section className="overflow-hidden bg-sand py-9 sm:py-16" aria-labelledby="reviews-title">
      <Container><SectionHead id="reviews-title" title={t.v3.reviewsTitle} /></Container>
      <div className="marquee overflow-hidden" tabIndex={0} role="region" aria-label={t.v3.reviewsTitle}>
        <ul className="marquee-track flex w-max gap-4 px-4">
          {loop.map((c, i) => (
            <li key={i} aria-hidden={i >= cards.length} className={`w-[280px] shrink-0 rounded-2xl p-4 sm:w-[360px] sm:p-5 ${c.placeholder ? "border-2 border-dashed border-champagne bg-paper/60" : "bg-paper"}`}>
              <div className="flex gap-0.5 text-champagne" aria-hidden="true">{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={15} fill={c.placeholder ? "none" : "currentColor"} />)}</div>
              <Quote size={18} className="mt-3 text-brass rtl:-scale-x-100" aria-hidden="true" />
              <p className={`mt-1 text-[0.98rem] ${c.placeholder ? "italic text-muted" : "text-ink"}`}>{c.text}</p>
              <p className="mt-3 text-[0.88rem] font-semibold text-navy">{c.author} {c.meta && <span className="font-normal text-muted">· {c.meta}</span>}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ========================================================= Ihr nächster Schritt */
export function Closing({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="navy-surface on-dark text-white" aria-labelledby="closing-title">
      <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
        <div data-reveal="">
          <h2 id="closing-title" className="display text-[1.9rem] sm:text-[2.6rem]">{t.v3.nextTitle}</h2>
          <p className="mt-3 max-w-xl text-mist">{t.v3.nextText}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {t.v3.nextChips.map((c) => <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[0.88rem]"><Check size={15} className="text-champagne-light" aria-hidden="true" /> {c}</li>)}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link href={href(locale, "contact")} className="btn btn-gold" data-track="cta_closing">{t.v3.free} <ArrowRight size={18} className={arrow} aria-hidden="true" /></Link>
            <WhatsAppButton t={t} track="wa_closing" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6" data-reveal="" style={{ ["--d" as string]: "0.1s" }}>
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-champagne-light">{t.v3.office}</p>
          <div className="mt-3 flex items-start gap-3">
            <MapPin size={20} className="mt-0.5 shrink-0 text-champagne-light" aria-hidden="true" />
            <div>
              <p className="font-semibold">{company.name}<br />{company.office.street}, {company.office.postalCode} {company.office.cityLocalized[locale]}</p>
              <a href={company.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-flex min-h-11 items-center gap-1.5 text-[0.92rem]" data-track="map_link">
                {t.common.directions} <ExternalLink size={14} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span>
              </a>
            </div>
          </div>
          {company.phone && (
            <a href={`tel:${company.phone}`} className="mt-2 flex items-center gap-3 border-t border-white/10 pt-4" data-track="call_closing">
              <Phone size={18} className="text-champagne-light" aria-hidden="true" /><span className="ltr-nums font-semibold">{company.phoneDisplay}</span>
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================== FAQ */
export function Faq({ items, idPrefix = "faq" }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper" data-reveal="">
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
      <WhatsAppButton t={t} className="w-full" track="wa_contactblock" />
      {company.phone && (
        <a href={`tel:${company.phone}`} className="card lift flex items-center gap-4 p-4" data-track="call_contactblock">
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
      <Issues locale={locale} t={t} />
      <Section tone="paper" labelledBy="solutions-title" compact>
        <SectionHead id="solutions-title" title={t.home.solutionsTitle} link={{ href: href(locale, "solutions"), label: t.v3.solutionsAll }} />
        <SolutionBubbles locale={locale} t={t} />
      </Section>
      <TeamSection locale={locale} t={t} tone="ivory" />
      <Reviews locale={locale} t={t} />
      <Closing locale={locale} t={t} />
    </>
  );
}
