import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 gap-2">
                <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Abdul Manan. All rights reserved.</p>
                <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
                    <a href="https://www.linkedin.com/in/abdulmanan-dev/" target="_blank" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors" aria-label="LinkedIn">
                        <Linkedin size={18} />
                        <span className="font-medium hidden md:block">LinkedIn</span>
                    </a>
                    <a href="https://github.com/manan4641" target="_blank" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors" aria-label="GitHub">
                        <Github size={18} />
                        <span className="font-medium hidden md:block">GitHub</span>
                    </a>
                    <a href="https://www.instagram.com/a.manan_/" target="_blank" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors" aria-label="Instagram">
                        <Instagram size={18} />
                        <span className="font-medium hidden md:block">Instagram</span>
                    </a>
                    <a href="mailto:web.abdulmanan@gmail.com" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors" aria-label="Email">
                        <Mail size={18} />
                        <span className="font-medium hidden md:block">Email</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
