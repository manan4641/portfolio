export interface Product {
    id: string;
    title: string;
    description: string;
    // price: string;
    image?: string;
    category: string;
    link?: string;
}

export const products: Product[] = [
    {
        id: "1",
        title: "WordPress Images Converter to WebP",
        description: " The ideal plugin for websites that already have a large number of images in other formats, such as JPG or PNG. This plugin converts JPG and PNG images to WebP format for better performance. It creates WebP versions alongside your original images without deleting them.",
        //price: "$49",
        image: "/downloads/plugin-banner.jpg", // Placeholder path
        category: "Plugin",
        link: "/api/download?file=wpimages-webp.zip&title=WordPress%20Images%20Converter%20to%20WebP"
    },
    {
        id: "2",
        title: "Photo Enhancer",
        description: "Custom tool transform your images with professional grade filters.",
        //price: "$99",
        category: "Photo Tool",
        //link: "#"
    },
];
