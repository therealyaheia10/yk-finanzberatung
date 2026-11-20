import { advisor } from "@/config/advisor";
import type { Locale } from "@/lib/i18n";

/** Monogramm aus den Initialen der Konfiguration – austauschbar ohne Grafikprogramm */
export function Monogram({ size = 44, light = false }: { size?: number; light?: boolean }) {
  const stroke = light ? "#C9B286" : "#B49A68";
  const fill = light ? "#FFFFFF" : "#102A43";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="1.5" y="1.5" width="45" height="45" rx="2" fill="none" stroke={stroke} strokeWidth="1.2" />
      <rect x="5" y="5" width="38" height="38" rx="1" fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.6" />
      <text
        x="24"
        y="31.5"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="21"
        fontWeight="600"
        letterSpacing="0.5"
        fill={fill}
      >
        {advisor.initials}
      </text>
    </svg>
  );
}

export function Logo({ locale, light = false, compact = false }: { locale: Locale; light?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3" dir="ltr">
      <Monogram light={light} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`text-[0.88rem] font-semibold tracking-[0.17em] sm:text-[0.95rem] sm:tracking-[0.26em] ${light ? "text-white" : "text-navy"}`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {advisor.brandName}
          </span>
          <span
            className={`mt-1.5 text-[0.7rem] ${light ? "text-champagne-light" : "text-brass"}`}
            style={{
              letterSpacing: locale === "ar" ? 0 : "0.14em",
              fontFamily: locale === "ar" ? "var(--font-arabic)" : "var(--font-sans)",
            }}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {advisor.brandTagline[locale]}
          </span>
        </span>
      )}
    </span>
  );
}
