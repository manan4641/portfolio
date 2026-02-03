"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Award, FileText, ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const awards = [
    {
        title: 'Senior WordPress Developer Certified by micro1',
        issuer: 'micro1',
        date: '2025',
        description: 'Successfully passed micro1 AI Interview and officially recognized as a Senior WordPress Developer.',
        image: '/awards/micro1Certificate.jpg', // Placeholder path
        type: 'Certification',
        verificationLink: 'https://drive.google.com/file/d/1PxPRrwDkN2_MW_bMSQQJkdYFL8dMe5za/view?usp=drive_link'
    },
    {
        title: 'High Achiever Award',
        issuer: 'Noxlumyn',
        date: '2025',
        description: 'I was honored with the High Achiever Award by Noxlumyn in recognition of my outstanding performance and contributions.',
        image: '/awards/High-Achiver-Award.jpeg', // Placeholder path
        type: 'Award',
        verificationLink: 'https://drive.google.com/file/d/1CCJyS3srLcAVPSywP5T5npZmz-g5GV1K/view?usp=sharing'
    },
    {
        title: 'Consistent Performace Award',
        issuer: 'Noxlumyn',
        date: '2025',
        description: 'I was honored with the Consistent Performace Award by Noxlumyn in recognition of my consistency in performance.',
        image: '/awards/High-Achiver-Award.jpeg', // Placeholder path
        type: 'Award',
        verificationLink: 'https://www.linkedin.com/posts/abdulmanan-dev_grateful-for-the-recognition-it-really-activity-7364222819863277570-NuCC?utm_source=share&utm_medium=member_desktop&rcm=ACoAACL3o_sBtkkYRrkB-eG7j8c3Fl7t0gwhVlc'
    },
    {
        title: 'Employee of the Month',
        issuer: 'Noxlumyn',
        date: '2025',
        description: 'I was honored with the Employee of the month Award by Noxlumyn in recognition of hardwork and determination.',
        image: '', // Placeholder path
        type: 'Award',
        verificationLink: 'https://drive.google.com/file/d/1zNizgm7MFvCNSoZwfmMdBG2lJtAkpYUP/view?usp=sharing'
    },
    {
        title: 'The Ultimate Blueprint for WordPress Course',
        issuer: 'Alison',
        date: '2024',
        description: 'I completed the course in WordPress Development Training (Plugins, Performance, SEO)',
        image: '', // Placeholder path
        type: 'Certification',
        verificationLink: 'https://alison.com/certification/check/3a05093b3f'
    },
    {
        title: 'WordPress with Docker Training',
        issuer: 'Great Learning',
        date: '2024',
        description: 'I completed Completed a course on installing and managing WordPress using Docker, offered by Great Learning Academy.',
        image: '', // Placeholder path
        type: 'Certification',
        verificationLink: 'https://www.mygreatlearning.com/certificate/RUDSGQPI'
    },
    {
        title: 'Programming in HTML5 and CSS3',
        issuer: 'PIRPLE',
        date: '2022',
        description: 'I completed Completed a course on installing and managing WordPress using Docker, offered by Great Learning Academy.',
        image: '', // Placeholder path
        type: 'Certification',
        verificationLink: 'https://www.pirple.com/certificates/89c9w68w8h'
    },
    {
        title: 'Web & Graphic Design Cousre',
        issuer: 'NTB Islamabad',
        date: '2017',
        description: 'I sucessfully completed the 3 months Web & Graphic Design course by Technical Training Center (NTB Islamabad).',
        image: '', // Placeholder path
        type: 'Certification',
        verificationLink: 'https://drive.google.com/file/d/1utfaY-cTVwqtJhzTfKNcOvVS56YUES1l/view'
    },

];

export default function AwardsClient() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".award-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
            <Navbar />

            <section ref={containerRef} className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-24 border-b border-neutral-200 dark:border-neutral-800 pb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[1.25] md:leading-none
    tracking-tight text-center md:text-left">
                        Awards &<br /><span className="text-neutral-400"> Certifications </span>
                    </h1>
                    <p className="text-center md:text-right text-lg font-mono mt-6 md:mt-0 text-neutral-500">
                        (Recognition & Credentials)
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {awards.map((item, idx) => (
                        <div key={idx} className="award-card group p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors bg-neutral-50 dark:bg-neutral-900/50 flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-white dark:bg-black rounded-xl border border-neutral-200 dark:border-neutral-800">
                                    {item.type === 'Award' ? (
                                        <Award className="w-8 h-8 text-amber-500" />
                                    ) : (
                                        <FileText className="w-8 h-8 text-blue-500" />
                                    )}
                                </div>
                                <span className="font-mono text-sm text-neutral-500">{item.date}</span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="font-medium text-neutral-500 mb-4">{item.issuer}</p>

                            <p className="text-neutral-600 md:text-lg dark:text-neutral-400 mb-8 leading-relaxed flex-grow">
                                {item.description}
                            </p>

                            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                                    <CheckCircle2 className="w-5 h-5 fill-emerald-100 dark:fill-emerald-900/30" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Verified Achievement</span>
                                </div>

                                <Button asChild variant="outline" className="rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                                    <Link href={item.verificationLink} target="_blank">
                                        Verify <ArrowUpRight className="ml-2 w-3 h-3" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
