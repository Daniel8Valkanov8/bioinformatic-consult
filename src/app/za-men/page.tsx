import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";
import { bg } from "@/content/bg";

export const metadata: Metadata = {
  title: bg.meta.zaMen.title,
  description: bg.meta.zaMen.description,
  alternates: { canonical: "/za-men/" },
  openGraph: {
    title: bg.meta.zaMen.title,
    description: bg.meta.zaMen.description,
    url: "/za-men/",
  },
};

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-1 text-bio">
            ▸
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ZaMenPage() {
  const t = bg.about;
  return (
    <>
      <PageHeader title={t.title} lead={t.intro} />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <section className="rounded-2xl border border-line bg-surface/50 p-7">
            <h2 className="text-lg font-semibold text-fg">{t.educationTitle}</h2>
            <div className="mt-5">
              <Bullets items={t.education} />
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-surface/50 p-7 lg:col-span-2">
            <h2 className="text-lg font-semibold text-fg">{t.approachTitle}</h2>
            <div className="mt-5">
              <Bullets items={t.approach} />
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-2xl border border-bio/30 bg-surface/50 p-7 sm:p-9">
          <h2 className="text-lg font-semibold text-fg">{t.privacyTitle}</h2>
          <p className="mt-2 text-sm text-muted">{t.privacyLead}</p>
          <div className="mt-5 max-w-2xl">
            <Bullets items={t.privacyPoints} />
          </div>
        </section>

        <div className="mt-12">
          <CTAButton href="/kontakt/">{bg.cta.consult}</CTAButton>
        </div>
      </Container>
    </>
  );
}
