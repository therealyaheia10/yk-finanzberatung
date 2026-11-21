import { company } from "@/config/company";

/**
 * Bildmarke: minimalistischer Globus aus feinen Linien – international,
 * ruhig, unabhängig von einzelnen Beratern. Funktioniert auch als Favicon.
 */
export function GlobeMark({ size = 44, light = false }: { size?: number; light?: boolean }) {
  const gold = light ? "#C9B286" : "#B49A68";
  const base = light ? "#FFFFFF" : "#102A43";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="21" fill="none" stroke={base} strokeWidth="1.6" />
      <ellipse cx="24" cy="24" rx="9.5" ry="21" fill="none" stroke={base} strokeWidth="1.1" />
      <line x1="3" y1="24" x2="45" y2="24" stroke={base} strokeWidth="1.1" />
      <path d="M6.5 13.5 Q24 18.5 41.5 13.5" fill="none" stroke={base} strokeWidth="0.9" opacity="0.7" />
      <path d="M6.5 34.5 Q24 29.5 41.5 34.5" fill="none" stroke={base} strokeWidth="0.9" opacity="0.7" />
      {/* Messing-Bogen: Begleitung / Verbindung */}
      <path d="M8 31 C 14 41, 34 43, 43 27" fill="none" stroke={gold} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="43" cy="27" r="2.3" fill={gold} />
    </svg>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3" dir="ltr">
      <GlobeMark light={light} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`text-[0.66rem] font-bold tracking-[0.3em] sm:text-[0.7rem] ${light ? "text-champagne-light" : "text-brass"}`} style={{ fontFamily: "var(--font-sans)" }}>
            {company.wordmarkTop}
          </span>
          <span className={`mt-1 text-[1.32rem] leading-none sm:text-[1.45rem] ${light ? "text-white" : "text-navy"}`} style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
            {company.wordmarkBottom}
          </span>
        </span>
      )}
    </span>
  );
}
