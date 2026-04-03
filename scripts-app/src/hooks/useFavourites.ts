"use client";

import { useState, useEffect } from "react";

const KEY = "pbd_favourites";

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setFavourites(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  function toggle(id: string) {
    setFavourites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  return { favourites, toggle };
}
