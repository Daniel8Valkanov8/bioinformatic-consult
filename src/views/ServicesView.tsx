"use client";

import { CTAButton } from "@/components/CTAButton";
import { DeckShell } from "@/components/DeckShell";
import { Slide } from "@/components/Slide";
import { useDict, useHref } from "@/content/LocaleProvider";

function DetailList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-faint">
        {title}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-sm leading-snug text-muted"
          >
            <span aria-hidden="true" className="mt-0.5 text-signal">
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesView() {
  const dict = useDict();
  const t = dict.services;
  const labels = dict.ui.serviceDetail;
  const rail = dict.ui.serviceRail;
  const href = useHref();

  const slides = [
    { id: "pregled", label: dict.ui.rail.services.pregled },
    ...t.items.map((s) => ({ id: s.slug, label: rail[s.id as keyof typeof rail] ?? s.id })),
    { id: "zayavka", label: dict.ui.rail.services.zayavka },
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
          {t.sectionLead}
        </p>
      </Slide>

      {/* Една услуга на слайд */}
      {t.items.map((service, i) => (
        <Slide key={service.id} id={service.slug}>
          <article className="rounded-2xl border border-line bg-carbon/80 p-6 sm:p-8">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs tracking-wide text-signal">
                0{i + 1}
              </span>
              <h2 className="text-lg font-semibold leading-snug text-fg sm:text-xl">
                {service.title}
              </h2>
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              {service.short}
            </p>

            <div className="mt-4 rounded-xl border border-line/70 bg-carbon/60 p-3 text-sm">
              <span className="text-muted">{labels.forWhom}: </span>
              <span className="text-fg">{service.forWhom}</span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <DetailList title={labels.input} items={[service.input]} />
              <DetailList title={labels.process} items={service.process} />
              <DetailList title={labels.output} items={service.output} />
            </div>

            {service.boundary && (
              <div className="mt-5 rounded-xl border border-helix/30 bg-helix/[0.05] p-3">
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-helix">
                  {labels.boundary}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {service.boundary}
                </p>
              </div>
            )}
          </article>
        </Slide>
      ))}

      {/* Заявка */}
      <Slide id="zayavka">
        <div className="rounded-2xl border border-line bg-carbon/80 p-6 sm:p-8">
          <p className="max-w-3xl border-l-2 border-helix/60 pl-4 text-sm leading-relaxed text-muted">
            {t.differentiator}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            {dict.trust.pricing.text}
          </p>
          <div className="mt-6">
            <CTAButton href={href("/contact/")}>{dict.cta.consult}</CTAButton>
          </div>
        </div>
      </Slide>
    </DeckShell>
  );
}
