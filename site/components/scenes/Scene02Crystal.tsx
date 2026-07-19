"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isDesktop, isReduced } from "./useResponsiveTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 02 — THROUGH THE CRYSTAL
 * Invert to Dial Ivory. Layered glass/dial planes at shifting depths, hour
 * markers as geometry, measurement lines and tolerances in the margins.
 *
 * Scrolling assembles "EVERY SECOND / IS EARNED, / NOT ASSUMED".
 * Enlarge the final marker into a mask revealing the next dark scene.
 */
export default function Scene02Crystal() {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const assemble = useRef<HTMLDivElement>(null);
  const mask = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || isReduced()) return;

    const ctx = gsap.context(() => {
      const lines = assemble.current
        ? (assemble.current as HTMLElement).querySelectorAll('[data-stack-line]')
        : [];
      const planes = stack.current
        ? (stack.current as HTMLElement).querySelectorAll('[data-plane]')
        : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=220%",
          scrub: 0.9,
          pin: isDesktop(),
          pinSpacing: isDesktop(),
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        planes,
        { yPercent: () => (Math.random() * 30 - 15), opacity: 0.1, scale: 0.95 },
        {
          yPercent: (i) => i * -4,
          opacity: (i) => 0.12 + i * 0.12,
          scale: 1,
          ease: "none",
          stagger: 0.05,
        },
        0
      );

      tl.fromTo(
        lines,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", ease: "none", stagger: 0.08 },
        0.2
      );

      tl.to(
        mask.current,
        { scale: 14, transformOrigin: "50% 50%", ease: "none", duration: 0.4 },
        0.65
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="scene-02"
      aria-label="Through the crystal"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--dial-ivory)",
        color: "var(--case-black)",
        overflow: "hidden",
      }}
    >
      {/* Tolerance fine-print header strip — wraps above on mobile, two-col
          on desktop corners. Never overlaps the headline. */}
      <div
        aria-hidden="true"
        className="scene-02-tols"
        style={{
          position: "absolute",
          top: "var(--gutter-y)",
          left: "var(--gutter-x)",
          right: "var(--gutter-x)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "1rem 1.5rem",
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        {[
          "TOL. ±2µM",
          "CRYSTAL · BOX SAPPHIRE",
          "ATM 10 / 100M",
          "ANTI-REFLECTIVE 4-LAYER",
        ].map((t, i) => (
          <span
            key={i}
            className="label mono"
            style={{
              fontSize: "var(--fs-xxs)",
              color: "var(--case-black)",
              opacity: 0.55,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Layered planes sharing the marker geometry from Scene 01 —
          desktop only. On mobile, hidden so type has the whole screen. */}
      <div
        ref={stack}
        aria-hidden="true"
        className="scene-02-stack"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            data-plane
            style={{
              position: "absolute",
              width: "min(38vw, 56vh)",
              aspectRatio: "1",
              transform: "translateZ(0)",
              border: `${1 + i * 0.3}px solid var(--case-black)`,
              opacity: 0.12 + i * 0.12,
              borderRadius: "50%",
            }}
          />
        ))}
        <svg
          width="min(34vw, 50vh)"
          height="min(34vw, 50vh)"
          style={{ position: "absolute" }}
          viewBox="0 0 600 600"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const r1 = 200;
            const r2 = 230;
            const x1 = 300 + Math.cos(a) * r1;
            const y1 = 300 + Math.sin(a) * r1;
            const x2 = 300 + Math.cos(a) * r2;
            const y2 = 300 + Math.sin(a) * r2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--case-black)"
                strokeWidth="1.2"
                data-plane
                opacity="0.55"
              />
            );
          })}
        </svg>
      </div>

      {/* Headline assembly — top-aligned after the tolerance strip, never
          center-of-screen on top of the dial center axis. */}
      <div
        ref={assemble}
        className="scene-02-headline"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding:
            "calc(var(--gutter-y) * 2.4) var(--gutter-x) var(--gutter-y)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "1.5rem",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 11vw, 12rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            maxWidth: "min(100%, 22ch)",
          }}
        >
          <span data-stack-line style={{ display: "block" }}>EVERY SECOND</span>
          <span data-stack-line style={{ display: "block" }}>IS EARNED,</span>
          <span
            data-stack-line
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.875rem, 2.4vw, 2.25rem)",
              fontWeight: 500,
              letterSpacing: "0.08em",
              marginTop: "0.75rem",
            }}
          >
            NOT ASSUMED.
          </span>
        </h2>
      </div>

      <div
        ref={mask}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "8px",
          height: "8px",
          transform: "translate(-50%,-50%) scale(1)",
          background: "var(--case-black)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </section>
  );
}
