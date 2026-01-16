import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
