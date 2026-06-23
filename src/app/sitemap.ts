import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getDictionary, localizePath } from "@/content";

export const dynamic = "force-static";

const PATHS = [
  "/",
  "/services/",
  "/portfolio/",
  "/about/",
  "/blog/",
  "/contact/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (p: string) => `${site.url}${p}`;
  const entries: MetadataRoute.Sitemap = [];

  const addPair = (
    path: string,
    lastModified: Date,
    changeFrequency: "monthly" | "yearly",
    priorityEn: number,
  ) => {
    const enUrl = abs(localizePath("en", path));
    const bgUrl = abs(localizePath("bg", path));
    const languages = { en: enUrl, bg: bgUrl };
    entries.push({
      url: enUrl,
      lastModified,
      changeFrequency,
      priority: priorityEn,
      alternates: { languages },
    });
    entries.push({
      url: bgUrl,
      lastModified,
      changeFrequency,
      priority: Math.max(priorityEn - 0.1, 0.1),
      alternates: { languages },
    });
  };

  for (const path of PATHS) {
    addPair(path, new Date(), "monthly", path === "/" ? 1 : 0.7);
  }

  for (const post of getDictionary("en").blog.posts) {
    addPair(`/blog/${post.slug}/`, new Date(post.date), "yearly", 0.6);
  }

  return entries;
}
