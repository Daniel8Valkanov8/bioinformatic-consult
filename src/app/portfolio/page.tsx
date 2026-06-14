import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";
import { bg } from "@/content/bg";

export const metadata: Metadata = {
  title: bg.meta.portfolio.title,
  description: bg.meta.portfolio.description,
  alternates: { canonical: "/portfolio/" },
  openGraph: {
    title: bg.meta.portfolio.title,
    description: bg.meta.portfolio.description,
    url: "/portfolio/",
  },
};

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.15em] text-bio">
        {title}
      </p>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

export default function PortfolioPage() {
  const t = bg.portfolio;
  return (
    <>
      <PageHeader eyebrow={t.sectionEyebrow} title={t.sectionTitle} lead={t.teaserLead} />

      <Container className="py-16 sm:py-20">
        <div className="space-y-10">
          {t.cases.map((study) => (
            <article
              key={study.id}
              className="overflow-hidden rounded-2xl border border-line bg-surface/50"
            >
              <div className="bio-grid border-b border-line/60 p-7 sm:p-9">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-bio">
                  {study.tag}
                </p>
                <h2 className="mt-3 max-w-3xl text-xl font-semibold leading-snug text-fg sm:text-2xl">
                  {study.title}
                </h2>
              </div>

              <div className="grid gap-6 p-7 sm:grid-cols-2 sm:p-9">
                <Block title="Проблем" text={study.problem} />
                <Block title="Подход" text={study.approach} />
                <Block title="Резултат" text={study.result} />
                <Block title="Защо има значение" text={study.why} />
              </div>

              <div className="border-t border-line/60 px-7 py-4 sm:px-9">
                <p className="text-xs italic text-faint">{study.note}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <CTAButton href="/kontakt/">{bg.cta.consult}</CTAButton>
        </div>
      </Container>
    </>
  );
}
