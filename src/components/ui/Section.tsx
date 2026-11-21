import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`tracking-label mb-3 text-[0.78rem] font-bold ${light ? "text-champagne-light" : "text-brass"}`}>{children}</p>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function Section({ id, children, tone = "ivory", className = "", labelledBy, compact = false }: {
  id?: string; children: ReactNode; tone?: "ivory" | "sand" | "paper" | "navy"; className?: string; labelledBy?: string; compact?: boolean;
}) {
  const tones = { ivory: "bg-ivory", sand: "bg-sand", paper: "bg-paper", navy: "navy-surface text-white on-dark" };
  const pad = compact ? "py-11 sm:py-16 lg:py-20" : "py-12 sm:py-16 lg:py-24";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} ${pad} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
