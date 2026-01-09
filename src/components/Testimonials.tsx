"use client";

import { Play, Linkedin, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Marquee from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const testimonials = [


    {
        text: "Over the past three years I have had the pleasure of working with Manan on a series of marketing initiatives for early-mid stage tech startups. Manan is a fantastic front end developer with a skill set that enables him to be involved with and guide solutions for web, data and comms projects using platforms including Wordpress, Hubspot, Webflow and Mailchimp as well as in React and Jquery. A great collaborator who is keen to work with multi-disciplined teams, friendly, approachable - never without his smile - always looking to ask questions for the greater good as part of his search for quality solutions. A great asset to any team.",
        author: "Martin Gordon",
        role: "Experience Design Leader | Human Centered Principles | UX Consultant",
    },
    {
        text: "I've worked with Manan to deliver multiple sites and updates on Wordpress and Webflow over the past year or so. All have been completed without any fuss, he is a pleasure to work with.",
        author: "Oliver McAinsh",
        role: "UX Designer & Freelance Illustrator",
    },
    {
        text: "Manan is one of the best web developers I’ve ever had the pleasure of working with. He always delivers on time and exactly to brief. He’s extremely knowledgable and is a real talented developer. Would highly recommend!",
        author: "Sarah S.",
        role: "Marketing & Communications Professional",
    },
    {
        text: "I worked with Manan on the development of a few projects and he was outstanding in how he could execute them flawlessly. His countless strengths, such as on-time delivery and communication make him the perfect man for his next role.",
        author: "Simone Terranova",
        role: "Digital Product Designer",
    },
    {
        text: "Manan is a first class web developer able to work across a multitude of platforms, for us it was namely Wordpress and Hubspot but I know that's underselling his full repertoire of skills. Able to work independently, communicate well, and overall consistently deliver very high standard web projects on time and spec - which has been a godsend to the team! Wouldn't hesitate to recommend him, he'd be an asset to any team.",
        author: "Paul Dodd",
        role: "Fractional Head of Marketing",
    },
    {
        text: "I have worked with Manan directly and to be honest he is a gem. The way he handles pressure is amazing and has great knowledge of javascript and solves complex issues in no time. He is excellent in Wordpress and Hubspot. With not a single doubt I can rate him 5 stars and recommend him for any organisation looking for such a talented developer.",
        author: "Muzzammil Haroon",
        role: "Digital Marketing Specialist ",
    },
    {
        text: "I was impressed by Abdul's ability to deal with multiple projects – effortlessly. He is hardworking and is keen to learn and adapt latest trends and technology.",
        author: "Nauman Idrees",
        role: "Agile Delivery Manager @ Etisalat UAE",
    }
];

export default function Testimonials() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReversed, setIsReversed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        console.log("Testimonials mounted");
    }, []);

    const togglePlay = () => {
        console.log("Testimonials: Toggle play, videoRef exists:", !!videoRef.current);
        if (videoRef.current) {
            if (isPlaying) {
                console.log("Testimonials: Pausing video");
                videoRef.current.pause();
            } else {
                console.log("Testimonials: Playing video");
                videoRef.current.play().catch(e => console.error("Testimonials: Play error", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section id="testimonials" className="py-12 md:py-20 px-6 md:px-12 bg-white dark:bg-black text-black dark:text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-8 text-center md:text-left">
                    Testimonials
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Video Testimonial */}
                    <div className="sticky top-24">
                        <div className="relative aspect-[9/16] md:aspect-video w-full max-w-[280px] md:max-w-none mx-auto bg-neutral-200 dark:bg-neutral-800 rounded-2xl overflow-hidden group">
                            <video
                                ref={videoRef}
                                src="/testimonial.mp4"
                                preload="auto"
                                muted
                                className="w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-500"
                                onClick={togglePlay}
                                playsInline
                            />

                            {!isPlaying && (
                                <button
                                    onClick={togglePlay}
                                    className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors"
                                >
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform cursor-pointer">
                                        <Play className="fill-white text-white ml-2" size={32} />
                                    </div>
                                </button>
                            )}

                            <div className="absolute bottom-6 left-6">
                                <p className="font-bold text-lg text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Robby Choucair</p>
                                <p className="text-sm text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Director of Marketing at One Click Digital</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Testimonials */}
                    <div className="space-y-6 flex flex-col h-full lg:pt-0">
                        <div className="flex justify-end gap-2 mb-2 translate-x-2">
                            <button
                                onClick={() => setIsReversed(false)}
                                className={`p-2 rounded-full border transition-all ${!isReversed ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'}`}
                                aria-label="Scroll Up"
                            >
                                <ChevronUp size={20} />
                            </button>
                            <button
                                onClick={() => setIsReversed(true)}
                                className={`p-2 rounded-full border transition-all ${isReversed ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'}`}
                                aria-label="Scroll Down"
                            >
                                <ChevronDown size={20} />
                            </button>
                        </div>

                        <div className="relative h-[450px] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                            <Marquee
                                vertical
                                pauseOnHover
                                reverse={isReversed}
                                repeat={2}
                                className="[--gap:1.5rem] [--duration:70s]"
                            >
                                {testimonials.map((t, i) => (
                                    <div key={i} className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-6 mb-4 max-w-xl">
                                        <p className="text-sm md:text-lg font-light leading-relaxed mb-3 text-neutral-700 dark:text-neutral-200">
                                            "{t.text}"
                                        </p>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider text-black dark:text-white">{t.author}</h4>
                                            <p className="text-neutral-600 dark:text-neutral-500 text-xs">{t.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </Marquee>
                        </div>

                        <div className="pt-4 flex justify-center lg:justify-start">
                            <Link href="https://www.linkedin.com/in/abdulmanan-dev/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noopener noreferrer">
                                <Button
                                    size="lg"
                                    className="rounded-full gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    View on LinkedIn
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
