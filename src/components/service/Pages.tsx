import Link from "next/link";
import { ArrowRight, Check, Info, CalendarCheck, Phone, ChevronRight, Lightbulb, ExternalLink, BadgeCheck, Mail, MapPin, Quote } from "lucide-react";
import { company } from "@/config/company";
import { activeAdvisors, advisorName, type Advisor, type TopicKey } from "@/config/advisors";
import { products, productsCheckedAt } from "@/config/products";
import { extraKeys, href, privateServices, businessServices, serviceKeys, teamHref, type Locale, type RouteKey, type ServiceKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { fill } from "@/lib/format";
import { isPreview } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { AdvisorCard, ContactBlock, ExtrasStrip, Faq, LangChips, ServiceList, TeamSection, extraIcons, formModes, initials } from "@/components/home/Home";
import { LeadForm } from "@/components/forms/LeadForm";
import { IncomeValue, KidsSavings, PensionGap } from "@/components/calculators/Calculators";
import { ArrivalChecklist, InflationCalc, InsuranceCheck } from "@/components/calculators/Tools";

const topicFor: Record<ServiceKey, TopicKey> = { retirement: "retirement", kids: "kids", bu: "bu", pkv: "pkv", bav: "bav", bkv: "bkv" };
const relatedFor: Record<ServiceKey, ServiceKey[]> = { retirement: ["kids", "bav"], kids: ["retirement", "bu"], bu: ["retirement", "pkv"], pkv: ["bu", "retirement"], bav: ["bkv", "retirement"], bkv: ["bav", "pkv"] };

export function Breadcrumb({ locale, t, items }: { locale: Locale; t: Dict; items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.92rem] text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href={href(locale, "home")} className="hover:text-navy">{t.common.breadcrumbHome}</Link></li>
        {items.map((i, idx) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="rtl:rotate-180" aria-hidden="true" />
            {i.href && idx < items.length - 1 ? <Link href={i.href} className="hover:text-navy">{i.label}</Link> : <span aria-current="page">{i.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function PageHero({ eyebrow, title, lead, children, crumbs }: { eyebrow: string; title: string; lead: string; children?: React.ReactNode; crumbs: React.ReactNode }) {
  return (
    <section className="bg-ivory">
      <Container className="pb-16 pt-8 sm:pt-10 lg:pb-24">
        {crumbs}
        <div className="mt-10 max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display reveal text-[2.5rem] text-navy sm:text-[3.7rem] lg:text-[4.3rem]">{title}</h1>
          <p className="reveal reveal-delay-1 mt-7 max-w-3xl text-[1.12rem] leading-relaxed text-muted sm:text-[1.22rem]">{lead}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}

function CtaBand({ locale, t, title, text, button, topic }: { locale: Locale; t: Dict; title: string; text: string; button: string; topic: string }) {
  const team = activeAdvisors().slice(0, 3);
  return (
    <section className="navy-surface on-dark text-white">
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex items-center gap-6">
          <div className="hidden shrink-0 -space-x-4 sm:flex rtl:space-x-reverse" aria-hidden="true">
            {team.map((a) => <Portrait key={a.id} src={a.portrait} alt="" initials={initials(a)} placeholderLabel="" className="h-20 w-20 rounded-full ring-4 ring-navy" sizes="80px" />)}
          </div>
          <div>
            <h2 className="display text-[2.1rem] sm:text-[2.7rem]">{title}</h2>
            <p className="mt-3 text-mist">{text}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link href={href(locale, "contact", { topic })} className="btn btn-gold" data-track={`cta_band_${topic}`}><CalendarCheck size={20} aria-hidden="true" /> {button}</Link>
          {company.phone && <a href={`tel:${company.phone}`} className="btn btn-ghost-light" data-track={`call_band_${topic}`}><Phone size={18} aria-hidden="true" /> <span className="ltr-nums">{company.phoneDisplay}</span></a>}
        </div>
      </Container>
    </section>
  );
}

/* ================================================================ Service */
export function ServicePage({ locale, t, k }: { locale: Locale; t: Dict; k: ServiceKey }) {
  const s = t.servicePages[k];
  const isBusiness = k === "bav" || k === "bkv";
  const split = "split" in s ? (s as typeof t.servicePages.bav).split : null;
  const prod = products[k];
  const experts = activeAdvisors().filter((a) => a.focus.includes(topicFor[k]));
  const calc = k === "kids" ? <KidsSavings locale={locale} t={t.calc} /> : k === "retirement" ? <PensionGap locale={locale} t={t.calc} /> : k === "bu" ? <IncomeValue locale={locale} t={t.calc} /> : null;

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} lead={s.lead}
        crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: isBusiness ? t.nav.business : t.nav.private, href: href(locale, isBusiness ? "business" : "private") }, { label: t.services.items[k].title }]} />}>
        <div className="reveal reveal-delay-2 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={href(locale, "contact", { topic: topicFor[k] })} className="btn btn-primary" data-track={`cta_servicehero_${k}`}><CalendarCheck size={20} aria-hidden="true" /> {s.ctaButton}</Link>
          {company.phone && <a href={`tel:${company.phone}`} className="btn btn-ghost" data-track={`call_servicehero_${k}`}><Phone size={18} aria-hidden="true" /> {t.common.callNumber}</a>}
        </div>
      </PageHero>

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="space-y-6 text-[1.1rem]">
            {s.intro.map((p) => <p key={p}>{p}</p>)}
            <div className="flex gap-4 rounded-[var(--radius-soft)] border-s-4 border-champagne bg-ivory p-6">
              <Lightbulb size={24} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
              <div><p className="font-bold text-navy">{t.service.example}</p><p className="mt-1 text-muted">{s.example}</p></div>
            </div>
          </div>
          <aside className="rounded-[var(--radius-soft)] bg-sand p-8">
            <h2 className="text-[1.3rem] font-bold text-navy">{t.service.forWhom}</h2>
            <ul className="mt-5 space-y-4">
              {s.audience.map((a) => <li key={a} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-brass" aria-hidden="true" /><span>{a}</span></li>)}
            </ul>
          </aside>
        </div>
      </Section>

      {split && (
        <Section tone="sand">
          <div className="grid gap-6 md:grid-cols-2">
            {(["employer", "employee"] as const).map((x) => (
              <div key={x} className={`rounded-[var(--radius-soft)] p-8 sm:p-10 ${x === "employer" ? "navy-surface text-white" : "bg-paper"}`}>
                <h2 className={`display text-[2rem] ${x === "employer" ? "text-white" : "text-navy"}`}>{split[x].title}</h2>
                <ul className="mt-6 space-y-4">
                  {split[x].items.map((i) => <li key={i} className="flex gap-3"><Check size={20} className={`mt-1 shrink-0 ${x === "employer" ? "text-champagne-light" : "text-brass"}`} aria-hidden="true" /><span className={x === "employer" ? "text-mist" : ""}>{i}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <h2 className="display max-w-3xl text-[2.3rem] text-navy sm:text-[3rem]">{t.service.how}</h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-soft)] border border-line bg-line md:grid-cols-2">
          {s.how.map((h, i) => (
            <li key={h.title} className="bg-paper p-8 sm:p-10">
              <span className="display text-[1.5rem] text-brass" aria-hidden="true">0{i + 1}</span>
              <h3 className="mt-2 text-[1.22rem] font-bold text-navy">{h.title}</h3>
              <p className="mt-3 text-muted">{h.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[var(--radius-soft)] border border-line p-8 sm:p-10">
            <h2 className="display text-[2rem] text-navy">{t.service.benefits}</h2>
            <ul className="mt-6 space-y-4">{s.benefits.map((b) => <li key={b} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-success" aria-hidden="true" /><span>{b}</span></li>)}</ul>
          </div>
          <div className="rounded-[var(--radius-soft)] border-2 border-navy/15 bg-ivory p-8 sm:p-10">
            <h2 className="display text-[2rem] text-navy">{t.service.limits}</h2>
            <ul className="mt-6 space-y-4">{s.limits.map((b) => <li key={b} className="flex gap-3"><Info size={20} className="mt-1 shrink-0 text-navy" aria-hidden="true" /><span>{b}</span></li>)}</ul>
          </div>
        </div>
      </Section>

      {/* Verifizierte Produktinformationen */}
      <Section tone="sand">
        <div className="grid gap-10 rounded-[var(--radius-soft)] bg-paper p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="flex items-center gap-2 text-[0.9rem] font-semibold text-success"><BadgeCheck size={18} aria-hidden="true" /> {t.service.provider}</p>
            <h2 className="display mt-3 text-[1.9rem] text-navy">{prod.title}</h2>
            <p className="mt-3 text-muted">{prod.carrier}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{prod.names.map((n) => <li key={n} className="rounded-full border border-line px-3 py-1 text-[0.85rem] text-navy" dir="ltr">{n}</li>)}</ul>
          </div>
          <div>
            <ul className="space-y-3">{prod.facts[locale].map((f) => <li key={f} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-brass" aria-hidden="true" /><span>{f}</span></li>)}</ul>
            <p className="mt-6 text-[0.88rem] text-muted">
              {t.service.providerPending}{" "}
              <a href={prod.source} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">ergo.de <ExternalLink size={13} aria-hidden="true" /><span className="sr-only">({t.common.externalNote})</span></a>{" "}
              · {new Date(productsCheckedAt).toLocaleDateString(locale === "ar" ? "ar-u-nu-latn" : locale)}
            </p>
          </div>
        </div>
      </Section>

      {calc && <Section><Eyebrow>{t.service.tryCalc}</Eyebrow><h2 className="sr-only">{t.service.tryCalc}</h2><div className="mt-6">{calc}</div></Section>}

      <Section tone={calc ? "paper" : "ivory"}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display text-[2.3rem] text-navy sm:text-[3rem]">{t.service.faq}</h2>
          <Faq items={s.faq} idPrefix={`faq-${k}`} />
        </div>
      </Section>

      {experts.length > 0 && (
        <Section tone="sand">
          <h2 className="display mb-10 text-[2.2rem] text-navy sm:text-[2.8rem]">{t.service.advisorsTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{experts.map((a) => <AdvisorCard key={a.id} a={a} locale={locale} t={t} compact />)}</div>
        </Section>
      )}

      <CtaBand locale={locale} t={t} title={s.ctaTitle} text={s.ctaText} button={s.ctaButton} topic={topicFor[k]} />

      <Section tone="paper">
        <h2 className="text-[1.3rem] font-bold text-navy">{t.service.related}</h2>
        <div className="mt-4"><ServiceList locale={locale} t={t} keys={relatedFor[k]} /></div>
      </Section>
    </>
  );
}

/* ================================================================ Private / Business / Solutions */
export function PrivatePage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.private;
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.private }]} />} />
      <Section tone="sand">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pg.audiences.map((a) => <li key={a.title} className="rounded-[var(--radius-soft)] bg-paper p-7"><h2 className="text-[1.2rem] font-bold text-navy">{a.title}</h2><p className="mt-3 text-muted">{a.text}</p></li>)}
        </ul>
      </Section>
      <Section>
        <h2 className="display mb-10 text-[2.3rem] text-navy sm:text-[3rem]">{pg.topicsTitle}</h2>
        <ServiceList locale={locale} t={t} keys={privateServices} />
        <ExtrasStrip locale={locale} t={t} />
      </Section>
      <CtaBand locale={locale} t={t} title={t.finalCta.title} text={t.finalCta.text} button={t.common.book} topic="general" />
    </>
  );
}

export function BusinessPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.business;
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.business }]} />}>
        <Link href={href(locale, "contact", { topic: "bav" })} className="btn btn-primary mt-10" data-track="cta_business_hero"><CalendarCheck size={20} aria-hidden="true" /> {pg.cta}</Link>
      </PageHero>
      <Section tone="navy">
        <ul className="grid gap-10 md:grid-cols-3">
          {pg.points.map((p) => <li key={p.title} className="border-t border-champagne-light/60 pt-6"><h2 className="text-[1.22rem] font-bold text-white">{p.title}</h2><p className="mt-3 text-mist">{p.text}</p></li>)}
        </ul>
      </Section>
      <Section>
        <h2 className="display mb-10 text-[2.3rem] text-navy sm:text-[3rem]">{pg.topicsTitle}</h2>
        <ServiceList locale={locale} t={t} keys={businessServices} />
      </Section>
      <CtaBand locale={locale} t={t} title={pg.cta} text={t.servicePages.bkv.ctaText} button={t.common.book} topic="bav" />
    </>
  );
}

export function SolutionsPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.solutions;
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.solutions }]} />} />
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="tracking-label mb-4 text-[0.8rem] font-semibold text-brass">{t.services.privateLabel}</h2>
            <ServiceList locale={locale} t={t} keys={privateServices} />
          </div>
          <div>
            <h2 className="tracking-label mb-4 text-[0.8rem] font-semibold text-brass">{t.services.businessLabel}</h2>
            <ServiceList locale={locale} t={t} keys={businessServices} />
          </div>
        </div>
      </Section>
      <ExtrasSection locale={locale} t={t} />
      <CtaBand locale={locale} t={t} title={t.finalCta.title} text={t.finalCta.text} button={t.common.book} topic="general" />
    </>
  );
}

function ExtrasSection({ locale, t }: { locale: Locale; t: Dict }) {
  const e = t.extras;
  return (
    <Section tone="sand">
      <Eyebrow>{e.eyebrow}</Eyebrow>
      <h2 className="display max-w-3xl text-[2.3rem] text-navy sm:text-[3rem]">{e.title}</h2>
      <p className="mt-5 max-w-3xl text-muted">{e.lead}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {extraKeys.map((k) => {
          const it = e.items[k];
          const Icon = extraIcons[k];
          return (
            <article key={k} id={k} className="scroll-mt-28 rounded-[var(--radius-soft)] bg-paper p-8">
              <Icon size={28} className="text-brass" aria-hidden="true" />
              <h3 className="display mt-4 text-[1.9rem] text-navy">{it.title}</h3>
              <p className="mt-1 font-semibold text-navy">{it.short}</p>
              <p className="mt-4 text-muted">{it.text}</p>
              <p className="mt-4 text-[0.95rem]"><strong className="text-navy">{e.forWhom}:</strong> {it.forWhom}</p>
              <p className="mt-3 flex gap-2 rounded-md bg-ivory p-3 text-[0.92rem] text-muted"><Info size={18} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" /> <span><strong className="text-navy">{e.keep}:</strong> {it.note}</span></p>
              <Link href={href(locale, "contact", { topic: "extras" })} className="link mt-5 inline-flex min-h-11 items-center gap-2 font-semibold" data-track={`cta_extra_${k}`}>{t.common.book} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" /></Link>
            </article>
          );
        })}
      </div>
      <div className="mt-6 rounded-[var(--radius-soft)] border-2 border-dashed border-champagne p-8">
        <h3 className="text-[1.25rem] font-bold text-navy">{e.onRequest.title}</h3>
        <p className="mt-2 text-muted">{e.onRequest.text}</p>
      </div>
    </Section>
  );
}

export function ExtrasPage({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <>
      <PageHero eyebrow={t.extras.eyebrow} title={t.extras.title} lead={t.extras.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.solutions, href: href(locale, "solutions") }, { label: t.extras.eyebrow }]} />} />
      <ExtrasSection locale={locale} t={t} />
      <CtaBand locale={locale} t={t} title={t.finalCta.title} text={t.finalCta.text} button={t.common.book} topic="extras" />
    </>
  );
}

/* ================================================================ About (Unternehmen) */
export function AboutPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.about;
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.about }]} />} />
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display text-[2.3rem] text-navy sm:text-[2.9rem]">{pg.storyTitle}</h2>
          <div className="space-y-5 text-[1.1rem]">{pg.story.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
      </Section>
      <TeamSection locale={locale} t={t} tone="sand" />
      <Section>
        <h2 className="display text-[2.3rem] text-navy sm:text-[2.9rem]">{pg.valuesTitle}</h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pg.values.map((v) => <li key={v.title} className="border-t border-navy pt-5"><h3 className="text-[1.2rem] font-bold text-navy">{v.title}</h3><p className="mt-2 text-muted">{v.text}</p></li>)}
        </ul>
      </Section>
      <Section tone="navy">
        <div className="max-w-3xl">
          <h2 className="display text-[2.3rem] text-white sm:text-[2.9rem]">{pg.internationalTitle}</h2>
          <p className="mt-5 text-mist">{pg.internationalText}</p>
          <Link href={href(locale, "firstInfo")} className="link mt-6 inline-flex min-h-11 items-center !text-champagne-light">{t.footer.firstInfo}</Link>
        </div>
      </Section>
      <CtaBand locale={locale} t={t} title={t.finalCta.title} text={t.finalCta.text} button={t.common.book} topic="general" />
    </>
  );
}

/* ================================================================ Team member */
export function TeamMemberPage({ locale, t, a }: { locale: Locale; t: Dict; a: Advisor }) {
  const name = advisorName(a, locale);
  const others = activeAdvisors().filter((x) => x.id !== a.id);
  const focus = a.focus.filter((f) => (serviceKeys as readonly string[]).includes(f)) as ServiceKey[];
  const phone = a.phone ?? company.phone;
  const phoneDisplay = a.phoneDisplay ?? company.phoneDisplay;
  return (
    <>
      <section className="bg-ivory">
        <Container className="pb-16 pt-8 sm:pt-10 lg:pb-24">
          <Breadcrumb locale={locale} t={t} items={[{ label: t.nav.about, href: href(locale, "about") }, { label: name }]} />
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute -inset-3 hidden translate-x-5 translate-y-5 border border-champagne sm:block rtl:-translate-x-5" aria-hidden="true" />
              <Portrait src={a.portrait} alt={name} initials={initials(a)} placeholderLabel={t.common.portraitPlaceholder} priority className="aspect-[4/5] w-full" />
            </div>
            <div>
              <Eyebrow>{t.team.eyebrow} · {company.name}</Eyebrow>
              <h1 className="display text-[2.8rem] text-navy sm:text-[4rem]">{name}</h1>
              <p className="mt-2 text-[1.1rem] font-semibold text-brass">{a.position ? a.position[locale] : t.team.positionFallback}</p>
              {a.quote && (
                <figure className="mt-8 border-s-2 border-champagne ps-6">
                  <Quote size={22} className="text-brass rtl:-scale-x-100" aria-hidden="true" />
                  <blockquote className="display mt-2 text-[1.7rem] leading-snug text-navy" style={{ fontStyle: locale === "ar" ? "normal" : "italic" }}>{a.quote[locale]}</blockquote>
                </figure>
              )}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div><p className="mb-2 font-semibold text-navy">{t.team.languages}</p><LangChips langs={a.languages} /></div>
                <div><p className="mb-2 font-semibold text-navy">{t.team.focus}</p><p className="text-muted">{focus.map((f) => t.services.items[f].title).join(" · ")}</p></div>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#termin" className="btn btn-primary" data-track={`cta_member_${a.slug}`}><CalendarCheck size={20} aria-hidden="true" /> {fill(t.team.requestTo, { name: a.firstName })}</a>
                {phone && <a href={`tel:${phone}`} className="btn btn-ghost" data-track={`call_member_${a.slug}`}><Phone size={18} aria-hidden="true" /> <span className="ltr-nums">{phoneDisplay}</span></a>}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <h2 className="display text-[2.2rem] text-navy">{t.team.about}</h2>
            <div className="mt-6 space-y-5 text-[1.1rem]">{a.bio[locale].map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-[var(--radius-soft)] bg-sand p-7">
              <h3 className="font-bold text-navy">{t.team.background}</h3>
              <ul className="mt-4 space-y-3">{a.background[locale].map((b) => <li key={b} className="flex gap-3"><Check size={20} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />{b}</li>)}</ul>
            </div>
            <div className="rounded-[var(--radius-soft)] border border-line p-7">
              <h3 className="font-bold text-navy">{t.team.contactTitle}</h3>
              <ul className="mt-4 space-y-3 text-[0.98rem]">
                {phone && <li className="flex gap-3"><Phone size={18} className="mt-1 shrink-0 text-brass" aria-hidden="true" /><a href={`tel:${phone}`} className="link ltr-nums">{phoneDisplay}</a></li>}
                {a.email && <li className="flex gap-3"><Mail size={18} className="mt-1 shrink-0 text-brass" aria-hidden="true" /><a href={`mailto:${a.email}`} className="link">{a.email}</a></li>}
                <li className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-brass" aria-hidden="true" />{company.office.street}, {company.office.postalCode} {company.office.cityLocalized[locale]}</li>
              </ul>
              {a.bookingUrl && <a href={a.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-5 w-full">{t.team.bookDirect}</a>}
            </div>
            <div className="rounded-[var(--radius-soft)] border border-line p-7">
              <h3 className="font-bold text-navy">{t.team.transparency}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{t.team.transparencyText}</p>
              <Link href={`${href(locale, "firstInfo")}#${a.slug}`} className="link mt-3 inline-flex min-h-11 items-center">{t.footer.firstInfo}</Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="termin" tone="sand">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>{t.finalCta.eyebrow}</Eyebrow>
            <h2 className="display text-[2.4rem] text-navy sm:text-[3rem]">{fill(t.team.requestTo, { name: name })}</h2>
            <p className="mt-5 text-muted">{t.finalCta.text}</p>
          </div>
          <div className="lg:self-start">
            <LeadForm locale={locale} t={t.form} modes={formModes()} isPreview={isPreview} phone={phone} phoneDisplay={phoneDisplay} backLabel={t.common.back} idPrefix={`lead-${a.slug}`} advisor={{ slug: a.slug, name }} />
          </div>
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="paper">
          <h2 className="display mb-10 text-[2.2rem] text-navy">{t.team.otherAdvisors}</h2>
          <div className={`grid gap-6 md:grid-cols-2 ${others.length > 1 ? "lg:grid-cols-3" : "max-w-3xl"}`}>{others.map((o) => <AdvisorCard key={o.id} a={o} locale={locale} t={t} compact />)}</div>
        </Section>
      )}
    </>
  );
}

/* ================================================================ Contact */
export function ContactPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.contact;
  const team = activeAdvisors();
  return (
    <>
      <section className="bg-ivory">
        <Container className="pb-20 pt-8 sm:pt-10">
          <Breadcrumb locale={locale} t={t} items={[{ label: t.nav.contact }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>{pg.eyebrow}</Eyebrow>
              <h1 className="display text-[2.8rem] text-navy sm:text-[3.8rem]">{pg.title}</h1>
              <p className="mt-5 text-[1.15rem] text-muted">{pg.lead}</p>
              <div className="hidden lg:block">
                <h2 className="mb-5 mt-10 text-[1.2rem] font-bold text-navy">{pg.directTitle}</h2>
                <ContactBlock locale={locale} t={t} />
              </div>
            </div>
            <div className="lg:self-start">
              <h2 className="sr-only">{pg.formTitle}</h2>
              <LeadForm locale={locale} t={t.form} modes={formModes()} isPreview={isPreview} phone={company.phone} phoneDisplay={company.phoneDisplay} backLabel={t.common.back} idPrefix="contact-lead" />
              <div className="lg:hidden">
                <h2 className="mb-5 mt-12 text-[1.2rem] font-bold text-navy">{pg.directTitle}</h2>
                <ContactBlock locale={locale} t={t} />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Section tone="sand">
        <h2 className="display mb-8 text-[2.1rem] text-navy sm:text-[2.6rem]">{pg.teamTitle}</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {team.map((a) => (
            <li key={a.id}>
              <Link href={`${teamHref(locale, a.slug)}#termin`} className="flex items-center gap-5 rounded-[var(--radius-soft)] border border-line bg-paper p-4 hover:border-navy/50" data-track={`contact_advisor_${a.slug}`}>
                <Portrait src={a.portrait} alt="" initials={initials(a)} placeholderLabel="" className="h-20 w-20 shrink-0 rounded-full" sizes="80px" />
                <span className="flex-1">
                  <span className="display block text-[1.5rem] text-navy">{advisorName(a, locale)}</span>
                  <span className="mt-1 block text-[0.9rem] text-muted" dir="ltr">{a.languages.map((l) => l.toUpperCase()).join(" · ")}</span>
                </span>
                <ArrowRight size={20} className="text-navy rtl:rotate-180" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

/* ================================================================ Tools */
export function ToolsPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.tools;
  const nav: [string, string][] = [["#versicherungs-check", t.tools2.check.title], ["#rentenluecke", t.calc.pension.title], ["#kinder-sparziel", t.calc.kids.title], ["#arbeitskraft", t.calc.income.title], ["#inflation", t.tools2.inflation.title], ["#ankommen", t.tools2.arrival.title]];
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.tools }]} />}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {nav.map(([h, l]) => <li key={h}><a href={h} className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 font-semibold text-navy hover:border-navy">{l}</a></li>)}
        </ul>
      </PageHero>
      <Section tone="sand">
        <h2 className="sr-only">{pg.eyebrow}</h2>
        <div className="space-y-10">
          <InsuranceCheck locale={locale} t={t.tools2} discuss={t.calc.discuss} />
          <PensionGap locale={locale} t={t.calc} />
          <KidsSavings locale={locale} t={t.calc} />
          <IncomeValue locale={locale} t={t.calc} />
          <InflationCalc locale={locale} t={t.tools2} discuss={t.calc.discuss} disclaimer={t.calc.disclaimer} />
          <ArrivalChecklist locale={locale} t={t.tools2} discuss={t.calc.discuss} />
        </div>
      </Section>
      <CtaBand locale={locale} t={t} title={t.finalCta.title} text={t.finalCta.text} button={t.common.book} topic="general" />
    </>
  );
}

export type { RouteKey };
