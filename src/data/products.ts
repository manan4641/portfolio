export interface Product {
    id: string;
    title: string;
    description: string;
    // price: string;
    image: string;
    category: string;
    link?: string;
}

export const products: Product[] = [
    {
        id: "1",
        title: "WordPress Images Converter to WebP",
        description: "A high-performance, dark-themed portfolio template built with Next.js and Tailwind CSS. Perfect for developers and designers.",
        //price: "$49",
        image: "/products/portfolio-template.jpg", // Placeholder path
        category: "Plugin",
        //link: "#"
    },
    {
        id: "2",
        title: "Photo Enhancer",
        description: "Custom tool transform your images with professional-grade filters",
        //price: "$99",
        image: "/products/ecommerce-kit.jpg", // Placeholder path
        category: "Photo Tool",
        //link: "#"
    },
];
