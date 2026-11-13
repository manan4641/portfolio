"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HOME_NAV } from "@/data/site";
import { goTo } from "@/lib/motion";
import { pad2 } from "@/data/site";

// Home: eight anchor links whose active state follows scroll; mobile (<900px) menu sheet.
export function HomeNav() {
  const [active, setActive] = useState("home");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        let a = "home";
        for (const [, id] of HOME_NAV) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) a = id;
        }
        setActive(a);
      });
    };
    const onResize = () => { if (window.innerWidth >= 900) setMenu(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    goTo(id);
    history.replaceState(null, "", id === "home" ? "/" : "#" + id);
  };

  return (
    <>
      <header className="nav-wrap">
        <nav className="nav nav--home" aria-label="Main">
          <a href="#home" onClick={go("home")} className="nav__logo"><span className="logo-dot" />Abdul Manan</a>
          <div className="nav__links">
            {HOME_NAV.map(([label, id]) => (
              <a key={id} href={"#" + id} onClick={go(id)} className={"nav__link" + (active === id ? " is-on" : "")} aria-current={active === id ? "true" : undefined}>
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" onClick={go("contact")} className="nav__cta">Let&apos;s Talk</a>
          <button className="nav__menu" onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu}>
            <span /><span />
          </button>
        </nav>
      </header>
      {menu && (
        <div className="menu-sheet">
          {HOME_NAV.map(([label, id], i) => (
            <a key={id} href={"#" + id} onClick={go(id)}><span>{pad2(i + 1)}</span>{label}</a>
          ))}
        </div>
      )}
    </>
  );
}

// Services / other pages: four links (Home, Services, Projects, Blog) + Let's Talk.
export function SubNav({ current }: { current?: "services" | "products" }) {
  const links: [string, string, boolean][] = [
    ["Home", "/", false],
    ["Services", "/services", current === "services"],
    ["Projects", "/#projects", false],
    ["Blog", "/#blog", false],
  ];
  return (
    <header className="nav-wrap">
      <nav className="nav nav--sub" aria-label="Main">
        <Link href="/" className="nav__logo"><span className="logo-dot" />Abdul Manan</Link>
        <div className="nav__links">
          {links.map(([label, href, on]) => (
            <Link key={label} href={href} className={"nav__link" + (on ? " is-current" : "")} aria-current={on ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </div>
        <Link href="/#contact" className="nav__cta">Let&apos;s Talk</Link>
      </nav>
    </header>
  );
}

// In-page link that smooth-scrolls like the design's go(id) handler.
export function ScrollLink({ to, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return (
    <a
      {...rest}
      href={"#" + to}
      onClick={(e) => { e.preventDefault(); goTo(to); history.replaceState(null, "", "#" + to); }}
    />
  );
}
