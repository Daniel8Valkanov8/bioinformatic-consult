import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";
import { bg } from "@/content/bg";

export const metadata: Metadata = {
  title: bg.meta.uslugi.title,
  description: bg.meta.uslugi.description,
  alternates: { canonical: "/uslugi/" },
  openGraph: {
    title: bg.meta.uslugi.title,
    description: bg.meta.uslugi.description,
    url: "/uslugi/",
  },
};

function DetailList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-faint">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-1 text-bio">
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function UslugiPage() {
  const t = bg.services;
  return (
    <>
      <PageHeader
        eyebrow={t.sectionEyebrow}
        title={t.sectionTitle}
        lead={t.sectionLead}
      />

      <Container className="py-16 sm:py-20">
        <div className="space-y-10">
          {t.items.map((service, i) => (
            <article
              key={service.id}
              id={service.slug}
              className="scroll-mt-24 rounded-2xl border border-line bg-surface/50 p-7 sm:p-9"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-bio">0{i + 1}</span>
                <h2 className="text-xl font-semibold leading-snug text-fg sm:text-2xl">
                  {service.title}
                </h2>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
                {service.short}
              </p>

              <div className="mt-6 rounded-xl border border-line/70 bg-carbon/40 p-4 text-sm">
                <span className="text-muted">За кого: </span>
                <span className="text-fg">{service.forWhom}</span>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <DetailList title="Вход" items={[service.input]} />
                <DetailList title="Процес" items={service.process} />
                <DetailList title="Изход" items={service.output} />
              </div>

              {service.boundary && (
                <div className="mt-6 rounded-xl border border-bio/30 bg-bio/[0.04] p-4">
                  <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-bio">
                    Важна граница
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.boundary}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-surface/30 p-7 sm:p-9">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            {t.differentiator}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            {bg.trust.pricing.text}
          </p>
          <div className="mt-6">
            <CTAButton href="/kontakt/">{bg.cta.consult}</CTAButton>
          </div>
        </div>
      </Container>
    </>
  );
}
