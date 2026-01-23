"use client";

import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
            <Navbar />

            {/* Header Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                         initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
                         animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black uppercase mb-8 bg-clip-text tracking-tight">Digital <span className="text-neutral-400">Products</span> </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Premium tools, plugins, and resources to help you build better software, faster.
                            Meticulously crafted with clean code and modern design.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-6 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-neutral-500">No products found.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
