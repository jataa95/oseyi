"use client";

import { useState } from "react";
import { useBag } from "./BagProvider";

// Sizes that slide up over a product photo, so a piece can go in the bag
// without opening its page. Uses the first colour; the product page has the rest.
// Desktop: shows on hover. Phones: a + button opens it.
export default function QuickAdd({ product }) {
  const { add } = useBag();
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(null);

  function pick(size) {
    add({ slug: product.slug, name: product.name, price: product.price, image: product.images[0], color: product.colors[0], size });
    setAdded(size);
    setTimeout(() => setAdded(null), 1800);
  }

  return (
    <>
      <div
        className={`absolute inset-x-2 bottom-2 z-10 bg-ink/85 p-3 backdrop-blur transition-[transform,opacity] duration-500 md:pointer-events-none md:translate-y-3 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-within:pointer-events-auto md:focus-within:translate-y-0 md:focus-within:opacity-100 ${
          open ? "max-md:translate-y-0 max-md:opacity-100" : "max-md:pointer-events-none max-md:translate-y-3 max-md:opacity-0"
        }`}
      >
        <p className="caps mb-2 pr-10 text-ash md:pr-0">{added ? `Added — ${product.colors[0]}, ${added}` : `Quick add · ${product.colors[0]}`}</p>
        <div className="flex flex-wrap gap-1">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => pick(s)}
              className="caps min-w-9 border border-line px-2 py-2 tabular-nums transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <button
        aria-label={open ? "Hide sizes" : `Quick add ${product.name}`}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-bone text-lg leading-none text-ink md:hidden"
      >
        {open ? "×" : "+"}
      </button>
    </>
  );
}
