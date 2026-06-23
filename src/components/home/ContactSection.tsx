"use client";

import type { CSSProperties } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { useDict } from "@/content/LocaleProvider";
import { site } from "@/lib/site";

export function ContactSection() {
  const t = useDict().contact;
  return (
    <Section
      id="contact"
      className="slide border-t border-line/60"
      containerClassName="slide-fit"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow={t.sectionEyebrow}
            title={t.sectionTitle}
            lead={t.lead}
          />

          <div data-reveal className="mt-6">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {t.directTitle}
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col">
                <dt className="text-faint">{t.emailLabel}</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-fg transition-colors hover:text-signal"
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
                    className="text-fg transition-colors hover:text-signal"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
