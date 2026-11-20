import Image from "next/image";
import { isPreview } from "@/lib/site";
import { advisor } from "@/config/advisor";

/**
 * Portrait mit elegantem Ersatz, falls noch kein echtes Foto vorliegt.
 * Der Ersatz zeigt das Monogramm – nie eine fremde oder generierte Person.
 */
export function Portrait({
  src,
  alt,
  placeholderLabel,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 90vw",
}: {
  src: string | null;
  alt: string;
  placeholderLabel: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-[50%_25%]" />
      </div>
    );
  }
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden navy-surface ${className}`}
      role="img"
      aria-label={isPreview ? placeholderLabel : alt}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <circle cx="100" cy="78" r="34" fill="none" stroke="#C9B286" strokeWidth="0.6" />
        <path d="M38 200c6-44 32-68 62-68s56 24 62 68" fill="none" stroke="#C9B286" strokeWidth="0.6" />
      </svg>
      <span className="display relative text-6xl text-champagne-light">{advisor.initials}</span>
      {isPreview && (
        <span className="placeholder-chip absolute bottom-4 start-4">{placeholderLabel}</span>
      )}
    </div>
  );
}
