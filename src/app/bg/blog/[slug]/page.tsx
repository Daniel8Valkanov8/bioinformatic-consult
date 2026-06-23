import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/views/BlogPostView";
import { buildBlogPostMetadata } from "@/lib/metadata";
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
  const post = getDictionary(LOCALE).blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostView slug={slug} />;
}
