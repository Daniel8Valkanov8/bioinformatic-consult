import Link from "next/link";
import { nav, site } from "@/lib/site";
import { bg } from "@/content/bg";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Бранд */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-fg">
              <span className="inline-block h-2 w-2 rounded-full bg-bio" />
              {bg.brand.name}
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {bg.footer.tagline}
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {bg.footer.sections}
            </h3>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакт */}
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {bg.footer.contact}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-bio"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="text-muted transition-colors hover:text-bio"
                >
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line/60 pt-6 text-xs text-faint">
          © {year} {site.name}. {bg.footer.rights}
        </div>
      </Container>
    </footer>
  );
}
