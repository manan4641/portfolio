
export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    readTime: string;
}

export const posts: BlogPost[] = [
    {
        id: 1,
        slug: "migrate-legacy-wordpress-sites-to-high-performance-enviroments",
        title: "How to Migrate Legacy WordPress Sites to High-Performance Hosting (Without Downtime)",
        excerpt: "Lessons learned from migrating 40+ corporate websites. How to handle DNS, SSL, and database integrity while minimizing downtime.",
        date: "December 18, 2025",
        category: "DevOps, Migration",
        readTime: "6 min read",
        content: `
            <p>Migration isn't just about moving files. It's about ensuring data integrity and improving performance in the process. Over the last year, I've managed end-to-end migrations for clients ranging from NGOs to multinational corporations.</p>
            
            <h2>Pre-Migration Audit (What I Check First)</h2>
            <p>Before I move anything, I run a complete migration audit to avoid surprises later. This includes:
            Reviewing active plugins and theme dependencies
            Checking database size and cleanup opportunities
            Identifying plugin conflicts, PHP version issues, and server limitations
        
            In many cases, cleaning and optimising the database before migration reduces the total transfer size by up to 40%, which speeds up the move and lowers the chance of errors.</p>

            <h2>DNS and SSL Setup (Avoid Downtime and “Not Secure” Warnings)</h2>
            <p>The most stressful stage of any website migration is the DNS switch. To make it smooth, I reduce the DNS TTL (Time To Live) about 24 hours before launch so changes propagate faster.

            I also prepare SSL early by installing certificates on the staging environment first. This prevents the common “Not Secure” browser warning and ensures the site launches with HTTPS from day one.</p>

            <h2>Post-Migration QA (Fix Issues Before Users Find Them)</h2>
            <p>Once the site is live, quality assurance starts immediately. My post-migration checks typically include:
            Automated crawl tests to detect broken links and missing pages
            Reviewing server and WordPress error logs
            Monitoring for PHP warnings and performance changes in the new environment
            This final QA step is what turns a “site moved” migration into a reliable, production-ready launch. </p>
        `
    },
    {
        id: 2,
        slug: 'optimizing-core-web-vitals-for-elementor-website',
        title: "Optimizing Core Web Vitals for Elementor Websites(LCP, INP, CLS)",
        excerpt: "Elementor is powerful but can be heavy. Here is how I consistently achieve 90+ Lighthouse scores for my clients using custom optimization strategies.",
        date: "August 21, 2025",
        category: "Performance",
        readTime: "6 min read",
        content: `
            <p>Page builders like Elementor are fantastic for design velocity, but they often output excessive DOM elements. However, with the right optimizations, you don't have to sacrifice speed for design.</p>

            <h2>Asset Unloading</h2>
            <p>Not every script needs to load on every page. I use asset manager tools to conditionally dequeue scripts. For example, a contact form script doesn't need to be on the 'About Us' page.</p>

            <h2>Image Optimization</h2>
            <p>I strictly use WebP formats and implement lazy loading. But beyond that, defining explicit width and height attributes prevents Cumulative Layout Shift (CLS), a key metric in Google's ranking.</p>

            <h2>Server-Side Caching</h2>
            <p>Plugins are great, but server-level caching (like Redis or Varnish) is superior. I configure caching rules that bypass the PHP worker entirely for static content, resulting in near-instant Time to First Byte (TTFB).</p>
        `
    },
    {
        id: 3,
        slug: "custom-lead-capture-in-wordpress-with-gohighlevel",
        title: "Custom Lead Capture in WordPress with GoHighLevel API",
        excerpt: "Replace slow, hard-to-style GoHighLevel embed forms with a fast, custom multi-step lead capture flow inside WordPress...",
        date: "May 10, 2025",
        category: "Automation, Development",
        readTime: "7 min read",
        content: `
            <p>Default CRM embed forms can be slow, hard to style, and often look out of place on a modern WordPress website. For a recent real estate project, I replaced the standard GoHighLevel iFrame form with a custom multi-step lead capture flow built in React and connected directly to the GoHighLevel API—resulting in a faster, cleaner, and more conversion-friendly experience.</p>

            <h2>The Architecture (WordPress + React + GoHighLevel)</h2>
            <p>The frontend is a lightweight React component embedded inside a WordPress page. It manages: </p>
            <ul> 
                <li>Multi-step flow and form state</li>
                <li>Field validation and inline error messaging</li>
                <li>A smooth UX that feels native to the site </li>
            </ul>
            <p>on submission, the form sends a structured payload to a serverless function, which then securely forwards the lead data to GoHighLevel.</p>

            <h2>Security and Validation (Spam Protection Done Right)</h2>
            <p>Client-side validation helps users complete the form, but server-side validation is essential for security and data quality. To protect the endpoint and keep the CRM clean, I added:
            <ul>    
                <li>Server-side validation + sanitisation to prevent injections </li>
                <li>Rate limiting to reduce spam and bot submissions </li>
                <li>Controlled payload formatting so only clean, usable leads reach GoHighLevel </li>
            </ul>     
            </p>   
            <h2>The Result (Speed + Styling + Conversions)</h2>
            <p>Compared to the iFrame version, the custom form, Loaded roughly 300ms faster.
            Allowed full design control to match the WordPress theme.
            Improved user experience, which led to a measurable lift in form completions for the client. </p>
        `
    },
    {
        id: 4,
        slug: "securing-high-traffic-corporate-websites",
        title: "Securing High-Traffic Corporate Websites",
        excerpt: "Security isn't a plugin; it's a mindset. My approach to hardening WordPress sites against brute force attacks and SQL injections.",
        date: "September 05, 2024",
        category: "Security",
        readTime: "7 min read",
        content: `
            <p>Working with banking and corporate clients (like Allied Bank and FMFB) taught me that security is non-negotiable. A hacked site destroys reputation instantly.</p>

            <h2>Hardening the Login</h2>
            <p>The default '/wp-admin' is the first place bots look. I implement 2FA (Two-Factor Authentication) and limit login attempts. For enterprise clients, we restrict admin access to specific IP addresses.</p>

            <h2>Database Security</h2>
            <p>I change the default database prefix and disable file editing within the dashboard. Regular automated backups are stored on an external server, ensuring that even in a worst-case scenario, recovery is minutes away.</p>

            <h2>Regular Audits</h2>
            <p>I schedule monthly security audits to scan for vulnerable plugins and outdated core files. Keeping software up to date is 90% of the battle.</p>
        `
    },
    {
        id: 5,
        slug: "the-role-of-technical-seo-in-organic-growth",
        title: "The Role of Technical SEO in Organic Growth",
        excerpt: "How I helped a client grow organic traffic by 60% through site-wide audits, schema markup implementation, and architectural fixes.",
        date: "November 18, 2024",
        category: "SEO",
        readTime: "8 min read",
        content: `
            <p>Content is king, but technical SEO is the castle. Without a solid foundation, your content won't rank. I recently helped a client achieve significant growth by fixing their technical debt.</p>

            <h2>Fixing the Structure</h2>
            <p>The site had deep nesting and orphaned pages. I reorganized the URL structure to be flatter and more logical, creating a clear hierarchy for search engines to crawl.</p>

            <h2>Schema Markup</h2>
            <p>I implemented JSON-LD schema for their services and reviews. This helped Google understand the context of the content, leading to rich snippets in search results and a higher click-through rate.</p>

            <h2>Internal Linking Strategy</h2>
            <p>We implemented a programmatic internal linking strategy, ensuring that high-authority pages passed link equity to newer content. This boosted the indexing speed and ranking potential of new articles.</p>
        `
    }
];
