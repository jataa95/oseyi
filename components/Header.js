"use client";

import Link from "next/link";
import { useState } from "react";
import Menu from "./Menu";
import Bag from "./Bag";
import Progress from "./Progress";
import { useBag } from "./BagProvider";

// Just the logo and the menu button. The bag lives inside the menu; the
// button shows how many pieces are in it.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useBag();
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[var(--gutter)] pt-5 mix-blend-difference">
        <Link href="/" onClick={close} aria-label="Òseyi home" className="display text-[28px] leading-none tracking-[0.06em]">
          ÒSEYI
        </Link>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : `Open menu${count ? `, ${count} in bag` : ""}`}
          className="caps flex items-center gap-3"
        >
          <span>
            {menuOpen ? "Close" : "Menu"}
            {!menuOpen && count > 0 && <span className="text-stone"> ({count})</span>}
          </span>
          <span className="relative block h-[9px] w-[18px]" aria-hidden>
            <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1/2 h-px w-full bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
        </button>
      </header>
      <Progress />
      <Menu open={menuOpen} onClose={close} />
      <Bag />
    </>
  );
}
