import { getDictionary, localizePath, type Locale } from "@/content";
import { site } from "@/lib/site";

const abs = (locale: Locale, path: string) => `${site.url}${localizePath(locale, path)}`;

/**
 * Основен @graph за всяка страница: Person (Даниел) + Service (офертата) +
 * WebSite, свързани по @id. Силен entity сигнал за Google и AI търсачки.
 * Service (не ProfessionalService) — защото е дистанционен консултант без адрес.
 */
export function siteGraph(locale: Locale) {
  const dict = getDictionary(locale);
  const personId = `${site.url}/#person`;
  const serviceId = `${site.url}/#service`;
  const websiteId = `${site.url}/#website`;
  const home = abs(locale, "/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: dict.brand.role,
        description: dict.hero.subtitle,
        url: home,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        knowsLanguage: ["en", "bg"],
        knowsAbout: [
          "Bioinformatics",
          "Metagenomics",
          "16S rRNA sequencing",
          "ITS sequencing",
          "NGS analysis",
          "Whole Exome Sequencing",
          "Variant calling",
          "ACMG classification",
          "Nextflow",
          "Docker",
          "Reproducible research",
        ],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "University of Plovdiv" },
          { "@type": "EducationalOrganization", name: "SoftUni" },
        ],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: `${site.name} — ${dict.brand.role}`,
        description: dict.meta.home.description,
        url: home,
        provider: { "@id": personId },
        areaServed: "Worldwide",
        availableLanguage: ["en", "bg"],
        serviceType: [
          "Metagenomic analysis (16S/ITS)",
          "Secondary NGS analysis",
          "Reproducible bioinformatics pipelines",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: home,
        inLanguage: locale,
        publisher: { "@id": personId },
      },
    ],
  };
}

/** BlogPosting за единичен пост. */
export function blogPostingSchema(
  locale: Locale,
  post: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    keywords: readonly string[];
  },
) {
  const pageUrl = abs(locale, `/blog/${post.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    keywords: post.keywords.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
  };
}

/** BreadcrumbList от поредица { name, path }. */
export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(locale, t.path),
    })),
  };
}
