import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";
import { bg } from "@/content/bg";

type Params = { slug: string };

/** Генерира статичните пътища за всички постове при export. */
export function generateStaticParams(): Params[] {
  return bg.blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = bg.blog.posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.keywords],
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = bg.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-bio"
        >
          <span aria-hidden="true">←</span> {bg.blog.title}
        </Link>

        <header className="mt-6 border-b border-line/60 pb-8">
          <div className="flex items-center gap-3 font-mono text-xs text-faint">
            <time dateTime={post.date}>{post.dateDisplay}</time>
            <span aria-hidden="true">·</span>
            <span>
              {post.readingTime} {bg.blog.readingTime}
            </span>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl">
            {post.title}
          </h1>
        </header>

        <div className="mt-8 space-y-6">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="pt-2 text-xl font-semibold tracking-tight text-fg"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2.5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-muted"
                    >
                      <span aria-hidden="true" className="mt-1.5 text-bio">
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-base leading-relaxed text-muted">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-surface/50 p-7">
          <p className="text-sm leading-relaxed text-muted">
            {bg.trust.pricing.text}
          </p>
          <div className="mt-5">
            <CTAButton href="/kontakt/">{bg.cta.consult}</CTAButton>
          </div>
        </div>
      </Container>
    </article>
  );
}
