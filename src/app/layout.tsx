import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { bg } from "@/content/bg";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: bg.meta.home.title,
    template: `%s | ${site.name}`,
  },
  description: bg.meta.home.description,
  keywords: [
    "биоинформатика",
    "биоинформатичен консултант",
    "метагеномика",
    "NGS анализ",
    "16S",
    "ITS",
    "секвениране",
    "WES",
    "Nextflow",
    "България",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.shortName,
    title: bg.meta.home.title,
    description: bg.meta.home.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: bg.meta.home.title,
    description: bg.meta.home.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-carbon text-fg">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
