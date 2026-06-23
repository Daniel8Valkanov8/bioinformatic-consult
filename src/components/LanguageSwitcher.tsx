"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDict, useLocale } from "@/content/LocaleProvider";
import { defaultLocale, type Locale } from "@/content";

/** Мапва текущия път към еквивалента на другия език (добавя/маха /bg префикс). */
function toLocalePath(pathname: string, target: Locale): string {
  const isBg = pathname === "/bg" || pathname.startsWith("/bg/");
  const base = isBg ? pathname.replace(/^\/bg/, "") || "/" : pathname || "/";
  if (target === defaultLocale) return base;
  return base === "/" ? "/bg/" : `/bg${base}`;
}

const LANGS: { code: Locale; short: string }[] = [
  { code: "en", short: "EN" },
  { code: "bg", short: "BG" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/";
  const locale = useLocale();
  const label = useDict().ui.language.label;

  const remember = (l: Locale) => {
    try {
      localStorage.setItem("locale", l);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className={`flex items-center font-mono text-xs ${className}`}
      role="group"
      aria-label={label}
    >
      {LANGS.map(({ code, short }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="mx-1.5 text-line">/</span>}
          {code === locale ? (
            <span aria-current="true" className="font-semibold text-signal">
              {short}
            </span>
          ) : (
            <Link
              href={toLocalePath(pathname, code)}
              onClick={() => remember(code)}
              className="text-muted transition-colors hover:text-fg"
            >
              {short}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
