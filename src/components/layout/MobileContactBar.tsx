import Link from "next/link";
import { Phone } from "lucide-react";
import { company } from "@/config/company";
import { href, type Locale } from "@/lib/i18n";

/** Kompakte Kontaktleiste am unteren Rand – nur auf Smartphones */
export function MobileContactBar({ locale, callLabel, bookLabel }: { locale: Locale; callLabel: string; bookLabel: string }) {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-navy-deep/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        {company.phone && (
          <a href={`tel:${company.phone}`} className="btn btn-ghost-light !min-h-12 !px-4" data-track="call_mobilebar" aria-label={callLabel}>
            <Phone size={19} aria-hidden="true" />
          </a>
        )}
        <Link href={href(locale, "contact")} className="btn btn-gold !min-h-12 flex-1 whitespace-nowrap !px-3" data-track="cta_mobilebar">{bookLabel}</Link>
      </div>
    </div>
  );
}
