import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Info, Phone, ChevronRight, Lightbulb, ExternalLink, BadgeCheck, Mail, MapPin, Quote, Users } from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName, type Advisor, type TopicKey } from "@/config/advisors";
import { products, productsCheckedAt } from "@/config/products";
import { extraKeys, href, privateServices, businessServices, teamHref, type Locale, type ServiceKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { fill } from "@/lib/format";
import { isPreview } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { LangFlag } from "@/components/ui/Icons";
import { ContactBlock, ExtrasStrip, Faq, LangChips, SectionHead, SolutionsGrid, TeamSection, extraIcons, formModes, initials } from "@/components/home/Home";
import { LeadForm } from "@/components/forms/LeadForm";
import { InsuranceChecklist } from "@/components/calculators/InsuranceChecklist";
import { WealthBuilder } from "@/components/calculators/WealthBuilder";
import { insuranceChecklistIntro, insuranceChecklistTitle } from "@/components/calculators/insuranceChecklistText";
import { wealthBuilderIntro, wealthBuilderTitle } from "@/components/calculators/wealthBuilderText";
import { ToolHub } from "@/components/calculators/ToolHub";
import { RetirementCheck } from "@/components/calculators/RetirementCheck";
import { retirementCheckIntro, retirementCheckTitle } from "@/components/calculators/retirementCheckText";

const topicFor: Record<ServiceKey, TopicKey> = { retirement: "retirement", kids: "kids", bu: "bu", pkv: "pkv", bav: "bav", bkv: "bkv" };
const arrow = "rtl:rotate-180";
const h2 = "display text-[1.55rem] text-navy sm:text-[2rem]";

export function Breadcrumb({ locale, t, items, light = false }: { locale: Locale; t: Dict; items: { label: string; href?: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[0.88rem] ${light ? "text-mist" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href={href(locale, "home")} className="hover:underline">{t.common.breadcrumbHome}</Link></li>
        {items.map((i, idx) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <ChevronRight size={14} className={arrow} aria-hidden="true" />
            {i.href && idx < items.length - 1 ? <Link href={i.href} className="hover:underline">{i.label}</Link> : <span aria-current="page">{i.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Dunkler Seitenkopf – konsistent mit Startseite */
function PageHero({ locale, t, eyebrow, title, lead, crumbs, cta, topic, image }: {
  locale: Locale; t: Dict; eyebrow: string; title: string; lead: string; crumbs: { label: string; href?: string }[]; cta?: string; topic?: string; image?: string;
}) {
  return (
    <section className="navy-surface on-dark overflow-hidden text-white">
      <Container className="pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-16">
        <Breadcrumb locale={locale} t={t} items={crumbs} light />
        <div className={`mt-6 sm:mt-8 ${image ? "grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14" : ""}`}>
          <div className="max-w-3xl">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h1 className="display reveal text-[2rem] leading-[1.15] sm:text-[2.8rem] lg:text-[3.1rem]">{title}</h1>
            <p className="reveal reveal-delay-1 mt-4 text-[1.1rem] text-mist sm:text-[1.2rem]">{lead}</p>
            {cta && (
              <div className="reveal reveal-delay-2 mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={href(locale, "contact", topic ? { topic } : undefined)} className="btn btn-cta btn-lg" data-track={`cta_pagehero_${topic ?? "general"}`}><CalendarCheck size={20} aria-hidden="true" /> {t.v3.free} <ArrowRight size={18} className={arrow} aria-hidden="true" /></Link>
                {company.phone && <a href={`tel:${company.phone}`} className="btn btn-ghost-light" data-track={`call_pagehero_${topic ?? "general"}`}><Phone size={18} aria-hidden="true" /> {t.home.call}</a>}
              </div>
            )}
          </div>
          {image && (
            <div className="reveal reveal-delay-2 relative aspect-[16/9] overflow-hidden rounded-[1.4rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] ring-1 ring-white/10 lg:aspect-[4/3]">
              <Image src={`/images/topics/${image}.webp`} alt="" fill priority sizes="(min-width:1024px) 520px, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Abschluss mit Beratern */
function CtaBand({ locale, t, title, text, topic }: { locale: Locale; t: Dict; title: string; text: string; topic: string }) {
  const team = activeAdvisors().slice(0, 3);
  return (
    <section className="navy-surface on-dark text-white">
      <Container className="flex flex-col gap-6 py-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <span className="flex shrink-0 -space-x-3 rtl:space-x-reverse" aria-hidden="true">
            {team.map((a) => <Portrait key={a.id} src={a.portrait} alt="" initials={initials(a)} placeholderLabel="" className="h-12 w-12 rounded-full ring-2 ring-navy-deep sm:h-16 sm:w-16" sizes="64px" />)}
          </span>
          <div>
            <h2 className="display text-[1.6rem] sm:text-[2.1rem]">{title}</h2>
            <p className="mt-2 max-w-xl text-mist">{text}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
          <Link href={href(locale, "contact", { topic })} className="btn btn-cta btn-lg" data-track={`cta_band_${topic}`}><CalendarCheck size={20} aria-hidden="true" /> {t.home.primary} <ArrowRight size={18} className={arrow} aria-hidden="true" /></Link>
          <Link href={href(locale, "contact", { topic, mode: "callback" })} className="btn btn-ghost-light" data-track={`callback_band_${topic}`}>{t.home.callback}</Link>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================ Produktseite */
const heroImg: Record<ServiceKey, string> = { retirement: "retirement", kids: "kids", bu: "income", pkv: "health", bav: "business", bkv: "business" };
export function ServicePage({ locale, t, k }: { locale: Locale; t: Dict; k: ServiceKey }) {
  const s = t.servicePages[k];
  const isBusiness = k === "bav" || k === "bkv";
  const split = "split" in s ? (s as typeof t.servicePages.bav).split : null;
  const prod = products[k];
  const experts = activeAdvisors().filter((a) => a.focus.includes(topicFor[k]));
  const calc = k === "kids" ? <WealthBuilder locale={locale} initialMode="child" /> : k === "retirement" ? <RetirementCheck locale={locale} /> : null;

  return (
    <>
      <PageHero locale={locale} t={t} eyebrow={s.eyebrow} title={s.title} lead={s.lead} cta={t.home.primary} topic={topicFor[k]} image={heroImg[k]}
        crumbs={[{ label: isBusiness ? t.nav.business : t.nav.private, href: href(locale, isBusiness ? "business" : "private") }, { label: t.services.items[k].title }]} />

      {/* Auf einen Blick */}
      <Section tone="paper" compact>
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div className="space-y-4">
            {s.intro.map((p) => <p key={p}>{p}</p>)}
            <div className="flex gap-3 rounded-2xl bg-ivory p-5">
              <Lightbulb size={22} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
              <div><p className="font-semibold text-navy">{t.service.example}</p><p className="mt-1 text-[0.97rem] text-muted">{s.example}</p></div>
            </div>
          </div>
          <aside className="rounded-2xl border border-line p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-semibold text-navy"><Users size={18} className="text-brass" aria-hidden="true" /> {t.service.forWhom}</h2>
            <ul className="mt-3 space-y-2.5 text-[0.97rem]">
              {s.audience.map((a) => <li key={a} className="flex gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-success" aria-hidden="true" /><span>{a}</span></li>)}
            </ul>
          </aside>
        </div>
      </Section>

      {split && (
        <Section tone="ivory" compact>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {(["employer", "employee"] as const).map((x) => (
              <div key={x} className="card p-5 sm:p-6">
                <h2 className="text-[1.2rem] font-semibold text-navy">{split[x].title}</h2>
                <ul className="mt-3 space-y-2.5 text-[0.97rem]">{split[x].items.map((i) => <li key={i} className="flex gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-success" aria-hidden="true" /><span>{i}</span></li>)}</ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* So funktioniert es */}
      <Section tone={split ? "paper" : "ivory"} compact>
        <SectionHead title={t.service.how} />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {s.how.map((h, i) => (
            <li key={h.title} className="card p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[0.9rem] font-semibold text-champagne-light" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-3 font-semibold text-navy">{h.title}</h3>
              <p className="mt-1 text-[0.95rem] text-muted">{h.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Vorteile & Grenzen */}
      <Section tone={split ? "ivory" : "paper"} compact>
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
          <div className="rounded-2xl border border-line bg-paper p-5 sm:p-7">
            <h2 className="text-[1.25rem] font-semibold text-navy">{t.service.benefits}</h2>
            <ul className="mt-4 space-y-2.5">{s.benefits.map((b) => <li key={b} className="flex gap-2.5"><Check size={18} className="mt-1 shrink-0 text-success" aria-hidden="true" /><span>{b}</span></li>)}</ul>
          </div>
          <div className="rounded-2xl bg-sand p-5 sm:p-7">
            <h2 className="text-[1.25rem] font-semibold text-navy">{t.service.limits}</h2>
            <ul className="mt-4 space-y-2.5">{s.limits.map((b) => <li key={b} className="flex gap-2.5"><Info size={18} className="mt-1 shrink-0 text-navy" aria-hidden="true" /><span>{b}</span></li>)}</ul>
          </div>
        </div>
      </Section>

      {/* Verifizierte Produktinformationen */}
      <Section id="produkt" tone={split ? "paper" : "ivory"} compact>
        <div className="grid gap-6 rounded-2xl border border-line bg-paper p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <p className="flex items-center gap-2 text-[0.85rem] font-semibold text-success"><BadgeCheck size={17} aria-hidden="true" /> {t.service.provider}</p>
            <h2 className="mt-2 text-[1.35rem] font-semibold text-navy">{prod.title}</h2>
            <p className="mt-1 text-[0.95rem] text-muted">{prod.carrier}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">{prod.names.map((n) => <li key={n} className="rounded-full bg-ivory px-2.5 py-0.5 text-[0.8rem] text-navy" dir="ltr">{n}</li>)}</ul>
          </div>
          <div>
            <ul className="space-y-2.5">{prod.facts[locale].map((f) => <li key={f} className="flex gap-2.5"><Check size={18} className="mt-1 shrink-0 text-brass" aria-hidden="true" /><span>{f}</span></li>)}</ul>
            <p className="mt-4 text-[0.85rem] text-muted">
              {t.service.providerPending}{" "}
              <a href={prod.source} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">ergo.de <ExternalLink size={12} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span></a>{" "}
              · {new Date(productsCheckedAt).toLocaleDateString(locale === "ar" ? "ar-u-nu-latn" : locale)}
            </p>
          </div>
        </div>
      </Section>

      {calc && <Section tone="paper" compact><h2 className="sr-only">{t.service.tryCalc}</h2>{calc}</Section>}

      <Section tone="ivory" compact>
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <div>
            <h2 className={h2}>{t.service.faq}</h2>
            {experts.length > 0 && (
              <div className="mt-6 hidden lg:block">
                <p className="mb-3 text-[0.9rem] font-semibold text-muted">{t.service.advisorsTitle}</p>
                <ul className="space-y-2">
                  {experts.map((a) => (
                    <li key={a.id}>
                      <Link href={teamHref(locale, a.slug)} className="card card-hover flex items-center gap-3 p-3">
                        <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel="" className="h-12 w-12 rounded-full" sizes="48px" />
                        <span className="min-w-0 flex-1"><span className="block font-semibold text-navy">{advisorName(a, locale)}</span><span className="block text-[0.8rem] font-bold text-brass" dir="ltr">{a.languages.map((l) => l.toUpperCase()).join(" · ")}</span></span>
                        <ArrowRight size={16} className={arrow} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Faq items={s.faq} idPrefix={`faq-${k}`} />
        </div>
      </Section>

      <CtaBand locale={locale} t={t} title={s.ctaTitle} text={s.ctaText} topic={topicFor[k]} />
    </>
  );
}

/* ================================================================ Privat / Unternehmen / Lösungen */
export function PrivatePage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.private;
  return (
    <>
      <PageHero image="family" locale={locale} t={t} eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={[{ label: t.nav.private }]} cta={t.home.primary} topic="general" />
      <Section tone="ivory" compact>
        <SectionHead title={pg.topicsTitle} />
        <SolutionsGrid locale={locale} t={t} keys={privateServices} />
        <ExtrasStrip locale={locale} t={t} />
      </Section>
      <Section tone="paper" compact>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pg.audiences.map((a) => <li key={a.title} className="rounded-2xl bg-ivory p-5"><h2 className="font-semibold text-navy">{a.title}</h2><p className="mt-1 text-[0.95rem] text-muted">{a.text}</p></li>)}
        </ul>
      </Section>
      <CtaBand locale={locale} t={t} title={t.home.closingTitle} text={t.home.closingText} topic="general" />
    </>
  );
}

export function BusinessPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.business;
  return (
    <>
      <PageHero image="business" locale={locale} t={t} eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={[{ label: t.nav.business }]} cta={t.home.primary} topic="bav" />
      <Section tone="ivory" compact>
        <SectionHead title={pg.topicsTitle} />
        <SolutionsGrid locale={locale} t={t} keys={businessServices} />
      </Section>
      <Section tone="paper" compact>
        <ul className="grid gap-3 md:grid-cols-3">
          {pg.points.map((p) => <li key={p.title} className="rounded-2xl bg-ivory p-5"><h2 className="font-semibold text-navy">{p.title}</h2><p className="mt-1 text-[0.95rem] text-muted">{p.text}</p></li>)}
        </ul>
      </Section>
      <CtaBand locale={locale} t={t} title={pg.cta} text={t.servicePages.bkv.ctaText} topic="bav" />
    </>
  );
}

function ExtrasSection({ locale, t }: { locale: Locale; t: Dict }) {
  const e = t.extras;
  return (
    <Section tone="ivory" compact>
      <SectionHead title={e.title} />
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {extraKeys.map((k) => {
          const it = e.items[k];
          const Icon = extraIcons[k];
          return (
            <article key={k} id={k} className="card scroll-mt-24 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-brass"><Icon size={22} aria-hidden="true" /></span>
                <div><h3 className="font-semibold text-navy sm:text-[1.15rem]">{it.title}</h3><p className="text-[0.9rem] text-muted">{it.short}</p></div>
              </div>
              <p className="mt-3 text-[0.97rem]">{it.text}</p>
              <p className="mt-3 text-[0.9rem] text-muted"><strong className="text-navy">{e.forWhom}:</strong> {it.forWhom}</p>
              <p className="mt-2 text-[0.9rem] text-muted"><strong className="text-navy">{e.keep}:</strong> {it.note}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-champagne bg-paper p-5">
        <h3 className="font-semibold text-navy">{e.onRequest.title}</h3>
        <p className="mt-1 text-[0.95rem] text-muted">{e.onRequest.text}</p>
      </div>
    </Section>
  );
}

export function SolutionsPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.solutions;
  return (
    <>
      <PageHero image="family" locale={locale} t={t} eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={[{ label: t.nav.solutions }]} />
      <Section tone="paper" compact>
        <SectionHead title={t.services.privateLabel} />
        <SolutionsGrid locale={locale} t={t} keys={privateServices} />
        <div className="mt-10"><SectionHead title={t.services.businessLabel} /></div>
        <SolutionsGrid locale={locale} t={t} keys={businessServices} />
      </Section>
      <ExtrasSection locale={locale} t={t} />
      <CtaBand locale={locale} t={t} title={t.home.closingTitle} text={t.home.closingText} topic="general" />
    </>
  );
}

export function ExtrasPage({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <>
      <PageHero image="care" locale={locale} t={t} eyebrow={t.extras.eyebrow} title={t.extras.title} lead={t.extras.lead} crumbs={[{ label: t.nav.solutions, href: href(locale, "solutions") }, { label: t.extras.eyebrow }]} cta={t.home.primary} topic="extras" />
      <ExtrasSection locale={locale} t={t} />
      <CtaBand locale={locale} t={t} title={t.home.closingTitle} text={t.home.closingText} topic="extras" />
    </>
  );
}

/* ================================================================ Über uns */
export function AboutPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.about;
  return (
    <>
      <PageHero image="advice" locale={locale} t={t} eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={[{ label: t.nav.about }]} />
      <TeamSection locale={locale} t={t} tone="paper" />
      <Section tone="ivory" compact>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <h2 className={h2}>{pg.storyTitle}</h2>
          <div className="space-y-4">{pg.story.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pg.values.map((v) => <li key={v.title} className="card p-5"><h3 className="font-semibold text-navy">{v.title}</h3><p className="mt-1 text-[0.95rem] text-muted">{v.text}</p></li>)}
        </ul>
        <div className="mt-8 rounded-2xl bg-paper p-5 sm:p-6">
          <h3 className="font-semibold text-navy">{pg.internationalTitle}</h3>
          <p className="mt-1 text-muted">{pg.internationalText}</p>
          <Link href={href(locale, "firstInfo")} className="link mt-2 inline-flex min-h-11 items-center text-[0.95rem]">{t.footer.firstInfo}</Link>
        </div>
      </Section>
      <CtaBand locale={locale} t={t} title={t.home.closingTitle} text={t.home.closingText} topic="general" />
    </>
  );
}

/* ================================================================ Beraterseite */
export function TeamMemberPage({ locale, t, a }: { locale: Locale; t: Dict; a: Advisor }) {
  const name = advisorName(a, locale);
  const others = activeAdvisors().filter((x) => x.id !== a.id);
  const focus = a.focus.filter((f) => f in t.services.items) as ServiceKey[];
  const phone = a.phone ?? company.phone;
  const phoneDisplay = a.phoneDisplay ?? company.phoneDisplay;
  return (
    <>
      <section className="navy-surface on-dark text-white">
        <Container className="pb-10 pt-6 sm:pb-14 sm:pt-8">
          <Breadcrumb locale={locale} t={t} items={[{ label: t.nav.about, href: href(locale, "about") }, { label: name }]} light />
          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[200px_1fr] sm:gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            <Portrait src={a.portrait} alt={name} initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} priority className="aspect-[4/5] w-40 rounded-2xl sm:w-full" sizes="(min-width:1024px) 280px, 200px" />
            <div>
              <Eyebrow light>{company.name}</Eyebrow>
              <h1 className="display text-[2.1rem] sm:text-[3rem]">{name}</h1>
              <p className="mt-1 font-semibold text-champagne-light">{a.position ? a.position[locale] : t.team.positionFallback}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2"><span className="text-[0.88rem] text-mist">{t.team.languages}</span><LangChips langs={a.languages} light /></div>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a href="#termin" className="btn btn-cta" data-track={`cta_member_${a.slug}`}>{fill(t.team.requestTo, { name: name.split(" ")[0] })} <ArrowRight size={18} className={arrow} aria-hidden="true" /></a>
                {phone && <a href={`tel:${phone}`} className="btn btn-ghost-light" data-track={`call_member_${a.slug}`}><Phone size={18} aria-hidden="true" /> <span className="ltr-nums">{phoneDisplay}</span></a>}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper" compact>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
          <div>
            {a.quote && (
              <figure className="mb-6 border-s-4 border-champagne ps-5">
                <Quote size={20} className="text-brass rtl:-scale-x-100" aria-hidden="true" />
                <blockquote className="mt-1 text-[1.2rem] font-semibold leading-snug text-navy sm:text-[1.4rem]">{a.quote[locale]}</blockquote>
              </figure>
            )}
            <div className="space-y-4">{a.bio[locale].map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <aside className="space-y-3">
            <div className="rounded-2xl bg-ivory p-5">
              <h2 className="font-semibold text-navy">{t.team.background}</h2>
              <ul className="mt-2 space-y-2 text-[0.95rem]">{a.background[locale].map((b) => <li key={b} className="flex gap-2"><Check size={17} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />{b}</li>)}</ul>
            </div>
            {focus.length > 0 && (
              <div className="rounded-2xl bg-ivory p-5">
                <h2 className="font-semibold text-navy">{t.team.focus}</h2>
                <p className="mt-1 text-[0.95rem] text-muted">{focus.map((f) => t.services.items[f].title).join(" · ")}</p>
              </div>
            )}
            <div className="rounded-2xl border border-line p-5 text-[0.95rem]">
              <h2 className="font-semibold text-navy">{t.team.contactTitle}</h2>
              <ul className="mt-2 space-y-1.5">
                {phone && <li className="flex gap-2"><Phone size={17} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" /><a href={`tel:${phone}`} className="link ltr-nums">{phoneDisplay}</a></li>}
                {a.email && <li className="flex gap-2"><Mail size={17} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" /><a href={`mailto:${a.email}`} className="link">{a.email}</a></li>}
                <li className="flex gap-2"><MapPin size={17} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />{company.office.street}, {company.office.postalCode} {company.office.cityLocalized[locale]}</li>
              </ul>
              {a.bookingUrl && <a href={a.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full">{t.team.bookDirect}</a>}
              <Link href={`${href(locale, "firstInfo")}#${a.slug}`} className="link mt-3 inline-flex min-h-11 items-center text-[0.9rem]">{t.footer.firstInfo}</Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="termin" tone="ivory" compact>
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <div>
            <h2 className={h2}>{fill(t.team.requestTo, { name })}</h2>
            <p className="mt-3 text-muted">{t.home.closingText}</p>
          </div>
          <LeadForm locale={locale} t={t.form} modes={formModes()} isPreview={isPreview} phone={phone} phoneDisplay={phoneDisplay} backLabel={t.common.back} idPrefix={`lead-${a.slug}`} advisor={{ slug: a.slug, name }} />
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="paper" compact>
          <SectionHead title={t.team.otherAdvisors} link={{ href: href(locale, "about"), label: t.home.teamLink }} />
          <ul className="grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={teamHref(locale, o.slug)} className="card lift group flex h-full items-center gap-4 p-4" data-track={`other_advisor_${o.slug}`}>
                  <Portrait src={o.portrait} alt="" initials={initials(o)} placeholderLabel="" className="h-24 w-24 shrink-0 rounded-xl" sizes="96px" />
                  <span className="min-w-0 flex-1">
                    <span className="display block text-[1.25rem] text-navy">{advisorName(o, locale)}</span>
                    <span className="mt-1 line-clamp-2 block text-[0.95rem] leading-snug text-muted">{o.short[locale]}</span>
                    <span className="mt-2 flex gap-1">{o.languages.map((l) => <LangFlag key={l} l={l} size={18} />)}</span>
                  </span>
                  <ChevronRight size={20} className={`shrink-0 text-navy/50 transition-transform group-hover:translate-x-1 ${arrow}`} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

/* ================================================================ Kontakt */
export function ContactPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.contact;
  const team = activeAdvisors();
  return (
    <>
      <section className="navy-surface on-dark text-white">
        <Container className="pb-8 pt-6 sm:pb-12 sm:pt-8">
          <Breadcrumb locale={locale} t={t} items={[{ label: t.nav.contact }]} light />
          <h1 className="display mt-6 text-[1.95rem] sm:text-[2.8rem]">{pg.title}</h1>
          <p className="mt-3 max-w-2xl text-mist">{pg.lead}</p>
        </Container>
      </section>
      <Section tone="ivory" compact>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div>
            <h2 className="sr-only">{pg.formTitle}</h2>
            <LeadForm locale={locale} t={t.form} modes={formModes()} isPreview={isPreview} phone={company.phone} phoneDisplay={company.phoneDisplay} backLabel={t.common.back} idPrefix="contact-lead" advisorOptions={activeAdvisors().map((a) => ({ slug: a.slug, name: advisorName(a, locale) }))} />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="mb-3 font-semibold text-navy">{pg.directTitle}</h2>
              <ContactBlock locale={locale} t={t} />
            </div>
            <div>
              <h2 className="mb-3 font-semibold text-navy">{pg.teamTitle}</h2>
              <ul className="space-y-2">
                {team.map((a) => (
                  <li key={a.id}>
                    <Link href={`${teamHref(locale, a.slug)}#termin`} className="card card-hover flex items-center gap-3 p-3" data-track={`contact_advisor_${a.slug}`}>
                      <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel="" className="h-14 w-14 rounded-full" sizes="56px" />
                      <span className="min-w-0 flex-1"><span className="block font-semibold text-navy">{advisorName(a, locale)}</span><span className="block text-[0.8rem] font-bold text-brass" dir="ltr">{a.languages.map((l) => l.toUpperCase()).join(" · ")}</span></span>
                      <ArrowRight size={18} className={`text-navy ${arrow}`} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ================================================================ Tools */
const chooseLabel: Record<Locale, string> = { de: "Tool wählen", en: "Choose a tool", fr: "Choisir un outil", ar: "اختر أداة" };

export function ToolsPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.tools;
  return (
    <>
      <PageHero locale={locale} t={t} eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={[{ label: t.nav.tools }]} />
      <Section tone="ivory" compact>
        <h2 className="sr-only">{chooseLabel[locale]}</h2>
        <ToolHub chooseLabel={chooseLabel[locale]} tools={[
          { id: "renten-check", title: retirementCheckTitle(locale), desc: retirementCheckIntro(locale), node: <RetirementCheck locale={locale} /> },
          { id: "versicherungs-check", title: insuranceChecklistTitle(locale), desc: insuranceChecklistIntro(locale), node: <InsuranceChecklist locale={locale} /> },
          { id: "vermoegensaufbau", title: wealthBuilderTitle(locale), desc: wealthBuilderIntro(locale), node: <WealthBuilder locale={locale} /> },
        ]} />
      </Section>
      <CtaBand locale={locale} t={t} title={t.home.closingTitle} text={t.home.closingText} topic="general" />
    </>
  );
}
