"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Baby, Briefcase, HeartPulse, Sunset, Users, Compass, Building2, Phone, Video, PhoneIncoming, Stethoscope, Scale,
  ArrowLeft, ArrowRight, Check, Clock, ShieldCheck, AlertTriangle, Loader2, UserRound,
} from "lucide-react";
import { href, languageNames, locales, topicKeys, type Locale, type TopicKey } from "@/lib/i18n";
import { fill } from "@/lib/format";
import { send, getCampaign } from "@/components/layout/Track";
import type { Dict } from "@/content";

type FormT = Dict["form"];
type Mode = "office" | "phone" | "video" | "callback";
type Time = "any" | "morning" | "afternoon" | "evening";

const topicIcons: Record<TopicKey, typeof Baby> = {
  retirement: Sunset, kids: Baby, bu: Briefcase, pkv: HeartPulse, bav: Users, bkv: Stethoscope, extras: Scale, general: Compass,
};
const modeIcons: Record<Mode, typeof Phone> = { office: Building2, phone: Phone, video: Video, callback: PhoneIncoming };

export function LeadForm({
  locale, t, modes, isPreview, phone, phoneDisplay, backLabel, idPrefix = "lead", advisor: advisorProp = null, presetTopic = null, advisorOptions = [],
}: {
  locale: Locale; t: FormT; backLabel: string; modes: Mode[]; isPreview: boolean;
  phone: string | null; phoneDisplay: string | null; idPrefix?: string;
  /** Weg B: Anfrage direkt an diesen Berater */
  advisor?: { slug: string; name: string } | null;
  presetTopic?: TopicKey | null;
  /** Aktive Berater – erlaubt die Vorauswahl per Link (?advisor=slug) */
  advisorOptions?: { slug: string; name: string }[];
}) {
  const [advisor, setAdvisor] = useState<{ slug: string; name: string } | null>(advisorProp);
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState<TopicKey | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<Locale>(locale);
  const [time, setTime] = useState<Time>("any");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");
  const [isTest, setIsTest] = useState(false);
  const [assigned, setAssigned] = useState<string>("");
  const startedAt = useRef<number>(Date.now());
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const total = 3;

  // Anliegen aus URL übernehmen (?topic=kids) – z. B. vom Finder oder einer Leistungsseite
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = presetTopic ?? params.get("topic");
    const wanted = params.get("advisor");
    if (!advisorProp && wanted) { const hit = advisorOptions.find((a) => a.slug === wanted); if (hit) setAdvisor(hit); }
    if (params.get("mode") === "callback") {
      // Rückruf-Direkteinstieg: nur noch Name + Telefon
      setTopic(q && (topicKeys as readonly string[]).includes(q) ? (q as TopicKey) : "general");
      setMode("callback");
      setStep(3);
    } else if (q && (topicKeys as readonly string[]).includes(q)) {
      setTopic(q as TopicKey);
      setStep(2);
    }
    startedAt.current = Date.now();
  }, [presetTopic]);

  const markStart = () => {
    if (!started.current) { started.current = true; send({ type: "click", name: "form_start", path: window.location.pathname }); }
  };

  const goto = (n: number) => {
    setStep(n);
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  function validateStep3() {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = t.errors.name;
    if (!tel.trim() && !email.trim()) e.contact = t.errors.contact;
    if (tel.trim() && !/^[+()0-9\s/-]{6,24}$/.test(tel.trim())) e.phone = t.errors.phone;
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = t.errors.email;
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (step < 3) return;
    const e = validateStep3();
    setErrors(e);
    if (Object.keys(e).length) {
      const firstKey = Object.keys(e)[0] === "contact" ? "phone" : Object.keys(e)[0];
      document.getElementById(`${idPrefix}-${firstKey}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          topic, mode, name, phone: tel, email, language, time, message,
          pageLocale: locale, source: window.location.pathname, website,
          advisor: advisor?.slug ?? null, campaign: getCampaign(),
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; test?: boolean; error?: string; advisorName?: string };
      if (res.ok && data.ok) {
        setIsTest(Boolean(data.test));
        setAssigned(data.advisorName ?? "");
        setStatus("success");
        send({ type: "click", name: data.test ? "form_success_test" : "form_success", path: window.location.pathname });
        requestAnimationFrame(() => successRef.current?.focus());
      } else {
        const key = data.error === "rate" ? "rate" : data.error === "disabled" ? "disabled" : "server";
        setServerError(t.errors[key as "rate" | "disabled" | "server"]);
        setStatus("error");
      }
    } catch {
      setServerError(t.errors.server);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-soft)] border border-line bg-paper p-6 sm:p-10" role="status">
        {isTest && (
          <div className="mb-6 flex gap-3 rounded-md border-2 border-dashed border-amber-600 bg-amber-50 p-4 text-amber-950">
            <AlertTriangle className="mt-0.5 shrink-0" size={22} aria-hidden="true" />
            <div><p className="font-bold">{t.success.testTitle}</p><p className="text-[0.95rem]">{t.success.testText}</p></div>
          </div>
        )}
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success"><Check size={30} aria-hidden="true" /></span>
        <h3 ref={successRef} tabIndex={-1} className="display mt-5 text-[1.7rem] text-navy outline-none">{t.success.title}</h3>
        <p className="mt-3 text-muted">{t.success.text}</p>
        {assigned && <p className="mt-4 flex items-center gap-2 font-semibold text-navy"><UserRound size={18} className="text-brass" aria-hidden="true" /> {fill(t.success.withAdvisor, { name: assigned })}</p>}
        <h4 className="mt-8 font-semibold text-navy">{t.success.next}</h4>
        <ol className="mt-4 space-y-3">
          {t.success.steps.map((s, i) => (
            <li key={s} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-champagne text-[0.95rem] font-semibold text-brass">{i + 1}</span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-ghost mt-8" onClick={() => {
          setStatus("idle"); setStep(1); setTopic(null); setMode(null); setName(""); setTel(""); setEmail(""); setMessage("");
          startedAt.current = Date.now();
        }}>{t.success.again}</button>
      </div>
    );
  }

  const stepTitle = step === 1 ? t.step1 : step === 2 ? t.step2 : t.step3;
  const errorList = Object.values(errors);

  return (
    <form onSubmit={submit} noValidate onFocus={markStart} className="rounded-2xl border border-line bg-paper p-5 shadow-[0_30px_60px_-40px_rgba(14,24,34,.35)] sm:p-8" aria-describedby={`${idPrefix}-duration`}>
      {isPreview && (
        <p className="mb-6 flex items-center gap-2 rounded-md border border-dashed border-amber-600 bg-amber-50 px-3 py-2 text-[0.88rem] font-semibold text-amber-950">
          <AlertTriangle size={18} aria-hidden="true" /> {t.testNotice}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.95rem] font-semibold text-brass">{fill(t.stepLabel, { n: step, total })}</p>
        <p id={`${idPrefix}-duration`} className="flex items-center gap-1.5 text-[0.9rem] text-muted"><Clock size={16} aria-hidden="true" /> {t.duration}</p>
      </div>
      <div className="mt-3 flex gap-2" aria-hidden="true">
        {[1, 2, 3].map((n) => <span key={n} className={`h-1 flex-1 rounded-full ${n <= step ? "bg-navy" : "bg-line"}`} />)}
      </div>

      <p className="mt-5 flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-[0.92rem] text-navy">
        <UserRound size={17} className="shrink-0 text-brass" aria-hidden="true" />
        {advisor ? fill(t.toAdvisor, { name: advisor.name }) : t.autoAssign}
      </p>

      <h3 ref={headingRef} tabIndex={-1} className="display mt-5 text-[1.45rem] leading-tight text-navy outline-none sm:text-[1.8rem]">{stepTitle}</h3>

      {step === 1 && (
        <fieldset className="mt-6">
          <legend className="sr-only">{t.step1}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {topicKeys.map((k) => {
              const Icon = topicIcons[k];
              const active = topic === k;
              return (
                <label key={k} className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-[var(--radius-soft)] border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-champagne ${active ? "border-navy bg-navy text-white" : "border-line hover:border-navy/50"}`}>
                  <input type="radio" name={`${idPrefix}-topic`} value={k} checked={active} className="sr-only"
                    onChange={() => { setTopic(k); setTimeout(() => goto(2), 160); }} />
                  <Icon size={22} className={`shrink-0 ${active ? "text-champagne-light" : "text-brass"}`} aria-hidden="true" />
                  <span className="font-semibold">{t.topics[k]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="mt-6">
          <legend className="sr-only">{t.step2}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {modes.map((m) => {
              const Icon = modeIcons[m];
              const active = mode === m;
              return (
                <label key={m} className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-[var(--radius-soft)] border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-champagne ${active ? "border-navy bg-navy text-white" : "border-line hover:border-navy/50"}`}>
                  <input type="radio" name={`${idPrefix}-mode`} value={m} checked={active} className="sr-only"
                    onChange={() => { setMode(m); setTimeout(() => goto(3), 160); }} />
                  <Icon size={22} className={`shrink-0 ${active ? "text-champagne-light" : "text-brass"}`} aria-hidden="true" />
                  <span className="font-semibold">{t.modes[m]}</span>
                </label>
              );
            })}
          </div>
          <div className="mt-8">
            <button type="button" className="btn btn-ghost" onClick={() => goto(1)}><ArrowLeft size={18} className="rtl:rotate-180" aria-hidden="true" /> {backLabel}</button>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-6">
          {errorList.length > 0 && (
            <div role="alert" className="rounded-md border border-error/40 bg-error/5 p-4 text-error">
              <p className="font-semibold">{t.errors.summary}</p>
              <ul className="mt-1 list-disc ps-5 text-[0.95rem]">{errorList.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          )}

          <Field id={`${idPrefix}-name`} label={t.name} error={errors.name}>
            <input id={`${idPrefix}-name`} name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder={t.namePh} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${idPrefix}-name-err` : undefined} className={inputCls(!!errors.name)} />
          </Field>

          <div>
            <p id={`${idPrefix}-contact-hint`} className={`mb-3 text-[0.95rem] ${errors.contact ? "font-semibold text-error" : "text-muted"}`}>
              {errors.contact ?? t.contactHint}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${idPrefix}-phone`} label={t.phone} error={errors.phone}>
                <input id={`${idPrefix}-phone`} name="tel" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={tel} onChange={(e) => setTel(e.target.value)}
                  placeholder={t.phonePh} aria-invalid={!!errors.phone || !!errors.contact}
                  aria-describedby={`${idPrefix}-contact-hint${errors.phone ? ` ${idPrefix}-phone-err` : ""}`} className={`${inputCls(!!errors.phone || !!errors.contact)} text-start`} />
              </Field>
              <Field id={`${idPrefix}-email`} label={t.email} error={errors.email}>
                <input id={`${idPrefix}-email`} name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPh} aria-invalid={!!errors.email || !!errors.contact}
                  aria-describedby={`${idPrefix}-contact-hint${errors.email ? ` ${idPrefix}-email-err` : ""}`} className={`${inputCls(!!errors.email || !!errors.contact)} text-start`} />
              </Field>
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 font-semibold text-navy">{t.language}</legend>
            <div className="flex flex-wrap gap-2">
              {locales.map((l) => (
                <label key={l} className={`inline-flex min-h-12 cursor-pointer items-center rounded-full border px-5 font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-champagne ${language === l ? "border-navy bg-navy text-white" : "border-line text-navy hover:border-navy/50"}`}
                  lang={l} style={l === "ar" ? { fontFamily: "var(--font-arabic)" } : undefined}>
                  <input type="radio" name={`${idPrefix}-language`} value={l} checked={language === l} onChange={() => setLanguage(l)} className="sr-only" />
                  {languageNames[l].native}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 font-semibold text-navy">{t.time}</legend>
            <div className="flex flex-wrap gap-2">
              {(["any", "morning", "afternoon", "evening"] as const).map((k) => (
                <label key={k} className={`inline-flex min-h-12 cursor-pointer items-center rounded-full border px-5 font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-champagne ${time === k ? "border-navy bg-navy text-white" : "border-line text-navy hover:border-navy/50"}`}>
                  <input type="radio" name={`${idPrefix}-time`} value={k} checked={time === k} onChange={() => setTime(k)} className="sr-only" />
                  {t.times[k]}
                </label>
              ))}
            </div>
          </fieldset>

          <Field id={`${idPrefix}-message`} label={t.message}>
            <textarea id={`${idPrefix}-message`} name="message" rows={3} maxLength={600} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder={t.messagePh} className={inputCls(false)} />
          </Field>

          {/* Honeypot – für Menschen unsichtbar */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" /></label>
          </div>

          <p className="flex gap-3 text-[0.92rem] leading-relaxed text-muted">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
            <span>
              {t.privacy.split("{link}")[0]}
              <Link href={href(locale, "privacy")} className="link">{t.privacyLink}</Link>
              {t.privacy.split("{link}")[1]}
            </span>
          </p>

          {status === "error" && (
            <div role="alert" className="rounded-md border border-error/40 bg-error/5 p-4 text-error">
              <p className="font-semibold">{serverError}</p>
              {phone && <a href={`tel:${phone}`} className="btn btn-primary mt-3"><Phone size={18} aria-hidden="true" /> <span className="ltr-nums">{phoneDisplay}</span></a>}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" className="btn btn-ghost" onClick={() => goto(2)}>
              <ArrowLeft size={18} className="rtl:rotate-180" aria-hidden="true" /> {backLabel}
            </button>
            <button type="submit" className="btn btn-primary sm:min-w-56" disabled={status === "sending"} data-track="form_submit">
              {status === "sending" ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> {t.sending}</> : <>{t.submit} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></>}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function inputCls(err: boolean) {
  return `block w-full min-h-[3.4rem] rounded-[var(--radius-soft)] border bg-ivory px-4 py-3 text-[1.0625rem] text-ink placeholder:text-muted/70 focus:bg-paper ${err ? "border-error border-2" : "border-line"}`;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold text-navy">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-2 flex items-center gap-2 text-[0.95rem] font-semibold text-error"><AlertTriangle size={16} aria-hidden="true" />{error}</p>}
    </div>
  );
}
