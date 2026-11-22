import Link from "next/link";
import { company } from "@/config/company";
import { href, type Locale } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/ui/Icons";

export const waLink = (msg: string) => (company.whatsapp ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}` : null);

/** Kompakte Kontaktleiste am unteren Rand – nur auf Smartphones */
export function MobileContactBar({ locale, callLabel, bookLabel, waMessage }: { locale: Locale; callLabel: string; bookLabel: string; waMessage: string }) {
  const wa = waLink(waMessage);
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-navy-deep/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp !min-h-12 !px-4" data-track="wa_mobilebar" aria-label={callLabel}>
            <WhatsAppIcon size={21} />
          </a>
        )}
        <Link href={href(locale, "contact")} className="btn btn-gold !min-h-12 flex-1 whitespace-nowrap !px-3" data-track="cta_mobilebar">{bookLabel}</Link>
      </div>
    </div>
  );
}
