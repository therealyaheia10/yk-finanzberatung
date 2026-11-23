import type { Locale } from "@/lib/i18n";

/** WhatsApp-Symbol (vereinfachte Sprechblase mit Telefon) */
export const WA_GREEN = "#25d366";

export function WhatsAppIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={color}>
      <path d="M12 2.2A9.7 9.7 0 0 0 3.7 17l-1.3 4.7 4.8-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

/** Kleine runde Sprach-Flaggen. Arabisch: neutrales Schriftzeichen statt Länderflagge (viele Länder, eine Sprache). */
export function LangFlag({ l, size = 18 }: { l: Locale; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 20 20", "aria-hidden": true, focusable: false as const, className: "shrink-0 rounded-full ring-1 ring-black/10" };
  if (l === "de") return (<svg {...common}><clipPath id="cde"><circle cx="10" cy="10" r="10" /></clipPath><g clipPath="url(#cde)"><rect width="20" height="7" fill="#000" /><rect y="6.6" width="20" height="7" fill="#DD0000" /><rect y="13.3" width="20" height="7" fill="#FFCE00" /></g></svg>);
  if (l === "fr") return (<svg {...common}><clipPath id="cfr"><circle cx="10" cy="10" r="10" /></clipPath><g clipPath="url(#cfr)"><rect width="7" height="20" fill="#002654" /><rect x="6.6" width="7" height="20" fill="#fff" /><rect x="13.3" width="7" height="20" fill="#CE1126" /></g></svg>);
  if (l === "en") return (<svg {...common}><clipPath id="cen"><circle cx="10" cy="10" r="10" /></clipPath><g clipPath="url(#cen)"><rect width="20" height="20" fill="#012169" /><path d="M0 0 20 20M20 0 0 20" stroke="#fff" strokeWidth="4" /><path d="M0 0 20 20M20 0 0 20" stroke="#C8102E" strokeWidth="1.6" /><path d="M10 0v20M0 10h20" stroke="#fff" strokeWidth="6" /><path d="M10 0v20M0 10h20" stroke="#C8102E" strokeWidth="3.4" /></g></svg>);
  return (<svg {...common}><circle cx="10" cy="10" r="10" fill="#0F7A47" /><text x="10" y="14.2" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="IBM Plex Sans Arabic, Tahoma, sans-serif">ع</text></svg>);
}
