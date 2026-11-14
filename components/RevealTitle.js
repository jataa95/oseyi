"use client";

import { useEffect, useRef } from "react";
import Letters from "./Letters";
import { gsap, reducedMotion } from "@/lib/gsap";

// Letters arrive one after another, tinted turquoise, then settle to bone,
// when the title scrolls into view (or when the visitor enters, for the hero).
export function revealLetters(chars, opts = {}) {
  return gsap
    .timeline(opts)
    .fromTo(chars, { opacity: 0, color: "#4fb9ab", y: "0.12em" }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.035, ease: "power2.out" })
    .to(chars, { color: "#f1ede6", duration: 0.9, stagger: 0.035, ease: "none" }, 0.25);
}

export default function RevealTitle({ text, as: Tag = "h2", className = "", afterEnter = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (reducedMotion()) return;
    const chars = el.querySelectorAll(".ch");
    gsap.set(chars, { opacity: 0 });
    let tl;
    const start = () => {
      tl = revealLetters(chars, {
        scrollTrigger: afterEnter ? undefined : { trigger: el, start: "top 85%", once: true },
        delay: afterEnter ? 0.3 : 0,
      });
    };
    if (afterEnter && !window.__oseyiEntered) {
      window.addEventListener("oseyi:enter", start, { once: true });
    } else start();
    return () => {
      window.removeEventListener("oseyi:enter", start);
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, [afterEnter]);

  return (
    <Tag ref={ref} className={`display ${className}`} aria-label={text.replace(/\n/g, " ")}>
      <span aria-hidden>
        <Letters text={text} />
      </span>
    </Tag>
  );
}
