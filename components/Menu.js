"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?c=Shirts", label: "Shirts" },
  { href: "/shop?c=Footwear", label: "Footwear" },
  { href: "/about", label: "Our Story" },
];

// Full-screen menu: centred serif links that rise in turn.
export default function Menu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`weave fixed inset-0 z-30 transition-opacity duration-700 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!open}
    >
      <nav className="flex h-full flex-col items-center justify-center px-[var(--gutter)] text-center">
        <ul>
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
                className={`display block py-1 text-[16vw] transition-[transform,color] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:text-stone md:text-[7vw] ${
                  open ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="caps absolute inset-x-[var(--gutter)] bottom-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-ash">
          <a href={site.instagramUrl} target="_blank" rel="noopener" className="text-bone">
            Instagram @{site.instagram}
          </a>
          <span>Delivery nationwide</span>
          <span>CAC registered</span>
        </div>
      </nav>
    </div>
  );
}
