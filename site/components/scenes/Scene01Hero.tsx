"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isDesktop, isReduced } from "./useResponsiveTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 01 — HERO
 * Case Black. Watch face enormous and slightly cropped. Hands sweep subtly
 * (real-time feeling, not decorative spin). Metadata reveals through
 * clipped wipes; the dial recedes and the crystal edge becomes a horizontal
 * line leading into Scene 02.
 *
 * Hero is asymmetric — 20–35vw display size, tight leading, never a centered
 * headline/subhead/button stack (Phase 1 AI-look + brief).
 */
export default function Scene01Hero() {
  const root = useRef<HTMLElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const sweep = useRef<SVGGElement>(null);
  const wipe = useRef<HTMLDivElement>(null);
  const metalineWrap = useRef<HTMLDivElement>(null);
  const descentCue = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || isReduced()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=200%",
          scrub: 0.8,
          pin: isDesktop(),
          pinSpacing: isDesktop(),
          invalidateOnRefresh: true,
        },
      });

      // Watch face recedes slightly + asym hand rotation as viewer "descends".
      tl.fromTo(
        face.current,
        { scale: 1.04, yPercent: 0 },
        { scale: 0.9, yPercent: -6, ease: "none" },
        0
      );
      tl.to(
        sweep.current,
        { rotate: "+=8", transformOrigin: "50% 50%", ease: "none" },
        0
      );

      tl.fromTo(
        metalineWrap.current
          ? (metalineWrap.current as HTMLElement).querySelectorAll("[data-meta]")
          : [],
        { clipPath: "inset(0 0 100% 0)", yPercent: 8, autoAlpha: 0 },
        { clipPath: "inset(0 0 0% 0)", yPercent: 0, autoAlpha: 1, stagger: 0.06, ease: "none" },
        0.05
      );

      // Final wipe: the dial edge becomes a horizontal line.
      tl.to(wipe.current, { scaleY: 1, transformOrigin: "50% 50%", ease: "none" }, 0.55);
      tl.to(descentCue.current, { autoAlpha: 0, duration: 0.1 }, 0.45);

      tl.to(
        sweep.current,
        { rotate: "+=6", duration: 0.18, ease: "power2.out" },
        0
      );
      tl.to(sweep.current, { duration: 5.82, ease: "none" }, ">0");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="scene-01"
      aria-label="Hero — Calibre One"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--case-black)",
        color: "var(--dial-ivory)",
        overflow: "hidden",
      }}
    >
      {/* Watch face — anchored to the right, dimmed so type wins. On mobile it
          slips to the upper-right corner with low opacity, never under the text. */}
      <div
        ref={face}
        aria-hidden="true"
        className="hero-face"
        style={{
          position: "absolute",
          top: "50%",
          right: "-12vw",
          transform: "translateY(-50%)",
          width: "min(72vw, 92vh)",
          aspectRatio: "1",
          pointerEvents: "none",
          opacity: 0.55,
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 600 600"
          width="100%"
          height="100%"
          style={{ display: "block" }}
        >
          <circle cx="300" cy="300" r="298" fill="none" stroke="var(--dial-ivory)" strokeWidth="1" opacity="0.18" />
          <circle cx="300" cy="300" r="240" fill="none" stroke="var(--plate-steel)" strokeWidth="0.6" opacity="0.45" />
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
            const r1 = 230;
            const r2 = i % 5 === 0 ? 210 : 220;
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
                stroke={i % 5 === 0 ? "var(--dial-ivory)" : "var(--plate-steel)"}
                strokeWidth={i % 5 === 0 ? 2 : 0.5}
                opacity={i % 5 === 0 ? 0.7 : 0.35}
              />
            );
          })}
          {[[0, "12"], [3, "03"], [6, "06"], [9, "09"]].map(([pos, n]) => {
            const a = ((Number(pos) / 12) * Math.PI * 2) - Math.PI / 2;
            const r = 180;
            const x = 300 + Math.cos(a) * r;
            const y = 300 + Math.sin(a) * r;
            return (
              <text
                key={pos}
                x={x}
                y={y + 6}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="18"
                fill="var(--dial-ivory)"
                opacity="0.55"
              >
                {n}
              </text>
            );
          })}
          <g ref={sweep} style={{ transformOrigin: "300px 300px" }}>
            <line x1="300" y1="300" x2="300" y2="160" stroke="var(--dial-ivory)" strokeWidth="2.4" strokeLinecap="square" opacity="0.8" />
          </g>
          <line x1="300" y1="300" x2="300" y2="110" stroke="var(--plate-steel)" strokeWidth="1.4" strokeLinecap="square" opacity="0.7" />
          <circle cx="300" cy="300" r="6" fill="var(--case-black)" stroke="var(--dial-ivory)" strokeWidth="1" />
        </svg>
      </div>

      {/* Asymmetric hero type — top-left anchored, never centered */}
      <div
        className="hero-type"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(96px, 12vh, 140px) var(--gutter-x) var(--gutter-y)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          alignContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1.5rem",
          }}
        >
          <span className="label mono">REF. NO. C1-039-TI</span>
          <span className="label mono" aria-hidden="true">CAL. ONE</span>
        </header>

        <div ref={metalineWrap} className="hero-type-stack">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(3rem, 11vw, 13rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            <span data-meta style={{ display: "block" }}>ORRERY</span>
            <span
              data-meta
              style={{
                display: "block",
                color: "var(--plate-steel)",
                fontStyle: "normal",
                fontSize: "clamp(2.25rem, 7vw, 9rem)",
              }}
            >
              CALIBRE ONE
            </span>
          </h1>
          <p
            data-meta
            className="label"
            style={{ marginTop: "2rem", color: "var(--plate-steel)", fontSize: "var(--fs-sm)" }}
          >
            A MOVEMENT MADE, NOT ASSUMED
          </p>
          <p data-meta className="label mono" style={{ marginTop: "0.5rem", color: "var(--plate-steel)" }}>
            39MM · TITANIUM · IN-HOUSE MOVEMENT
          </p>
        </div>

        <div
          ref={descentCue}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "1rem",
          }}
        >
          <span className="label mono" aria-hidden="true">
            SCROLL TO DESCEND ↓
          </span>
          <span className="label mono" aria-hidden="true">01 / 07</span>
        </div>
      </div>

      {/* Crystal-edge horizontal line that becomes the wipe into Scene 02 */}
      <div
        ref={wipe}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 0,
          transform: "scaleY(0)",
          background: "var(--dial-ivory)",
          zIndex: 3,
        }}
      />
    </section>
  );
}
