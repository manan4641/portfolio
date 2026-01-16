import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio" },
};

export default function Page() {
  return <PortfolioClient />;
}
