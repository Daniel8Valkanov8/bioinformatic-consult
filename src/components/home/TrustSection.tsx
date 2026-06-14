import { Section, SectionHeader } from "@/components/Section";
import { bg } from "@/content/bg";

function CheckList({ points }: { points: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {points.map((p) => (
        <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-1 text-bio">
            ▸
          </span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrustSection() {
  const t = bg.trust;
  return (
    <Section id="doverie" className="border-t border-line/60">
      <SectionHeader eyebrow={t.sectionEyebrow} title={t.sectionTitle} />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Поверителност */}
        <div className="rounded-2xl border border-line bg-surface/50 p-7">
          <h3 className="text-lg font-semibold text-fg">{t.privacy.title}</h3>
          <p className="mt-2 text-sm text-muted">{t.privacy.lead}</p>
          <div className="mt-5">
            <CheckList points={t.privacy.points} />
          </div>
        </div>

        {/* Пилотен анализ */}
        <div className="relative overflow-hidden rounded-2xl border border-bio/30 bg-surface/50 p-7">
          <div className="bio-glow pointer-events-none absolute inset-0" />
          <div className="relative">
            <h3 className="text-lg font-semibold text-fg">{t.pilot.title}</h3>
            <p className="mt-2 text-sm text-muted">{t.pilot.lead}</p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
      <div className="mt-6 rounded-2xl border border-line bg-surface/30 p-7">
        <h3 className="text-base font-semibold text-fg">{t.pricing.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
          {t.pricing.text}
        </p>
      </div>
    </Section>
  );
}
