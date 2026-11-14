"use client";

import Link from "next/link";
import { useEffect } from "react";
import Roll from "./Roll";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Index" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?c=Shirts", label: "Shirts" },
  { href: "/shop?c=Footwear", label: "Footwear" },
  { href: "/about", label: "About" },
];

// Full-screen menu: big serif links that slide up in turn.
export default function Menu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-30 bg-coal transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
        open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
      }`}
      aria-hidden={!open}
    >
      <nav className="flex h-full flex-col justify-end px-[var(--gutter)] pb-[var(--gutter)]">
        <ul className="mb-16">
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${200 + i * 60}ms` : "0ms" }}
                className={`group flex items-baseline gap-4 font-serif text-[15vw] leading-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] md:text-[8vw] ${
                  open ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <span className="label font-sans text-ash">0{i + 1}</span>
                <span className="transition-[font-style] group-hover:italic">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="label grid grid-cols-2 gap-[var(--gap)] border-t border-line pt-3 text-ash md:grid-cols-4">
          <a href={site.instagramUrl} target="_blank" rel="noopener" className="text-bone">
            <Roll>{`Instagram @${site.instagram}`}</Roll>
          </a>
          <span>Delivery nationwide</span>
          <span className="hidden md:block">CAC registered</span>
          <span className="hidden md:block">{site.city}, Nigeria</span>
        </div>
      </nav>
    </div>
  );
}
