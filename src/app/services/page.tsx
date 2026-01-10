"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Server, Layout, Code, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const categories = [
    { id: "web", name: "Web Development", icon: Code },
    { id: "design", name: "UI/UX Design", icon: Layout },
    { id: "seo", name: "SEO Optimization", icon: Search },
    { id: "support", name: "Support & Maintenance", icon: Server },
];

const pricingData = {
    web: [
        {
            title: "Landing Page",
            price: "$500",
            description: "Perfect for marketing campaigns or personal portfolios. High-converting and fast.",
            features: ["Custom One-Page Design", "Fast Development", "Mobile Responsive", "Basic SEO Setup", "Contact Form Integration"],
        },
        {
            title: "Corporate Website",
            price: "$1,500",
            description: "A complete multi-page website to establish your business presence online.",
            features: ["Up to 10 Pages", "CMS Integration (WordPress)", "Advanced Animations", "Performance Optimization", "Analytics Setup"],
            popular: true,
        },
        {
            title: "E-Commerce",
            price: "$3,000",
            description: "Full-scale online store with secure payments and inventory management.",
            features: ["WooCommerce or Shopify", "Payment Gateway Setup", "Product Management", "User Accounts", "Admin Dashboard Training"],
        },
    ],
    design: [
        {
            title: "Core Design",
            price: "$800",
            description: "Essential UI design for small projects or landing pages.",
            features: ["Home + 2 Inner Pages", "Figma Source File", "Mobile & Desktop Views", "basic Style Guide", "2 Revision Rounds"],
        },
        {
            title: "Full App/Web Design",
            price: "$2,000",
            description: "Complete design system and screens for complex web apps.",
            features: ["User Flow & Wireframing", "Interactive Prototypes", "Comprehensive Design System", "Developer Handoff", "Unlimited Revisions"],
            popular: true,
        },
        {
            title: "Brand Identity",
            price: "$600",
            description: "Stand out with a unique brand voice and visual identity.",
            features: ["Logo Design", "Typography & Color Palette", "Social Media Kits", "Brand Guidelines PDF", "Business Card Design"],
        },
    ],
    seo: [
        {
            title: "SEO Audit",
            price: "$399",
            description: "One-time deep dive into your site's health and rankings.",
            features: ["Technical SEO Analysis", "Keyword Opportunity Report", "Competitor Analysis", "Speed Optimization Tips", "Actionable Roadmap"],
        },
        {
            title: "Growth Starter",
            price: "$749/mo",
            description: "Monthly optimization to start climbing the search results.",
            features: ["Target top 10 Keywords", "On-Page Optimization", "2 Blog Posts/Month", "Monthly Performance Report", "Google My Business"],
        },
        {
            title: "Market Domination",
            price: "$1,500/mo",
            description: "Aggressive strategy for competitive markets.",
            features: ["Target top 30+ Keywords", "Technical SEO Maintenance", "4 Blog Posts/Month", "Backlink Strategy", "Dedicated Account Manager"],
            popular: true,
        },
    ],
    support: [
        {
            title: "Hosting & DNS",
            price: "$149",
            description: "One-time setup for your domain and server infrastructure.",
            features: ["Domain Connection", "SSL Certificate Setup", "Cloudflare Integration", "Professional Email Setup", "DNS Propagation Checks"],
        },
        {
            title: "Monthly Care",
            price: "$249/mo",
            description: "Peace of mind knowing your site is secure and up to date.",
            features: ["Weekly Backups", "Plugin/Core Updates", "Uptime Monitoring", "Security Scans", "1 Hour Content Edits"],
            popular: true,
        },
        {
            title: "Priority Ops",
            price: "$449/mo",
            description: "Dedicated DevOps and support for mission-critical sites.",
            features: ["Daily Backups", "24/7 Priority Support", "Performance Tuning", "Server Management", "Emergency Fixes Included"],
        },
    ],
};

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState("web");

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors">
            <Navbar />

            <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 uppercase"
                    >
                        Services & <span className="text-neutral-400">Plans</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-500 max-w-2xl mx-auto"
                    >
                        Transparent pricing for world-class design and development. Choose the package that fits your goals.
                    </motion.p>
                </div>

                {/* Mobile Scrollable Tabs */}
                <div className="flex justify-start md:justify-center overflow-x-auto pb-4 md:pb-12 gap-2 md:gap-4 mb-8 no-scrollbar touch-pan-x">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border",
                                activeTab === cat.id
                                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                                    : "bg-white dark:bg-neutral-900 text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white"
                            )}
                        >
                            <cat.icon size={16} />
                            {cat.name}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {pricingData[activeTab as keyof typeof pricingData].map((pkg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "relative p-8 rounded-2xl flex flex-col border transition-all duration-300",
                                    pkg.popular
                                        ? "bg-black text-white dark:bg-white dark:text-black shadow-2xl scale-[1.02] md:-mt-4 border-transparent z-10"
                                        : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                                )}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-0 right-0 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-widest">
                                        Best Value
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className={cn("text-xl font-bold mb-2", pkg.popular ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-500")}>
                                        {pkg.title}
                                    </h3>
                                    <div className="text-4xl font-black mb-4 tracking-tight">{pkg.price}</div>
                                    <p className={cn("text-sm leading-relaxed", pkg.popular ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-500")}>
                                        {pkg.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-medium">
                                            <Check className={cn("w-5 h-5 flex-shrink-0", pkg.popular ? "text-white dark:text-black" : "text-black dark:text-white")} />
                                            <span className={pkg.popular ? "text-neutral-200 dark:text-neutral-800" : "text-neutral-600 dark:text-neutral-300"}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={`/contact?service=${encodeURIComponent(pkg.title)}`}>
                                    <Button
                                        className={cn(
                                            "w-full h-12 rounded-full font-bold uppercase tracking-wide transition-all",
                                            pkg.popular
                                                ? "bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800"
                                                : "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                                        )}
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>

            <Footer />
        </main>
    );
}
