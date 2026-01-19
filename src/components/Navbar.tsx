"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const navItems = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 z-50 group">
                {/* Avatar */}
                <div className="relative">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-neutral-300/70 dark:ring-neutral-700/70 group-hover:ring-neutral-400 dark:group-hover:ring-neutral-500 transition">
                        <Image
                            src="/profile.png"
                            alt="Abdul Manan"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Online dot with wave (2.5) */}          
                    <span className="absolute bottom-[1px] right-[1px] flex h-[10px] w-[10px]">
                    {/* Ping ring (clear + faster) */}
                    <span className="absolute inset-0 rounded-full bg-emerald-500/80 animate-ping [animation-duration:1.1s]" />

                    {/* White outline */}
                    <span className="absolute inset-0 rounded-full ring-[1px] ring-white dark:ring-black" />

                    {/* Solid dot */}
                    <span className="relative h-[10px] w-[10px] rounded-full bg-emerald-500" />
                    </span>

                </div>

                {/* Brand text */}
                <div className="leading-tight">
                    <p className="text-sm font-bold tracking-tight uppercase">
                    Abdul Manan<span className="text-neutral-400">.dev</span>
                    </p>
                </div>
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
