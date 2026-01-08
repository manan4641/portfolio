"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function ContactForm() {
    const searchParams = useSearchParams();
    const service = searchParams.get("service");
    const paid = searchParams.get("paid");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        if (service) {
            setFormData(prev => ({
                ...prev,
                message: `I'm interested in the ${service} package...`
            }));
        }
    }, [service]);

    return (
        <div className="max-w-xl mx-auto w-full">
            {paid && (
                <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center text-green-800 dark:text-green-300">
                    <Check className="mr-3" />
                    <span>Payment visualized! Please complete the form to start your project.</span>
                </div>
            )}

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium uppercase tracking-wider">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium uppercase tracking-wider">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium uppercase tracking-wider">Message</label>
                    <textarea
                        id="message"
                        rows={5}
                        className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <Button size="lg" className="w-full md:w-auto px-12 h-14 text-lg">
                    Send Inquiry
                </Button>
            </form>
        </div>
    );
}

export default function Contact() {
    return (
        <section id="contact" className="py-32 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Let's Work Together</h2>
                    <p className="text-neutral-500">Available for select freelance opportunities.</p>
                </div>

                <Suspense fallback={<div>Loading form...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </section>
    );
}
