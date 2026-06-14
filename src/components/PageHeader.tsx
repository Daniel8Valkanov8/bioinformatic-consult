import { Container } from "./Container";

/** Заглавен блок за вътрешните страници (под фиксираната навигация). */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line/60">
      <div className="bio-glow pointer-events-none absolute inset-x-0 top-0 h-64" />
      <Container className="relative py-16 sm:py-20">
        {eyebrow && (
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-bio">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {lead}
          </p>
        )}
      </Container>
    </div>
  );
}
