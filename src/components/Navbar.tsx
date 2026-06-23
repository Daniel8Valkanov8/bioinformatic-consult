"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { navItems } from "@/lib/site";
import { useDict, useHref } from "@/content/LocaleProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const dict = useDict();
  const href = useHref();
  const homeHref = href("/");

  // Клик върху името → връща в РЕАЛНОТО начало (първия слайд на дека).
  // На началната скролва дека/документа; от друга страница — навигация към home.
  const goToStart = (e: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (typeof window === "undefined" || window.location.pathname !== homeHref) {
      return;
    }
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    const deck = document.querySelector<HTMLElement>("[data-deck]");
    const isVertical = window.matchMedia("(max-width: 767px)").matches;
    if (deck && !isVertical) {
      deck.scrollTo({ left: 0, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
    if (window.location.hash) history.replaceState(null, "", homeHref);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-carbon/80">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Бранд */}
        <Link
          href={homeHref}
          className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-fg"
          onClick={goToStart}
          aria-label={dict.cta.backHome}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_2px_rgba(77,155,255,0.6)]" />
          {dict.brand.name}
        </Link>

        {/* Десктоп навигация */}
        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={href(item.path)}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {dict.ui.nav[item.key]}
              </Link>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <Link
              href={href("/contact/")}
              className="rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-carbon transition-colors hover:bg-signal-soft"
            >
              {dict.cta.consult}
            </Link>
          </li>
        </ul>

        {/* Хамбургер (мобилно) */}
        <button
          type="button"
          aria-label={open ? "Затвори менюто" : "Отвори менюто"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Мобилно меню */}
      {open && (
        <div className="border-t border-line/70 bg-carbon md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={href(item.path)}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {dict.ui.nav[item.key]}
                </Link>
              </li>
            ))}
            <li className="px-3 py-3">
              <LanguageSwitcher />
            </li>
            <li className="pt-2">
              <Link
                href={href("/contact/")}
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-signal px-4 py-3 text-center text-base font-semibold text-carbon transition-colors hover:bg-signal-soft"
              >
                {dict.cta.consult}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
