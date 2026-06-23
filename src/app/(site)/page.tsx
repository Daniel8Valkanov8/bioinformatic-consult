import type { Metadata } from "next";
import { HomeView } from "@/views/HomeView";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en", "home");

export default function Page() {
  return <HomeView />;
}
