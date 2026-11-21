import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { company } from "@/config/company";
import { href, type Locale } from "@/lib/i18n";

/** Unaufdringliche Kontaktleiste am unteren Rand – nur auf kleinen Bildschirmen */
export function MobileContactBar({ locale, callLabel, bookLabel }: { locale: Locale; callLabel: string; bookLabel: string }) {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory px-4 shadow-[0_-8px_24px_-16px_rgba(16,42,67,.35)] pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        {company.phone && (
          <a href={`tel:${company.phone}`} className="btn btn-ghost flex-1 !min-h-12 bg-paper !px-3" data-track="call_mobilebar">
            <Phone size={19} aria-hidden="true" /> {callLabel}
          </a>
        )}
        <Link href={href(locale, "contact")} className="btn btn-primary flex-[1.6] !min-h-12 whitespace-nowrap !px-3 !text-[0.98rem]" data-track="cta_mobilebar">
          <CalendarCheck size={19} aria-hidden="true" /> {bookLabel}
        </Link>
      </div>
    </div>
  );
}
