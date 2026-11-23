import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Check, ChevronRight, MapPin, ExternalLink, MessageCircleHeart, Languages, Lightbulb, HandHeart, PhoneCall,
  PiggyBank, ShieldCheck, TrendingUp, Clock, CalendarCheck, Users,
} from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName, teamLanguages, type Advisor } from "@/config/advisors";
import { extraKeys, href, serviceKeys, teamHref, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import { home4 } from "@/content/home4";
import { Container } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { LangFlag, WhatsAppIcon } from "@/components/ui/Icons";
import { waLink } from "@/components/layout/MobileContactBar";
import { LangChips, extraIcons, initials, serviceIcons } from "./Home";

const arrow = "rtl:rotate-180";
const reveal = (i = 0) => ({ "data-reveal": "", style: { ["--d" as string]: `${i * 0.06}s` } });

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-3 text-[0.82rem] font-bold uppercase tracking-[0.14em] ${light ? "text-champagne-light" : "text-brass"}`}>{children}</p>;
}
function H2({ id, children, light = false }: { id: string; children: React.ReactNode; light?: boolean }) {
  return <h2 id={id} className={`display text-[1.85rem] leading-[1.18] sm:text-[2.5rem] ${light ? "text-white" : "text-navy"}`}>{children}</h2>;
}

function BookButton({ locale, t, track, className = "" }: { locale: Locale; t: Dict; track: string; className?: string }) {
  return (
    <Link href={href(locale, "contact")} className={`btn btn-gold btn-lg ${className}`} data-track={track}>
      <CalendarCheck size={21} aria-hidden="true" /> {t.v3.free} <ArrowRight size={19} className={arrow} aria-hidden="true" />
    </Link>
  );
}

/* ================================================================ Hero */
function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const h = home4[locale].hero;
  const team = activeAdvisors();
  const order = company.teamPhotoOrder.map((s) => team.find((a) => a.slug === s)).filter(Boolean) as Advisor[];
  const wa = waLink(t.v3.waMessage);
  return (
    <section className="navy-surface on-dark relative overflow-hidden text-white" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute -end-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(227,179,65,.13),transparent)]" aria-hidden="true" />
      <Container className="relative grid items-center gap-9 pb-12 pt-8 sm:pb-16 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-20 lg:pt-16">
        <div>
          <p className="reveal inline-flex items-center gap-2 text-[0.88rem] font-semibold text-champagne-light"><MapPin size={16} aria-hidden="true" /> {h.eyebrow}</p>
          <h1 id="hero-title" className="display reveal reveal-delay-1 mt-4 text-[2.15rem] leading-[1.12] hyphens-manual! sm:text-[3rem] lg:text-[3.35rem]">
            {h.title} <span className="text-champagne-light">{h.titleAccent}</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-[1.12rem] leading-relaxed text-mist sm:text-[1.22rem]">{h.lead}</p>
          <div className="reveal reveal-delay-2 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton locale={locale} t={t} track="cta_hero" className="w-full sm:w-auto" />
            <a href="#hilfe" className="btn btn-ghost-light w-full sm:w-auto" data-track="hero_secondary">{h.secondary}</a>
          </div>
          <p className="reveal reveal-delay-3 mt-4 flex items-center gap-2 text-[0.98rem] text-mist"><Check size={18} className="shrink-0 text-champagne-light" aria-hidden="true" /> {h.note}</p>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-3 mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-[#25d366] decoration-2 underline-offset-4 hover:decoration-white" data-track="wa_hero">
              <WhatsAppIcon size={19} /> {h.whatsapp}<span className="sr-only"> ({t.common.externalNote})</span>
            </a>
          )}
        </div>

        <figure className="reveal reveal-delay-2">
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] ring-1 ring-white/10">
            {company.teamPhoto && <Image src={company.teamPhoto} alt={h.photoAlt} width={1600} height={1067} priority sizes="(min-width:1024px) 600px, 100vw" className="h-auto w-full object-cover" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14213d]/90 via-[#14213d]/40 to-transparent px-3 pb-3 pt-14 sm:px-5 sm:pb-4">
              <ul className="grid grid-cols-3 text-center text-[0.82rem] font-semibold sm:text-[0.95rem]" dir="ltr">
                {order.map((a) => <li key={a.id}><Link href={teamHref(locale, a.slug)} className="hover:text-champagne-light">{advisorName(a, locale)}</Link></li>)}
              </ul>
            </div>
          </div>
          <figcaption className="mt-5">
            <p className="mb-2 text-[0.92rem] text-mist">{h.langLabel}</p>
            <LangChips langs={teamLanguages()} light />
          </figcaption>
        </figure>
      </Container>

      {/* Vertrauensleiste */}
      <div className="relative border-t border-white/10 bg-[#1a2a4a]">
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

/* ============================================== Wobei wir Ihnen helfen */
function Help({ locale }: { locale: Locale }) {
  const c = home4[locale].help;
  return (
    <section id="hilfe" className="scroll-mt-20 bg-ivory py-10 sm:py-20" aria-labelledby="help-title">
      <Container>
        <div className="max-w-2xl" {...reveal()}>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <H2 id="help-title">{c.title}</H2>
          <p className="mt-3 text-[1.08rem] text-muted">{c.lead}</p>
        </div>
        <ul className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {c.items.map((it, i) => (
            <li key={it.title} {...reveal(i)}>
              <Link href={href(locale, it.route)} className="card lift group flex h-full items-stretch overflow-hidden lg:flex-col" data-track={`help_${it.img}`}>
                <span className="zoom-img relative w-[34%] shrink-0 overflow-hidden lg:aspect-[16/10] lg:w-full">
                  <Image src={`/images/topics/${it.img}.webp`} alt="" fill sizes="(min-width:1024px) 400px, 40vw" className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
                  <span className="display text-[1.22rem] text-navy lg:text-[1.4rem]">{it.title}</span>
                  <span className="mt-1.5 text-[0.98rem] leading-snug text-muted">{it.q}</span>
                  <span className="mt-auto hidden items-center gap-1 pt-3 text-[0.95rem] font-bold text-brass sm:inline-flex">
                    {c.more} <ChevronRight size={18} className={`transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${arrow}`} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ================================================== Unsere Schwerpunkte */
function Solutions({ locale, t }: { locale: Locale; t: Dict }) {
  const c = home4[locale].solutions;
  return (
    <section className="bg-paper py-10 sm:py-20" aria-labelledby="solutions-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4" {...reveal()}>
          <div className="max-w-2xl">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <H2 id="solutions-title">{c.title}</H2>
            <p className="mt-3 text-[1.08rem] text-muted">{c.lead}</p>
          </div>
          <Link href={href(locale, "solutions")} className="link inline-flex min-h-11 items-center gap-1.5">{c.all} <ArrowRight size={17} className={arrow} aria-hidden="true" /></Link>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((k, i) => {
            const I = serviceIcons[k];
            return (
              <li key={k} {...reveal(i)}>
                <Link href={href(locale, k)} className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-ivory/60 px-4 py-3 transition-colors hover:border-navy/40 hover:bg-paper sm:p-5" data-track={`solution_${k}`}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-champagne-light"><I size={23} aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1">
                    <span lang={locale} className="block font-bold leading-snug text-navy hyphens-auto">{t.services.items[k].title}</span>
                    <span className="mt-0.5 hidden text-[0.94rem] leading-snug text-muted sm:block">{t.services.items[k].short}</span>
                  </span>
                  <ChevronRight size={20} className={`shrink-0 text-navy/50 transition-transform group-hover:translate-x-1 ${arrow}`} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 rounded-2xl bg-sand/70 p-4 sm:p-5" {...reveal(2)}>
          <p className="font-semibold text-navy">{c.extrasLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {extraKeys.map((k) => {
              const I = extraIcons[k];
              return (
                <li key={k}>
                  <Link href={href(locale, "extras", undefined, k)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[0.96rem] font-semibold text-navy hover:border-navy/50">
                    <I size={17} className="text-brass" aria-hidden="true" /> {t.extras.items[k].title}
                  </Link>
                </li>
              );
            })}
            <li><Link href={href(locale, "contact")} className="inline-flex min-h-11 items-center px-2 text-[0.96rem] font-semibold text-brass underline underline-offset-4">+ {c.extrasMore}</Link></li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ====================================== Warum Kunden sich wohlfühlen */
function Why({ locale }: { locale: Locale }) {
  const c = home4[locale].why;
  const icons = [Languages, Lightbulb, MessageCircleHeart, PhoneCall];
  return (
    <section className="bg-sand py-10 sm:py-20" aria-labelledby="why-title">
      <Container className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative hidden sm:block" {...reveal()}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-36px_rgba(11,34,54,.6)]">
            <Image src="/images/topics/advice.webp" alt={c.imgAlt} fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-5 start-5 hidden rounded-2xl bg-navy-deep px-5 py-4 text-white shadow-xl sm:block">
            <p className="flex items-center gap-2 font-semibold"><HandHeart size={18} className="text-champagne-light" aria-hidden="true" /> {home4[locale].hero.trust[0]}</p>
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

/* ===================================================== Ansprechpartner */
function Team({ locale, t }: { locale: Locale; t: Dict }) {
  const c = home4[locale].team;
  const team = activeAdvisors();
  return (
    <section id="team" className="bg-paper py-10 sm:py-20" aria-labelledby="team-title">
      <Container>
        <div className="max-w-2xl" {...reveal()}>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <H2 id="team-title">{c.title}</H2>
          <p className="mt-3 text-[1.08rem] text-muted">{c.lead}</p>
        </div>
        <ul className="mt-9 grid gap-4 md:grid-cols-3 md:gap-6">
          {team.map((a, i) => (
            <li key={a.id} {...reveal(i)}>
              <article className="card lift group flex h-full gap-4 overflow-hidden p-4 md:flex-col md:gap-0 md:p-0">
                <Link href={teamHref(locale, a.slug)} className="zoom-img block shrink-0 overflow-hidden rounded-xl md:rounded-none" tabIndex={-1} aria-hidden="true">
                  <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} className="h-28 w-24 md:aspect-[4/5] md:h-auto md:w-full" sizes="(min-width:768px) 380px, 96px" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col md:p-6">
                  <h3 className="display text-[1.3rem] text-navy md:text-[1.5rem]"><Link href={teamHref(locale, a.slug)} className="hover:text-brass">{advisorName(a, locale)}</Link></h3>
                  <p className="mt-1 line-clamp-3 text-[0.98rem] leading-snug text-muted md:mt-2">{a.short[locale]}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.88rem] text-muted md:mt-3">
                    <span className="me-0.5">{c.speaks}</span>{a.languages.map((l) => <LangFlag key={l} l={l} size={19} />)}
                  </p>
                  <Link href={teamHref(locale, a.slug)} className="link mt-auto inline-flex min-h-11 items-center gap-1 pt-2" data-track={`team_${a.slug}`}>
                    {c.meet} <ArrowRight size={16} className={arrow} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ====================================================== Selbst ausprobieren */
function Tools({ locale }: { locale: Locale }) {
  const c = home4[locale].tools;
  const icons = [PiggyBank, ShieldCheck, TrendingUp];
  return (
    <section className="bg-ivory py-10 sm:py-20" aria-labelledby="tools-title">
      <Container>
        <div className="max-w-2xl" {...reveal()}>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <H2 id="tools-title">{c.title}</H2>
          <p className="mt-3 text-[1.08rem] text-muted">{c.lead}</p>
        </div>
        <ul className="mt-8 grid gap-3 md:grid-cols-3 md:gap-5">
          {c.items.map((it, i) => {
            const I = icons[i];
            return (
              <li key={it.id} {...reveal(i)}>
                <Link href={href(locale, "tools", undefined, it.id)} className="card lift group flex h-full items-center gap-4 p-5 md:flex-col md:items-start md:p-6" data-track={`home_tool_${it.id}`}>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-deep text-champagne-light"><I size={26} aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="display block text-[1.25rem] text-navy">{it.title}</span>
                    <span className="mt-1 block text-[0.98rem] leading-snug text-muted">{it.text}</span>
                    <span className="mt-3 hidden items-center gap-1.5 font-bold text-brass md:inline-flex">{c.cta} <ArrowRight size={17} className={arrow} aria-hidden="true" /></span>
                  </span>
                  <span className="hidden text-[0.85rem] text-muted md:mt-auto md:block"><Clock size={14} className="me-1 inline" aria-hidden="true" />{c.time}</span>
                  <ChevronRight size={22} className={`shrink-0 text-navy/50 md:hidden ${arrow}`} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ====================================================== Abschluss */
function Closing({ locale, t }: { locale: Locale; t: Dict }) {
  const c = home4[locale].closing;
  const wa = waLink(t.v3.waMessage);
  return (
    <section className="navy-surface on-dark relative overflow-hidden text-white" aria-labelledby="closing-title">
      <div className="pointer-events-none absolute -bottom-48 -start-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(227,179,65,.12),transparent)]" aria-hidden="true" />
      <Container className="relative grid gap-10 py-10 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div {...reveal()}>
          <H2 id="closing-title" light>{c.title}</H2>
          <p className="mt-4 max-w-xl text-[1.1rem] text-mist">{c.lead}</p>
          <ol className="mt-7 grid gap-4 sm:grid-cols-3">
            {c.steps.map(([title, text], i) => (
              <li key={title} className="flex gap-3 sm:flex-col sm:gap-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne-light font-bold text-navy-deep" aria-hidden="true">{i + 1}</span>
                <span><span className="block font-bold">{title}</span><span className="block text-[0.95rem] text-mist">{text}</span></span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton locale={locale} t={t} track="cta_closing" className="w-full sm:w-auto" />
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full sm:w-auto" data-track="wa_closing">
                <WhatsAppIcon size={20} /> {t.v3.whatsapp}<span className="sr-only"> ({t.common.externalNote})</span>
              </a>
            )}
          </div>
          <p className="mt-4 flex items-center gap-2 text-mist"><Check size={18} className="shrink-0 text-champagne-light" aria-hidden="true" /> {c.note}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.05] p-6" {...reveal(1)}>
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-champagne-light">{c.office}</p>
          <p className="mt-3 flex items-start gap-3 text-[1.08rem] font-semibold"><MapPin size={21} className="mt-0.5 shrink-0 text-champagne-light" aria-hidden="true" />
            <span>{company.name}<br />{company.office.street}<br />{company.office.postalCode} {company.office.cityLocalized[locale]}</span>
          </p>
          <a href={company.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="link ms-8 mt-1 inline-flex min-h-11 items-center gap-1.5" data-track="map_link">
            {c.directions} <ExternalLink size={15} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span>
          </a>
          <div className="mt-4 border-t border-white/10 pt-4"><LangChips langs={teamLanguages()} light /></div>
        </div>
      </Container>
    </section>
  );
}

export function HomePageV4({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <>
      <Hero locale={locale} t={t} />
      <Help locale={locale} />
      <Solutions locale={locale} t={t} />
      <Why locale={locale} />
      <Team locale={locale} t={t} />
      <Tools locale={locale} />
      <Closing locale={locale} t={t} />
    </>
  );
}
