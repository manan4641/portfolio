"use client";

import { useEffect } from "react";

// Services page: html { scroll-behavior:smooth; scroll-padding-top:90px } so jump links clear the nav.
export default function SmoothHtml() {
  useEffect(() => {
    const r = document.documentElement;
    r.classList.add("am-smooth");
    return () => r.classList.remove("am-smooth");
  }, []);
  return null;
}
