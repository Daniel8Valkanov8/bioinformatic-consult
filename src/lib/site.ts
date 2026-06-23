/**
 * Централна конфигурация на сайта — език-агностични технически константи
 * (URL, контакти, навигационни пътища). Видимият текст е в речниците
 * (src/content/{en,bg}.ts); етикетите на навигацията идват от dict.ui.nav.
 */
export const site = {
  // ПРОМЕНИ при деплой на собствен домейн (ползва се за sitemap, OG, canonical).
  url: "https://daniel-valkanov.netlify.app",
  name: "Daniel Valkanov",
  email: "daniel8valkanov8@gmail.com",
  phone: "+359898425547",
  phoneDisplay: "+359 89 842 5547",
} as const;

/**
 * Навигация: ключ (→ етикет от dict.ui.nav) + базов (английски) път.
 * Локализирай пътя с localizePath(locale, path) от src/content.
 */
export const navItems = [
  { key: "services", path: "/services/" },
  { key: "portfolio", path: "/portfolio/" },
  { key: "about", path: "/about/" },
  { key: "blog", path: "/blog/" },
  { key: "contact", path: "/contact/" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
