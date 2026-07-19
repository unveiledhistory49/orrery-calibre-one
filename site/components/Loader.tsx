"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Loader — crown rotates, hands sweep from scattered to 12:00, wordmark
 * locks into place beneath "CALIBRE ONE." Transform the hands' final
 * position directly into the hero composition. Max 1.5s.
 *
 * Reduced-motion: skip the animation; show wordmark immediately.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const crown = useRef<SVGSVGElement>(null);
  const min = useRef<SVGGElement>(null);
  const hr = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(el, { autoAlpha: 0 });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => {
            el.style.pointerEvents = "none";
            el.style.display = "none";
          },
        });
      },
    });

    tl.fromTo(
      crown.current,
      { rotate: -120, transformOrigin: "50% 50%" },
      { rotate: 0, duration: 0.9, ease: "power3.out" },
      0
    )
      .fromTo(
        [min.current, hr.current],
        { rotate: 240, transformOrigin: "50% 50%" },
        { rotate: 0, duration: 0.7, ease: "power2.out", stagger: 0.05 },
        0.05
      )
      .fromTo(
        el.querySelectorAll("[data-word]"),
        { yPercent: 60, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.06,
        },
        0.55
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        background: "var(--case-black)",
        color: "var(--dial-ivory)",
      }}
    >
      <svg
        ref={crown}
        width="104"
        height="104"
        viewBox="0 0 104 104"
        aria-hidden="true"
      >
        <circle
          cx="52"
          cy="52"
          r="50"
          fill="none"
          stroke="var(--plate-steel)"
          strokeWidth="1"
        />
        <circle
          cx="52"
          cy="52"
          r="46"
          fill="none"
          stroke="var(--plate-steel)"
          strokeWidth="0.5"
          strokeDasharray="1 3"
          opacity="0.6"
        />
        <g ref={hr}>
          <rect
            x="51"
            y="20"
            width="2"
            height="34"
            fill="var(--dial-ivory)"
          />
        </g>
        <g ref={min}>
          <rect
            x="51.4"
            y="12"
            width="1.2"
            height="42"
            fill="var(--brass)"
          />
        </g>
        <circle cx="52" cy="52" r="3" fill="var(--dial-ivory)" />
        <circle cx="52" cy="52" r="1.2" fill="var(--case-black)" />
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          data-word
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-xs)",
            letterSpacing: "var(--track)",
            textTransform: "uppercase",
            color: "var(--plate-steel)",
          }}
        >
          CALIBRE ONE
        </span>
        <span
          data-word
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          ORRERY
        </span>
      </div>
    </div>
  );
}
