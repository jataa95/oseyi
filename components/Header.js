"use client";

import Link from "next/link";
import { useState } from "react";
import LocalTime from "./LocalTime";
import Menu from "./Menu";
import Bag from "./Bag";
import Roll from "./Roll";
import Wordmark from "./Wordmark";
import { useBag } from "./BagProvider";
import { site } from "@/data/site";

// Four columns that line up with the gallery below:
// brand | wordmark | menu + shop | Lagos time + bag circle.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useBag();
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="label fixed inset-x-0 top-0 z-40 grid grid-cols-3 gap-[var(--gap)] px-[var(--gutter)] pt-[var(--gutter)] mix-blend-difference md:grid-cols-4">
        <Link href="/" onClick={close} className="roll-group leading-[14px]">
          <span className="block">
            <Roll>{site.name}</Roll>
          </span>
          <span className="block text-bone/60">Clothing brand</span>
        </Link>

        <Link href="/" onClick={close} aria-label="Òseyi home" className="hidden md:block">
          <Wordmark className="text-[28px] leading-none" />
        </Link>

        <div className="flex flex-col items-start">
          <button onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen}>
            <Roll>{menuOpen ? "Close" : "Menu"}</Roll>
          </button>
          <Link href="/shop" onClick={close}>
            <Roll>Shop</Roll>
          </Link>
        </div>

        <div className="flex items-start justify-end md:justify-between">
          <div className="hidden md:block">
            <span className="block">Local time</span>
            <LocalTime />
          </div>
          <button
            onClick={() => {
              close();
              setOpen(true);
            }}
            aria-label={`Open bag, ${count} items`}
            className="group relative grid size-[52px] place-items-center rounded-full border border-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <span className="tabular-nums">{count}</span>
          </button>
        </div>
      </header>
      <Menu open={menuOpen} onClose={close} />
      <Bag />
    </>
  );
}
