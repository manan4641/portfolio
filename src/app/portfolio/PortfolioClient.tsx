"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Data from resume.ts
const projects = [

    {
        title: 'Aura Furniture',
        period: 'June 2025 - Nov 2025',
        description: 'Developed a premium online ecommerce furniture store for a Dubai-based client, including custom UI implementation, responsive design,& CMS-based structure.',
        skills: ['E-commerce', 'Web Design', 'Development'],
        link: 'https://aurafurniture.ae/',
        image: '/projects/aura-furniture.webp',
        gradient: "from-amber-900 to-orange-900"
    },
    {
        title: 'Anosh Foundation',
        period: 'Mar 2025 - Apr 2025',
        description: 'Global NGO platform with scalable structure for events, & donations. Delivered end-to-end WordPress development for a humanitarian foundation website, including CMS setup, page architecture, and front-end implementation.',
        skills: ['Wordpress', 'NGO', 'CMS'],
        link: 'https://anoshfoundation.com/',
        image: '/projects/anosh-foundation.webp',
        gradient: "from-teal-900 to-cyan-900"
    },
    {
        title: 'Mashnavision',
        period: 'May 2025 - October 2025',
        description: 'Designed and developed a high-end automotive website for MashnaVision (A client in Netherlands), combining bold visuals, smooth UX, and a premium brand-focused layout.',
        skills: ['Wordpress', 'NGO', 'CMS'],
        link: 'https://autobedrijfmashnavision.nl/',
        image: '/projects/Mashanvision.webp',
        gradient: "from-teal-900 to-cyan-900"
    },
    {
        title: 'Kuchenmeister',
        period: 'Feb 2025 - Mar 2025',
        description: 'Luxury modern kitchen design website showcasing premium collections and bespoke interior solutions.',
        skills: ['Wordpress', 'Interior Design', 'Luxury'],
        link: 'https://kuchenmeister.co.uk',
        image: '/projects/kuchenmeister.webp',
        gradient: "from-neutral-900 to-stone-800"
    },
    {
        title: 'One Click Digital',
        period: 'Feb 2025 - Present',
        description: 'Ongoing maintenance, design customization, and development for a digital agency platform.',
        skills: ['Wordpress', 'Maintenance', 'Design'],
        link: 'https://oneclickdigital.net.au',
        image: '/projects/one-click-digital.webp',
        gradient: "from-violet-900 to-purple-900"
    },
    {
        title: 'Creoforma',
        period: 'Jan 2025 - Present',
        description: 'Global leader in digital innovation. Empowering businesses with user-centric digital solutions and strategic insights.',
        skills: ['Digital Agency', 'Innovation', 'Growth'],
        link: 'https://creoforma.co.uk',
        image: '/projects/creoforma.webp',
        gradient: "from-cyan-950 to-blue-950"
    },
    {
        title: 'Eventuri',
        period: '2025',
        description: 'High-performance automotive brand site with global dealer locator and custom product filtering.',
        skills: ['Automotive', 'E-commerce', 'Performance'],
        link: 'https://eventuri.net',
        image: '/projects/eventuri.jpeg',
        gradient: "from-red-900 to-black"
    },
    {
        title: 'The Tiles Outlet',
        period: 'Dec 2024 - Mar 2025',
        description: 'Online e-commerce store for luxury tiles for every home and bathroom. Seamless product browsing.',
        skills: ['E-commerce', 'Retail', 'Design'],
        link: 'https://thetilesoutlet.com',
        image: '/projects/tiles-outlet.webp',
        gradient: "from-emerald-900 to-teal-900"
    },
    {
        title: 'Ace Infrastructure',
        period: 'Nov 2024 - Feb 2025',
        description: 'Specialized engineering and consultancy for railway/civil projects. Success for Tier 1 & Tier 2 suppliers.',
        skills: ['Engineering', 'Corporate', 'Consultancy'],
        link: 'https://aceinfrastructure.co.uk',
        image: '/projects/ace-infrastructure.webp',
        gradient: "from-slate-900 to-gray-800"
    },
    {
        title: 'Twin Group',
        period: 'Nov 2024 - Dec 2024',
        description: 'Your trusted partner for all your electrical and plumbing needs. Delivering reliable maintenance and installation services.',
        skills: ['Wordpress', 'Services', 'Maintenance'],
        link: 'https://twingroup.uk',
        image: '/projects/twin-group.webp',
        gradient: "from-blue-950 to-indigo-950"
    },
    {
        title: 'Sunnah Charity',
        period: 'May 2024 - Dec 2024',
        description: 'Led development of a WooCommerce charity website. Theme customization and custom development.',
        skills: ['PHP', 'Wordpress', 'jQuery', 'HTML5', 'CSS3'],
        link: 'https://sunnah.org.uk/',
        image: '/projects/sunnah-charity.webp',
        gradient: "from-green-900 to-emerald-900"
    },
    {
        title: 'Starwall Website',
        period: 'Nov 2023 - Jan 2024',
        description: 'Dynamic website for employee recognition. Custom theme development using WordPress Functions and Bootstrap.',
        skills: ['Wordpress', 'Bootstrap', 'ACF'],
        link: 'https://mystarwall.com/home',
        image: '/projects/starwall.webp',
        gradient: "from-purple-900 to-indigo-900"
    },
    {
        title: 'You Convey',
        period: 'Sept 2022 - Mar 2023',
        description: 'Application website helping Home Movers aimed at reducing moving times by up to 8 weeks via smart tech.',
        skills: ['Web App', 'Real Estate', 'Tech'],
        link: 'https://you-convey.co.uk',
        image: '/projects/you-convey.webp',
        gradient: "from-pink-900 to-fuchsia-900"
    },
    {
        title: 'Allied Bank',
        period: '2019 - 2022',
        description: 'Enterprise-level maintenance and revamp for one of Pakistan\'s largest banks, ensuring security and uptime.',
        skills: ['PHP', 'Security', 'Enterprise'],
        link: 'https://www.abl.com/',
        image: '/projects/allied-bank.webp',
        gradient: "from-slate-800 to-gray-900"
    },
    {
        title: 'Mipj Store',
        period: 'Jun 2021 - Aug 2021',
        description: 'Marketplace development with WooCommerce integrations.',
        skills: ['Wordpress', 'WooCommerce', 'CSS3'],
        link: 'https://mipjstore.com/',
        image: '/projects/mipj-store.webp',
        gradient: "from-orange-900 to-red-900"
    },
    {
        title: 'Mobily Pay',
        period: 'Feb 2021 - Aug 2021',
        description: 'Dedicated WordPress site for the Mobily App of Saudi Arabia, focusing on telecommunication services.',
        skills: ['Wordpress', 'Telecom', 'Corporate'],
        link: 'https://mobilypay.sa',
        image: '/projects/mobily-pay.webp',
        gradient: "from-blue-800 to-cyan-900"
    },
    {
        title: 'Petro-Tec',
        period: '2021',
        description: 'Diversified Oilfield supply company providing a complete range of equipments, parts, and professional services.',
        skills: ['Wordpress', 'Corporate', 'Industrial'],
        link: 'https://petrotec.com.pk',
        image: '/projects/petro-tec.webp',
        gradient: "from-stone-900 to-neutral-900"
    },
    {
        title: 'Golf Connections',
        period: 'Feb 2020 - Aug 2020',
        description: 'Comprehensive audit and full-stack WordPress maintenance for a Danish client. Oversaw frontend/backend.',
        skills: ['Wordpress', 'Auditing', 'Full Stack'],
        link: 'https://www.golfconnections.dk/',
        image: '/projects/golf-connections.webp',
        gradient: "from-emerald-800 to-green-900"
    },
    {
        title: 'Clover Homes',
        period: 'April 2025 - Present',
        description: 'I managed a construction-related website for an Australian client as a dedicated WordPress Developer at One Click Digital, handling both front-end and back-end development along with ongoing website maintenance.',
        skills: ['Wordpress', 'Real Estate', 'Design'],
        link: 'https://cloverhomes.com.au/',
        image: '/projects/clover-homes.webp',
        gradient: "from-amber-900 to-orange-900"
    },
    {
        title: 'Gengear Generators',
        period: 'Dec 2025 - Feb 2026',
        description: 'Successfully built a power management website for an Australian client while working as a dedicated WordPress Developer at One Click Digital. Designed website in Figma and handling both front-end and back-end development along with DNS/Hosting',
        skills: ['Wordpress', 'Real Estate', 'Design'],
        link: 'https://gengear.com.au/',
        image: '/projects/gengear.webp',
        gradient: "from-amber-900 to-orange-900"
    },
    {
        title: 'Coys Constructions',
        period: 'Apr 2025 - Present',
        description: 'I managed a construction and home building website for an Australian client as a dedicated WordPress Developer at One Click Digital, handling both front-end and back-end development along with ongoing website maintenance.',
        skills: ['Wordpress', 'Construction', 'Design'],
        link: 'https://coysconstructions.com.au',
        image: '/projects/coys-constructions.webp',
        gradient: "from-gray-900 to-slate-800"
    },
];

export default function WorkPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".project-card", {
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
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 border-b border-neutral-200 dark:border-neutral-800 pb-12">
                    <h1 className="text-6xl md:text-7xl font-black uppercase leading-none text-center md:text-left">
                        Selected<br /><span className="text-neutral-400"> Work </span>
                    </h1>
                    <p className="text-center md:text-right text-lg font-mono mt-6 md:mt-0 text-neutral-500">
                        (2019 — Present)
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, idx) => (
                        <div key={idx} className="project-card group">
                            <Link
                                href={project.link}
                                target="_blank"
                                className="block space-y-6"
                            >
                                {/* Project Image or Gradient Fallback */}
                                {project.image ? (
                                    <div className="w-full aspect-[3/2] rounded-2xl relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] mb-4">
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} website screenshot`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors z-10" />
                                        <div className="absolute bottom-8 left-8 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
                                                Visit Site <ArrowUpRight className="inline-block ml-1 h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-end relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}>
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                                        <div className="relative z-10 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
                                                Visit Site <ArrowUpRight className="inline-block ml-1 h-3 w-3" />
                                            </span>
                                        </div>
                                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                                    </div>
                                )}
                                </Link>
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                                        <span className="font-mono text-sm text-neutral-500">{project.period}</span>
                                    </div>
                                    <p className="text-neutral-500 text-lg mb-4 line-clamp-4 group-hover:text-black dark:group-hover:text-neutral-300 transition-colors">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-full text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            
                        </div>
                    ))}
                </div>
                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="mt-14 md:mt-20 mb-4 rounded-2xl border border-border bg-neutral-50 dark:bg-neutral-900 p-6 md:p-10"
                    >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl">
                        <h3 className="text-2xl md:text-3xl text-center md:text-left font-black text-foreground dark:text-neutral-200">
                            Get Started With Brand Digital Support
                        </h3>
                        <p className="mt-2 text-muted-foreground text-center md:text-left leading-relaxed dark:text-neutral-400">
                        From web development to SEO, performance monitoring, and DNS/Hosting, let’s connect and I’ll send a quick plan.
                        </p>
                        </div>

                        <div className="flex flex-col items-center md:items-start sm:flex-row justify-center md:justify-start gap-3">
                        <Link href="/services">
                            <Button className="rounded-full px-6 py-6 font-black dark:text-neutral-200 bg-black hover:opacity-90 transition-opacity dark:hover:bg-neutral-300 dark:hover:text-neutral-800">
                            View Services
                            </Button>
                        </Link>

                        <Link href="/contact">
                            <Button variant="outline" className="rounded-full bg-zinc-100 px-6 py-6 font-black dark:text-neutral-800 transition-opacity hover:opacity-80 dark:bg-neutral-300 dark:hover:text-neutral-900  dark:hover:opacity-80">
                             Get a Free Quote
                            </Button>
                        </Link>
                        </div>
                    </div>
                </motion.section>

            </section>  

            <Footer />
        </main>
    );
}
