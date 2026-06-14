import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { bg } from "@/content/bg";

export function PortfolioTeaser() {
  const t = bg.portfolio;
  const study = t.cases[0];

  return (
    <Section id="portfolio" className="border-t border-line/60">
      <SectionHeader eyebrow={t.sectionEyebrow} title={t.sectionTitle} />

      <div className="mt-10">
        <Link
          href={`/portfolio/`}
          className="group block overflow-hidden rounded-2xl border border-line bg-surface/50 transition-colors hover:border-bio/40"
        >
          <div className="bio-grid relative p-7 sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-bio">
              {study.tag}
            </p>
            <h3 className="mt-3 max-w-2xl text-xl font-semibold leading-snug text-fg sm:text-2xl">
              {study.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              {t.teaserLead}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-bio">
              {bg.cta.seeCase}
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
