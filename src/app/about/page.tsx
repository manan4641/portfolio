'use client';
import { experience } from '@/data/resume';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-6 pt-32 pb-24 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent text-center">About Me</h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Results-driven Web Developer (WordPress & Webflow), Web Support Engineer with 7 years of experience delivering high-performing websites, CMS solutions, and ongoing technical support across multiple industries. Skilled in website maintenance, migrations, DNS/domain management, CRM form integrations (GoHighLevel), performance optimization, and UI design in Figma. Proven ability to improve engagement and SEO performance through responsive upgrades, clean design implementation, and technical fixes.
                    </p>
                </motion.div>

                <section className="relative pl-8 md:pl-0">
                    <h2 className="text-2xl font-bold mb-8 border-b pb-2 inline-block">Experience</h2>
                    <div className="space-y-12 border-l-2 border-border ml-2 md:ml-0 pl-8 md:pl-12 relative">
                        {experience.map((job, idx) => (
                            <motion.div
                                key={idx}
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                {/* Marker */}
                                <div className="absolute -left-[43px] md:-left-[59px] top-2 w-5 h-5 bg-background border-2 border-primary rounded-full z-10" />

                                <Card className="border-border hover:border-primary transition-colors">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                                                <span className="text-primary font-medium">{job.company}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground whitespace-nowrap bg-secondary/50 px-2 py-1 rounded">{job.period}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground italic mb-4">{job.location}</p>
                                        <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground">
                                            {job.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                        {job.skills && (
                                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                                                {job.skills.map(skill => (
                                                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
