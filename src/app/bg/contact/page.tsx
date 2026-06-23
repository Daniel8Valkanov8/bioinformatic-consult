import type { Metadata } from "next";
import { ContactView } from "@/views/ContactView";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("bg", "contact");

export default function Page() {
  return <ContactView />;
}
