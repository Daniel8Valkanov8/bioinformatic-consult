"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";
import { useDict, useHref } from "@/content/LocaleProvider";

export function BlogPostView({ slug }: { slug: string }) {
  const dict = useDict();
  const href = useHref();
  const post = dict.blog.posts.find((p) => p.slug === slug);
  if (!post) return null;

  return (
    <article className="py-12 sm:py-16">
      <Container className="max-w-3xl rounded-2xl border border-line bg-carbon/85 p-6 sm:p-10">
        <Link
          href={href("/blog/")}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-signal"
        >
          <span aria-hidden="true">←</span> {dict.blog.title}
        </Link>

        <header className="mt-6 border-b border-line/60 pb-8">
          <div className="flex items-center gap-3 font-mono text-xs text-faint">
            <time dateTime={post.date}>{post.dateDisplay}</time>
            <span aria-hidden="true">·</span>
            <span>
              {post.readingTime} {dict.blog.readingTime}
            </span>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl">
            {post.title}
          </h1>
        </header>

        <div className="mt-8 space-y-6">
          {post.body.map((block, i) => {
            if ("items" in block) {
              return (
                <ul key={i} className="space-y-2.5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-muted"
                    >
                      <span aria-hidden="true" className="mt-1.5 text-signal">
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
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
            return (
              <p key={i} className="text-base leading-relaxed text-muted">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-helix/30 bg-surface/70 p-7">
          <p className="text-sm leading-relaxed text-muted">
            {dict.trust.pricing.text}
          </p>
          <div className="mt-5">
            <CTAButton href={href("/contact/")}>{dict.cta.consult}</CTAButton>
          </div>
        </div>
      </Container>
    </article>
  );
}
