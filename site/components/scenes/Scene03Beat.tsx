"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isDesktop, isReduced } from "./useResponsiveTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 03 — THE BEAT
 * Return to Case Black. Pin the scene while vertical scroll drives a
 * progressively building number, certificate-reveal style:
 *   2 → 28 → 28,8 → 28,800
 * Label beneath: VIBRATIONS PER HOUR.
 * Loosely sync scroll-scrub pacing to an 8-beats-per-second rhythm.
 *
 * Includes "8 BEATS PER SECOND / ZERO ROOM FOR ERROR".
 * Collapse the full number into a small technical readout carried forward.
 */
export default function Scene03Beat() {
  const root = useRef<HTMLElement>(null);
  const bigNumber = useRef<HTMLSpanElement>(null);
  const beatBars = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || isReduced()) return;

    const ctx = gsap.context(() => {
      const stages = ["2", "28", "28,8", "28,800"];
      const proxy = { v: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          scrub: 1.0,
          pin: isDesktop(),
          pinSpacing: isDesktop(),
          invalidateOnRefresh: true,
        },
      });

      // Progress 0..1 across the pinned scene maps to discrete number stages.
      // Eight beats per second: 8 "frames" beat lightly across the scene,
      // shown as a small bar sequence near the label — pacing motif only.
      tl.to(proxy, {
        v: stages.length - 1 + 0.001,
        duration: 1,
        ease: "none",
        onUpdate: () => {
          const stage = Math.min(stages.length - 1, Math.floor(proxy.v + 0.0001));
          if (bigNumber.current) {
            bigNumber.current.textContent = stages[stage];
          }
          if (beatBars.current) {
            const bars = beatBars.current.children;
            const beatsVisible = Math.round((proxy.v / (stages.length - 1)) * 8);
            for (let i = 0; i < bars.length; i++) {
              (bars[i] as HTMLElement).style.opacity = i < beatsVisible ? "1" : "0.18";
              (bars[i] as HTMLElement).style.transform = i < beatsVisible ? "scaleY(1)" : "scaleY(0.25)";
            }
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="scene-03"
      aria-label="The beat — 28,800 vibrations per hour"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--case-black)",
        color: "var(--dial-ivory)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          padding: "var(--gutter-y) var(--gutter-x)",
        }}
      >
        <span className="label mono" style={{ color: "var(--plate-steel)" }}>
          MEASURE
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.5rem",
          }}
        >
          <span
            ref={bigNumber}
            className="mono"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 18rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "var(--dial-ivory)",
            }}
          >
            2
          </span>
        </div>
        <p
          className="label"
          style={{
            margin: 0,
            color: "var(--plate-steel)",
            fontSize: "var(--fs-sm)",
          }}
        >
          VIBRATIONS PER HOUR
        </p>

        <div
          ref={beatBars}
          aria-hidden="true"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 6px)",
            gap: "6px",
            marginTop: "2.5rem",
            alignItems: "end",
            height: "32px",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "6px",
                height: "32px",
                background: "var(--plate-steel)",
                transform: "scaleY(0.25)",
                transformOrigin: "bottom",
                opacity: 0.18,
                transition: "opacity 200ms var(--ease-precise), transform 200ms var(--ease-precise)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "2rem",
            color: "var(--plate-steel)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span className="label mono">8 BEATS PER SECOND</span>
          <span className="label mono">ZERO ROOM FOR ERROR</span>
        </div>
      </div>
    </section>
  );
}
