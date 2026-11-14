"use client";

import { useEffect, useRef } from "react";

// A hairline along the bottom of the screen that fills as you scroll.
export default function Progress() {
  const bar = useRef(null);

  useEffect(() => {
    let frame;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-[var(--gutter)] bottom-4 z-40 h-px bg-bone/15">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-bone" />
    </div>
  );
}
