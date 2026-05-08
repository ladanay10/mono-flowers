"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "Про нас" },
  { href: "#services", label: "Послуги" },
  { href: "#gallery", label: "Роботи" },
  { href: "#process", label: "Процес" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500
        ${
          scrolled
            ? "py-[18px] px-[60px] bg-cream/95 backdrop-blur-md shadow-[0_1px_0_rgba(107,124,90,0.12)]"
            : "py-7 px-[60px]"
        }
        max-md:px-7 max-sm:px-[18px]
        ${scrolled ? "max-md:py-4 max-sm:py-3" : "max-md:py-[22px] max-sm:py-4"}
      `}
    >
      <a
        href="#home"
        className="inline-flex flex-col no-underline text-ink leading-[0.9]"
      >
        <span className="font-display text-[2.3rem] tracking-[0.08em] max-sm:text-[1.95rem]">
          MONO
        </span>
        <span className="text-[0.75rem] tracking-[0.1em] lowercase opacity-75 max-sm:text-[0.68rem]">
          flowers
        </span>
      </a>

      <ul className="hidden md:flex gap-[42px] list-none p-0 m-0">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className="nav-link">
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="tel:+380680540955"
        className="text-[11px] tracking-[0.2em] uppercase text-cream bg-olive no-underline px-7 py-3 transition-all duration-300 hover:bg-olive-dark hover:-translate-y-px max-sm:px-3 max-sm:py-2 max-sm:text-[9px] max-sm:tracking-[0.1em]"
      >
        Замовити
      </a>
    </nav>
  );
}
