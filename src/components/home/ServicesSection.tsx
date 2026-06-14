import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { bg } from "@/content/bg";

export function ServicesSection() {
  const t = bg.services;
  return (
    <Section id="uslugi" className="border-t border-line/60">
      <SectionHeader
        eyebrow={t.sectionEyebrow}
        title={t.sectionTitle}
        lead={t.sectionLead}
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.items.map((service, i) => (
          <article
            key={service.id}
            className="group relative flex flex-col rounded-2xl border border-line bg-surface/50 p-6 transition-colors hover:border-bio/40"
          >
            <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-carbon font-mono text-sm text-bio">
              0{i + 1}
            </span>
            <h3 className="text-lg font-semibold leading-snug text-fg">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {service.short}
            </p>
            <p className="mt-5 text-xs text-faint">
              <span className="text-muted">За кого: </span>
              {service.forWhom}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        {t.differentiator}
      </p>

      <div className="mt-8">
        <Link
          href="/uslugi/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-bio transition-colors hover:text-bio-soft"
        >
          {bg.cta.allServices}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
