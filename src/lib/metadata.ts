import type { Metadata } from "next";
import {
  getDictionary,
  localizePath,
  ogLocale,
  type Locale,
} from "@/content";

/** Ключ на страница → ключ в dict.meta + базов (английски) път. */
const PAGES = {
  home: { metaKey: "home", path: "/" },
  services: { metaKey: "uslugi", path: "/services/" },
  portfolio: { metaKey: "portfolio", path: "/portfolio/" },
  about: { metaKey: "zaMen", path: "/about/" },
  blog: { metaKey: "blog", path: "/blog/" },
  contact: { metaKey: "kontakt", path: "/contact/" },
} as const;

export type PageKey = keyof typeof PAGES;

/**
 * Изгражда per-locale Metadata с canonical + hreflang alternates (en/bg/x-default).
 * metadataBase се задава в root layout → относителните пътища се резолвят коректно.
 */
export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const { metaKey, path } = PAGES[page];
  const dict = getDictionary(locale);
  const m = dict.meta[metaKey];
  const canonical = localizePath(locale, path);
  const enPath = localizePath("en", path);
  const bgPath = localizePath("bg", path);

  return {
    title: page === "home" ? m.title : `${m.title} | ${dict.brand.name}`,
    description: m.description,
    alternates: {
      canonical,
      languages: { en: enPath, bg: bgPath, "x-default": enPath },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

/** Metadata за единичен блог пост (по locale + slug) с hreflang. */
export function buildBlogPostMetadata(
  locale: Locale,
  slug: string,
): Metadata {
  const post = getDictionary(locale).blog.posts.find((p) => p.slug === slug);
  if (!post) return {};
  const path = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.keywords],
    alternates: {
      canonical: localizePath(locale, path),
      languages: {
        en: localizePath("en", path),
        bg: localizePath("bg", path),
        "x-default": localizePath("en", path),
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: localizePath(locale, path),
      locale: ogLocale[locale],
      publishedTime: post.date,
    },
  };
}
