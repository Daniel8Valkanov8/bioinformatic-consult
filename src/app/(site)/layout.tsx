import { LocaleProvider } from "@/content/LocaleProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";

/** Английски (по подразбиране) — на root URL-ите. Групата (site) не влиза в пътя. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={siteGraph("en")} />
      <LocaleProvider locale="en">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </LocaleProvider>
    </>
  );
}
