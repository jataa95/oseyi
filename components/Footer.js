"use client";

import Link from "next/link";
import RevealTitle from "./RevealTitle";
import Button from "./Button";
import { site } from "@/data/site";

// "Are you ready to / Dress Classy?", a button straight to the DMs, then the links.
export default function Footer() {
  return (
    <footer className="relative mt-[12vh] px-[var(--gutter)] pb-12 pt-[16vh] text-center">
      <p className="caps text-ash">Are you ready to</p>
      <RevealTitle text="Dress Classy?" className="mt-6 text-[20vw] md:text-[12vw]" />
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button href="/shop">Shop the collection</Button>
        <Button href={site.instagramDm}>Send us a DM</Button>
      </div>

      <div className="caps mt-[14vh] grid grid-cols-2 gap-y-4 border-t border-line pt-6 text-left text-ash md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-bone hover:text-stone">Home</Link>
          <Link href="/shop" className="text-bone hover:text-stone">Shop</Link>
          <Link href="/about" className="text-bone hover:text-stone">Our Story</Link>
        </div>
        <div className="flex flex-col gap-2">
          <a href={site.instagramUrl} target="_blank" rel="noopener" className="text-bone hover:text-stone">Instagram</a>
          {site.whatsapp && (
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="text-bone hover:text-stone">WhatsApp</a>
          )}
        </div>
        <span>Delivery nationwide<br />CAC registered</span>
        <button onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))} className="text-right text-bone hover:text-stone">
          Back to top ↑
        </button>
      </div>
      <p className="caps mt-10 text-left text-[9px] text-ash">
        © {new Date().getFullYear()} {site.name}. {site.city}, Nigeria.
      </p>
    </footer>
  );
}
