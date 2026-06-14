import type { ReactNode } from "react";
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
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
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
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-bio">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}
