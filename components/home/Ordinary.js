"use client";

import { useEffect, useRef } from "react";
import Button from "../Button";
import Letters from "../Letters";
import { gsap, reducedMotion } from "@/lib/gsap";

// "Ordinary" sits over a small video; as you scroll the video swells to fill
// the screen, the word fades, and "Ends Here" writes itself in.
export default function Ordinary() {
  const root = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const end = root.current.querySelectorAll(".o-end .ch");
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", scrub: 0.6, pin: true } });
      tl.fromTo(".o-video", { clipPath: "inset(30% 34% 30% 34%)", scale: 1 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1.05, ease: "none", duration: 1 }, 0)
        .to(".o-start", { opacity: 0, scale: 1.4, filter: "blur(10px)", duration: 0.4 }, 0.35)
        .fromTo(end, { opacity: 0, color: "#4fb9ab" }, { opacity: 1, stagger: 0.04, duration: 0.2 }, 0.8)
        .to(end, { color: "#f1ede6", stagger: 0.04, duration: 0.3 }, 0.9)
        .fromTo(".o-after", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 1.15);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative grid h-svh place-items-center overflow-hidden text-center">
      <video
        className="o-video absolute inset-0 h-full w-full object-cover"
        src="/media/matching-pairs.mp4"
        poster="/media/matching-pairs-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-ink/40" />
      <h2 className="o-start display absolute motion-reduce:hidden text-[22vw] md:text-[10vw]">Ordinary</h2>
      <div className="relative px-[var(--gutter)]">
        <h2 className="o-end display text-[22vw] md:text-[10vw]" aria-label="Ends Here">
          <span aria-hidden>
            <Letters text="Ends Here" />
          </span>
        </h2>
        <div className="o-after">
          <p className="mx-auto mt-6 max-w-[40ch] text-[17px] leading-snug text-bone/85">
            Pieces chosen for taste, texture and presence. Get one for you, and one for bae.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/shop?c=Shirts">Shop shirts</Button>
            <Button href="/shop?c=Footwear">Shop footwear</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
