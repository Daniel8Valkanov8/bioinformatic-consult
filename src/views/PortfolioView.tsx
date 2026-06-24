"use client";

import { CTAButton } from "@/components/CTAButton";
import { DeckShell } from "@/components/DeckShell";
import { Slide } from "@/components/Slide";
import { TeHierarchy } from "@/components/TeHierarchy";
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
  const tr = t.trViewer;
  const blockLabels = dict.ui.portfolioBlocks;
  const rail = dict.ui.rail.portfolio;
  const href = useHref();

  const slides = [
    { id: "pregled", label: rail.pregled },
    { id: "case", label: rail.case },
    { id: "trviewer", label: rail.trviewer },
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

      {/* Case study — TR-Viewer (различен проект; същата визуална обвивка) */}
      <Slide id="trviewer">
        <article className="overflow-hidden rounded-2xl border border-line bg-carbon/80">
          <div className="bio-grid border-b border-line/60 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {tr.tag}
            </p>
            <h2 className="mt-2.5 max-w-3xl text-lg font-semibold leading-snug text-fg sm:text-2xl">
              {tr.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              {tr.intro}
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.7fr_1fr] lg:gap-8">
            {/* Текстови блокове */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Block title={blockLabels.problem} text={tr.problem} />

              <div>
                <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.15em] text-signal">
                  {blockLabels.solution}
                </p>
                <p className="text-sm leading-relaxed text-muted">{tr.solution}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tr.tech.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-2">
                <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.15em] text-signal">
                  {blockLabels.results}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {tr.resultsIntro}
                </p>
                <ul className="mt-2.5 space-y-2">
                  {tr.results.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span aria-hidden="true" className="mt-1 text-signal">
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-2">
                <Block title={blockLabels.why} text={tr.why} />
              </div>
            </div>

            {/* Дискретна SVG йерархия на модела данни */}
            <aside className="flex items-center justify-center rounded-xl border border-line/60 bg-surface/40 p-5">
              <TeHierarchy levels={tr.hierarchy} />
            </aside>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/60 px-6 py-4 sm:px-8">
            <p className="text-xs italic text-faint">{tr.note}</p>
            <a
              href={tr.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-line bg-surface/60 px-5 py-2.5 text-sm text-fg transition-colors duration-200 hover:border-signal/60 hover:text-signal"
            >
              {tr.cta}
            </a>
          </div>
        </article>
      </Slide>
    </DeckShell>
  );
}
