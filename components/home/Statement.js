"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "../Button";
import { gsap, reducedMotion } from "@/lib/gsap";

const lines = ["A shirt should say", "something before you speak.", "Every texture, button,", "and box is considered."];

// Words light up one by one as you scroll past.
export default function Statement() {
  const root = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".w",
        { opacity: 0.15 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".st-text", start: "top 75%", end: "bottom 45%", scrub: true } }
      );
      gsap.fromTo(".st-img", { yPercent: 15 }, { yPercent: -15, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-[var(--gutter)] py-[22vh]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="st-text display text-[10vw] md:text-[4.6vw]" aria-label={lines.join(" ")}>
            {lines.map((l, li) => (
              <span key={li} className="block" aria-hidden>
                {l.split(" ").map((w, wi) => (
                  <span key={wi} className="w inline-block">
                    {w}&nbsp;
                  </span>
                ))}
              </span>
            ))}
          </p>
          <p className="mt-10 max-w-[52ch] text-[17px] leading-snug text-bone/75">
            From crochet camp collars to suede clogs, each piece is picked for how it feels and how it sits, and finished so it
            stands out without trying too hard.
          </p>
          <Button href="/about" className="mt-10">
            Our story
          </Button>
        </div>
        <div className="relative hidden aspect-[4/5] overflow-hidden md:block">
          <div className="st-img absolute inset-x-0 -inset-y-[15%]">
            <Image src="/media/crochet-shirt-back.jpg" alt="The crochet camp shirt from the back" fill sizes="40vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
