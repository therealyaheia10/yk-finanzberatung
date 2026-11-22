import { company } from "@/config/company";

/**
 * Logo v3: Sand-Kachel mit Globus aus feinen Linien und einem Verbindungsbogen –
 * wirkt auch klein (Header, Favicon, Social) klar und hochwertig.
 */
export function GlobeMark({ size = 40 }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="h-9 w-9 shrink-0 sm:h-10 sm:w-10">
      <rect x="1" y="1" width="46" height="46" rx="12" fill="#D6BE93" />
      <circle cx="24" cy="24" r="13.5" fill="none" stroke="#111519" strokeWidth="2" />
      <path d="M24 10.5 C 17.5 15.5, 17.5 32.5, 24 37.5 C 30.5 32.5, 30.5 15.5, 24 10.5 Z" fill="none" stroke="#111519" strokeWidth="1.6" />
      <path d="M10.5 24 H 37.5 M12.6 17 H 35.4 M12.6 31 H 35.4" fill="none" stroke="#111519" strokeWidth="1.3" />
      <path d="M7 33 C 15 40, 33 40, 41 28" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="41" cy="28" r="2.6" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" dir="ltr">
      <GlobeMark />
      {!compact && (
        <span className="flex flex-col leading-none" style={{ fontFamily: "var(--font-sans)" }}>
          <span className={`text-[0.86rem] font-bold tracking-[0.12em] sm:text-[1rem] sm:tracking-[0.14em] ${light ? "text-white" : "text-navy"}`}>{company.wordmarkTop}</span>
          <span className={`mt-[3px] text-[0.58rem] font-semibold tracking-[0.27em] sm:text-[0.65rem] sm:tracking-[0.3em] ${light ? "text-champagne-light" : "text-brass"}`}>{company.wordmarkBottom.toUpperCase()}</span>
        </span>
      )}
    </span>
  );
}
