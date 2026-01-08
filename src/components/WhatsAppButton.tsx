"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
    const phoneNumber = "971507641530"; // Updated to UAE number
    const message = "Hi Manan, I'm interested in working with you.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ y: -5 }}
        >
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 animate-ping" />
            <IconBrandWhatsapp size={32} stroke={1.5} />
            <span className="sr-only">Chat on WhatsApp</span>
        </motion.a>
    );
}
