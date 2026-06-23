import { LocaleProvider } from "@/content/LocaleProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";

/** Български — под /bg/. LocaleProvider дава bg речник + коригира <html lang>. */
export default function BgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={siteGraph("bg")} />
      <LocaleProvider locale="bg">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </LocaleProvider>
    </>
  );
}
