import { isPreview } from "@/lib/site";

/**
 * Zeigt fehlende Pflichtangaben NUR in der internen Vorschau als markierten
 * Platzhalter. In der Produktion wird nichts gerendert – der Release-Check
 * verhindert ohnehin einen Build mit fehlenden Pflichtangaben.
 */
export function Missing({ label }: { label: string }) {
  if (!isPreview) return null;
  return (
    <span className="placeholder-chip" data-placeholder="true">
      <span aria-hidden="true">⚠</span> {label}
    </span>
  );
}

export function Value({ value, label }: { value: string | null | undefined; label: string }) {
  if (value) return <>{value}</>;
  return <Missing label={label} />;
}
