"use client";

import { useEffect, useState } from "react";

/**
 * SectionRail — презентационният навигатор („слайд N от M").
 * --------------------------------------------------------------------------
 * Хоризонтална лента долу-център, синхронизирана с хоризонталния дек:
 * показва кой слайд гледаш и прескача при клик. Активният индекс се чете от
 * scrollLeft на дека (детерминирано за хоризонтален скрол). Скрит на мобилно.
 *
 * Слайдовете се подават като проп (всяка страница има свои секции). Числото
 * 0X / 0N е оправдано — това Е реална последователност (позиция в
 * презентацията), не декоративно номериране.
 */
export type RailSlide = { id: string; label: string };

export function SectionRail({ slides }: { slides: readonly RailSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const deck = document.querySelector<HTMLElement>("[data-deck]");
    if (!deck) return;

    const vertical = () => window.matchMedia("(max-width: 767px)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const idx = vertical()
        ? Math.round(deck.scrollTop / Math.max(deck.clientHeight, 1))
        : Math.round(deck.scrollLeft / Math.max(deck.clientWidth, 1));
      setActive(Math.max(0, Math.min(slides.length - 1, idx)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    deck.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      deck.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slides.length]);

  const go = (i: number) => {
    const deck = document.querySelector<HTMLElement>("[data-deck]");
    if (!deck) return;
    if (window.matchMedia("(max-width: 767px)").matches)
      deck.scrollTo({ top: i * deck.clientHeight, behavior: "smooth" });
    else deck.scrollTo({ left: i * deck.clientWidth, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Навигация по секции"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center md:flex"
    >
      <div className="pointer-events-auto flex items-center gap-5 rounded-full border border-line/70 bg-carbon/70 px-5 py-2.5">
        <ul className="flex items-center gap-4">
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center gap-2"
                >
                  {/* Гел-лента: тиктата се удължава и засветва при активен слайд */}
                  <span
                    className={`block h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-7 bg-signal shadow-[0_0_8px_1px_rgba(77,155,255,0.55)]"
                        : "w-4 bg-line group-hover:w-6 group-hover:bg-muted"
                    }`}
                  />
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                      isActive
                        ? "text-fg"
                        : "text-faint group-hover:text-muted"
                    }`}
                  >
                    {slide.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <span className="border-l border-line/70 pl-4 font-mono text-[10px] tracking-[0.2em] text-faint">
          {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </nav>
  );
}
