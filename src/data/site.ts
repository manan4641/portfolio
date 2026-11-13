// Site content. Copied verbatim from the design handoff
// (AM-Portfolio/design_handoff_portfolio_site/Abdul Manan Portfolio v3.dc.html).

export const SITE_URL = "https://abdulmanan.dev";
export const EMAIL = "web.abdulmanan@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/abdulmanan-dev/";
export const GITHUB = "https://github.com/manan4641";
export const INSTAGRAM = "https://www.instagram.com/a.manan_/";
export const WHATSAPP =
  "https://wa.me/923431713180?text=Hi%20Manan%2C%20I'm%20interested%20in%20working%20with%20you.";
export const SAME_AS = [LINKEDIN, GITHUB];

export const HOME_NAV: [string, string][] = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Services", "services"],
  ["Blog", "blog"],
  ["Contact", "contact"],
];

export type SkillCat = { name: string; skills: string[]; short?: string[] };
export const CATS: SkillCat[] = [
  { name: "CMS & Platforms", skills: ["WordPress", "Webflow", "Elementor", "Divi", "Framer", "Squarespace", "WooCommerce"] },
  { name: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "jQuery", "React", "Tailwind CSS", "Bootstrap"] },
  {
    name: "Backend",
    skills: ["PHP", "WordPress Custom Theme Development", "Custom Plugin Development", "ACF", "API Integrations", "Node.js", "npm", "MySQL"],
    short: ["PHP", "Custom Themes", "Custom Plugins", "ACF", "API Integrations", "Node.js", "npm", "MySQL"],
  },
  { name: "Design", skills: ["Figma", "UI/UX Design", "Mobile App Design", "Web App Design", "Responsive Web Design", "Prototyping"] },
  {
    name: "Performance & SEO",
    skills: ["Core Web Vitals", "Website Speed Optimization", "Technical SEO", "Website Security", "Website Migrations"],
    short: ["Core Web Vitals", "Speed Optimization", "Technical SEO", "Security", "Migrations"],
  },
  { name: "Hosting & Integrations", skills: ["WP Engine", "Hostinger", "Vercel Deployment", "DNS Management", "Hosting Management", "Zapier", "CRM Integrations", "Google Analytics"] },
  {
    name: "AI & Modern Dev",
    skills: ["Claude", "ChatGPT", "Cursor", "AI Automations", "AI-assisted Development", "AI Coding Workflows"],
    short: ["Claude", "ChatGPT", "Cursor", "AI Automations", "AI-assisted Dev", "AI Coding Workflows"],
  },
];

type RawProject = [name: string, url: string, period: string, loc: string, cats: string[], tags: string[], desc: string, featured?: 1];
const RAW_PROJECTS: RawProject[] = [
  ["Allied Bank", "https://www.abl.com/", "2019 – 2022", "Pakistan", ["Corporate", "Maintenance"], ["PHP", "Security", "Enterprise"], "Enterprise-level maintenance and revamp of the corporate web presence for one of Pakistan's largest banks, delivered under strict security, approval and uptime requirements.", 1],
  ["Ashton Gray", "https://ashton-gray.co.uk/", "—", "Luton, United Kingdom", ["WordPress", "Corporate"], ["WordPress", "Elementor", "Real Estate"], "Sales and lettings website for an estate agent in Luton, with property search by area and bedrooms, listings to buy and rent, and valuation booking for sellers and landlords.", 1],
  ["Eventuri", "https://eventuri.net/", "2025 – Present", "United Kingdom", ["WordPress", "E-commerce"], ["WordPress", "Custom Search", "Dealer Locator", "Performance"], "Custom WordPress build for an automotive performance brand: product architecture, custom search and filtering logic, and a global dealer locator with country-based listings, tuned for a large catalogue.", 1],
  ["Creoforma", "https://creoforma.co.uk/", "Jan 2025 – Present", "United Kingdom", ["Corporate"], ["Digital Agency", "WordPress"], "Website for a UK digital agency that provides user-centric digital solutions and strategic insight to businesses.", 1],
  ["Anosh Foundation", "https://anoshfoundation.com/", "Mar – Apr 2025", "Global", ["WordPress"], ["WordPress", "NGO", "CMS"], "A global NGO platform with a scalable structure for events and donations. End-to-end WordPress delivery covering CMS setup, page architecture and front-end implementation.", 1],
  ["Mashnavision", "https://autobedrijfmashnavision.nl/", "May – Oct 2025", "Netherlands", ["WordPress", "Corporate"], ["WordPress", "Automotive", "Web Design"], "Design and development of a high-end automotive website for a client in the Netherlands, combining bold visuals, smooth UX and a premium, brand-focused layout.", 1],
  ["Sunnah Charity", "https://sunnah.org.uk/", "May – Dec 2024", "United Kingdom", ["WordPress", "E-commerce"], ["WooCommerce", "PHP", "jQuery", "HTML5", "CSS3"], "Led development of a WooCommerce charity website from start to finish, including theme customization, donation flows and custom development.", 1],
  ["Gengear Generators", "https://gengear.com.au/", "Dec 2025 – Feb 2026", "Australia", ["WordPress", "Corporate"], ["WordPress", "Figma", "DNS & Hosting"], "A power management website for an Australian client, built at One Click Digital. Designed in Figma, then developed front-end and back-end, including DNS and hosting.", 1],
  ["Kuchenmeister", "https://kuchenmeister.co.uk/", "Feb – Mar 2025", "United Kingdom", ["WordPress", "Corporate"], ["WordPress", "Interior Design", "Luxury"], "A luxury modern kitchen design website showcasing premium collections and bespoke interior solutions.", 1],
  ["One Click Digital", "https://oneclickdigital.net.au/", "Feb 2025 – Present", "Australia", ["WordPress", "Maintenance"], ["WordPress", "Maintenance", "Design"], "Ongoing maintenance, design customization and development for a digital agency platform."],
  ["The Tiles Outlet", "https://thetilesoutlet.com/", "Dec 2024 – Mar 2025", "—", ["E-commerce"], ["E-commerce", "Retail", "Design"], "An online store for luxury home and bathroom tiles, built around seamless product browsing."],
  ["Ace Infrastructure", "https://aceinfrastructure.co.uk/", "Nov 2024 – Feb 2025", "United Kingdom", ["Corporate"], ["Engineering", "Corporate", "Consultancy"], "Corporate website for a specialist engineering and consultancy firm serving railway and civil projects for Tier 1 and Tier 2 suppliers."],
  ["Twin Group", "https://twingroup.uk/", "Nov – Dec 2024", "United Kingdom", ["WordPress", "Corporate"], ["WordPress", "Services"], "Website for an electrical and plumbing services provider offering maintenance and installation."],
  ["Starwall", "https://mystarwall.com/", "Nov 2023 – Jan 2024", "—", ["WordPress", "Web Applications"], ["WordPress", "Bootstrap", "ACF"], "A dynamic employee recognition website with a custom theme built on WordPress functions and Bootstrap."],
  ["You Convey", "https://you-convey.co.uk/", "Sep 2022 – Mar 2023", "United Kingdom", ["Web Applications"], ["Web App", "Real Estate", "Tech"], "Application website for home movers, aimed at reducing moving times by up to 8 weeks through smart technology."],
  ["MIPJ Store", "https://mipjstore.com/", "Jun – Aug 2021", "—", ["WordPress", "E-commerce"], ["WordPress", "WooCommerce", "CSS3"], "Marketplace development with WooCommerce integrations."],
  ["Mobily Pay", "https://mobilypay.sa/", "Feb – Aug 2021", "Saudi Arabia", ["WordPress", "Corporate"], ["WordPress", "Telecom", "Corporate"], "Dedicated WordPress site for the Mobily App in Saudi Arabia, focused on telecommunication services."],
  ["Petro-Tec", "https://petrotec.com.pk/", "2021", "Pakistan", ["WordPress", "Corporate"], ["WordPress", "Corporate", "Industrial"], "Corporate website for a diversified oilfield supply company providing equipment, parts and professional services."],
  ["Golf Connections", "https://www.golfconnections.dk/", "Feb – Aug 2020", "Denmark", ["WordPress", "Maintenance"], ["WordPress", "Auditing", "Full Stack"], "Comprehensive audit and full-stack WordPress maintenance for a Danish client, covering front-end and back-end."],
  ["Clover Homes", "https://cloverhomes.com.au/", "Apr 2025 – Present", "Australia", ["WordPress", "Maintenance"], ["WordPress", "Construction", "Maintenance"], "Front-end and back-end development plus ongoing maintenance of a construction website for an Australian client, as dedicated WordPress developer at One Click Digital."],
  ["Coys Constructions", "https://coysconstructions.com.au/", "Apr 2025 – Present", "Australia", ["WordPress", "Maintenance"], ["WordPress", "Construction", "Maintenance"], "Front-end and back-end development plus ongoing maintenance of a construction and home building website for an Australian client at One Click Digital."],
];

export type Project = {
  slug: string;
  name: string;
  url: string;
  host: string;
  period: string;
  loc: string;
  cats: string[];
  tags: string[];
  desc: string;
  featured: boolean;
  cat: string;
  stack: string;
  catLine: string;
  alt: string;
  shot: string;
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const PROJECTS: Project[] = RAW_PROJECTS.map((p) => {
  const slug = slugify(p[0]);
  return {
    slug,
    name: p[0],
    url: p[1],
    host: p[1].replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    period: p[2],
    loc: p[3],
    cats: p[4],
    tags: p[5],
    desc: p[6],
    featured: !!p[7],
    cat: p[4].join(" · "),
    stack: p[5].join(" · "),
    catLine: p[4].join(" · ") + (p[3] !== "—" ? "  /  " + p[3] : ""),
    alt: p[4].concat(p[5]).some((t) => /wordpress|woocommerce/i.test(t))
      ? p[0] + ": custom WordPress website by Abdul Manan"
      : p[0] + " website preview",
    shot: `/projects/${slug}.webp`,
  };
});
export const FEATURED = PROJECTS.filter((p) => p.featured);
export const PROJECT_FILTERS = ["All", "WordPress", "E-commerce", "Corporate", "Web Applications", "Maintenance"];
export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export type Role = { company: string; title: string; period: string; place: string; points: string[]; tech: string[] };
const AGENCY_POINTS = [
  "Build custom WordPress themes and templates from Figma files with hand-coded PHP, SCSS and JavaScript.",
  "Develop custom post types, taxonomies and ACF field groups that give clients flexible, editor-friendly content.",
  "Act as technical point of contact for clients: scoping requirements and translating business goals into build plans.",
  "Maintain and troubleshoot WordPress and Webflow CMS sites, and optimize for speed and Core Web Vitals.",
  "Own deployments end to end: staging, Git-based release, domain/DNS, SSL and post-launch QA.",
  "Help the team adopt AI tools such as Claude Code, and review AI-generated output before release.",
];
export const ROLES: Role[] = [
  { company: "Legacy Media (One Click Digital)", title: "Web Support Specialist", period: "May 2026 – Present", place: "Australia · Remote", points: AGENCY_POINTS, tech: ["WordPress", "Webflow", "PHP", "ACF", "Figma", "GoHighLevel", "Claude Code"] },
  { company: "Noxlumyn", title: "Senior Web Developer", period: "Feb 2025 – May 2026", place: "Melbourne, Australia · Remote", points: AGENCY_POINTS, tech: ["WordPress", "Webflow", "PHP", "ACF", "Figma", "GoHighLevel", "Claude Code"] },
  { company: "Creoforma UK", title: "Senior WordPress Developer", period: "Apr 2024 – Feb 2025", place: "Preston, United Kingdom · Remote", points: ["Led delivery of custom WordPress and WooCommerce builds for international charity, NGO and business-services clients, from scoping to launch.", "Wrote custom theme code and plugin functionality (PHP, MySQL queries, REST endpoints) where standard plugins fell short.", "Drove SEO and performance work that supported +70% organic traffic growth.", "Managed hosting, DNS, migrations and security hardening across the client portfolio."], tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "REST API", "Technical SEO"] },
  { company: "DeepChain AI & IT Technologies", title: "Web Developer (Part-time)", period: "Mar 2024 – Feb 2025", place: "Islamabad, Pakistan", points: ["Introduced a site-wide audit and optimization strategy that boosted organic traffic by 70%.", "Conducted technical audits covering code quality, security and reliability, then implemented the fixes.", "Streamlined development and maintenance workflows for the WordPress portfolio."], tech: ["WordPress", "SEO Audits", "Security"] },
  { company: "We are Nova", title: "Web Developer", period: "May 2022 – Feb 2024", place: "Liverpool, United Kingdom · Remote", points: ["Delivered 8+ websites for startup and small-business clients under tight deadlines, contributing to ~20% more monthly leads.", "Built responsive, cross-browser front-ends from designer handoffs, working directly with UX/UI designers.", "Implemented Google Analytics event tracking and email-marketing integrations, growing subscribers by 50%.", "Handled security, performance, updates and launches."], tech: ["WordPress", "Webflow", "HubSpot", "Google Analytics", "JavaScript"] },
  { company: "Evamp & Saanga", title: "Software Engineer (WordPress / PHP)", period: "Nov 2018 – May 2022", place: "Islamabad, Pakistan", points: ["Developed and maintained WordPress and Drupal platforms for enterprise banking clients including Allied Bank, FMFB, Bank of Khyber, MMBL and SME Bank.", "Built REST API integrations and custom back-end functionality against MySQL databases.", "Delivered enhancements, bug fixes and UI upgrades with 100% client satisfaction year on year.", "Led migrations with minimal downtime and produced QA test plans and SRS / FSD documentation."], tech: ["WordPress", "Drupal", "PHP", "MySQL", "REST API"] },
];

export const SERVICES: [string, string][] = [
  ["Custom WordPress Development", "Themes and plugins written for your business rather than bent to fit it, so the site stays fast, secure and easy for your team to edit."],
  ["WooCommerce Development", "Stores with clean checkout and payment flows that turn browsing into orders and are simple to run day to day."],
  ["Webflow Development & CMS Management", "Polished Webflow builds and well-structured CMS collections your marketing team can update without a developer."],
  ["Website Design & Frontend Development", "Figma designs turned into responsive, accessible front-ends that look right on every screen and browser."],
  ["Website Performance Optimization", "Faster load times and stronger Core Web Vitals, which means lower bounce rates and better conversions."],
  ["Technical SEO", "Site audits, structure and on-page fixes that help search engines understand your site and bring in organic traffic."],
  ["Website Security & Maintenance", "Updates, hardening, monitoring and quick fixes, so your site stays online and you can focus on the business."],
  ["Website Migration & Hosting", "Moves between hosts or platforms with DNS, SSL and data handled carefully to keep downtime to a minimum."],
  ["API & CRM Integrations", "Forms, CRMs, analytics and automation tools connected so leads and data flow where they need to go."],
  ["Landing Pages & Conversion Optimization", "Focused, fast pages for campaigns and lead generation, built to turn visitors into enquiries."],
];

export const TESTIMONIALS: [name: string, role: string, quote: string][] = [
  ["Martin Gordon", "Experience Design Leader | Human Centered Principles | UX Consultant", "Over the past three years I have had the pleasure of working with Manan on a series of marketing initiatives for early-mid stage tech startups. Manan is a fantastic front end developer with a skill set that enables him to be involved with and guide solutions for web, data and comms projects using platforms including Wordpress, Hubspot, Webflow and Mailchimp as well as in React and Jquery. A great collaborator who is keen to work with multi-disciplined teams, friendly, approachable - never without his smile - always looking to ask questions for the greater good as part of his search for quality solutions. A great asset to any team."],
  ["Oliver McAinsh", "UX Designer & Freelance Illustrator", "I've worked with Manan to deliver multiple sites and updates on Wordpress and Webflow over the past year or so. All have been completed without any fuss, he is a pleasure to work with."],
  ["Sarah S.", "Marketing & Communications Professional", "Manan is one of the best web developers I’ve ever had the pleasure of working with. He always delivers on time and exactly to brief. He’s extremely knowledgable and is a real talented developer. Would highly recommend!"],
  ["Simone Terranova", "Digital Product Designer", "I worked with Manan on the development of a few projects and he was outstanding in how he could execute them flawlessly. His countless strengths, such as on-time delivery and communication make him the perfect man for his next role."],
  ["Paul Dodd", "Fractional Head of Marketing", "Manan is a first class web developer able to work across a multitude of platforms, for us it was namely Wordpress and Hubspot but I know that's underselling his full repertoire of skills. Able to work independently, communicate well, and overall consistently deliver very high standard web projects on time and spec - which has been a godsend to the team! Wouldn't hesitate to recommend him, he'd be an asset to any team."],
  ["Muzzammil Haroon", "Digital Marketing Specialist", "I have worked with Manan directly and to be honest he is a gem. The way he handles pressure is amazing and has great knowledge of javascript and solves complex issues in no time. He is excellent in Wordpress and Hubspot. With not a single doubt I can rate him 5 stars and recommend him for any organisation looking for such a talented developer."],
  ["Nauman Idrees", "Agile Delivery Manager @ Etisalat UAE", "I was impressed by Abdul's ability to deal with multiple projects – effortlessly. He is hardworking and is keen to learn and adapt latest trends and technology."],
];

export const AWARDS: [year: string, title: string, by: string, url: string][] = [
  ["2025", "Consistent Performance Award", "Noxlumyn", "https://www.linkedin.com/posts/abdulmanan-dev_grateful-for-the-recognition-it-really-activity-7364222819863277570-NuCC"],
  ["2025", "Employee of the Month", "Noxlumyn", "https://drive.google.com/file/d/1zNizgm7MFvCNSoZwfmMdBG2lJtAkpYUP/view?usp=sharing"],
  ["2024", "The Ultimate Blueprint for WordPress: Plugins, Performance & SEO", "Alison", "https://alison.com/certification/check/3a05093b3f"],
  ["2024", "WordPress with Docker", "Great Learning Academy", "https://www.mygreatlearning.com/certificate/RUDSGQPI"],
  ["2022", "Programming in HTML5 and CSS3", "Pirple", "https://www.pirple.com/certificates/89c9w68w8h"],
  ["2017", "Web & Graphic Design Course", "Technical Training Center, NTB Islamabad", "https://drive.google.com/file/d/1utfaY-cTVwqtJhzTfKNcOvVS56YUES1l/view"],
];

export const HIGHLIGHTS = [
  "International client collaboration",
  "Digital agency experience",
  "Enterprise development & maintenance",
  "Custom WordPress development",
  "Performance optimization",
  "AI-assisted workflows",
];

export const JOURNEY = [
  { y: "2014", t: "Computer Science", d: "BSc at PMAS Arid Agriculture University, Rawalpindi." },
  { y: "2018", t: "Evamp & Saanga", d: "Enterprise WordPress and Drupal for banking clients." },
  { y: "2022", t: "We are Nova", d: "Remote delivery for UK startups and small businesses." },
  { y: "2024", t: "Creoforma UK", d: "Custom WordPress and WooCommerce for international clients." },
  { y: "2025", t: "One Click Digital", d: "Senior Web Developer for an Australian agency." },
  { y: "Now", t: "AI-assisted delivery", d: "Claude-powered workflows across design, code and docs." },
];

export const BLOG_CATS = ["All", "Migration", "Performance", "Automation", "SEO", "Security"];

// Blog covers cycle through three palettes, as in the design.
export const COVERS: [cover: string, orb: string][] = [
  ["linear-gradient(135deg,#123a66 0%,#0e131b 72%)", "radial-gradient(circle at 32% 30%,#eaf5fe,#4a9ee6 46%,#123a66)"],
  ["linear-gradient(135deg,#3b2d08 0%,#0e131b 72%)", "radial-gradient(circle at 32% 30%,#fff3d0,#f6b40e 46%,#6b4a04)"],
  ["linear-gradient(135deg,#1c4a78 0%,#10151e 76%)", "radial-gradient(circle at 32% 30%,#ffffff,#9fd8ff 46%,#2f6ea8)"],
];

export const pad2 = (n: number) => String(n).padStart(2, "0");
