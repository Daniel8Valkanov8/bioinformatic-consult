"use client";

import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";
import { HeroVisual } from "@/components/HeroVisual";
import { useDict, useHref } from "@/content/LocaleProvider";

export function Hero() {
  const t = useDict().hero;
  const href = useHref();
  return (
    <section id="nachalo" className="slide relative overflow-hidden">
      {/* Финно фоново био-свечение */}
      <div className="bio-glow pointer-events-none absolute inset-x-0 top-0 h-[480px]" />
      <Container className="slide-fit relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          {/* Eyebrow в дуо-тона: биология (зелено) × софтуер (синьо) */}
          <p
            data-reveal
            className="mb-4 font-mono text-sm uppercase tracking-[0.22em]"
          >
            <span className="text-helix">{t.eyebrowBiology}</span>
            <span className="mx-2 text-faint">×</span>
            <span className="text-signal">{t.eyebrowSoftware}</span>
          </p>
          <h1
            data-reveal
            style={{ "--reveal-delay": "90ms" } as CSSProperties}
            className="text-balance font-display text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-[2.15rem]"
          >
            {t.title}
          </h1>
          <p
            data-reveal
            style={{ "--reveal-delay": "170ms" } as CSSProperties}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted lg:text-lg"
          >
            {t.subtitle}
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "250ms" } as CSSProperties}
            className="mt-7 flex flex-wrap gap-3"
          >
            <CTAButton href={href("/contact/")} variant="primary">
              {t.primaryCta}
            </CTAButton>
            <CTAButton href="#services" variant="secondary">
              {t.secondaryCta}
            </CTAButton>
          </div>

          <ul
            data-reveal
            style={{ "--reveal-delay": "320ms" } as CSSProperties}
            className="mt-8 flex flex-wrap gap-2"
          >
            {t.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>

        {/* Сигнатурният provenance панел — влиза отстрани */}
        <div
          data-reveal
          data-reveal-x
          style={{ "--reveal-delay": "200ms" } as CSSProperties}
          className="flex justify-center lg:justify-end"
        >
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
