"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBag } from "./BagProvider";
import Roll from "./Roll";
import { site } from "@/data/site";
import { formatPrice } from "@/data/products";

function orderText(items) {
  const lines = items.map((i) => `• ${i.name} — ${i.color}, size ${i.size} × ${i.qty}`);
  return [`Hi Òseyi, I'd like to order:`, ...lines, ``, `Delivery to: `].join("\n");
}

// Slide-in bag. There is no online checkout: the order is sent as a message
// on Instagram (copied to the clipboard first) or WhatsApp.
export default function Bag() {
  const { items, setQty, open, setOpen } = useBag();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const total = items.every((i) => i.price != null) ? items.reduce((s, i) => s + i.price * i.qty, 0) : null;
  const text = orderText(items);

  async function orderOnInstagram() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {}
    window.open(site.instagramDm, "_blank", "noopener");
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/60 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-bone text-ink transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="label flex items-start justify-between p-[var(--gutter)]">
          <span>Bag ({items.reduce((n, i) => n + i.qty, 0)})</span>
          <button onClick={() => setOpen(false)} className="label">
            <Roll>Close</Roll>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[var(--gutter)]">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center gap-6 pb-24">
              <p className="font-serif text-4xl leading-none">Your bag is empty.</p>
              <Link href="/shop" onClick={() => setOpen(false)} className="label border-b border-ink pb-1">
                <Roll>Go to shop</Roll>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink/15 border-y border-ink/15">
              {items.map((i) => (
                <li key={`${i.slug}${i.color}${i.size}`} className="flex gap-4 py-4">
                  <div className="relative h-[110px] w-[88px] shrink-0 overflow-hidden bg-ink/10">
                    <Image src={i.image} alt={i.name} fill sizes="88px" className="object-cover" />
                  </div>
                  <div className="label flex flex-1 flex-col justify-between">
                    <div>
                      <p>{i.name}</p>
                      <p className="text-ink/60">
                        {i.color} / {i.size}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button aria-label="One less" onClick={() => setQty(i, i.qty - 1)} className="px-1">
                        –
                      </button>
                      <span className="tabular-nums">{i.qty}</span>
                      <button aria-label="One more" onClick={() => setQty(i, i.qty + 1)} className="px-1">
                        +
                      </button>
                      <button onClick={() => setQty(i, 0)} className="ml-auto text-ink/60">
                        <Roll>Remove</Roll>
                      </button>
                    </div>
                  </div>
                  <span className="label">{formatPrice(i.price == null ? null : i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 p-[var(--gutter)]">
            <div className="label flex justify-between">
              <span>Total</span>
              <span>{total == null ? "Confirmed in DM" : formatPrice(total)}</span>
            </div>
            <p className="label text-ink/60">
              Orders are confirmed by message. We&apos;ll copy your order so you can paste it into the chat.
            </p>
            <button onClick={orderOnInstagram} className="label w-full bg-ink py-4 text-bone">
              <Roll>{copied ? "Order copied — paste it in the DM" : "Order on Instagram"}</Roll>
            </button>
            {site.whatsapp && (
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener"
                className="label block w-full border border-ink py-4 text-center"
              >
                <Roll>Order on WhatsApp</Roll>
              </a>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
