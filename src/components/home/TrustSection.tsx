"use client";

import type { CSSProperties } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { useDict } from "@/content/LocaleProvider";

function CheckList({ points }: { points: readonly string[] }) {
  return (
    <ul className="space-y-1.5">
      {points.map((p) => (
        <li key={p} className="flex gap-2.5 text-sm leading-snug text-muted">
          <span aria-hidden="true" className="mt-0.5 text-helix">
            ✓
          </span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrustSection() {
  const t = useDict().trust;
  return (
    <Section
      id="doverie"
      className="slide border-t border-line/60"
      containerClassName="slide-fit"
    >
      <SectionHeader eyebrow={t.sectionEyebrow} title={t.sectionTitle} />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {/* Поверителност */}
        <div
          data-reveal
          className="rounded-2xl border border-line bg-surface/80 p-5"
        >
          <h3 className="text-base font-semibold text-fg">{t.privacy.title}</h3>
          <p className="mt-1.5 text-sm text-muted">{t.privacy.lead}</p>
          <div className="mt-3.5">
            <CheckList points={t.privacy.points} />
          </div>
        </div>

        {/* Пилотен анализ */}
        <div
          data-reveal
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
          className="relative overflow-hidden rounded-2xl border border-helix/30 bg-surface/80 p-5"
        >
          <div className="bio-glow pointer-events-none absolute inset-0" />
          <div className="relative">
            <h3 className="text-base font-semibold text-fg">{t.pilot.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{t.pilot.lead}</p>

            <div className="mt-3.5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-faint">
                  {t.pilot.limits.title}
                </p>
                <CheckList points={t.pilot.limits.points} />
              </div>
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-faint">
                  {t.pilot.boundaries.title}
                </p>
                <CheckList points={t.pilot.boundaries.points} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ценови сигнал */}
      <div
        data-reveal
        className="mt-4 rounded-2xl border border-line bg-surface/70 p-5"
      >
        <h3 className="text-base font-semibold text-fg">{t.pricing.title}</h3>
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
          {t.pricing.text}
        </p>
      </div>
    </Section>
  );
}
