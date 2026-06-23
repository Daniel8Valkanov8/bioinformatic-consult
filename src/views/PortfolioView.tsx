"use client";

import { CTAButton } from "@/components/CTAButton";
import { DeckShell } from "@/components/DeckShell";
import { Slide } from "@/components/Slide";
import { useDict, useHref } from "@/content/LocaleProvider";

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.15em] text-signal">
        {title}
      </p>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

export function PortfolioView() {
  const dict = useDict();
  const t = dict.portfolio;
  const study = t.cases[0];
  const blockLabels = dict.ui.portfolioBlocks;
  const rail = dict.ui.rail.portfolio;
  const href = useHref();

  const slides = [
    { id: "pregled", label: rail.pregled },
    { id: "case", label: rail.case },
  ];

  return (
    <DeckShell slides={slides}>
      {/* Преглед */}
      <Slide id="pregled" className="border-t-0">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.22em] text-signal">
          {t.sectionEyebrow}
        </p>
        <h1 className="max-w-3xl text-balance font-display text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-[2.15rem]">
          {t.sectionTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
          {t.teaserLead}
        </p>
      </Slide>

      {/* Case study */}
      <Slide id="case">
        <article className="overflow-hidden rounded-2xl border border-line bg-carbon/80">
          <div className="bio-grid border-b border-line/60 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {study.tag}
            </p>
            <h2 className="mt-2.5 max-w-3xl text-lg font-semibold leading-snug text-fg sm:text-2xl">
              {study.title}
            </h2>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <Block title={blockLabels.problem} text={study.problem} />
            <Block title={blockLabels.approach} text={study.approach} />
            <Block title={blockLabels.result} text={study.result} />
            <Block title={blockLabels.why} text={study.why} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/60 px-6 py-4 sm:px-8">
            <p className="text-xs italic text-faint">{study.note}</p>
            <CTAButton href={href("/contact/")} className="px-5 py-2.5">
              {dict.cta.consult}
            </CTAButton>
          </div>
        </article>
      </Slide>
    </DeckShell>
  );
}
