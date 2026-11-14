"use client";

import Link from "next/link";
import { useState } from "react";
import Menu from "./Menu";
import Bag from "./Bag";
import Progress from "./Progress";
import { InstagramIcon, Monogram, WhatsAppIcon } from "./Icons";
import { useBag } from "./BagProvider";
import { site } from "@/data/site";

// Socials on the left, the Ò monogram in the middle, Bag and Navigate on the right.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useBag();
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 grid grid-cols-3 items-center px-[var(--gutter)] pt-5 mix-blend-difference">
        <div className="flex items-center gap-4">
          <a href={site.instagramUrl} target="_blank" rel="noopener" aria-label="Òseyi on Instagram" className="opacity-90 hover:opacity-100">
            <InstagramIcon />
          </a>
          {site.whatsapp && (
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" aria-label="Òseyi on WhatsApp" className="opacity-90 hover:opacity-100">
              <WhatsAppIcon />
            </a>
          )}
        </div>

        <Link href="/" onClick={close} aria-label="Òseyi home" className="justify-self-center">
          <Monogram />
        </Link>

        <div className="caps flex items-center justify-end gap-6">
          <button
            onClick={() => {
              close();
              setOpen(true);
            }}
            aria-label={`Open bag, ${count} items`}
          >
            Bag ({count})
          </button>
          <button onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} className="flex items-center gap-3">
            <span className="hidden sm:inline">{menuOpen ? "Close" : "Navigate"}</span>
            <span className="relative block h-[9px] w-[18px]" aria-hidden>
              <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-1/2 h-px w-full bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>
      <Progress />
      <Menu open={menuOpen} onClose={close} />
      <Bag />
    </>
  );
}
