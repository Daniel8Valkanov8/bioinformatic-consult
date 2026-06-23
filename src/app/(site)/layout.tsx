import { LocaleProvider } from "@/content/LocaleProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/** Английски (по подразбиране) — на root URL-ите. Групата (site) не влиза в пътя. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale="en">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
