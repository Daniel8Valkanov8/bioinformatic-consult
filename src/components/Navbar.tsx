"use client";

import { useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { bg } from "@/content/bg";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-carbon/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Бранд */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-fg"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-bio shadow-[0_0_10px_2px_rgba(79,224,196,0.6)]" />
          {bg.brand.name}
        </Link>

        {/* Десктоп навигация */}
        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/kontakt/"
              className="rounded-lg bg-bio px-4 py-2 text-sm font-semibold text-carbon transition-colors hover:bg-bio-soft"
            >
              {bg.cta.consult}
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
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/kontakt/"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-bio px-4 py-3 text-center text-base font-semibold text-carbon transition-colors hover:bg-bio-soft"
              >
                {bg.cta.consult}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
