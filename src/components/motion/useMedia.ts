"use client";

import { useSyncExternalStore } from "react";

/** Tinggi viewport (px), aman untuk SSR (server = 900). */
export function useViewportHeight() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerHeight,
    () => 900,
  );
}

/** Media query yang aman untuk SSR (server selalu `false`), selalu sinkron dengan perubahan. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
