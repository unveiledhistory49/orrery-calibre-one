"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReduced } from "./useResponsiveTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 05 — SPECIFICATION
 * "CAL. ONE" stationary large on one side. On the other, vertically move
 * aligned spec rows. As each row aligns with the certificate rail, it turns
 * Brass — Brass only appears for hand-finished/aligned/active, per the design
 * rationale. Compress all rows into a single line at the end.
 *
 * Notion lens: a small set of well-designed primitives over freeform layout.
 */
const SPEC: { label: string; value: string }[] = [
  { label: "MOVEMENT", value: "IN-HOUSE CALIBRE C1" },
  { label: "FREQUENCY", value: "28,800 VPH" },
  { label: "POWER RESERVE", value: "70 HOURS" },
  { label: "JEWELS", value: "26" },
  { label: "WATER RESISTANCE", value: "100M" },
  { label: "CASE", value: "39MM BRUSHED TITANIUM" },
];

export default function Scene05Spec() {
  const root = useRef<HTMLElement>(null);
  const rows = useRef<HTMLDivElement>(null);
  const cal = useRef<HTMLSpanElement>(null);
  const compressed = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || isReduced()) return;

    const ctx = gsap.context(() => {
      const rowEls = rows.current
        ? (rows.current as HTMLElement).querySelectorAll('[data-row]')
        : [];
      const valueEls = rows.current
        ? (rows.current as HTMLElement).querySelectorAll('[data-value]')
        : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          scrub: 0.85,
          pin: desktop,
          pinSpacing: desktop,
          invalidateOnRefresh: true,
        },
      });

      // Each row slides up from below, crosses a notional rail (mid-screen),
      // turns Brass as it aligns, then continues. Sequential, certificate-style.
      rowEls.forEach((row, i) => {
        const start = i / SPEC.length;
        const align = start + 1 / SPEC.length;
        tl.fromTo(
          row,
          { yPercent: 120, opacity: 0.2 },
          { yPercent: 0, opacity: 1, ease: "none", duration: 1 / SPEC.length },
          start
        );
        tl.to(
          valueEls[i],
          {
            color: "var(--brass)",
            duration: 0.04,
            ease: "none",
          },
          align
        );
      });

      // Final compression: stack collapses into a single line at the bottom.
      tl.to(
        rows.current,
        {
          yPercent: -10,
          scale: 0.6,
          opacity: 0,
          ease: "none",
          duration: 0.2,
        },
        0.75
      );
      tl.to(
        cal.current,
        { letterSpacing: "0.02em", ease: "none", duration: 0.2 },
        0.75
      );
      tl.fromTo(
        compressed.current,
        { opacity: 0, yPercent: 30 },
        { opacity: 1, yPercent: 0, ease: "none", duration: 0.2 },
        0.78
      );
    }, el);

    return () => ctx.revert();
  }, [desktop]);

  return (
    <section
      ref={root}
      id="scene-05"
      aria-label="Specification"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--case-black)",
        color: "var(--dial-ivory)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: desktop ? "1fr 1fr" : "1fr",
          alignItems: "center",
          padding: "var(--gutter-y) var(--gutter-x)",
          gap: "var(--gutter-x)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: desktop ? "flex-start" : "center",
          }}
        >
          <span
            ref={cal}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(3rem, 12vw, 13rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "var(--dial-ivory)",
            }}
          >
            CAL. ONE
          </span>
        </div>

        <div
          ref={rows}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 1.4vw, 18px)",
            fontSize: "var(--fs-md)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {/* Aligned certificate-style header rules */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--plate-steel)",
              paddingBottom: "8px",
              marginBottom: "12px",
              color: "var(--plate-steel)",
            }}
          >
            <span className="label mono">REF. C1-039-TI</span>
            <span className="label mono">SPECIFICATION</span>
          </div>

          {SPEC.map((row) => (
            <div
              key={row.label}
              data-row
              style={{
                display: "grid",
                gridTemplateColumns: "12ch 1fr",
                gap: "1.5rem",
                alignItems: "baseline",
              }}
            >
              <span
                className="label"
                style={{ color: "var(--plate-steel)", justifySelf: "start" }}
              >
                {row.label}
              </span>
              <span
                data-value
                className="mono"
                style={{
                  justifySelf: "end",
                  color: "var(--dial-ivory)",
                  transition: "color 200ms var(--ease-precise)",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Final compressed single line */}
        <div
          ref={compressed}
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "var(--gutter-y)",
            left: "var(--gutter-x)",
            right: "var(--gutter-x)",
            opacity: 0,
            display: "flex",
            justifyContent: "space-between",
            color: "var(--plate-steel)",
          }}
        >
          <span className="mono" style={{ fontSize: "var(--fs-xxs)" }}>
            C1 · 28,800 VPH · 70H · 26 JEWELS · 100M · 39MM TI
          </span>
          <span className="mono" style={{ fontSize: "var(--fs-xxs)", color: "var(--brass)" }}>
            ✓
          </span>
        </div>
      </div>
    </section>
  );
}
