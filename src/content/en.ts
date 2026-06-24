import type { Content } from "./types";

/**
 * CENTRAL CONTENT FILE (EN) — primary language.
 * --------------------------------------------------------------------------
 * Mirrors the exact structure of bg.ts. All visible English text lives here.
 * Typed as `Content` so any missing/extra key is caught at compile time.
 */
export const en: Content = {
  /* ---------------------------------------------------------------- META */
  meta: {
    home: {
      title: "Daniel Valkanov — Bioinformatics Consultant | NGS, metagenomics",
      description:
        "Bioinformatics consultant. Reliable, reproducible results from your NGS and omics data — metagenomics (16S/ITS), secondary NGS analysis and containerized pipelines. Without hiring an in-house bioinformatician.",
    },
    uslugi: {
      title: "Services — Metagenomics, NGS analysis, reproducible pipelines",
      description:
        "Three services for labs and research teams: 16S/ITS metagenomic analysis, secondary NGS analysis with an interpretable report, and reproducible Nextflow/Docker pipelines.",
    },
    portfolio: {
      title: "Portfolio — Bioinformatics case studies",
      description:
        "Selected work: classification of molecular breast-cancer subtypes with a Graph Neural Network on a reproducible pipeline. Proven ability to work with complex biological data.",
    },
    zaMen: {
      title: "About — Bioinformatician with an engineering background",
      description:
        "Daniel Valkanov — a rare combination of bioinformatics, molecular biology and software engineering. Approach, education, confidentiality and work under NDA.",
    },
    blog: {
      title: "Blog — Bioinformatics, metagenomics, NGS",
      description:
        "Practical articles on metagenomic analysis, NGS sequencing and reproducible bioinformatics for labs and researchers.",
    },
    kontakt: {
      title: "Contact — Free initial consultation",
      description:
        "Get in touch for a free initial consultation. Projects are scoped and priced individually. Email, phone and contact form.",
    },
  },

  /* ---------------------------------------------------------------- NAV / COMMON */
  brand: {
    name: "Daniel Valkanov",
    role: "Bioinformatics Consultant",
  },
  cta: {
    primary: "Get in touch",
    consult: "Free consultation",
    seeServices: "See the services",
    seeCase: "See case study",
    allServices: "All services",
    backHome: "Back to start",
    readMore: "Read more",
  },

  /* ---------------------------------------------------------------- HERO */
  hero: {
    eyebrow: "Biology × Software",
    eyebrowBiology: "Biology",
    eyebrowSoftware: "Software",
    title:
      "I help research teams and laboratories extract reliable, reproducible results from their NGS and omics data, without hiring an in-house bioinformatician.",
    subtitle:
      "A bioinformatician who connects biology and software engineering. Analysis you can reproduce and defend.",
    primaryCta: "Get in touch",
    secondaryCta: "See the services",
    badges: ["Metagenomics 16S/ITS", "Secondary NGS analysis", "Nextflow / Docker"],
  },

  /* ---------------------------------------------------------------- SERVICES */
  services: {
    sectionEyebrow: "Services",
    sectionTitle: "How I help",
    sectionLead:
      "Three clearly defined services. Each takes raw sequencing data to an interpretable result that holds up in front of a reviewer and an auditor.",
    items: [
      {
        id: "metagenomika",
        slug: "metagenomika",
        title: "16S/ITS metagenomic analysis + interpretable report",
        short:
          "From raw FASTQ to taxonomic composition, diversity and publication-ready methods text.",
        forWhom:
          "Agricultural institutes, veterinary and food laboratories, academic groups.",
        input: "Raw FASTQ files, metadata, target region (16S or ITS).",
        process: [
          "QC (quality control)",
          "Primer trimming",
          "Denoising (DADA2 / ASV)",
          "Taxonomic classification (SILVA / UNITE)",
          "Diversity (alpha / beta)",
          "Differential abundance",
        ],
        output: [
          "Taxonomic composition table",
          "4–6 key figures",
          "Publication-ready methods text",
          "Reproducible containerized workflow",
        ],
        boundary: null,
      },
      {
        id: "ngs",
        slug: "ngs",
        title: "Secondary NGS analysis + clinically interpretable report",
        short:
          "From FASTQ/BAM to an annotated variant table and a clinically interpretable report with ACMG classification.",
        forWhom:
          "Small and new genetic laboratories without an in-house bioinformatician.",
        input: "FASTQ / BAM from WES or a targeted panel, clinical question, kit / panel.",
        process: [
          "Alignment",
          "Variant calling (GATK)",
          "Annotation (VEP / ANNOVAR)",
          "Filtering",
          "ACMG classification",
          "Prioritization",
        ],
        output: [
          "Annotated variant table",
          "Clinically interpretable report",
          "Reproducible pipeline",
        ],
        boundary:
          "What is performed is the technical bioinformatic analysis and classification — NOT a medical diagnosis. The final clinical interpretation remains the responsibility of the treating specialist / clinical geneticist.",
      },
      {
        id: "pipelines",
        slug: "pipelines",
        title: "Reproducible pipelines (Nextflow / Docker)",
        short:
          "I turn chaotic ad-hoc scripts into a documented, containerized workflow that holds up in front of a reviewer and an auditor.",
        forWhom:
          "Laboratories whose analysis depends on scattered ad-hoc scripts.",
        input: "Existing scripts, a description of the analysis, sample data.",
        process: [
          "Refactoring into Nextflow / Snakemake",
          "Containerization (Docker / Singularity)",
          "Documentation",
          "Test with sample data",
        ],
        output: [
          "Reproducible, documented, containerized workflow",
          "A result you can defend before a reviewer / auditor",
        ],
        boundary: null,
      },
    ],
    differentiator:
      "I deliver analysis you can reproduce and defend. That is where biology meets software.",
  },

  /* ---------------------------------------------------------------- PORTFOLIO */
  portfolio: {
    sectionEyebrow: "Portfolio",
    sectionTitle: "Proven work with complex biological data",
    teaserLead:
      "A selected case study that shows the ability to turn complex biological data into a reliable, reproducible analytical system.",
    cases: [
      {
        id: "gnn-breast-cancer",
        slug: "gnn-podtipove-rak-na-garda",
        tag: "Graph Neural Network · Genomics",
        title:
          "Classification of molecular breast-cancer subtypes with a Graph Neural Network",
        problem:
          "Classifying molecular breast-cancer subtypes from gene-expression data (~1000 patients), where the relationships between genes are networked rather than linear.",
        approach:
          "A Graph Neural Network (GATv2Conv) that models genes as a network of interactions (STRING PPI + TCGA), built on a reproducible pipeline.",
        result:
          "Classification of the molecular subtypes through a containerized, repeatable analysis.",
        why:
          "It proves the ability to take complex biological data and build reliable, reproducible analytical systems — the same skill applied to metagenomic or NGS analysis.",
        note: "Published with academic approval.",
      },
    ],
  },

  /* ---------------------------------------------------------------- TRUST / PILOT */
  trust: {
    sectionEyebrow: "Trust",
    sectionTitle: "Confidentiality and a free pilot analysis",
    privacy: {
      title: "Confidentiality and data security",
      lead: "Working with genetic and clinical data demands discipline. Therefore:",
      points: [
        "NDA on request",
        "Work in an isolated environment",
        "Data is not used to train AI models",
        "De-identification of sensitive data",
        "Compliance with GDPR / national data-protection law",
        "Deletion of raw data after delivery",
      ],
    },
    pilot: {
      title: "Free demonstration analysis",
      lead:
        "Before you commit — a free demonstration analysis on ONE defined batch of data.",
      limits: {
        title: "Scope",
        points: [
          "Metagenomics: up to 8–12 samples (16S OR ITS, one group)",
          "Or NGS: one WES case / reanalysis",
        ],
      },
      boundaries: {
        title: "Limits",
        points: [
          "One per client",
          "Fixed scope",
          "Turnaround up to 7 business days",
          "The result is real but condensed — the full report and pipeline come with the paid project",
          "Requires real data",
        ],
      },
    },
    pricing: {
      title: "Pricing",
      text:
        "Projects are scoped and priced individually. We start with a free initial consultation in which we clarify the goal, the data and the right service.",
    },
  },

  /* ---------------------------------------------------------------- CONTACT */
  contact: {
    sectionEyebrow: "Contact",
    sectionTitle: "Let’s start a conversation",
    lead:
      "Briefly describe what data you have and what question you want to answer. I’ll come back with concrete next steps. The initial consultation is free.",
    directTitle: "Direct contact",
    emailLabel: "Email",
    phoneLabel: "Phone",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@laboratory.com",
      org: "Organization",
      orgPlaceholder: "Laboratory / institute / group",
      serviceType: "Service type",
      serviceOptions: [
        "Metagenomic analysis (16S/ITS)",
        "Secondary NGS analysis",
        "Reproducible pipelines",
        "Other / not sure",
      ],
      message: "Message",
      messagePlaceholder:
        "Briefly describe the data (type, volume) and the question you want to answer…",
      submit: "Send inquiry",
      submitting: "Sending…",
      success:
        "Thank you! Your inquiry has been received. I’ll get back to you as soon as possible.",
      error:
        "Something went wrong while sending. Please try again or email us directly.",
      privacyNote: "The form data is used only to respond to your inquiry.",
    },
  },

  /* ---------------------------------------------------------------- FOOTER */
  footer: {
    tagline:
      "Bioinformatics consultant — reliable, reproducible results from NGS and omics data.",
    sections: "Navigation",
    contact: "Contact",
    rights: "All rights reserved.",
  },

  /* ---------------------------------------------------------------- ABOUT (/about) */
  about: {
    title: "About me",
    intro:
      "My name is Daniel Valkanov and I'm a bioinformatician. I work where biology meets software engineering. That lets me build analytical systems you can trust.",
    educationTitle: "Education and background",
    education: [
      "BSc in Bioinformatics (University of Plovdiv)",
      "MSc in Applied Molecular Biology",
      "Software Engineering (SoftUni)",
    ],
    approachTitle: "Approach",
    approach: [
      "I start from the question, not the tool — which biological question we are solving and what decision the result will inform.",
      "Every analysis is reproducible: containerized and documented, so it holds up before a reviewer or auditor.",
      "Transparency about limits — I say what the analysis can and cannot prove.",
      "Communication in plain language, without unnecessary jargon, with clear next steps.",
    ],
    privacyTitle: "Confidentiality",
    privacyLead:
      "Working with genetic and clinical data demands discipline and trust:",
    privacyPoints: [
      "NDA on request",
      "Work in an isolated environment",
      "Data is not used to train AI models",
      "De-identification of sensitive data",
      "Compliance with GDPR / national data-protection law",
      "Deletion of raw data after delivery",
    ],
  },

  /* ---------------------------------------------------------------- BLOG */
  blog: {
    title: "Blog",
    lead:
      "Practical notes on bioinformatics, metagenomics and reproducible analysis.",
    readingTime: "min read",
    posts: [
      {
        slug: "what-is-metagenomic-analysis",
        title: "What is metagenomic analysis and when do you need it",
        excerpt:
          "A short introduction to 16S/ITS metagenomic analysis — what it measures, when it fits your laboratory, and what to expect as a result.",
        date: "2026-06-14",
        dateDisplay: "June 14, 2026",
        readingTime: 6,
        keywords: [
          "metagenomics",
          "16S",
          "ITS",
          "bioinformatics",
          "sequencing",
        ],
        body: [
          {
            type: "p",
            text: "Metagenomic analysis lets you establish which microorganisms are present in a sample and in what proportion — without culturing any of them. This is especially valuable for agricultural, veterinary and food laboratories, as well as academic groups studying microbial communities.",
          },
          {
            type: "h2",
            text: "What 16S/ITS analysis actually measures",
          },
          {
            type: "p",
            text: "For bacteria, a conserved marker gene (16S rRNA) is sequenced; for fungi, the ITS region. From these markers a taxonomic profile is built: which genera and species are present and in what relative abundance. The result answers questions like “which taxa dominate” and “how do two groups of samples differ”.",
          },
          {
            type: "h2",
            text: "When metagenomics is the right choice",
          },
          {
            type: "list",
            items: [
              "You are comparing microbial composition between groups (e.g. treated vs. control samples).",
              "You are tracking changes over time or across locations.",
              "You need a methods text and figures ready for publication.",
              "You want a reproducible analysis that can be repeated on new data.",
            ],
          },
          {
            type: "h2",
            text: "What to expect as a result",
          },
          {
            type: "p",
            text: "A well-executed analysis delivers a taxonomic composition table, key diversity figures (alpha/beta), an assessment of differential abundance, and a reproducible, containerized workflow. That way your result stays defensible before a reviewer and repeatable on the next batch of data.",
          },
          {
            type: "h2",
            text: "Next step",
          },
          {
            type: "p",
            text: "If you are considering metagenomic analysis for your laboratory, start with a free initial consultation. Together we’ll clarify whether 16S/ITS is the right approach for your question and what data is needed.",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- UI / NAV / RAIL */
  ui: {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      blog: "Blog",
      contact: "Contact",
    },
    aboutEyebrow: "About",
    blogEyebrow: "Blog",
    serviceDetail: {
      input: "Input",
      process: "Process",
      output: "Output",
      forWhom: "For whom",
      boundary: "Important boundary",
    },
    serviceRail: {
      metagenomika: "Metagenomics",
      ngs: "NGS",
      pipelines: "Pipelines",
    },
    portfolioBlocks: {
      problem: "Problem",
      approach: "Approach",
      result: "Result",
      why: "Why it matters",
    },
    rail: {
      home: {
        nachalo: "Start",
        services: "Services",
        portfolio: "Portfolio",
        doverie: "Trust",
        contact: "Contact",
      },
      services: { pregled: "Overview", zayavka: "Request" },
      about: { profil: "Profile", podhod: "Approach", poveritelnost: "Confidentiality" },
      portfolio: { pregled: "Overview", case: "GNN" },
      contact: { kontakt: "Contact", zapitvane: "Inquiry" },
      blog: { blog: "Blog", statii: "Articles" },
    },
    language: {
      label: "Language",
      en: "English",
      bg: "Български",
    },
  },
};
