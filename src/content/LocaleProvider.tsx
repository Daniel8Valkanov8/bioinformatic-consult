"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { getDictionary, localizePath } from "./index";
import type { Content, Locale } from "./types";

type LocaleCtx = { locale: Locale; dict: Content };

const LocaleContext = createContext<LocaleCtx | null>(null);

/**
 * Дава активния език + речник на клиентското поддърво. Поставя се в layout-а на
 * всеки езиков сегмент (английски group layout / bg layout). Речникът се изчислява
 * от locale (двата речника така или иначе са нужни клиентски за превключвателя).
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const dict = getDictionary(locale);
  // Коригира <html lang> спрямо активния език (важно за /bg/ при общ root layout).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

function useLocaleCtx(): LocaleCtx {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useDict/useLocale трябва да са вътре в <LocaleProvider>");
  }
  return ctx;
}

export const useDict = (): Content => useLocaleCtx().dict;
export const useLocale = (): Locale => useLocaleCtx().locale;

/** Връща функция, която локализира вътрешен път спрямо активния език. */
export function useHref(): (path: string) => string {
  const { locale } = useLocaleCtx();
  return (path: string) => localizePath(locale, path);
}
