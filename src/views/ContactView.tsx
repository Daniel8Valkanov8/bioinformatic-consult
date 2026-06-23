"use client";

import { ContactForm } from "@/components/ContactForm";
import { DeckShell } from "@/components/DeckShell";
import { Slide } from "@/components/Slide";
import { useDict } from "@/content/LocaleProvider";
import { site } from "@/lib/site";

export function ContactView() {
  const dict = useDict();
  const t = dict.contact;
  const rail = dict.ui.rail.contact;

  const slides = [
    { id: "kontakt", label: rail.kontakt },
    { id: "zapitvane", label: rail.zapitvane },
  ];

  return (
    <DeckShell slides={slides}>
      {/* Контакт */}
      <Slide id="kontakt" className="border-t-0">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.22em] text-signal">
          {t.sectionEyebrow}
        </p>
        <h1 className="max-w-3xl text-balance font-display text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-[2.15rem]">
          {t.sectionTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
          {t.lead}
        </p>

        <div className="mt-8">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {t.directTitle}
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex flex-col">
              <dt className="text-faint">{t.emailLabel}</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="text-lg text-fg transition-colors hover:text-signal"
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
                  className="text-lg text-fg transition-colors hover:text-signal"
                >
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6 max-w-xl rounded-2xl border border-line bg-carbon/80 p-5">
            <p className="text-sm leading-relaxed text-muted">
              {dict.trust.pricing.text}
            </p>
          </div>
        </div>
      </Slide>

      {/* Запитване */}
      <Slide id="zapitvane">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </Slide>
    </DeckShell>
  );
}
