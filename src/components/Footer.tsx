export default function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
                <p>&copy; {new Date().getFullYear()} Abdul Manan. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>
                    <a href="https://www.instagram.com/a.manan_/" target="_blank" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>
                    <a href="mailto:web.abdulmanan@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
}
