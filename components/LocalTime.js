"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

function now() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value ?? "--";
  return [get("hour"), get("minute")];
}

// Current time in Lagos, hh . mm with a blinking dot.
export default function LocalTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(now());
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  const [h, m] = time ?? ["--", "--"];
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {h} <span className="blink">.</span> {m}
    </span>
  );
}
