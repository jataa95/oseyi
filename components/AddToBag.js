"use client";

import { useState } from "react";
import { useBag } from "./BagProvider";

export default function AddToBag({ product }) {
  const { add } = useBag();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(null);
  const [nudge, setNudge] = useState(false);

  function onAdd() {
    if (!size) {
      setNudge(true);
      return;
    }
    add({ slug: product.slug, name: product.name, price: product.price, image: product.images[0], color, size });
  }

  const chip = (on) =>
    `caps border px-4 py-3 transition-colors ${on ? "border-bone bg-bone text-ink" : "border-line hover:border-ash"}`;

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="caps mb-3 text-ash">Colour — {color}</legend>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button key={c} onClick={() => setColor(c)} aria-pressed={c === color} className={chip(c === color)}>
              {c}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className={`caps mb-3 ${nudge && !size ? "text-stone" : "text-ash"}`}>
          {nudge && !size ? "Pick a size first" : `Size${size ? ` — ${size}` : ""}`}
        </legend>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((s) => (
            <button key={s} onClick={() => setSize(s)} aria-pressed={s === size} className={`${chip(s === size)} px-0 tabular-nums`}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <button onClick={onAdd} className="caps w-full bg-bone py-5 text-ink transition-colors hover:bg-stone">
        Add to bag
      </button>
    </div>
  );
}
