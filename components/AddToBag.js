"use client";

import { useState } from "react";
import { useBag } from "./BagProvider";
import Roll from "./Roll";

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

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="label mb-2 text-ash">Colour — {color}</legend>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-pressed={c === color}
              className={`label border px-3 py-2 transition-colors ${c === color ? "border-bone bg-bone text-ink" : "border-line hover:border-ash"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className={`label mb-2 ${nudge && !size ? "text-bone" : "text-ash"}`}>
          {nudge && !size ? "Pick a size first" : `Size${size ? ` — ${size}` : ""}`}
        </legend>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              aria-pressed={s === size}
              className={`label border py-2 tabular-nums transition-colors ${s === size ? "border-bone bg-bone text-ink" : "border-line hover:border-ash"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <button onClick={onAdd} className="label w-full bg-bone py-4 text-ink">
        <Roll>Add to bag</Roll>
      </button>
    </div>
  );
}
