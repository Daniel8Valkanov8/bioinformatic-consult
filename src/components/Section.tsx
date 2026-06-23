import type { CSSProperties, ReactNode } from "react";
import { Container } from "./Container";

/** Секция със стандартен вертикален ритъм и опционален #id за навигация. */
export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`py-12 sm:py-14 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Заглавен блок на секция: малък надпис + заглавие + опционален увод. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          data-reveal
          className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-signal"
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-reveal
        style={{ "--reveal-delay": "80ms" } as CSSProperties}
        className="text-balance font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
      >
        {title}
      </h2>
      {lead && (
        <p
          data-reveal
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
          className="mt-4 text-lg leading-relaxed text-muted"
        >
          {lead}
        </p>
      )}
    </div>
  );
}
