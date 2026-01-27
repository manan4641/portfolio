"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { X, Search, ArrowRight, File, Briefcase, Award, Package, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";

// Import all data sources
import { posts } from "@/data/posts";
import { products } from "@/data/products";
import { projects } from "@/data/resume";
import { services } from "@/data/services";

type SearchResult = {
    id: string;
    title: string;
    description: string;
    href: string;
    category: "Page" | "Project" | "Service" | "Award" | "Product" | "Blog";
};

const STATIC_PAGES: SearchResult[] = [
    { id: "1", title: "Services", description: "Check my web related services", href: "/services", category: "Page" },
    { id: "2", title: "About Me", description: "Learn more about my background and skills.", href: "/about", category: "Page" },
    { id: "3", title: "Portfolio", description: "Selected works and projects.", href: "/portfolio", category: "Page" },
    { id: "4", title: "Awards & Certifications", description: "My professional achievements.", href: "/awards", category: "Page" },
    { id: "5", title: "Allied Bank", description: "Real estate website development.", href: "https://abl.com/", category: "Project" },
    { id: "6", title: "Aura Furniture", description: "E-commerce furniture store.", href: "https://aurafurniture.ae/", category: "Project" },
    { id: "8", title: "Webp Converter Plugin", description: "Best Plugin for converting existing wordpress images to webp format.", href: "/products", category: "Products" },
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Build the unified search index
    const searchIndex = useMemo(() => {
        const results: SearchResult[] = [...STATIC_PAGES];

        // Add Projects
        projects.forEach((item, index) => {
            results.push({
                id: `project-${index}`,
                title: item.title,
                description: item.description,
                href: "/portfolio",
                category: "Project"
            });
        });

        // Add Services
        services.forEach((item, index) => {
            results.push({
                id: `service-${index}`,
                title: item.title,
                description: item.description,
                href: "/services",
                category: "Service"
            });
        });

        // Add Products
        products.forEach((item) => {
            results.push({
                id: `product-${item.id}`,
                title: item.title,
                description: item.description,
                href: "/products",
                category: "Product"
            });
        });

        // Add Blog Posts
        posts.forEach((item) => {
            results.push({
                id: `blog-${item.id}`,
                title: item.title,
                description: item.excerpt,
                href: `/blog/${item.slug}`,
                category: "Blog"
            });
        });

        return results;
    }, []);

    const results = useMemo(() => {
        if (!query.trim()) return searchIndex.slice(0, 8); // Return suggested items when empty

        const lowerQuery = query.toLowerCase();
        return searchIndex.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery)
        );
    }, [query, searchIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(contentRef.current,
                { y: 20, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
            );
        } else {
            document.body.style.overflow = "";
            setQuery(""); // Clear query when closing
        }
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const getIcon = (category: string) => {
        switch (category) {
            case "Project": return <Briefcase className="w-4 h-4" />;
            case "Award": return <Award className="w-4 h-4" />;
            case "Product": return <Package className="w-4 h-4" />;
            case "Blog": return <BookOpen className="w-4 h-4" />;
            case "Service": return <Briefcase className="w-4 h-4" />;
            default: return <File className="w-4 h-4" />;
        }
    };

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Header */}
                <div className="relative border-b border-neutral-200 dark:border-neutral-800">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search for pages, projects, blogs, or products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-16 pr-16 py-6 text-lg bg-transparent outline-none text-black dark:text-white placeholder:text-neutral-400"
                        autoFocus
                    />
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-neutral-500" />
                    </button>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                    {results.length > 0 ? (
                        <>
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-2">
                                {query ? `Found ${results.length} results` : "Suggested for you"}
                            </p>
                            <div className="space-y-1">
                                {results.map((result) => (
                                    <Link
                                        key={result.id}
                                        href={result.href}
                                        onClick={onClose}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all group"
                                    >
                                        <div className={cn(
                                            "w-9 h-9 rounded-lg flex items-center justify-center text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors",
                                            "bg-neutral-50 dark:bg-neutral-800 group-hover:bg-white dark:group-hover:bg-neutral-700 shadow-sm"
                                        )}>
                                            {getIcon(result.category)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {result.title}
                                                </h4>
                                                <span className="text-[10px] font-mono leading-none px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase">
                                                    {result.category}
                                                </span>
                                            </div>
                                            <p className="text-xs text-neutral-500 line-clamp-1">
                                                {result.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-neutral-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-neutral-300" />
                            </div>
                            <p className="text-neutral-500 font-medium">No results found for "{query}"</p>
                            <p className="text-sm text-neutral-400 mt-2">Try searching for "React", "SEO", or "Portfolio"</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 py-3 px-6 text-xs text-neutral-500 flex justify-between items-center border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-4">
                        <span><kbd className="font-sans border border-neutral-300 dark:border-neutral-700 px-1 py-0.5 rounded text-[10px] shadow-sm">ESC</kbd> to close</span>
                        <span><kbd className="font-sans border border-neutral-300 dark:border-neutral-700 px-1 py-0.5 rounded text-[10px] shadow-sm">Enter</kbd> to select</span>
                    </div>
                    <span>Global Search</span>
                </div>
            </div>
        </div>
    );
}
