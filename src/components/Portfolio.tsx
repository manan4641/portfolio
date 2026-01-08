"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        name: "Aegis Real Estate",
        category: "Real Estate Portal",
        year: "2025",
        link: "https://aegisrealestate.ae/",
        description: "Full-scale real estate platform with advanced search, filters, and custom CMS structure for Dubai market.",
    },
    {
        name: "Eventuri",
        category: "Automotive E-commerce",
        year: "2025",
        link: "https://www.eventuri.net",
        description: "High-performance automotive brand site with global dealer locator and custom product filtering.",
    },
    {
        name: "Anosh Foundation",
        category: "Non-Profit Organization",
        year: "2025",
        link: "https://anoshfoundation.com/",
        description: "Humanitarian foundation website with scalable content structure for easy management and donation optimization.",
    },
    {
        name: "Sunnah Charity",
        category: "WooCommerce Charity",
        year: "2024",
        link: "https://sunnah.org.uk/",
        description: "Custom WooCommerce charity platform handling complex donation flows and theme customization.",
    },
    {
        name: "Allied Bank",
        category: "Corporate Finance",
        year: "2022",
        link: "https://www.abl.com/",
        description: "Enterprise-level maintenance and revamp for one of Pakistan's largest banks, ensuring security and uptime.",
    },
];

export default function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal scroll effect or just stagger list
            gsap.from(".project-item", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="portfolio" ref={containerRef} className="py-32 px-6 md:px-12 bg-white dark:bg-black text-black dark:text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-neutral-200 dark:border-neutral-800 pb-8">
                    <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase">Selected<br />Work</h2>
                    <p className="text-right text-sm font-mono mt-4 md:mt-0">(2022 — 2025)</p>
                </div>

                <div className="flex flex-col">
                    {projects.map((project, idx) => (
                        <Link
                            key={idx}
                            href={project.link}
                            target="_blank"
                            className="project-item group block border-b border-neutral-200 dark:border-neutral-800 py-12 transition-all hover:px-4"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                                <h3 className="text-3xl md:text-5xl font-bold tracking-tight group-hover:text-neutral-500 transition-colors">
                                    {project.name}
                                </h3>
                                <div className="flex items-center gap-8 text-sm md:text-base font-medium text-neutral-500">
                                    <span>{project.category}</span>
                                    <span className="hidden md:inline-block">{project.year}</span>
                                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <p className="mt-4 text-neutral-400 max-w-xl opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 overflow-hidden">
                                {project.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
