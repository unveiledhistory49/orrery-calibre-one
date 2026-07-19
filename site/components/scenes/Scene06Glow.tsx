"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isDesktop, isReduced } from "./useResponsiveTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 06 — THE GLOW (CLIMAX)
 * The one large color moment. Near-total darkness. The assembled watch face
 * is barely visible except its lume-treated hands and markers, Lume against
 * Case Black — achieved through darkness + glow, not a flat color fill.
 *
 * Display: "NOT A DISPLAY OF TIME. / TIME YOU CAN FEEL WORKING."
 * Slow ambient light rises until the full watch is legible, then compresses
 * into the wordmark.
 *
 * Reduced-motion: full content legible immediately as static, readable text.
 */
export default function Scene06Glow() {
  const root = useRef<HTMLElement>(null);
  const dial = useRef<HTMLDivElement>(null);
  const lume = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || isReduced()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=240%",
          scrub: 1.0,
          pin: isDesktop(),
          pinSpacing: isDesktop(),
          invalidateOnRefresh: true,
        },
      });

      // Stage 1: only lume plots + lume hands glow on near-total black.
      tl.fromTo(
        lume.current,
        { filter: "brightness(1)", opacity: 1 },
        { filter: "brightness(1.4)", ease: "none", duration: 0.4 },
        0
      );
      tl.set(dial.current, { opacity: 0.05 }, 0);

      // Stage 2: copy reveal — line by line.
      tl.fromTo(
        headline.current && (headline.current as HTMLElement).querySelectorAll('[data-glow-line]')
          ? (headline.current as HTMLElement).querySelectorAll('[data-glow-line]')
          : [],
        { yPercent: 20, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, ease: "none", stagger: 0.08 },
        0.1
      );

      // Stage 3: slow ambient light rises, full watch legible.
      tl.to(
        dial.current,
        { opacity: 1, ease: "none", duration: 0.3 },
        0.55
      );

      // Stage 4: compress into the wordmark — fade everything except wordmark.
      tl.to(
        headline.current && (headline.current as HTMLElement).querySelectorAll('[data-glow-line]')
          ? (headline.current as HTMLElement).querySelectorAll('[data-glow-line]')
          : [],
        {
          fontSize: "var(--fs-md)",
          letterSpacing: "0.4em",
          autoAlpha: 0.2,
          ease: "none",
          stagger: 0.02,
        },
        0.85
      );
      tl.to(dial.current, { scale: 0.5, opacity: 0.0, ease: "none" }, 0.85);
      tl.to(lume.current, { scale: 0.5, opacity: 0, ease: "none" }, 0.85);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="scene-06"
      aria-label="The glow — lume in the dark"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--case-black)",
        color: "var(--dial-ivory)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* The dial, near-invisible in shadow */}
      <div
        ref={dial}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.05,
        }}
      >
        <svg width="min(72vw, 70vh)" height="min(72vw, 70vh)" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="240" fill="none" stroke="var(--dial-ivory)" strokeWidth="1" opacity="0.4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const x = 300 + Math.cos(a) * 230;
            const y = 300 + Math.sin(a) * 230;
            const x2 = 300 + Math.cos(a) * 210;
            const y2 = 300 + Math.sin(a) * 210;
            return (
              <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke="var(--dial-ivory)" strokeWidth="2" opacity="0.5" />
            );
          })}
          <line x1="300" y1="300" x2="300" y2="160" stroke="var(--dial-ivory)" strokeWidth="2" opacity="0.6" />
          <line x1="300" y1="300" x2="430" y2="300" stroke="var(--dial-ivory)" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>

      {/* The lume — applied plots + hands only, glowing in the dark. */}
      <div
        ref={lume}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="min(72vw, 70vh)" height="min(72vw, 70vh)" viewBox="0 0 600 600">
          {/* Lume hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const x = 300 + Math.cos(a) * 230;
            const y = 300 + Math.sin(a) * 230;
            return (
              <circle key={i} cx={x} cy={y} r="6" fill="var(--lume)" style={{
                filter: "drop-shadow(0 0 8px var(--lume))",
              }} />
            );
          })}
          {/* Lume minute hand + hour hand */}
          <g style={{ filter: "drop-shadow(0 0 10px var(--lume))" }}>
            <rect x="297" y="160" width="6" height="150" fill="var(--lume)" />
            <rect x="296" y="300" width="8" height="140" transform="rotate(60 300 300)" fill="var(--lume)" />
          </g>
          <circle cx="300" cy="300" r="6" fill="var(--lume)" style={{ filter: "drop-shadow(0 0 12px var(--lume))" }} />
        </svg>
      </div>

      <div
        style={{
          position: "relative",
          padding: "var(--gutter-y) var(--gutter-x)",
        }}
      >
        <h2
          ref={headline}
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          <span
            data-glow-line
            style={{
              display: "block",
              fontSize: "clamp(2.5rem, 9vw, 10rem)",
              letterSpacing: "-0.01em",
            }}
          >
            NOT A DISPLAY OF TIME.
          </span>
          <span
            data-glow-line
            style={{
              display: "block",
              fontSize: "clamp(2.5rem, 9vw, 10rem)",
              letterSpacing: "-0.01em",
              fontStyle: "italic",
              color: "var(--lume)",
            }}
          >
            TIME YOU CAN FEEL WORKING.
          </span>
        </h2>
      </div>
    </section>
  );
}
