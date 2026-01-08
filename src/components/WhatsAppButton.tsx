"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";


export default function WhatsAppButton() {
    const phoneNumber = "971507641530";
    const message = "Hi Manan, I'm interested in working with you.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] flex items-center justify-center p-3 md:p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 animate-ping" />
            <IconBrandWhatsapp size={32} stroke={1.5} />
        </a>
    );
}
