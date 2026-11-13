import type { Metadata } from "next";
import Link from "next/link";
import { SubNav } from "@/components/Nav";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="am-page">
      <SubNav />
      <main className="nf">
        <div className="eyebrow">404 — Page not found</div>
        <h1 className="si__h1">This page doesn&apos;t <span className="grad-text">exist.</span></h1>
        <p className="si__lead">The link may be old or mistyped. Everything is still on the home page.</p>
        <div className="sc__btns">
          <Link href="/" className="btn-primary">Back to home <span>→</span></Link>
          <Link href="/portfolio" className="btn-ghost">See all projects</Link>
        </div>
      </main>
    </div>
  );
}
