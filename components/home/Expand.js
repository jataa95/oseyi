"use client";

import { useEffect, useRef } from "react";
import Button from "../Button";
import { gsap, reducedMotion } from "@/lib/gsap";

const marquee = ["Crochet", "Textured", "Ribbed", "Boston Suede", "Packed in black", "Delivered nationwide", "CAC registered"];

// A framed video that grows to fill the screen as you scroll, with the
// title sliding across it and a line of what we make running underneath.
export default function Expand() {
  const root = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", scrub: 0.6, pin: true },
      });
      tl.fromTo(".x-frame", { clipPath: "inset(22% 22% 22% 22%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
        .fromTo(".x-media", { scale: 1.25 }, { scale: 1, ease: "none" }, 0)
        .fromTo(".x-title", { xPercent: 30 }, { xPercent: -8, ease: "none" }, 0)
        .fromTo(".x-copy", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power1.out", duration: 0.3 }, 0.7);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh overflow-hidden">
      <div className="x-frame absolute inset-0 [clip-path:inset(0)]">
        <video
          className="x-media absolute inset-0 h-full w-full object-cover"
          src="/media/dressing-classy.mp4"
          poster="/media/dressing-classy-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/50" />
      </div>

      <h2 className="x-title display pointer-events-none absolute left-[var(--gutter)] top-[18%] whitespace-nowrap text-[18vw] md:text-[9vw]">
        The Art Of <em>Every Piece</em>
      </h2>

      <div className="absolute inset-x-0 bottom-14 grid gap-8 px-[var(--gutter)] md:grid-cols-[1fr_auto] md:items-end">
        <div className="overflow-hidden whitespace-nowrap [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="marquee caps inline-flex gap-16 text-bone/70">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
        <div className="x-copy max-w-[340px]">
          <p className="text-[17px] leading-snug text-bone/85">
            Every detail is chosen on purpose: the fabric, the buttons, the fit, the box it arrives in.
          </p>
          <Button href="/shop" className="mt-6">
            Shop the pieces
          </Button>
        </div>
      </div>
    </section>
  );
}
