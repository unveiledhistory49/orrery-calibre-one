"use client";

import { useEffect } from "react";

/**
 * Hooks GSAP up to Lenis for one continuous scroll-driven film.
 * Used on desktop and tablet where pinning is in play. On mobile the
 * vertical-restack variant runs without Lenis (see useMobileReveal) so that
 * pinned scenes never trap touch scroll.
 *
 * Apple lens: pick the scroll contract once, enforce it everywhere.
 * Reduced-motion mode: the hook simply returns and the app falls back to
 * native scrolling with static, fully-readable scenes.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let lenis: any;
    let rafId = 0;
    let cancelled = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.2,
      });
      const onRaf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(onRaf);
      };
      rafId = requestAnimationFrame(onRaf);
      (window as any).__lenis = lenis;
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}
