"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentModal from "./PaymentModal";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Web Development",
        description: "Custom, high-performance websites built with modern technologies. From WordPress to React, delivering scalable solutions tailored to your business needs.",
        price: "$1,200",
        features: ["Custom Development", "WordPress & Webflow", "Responsive Design", "Performance Optimization"],
    },
    {
        title: "SEO Optimization",
        description: "Boost your search rankings with comprehensive SEO strategies. Technical SEO, on-page optimization, and performance tuning to drive organic traffic.",
        price: "$600",
        features: ["Technical SEO Audit", "Core Web Vitals", "Schema Markup", "Speed Optimization"],
    },
    {
        title: "Website Design",
        description: "Stunning, user-focused designs that convert. Creating beautiful interfaces with Figma, ensuring seamless user experiences across all devices.",
        price: "$800",
        features: ["UI/UX Design", "Figma Prototypes", "Brand Consistency", "Mobile-First Approach"],
    },
    {
        title: "Branding & Strategy",
        description: "Build a memorable brand identity that resonates. From logo design to comprehensive brand guidelines and digital presence strategy.",
        price: "$500",
        features: ["Brand Identity", "Logo Design", "Style Guide", "Digital Strategy"],
    },
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".service-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={containerRef} className="py-32 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-900 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Services</h2>
                    <p className="text-xl text-neutral-500 max-w-2xl">
                        Premium technical solutions for ambitious brands. Scalable, secure, and fast.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="service-card group relative bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between hover:border-black dark:hover:border-white transition-colors duration-300"
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-neutral-500 mb-8 h-20">{service.description}</p>
                                <div className="text-3xl font-bold mb-8">{service.price}</div>

                                <ul className="mb-8 space-y-3">
                                    {service.features.map((feature, fIdx) => (
                                        <li key={feature} className="flex items-center text-sm font-medium">
                                            <Check size={16} className="mr-2 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <PaymentModal
                                serviceName={service.title}
                                price={service.price}
                                trigger={
                                    <Button className="w-full group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                                        Get Started <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
