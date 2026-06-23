"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { useDict, useHref } from "@/content/LocaleProvider";

export function PortfolioTeaser() {
  const dict = useDict();
  const t = dict.portfolio;
  const study = t.cases[0];
  const href = useHref();

  return (
    <Section
      id="portfolio"
      className="slide border-t border-line/60"
      containerClassName="slide-fit"
    >
      <SectionHeader eyebrow={t.sectionEyebrow} title={t.sectionTitle} />

      <div data-reveal className="mt-10">
        <Link
          href={href("/portfolio/")}
          className="group block overflow-hidden rounded-2xl border border-line bg-surface/80 transition-colors duration-300 hover:border-signal/40 hover:bg-surface/90"
        >
          <div className="bio-grid relative p-7 sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {study.tag}
            </p>
            <h3 className="mt-3 max-w-2xl text-xl font-semibold leading-snug text-fg sm:text-2xl">
              {study.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              {t.teaserLead}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
              {dict.cta.seeCase}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </Section>
  );
}
