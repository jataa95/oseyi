"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Button from "../Button";
import Letters from "../Letters";
import { gsap, reducedMotion } from "@/lib/gsap";

const slides = [
  {
    title: "Texture",
    body: "Crochet, ribbing, wave-weave. Every Òseyi piece starts with a fabric you want to touch.",
    image: "/media/crochet-shirt-front.jpg",
  },
  {
    title: "Detail",
    body: "Turquoise stone buttons, flap pockets, a camp collar that sits right. Small decisions, made on purpose.",
    image: "/media/textured-shirt-white.jpg",
  },
  {
    title: "Delivery",
    body: "Packed in the matte-black Òseyi box with a dust bag and swing tag, then sent anywhere in Nigeria.",
    image: "/media/oseyi-box.jpg",
  },
];

// Three pinned slides, 01 / 03 to 03 / 03. Each has the photo framed on the
// left, the same photo blurred behind, and its title written in on the right.
export default function Slides() {
  const root = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".s-slide");
      gsap.set(items.slice(1), { autoAlpha: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${items.length * 100}%`, scrub: 0.6, pin: true },
      });
      items.forEach((item, i) => {
        const chars = item.querySelectorAll(".ch");
        const at = i * 1.2;
        if (i > 0) {
          tl.to(items[i - 1], { autoAlpha: 0, duration: 0.3 }, at - 0.3)
            .to(item, { autoAlpha: 1, duration: 0.3 }, at - 0.3)
            .fromTo(item.querySelector(".s-frame"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.5 }, at - 0.2);
        }
        tl.fromTo(chars, { opacity: 0, color: "#4fb9ab" }, { opacity: 1, stagger: 0.05, duration: 0.2 }, at)
          .to(chars, { color: "#f1ede6", stagger: 0.05, duration: 0.3 }, at + 0.1)
          .fromTo(item.querySelector(".s-body"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, at + 0.2);
      });
      tl.to({}, { duration: 0.5 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh overflow-hidden motion-reduce:h-auto">
      {slides.map((s, i) => (
        <div key={s.title} className="s-slide absolute inset-0 motion-reduce:relative motion-reduce:h-svh">
          <Image src={s.image} alt="" fill sizes="100vw" className="scale-110 object-cover opacity-50 blur-3xl" />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="relative mx-auto grid h-full max-w-[1200px] items-center gap-10 px-[var(--gutter)] pt-16 md:grid-cols-2 md:gap-24">
            <div className="s-frame relative mx-auto aspect-square w-[min(72vw,46vh)] overflow-hidden border border-bone/10 md:w-full md:max-w-[460px]">
              <Image src={s.image} alt={s.title} fill sizes="(min-width: 768px) 460px, 72vw" className="object-cover" />
            </div>
            <div>
              <p className="display text-2xl">
                0{i + 1} <span className="text-bone/50">/ 0{slides.length}</span>
              </p>
              <h2 className="display mt-6 text-[17vw] md:mt-10 md:text-[7.5vw]" aria-label={s.title}>
                <span aria-hidden>
                  <Letters text={s.title} />
                </span>
              </h2>
              <div className="s-body">
                <p className="mt-6 max-w-[34ch] text-[17px] leading-snug text-bone/85">{s.body}</p>
                <Button href="/shop" className="mt-10">
                  Shop the collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
