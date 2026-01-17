import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogClient />;
}
