"use client";

import Link from "next/link";
import { DeckShell } from "@/components/DeckShell";
import { Slide } from "@/components/Slide";
import { useDict, useHref } from "@/content/LocaleProvider";

export function BlogView() {
  const dict = useDict();
  const t = dict.blog;
  const rail = dict.ui.rail.blog;
  const href = useHref();

  const slides = [
    { id: "blog", label: rail.blog },
    { id: "statii", label: rail.statii },
  ];

  return (
    <DeckShell slides={slides}>
      {/* Интро */}
      <Slide id="blog" className="border-t-0">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.22em] text-signal">
          {dict.ui.blogEyebrow}
        </p>
        <h1 className="max-w-3xl text-balance font-display text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-[2.15rem]">
          {t.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
          {t.lead}
        </p>
      </Slide>

      {/* Статии */}
      <Slide id="statii">
        <div className="grid gap-4">
          {t.posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-line bg-carbon/80 p-6 transition-colors hover:border-signal/40"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-faint">
                <time dateTime={post.date}>{post.dateDisplay}</time>
                <span aria-hidden="true">·</span>
                <span>
                  {post.readingTime} {t.readingTime}
                </span>
              </div>
              <h2 className="mt-2.5 text-lg font-semibold leading-snug text-fg sm:text-xl">
                <Link
                  href={href(`/blog/${post.slug}/`)}
                  className="transition-colors hover:text-signal"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <Link
                href={href(`/blog/${post.slug}/`)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal transition-colors hover:text-signal-soft"
              >
                {dict.cta.readMore}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Slide>
    </DeckShell>
  );
}
