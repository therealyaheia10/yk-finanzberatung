import { isPreview } from "@/lib/site";

export function PreviewBanner({ text }: { text: string }) {
  if (!isPreview) return null;
  return (
    <div className="no-print bg-navy-deep px-4 py-1.5 text-center text-[0.8rem] font-medium text-champagne-light" role="note">
      {text}
    </div>
  );
}
