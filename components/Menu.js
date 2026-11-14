"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useBag } from "./BagProvider";
import { site } from "@/data/site";
import { formatPrice, products } from "@/data/products";

const count = (cat) => products.filter((p) => p.category === cat).length;

const links = [
  { href: "/shop", label: "Shop All", n: products.length },
  { href: "/shop?c=Shirts", label: "Shirts", n: count("Shirts") },
  { href: "/shop?c=Footwear", label: "Footwear", n: count("Footwear") },
  { href: "/about", label: "Our Story" },
];

// Full-screen menu: shop links with counts, the bag, and two pieces to tempt you.
export default function Menu({ open, onClose }) {
  const { count: bagCount, setOpen: openBag } = useBag();

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

  // Each block rises into place a little after the one before it.
  const rise = (i, className = "") => ({
    style: { transitionDelay: open ? `${150 + i * 70}ms` : "0ms" },
    className: `${className} transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
  });

  return (
    <div
      data-lenis-prevent
      className={`weave fixed inset-0 z-30 overflow-y-auto transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!open}
    >
      <div className="grid min-h-full gap-12 px-[var(--gutter)] pb-16 pt-28 md:grid-cols-[1.2fr_1fr] md:items-end">
        <nav>
          <ul>
            {links.map((l, i) => (
              <li key={l.href} {...rise(i)}>
                <Link href={l.href} onClick={onClose} tabIndex={open ? 0 : -1} className="group flex items-start gap-3 py-1">
                  <span className="display text-[15vw] transition-colors group-hover:text-stone md:text-[6.5vw]">{l.label}</span>
                  {l.n != null && <span className="caps mt-[1.2vw] text-ash">({l.n})</span>}
                </Link>
              </li>
            ))}
            <li {...rise(links.length)}>
              <button
                onClick={() => {
                  onClose();
                  openBag(true);
                }}
                tabIndex={open ? 0 : -1}
                className="group flex items-start gap-3 py-1"
              >
                <span className="display text-[15vw] text-stone transition-colors group-hover:text-bone md:text-[6.5vw]">Bag</span>
                <span className="caps mt-[1.2vw] text-ash">({bagCount})</span>
              </button>
            </li>
          </ul>
          <div {...rise(links.length + 1, "caps mt-12 flex flex-wrap gap-x-8 gap-y-2 text-ash")}>
            <a href={site.instagramUrl} target="_blank" rel="noopener" className="text-bone hover:text-stone">
              Instagram @{site.instagram}
            </a>
            {site.whatsapp && (
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="text-bone hover:text-stone">
                WhatsApp
              </a>
            )}
            <span>Delivery nationwide</span>
          </div>
        </nav>

        <div {...rise(2, "hidden grid-cols-2 gap-3 md:grid")}>
          <p className="caps col-span-2 text-ash">New in</p>
          {products.slice(0, 2).map((p) => (
            <Link key={p.slug} href={`/shop/${p.slug}`} onClick={onClose} tabIndex={open ? 0 : -1} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-coal">
                <Image src={p.images[0]} alt={p.name} fill sizes="22vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="mt-3 flex justify-between gap-2">
                <span className="display text-2xl">{p.name}</span>
                <span className="caps text-ash">{formatPrice(p.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
