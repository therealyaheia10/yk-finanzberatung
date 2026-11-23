import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Check, ChevronRight, MapPin, ExternalLink, MessageCircleHeart, Languages, Lightbulb, HandHeart, PhoneCall, Phone,
  CalendarCheck, Users, Home as HomeIcon,
} from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName, teamLanguages, type Advisor } from "@/config/advisors";
import { href, languageNames, serviceKeys, teamHref, type Locale, type ServiceKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { home4, type Worry } from "@/content/home4";
import { Container } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { LangFlag, WA_GREEN, WhatsAppIcon } from "@/components/ui/Icons";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { waLink } from "@/components/layout/MobileContactBar";
import { ToolHub } from "@/components/calculators/ToolHub";
import { RetirementCheck } from "@/components/calculators/RetirementCheck";
import { InsuranceChecklist } from "@/components/calculators/InsuranceChecklist";
import { WealthBuilder } from "@/components/calculators/WealthBuilder";
import { retirementCheckIntro, retirementCheckTitle } from "@/components/calculators/retirementCheckText";
import { insuranceChecklistIntro, insuranceChecklistTitle } from "@/components/calculators/insuranceChecklistText";
import { wealthBuilderIntro, wealthBuilderTitle } from "@/components/calculators/wealthBuilderText";
import { LangChips, initials } from "./Home";

const arrow = "rtl:rotate-180";
const reveal = (i = 0) => ({ "data-reveal": "", style: { ["--d" as string]: `${i * 0.06}s` } });

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-3 text-[0.82rem] font-bold uppercase tracking-[0.14em] ${light ? "text-champagne-light" : "text-brass"}`}>{children}</p>;
}
function H2({ id, children, light = false, className = "" }: { id: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return <h2 id={id} className={`display text-[1.85rem] leading-[1.18] sm:text-[2.5rem] ${light ? "text-white" : "text-navy"} ${className}`}>{children}</h2>;
}

/** Hauptaktion: dunkelgrün, gut sichtbar, an jeder wichtigen Stelle gleich */
export function BookButton({ locale, t, track, className = "", query }: { locale: Locale; t: Dict; track: string; className?: string; query?: Record<string, string> }) {
  return (
    <Link href={href(locale, "contact", query)} className={`btn btn-cta btn-lg ${className}`} data-track={track}>
      <CalendarCheck size={21} aria-hidden="true" /> {t.v3.free} <ArrowRight size={19} className={arrow} aria-hidden="true" />
    </Link>
  );
}
/** WhatsApp als ruhiger Nebenbutton – nur das Logo ist grün */
function WhatsAppSoft({ t, light = false, track, className = "" }: { t: Dict; light?: boolean; track: string; className?: string }) {
  const wa = waLink(t.v3.waMessage);
  if (!wa) return null;
  return (
    <a href={wa} target="_blank" rel="noopener noreferrer" className={`btn ${light ? "btn-ghost-light" : "btn-ghost"} ${className}`} data-track={track}>
      <WhatsAppIcon size={22} color={WA_GREEN} /> {t.v3.whatsapp}<span className="sr-only"> ({t.common.externalNote})</span>
    </a>
  );
}

/* ================================================================ Hero */
function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const h = home4[locale].hero;
  const team = activeAdvisors();
  const order = company.teamPhotoOrder.map((s) => team.find((a) => a.slug === s)).filter(Boolean) as Advisor[];
  return (
    <section className="navy-surface on-dark relative overflow-hidden text-white" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute -end-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(214,190,147,.12),transparent)]" aria-hidden="true" />
      <Container className="relative grid items-center gap-9 pb-12 pt-8 sm:pb-16 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-20 lg:pt-14">
        <div>
          <p className="reveal text-[0.95rem] font-semibold tracking-[0.04em] text-white/90">{h.brand}</p>
          <h1 id="hero-title" className="reveal reveal-delay-1 mt-4">
            <span className="display block text-[2.5rem] leading-none text-champagne-light sm:text-[3.4rem] lg:text-[3.8rem]">{h.missionLabel}</span>
            <span className="display mt-4 block text-[1.45rem] font-medium leading-[1.3] hyphens-manual! sm:text-[1.85rem] lg:text-[2rem]">
              {h.mission} <span className="text-champagne-light">{h.missionAccent}</span>
            </span>
          </h1>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-[1.08rem] leading-relaxed text-mist sm:text-[1.15rem]">{h.sub}</p>
          <div className="reveal reveal-delay-2 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton locale={locale} t={t} track="cta_hero" className="w-full sm:w-auto" />
            <WhatsAppSoft t={t} light track="wa_hero" className="w-full sm:w-auto" />
          </div>
          <div className="reveal reveal-delay-3 mt-6">
            <p className="mb-2 text-[0.92rem] text-mist">{h.langLabel}</p>
            <LangChips langs={teamLanguages()} light />
          </div>
        </div>

        <figure className="reveal reveal-delay-2">
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] ring-1 ring-white/10">
            {company.teamPhoto && <Image src={company.teamPhoto} alt={h.photoAlt} width={1600} height={1067} priority sizes="(min-width:1024px) 600px, 100vw" className="h-auto w-full object-cover" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111519]/90 via-[#111519]/40 to-transparent px-3 pb-3 pt-14 sm:px-5 sm:pb-4">
              <ul className="grid grid-cols-3 text-center text-[0.82rem] font-semibold sm:text-[0.95rem]" dir="ltr">
                {order.map((a) => <li key={a.id}><Link href={teamHref(locale, a.slug)} className="hover:text-champagne-light">{advisorName(a, locale)}</Link></li>)}
              </ul>
            </div>
          </div>
          <figcaption className="mt-5 flex gap-3 rounded-2xl border border-white/12 bg-white/[0.04] p-4">
            <HomeIcon size={22} className="mt-0.5 shrink-0 text-champagne-light" aria-hidden="true" />
            <span><span className="block font-semibold">{h.nearTitle}</span><span className="mt-1 block text-[0.98rem] text-mist">{h.nearText}</span></span>
          </figcaption>
        </figure>
      </Container>

      <div className="relative border-t border-white/10 bg-[#181d22]">
        <Container>
          <ul className="grid gap-2.5 py-4 sm:grid-cols-3 sm:gap-6 sm:py-5">
            {[HandHeart, PhoneCall, Users].map((I, i) => (
              <li key={i} className="flex items-center gap-3 text-[1rem] font-semibold">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-champagne-light sm:h-10 sm:w-10"><I size={19} aria-hidden="true" /></span>
                <span>{h.trust[i]}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

/* ================================== Finanzielle Sorgen (klickbare Fragen) */
function WorryCard({ locale, title, img, imgAlt, items, i }: { locale: Locale; title: string; img: string; imgAlt: string; items: Worry[]; i: number }) {
  return (
    <article className="card overflow-hidden" {...reveal(i)}>
      <div className="zoom-img relative aspect-[16/9] overflow-hidden">
        <Image src={`/images/topics/${img}.webp`} alt={imgAlt} fill sizes="(min-width:768px) 600px, 100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111519]/85 to-transparent px-5 pb-4 pt-16">
          <h3 className="display text-[1.5rem] text-white sm:text-[1.7rem]">{title}</h3>
        </div>
      </div>
      <ul className="divide-y divide-line">
        {items.map((w) => (
          <li key={w.q}>
            <Link href={href(locale, w.route, undefined, w.hash)} className="group flex min-h-14 items-center gap-3 px-5 py-3.5 transition-colors hover:bg-ivory" data-track={`worry_${w.route}`}>
              <span className="flex-1 text-[1.02rem] font-medium leading-snug text-ink group-hover:text-navy">{w.q}</span>
              <ChevronRight size={20} className={`shrink-0 text-brass transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${arrow}`} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Worries({ locale }: { locale: Locale }) {
  const c = home4[locale].worries;
  return (
    <section id="sorgen" className="scroll-mt-20 bg-ivory py-12 sm:py-20" aria-labelledby="worries-title">
      <Container>
        <H2 id="worries-title" className="max-w-3xl !text-error">{c.title}</H2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
          <WorryCard locale={locale} title={c.private.title} img="family" imgAlt={c.private.imgAlt} items={c.private.items} i={0} />
          <WorryCard locale={locale} title={c.business.title} img="business-formal" imgAlt={c.business.imgAlt} items={c.business.items} i={1} />
        </div>
      </Container>
    </section>
  );
}

/* ===================================================== Unsere 3 Rechner */
function Tools({ locale }: { locale: Locale }) {
  const c = home4[locale].tools;
  return (
    <section id="rechner" className="scroll-mt-20 bg-paper py-12 sm:py-20" aria-labelledby="tools-title">
      <Container>
        <div className="max-w-2xl" {...reveal()}>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <H2 id="tools-title">{c.title}</H2>
          <p className="mt-3 text-[1.08rem] text-muted">{c.lead}</p>
        </div>
        <div className="mt-8">
          <ToolHub embedded panelId="home-tool-panel" chooseLabel={c.choose} tools={[
            { id: "renten-check", title: retirementCheckTitle(locale), desc: retirementCheckIntro(locale), node: <RetirementCheck locale={locale} /> },
            { id: "versicherungs-check", title: insuranceChecklistTitle(locale), desc: insuranceChecklistIntro(locale), node: <InsuranceChecklist locale={locale} /> },
            { id: "vermoegensaufbau", title: wealthBuilderTitle(locale), desc: wealthBuilderIntro(locale), node: <WealthBuilder locale={locale} /> },
          ]} />
        </div>
      </Container>
    </section>
  );
}

/* ====================================================== Was uns verbindet */
function Why({ locale }: { locale: Locale }) {
  const c = home4[locale].why;
  const icons = [Languages, Lightbulb, MessageCircleHeart, PhoneCall];
  return (
    <section className="bg-sand py-12 sm:py-20" aria-labelledby="why-title">
      <Container className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative hidden sm:block" {...reveal()}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-36px_rgba(17,21,25,.55)]">
            <Image src="/images/topics/advice.webp" alt={c.imgAlt} fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
        <div>
          <div {...reveal(1)}>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <H2 id="why-title">{c.title}</H2>
            <p className="mt-4 text-[1.08rem] text-muted">{c.lead}</p>
          </div>
          <ul className="mt-7 grid gap-5 sm:grid-cols-2">
            {c.points.map(([title, text], i) => {
              const I = icons[i];
              return (
                <li key={title} className="flex gap-4" {...reveal(i + 1)}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-brass shadow-sm"><I size={21} aria-hidden="true" /></span>
                  <span>
                    <span className="block font-bold text-navy">{title}</span>
                    <span className="mt-1 block text-[0.98rem] leading-snug text-muted">{text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ============================================ Team: Menschen hinter der Marke */
function focusLabels(a: Advisor, t: Dict): string[] {
  const keys = (a.focus as string[]).filter((f): f is ServiceKey => (serviceKeys as readonly string[]).includes(f));
  return keys.length === serviceKeys.length ? [] : keys.map((k) => t.services.items[k].title);
}

function Team({ locale, t }: { locale: Locale; t: Dict }) {
  const c = home4[locale].team;
  const team = activeAdvisors();
  return (
    <section id="team" className="scroll-mt-20 bg-paper py-12 sm:py-20" aria-labelledby="team-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div {...reveal()}>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <H2 id="team-title">{c.title}</H2>
            <p className="mt-4 text-[1.08rem] text-muted">{c.text}</p>
          </div>
          <div {...reveal(1)}>
            <p className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-navy">{c.howTitle}</p>
            {/* Schritte mit Verbindungslinie, letzter Schritt als grüner Haken */}
            <ol className="relative mt-4 space-y-5">
              <span className="absolute bottom-5 start-[1.2rem] top-5 w-0.5 bg-line" aria-hidden="true" />
              {c.steps.map((s, i) => {
                const last = i === c.steps.length - 1;
                return (
                  <li key={s} className="relative flex items-center gap-4">
                    <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${last ? "bg-[#1a7d50] text-white" : "bg-navy text-white"}`} aria-hidden="true">
                      {last ? <Check size={20} strokeWidth={3} /> : i + 1}
                    </span>
                    <span className="text-[1.08rem] font-semibold text-navy"><span className="sr-only">{i + 1}. </span>{s}</span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 rounded-2xl border border-line bg-ivory p-5">
              <p className="font-bold text-navy">{c.bookWith}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {team.map((a) => (
                  <li key={a.id}>
                    <Link href={href(locale, "contact", { advisor: a.slug })} className="flex min-h-12 items-center gap-3 rounded-full border-2 border-[#1a7d50]/30 bg-paper py-1.5 pe-4 ps-1.5 font-semibold text-navy transition-colors hover:border-[#1a7d50] hover:bg-[#1a7d50]/5" data-track={`book_with_${a.slug}`}>
                      <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel="" className="h-9 w-9 shrink-0 rounded-full" sizes="40px" />
                      {advisorName(a, locale)}
                    </Link>
                  </li>
                ))}
                <li className="sm:col-span-2">
                  <Link href={href(locale, "contact")} className="btn btn-cta w-full" data-track="book_with_anyone">
                    <Users size={19} aria-hidden="true" /> {c.anyone}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {team.map((a, i) => {
              const focus = focusLabels(a, t);
              return (
                <li key={a.id} {...reveal(i)}>
                  <article className="card lift group flex h-full gap-4 overflow-hidden p-4 md:flex-col md:gap-0 md:p-0">
                    <Link href={teamHref(locale, a.slug)} className="zoom-img block shrink-0 self-start overflow-hidden rounded-xl md:self-auto md:rounded-none" tabIndex={-1} aria-hidden="true">
                      <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} className="h-32 w-26 md:aspect-[4/4.2] md:h-auto md:w-full" sizes="(min-width:768px) 400px, 104px" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col md:p-5">
                      <h3 className="display text-[1.35rem] text-navy"><Link href={teamHref(locale, a.slug)} className="hover:text-brass">{advisorName(a, locale)}</Link></h3>
                      {a.position && <p className="text-[0.92rem] font-semibold text-brass">{a.position[locale]}</p>}
                      <p className="mt-1.5 line-clamp-3 text-[0.98rem] leading-snug text-muted md:mt-2 md:line-clamp-none">{a.short[locale]}</p>
                      {focus.length > 0 && <p className="mt-3 text-[0.9rem] text-muted"><span className="font-semibold text-navy">{c.focus}: </span>{focus.join(" · ")}</p>}
                      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9rem] text-muted">
                        <span className="font-semibold text-navy">{c.speaks}:</span>
                        {a.languages.map((l) => <span key={l} lang={l} className="inline-flex items-center gap-1"><LangFlag l={l} size={17} />{languageNames[l].native}</span>)}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-4">
                        <Link href={teamHref(locale, a.slug)} className="link inline-flex min-h-11 items-center gap-1" data-track={`team_${a.slug}`}>{c.meet} <ArrowRight size={16} className={arrow} aria-hidden="true" /></Link>
                        <Link href={`${teamHref(locale, a.slug)}#termin`} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#1a7d50] hover:underline" data-track={`team_book_${a.slug}`}><CalendarCheck size={17} aria-hidden="true" /> {c.book}</Link>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
      </Container>
    </section>
  );
}

/* ====================================================== Ihr nächster Schritt */
function Closing({ locale, t }: { locale: Locale; t: Dict }) {
  const c = home4[locale].closing;
  return (
    <section className="navy-surface on-dark relative overflow-hidden text-white" aria-labelledby="closing-title">
      <Container className="relative grid gap-10 py-12 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div className="lg:pt-6" {...reveal()}>
          <H2 id="closing-title" light>{c.title}</H2>
          <p className="mt-4 max-w-xl text-[1.1rem] text-mist">{c.lead}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {c.chips.map((x) => <li key={x} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[0.95rem]"><Check size={16} className="text-champagne-light" aria-hidden="true" /> {x}</li>)}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton locale={locale} t={t} track="cta_closing" className="w-full sm:w-auto" />
            <WhatsAppSoft t={t} light track="wa_closing" className="w-full sm:w-auto" />
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.05] p-5 sm:p-6" {...reveal(1)}>
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-champagne-light">{c.office}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin size={21} className="mt-0.5 shrink-0 text-champagne-light" aria-hidden="true" />
              <div>
                <p className="font-semibold leading-snug">{company.name}<br />{company.office.street}<br />{company.office.postalCode} {company.office.cityLocalized[locale]}</p>
                <a href={company.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-flex min-h-11 items-center gap-1.5" data-track="map_link">
                  {c.directions} <ExternalLink size={15} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span>
                </a>
              </div>
            </div>
            {company.phone && (
              <a href={`tel:${company.phone}`} className="flex items-start gap-3" data-track="call_closing">
                <Phone size={20} className="mt-0.5 shrink-0 text-champagne-light" aria-hidden="true" />
                <span><span className="block text-[0.9rem] text-mist">{c.phone}</span><span className="ltr-nums block text-[1.15rem] font-semibold">{company.phoneDisplay}</span></span>
              </a>
            )}
          </div>
          <MapEmbed address={`${company.office.street}, ${company.office.postalCode} ${company.office.city}`} loadLabel={t.v3.mapLoad} note={t.v3.mapNote} title={t.v3.mapTitle} className="mt-5 h-64 sm:h-72" />
        </div>
      </Container>
    </section>
  );
}

export function HomePageV4({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <>
      <Hero locale={locale} t={t} />
      <Worries locale={locale} />
      <Tools locale={locale} />
      <Why locale={locale} />
      <Team locale={locale} t={t} />
      <Closing locale={locale} t={t} />
    </>
  );
}
