import type { Metadata } from "next";
import { ServicesView } from "@/views/ServicesView";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en", "services");

export default function Page() {
  return <ServicesView />;
}
