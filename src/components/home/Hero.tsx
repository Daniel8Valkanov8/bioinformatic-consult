import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";
import { HeroVisual } from "@/components/HeroVisual";
import { bg } from "@/content/bg";

export function Hero() {
  const t = bg.hero;
  return (
    <section className="relative overflow-hidden">
      {/* Финно фоново био-свечение */}
      <div className="bio-glow pointer-events-none absolute inset-x-0 top-0 h-[480px]" />
      <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-bio">
            {t.eyebrow}
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {t.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <CTAButton href="/kontakt/" variant="primary">
              {t.primaryCta}
            </CTAButton>
            <CTAButton href="/#uslugi" variant="secondary">
              {t.secondaryCta}
            </CTAButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
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

        {/* Изолиран слот за бъдещо 3D */}
        <div className="flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
