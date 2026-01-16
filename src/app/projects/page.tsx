import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
