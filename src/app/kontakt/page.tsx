import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { bg } from "@/content/bg";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: bg.meta.kontakt.title,
  description: bg.meta.kontakt.description,
  alternates: { canonical: "/kontakt/" },
  openGraph: {
    title: bg.meta.kontakt.title,
    description: bg.meta.kontakt.description,
    url: "/kontakt/",
  },
};

export default function KontaktPage() {
  const t = bg.contact;
  return (
    <>
      <PageHeader eyebrow={t.sectionEyebrow} title={t.sectionTitle} lead={t.lead} />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {t.directTitle}
            </h2>
            <dl className="space-y-4 text-sm">
              <div className="flex flex-col">
                <dt className="text-faint">{t.emailLabel}</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg text-fg transition-colors hover:text-bio"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-faint">{t.phoneLabel}</dt>
                <dd>
                  <a
                    href={`tel:${site.phone}`}
                    className="text-lg text-fg transition-colors hover:text-bio"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 rounded-2xl border border-line bg-surface/40 p-6">
              <p className="text-sm leading-relaxed text-muted">
                {bg.trust.pricing.text}
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </>
  );
}
