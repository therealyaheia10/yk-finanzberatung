import { advisor, fullName } from "@/config/advisor";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import { isPreview } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { Missing, Value } from "@/components/ui/Missing";

function Shell({ title, t, children }: { title: string; t: Dict; children: React.ReactNode }) {
  return (
    <section className="bg-ivory">
      <Container className="max-w-[860px] pb-24 pt-12">
        <h1 className="display text-[2.8rem] text-navy sm:text-[3.6rem]">{title}</h1>
        {isPreview && (
          <p className="mt-6 rounded-md border-2 border-dashed border-amber-600 bg-amber-50 p-4 text-[0.95rem] font-semibold text-amber-950">{t.legal.draftNotice}</p>
        )}
        <div className="mt-10 space-y-10 [&_h2]:text-[1.35rem] [&_h2]:font-bold [&_h2]:text-navy [&_p]:mt-3">{children}</div>
      </Container>
    </section>
  );
}

function Address() {
  const l = advisor.legal;
  return (
    <p>
      <Value value={l.legalName ?? (advisor.previewIdentity ? null : fullName)} label="Name / Firma (laut Gewerbeanmeldung)" />
      {l.legalForm && <> ({l.legalForm})</>}
      <br />
      <Value value={l.address} label="Vollständige ladungsfähige Anschrift inkl. PLZ" />
    </p>
  );
}

export function ImprintPage({ t }: { locale: Locale; t: Dict }) {
  const i = t.legal.imprint;
  const s = advisor.intermediaryStatus;
  return (
    <Shell title={i.title} t={t}>
      <div><h2>{i.provider}</h2><Address /></div>
      <div>
        <h2>{i.contact}</h2>
        <p>
          {t.common.phoneLabel}: {advisor.phoneDisplay ? <span className="ltr-nums">{advisor.phoneDisplay}</span> : <Missing label={t.common.phoneLabel} />}<br />
          {t.common.emailLabel}: <Value value={advisor.email} label={t.common.emailLabel} />
        </p>
      </div>
      <div>
        <h2>{i.intermediary}</h2>
        <p><strong>{i.status}:</strong> {s ? t.legal.firstInfo.statusMap[s] : <Missing label={i.status} />}</p>
        <p><strong>{i.register}:</strong> <Value value={advisor.registerNumber} label={i.register} /></p>
        <p>{i.registerInfo}</p>
        <p><strong>{i.authority}:</strong> <Value value={advisor.supervisoryAuthority} label={i.authority} /></p>
      </div>
      <div><h2>{i.rules}</h2><p>{i.rulesText}</p></div>
      {(advisor.legal.vatId || isPreview) && <div><h2>{i.vat}</h2><p><Value value={advisor.legal.vatId} label={`${i.vat} (falls vorhanden)`} /></p></div>}
      <div><h2>{i.responsible}</h2><p><Value value={advisor.legal.responsiblePerson} label={i.responsible} /></p></div>
      <div>
        <h2>{i.dispute}</h2>
        <p>{i.disputeText}</p>
        <ul className="mt-3 list-disc space-y-2 ps-5">{i.ombudsmen.map((o) => <li key={o}>{o}</li>)}</ul>
      </div>
      <div><h2>{i.design}</h2><p>KASWAN Webdesign</p></div>
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
          {idx === 0 && (
            <div className="mt-3">
              <Address />
              <p><Value value={advisor.legal.privacyContact} label="Datenschutz-Kontakt (E-Mail)" /></p>
            </div>
          )}
          {idx === 3 && <p><Value value={advisor.legal.hostingProvider} label="Hosting-Anbieter inkl. AV-Vertrag" /></p>}
        </div>
      ))}
    </Shell>
  );
}

export function FirstInfoPage({ locale, t }: { locale: Locale; t: Dict }) {
  const f = t.legal.firstInfo;
  const s = advisor.intermediaryStatus;
  return (
    <Shell title={f.title} t={t}>
      <p className="text-[1.1rem]">{f.intro}</p>
      {isPreview && !advisor.firstInfoProcessConfirmed && (
        <p><Missing label="Prozess bestätigen: Erstinformation wird beim ersten Kontakt in Textform übergeben (§ 15 VersVermV)" /></p>
      )}
      <div><h2>{f.name}</h2><Address /></div>
      <div><h2>{f.status}</h2><p>{s ? f.statusMap[s] : <Missing label={`${f.status} (§ 34d GewO)`} />}</p></div>
      <div>
        <h2>{f.insurers}</h2>
        {advisor.insurers.length ? <ul className="mt-3 list-disc ps-5">{advisor.insurers.map((x) => <li key={x}>{x}</li>)}</ul> : <p><Missing label={f.insurers} /></p>}
      </div>
      <div>
        <h2>{f.register}</h2>
        <p>{f.noRegisterYet}: <Value value={advisor.registerNumber} label={f.noRegisterYet} /></p>
        <p>{f.registerText}</p>
        <p>{t.legal.imprint.authority}: <Value value={advisor.supervisoryAuthority} label={t.legal.imprint.authority} /></p>
      </div>
      <div><h2>{f.shareholdings}</h2><p>{advisor.shareholdings ? advisor.shareholdings[locale] : <Missing label={f.shareholdings} />}</p></div>
      <div><h2>{f.remuneration}</h2><p>{advisor.remuneration ? advisor.remuneration[locale] : <Missing label={f.remuneration} />}</p></div>
      <div><h2>{f.advice}</h2><p>{f.adviceText}</p></div>
      <div>
        <h2>{f.complaints}</h2>
        <ul className="mt-3 list-disc space-y-2 ps-5">{t.legal.imprint.ombudsmen.map((o) => <li key={o}>{o}</li>)}</ul>
      </div>
    </Shell>
  );
}
