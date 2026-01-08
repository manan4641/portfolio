"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        console.log("Hero: Mounting and starting animation");
        const ctx = gsap.context(() => {
            const lines = document.querySelectorAll(".hero-line");
            console.log("Hero: Found lines", lines.length);

            // Force initial state for Safari
            gsap.set(".hero-line", {
                y: 50,
                opacity: 0,
                force3D: true,
                transformStyle: "preserve-3d"
            });

            // Set initial state for subtitle
            gsap.set(subRef.current, {
                y: 20,
                opacity: 0,
                force3D: true
            });

            const tl = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                    force3D: true
                },
                delay: 0.2,
                onStart: () => console.log("Hero: Animation started"),
                onComplete: () => console.log("Hero: Animation completed"),
                onUpdate: function () {

                },
                onError: (e: any) => console.error("Hero: Animation error", e)
            });

            tl.to(".hero-line", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                force3D: true,
                transformPerspective: 1000,
                clearProps: "all"
            })
                .to(subRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    force3D: true,
                    clearProps: "all"
                }, "-=0.4");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-[100dvh] md:h-screen w-full flex flex-col justify-start md:justify-center px-6 md:px-12 pt-32 md:pt-16 pb-0 relative overflow-hidden bg-white dark:bg-black text-black dark:text-white">
            <div className="max-w-7xl w-full mx-auto">


                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                    <h1 ref={textRef} className="text-5xl md:text-[8vw] leading-[0.9] font-black tracking-tighter uppercase dark:text-white text-black shrink-0 md:mt-0">
                        <div className="py-2"><span className="hero-line block" style={{ transform: 'translate3d(0,0,0)', opacity: 0 }}>Senior</span></div>
                        <div className="py-2"><span className="hero-line block" style={{ transform: 'translate3d(0,0,0)', opacity: 0 }}>Website</span></div>
                        <div className="py-2"><span className="hero-line block text-neutral-400" style={{ transform: 'translate3d(0,0,0)', opacity: 0 }}>Developer</span></div>
                    </h1>

                    {/* Profile Picture Next to Text */}
                    <div className="hidden md:block relative w-64 h-64 lg:w-80 lg:h-80 shrink-0 overflow-hidden rounded-full border-4 border-neutral-200 dark:border-neutral-800 grayscale hover:grayscale-0 transition-all duration-500">
                        <Image
                            src="/pfp.jpeg"
                            alt="Abdul Manan - Senior Website Developer"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Mobile Profile Pic (below text) */}
                <div className="md:hidden w-full flex justify-center my-8">
                    <div className="relative w-48 h-48 shrink-0 overflow-hidden rounded-full border-4 border-neutral-200 dark:border-neutral-800 grayscale hover:grayscale-0 transition-all duration-500">
                        <Image
                            src="/pfp.jpeg"
                            alt="Abdul Manan - Experienced WordPress Developer"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                    <p ref={subRef} className="max-w-4xl text-base md:text-lg font-light text-neutral-600 dark:text-neutral-400 mb-8 md:mb-0 leading-relaxed" style={{ transform: 'translate3d(0,0,0)', opacity: 0 }}>
                        Senior Web Developer/ Web Support Engineer with 7+ years of experience building, maintaining, and optimizing websites for corporate and international clients. I specialize in WordPress development, Webflow CMS maintenance, performance optimization, security, migrations, and domain/DNS management, delivering stable, high-performing websites in fast-paced environments.
                    </p>
                    {/* Removed Profile Picture from Bottom */}

                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="hidden md:flex items-center gap-2 animate-bounce hover:opacity-70 transition-opacity"
                    >
                        <span className="uppercase text-xs tracking-widest">Scroll</span>
                        <ArrowDownRight size={16} />
                    </button>
                </div>
            </div>

            {/* Abstract Background Element */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-neutral-50 to-transparent dark:from-neutral-900 pointer-events-none -z-10" />
        </section>
    );
}
