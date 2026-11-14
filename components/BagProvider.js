"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const BagContext = createContext(null);
const KEY = "oseyi-bag";

// Items are keyed by product + colour + size so the same piece in two sizes
// shows as two lines.
const keyOf = (i) => `${i.slug}|${i.color}|${i.size}`;

export function BagProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      // Read the saved bag after hydration so server and client render the same first.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add = useCallback((item) => {
    setItems((prev) => {
      const k = keyOf(item);
      const found = prev.find((p) => keyOf(p) === k);
      if (found) return prev.map((p) => (keyOf(p) === k ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((item, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((p) => keyOf(p) !== keyOf(item)) : prev.map((p) => (keyOf(p) === keyOf(item) ? { ...p, qty } : p))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.reduce((n, i) => n + i.qty, 0), add, setQty, clear, open, setOpen }),
    [items, add, setQty, clear, open]
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}
