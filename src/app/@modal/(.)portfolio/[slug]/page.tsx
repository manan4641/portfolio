import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import ProjectModal, { CloseBack } from "@/components/ProjectModal";
import { PROJECTS, getProject } from "@/data/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// Same metadata as the full page, so the tab title updates when the modal opens.
export { generateMetadata } from "../../../portfolio/[slug]/page";

export default function ProjectModalPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  return (
    <ProjectModal>
      <ProjectDetail p={p} close={<CloseBack />} headingLevel={2} />
    </ProjectModal>
  );
}
