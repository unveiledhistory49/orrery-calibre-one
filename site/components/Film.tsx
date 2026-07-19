"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mq } from "./scenes/useResponsiveTimeline";
import Nav from "./Nav";
import Loader from "./Loader";
import Readout from "./Readout";

import Scene01Hero from "./scenes/Scene01Hero";
import Scene02Crystal from "./scenes/Scene02Crystal";
import Scene03Beat from "./scenes/Scene03Beat";
import Scene04Craft from "./scenes/Scene04Craft";
import Scene05Spec from "./scenes/Scene05Spec";
import Scene06Glow from "./scenes/Scene06Glow";
import Scene07CTA from "./scenes/Scene07CTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Film — a single scroll-controlled descent through CALIBRE ONE's movement.
 * Desktop & tablet: pinned scenes via GSAP ScrollTrigger on an 800–1000vh track.
 * Mobile: controlled vertical re-staggers (no pinning) preserving the descent story.
 *
 * Reduced motion: every scene degrades to a fully readable static section
 * (each scene is real semantic HTML, not baked imagery — Phase 6).
 */
export default function Film() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    // Wait for fonts before building scenes — brief mandates; prevents
    // layout shift breaking scrub timing once serif arrives.
    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      document.body.dataset.ready = "true";
      ScrollTrigger.refresh();
    };
    if (document.fonts && (document.fonts as any).ready) {
      (document.fonts as any).ready.then(reveal);
    } else {
      reveal();
    }

    const onChange = () => setTimeout(() => ScrollTrigger.refresh(), 200);
    window.addEventListener("resize", onChange);
    mq.mobile?.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onChange);
      mq.mobile?.removeEventListener("change", onChange);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Nav />
      <Loader />
      <main id="film" aria-label="ORRERY CALIBRE ONE — Inside the Movement">
        <Scene01Hero />
        <Scene02Crystal />
        <Scene03Beat />
        <Scene04Craft />
        <Scene05Spec />
        <Scene06Glow />
        <Scene07CTA />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-120vh",
            left: 0,
            right: 0,
            height: "20vh",
            background:
              "radial-gradient(ellipse at center bottom, var(--case-black), transparent 70%)",
          }}
        />
      </main>
      <Readout />
    </>
  );
}
