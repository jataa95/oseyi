"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Letters from "../Letters";
import { gsap, reducedMotion } from "@/lib/gsap";
import { formatPrice, products } from "@/data/products";

// One piece per screen: big photos scroll past on the right while the name
// and description on the left stay put and change to match.
export default function Collection() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".c-photo").forEach((el, i) => {
        gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActive(i) },
        });
        if (!reducedMotion())
          gsap.fromTo(el.querySelector("img"), { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reducedMotion()) return;
    const el = root.current.querySelector(`[data-piece="${active}"]`);
    if (!el) return;
    const chars = el.querySelectorAll(".ch");
    const tl = gsap
      .timeline()
      .fromTo(chars, { opacity: 0, color: "#4fb9ab" }, { opacity: 1, stagger: 0.03, duration: 0.4 })
      .to(chars, { color: "#f1ede6", stagger: 0.03, duration: 0.6 }, 0.2)
      .fromTo(el.querySelectorAll(".c-fade"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.15);
    return () => tl.kill();
  }, [active]);

  return (
    <section ref={root} className="relative md:grid md:grid-cols-2">
      <div className="pointer-events-none sticky top-0 hidden h-svh md:block">
        {products.map((p, i) => (
          <div
            key={p.slug}
            data-piece={i}
            className={`absolute inset-0 flex flex-col justify-center px-[calc(var(--gutter)*4)] transition-opacity duration-300 ${
              i === active ? "pointer-events-auto opacity-100" : "opacity-0"
            }`}
          >
            <PieceText product={p} index={i} />
          </div>
        ))}
      </div>
      <div>
        {products.map((p, i) => (
          <div key={p.slug} className="c-photo relative h-svh overflow-hidden">
            <Image src={p.images[0]} alt={p.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/40 to-transparent px-[var(--gutter)] pb-16 md:hidden">
              <PieceText product={p} index={i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PieceText({ product, index }) {
  return (
    <>
      <p className="caps c-fade text-ash">
        Spotlight {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")} · {product.category}
      </p>
      <h3 className="display mt-5 text-[14vw] md:text-[5.4vw]" aria-label={product.name}>
        <span aria-hidden>
          <Letters text={product.name} />
        </span>
      </h3>
      <p className="c-fade caps mt-5">
        {formatPrice(product.price)} <span className="text-ash">· {product.colors.join(" / ")}</span>
      </p>
      <p className="c-fade mt-5 max-w-[42ch] text-[17px] leading-snug text-bone/80">{product.summary}</p>
      <div className="c-fade mt-10 flex flex-wrap gap-3">
        <Button href={`/shop/${product.slug}`}>Shop this piece</Button>
        <Button href={`/shop?c=${product.category}`}>All {product.category.toLowerCase()}</Button>
      </div>
    </>
  );
}
