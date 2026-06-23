import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/views/BlogPostView";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBlogPostMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { getDictionary } from "@/content";

const LOCALE = "bg" as const;
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getDictionary(LOCALE).blog.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogPostMetadata(LOCALE, slug);
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const dict = getDictionary(LOCALE);
  const post = dict.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const trail = [
    { name: dict.brand.name, path: "/" },
    { name: dict.blog.title, path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` },
  ];
  return (
    <>
      <JsonLd data={blogPostingSchema(LOCALE, post)} />
      <JsonLd data={breadcrumbSchema(LOCALE, trail)} />
      <BlogPostView slug={slug} />
    </>
  );
}
