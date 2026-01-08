"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    image?: string; // Placeholder for now
}

export const ProjectCard = ({ title, description, tags, link, github }: ProjectCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl transition-all hover:bg-white/10"
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="z-10 relative">
                <div className="mb-6 h-48 w-full rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-inner flex items-center justify-center overflow-hidden">
                    {/* Placeholder for Project Image */}
                    <div className="text-4xl font-bold opacity-20 text-white font-display uppercase tracking-widest">{title[0]}</div>
                </div>

                <h3 className="text-3xl font-bold text-white font-display mb-3">{title}</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="z-10 relative flex gap-4 mt-auto">
                {link && (
                    <Link href={link} className="flex-1">
                        <Button className="w-full bg-white text-black hover:bg-neutral-200" size="lg">
                            Visit Site <ExternalLink size={16} className="ml-2" />
                        </Button>
                    </Link>
                )}
                {github && (
                    <Link href={github}>
                        <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10 h-11 w-11">
                            <Github size={20} />
                        </Button>
                    </Link>
                )}
            </div>
        </motion.div>
    );
};
