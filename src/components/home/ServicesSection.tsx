"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { useDict, useHref } from "@/content/LocaleProvider";

/**
 * Доменен код вместо фалшиво номериране 01/02/03 — трите услуги са
 * независими оферти, не подредена последователност. Кодът носи реална
 * информация (входния тип данни / инструмент), разпознаваема за лаборатория.
 * Език-неутрален (технически абревиатури).
 */
const DOMAIN_CODE: Record<string, string> = {
  metagenomika: "16S / ITS",
  ngs: "WES · NGS",
  pipelines: "NF · Docker",
};

export function ServicesSection() {
  const dict = useDict();
  const t = dict.services;
  const href = useHref();
  return (
    <Section
      id="services"
      className="slide border-t border-line/60"
      containerClassName="slide-fit"
    >
      <SectionHeader
        eyebrow={t.sectionEyebrow}
        title={t.sectionTitle}
        lead={t.sectionLead}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {t.items.map((service, i) => (
          <article
            key={service.id}
            data-reveal
            style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
            className="group relative flex flex-col rounded-2xl border border-line bg-surface/80 p-5 transition-colors duration-300 hover:border-signal/40 hover:bg-surface/90"
          >
            <span className="mb-4 inline-flex w-fit items-center rounded-md border border-line bg-carbon px-2.5 py-1 font-mono text-xs tracking-wide text-signal">
              {DOMAIN_CODE[service.id] ?? service.id}
            </span>
            <h3 className="text-base font-semibold leading-snug text-fg">
              {service.title}
            </h3>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
              {service.short}
            </p>
            <p className="mt-4 text-xs text-faint">
              <span className="text-muted">{dict.ui.serviceDetail.forWhom}: </span>
              {service.forWhom}
            </p>
          </article>
        ))}
      </div>

      <p
        data-reveal
        className="mt-6 max-w-3xl border-l-2 border-helix/60 pl-4 text-sm leading-relaxed text-muted"
      >
        {t.differentiator}
      </p>

      <div data-reveal className="mt-6">
        <Link
          href={href("/services/")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-signal transition-colors hover:text-signal-soft"
        >
          {dict.cta.allServices}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
