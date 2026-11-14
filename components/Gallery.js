"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Roll from "./Roll";

const COPIES = 3;

// An endless sideways strip. The mouse wheel, trackpad, arrow keys and
// dragging all move it; it eases to a stop and leans slightly while moving.
export default function Gallery({ items }) {
  const trackRef = useRef(null);
  const setRef = useRef(null);
  const counterRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0;
    let current = 0;
    let width = set.offsetWidth;
    let frame;
    let drag = null;
    let moved = false;

    const measure = () => (width = set.offsetWidth);
    const ro = new ResizeObserver(measure);
    ro.observe(set);

    const loop = () => {
      current += (target - current) * (reduce ? 1 : 0.085);
      if (Math.abs(target - current) < 0.01) current = target;
      const wrapped = ((current % width) + width) % width;
      const x = -width - wrapped;
      const skew = reduce ? 0 : Math.max(-6, Math.min(6, (target - current) * -0.012));
      track.style.transform = `translate3d(${x}px,0,0)`;
      track.style.setProperty("--skew", `${skew}deg`);
      if (counterRef.current) {
        const step = width / items.length;
        const i = Math.round(wrapped / step) % items.length;
        const n = String(i + 1).padStart(2, "0");
        if (counterRef.current.textContent !== n) counterRef.current.textContent = n;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onWheel = (e) => {
      // Leave the bag and menu to scroll on their own.
      if (e.target.closest?.("aside, nav")) return;
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      target += d * (e.deltaMode === 1 ? 32 : 1);
    };

    const onKey = (e) => {
      const step = width / items.length;
      if (e.key === "ArrowRight") target += step;
      if (e.key === "ArrowLeft") target -= step;
    };

    const onDown = (e) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, start: target, id: e.pointerId };
      moved = false;
    };
    const onMove = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) moved = true;
      target = drag.start - dx * (e.pointerType === "touch" ? 1.6 : 1.2);
    };
    const onUp = () => (drag = null);
    // A drag shouldn't also open the piece under the pointer.
    const onClick = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    track.addEventListener("click", onClick, true);

    // Play only the videos on screen.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          const v = en.target;
          if (en.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.1 }
    );
    track.querySelectorAll("video").forEach((v) => io.observe(v));

    const t = setTimeout(() => setReady(true), 80);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      track.removeEventListener("click", onClick, true);
    };
  }, [items.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max touch-pan-y select-none pl-[var(--gutter)] will-change-transform"
          style={{ cursor: "grab" }}
        >
          {Array.from({ length: COPIES }, (_, copy) => (
            <div key={copy} ref={copy === 0 ? setRef : undefined} className="flex gap-[var(--gap)] pr-[var(--gap)]" aria-hidden={copy !== 1}>
              {items.map((item, i) => (
                <GalleryItem key={i} item={item} index={i} ready={ready} focusable={copy === 1} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="label mt-3 flex justify-between px-[var(--gutter)] text-ash">
        <span>
          <span ref={counterRef} className="tabular-nums text-bone">
            01
          </span>{" "}
          / {String(items.length).padStart(2, "0")}
        </span>
        <span className="hidden md:inline">Scroll or drag</span>
        <span className="md:hidden">Drag</span>
      </div>
    </div>
  );
}

function GalleryItem({ item, index, ready, focusable }) {
  return (
    <Link
      href={item.href}
      draggable={false}
      tabIndex={focusable ? 0 : -1}
      className="roll-group group block w-[var(--item)] shrink-0"
    >
      <div className="label mb-3 h-[14px] overflow-hidden">
        <span
          className="block transition-transform duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ transform: ready ? "translateY(0)" : "translateY(110%)", transitionDelay: `${300 + index * 60}ms` }}
        >
          <Roll>{item.label}</Roll>
        </span>
      </div>
      <div className="overflow-hidden">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-coal transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ transform: ready ? "translateY(0)" : "translateY(105%)", transitionDelay: `${index * 60}ms` }}
        >
          <div className="absolute inset-0 origin-bottom [transform:skewX(var(--skew,0deg))]">
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="none"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.label}
                fill
                draggable={false}
                sizes="(min-width: 768px) 25vw, 72vw"
                priority={index < 4}
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
