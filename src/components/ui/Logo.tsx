import { company } from "@/config/company";

/**
 * Bildmarke: Globus (Kreis, Meridian, Äquator) mit einem Sand-Orbit –
 * international, ruhig, unabhängig von einzelnen Beratern.
 */
export function GlobeMark({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const base = light ? "#FFFFFF" : "#132130";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="h-8 w-8 shrink-0 sm:h-10 sm:w-10">
      <circle cx="24" cy="24" r="18" fill="none" stroke={base} strokeWidth="2" />
      <path d="M24 6 C 15 13, 15 35, 24 42 C 33 35, 33 13, 24 6 Z" fill="none" stroke={base} strokeWidth="1.5" />
      <line x1="6" y1="24" x2="42" y2="24" stroke={base} strokeWidth="1.5" />
      <ellipse cx="24" cy="24" rx="23" ry="8.5" fill="none" stroke="#D6BE93" strokeWidth="2.2" transform="rotate(-24 24 24)" />
      <circle cx="44.2" cy="15.3" r="2.4" fill="#D6BE93" />
    </svg>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" dir="ltr">
      <GlobeMark light={light} />
      {!compact && (
        <span className="flex flex-col leading-none" style={{ fontFamily: "var(--font-sans)" }}>
          <span className={`text-[0.86rem] font-bold tracking-[0.12em] sm:text-[1.02rem] sm:tracking-[0.14em] ${light ? "text-white" : "text-navy"}`}>{company.wordmarkTop}</span>
          <span className={`mt-[3px] text-[0.58rem] font-semibold tracking-[0.27em] sm:text-[0.66rem] sm:tracking-[0.3em] ${light ? "text-champagne-light" : "text-brass"}`}>{company.wordmarkBottom.toUpperCase()}</span>
        </span>
      )}
    </span>
  );
}
