'use client';
import { projects } from '@/data/resume';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';

export default function Projects() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[128px] pointer-events-none" />

            <Navbar />
            <div className="container mx-auto px-6 pt-32 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-6">
                        SELECTED <br /> <span className="text-primary italic">WORKS</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A curated collection of digital experiences that push boundaries.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                        >
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                tags={project.skills}
                                link="#" // Placeholder
                                github="#" // Placeholder
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
