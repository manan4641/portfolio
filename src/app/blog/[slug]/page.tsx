'use client';
import { posts } from '@/data/posts';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function BlogPost() {
    //const params = useParams();
    const router = useRouter();
    const params = useParams() as { slug?: string | string[] };
    const slugParam = params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-black mb-4 uppercase">Post Not Found</h1>
                        <Link href="/blog">
                            <Button>Back to Journal</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <article className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/blog" className="inline-block mb-8">
                        <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-primary">
                            <ArrowLeft size={20} /> Back to Journal
                        </Button>
                    </Link>
                </motion.div>

                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-12 border-b border-border pb-8"
                >
                    <div className="flex flex-wrap gap-4 mb-6">
                        <Badge variant="secondary" className="text-sm py-1 px-3 gap-1">
                            <Tag size={12} /> {post.category}
                        </Badge>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary/30 px-3 py-1 rounded-full">
                            <Calendar size={14} /> {post.date}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary/30 px-3 py-1 rounded-full">
                            <Clock size={14} /> {post.readTime}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-foreground mb-6">
                        {post.title}
                    </h1>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:leading-relaxed prose-p:text-muted-foreground
                        prose-strong:text-foreground prose-strong:font-black
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-li:text-muted-foreground mb-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {/* CTA Section */}
                <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-20 rounded-2xl border border-border bg-secondary/40 p-8 md:p-10"
                >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-xl">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                        Get Started With Digital Brand Support
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        From web development to SEO and performance monitoring, let’s connect and I’ll send a quick plan.
                    </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/contact">
                        <Button className="rounded-full px-6 py-6 font-black  bg-black hover:opacity-90 transition-opacity">
                        Book a Free Call
                        </Button>
                    </Link>

                    <Link href="/portfolio">
                        <Button variant="outline" className="rounded-full bg-zinc-100 px-6 py-6 font-black transition-opacity hover:opacity-80 ">
                        View Work
                        </Button>
                    </Link>
                    </div>
                </div>
                </motion.section>

            </article>
            <Footer />
        </main>
    );
}
