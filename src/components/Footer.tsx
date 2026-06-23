"use client";

import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { useDict, useHref } from "@/content/LocaleProvider";
import { Container } from "./Container";

export function Footer() {
  const dict = useDict();
  const href = useHref();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Бранд */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-display text-sm font-semibold text-fg">
              <span className="inline-block h-2 w-2 rounded-full bg-signal" />
              {dict.brand.name}
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {dict.footer.sections}
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={href(item.path)}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {dict.ui.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакт */}
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {dict.footer.contact}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-signal"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="text-muted transition-colors hover:text-signal"
                >
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line/60 pt-6 text-xs text-faint">
          © {year} {site.name}. {dict.footer.rights}
        </div>
      </Container>
    </footer>
  );
}
