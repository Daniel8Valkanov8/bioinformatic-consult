import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { bg } from "@/content/bg";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/uslugi/",
    "/portfolio/",
    "/za-men/",
    "/blog/",
    "/kontakt/",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const blogRoutes = bg.blog.posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
