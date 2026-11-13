/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    compiler: {
        // Keep error/warn/info: /api/track and /api/download log events with console.info.
        removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn', 'info'] } : false,
    },

    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    poweredByHeader: false,
    compress: true,

    experimental: {
        optimizeCss: true,
    },

    // URL preservation for the 2026 redesign. Every URL that existed on the old site
    // either still resolves or 301s to the place its content now lives.
    async redirects() {
        return [
            // Existing permanent redirect, unchanged.
            { source: "/work", destination: "/portfolio", permanent: true },
            { source: "/work/:slug", destination: "/portfolio/:slug", permanent: true },
            // Pages folded into Home sections by the new design.
            { source: "/about", destination: "/#about", statusCode: 301 },
            { source: "/awards", destination: "/#awards", statusCode: 301 },
            { source: "/contact", destination: "/#contact", statusCode: 301 },
            // Removed earlier (404 on the live site); point at the project list.
            { source: "/projects", destination: "/portfolio", statusCode: 301 },
        ];
    },
};

export default nextConfig;
