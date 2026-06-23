import type { Metadata } from "next";
import { PortfolioView } from "@/views/PortfolioView";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en", "portfolio");

export default function Page() {
  return <PortfolioView />;
}
