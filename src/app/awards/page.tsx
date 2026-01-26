import type { Metadata } from "next";
import AwardsClient from "./AwardsClient";

export const metadata: Metadata = {
    title: "Awards & Certifications | Abdul Manan",
    description: "A collection of my professional certifications and awards.",
    alternates: { canonical: "/awards" },
};

export default function Page() {
    return <AwardsClient />;
}
