"use client";

import { useEffect, useState } from "react";
import { Monogram } from "../Icons";

// The entry screen. Shown once per visit; entering starts the intro.
export default function Gate({ line }) {
  const [state, setState] = useState("checking"); // checking | shown | leaving | gone

  useEffect(() => {
    const seen = sessionStorage.getItem("oseyi-entered");
    if (seen) {
      window.__oseyiEntered = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage only exists in the browser
      setState("gone");
      return;
    }
    setState("shown");
    window.__lenis?.stop();
    const id = setTimeout(() => window.__lenis?.stop(), 50);
    return () => clearTimeout(id);
  }, []);

  function enter() {
    sessionStorage.setItem("oseyi-entered", "1");
    window.__oseyiEntered = true;
    window.__lenis?.start();
    window.dispatchEvent(new Event("oseyi:enter"));
    setState("leaving");
    setTimeout(() => setState("gone"), 1200);
  }

  if (state === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center bg-ink px-[var(--gutter)] pb-14 pt-10 text-center transition-opacity duration-1000 ${
        state === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      } ${state === "checking" ? "invisible" : ""}`}
    >
      <Monogram className="text-[44px]" />
      <p className="caps my-auto max-w-[44ch] text-[12px] leading-[2] text-bone">{line}</p>
      <button onClick={enter} autoFocus className="display border-b border-bone/70 pb-1 text-3xl uppercase transition-colors hover:border-stone hover:text-stone">
        Enter
      </button>
      <p className="caps mt-6 text-[9px] text-ash">Shirts · Footwear · Gifts — Delivered across Nigeria</p>
    </div>
  );
}
