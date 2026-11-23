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
import { LangFlag, WA_GREEN, WhatsAppIcon } from "@/components/ui/Icons";
import { waLink } from "@/components/layout/MobileContactBar";
import { MapEmbed } from "@/components/ui/MapEmbed";

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
    <a href={wa} target="_blank" rel="noopener noreferrer" className={`btn btn-ghost ${className}`} data-track={track}>
      <WhatsAppIcon size={21} color={WA_GREEN} /> {t.v3.whatsapp}<span className="sr-only"> ({t.common.externalNote})</span>
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
      <MapEmbed address={`${company.office.street}, ${company.office.postalCode} ${company.office.city}`} loadLabel={t.v3.mapLoad} note={t.v3.mapNote} title={t.v3.mapTitle} className="h-56" />
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

