import { company } from "@/config/company";
import { activeAdvisors, advisorName } from "@/config/advisors";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import { isPreview } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { Missing, Value } from "@/components/ui/Missing";

function Shell({ title, t, children }: { title: string; t: Dict; children: React.ReactNode }) {
  return (
    <section className="bg-ivory">
      <Container className="max-w-[880px] pb-24 pt-12">
        <h1 className="display text-[2.8rem] text-navy sm:text-[3.6rem]">{title}</h1>
        {isPreview && <p className="mt-6 rounded-md border-2 border-dashed border-amber-600 bg-amber-50 p-4 text-[0.95rem] font-semibold text-amber-950">{t.legal.draftNotice}</p>}
        <div className="mt-10 space-y-10 [&_h2]:text-[1.35rem] [&_h2]:font-bold [&_h2]:text-navy [&_h3]:font-bold [&_h3]:text-navy [&_p]:mt-3">{children}</div>
      </Container>
    </section>
  );
}

function CompanyAddress() {
  const l = company.legal;
  return (
    <p>
      {company.name}{l.legalForm && ` (${l.legalForm})`}<br />
      <Value value={l.legalName} label="Rechtsträger / Firma laut Gewerbeanmeldung" /><br />
      {company.office.street}<br />{company.office.postalCode} {company.office.city}
    </p>
  );
}

export function ImprintPage({ t }: { locale: Locale; t: Dict }) {
  const i = t.legal.imprint;
  return (
    <Shell title={i.title} t={t}>
      <div><h2>{i.provider}</h2><CompanyAddress /></div>
      <div><h2>{i.represented}</h2><p><Value value={company.legal.representedBy} label={i.represented} /></p></div>
      <div>
        <h2>{i.contact}</h2>
        <p>{t.common.phoneLabel}: {company.phoneDisplay ? <span className="ltr-nums">{company.phoneDisplay}</span> : <Missing label={t.common.phoneLabel} />}<br />
          {t.common.emailLabel}: <Value value={company.email} label={t.common.emailLabel} /></p>
      </div>
      <div><h2>{i.intermediary}</h2><p>{i.intermediaryText}</p></div>
      <div><h2>{i.rules}</h2><p>{i.rulesText}</p></div>
      {(company.legal.vatId || isPreview) && <div><h2>{i.vat}</h2><p><Value value={company.legal.vatId} label={`${i.vat} (falls vorhanden)`} /></p></div>}
      <div><h2>{i.responsible}</h2><p><Value value={company.legal.responsiblePerson} label={i.responsible} /></p></div>
      <div><h2>{i.dispute}</h2><p>{i.disputeText}</p><ul className="mt-3 list-disc space-y-2 ps-5">{i.ombudsmen.map((o) => <li key={o}>{o}</li>)}</ul></div>
    </Shell>
  );
}

export function PrivacyPage({ t }: { locale: Locale; t: Dict }) {
  const p = t.legal.privacy;
  return (
    <Shell title={p.title} t={t}>
      {p.sections.map((s, idx) => (
        <div key={s.h}>
          <h2>{s.h}</h2>
          <p>{s.t}</p>
          {idx === 0 && <div className="mt-3"><CompanyAddress /><p><Value value={company.legal.privacyContact} label="Datenschutz-Kontakt (E-Mail)" /></p></div>}
          {idx === 3 && <p><Value value={company.legal.hostingProvider} label="Hosting-Anbieter inkl. AV-Vertrag" /></p>}
        </div>
      ))}
    </Shell>
  );
}

/** Erstinformation – ein Block je Berater (§ 15 VersVermV ist personenbezogen) */
export function FirstInfoPage({ locale, t }: { locale: Locale; t: Dict }) {
  const f = t.legal.firstInfo;
  return (
    <Shell title={f.title} t={t}>
      <p className="text-[1.1rem]">{f.intro}</p>
      {activeAdvisors().map((a) => (
        <article key={a.id} id={a.slug} className="scroll-mt-28 rounded-[var(--radius-soft)] border border-line bg-paper p-6 sm:p-8">
          <h2 className="display !text-[2rem] !font-medium">{advisorName(a, locale)}</h2>
          <div className="mt-4 space-y-6">
            <div><h3>{f.name}</h3><p>{a.firstName} {a.lastName}<br />{company.office.street}, {company.office.postalCode} {company.office.city}</p></div>
            <div><h3>{f.status}</h3><p>{a.intermediaryStatus ? f.statusMap[a.intermediaryStatus] : <Missing label={`${f.status} (§ 34d GewO)`} />}</p></div>
            <div><h3>{f.insurers}</h3>{a.insurers.length ? <ul className="mt-3 list-disc ps-5">{a.insurers.map((x) => <li key={x}>{x}</li>)}</ul> : <p><Missing label={f.insurers} /></p>}</div>
            <div><h3>{f.register}</h3><p>{f.registerNumber}: <Value value={a.registerNumber} label={f.registerNumber} /></p><p>{f.registerText}</p><p>{f.authority}: <Value value={a.supervisoryAuthority} label={f.authority} /></p></div>
            <div><h3>{f.shareholdings}</h3><p>{a.shareholdings ? a.shareholdings[locale] : <Missing label={f.shareholdings} />}</p></div>
            <div><h3>{f.remuneration}</h3><p>{a.remuneration ? a.remuneration[locale] : <Missing label={f.remuneration} />}</p></div>
          </div>
        </article>
      ))}
      <div><h2>{f.advice}</h2><p>{f.adviceText}</p></div>
      <div><h2>{f.complaints}</h2><ul className="mt-3 list-disc space-y-2 ps-5">{t.legal.imprint.ombudsmen.map((o) => <li key={o}>{o}</li>)}</ul></div>
    </Shell>
  );
}
