"use client";

import { CTAButton } from "@/components/CTAButton";
import { DeckShell } from "@/components/DeckShell";
import { Slide } from "@/components/Slide";
import { useDict, useHref } from "@/content/LocaleProvider";

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-snug text-muted">
          <span aria-hidden="true" className="mt-0.5 text-helix">
            ▸
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AboutView() {
  const dict = useDict();
  const t = dict.about;
  const rail = dict.ui.rail.about;
  const href = useHref();

  const slides = [
    { id: "profil", label: rail.profil },
    { id: "podhod", label: rail.podhod },
    { id: "poveritelnost", label: rail.poveritelnost },
  ];

  return (
    <DeckShell slides={slides}>
      {/* Профил */}
      <Slide id="profil" className="border-t-0">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.22em] text-signal">
          {dict.ui.aboutEyebrow}
        </p>
        <h1 className="max-w-3xl text-balance font-display text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-[2.15rem]">
          {t.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
          {t.intro}
        </p>
      </Slide>

      {/* Подход */}
      <Slide id="podhod">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-line bg-carbon/80 p-6">
            <h2 className="text-base font-semibold text-fg">
              {t.educationTitle}
            </h2>
            <div className="mt-4">
              <Bullets items={t.education} />
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-carbon/80 p-6 lg:col-span-2">
            <h2 className="text-base font-semibold text-fg">
              {t.approachTitle}
            </h2>
            <div className="mt-4">
              <Bullets items={t.approach} />
            </div>
          </section>
        </div>
      </Slide>

      {/* Поверителност */}
      <Slide id="poveritelnost">
        <section className="rounded-2xl border border-helix/30 bg-carbon/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-fg">{t.privacyTitle}</h2>
          <p className="mt-2 text-sm text-muted">{t.privacyLead}</p>
          <div className="mt-4 max-w-2xl">
            <Bullets items={t.privacyPoints} />
          </div>
        </section>
        <div className="mt-8">
          <CTAButton href={href("/contact/")}>{dict.cta.consult}</CTAButton>
        </div>
      </Slide>
    </DeckShell>
  );
}
