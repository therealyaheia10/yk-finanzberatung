import Link from "next/link";
import { ArrowRight, Check, Info, CalendarCheck, Phone, ChevronRight } from "lucide-react";
import { advisor } from "@/config/advisor";
import { href, serviceKeys, type Locale, type RouteKey, type ServiceKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { advisorName } from "@/content";
import { isPreview } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Portrait } from "@/components/ui/Portrait";
import { Missing } from "@/components/ui/Missing";
import { ContactBlock, Faq, ServiceList, formModes } from "@/components/home/Home";
import { LeadForm } from "@/components/forms/LeadForm";
import { IncomeValue, KidsSavings, PensionGap } from "@/components/calculators/Calculators";

const topicFor: Record<ServiceKey, string> = { kids: "kids", bu: "bu", pkv: "pkv", bav: "benefits", bkv: "benefits" };
const relatedFor: Record<ServiceKey, ServiceKey[]> = { kids: ["bu", "pkv"], bu: ["kids", "pkv"], pkv: ["bu", "kids"], bav: ["bkv", "kids"], bkv: ["bav", "pkv"] };

function Breadcrumb({ locale, t, items }: { locale: Locale; t: Dict; items: { label: string; key?: RouteKey }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.92rem] text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href={href(locale, "home")} className="hover:text-navy">{t.common.breadcrumbHome}</Link></li>
        {items.map((i, idx) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="rtl:rotate-180" aria-hidden="true" />
            {i.key && idx < items.length - 1 ? <Link href={href(locale, i.key)} className="hover:text-navy">{i.label}</Link> : <span aria-current="page">{i.label}</span>}
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
          <h1 className="display reveal text-[2.6rem] text-navy sm:text-[3.8rem] lg:text-[4.4rem]">{title}</h1>
          <p className="reveal reveal-delay-1 mt-7 max-w-3xl text-[1.15rem] leading-relaxed text-muted sm:text-[1.25rem]">{lead}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}

function CtaBand({ locale, t, title, text, button, topic }: { locale: Locale; t: Dict; title: string; text: string; button: string; topic: string }) {
  return (
    <section className="navy-surface on-dark text-white">
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex items-center gap-6">
          <Portrait src={advisor.images.portraitMain} alt="" placeholderLabel={t.common.portraitPlaceholder} className="hidden h-24 w-24 shrink-0 rounded-full sm:block" sizes="96px" />
          <div>
            <h2 className="display text-[2.2rem] sm:text-[2.8rem]">{title}</h2>
            <p className="mt-3 text-mist">{text}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link href={href(locale, "contact", { topic })} className="btn btn-gold" data-track={`cta_service_${topic}`}>
            <CalendarCheck size={20} aria-hidden="true" /> {button}
          </Link>
          {advisor.phone && (
            <a href={`tel:${advisor.phone}`} className="btn btn-ghost-light" data-track={`call_service_${topic}`}>
              <Phone size={18} aria-hidden="true" /> <span className="ltr-nums">{advisor.phoneDisplay}</span>
            </a>
          )}
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
  const calc = k === "kids" ? <><KidsSavings locale={locale} t={t.calc} /><div className="h-8" /><PensionGap locale={locale} t={t.calc} /></>
    : k === "bu" ? <IncomeValue locale={locale} t={t.calc} /> : null;

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.title}
        lead={s.lead}
        crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: isBusiness ? t.nav.business : t.nav.private, key: isBusiness ? "business" : "private" }, { label: t.services.items[k].title }]} />}
      >
        <div className="reveal reveal-delay-2 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={href(locale, "contact", { topic: topicFor[k] })} className="btn btn-primary" data-track={`cta_servicehero_${k}`}>
            <CalendarCheck size={20} aria-hidden="true" /> {s.ctaButton}
          </Link>
          {advisor.phone && (
            <a href={`tel:${advisor.phone}`} className="btn btn-ghost" data-track={`call_servicehero_${k}`}>
              <Phone size={18} aria-hidden="true" /> {t.common.callNumber}
            </a>
          )}
        </div>
      </PageHero>

      {/* Erklärung + Zielgruppe */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="space-y-6 text-[1.12rem]">
            {s.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
          <aside className="rounded-[var(--radius-soft)] bg-sand p-8">
            <h2 className="text-[1.3rem] font-bold text-navy">{t.service.forWhom}</h2>
            <ul className="mt-5 space-y-4">
              {s.audience.map((a) => (
                <li key={a} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-brass" aria-hidden="true" /><span>{a}</span></li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {/* bAV: getrennte Ansprache */}
      {split && (
        <Section tone="sand">
          <div className="grid gap-6 md:grid-cols-2">
            {(["employer", "employee"] as const).map((x) => (
              <div key={x} className={`rounded-[var(--radius-soft)] p-8 sm:p-10 ${x === "employer" ? "navy-surface text-white" : "bg-paper"}`}>
                <h2 className={`display text-[2rem] ${x === "employer" ? "text-white" : "text-navy"}`}>{split[x].title}</h2>
                <ul className="mt-6 space-y-4">
                  {split[x].items.map((i) => (
                    <li key={i} className="flex gap-3"><Check size={20} className={`mt-1 shrink-0 ${x === "employer" ? "text-champagne-light" : "text-brass"}`} aria-hidden="true" /><span className={x === "employer" ? "text-mist" : ""}>{i}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* So funktioniert es */}
      <Section>
        <Eyebrow>{t.service.how}</Eyebrow>
        <h2 className="display max-w-3xl text-[2.3rem] text-navy sm:text-[3rem]">{t.service.how}</h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-soft)] border border-line bg-line md:grid-cols-2">
          {s.how.map((h, i) => (
            <li key={h.title} className="bg-paper p-8 sm:p-10">
              <span className="display text-[1.5rem] text-brass" aria-hidden="true">0{i + 1}</span>
              <h3 className="mt-2 text-[1.25rem] font-bold text-navy">{h.title}</h3>
              <p className="mt-3 text-muted">{h.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Vorteile & Grenzen */}
      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[var(--radius-soft)] border border-line p-8 sm:p-10">
            <h2 className="display text-[2rem] text-navy">{t.service.benefits}</h2>
            <ul className="mt-6 space-y-4">
              {s.benefits.map((b) => (
                <li key={b} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-success" aria-hidden="true" /><span>{b}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-soft)] border-2 border-navy/15 bg-ivory p-8 sm:p-10">
            <h2 className="display text-[2rem] text-navy">{t.service.limits}</h2>
            <ul className="mt-6 space-y-4">
              {s.limits.map((b) => (
                <li key={b} className="flex gap-3"><Info size={20} className="mt-1 shrink-0 text-navy" aria-hidden="true" /><span>{b}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {calc && (
        <Section tone="sand">
          <Eyebrow>{t.service.tryCalc}</Eyebrow>
          <div className="mt-6">{calc}</div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display text-[2.3rem] text-navy sm:text-[3rem]">{t.service.faq}</h2>
          <Faq items={s.faq} idPrefix={`faq-${k}`} />
        </div>
      </Section>

      <CtaBand locale={locale} t={t} title={s.ctaTitle} text={s.ctaText} button={s.ctaButton} topic={topicFor[k]} />

      {/* Anbieter- & Produktinformationen */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[1.3rem] font-bold text-navy">{t.service.provider}</h2>
            <p className="mt-4 text-[1rem] text-muted">{t.service.providerPending}</p>
            {advisor.insurers.length > 0 && (
              <ul className="mt-4 list-disc ps-5 text-[1rem]">{advisor.insurers.map((i) => <li key={i}>{i}</li>)}</ul>
            )}
            <p className="mt-4"><Missing label={`${t.common.toVerify}: PRODUCT-SOURCES.md`} /></p>
            <Link href={href(locale, "firstInfo")} className="link mt-4 inline-flex min-h-11 items-center">{t.footer.firstInfo}</Link>
          </div>
          <div>
            <h2 className="text-[1.3rem] font-bold text-navy">{t.service.related}</h2>
            <div className="mt-4"><ServiceList locale={locale} t={t} keys={relatedFor[k]} /></div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ================================================================ Private */
export function PrivatePage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.private;
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.private }]} />} />
      <Section tone="sand">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pg.audiences.map((a) => (
            <li key={a.title} className="rounded-[var(--radius-soft)] bg-paper p-7">
              <h2 className="text-[1.2rem] font-bold text-navy">{a.title}</h2>
              <p className="mt-3 text-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h2 className="display mb-10 text-[2.3rem] text-navy sm:text-[3rem]">{pg.topicsTitle}</h2>
        <ServiceList locale={locale} t={t} keys={["kids", "bu", "pkv"]} />
        <Link href={href(locale, "tools")} className="link mt-8 inline-flex min-h-11 items-center gap-2 font-semibold">{t.nav.tools} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" /></Link>
      </Section>
      <CtaBand locale={locale} t={t} title={t.finalCta.title} text={t.finalCta.text} button={t.common.book} topic="general" />
    </>
  );
}

/* ================================================================ Business */
export function BusinessPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.business;
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.business }]} />}>
        <Link href={href(locale, "contact", { topic: "benefits" })} className="btn btn-primary mt-10" data-track="cta_business_hero">
          <CalendarCheck size={20} aria-hidden="true" /> {pg.cta}
        </Link>
      </PageHero>
      <Section tone="navy">
        <ul className="grid gap-10 md:grid-cols-3">
          {pg.points.map((p) => (
            <li key={p.title} className="border-t border-champagne-light/60 pt-6">
              <h2 className="text-[1.25rem] font-bold text-white">{p.title}</h2>
              <p className="mt-3 text-mist">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h2 className="display mb-10 text-[2.3rem] text-navy sm:text-[3rem]">{pg.topicsTitle}</h2>
        <ServiceList locale={locale} t={t} keys={["bav", "bkv"]} />
      </Section>
      <CtaBand locale={locale} t={t} title={pg.cta} text={t.servicePages.bkv.ctaText} button={t.common.book} topic="benefits" />
    </>
  );
}

/* ================================================================ About */
export function AboutPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.about;
  const name = advisorName(locale);
  return (
    <>
      <section className="bg-ivory">
        <Container className="pb-16 pt-8 sm:pt-10 lg:pb-24">
          <Breadcrumb locale={locale} t={t} items={[{ label: t.nav.about }]} />
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow>{pg.eyebrow}</Eyebrow>
              <h1 className="display text-[2.8rem] text-navy sm:text-[4rem]">{pg.title}</h1>
              <p className="mt-3 text-[1.1rem] font-semibold text-brass">{advisor.jobTitle ? advisor.jobTitle[locale] : advisor.neutralJobTitle[locale]}</p>
              <div className="mt-8 space-y-5 text-[1.12rem]">
                {advisor.bioLong[locale].map((p) => <p key={p}>{p}</p>)}
              </div>
              <Link href={href(locale, "contact")} className="btn btn-primary mt-10" data-track="cta_about">
                <CalendarCheck size={20} aria-hidden="true" /> {pg.cta}
              </Link>
            </div>
            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute -inset-3 hidden translate-x-5 translate-y-5 border border-champagne sm:block rtl:-translate-x-5" aria-hidden="true" />
              <Portrait src={advisor.images.portraitOffice ?? advisor.images.portraitMain} alt={t.hero.portraitAlt} placeholderLabel={t.common.portraitPlaceholder} priority className="aspect-[4/5] w-full" />
            </div>
          </div>
        </Container>
      </section>
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="display text-[2.2rem] text-navy">{pg.backgroundTitle}</h2>
            <ul className="mt-6 space-y-3">
              {advisor.background[locale].map((b) => (
                <li key={b} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-brass" aria-hidden="true" />{b}</li>
              ))}
            </ul>
            <div className="mt-10 rounded-[var(--radius-soft)] bg-sand p-7">
              <h3 className="font-bold text-navy">{pg.statusTitle}</h3>
              <p className="mt-2 text-muted">{pg.statusText}</p>
              <Link href={href(locale, "firstInfo")} className="link mt-3 inline-flex min-h-11 items-center">{t.footer.firstInfo}</Link>
            </div>
          </div>
          <div>
            <h2 className="display text-[2.2rem] text-navy">{pg.valuesTitle}</h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {pg.values.map((v) => (
                <li key={v.title} className="border-t border-navy pt-5">
                  <h3 className="text-[1.2rem] font-bold text-navy">{v.title}</h3>
                  <p className="mt-2 text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="sand">
        <h2 className="display mb-10 text-[2.3rem] text-navy sm:text-[3rem]">{t.languages.title}</h2>
        <p className="max-w-3xl text-muted">{t.languages.text}</p>
      </Section>
      <CtaBand locale={locale} t={t} title={`${pg.cta} – ${name}`} text={t.finalCta.text} button={t.common.book} topic="general" />
    </>
  );
}

/* ================================================================ Contact */
export function ContactPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.contact;
  return (
    <section className="bg-ivory">
      <Container className="pb-24 pt-8 sm:pt-10">
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
            <LeadForm locale={locale} t={t.form} modes={formModes()} isPreview={isPreview} phone={advisor.phone} phoneDisplay={advisor.phoneDisplay} backLabel={t.common.back} idPrefix="contact-lead" />
            <div className="lg:hidden">
              <h2 className="mb-5 mt-12 text-[1.2rem] font-bold text-navy">{pg.directTitle}</h2>
              <ContactBlock locale={locale} t={t} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================ Tools */
export function ToolsPage({ locale, t }: { locale: Locale; t: Dict }) {
  const pg = t.pages.tools;
  return (
    <>
      <PageHero eyebrow={pg.eyebrow} title={pg.title} lead={pg.lead} crumbs={<Breadcrumb locale={locale} t={t} items={[{ label: t.nav.tools }]} />}>
        <ul className="mt-8 flex flex-wrap gap-3">
          {[["#rentenluecke", t.calc.pension.title], ["#kinder-sparziel", t.calc.kids.title], ["#arbeitskraft", t.calc.income.title]].map(([h, l]) => (
            <li key={h}><a href={h} className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-5 font-semibold text-navy hover:border-navy">{l}</a></li>
          ))}
        </ul>
      </PageHero>
      <Section tone="sand">
        <div className="space-y-10">
          <PensionGap locale={locale} t={t.calc} />
          <KidsSavings locale={locale} t={t.calc} />
          <IncomeValue locale={locale} t={t.calc} />
        </div>
      </Section>
      <CtaBand locale={locale} t={t} title={t.finalCta.title} text={t.finalCta.text} button={t.common.book} topic="general" />
    </>
  );
}

export { serviceKeys };
