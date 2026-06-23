import type { Metadata } from "next";
import { BlogView } from "@/views/BlogView";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("bg", "blog");

export default function Page() {
  return <BlogView />;
}
