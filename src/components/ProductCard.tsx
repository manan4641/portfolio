"use client";

import { Product } from "@/data/products";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl transition-all hover:bg-white/10 h-full"
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-neutral-700 border-b border-white/4">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950">
                    {/* Placeholder for actual image if not available */}
                    <span className="text-6xl font-bold text-white/10 font-display">{product.title.charAt(0)}</span>
                </div>
                {/* If we had real images, we would use Next/Image here */}
                {/* 
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        /> 
        */}

                <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/20">
                        {product.category}
                    </Badge>
                </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col p-6 bg-neutral-100 dark:bg-neutral-900 border">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold font-display leading-tight">{product.title}</h3>
                    {/* <span className="text-lg font-bold text-emerald-400 font-sans">{product.price}</span> */}
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto">
                    {product.link ? (
                        <Link href={product.link} target="_blank" className="block">
                            <Button className="w-full text-white bg-neutral-900 dark:bg-white dark:text-black hover:opacity-80 font-bold" size="lg">
                                View Details <ExternalLink size={16} className="ml-2" />
                            </Button>
                        </Link>
                    ) : (
                        <Button className="w-full border bg-neutral-400 dark:bg-neutral-500 font-bold dark:text-neutral-200" disabled variant="secondary">
                            Coming Soon
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
