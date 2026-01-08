"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/work" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tighter uppercase z-50">
                    Abdul Manan<span className="text-neutral-400">.dev</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium hover:text-neutral-500 transition-colors uppercase tracking-widest text-xs",
                                pathname === item.href && "text-black dark:text-white font-bold"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pl-4 border-l border-neutral-200 dark:border-neutral-800">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className="z-[102] w-10 h-10 flex flex-col justify-center items-center gap-1.5"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className={cn(
                            "w-8 h-0.5 bg-black dark:bg-white transition-all duration-300 transform",
                            isOpen ? "rotate-45 translate-y-2" : ""
                        )} />
                        <span className={cn(
                            "w-8 h-0.5 bg-black dark:bg-white transition-all duration-300 transform",
                            isOpen ? "-rotate-45" : ""
                        )} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={cn(
                    "fixed top-0 left-0 w-screen h-screen bg-white dark:bg-black z-[101] flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none invisible"
                )}>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-2xl font-bold tracking-tighter hover:text-neutral-500 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
