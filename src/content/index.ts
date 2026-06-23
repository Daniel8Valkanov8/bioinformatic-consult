import { bg } from "./bg";
import { en } from "./en";
import type { Content, Locale } from "./types";

export type { Content, Locale };

/** Английският е първи = по подразбиране (root домейн). */
export const locales = ["en", "bg"] as const;
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Content> = { en, bg };

export function getDictionary(locale: Locale): Content {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/**
 * Локализира вътрешен път спрямо езика:
 *  - en (default) → пътят както е (без префикс);
 *  - bg → "/bg" + пътя.
 * Пази trailingSlash конвенцията на проекта.
 */
export function localizePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? "/bg/" : `/bg${clean}`;
}

/** OG / html lang кодове по език. */
export const ogLocale: Record<Locale, string> = { en: "en_US", bg: "bg_BG" };
export const htmlLang: Record<Locale, string> = { en: "en", bg: "bg" };
