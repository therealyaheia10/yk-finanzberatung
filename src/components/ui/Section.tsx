import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`tracking-label mb-5 flex items-center gap-3 text-[0.8rem] font-semibold ${light ? "text-champagne-light" : "text-brass"}`}>
      <span className="gold-rule" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  tone = "ivory",
  className = "",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  tone?: "ivory" | "sand" | "paper" | "navy";
  className?: string;
  labelledBy?: string;
}) {
  const tones = {
    ivory: "bg-ivory",
    sand: "bg-sand",
    paper: "bg-paper",
    navy: "navy-surface text-white on-dark",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-20 sm:py-24 lg:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
