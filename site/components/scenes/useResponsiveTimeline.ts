"use client";

import { useEffect, useState } from "react";

const BP_QUERIES: Record<string, string> = {
  desktop1440: "(min-width: 1440px)",
  desktop1280: "(min-width: 1280px) and (max-width: 1439.98px)",
  laptop1024: "(min-width: 1024px) and (max-width: 1279.98px)",
  tablet768: "(min-width: 768px) and (max-width: 1023.98px)",
  mobile430: "(min-width: 430px) and (max-width: 767.98px)",
  mobile390: "(min-width: 390px) and (max-width: 429.98px)",
  mobile360: "(max-width: 389.98px)",
};

export function useActiveBreakpoint() {
  const [bp, setBp] = useState<string>("");
  useEffect(() => {
    const pick = () => {
      for (const [k, q] of Object.entries(BP_QUERIES)) {
        if (window.matchMedia(q).matches) {
          setBp(k);
          return;
        }
      }
    };
    pick();
    window.addEventListener("resize", pick);
    const mql = window.matchMedia("(min-width: 768px)");
    mql.addEventListener("change", pick);
    return () => {
      window.removeEventListener("resize", pick);
      mql.removeEventListener("change", pick);
    };
  }, []);
  return bp;
}

/**
 * SSR-safe matchMedia accessors. Use `isDesktop()`/`isMobile()`/`isReduced()`
 * inside effects or event handlers — never during render or at module scope.
 * Returns false during SSR and on first client paint (the effect in each scene
 * runs after mount, where these will be accurate).
 */
const hasWindow = () => typeof window !== "undefined" && typeof window.matchMedia === "function";

export const mq = {
  get desktop() {
    return hasWindow() ? window.matchMedia("(min-width: 768px)") : null;
  },
  get mobile() {
    return hasWindow() ? window.matchMedia("(max-width: 767.98px)") : null;
  },
  get reduced() {
    return hasWindow() ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  },
};

export function isDesktop() {
  return !!mq.desktop?.matches;
}
export function isMobile() {
  return !!mq.mobile?.matches;
}
export function isReduced() {
  return !!mq.reduced?.matches;
}
