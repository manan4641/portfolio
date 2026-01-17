import type { Metadata } from "next";
import PostClient from "./PostClient";

export function generateMetadata(
    { params }: { params: { slug: string } }
  ): Metadata {
    return {
      alternates: {
        canonical: `/blog/${params.slug}`,
      },
    };
  }
  
  export default function Page({ params }: { params: { slug: string } }) {
    return <PostClient slug={params.slug} />;
  }