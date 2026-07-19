"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isDesktop, isReduced } from "./useResponsiveTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 04 — CRAFT
 * Three sequential *true* steps (FORGE → FINISH → REGULATE), so "01/02/03"
 * is honest certificate numbering, not decorative AI-feature steps.
 * Expand FORGE's type into structural columns; use those columns as FINISH's
 * negative space; collapse them into the final composition for REGULATE.
 */
const STEPS = [
  {
    n: "01",
    title: "FORGE",
    line: "RAW TITANIUM, MACHINED TO MICRONS.",
  },
  {
    n: "02",
    title: "FINISH",
    line: "GENEVA STRIPES. BLACK-POLISHED BY HAND.",
  },
  {
    n: "03",
    title: "REGULATE",
    line: "ADJUSTED IN SIX POSITIONS BEFORE IT EARNS ITS CASE.",
  },
] as const;

export default function Scene04Craft() {
  const root = useRef<HTMLElement>(null);
  const colWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || isReduced()) return;

    const ctx = gsap.context(() => {
      const columns = colWrap.current
        ? (colWrap.current as HTMLElement).querySelectorAll('[data-col]')
        : [];
      const titles = el.querySelectorAll('[data-title]');
      const lines = el.querySelectorAll('[data-body]');
      const numbers = el.querySelectorAll('[data-num]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=320%",
          scrub: 0.85,
          pin: isDesktop(),
          pinSpacing: isDesktop(),
          invalidateOnRefresh: true,
        },
      });

      // 01 / FORGE — type expands into structural columns.
      tl.fromTo(
        titles[0],
        { fontSize: "clamp(3rem, 14vw, 16rem)", letterSpacing: "0em", opacity: 0 }
        , { opacity: 1, duration: 0.05 }, 0
      );
      tl.fromTo(
        titles[0],
        { fontSize: "clamp(3rem, 14vw, 16rem)", letterSpacing: "0em" },
        { fontSize: "clamp(2rem, 8vw, 9rem)", letterSpacing: "0.4em", ease: "none" },
        0
      );
      tl.fromTo(lines[0], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.15);
      tl.fromTo(numbers[0], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0);

      // Out FORGE / in FINISH — columns become the negative space.
      tl.to(titles[0], { opacity: 0, duration: 0.05 }, 0.32);
      tl.to(lines[0], { opacity: 0, duration: 0.05 }, 0.32);
      tl.fromTo(columns, { opacity: 0, scaleX: 0.02 }, { opacity: 1, scaleX: 1, ease: "none", duration: 0.12 }, 0.34);

      tl.fromTo(titles[1], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.4);
      tl.fromTo(lines[1], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.5);
      tl.fromTo(numbers[1], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.4);

      // Out FINISH / in REGULATE — columns collapse into the composition.
      tl.to(columns, { scaleX: 0.04, opacity: 0, ease: "none", duration: 0.12 }, 0.66);
      tl.to(titles[1], { opacity: 0, duration: 0.05 }, 0.66);
      tl.to(lines[1], { opacity: 0, duration: 0.05 }, 0.66);

      tl.fromTo(titles[2], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.74);
      tl.fromTo(lines[2], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.84);
      tl.fromTo(numbers[2], { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.74);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="scene-04"
      aria-label="Craft — forge, finish, regulate"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--case-black)",
        color: "var(--dial-ivory)",
        overflow: "hidden",
      }}
    >
      {/* Structural columns — emerge as FORGE expands; become FINISH's negative
          space; collapse into REGULATE. Single, reused geometry across steps. */}
      <div
        ref={colWrap}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(var(--cols, 6), 1fr)",
          gap: "1px",
          background: "transparent",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            data-col
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              background: "var(--case-black)",
              borderRight: "1px solid var(--plate-steel)",
              opacity: 0,
              transform: "scaleX(0.02)",
              transformOrigin: "left",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "var(--gutter-y) var(--gutter-x)",
        }}
      >
        {STEPS.map((s) => (
          <article
            key={s.n}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span data-num className="label mono" style={{ color: "var(--brass)" }}>
              {s.n}
            </span>
            <h2
              data-title
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(3rem, 14vw, 16rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.9,
              }}
            >
              {s.title}
            </h2>
            <p
              data-body
              className="label"
              style={{
                margin: "1rem 0 0",
                color: "var(--plate-steel)",
                fontSize: "var(--fs-sm)",
              }}
            >
              {s.line}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
