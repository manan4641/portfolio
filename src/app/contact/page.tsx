"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

function ContactForm() {
    const searchParams = useSearchParams();
    const service = searchParams.get("service");
    const [subject, setSubject] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (service) {
            const subjectText = `Inquiry about ${service}`;
            setSubject(subjectText);
            setFormData(prev => ({
                ...prev,
                subject: subjectText,
                message: `Hi Manan,\n\nI'm interested in the ${service} package. Here are the details of my project...`
            }));
        }
    }, [service]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare form data for Web3Forms
            const formDataToSend = new FormData();
            formDataToSend.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY!);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone || 'Not provided');
            formDataToSend.append('subject', `Portfolio - Abdul Manan: ${formData.subject}`);
            formDataToSend.append('message', formData.message);

            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                setShowSuccess(true);

                // Reset form after delay
                setTimeout(() => {
                    setShowSuccess(false);
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                    });
                }, 5000);
            } else {
                throw new Error('Failed to send');
            }

        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send message. Please try again or email me directly at web.abdulmanan@gmail.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-xl dark:shadow-none relative">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Name</label>
                        <input
                            id="name"
                            required
                            type="text"
                            className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                        <input
                            id="email"
                            required
                            type="email"
                            className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Subject</label>
                        <input
                            id="subject"
                            required
                            type="text"
                            className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium"
                            placeholder="Project Inquiry"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Message</label>
                    <textarea
                        id="message"
                        required
                        rows={6}
                        className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none font-medium leading-relaxed"
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-16 text-lg bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-xl transition-all font-bold disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </Button>
            </form>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl"
                    >
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-sm mx-4">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-neutral-500 dark:text-neutral-400">
                                Thank you for reaching out! I'll get back to you shortly.
                            </p>
                            <Button
                                onClick={() => setShowSuccess(false)}
                                variant="ghost"
                                className="mt-6 text-neutral-500 hover:text-black dark:hover:text-white"
                            >
                                Close
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-neutral-100 dark:bg-black text-black dark:text-white transition-colors relative overflow-hidden">
            <Navbar />

            <section className="pt-40 pb-20 px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">Let's Work<br />Together</h1>
                        <p className="text-xl text-neutral-500">Available for select freelance opportunities.</p>
                    </div>

                    <Suspense fallback={<div>Loading form...</div>}>
                        <ContactForm />
                    </Suspense>
                </div>
            </section>

            <Footer />
        </main>
    );
}
