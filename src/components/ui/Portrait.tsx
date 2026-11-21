import Image from "next/image";
import { isPreview } from "@/lib/site";

/** Portrait mit elegantem Monogramm-Ersatz – nie eine fremde oder generierte Person. */
export function Portrait({
  src, alt, initials = "", placeholderLabel, priority = false, className = "", sizes = "(min-width: 1024px) 40vw, 90vw", position = "50% 22%",
}: {
  src: string | null; alt: string; initials?: string; placeholderLabel: string; priority?: boolean; className?: string; sizes?: string; position?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
      </div>
    );
  }
  return (
    <div className={`navy-surface relative flex items-center justify-center overflow-hidden ${className}`} role="img" aria-label={alt}>
      <span className="display relative text-5xl text-champagne-light">{initials}</span>
      {isPreview && <span className="placeholder-chip absolute bottom-3 start-3">{placeholderLabel}</span>}
    </div>
  );
}
