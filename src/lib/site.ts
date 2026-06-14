/**
 * Централна конфигурация на сайта — данни, които не са "видим текст за превод",
 * а технически константи (URL, контакти, навигация).
 * Видимият текст е в src/content/bg.ts.
 */
export const site = {
  // ПРОМЕНИ при деплой на собствен домейн (ползва се за sitemap, OG, canonical).
  url: "https://daniel-valkanov.netlify.app",
  name: "Даниел Вълканов",
  shortName: "Даниел Вълканов — Биоинформатика",
  email: "daniel8valkanov8@gmail.com",
  phone: "+359898425547",
  phoneDisplay: "+359 89 842 5547",
  locale: "bg_BG",
} as const;

/** Навигация: hash сочи към секция на началната страница, href към отделна страница. */
export const nav = [
  { label: "Услуги", href: "/uslugi/", hash: "/#uslugi" },
  { label: "Портфолио", href: "/portfolio/", hash: "/#portfolio" },
  { label: "За мен", href: "/za-men/", hash: null },
  { label: "Блог", href: "/blog/", hash: null },
  { label: "Контакт", href: "/kontakt/", hash: "/#kontakt" },
] as const;
