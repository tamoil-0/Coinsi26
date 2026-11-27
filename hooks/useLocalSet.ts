"use client";

import { useCallback, useEffect, useState } from "react";

/** Conjunto persistido en localStorage (favoritos, checklist). Falla en silencio si no hay storage. */
export function useLocalSet(key: string) {
  const [items, setItems] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratación desde storage del navegador
      if (raw) setItems(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* sin storage disponible */
    }
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setItems(new Set(e.newValue ? (JSON.parse(e.newValue) as string[]) : []));
      } catch {
        /* ignorar */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const toggle = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        try {
          window.localStorage.setItem(key, JSON.stringify([...next]));
        } catch {
          /* ignorar */
        }
        return next;
      });
    },
    [key],
  );

  const clear = useCallback(() => {
    setItems(new Set());
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignorar */
    }
  }, [key]);

  return { items, toggle, clear, ready };
}
