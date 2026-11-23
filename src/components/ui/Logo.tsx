/**
 * Logo „IFC“ (Vorlage: IFC-Logo.pdf): Globus mit goldenem Wachstumspfeil + Wortmarke.
 * Farben laut Vorlage: Navy #14213D · Gold #E3B341 · Globe blue #22396B · Mist #EEF1F5.
 * Auf dunklem Grund wird der Globus in „Globe blue“ gezeigt (wie in der dunklen Logo-Variante).
 */
const GOLD = "#E3B341";

export function GlobeMark({ dark = false, simple = false, className = "h-10 w-10 shrink-0 sm:h-11 sm:w-11" }: { dark?: boolean; simple?: boolean; className?: string; size?: number; light?: boolean }) {
  return (
    <svg viewBox="10 10 610 600" aria-hidden="true" focusable="false" className={className}>
      <circle cx="305" cy="310" r="288" fill={dark ? "#22396B" : "#14213D"} />
      {!simple && (
        <g fill="none" stroke="#EEF1F5" strokeOpacity=".6" strokeWidth="10">
          <line x1="305" y1="24" x2="305" y2="596" />
          <ellipse cx="305" cy="310" rx="100" ry="288" />
          <ellipse cx="305" cy="310" rx="222" ry="288" />
          <ellipse cx="305" cy="310" rx="284" ry="60" />
          <ellipse cx="305" cy="165" rx="245" ry="46" />
          <ellipse cx="305" cy="455" rx="245" ry="46" />
        </g>
      )}
      <polyline points="58,478 222,320 318,395 508,207" fill="none" stroke={GOLD} strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="598,90 456,147 570,232" fill={GOLD} />
    </svg>
  );
}

/** Horizontales Logo: Globus + „IFC“ + Unterzeile (Unterzeile ab 400 px Breite) */
export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3" dir="ltr">
      <GlobeMark dark={light} />
      {!compact && (
        <span className="flex flex-col leading-none" style={{ fontFamily: "var(--font-logo)" }}>
          <span className={`text-[1.6rem] font-extrabold tracking-[-0.02em] sm:text-[1.85rem] ${light ? "text-white" : "text-navy"}`}>IFC</span>
          <span className={`mt-[3px] hidden text-[0.5rem] font-medium tracking-[0.2em] min-[400px]:block sm:text-[0.56rem] sm:tracking-[0.24em] ${light ? "text-[#EEF1F5]" : "text-navy-soft"}`}>
            INTERNATIONAL FINANCE CONSULTING
          </span>
        </span>
      )}
    </span>
  );
}
