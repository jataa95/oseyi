"use client";

import { useEffect, useRef, useState } from "react";
import { Monogram } from "../Icons";

// Counts to 100 while the page loads, then lifts away to show the home page.
// Shown once per visit; on later visits the home page appears straight away.
export default function Preloader({ line }) {
  const [state, setState] = useState("checking"); // checking | loading | leaving | gone
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const done = () => {
      window.__oseyiEntered = true;
      window.__lenis?.start();
      window.dispatchEvent(new Event("oseyi:enter"));
    };

    if (sessionStorage.getItem("oseyi-entered") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage only exists in the browser
      setState("gone");
      return;
    }

    setState("loading");
    const stop = setTimeout(() => window.__lenis?.stop(), 50);

    // Never shorter than 1.6s so it reads, never longer than 4s if the page is slow.
    const minTime = 1600;
    const maxTime = 4000;
    const start = performance.now();
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    let frame;
    let shown = 0;
    let leaveTimer;
    const tick = (now) => {
      const t = now - start;
      // Ease towards 90% on time alone; the last stretch waits for the page.
      const target = loaded && t > minTime ? 100 : Math.min(90, (t / minTime) * 90);
      shown += (target - shown) * 0.12;
      if (t > maxTime) shown = 100;
      const n = Math.min(100, Math.round(shown));
      if (countRef.current) countRef.current.textContent = String(n).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown / 100})`;
      if (n >= 100) {
        sessionStorage.setItem("oseyi-entered", "1");
        setState("leaving");
        done();
        leaveTimer = setTimeout(() => setState("gone"), 1100);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(stop);
      clearTimeout(leaveTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div
      aria-hidden
      className={`weave fixed inset-0 z-[60] flex flex-col items-center px-[var(--gutter)] pb-10 pt-10 text-center transition-[clip-path] duration-[1000ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
        state === "leaving" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      } ${state === "checking" ? "invisible" : ""}`}
    >
      <Monogram className="text-[44px]" />
      <p className="caps my-auto max-w-[44ch] text-[12px] leading-[2] text-bone">{line}</p>
      <div className="w-full">
        <div className="caps flex justify-between text-ash">
          <span>Loading the collection</span>
          <span ref={countRef} className="tabular-nums text-bone">
            000
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-bone/15">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-bone" />
        </div>
      </div>
    </div>
  );
}
