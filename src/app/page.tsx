import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PortfolioTeaser } from "@/components/home/PortfolioTeaser";
import { TrustSection } from "@/components/home/TrustSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PortfolioTeaser />
      <TrustSection />
      <ContactSection />
    </>
  );
}
