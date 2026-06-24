"use client";

import type { ReactNode } from "react";
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

/** Компактен блок за TR-Viewer: ляв неонов акцент + плътна типография. */
function TrBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-2 border-signal/30 pl-3.5">
      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
        {label}
      </p>
      {children}
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
          <div className="bio-grid border-b border-line/60 px-6 py-5 sm:px-8">
            <div className="grid items-center gap-5 lg:grid-cols-[1.7fr_1fr] lg:gap-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                  {tr.tag}
                </p>
                <h2 className="mt-2 max-w-2xl text-lg font-semibold leading-tight text-fg sm:text-xl lg:text-[1.4rem]">
                  {tr.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[13px] leading-snug text-muted">
                  {tr.intro}
                </p>
              </div>
              {/* Дискретна SVG йерархия на модела данни (в хедъра, вдясно) */}
              <div className="hidden justify-center lg:flex">
                <div className="w-full max-w-[210px]">
                  <TeHierarchy levels={tr.hierarchy} />
                </div>
              </div>
            </div>
          </div>

          {/* Плътен „spec sheet" ред: 4 блока с ляв неонов акцент, компактна
              типография → слайдът остава нисък и се събира без вътрешен скрол. */}
          <div className="grid gap-x-7 gap-y-5 px-6 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            <TrBlock label={blockLabels.problem}>
              <p className="text-[12.5px] leading-[1.5] text-muted">{tr.problem}</p>
            </TrBlock>

            <TrBlock label={blockLabels.solution}>
              <p className="text-[12.5px] leading-[1.5] text-muted">{tr.solution}</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {tr.tech.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface/60 px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </TrBlock>

            <TrBlock label={blockLabels.results}>
              <p className="text-[12.5px] leading-[1.5] text-muted">
                {tr.resultsIntro}
              </p>
              <ul className="mt-2 space-y-1.5">
                {tr.results.map((item) => (
                  <li key={item} className="text-[12px] leading-[1.45] text-muted">
                    <span aria-hidden="true" className="mr-1 text-signal">
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </TrBlock>

            <TrBlock label={blockLabels.why}>
              <p className="text-[12.5px] leading-[1.5] text-muted">{tr.why}</p>
            </TrBlock>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 px-6 py-3 sm:px-8">
            <p className="text-[11px] italic text-faint">{tr.note}</p>
            <a
              href={tr.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-line bg-surface/60 px-4 py-2 text-[13px] text-fg transition-colors duration-200 hover:border-signal/60 hover:text-signal"
            >
              {tr.cta}
            </a>
          </div>
        </article>
      </Slide>
    </DeckShell>
  );
}
