import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/ui/marquee";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-32 px-6 text-center">Loading testimonials...</div>,
});

export default function Home() {
  return (
    <main className="bg-white dark:bg-black min-h-screen transition-colors">
      <Navbar />

      <Hero />

      <div className="py-4 md:py-8 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <Marquee className="py-2 [--duration:80s]" repeat={3} pauseOnHover>
          {[
            "WordPress", "PHP", "React",
            "TailwindCSS", "WooCommerce", "SEO Optimization",
            "Figma", "Webflow", "Elementor", "HTML5", "CSS3", "jQuery"
          ].map((skill, i) => (
            <span key={i} className="text-xl md:text-4xl font-black uppercase text-black dark:text-white mx-3 md:mx-6">
              {skill}
            </span>
          ))}
        </Marquee>
      </div>

      <section className="py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Premium<br />Services
            </h2>
            <p className="text-lg text-neutral-500 max-w-md">
              We build high-performance digital experiences that convert. From custom development to security audits.
            </p>
            <Link href="/services" className="inline-flex items-center text-lg font-bold border-b border-black dark:border-white pb-1 w-fit hover:opacity-50 transition-opacity">
              View Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-8 min-h-[250px] flex items-center justify-center">
            <span className="text-neutral-300 dark:text-neutral-700 font-black text-5xl opacity-20">SERVICES</span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <Link href="https://cloverhomes.com.au/" target="_blank" className="order-2 md:order-1 group relative bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl p-8 min-h-[350px] flex flex-col justify-end overflow-hidden hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-bold text-white tracking-tight">Clover Homes</h3>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">Featured</span>
              </div>
              <p className="text-white/80 text-lg mb-6 max-w-sm">
                Professional home builders showcasing premium residential projects with modern design and quality craftsmanship.
              </p>
              <div className="flex gap-2">
                {['Wordpress', 'Real Estate', 'Design'].map(s => (
                  <span key={s} className="text-xs font-mono text-white/90 bg-black/30 px-3 py-1.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </Link>
          <div className="flex flex-col justify-center space-y-6 order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Featured<br />Works
            </h2>
            <p className="text-lg text-neutral-500 max-w-md">
              Explore a collection of award-winning websites and applications built for clients globally.
            </p>
            <Link href="/work" className="inline-flex items-center text-lg font-bold border-b border-black dark:border-white pb-1 w-fit hover:opacity-50 transition-opacity">
              View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 md:py-20 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-center md:text-left">Experiences</h2>
            <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-black dark:bg-white dark:text-black rounded-full hover:opacity-80 transition-opacity mt-6 md:mt-0 mx-auto md:mx-0 group">
              View Full Resume <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { role: 'Web Developer', company: 'Noxlumyn', period: '2025 - Present' },
              { role: 'Wordpress Developer', company: 'Creoforma', period: '2024 - 2025' },
              { role: 'Wordpress Developer', company: 'DeepChain AI', period: '2024 - 2025' },
              { role: 'Web Developer', company: 'NOVA Pakistan', period: '2022 - 2024' },
              { role: 'Software Engineer', company: 'Evamp & Saanga', period: '2018 - 2022' },
            ].map((job, i) => (
              <div key={i} className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-neutral-200 dark:border-neutral-800 group hover:px-4 transition-all duration-300">
                <h3 className="text-xl md:text-3xl font-bold">{job.role}</h3>
                <div className="flex items-center gap-6 mt-3 md:mt-0">
                  <span className="text-lg text-neutral-500">{job.company}</span>
                  <span className="font-mono text-xs bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-full">{job.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
