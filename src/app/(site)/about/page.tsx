import type { Metadata } from "next";
import { AboutView } from "@/views/AboutView";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en", "about");

export default function Page() {
  return <AboutView />;
}
