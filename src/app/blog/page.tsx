import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { bg } from "@/content/bg";

export const metadata: Metadata = {
  title: bg.meta.blog.title,
  description: bg.meta.blog.description,
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: bg.meta.blog.title,
    description: bg.meta.blog.description,
    url: "/blog/",
  },
};

export default function BlogPage() {
  const t = bg.blog;
  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6">
          {t.posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-line bg-surface/50 p-7 transition-colors hover:border-bio/40 sm:p-8"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-faint">
                <time dateTime={post.date}>{post.dateDisplay}</time>
                <span aria-hidden="true">·</span>
                <span>
                  {post.readingTime} {t.readingTime}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold leading-snug text-fg">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="transition-colors hover:text-bio"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}/`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-bio transition-colors hover:text-bio-soft"
              >
                {bg.cta.readMore}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
