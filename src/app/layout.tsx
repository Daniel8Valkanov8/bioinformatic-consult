import type { Metadata } from "next";
import { Onest, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { VideoBackground } from "@/components/VideoBackground";
import { en } from "@/content/en";
import { site } from "@/lib/site";

// Onest — кирилица-native гротеск (дисплей + основен текст). Умишлено НЕ Inter.
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// IBM Plex Mono — техническият слой (eyebrow, код, секвенции). Има кирилица.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Английският е по подразбиране; per-page metadata презаписва заглавие/описание.
  title: en.meta.home.title,
  description: en.meta.home.description,
  keywords: [
    "bioinformatics",
    "bioinformatics consultant",
    "metagenomics",
    "NGS analysis",
    "16S",
    "ITS",
    "sequencing",
    "WES",
    "Nextflow",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: en.meta.home.title,
    description: en.meta.home.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // lang="en" по подразбиране; за /bg/ страниците се коригира client-side в
  // LocaleProvider (document.documentElement.lang). Статичен експорт не позволява
  // per-route <html> при общ root layout.
  return (
    <html
      lang="en"
      className={`${onest.variable} ${plexMono.variable} h-full bg-carbon`}
    >
      <body className="min-h-full flex flex-col text-fg">
        <VideoBackground />
        {children}
      </body>
    </html>
  );
}
