import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary:
    "bg-bio text-carbon font-semibold hover:bg-bio-soft shadow-[0_0_30px_-8px_rgba(79,224,196,0.5)]",
  secondary:
    "border border-line bg-surface/60 text-fg hover:border-bio/60 hover:text-bio",
};

/** Бутон-връзка с два варианта. Ползва Link за вътрешни и hash навигации. */
export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
