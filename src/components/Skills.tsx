'use client';
import Marquee from '@/components/ui/marquee';
import { Badge } from '@/components/ui/badge';

const skills = [
    "CRM (GoHighLevel)", "Google Analytics", "React", "Tailwind CSS", "GraphQL", "WordPress", "PHP",
    "WooCommerce", "Framer Motion", "Three.js", "Docker", "Figma",
    "Jira", "HubSpot", "Zeplin", "Teamwork", "Asana"
];

export default function Skills() {
    return (
        <section className="py-12 md:py-24 border-b border-white/5 relative bg-background/50 backdrop-blur-md">
            <div className="container mx-auto px-6 mb-8 md:mb-12 text-center">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Powering The Web</p>
                <Marquee className="py-4 [--duration:30s]" repeat={3} pauseOnHover>
                    {skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="mx-1 md:mx-2 text-sm md:text-lg py-1 px-3 md:py-2 md:px-4 whitespace-nowrap">
                            {skill}
                        </Badge>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
