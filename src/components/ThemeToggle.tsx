'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-10 h-10 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative"
                aria-label="Toggle Theme"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute text-black dark:text-white" />
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute text-black dark:text-white" />
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-lg py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {[
                        { name: 'Light', value: 'light', icon: Sun },
                        { name: 'Dark', value: 'dark', icon: Moon },
                        { name: 'System', value: 'system', icon: Monitor },
                    ].map((item) => (
                        <button
                            key={item.value}
                            onClick={() => {
                                setTheme(item.value);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900",
                                theme === item.value ? "text-primary" : "text-neutral-600 dark:text-neutral-400"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                            {theme === item.value && (
                                <Check className="ml-auto h-3 w-3" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
