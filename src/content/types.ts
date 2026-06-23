/**
 * Широк тип, изведен от структурата на bg.ts, така че en.ts да се типизира със
 * същата форма (липсващ/излишен ключ се хваща при компилация), но без тесните
 * literal типове на `as const` (за да приема различни стойности на превода).
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends null
        ? null
        : T extends readonly (infer U)[]
          ? readonly Widen<U>[]
          : { [K in keyof T]: Widen<T[K]> };

type SourceContent = typeof import("./bg").bg;

/** Структурата на целия речник (език-агностична). */
export type Content = Widen<SourceContent>;

/** Поддържани езици. Английският е по подразбиране (root, без префикс). */
export type Locale = "en" | "bg";
