import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { SmoothScrollWrapper } from "@/components/smooth-scroll-wrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Abdul Manan - Senior Full Stack Developer | WordPress, Next.js & React Expert',
    template: '%s | Abdul Manan - Senior Web Developer'
  },
  description: 'Senior Website Developer with global experience in UAE, UK, Australia & Pakistan. Specializing in high-performance WordPress, WooCommerce, React, and Next.js solutions.',
  keywords: [
    'Senior Website Developer',
    'Full Stack Developer',
    'WordPress Expert Dubai',
    'Web Developer UAE',
    'Next.js Expert',
    'React Developer',
    'Remote Web Developer',
    'WooCommerce Expert',
    'Headless WordPress',
    'Custom Web Solutions',
    'PHP Developer',
    'TypeScript',
    'International SEO',
    'Freelance Web Developer',
    'Web Development Agency',
    'Website Maintenance Expert',
    'Performance Optimization'
  ],
  authors: [{ name: 'Abdul Manan', url: 'https://abdulmanan.dev' }],
  creator: 'Abdul Manan',
  publisher: 'Abdul Manan',
  metadataBase: new URL('https://abdulmanan.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdulmanan.dev',
    siteName: 'Abdul Manan - Senior Full Stack Developer',
    title: 'Abdul Manan - Senior Full Stack Developer | WordPress & Next.js Expert',
    description: 'Senior Website Developer delivering high-performance digital solutions globally (UAE, UK, Australia). Expert in WordPress, Next.js, and Custom Development.',
    images: [
      {
        url: '/pfp.jpeg',
        width: 1200,
        height: 630,
        alt: 'Abdul Manan - Senior Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Manan - Professional Website Developer in Pakistan',
    description: 'Experienced WordPress & Next.js developer building high-performance websites for businesses globally.',
    images: ['/pfp.jpeg'],
    creator: '@abdulmanan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdul Manan',
    url: 'https://abdulmanan.dev',
    jobTitle: 'Senior Full Stack Developer',
    description: 'Senior Website Developer with global experience (UAE, UK, Australia, Pakistan). Specializing in high-performance WordPress, WooCommerce, React, and Next.js solutions.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UAE',
    },
    knowsAbout: [
      'WordPress Development',
      'WooCommerce',
      'React',
      'Next.js',
      'Full Stack Development',
      'PHP',
      'TypeScript',
      'Web Development',
      'International SEO'
    ],
    sameAs: [
      // Add your social media profiles here
      'https://github.com/abdulmanan',
      'https://linkedin.com/in/abdulmanan'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <GoogleAnalytics />
        <Providers>
          <SmoothScrollWrapper>
            {children}
          </SmoothScrollWrapper>
        </Providers>
      </body>
    </html>
  );
}
