'use client';

import { posts } from '@/data/posts';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function Blog() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-6 pt-32 pb-20 max-w-7xl">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight"
                    >
                        Journal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Insights on development, design, and the future of the web.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        >
                            <Link href={`/blog/${post.slug}`} className="block h-full group">
                                <Card className="h-full flex flex-col bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-2xl overflow-hidden relative">
                                    <CardHeader className="space-y-4">
                                        <div className="mb-2">
                                            <Badge variant="secondary" className="font-mono text-xs tracking-wider uppercase mb-2">
                                                {post.category}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono pt-2">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-0">
                                        <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all text-primary">
                                            Read Article <ArrowRight size={16} />
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
