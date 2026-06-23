"use client";

import { DeckShell } from "@/components/DeckShell";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PortfolioTeaser } from "@/components/home/PortfolioTeaser";
import { TrustSection } from "@/components/home/TrustSection";
import { ContactSection } from "@/components/home/ContactSection";
import { useDict } from "@/content/LocaleProvider";

/** Началната страница — хоризонтален дек с 5 секции (език-агностичен, текст от контекста). */
export function HomeView() {
  const rail = useDict().ui.rail.home;
  const slides = [
    { id: "nachalo", label: rail.nachalo },
    { id: "services", label: rail.services },
    { id: "portfolio", label: rail.portfolio },
    { id: "doverie", label: rail.doverie },
    { id: "contact", label: rail.contact },
  ];
  return (
    <DeckShell slides={slides}>
      <Hero />
      <ServicesSection />
      <PortfolioTeaser />
      <TrustSection />
      <ContactSection />
    </DeckShell>
  );
}
