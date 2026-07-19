"use client";

import { useEffect, useState } from "react";

/**
 * Persistent technical readout that comes online after Scene 03 and travels with
 * the viewer through subsequent scenes — like a chronometer certificate's
 * bottom corner carrying the spec forward. Apple lens: same unit everywhere.
 *
 * Status is conveyed by numerals + label (color-independent), per Phase 7.
 */
export default function Readout() {
  const [vph, setVph] = useState("—");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVph("28,800");
      return;
    }

    const onScroll = () => {
      const doc = document.documentElement;
      const H = doc.scrollHeight - window.innerHeight;
      const p = H > 0 ? window.scrollY / H : 0;
      setProgress(p);
      // The watch ticks after scene 03 confirms 28,800.
      const scene03Bottom =
        (document.getElementById("scene-03")?.offsetTop ?? Infinity) +
        (document.getElementById("scene-03")?.offsetHeight ?? 0);
      if (window.scrollY + window.innerHeight * 0.5 > scene03Bottom) {
        setVph("28,800");
      } else {
        setVph("—");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="readout"
      style={{
        position: "fixed",
        bottom: "calc(var(--gutter-y) * 0.6)",
        right: "var(--gutter-x)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
        pointerEvents: "none",
        opacity: vph === "—" ? 0 : 1,
        transition: "opacity 320ms var(--ease-precise)",
        mixBlendMode: "difference",
        color: "var(--dial-ivory)",
      }}
    >
      <span
        className="label mono"
        style={{ color: "var(--plate-steel)", fontSize: "clamp(11px, 1.1vw, 14px)", letterSpacing: "0.12em" }}
      >
        CAL. C1 · {vph} VPH
      </span>
      <span
        className="mono"
        style={{ color: "inherit", fontSize: "clamp(11px, 1.1vw, 14px)", opacity: 0.6 }}
      >
        {(progress * 100).toFixed(0).padStart(3, "0")}%
      </span>
    </div>
  );
}
