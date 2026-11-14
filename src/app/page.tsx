import type { Metadata } from "next";
import Link from "next/link";
import { AWARDS, EMAIL, GITHUB, HIGHLIGHTS, INSTAGRAM, JOURNEY, LINKEDIN, SERVICES, WHATSAPP, pad2 } from "@/data/site";
import { HOME_DESC, HOME_TITLE, homeJsonLd, jsonLdString, pageMeta } from "@/lib/seo";
import { HomeNav, ScrollLink } from "@/components/Nav";
import HomeFx from "@/components/HomeFx";
import HeroScene from "@/components/HeroScene";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Journal from "@/components/Journal";
import Marquee from "@/components/Marquee";
import Tilt from "@/components/Tilt";
import AskAI from "@/components/AskAI";
import { BackToTop, Cursor } from "@/components/Floating";
import { ContactForm, IslamabadTime, TrackedLink } from "@/components/ContactForm";

export const metadata: Metadata = pageMeta({ title: HOME_TITLE, description: HOME_DESC, path: "/" });

// Build-time options exposed as props in the design.
const HEADLINE: "Primary" | "Alternative" = "Primary";
const SHOW_AVAILABILITY = true;
const ENABLE_3D = true;
const CUSTOM_CURSOR = true;
const ASK_AI = !!(process.env.ANTHROPIC_API_KEY || process.env.LLM_RELAY_API_KEY);

// Runs before the hero paints: shows the loader overlay and arms the intro animation.
// Text stays in the HTML; CSS failsafes reveal everything after 8s if JS never runs.
const INTRO_SCRIPT =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('am-intro')}catch(e){}";

const eyebrow = (t: string) => <div data-reveal="1" className="eyebrow">{t}</div>;

export default function Home() {
  return (
    <div className="am-page">
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(homeJsonLd) }} />
      <div className="progress" />
      {ENABLE_3D && <HeroScene />}
      <div className="loader" aria-hidden="true">
        <div className="loader__top"><span>Abdul Manan</span><span>Senior Web Developer</span></div>
        <div>
          <div className="loader__num">00</div>
          <div className="loader__track"><div className="loader__bar" /></div>
        </div>
      </div>

      <HomeNav />

      <main className="am-content">
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero__scrim" />
          <div className="hero__horizon"><div /></div>
          <div className="hero__inner">
            <div className="hero__col">
              {SHOW_AVAILABILITY && (
                <div data-intro="1" className="avail"><span className="avail__dot" />Available for Contract Work, Consultancy, and On-Site Positions</div>
              )}
              <h1 data-intro="1" className="hero__h1">Freelance WordPress Developer · Web Developer</h1>
              {HEADLINE === "Primary" ? (
                <p className="hero__head">
                  <span className="hero__mask"><span data-line="1" className="hero__line">Turning Ideas Into</span></span>
                  <span className="hero__mask"><span data-line="1" className="hero__line grad-text">Digital Experiences.</span></span>
                </p>
              ) : (
                <p data-intro="1" className="hero__head hero__head--alt">
                  Building High-Performance Websites. Engineering Digital Experiences. <span className="grad-text">Creating Impact.</span>
                </p>
              )}
              <p data-intro="1" className="hero__lead">
                Hey, I&apos;m Abdul Manan — a senior freelance web developer, WordPress developer and web support specialist with 7+ years of experience helping global businesses transform ideas into powerful digital experiences.
              </p>
              <div data-intro="1" className="hero__ctas">
                <ScrollLink data-magnet="1" to="projects" className="btn-primary">Explore My Work <span>↓</span></ScrollLink>
                <ScrollLink data-magnet="1" to="contact" className="btn-ghost">Let&apos;s Talk</ScrollLink>
              </div>
              <div data-intro="1" className="hero__regions"><span>Australia</span><span>United Kingdom</span><span>UAE</span><span>Europe</span><span>Pakistan</span></div>
            </div>
          </div>
          <div className="hero__scroll" aria-hidden="true"><span className="hero__mouse"><span /></span>Scroll</div>
        </section>

        {/* 01 ABOUT */}
        <section id="about" className="sec">
          <div className="wrap">
            {eyebrow("01 — About")}
            <h2 data-reveal="1" className="h2 about__h2">Not Just Building Websites. <span className="muted-span">Building Digital Experiences.</span></h2>
            <div className="about__cols">
              <div data-reveal="1" className="about__text">
                <p className="about__lead">I&apos;m a results-driven web developer with over seven years of experience creating, maintaining and optimizing websites for international businesses, digital agencies, startups and enterprise organizations.</p>
                <p>My career started in enterprise banking, supporting WordPress and Drupal platforms for clients such as Allied Bank under strict security and uptime requirements. Since then I have worked remotely with agencies in the United Kingdom and Australia, delivering custom WordPress themes, WooCommerce stores, Webflow CMS builds, migrations and performance work for clients across Australia, the UK, the UAE, Europe and Pakistan.</p>
                <p>I enjoy the hard parts: complex integrations, code-level WordPress problems, Core Web Vitals, and migrations that need to happen without downtime. AI-assisted workflows with Claude are part of how I design, build and document every day.</p>
                <div className="about__chips">{HIGHLIGHTS.map((h) => <span key={h}>{h}</span>)}</div>
              </div>
              <div data-reveal="1" className="stats">
                <div className="stat"><div className="stat__n">7+</div><div className="stat__l">Years of professional web development</div></div>
                <div className="stat"><div className="stat__n">5</div><div className="stat__l">Regions served: Australia, UK, UAE, Europe, Pakistan</div></div>
                <div className="stat"><div className="stat__n">+70%</div><div className="stat__l">Organic traffic growth supported through technical SEO</div></div>
                <div className="stat"><div className="stat__n">100%</div><div className="stat__l">Client satisfaction, year on year, on enterprise banking accounts</div></div>
                <div className="stat stat--edu"><div className="k">Education</div><div className="t">BSc Computer Science, 2014 – 2018</div><div className="s">PMAS Arid Agriculture University, Rawalpindi, Pakistan</div></div>
              </div>
            </div>
            <div data-reveal="1" className="journey">
              {JOURNEY.map((j) => (
                <div key={j.y} className="journey__item">
                  <span className="journey__dot" />
                  <div className="journey__y">{j.y}</div>
                  <div className="journey__t">{j.t}</div>
                  <div className="journey__d">{j.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 SKILLS */}
        <section id="skills" className="sec--alt skills">
          <div className="wrap">
            {eyebrow("02 — Skills")}
            <div data-reveal="1" className="head-row skills__head">
              <h2 className="h2">A technology universe, seven systems wide.</h2>
              <p className="skills__help">Choose a system to bring its technologies into orbit. Drag to rotate.</p>
            </div>
            <Skills />
          </div>
        </section>

        {/* 03 PROJECTS */}
        <FeaturedProjects />

        {/* 04 EXPERIENCE */}
        <section id="experience" className="sec--alt panel-bg">
          <div className="wrap">
            {eyebrow("04 — Experience")}
            <h2 data-reveal="1" className="h2 exp__h2">Seven years, five teams, three continents.</h2>
            <Experience />
          </div>
        </section>

        {/* 05 SERVICES */}
        <section id="services" className="sec">
          <div className="wrap">
            {eyebrow("05 — Services")}
            <h2 data-reveal="1" className="h2 svc__h2">Web development services.</h2>
            <div className="svc__grid">
              {SERVICES.map(([t, d], i) => (
                <div key={t} data-reveal="1" className="svc__row">
                  <span className="svc__num">{pad2(i + 1)}</span>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </div>
              ))}
            </div>
            <Link data-reveal="1" href="/services" className="btn-ghost svc__more">See what each service includes <span>→</span></Link>
          </div>
        </section>

        {/* 06 TESTIMONIALS */}
        <section id="testimonials" className="sec--alt tst">
          <div className="wrap">
            {eyebrow("06 — Testimonials")}
            <Testimonials />
          </div>
        </section>

        {/* 07 AWARDS */}
        <section id="awards" className="sec">
          <div className="wrap">
            {eyebrow("07 — Awards & Certifications")}
            <h2 data-reveal="1" className="h2 aw__h2">Recognition and credentials.</h2>
            <div className="aw__feat">
              <Tilt data-reveal="1" className="tilt-1000">
                <div className="aw__card">
                  <div className="aw__card-top"><span>NOXLUMYN</span><span>2025</span></div>
                  <div>
                    <h3>High Achiever Award</h3>
                    <p>Awarded by Noxlumyn in recognition of outstanding performance and contributions.</p>
                    <a href="https://drive.google.com/file/d/1CCJyS3srLcAVPSywP5T5npZmz-g5GV1K/view?usp=sharing" target="_blank" rel="noopener">Verify ↗</a>
                  </div>
                </div>
              </Tilt>
              <Tilt data-reveal="1" className="tilt-1000">
                <div className="aw__card aw__card--gold">
                  <div className="aw__card-top"><span>MICRO1</span><span>2025</span></div>
                  <div>
                    <h3>Senior WordPress Developer, certified by micro1</h3>
                    <p>Passed the micro1 AI Interview and coding assessment and recognized as a Senior WordPress Developer.</p>
                    <a href="https://drive.google.com/file/d/1PxPRrwDkN2_MW_bMSQQJkdYFL8dMe5za/view?usp=drive_link" target="_blank" rel="noopener">Verify ↗</a>
                  </div>
                </div>
              </Tilt>
            </div>
            <div className="aw__list">
              {AWARDS.map(([y, t, by, url]) => (
                <div key={t} data-reveal="1" className="aw__row">
                  <span className="aw__y">{y}</span>
                  <span className="aw__t">{t}</span>
                  <span className="aw__by">{by}</span>
                  <a href={url} target="_blank" rel="noopener">Verify ↗</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 JOURNAL */}
        <section id="blog" className="sec--alt panel-bg">
          <div className="wrap">
            {eyebrow("08 — Journal")}
            <div data-reveal="1" className="head-row jr__head">
              <h2 className="h2">Notes on development, performance and the web.</h2>
              <Link href="/blog" className="jr__all">All articles →</Link>
            </div>
            <Journal />
          </div>
        </section>

        <Marquee />

        {/* 09 CONTACT */}
        <section id="contact" className="contact">
          <div className="wrap" style={{ position: "relative" }}>
            {eyebrow("09 — Contact")}
            <h2 data-reveal="1" className="contact__h2">Have an Idea? Let&apos;s Build Something Great.</h2>
            <div className="contact__cols">
              <div data-reveal="1" className="contact__left">
                <p>Whether you&apos;re looking for an experienced developer for your next project, need ongoing website support, or want to discuss a remote opportunity, I&apos;d love to hear from you.</p>
                <a href={`mailto:${EMAIL}`} className="contact__email">{EMAIL}</a>
                <div className="contact__socials">
                  <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn ↗</a>
                  <a href={GITHUB} target="_blank" rel="noopener">GitHub ↗</a>
                  <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram ↗</a>
                  <TrackedLink href={WHATSAPP} target="_blank" rel="noopener" event="whatsapp_click" meta={{ location: "contact_section" }}>WhatsApp ↗</TrackedLink>
                </div>
                <div className="contact__loc">ISLAMABAD, PAKISTAN · FULLY REMOTE</div>
              </div>
              <ContactForm />
            </div>
            <footer className="footer">
              <span>© {new Date().getFullYear()} Abdul Manan. All rights reserved.</span>
              <IslamabadTime />
              <span className="mono">Senior Web Developer · WordPress · Webflow</span>
            </footer>
          </div>
        </section>
      </main>

      <BackToTop />
      {ASK_AI && <AskAI />}
      {CUSTOM_CURSOR && <Cursor />}
      <HomeFx />
    </div>
  );
}
