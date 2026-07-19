"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINKS = [
  { id: "scene-01", label: "01 MOVEMENT" },
  { id: "scene-04", label: "02 CRAFT" },
  { id: "scene-05", label: "03 SPEC" },
];

/**
 * Minimal fixed nav — orrery-ui-spec. Updates color with theme progression
 * (ivory on dark scenes, black on ivory scenes) and active marker with scroll.
 */
export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [theme, setTheme] = useState<"dark" | "ivory" | "glow">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const guard = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodesById: Record<string, HTMLElement | null> = {};
    LINKS.forEach((l) => (nodesById[l.id] = document.getElementById(l.id)));

    const sts: ScrollTrigger[] = [];
    let luminance = "dark";

    const syncTheme = (st: ScrollTrigger) => {
      const cosine = (st as any).progress;
      luminance = cosineCurrentScene(luminanceProgress());
      setTheme(luminance === "ivory" ? "ivory" : "dark");
    };

    // Map scroll position to the current dominant theme.
    function luminanceProgress(): string {
      const top = window.scrollY || 0;
      // Scene-by-scene background map.
      const doc = document.documentElement;
      const H = doc.scrollHeight - window.innerHeight;
      const p = H > 0 ? top / H : 0;
      // 00–01 black, 02 ivory, 03 black, 04 black, 05 black, 06 glow, 07 black
      if (p < 0.14) return "dark";
      if (p < 0.24) return "ivory";
      if (p < 0.92) return "dark";
      if (p < 0.97) return "glow";
      return "dark";
    }

    function cosineCurrentScene(s: string) {
      return s;
    }

    syncTheme as any;
    cosineCurrentScene as any;

    let ticking = false;
    const onScroll = () => {
      if (ticking || reduce) return;
      ticking = true;
      guard.current = requestAnimationFrame(() => {
        ticking = false;
        // Active link = the scene whose midpoint is closest to viewport center.
        let best: string | null = null;
        let bestDist = Infinity;
        const viewCenter = window.scrollY + window.innerHeight * 0.5;
        for (const l of LINKS) {
          const el = nodesById[l.id];
          if (!el) continue;
          const cx = el.offsetTop + el.offsetHeight * 0.5;
          const d = Math.abs(cx - viewCenter);
          if (d < bestDist) {
            bestDist = d;
            best = l.id;
          }
        }
        if (best && best !== active) setActive(best);
        setTheme(luminanceProgress() as any);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      sts.forEach((s) => s.kill());
      cancelAnimationFrame(guard.current);
    };
  }, [active]);

  const onClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setMobileOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.scrollIntoView();
      return;
    }
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -1 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const shortLabels: Record<string, string> = {
    "01 MOVEMENT": "MOVEMENT",
    "02 CRAFT": "CRAFT",
    "03 SPEC": "SPEC",
  };

  return (
    <>
      <nav
        aria-label="Primary"
        data-theme={theme}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          padding: "20px var(--gutter-x)",
          mixBlendMode: theme === "glow" ? "normal" : "difference",
          color: "var(--dial-ivory)",
          pointerEvents: "none",
        }}
      >
        <a
          href="#scene-01"
          onClick={(e) => {
            e.preventDefault();
            onClick("scene-01");
          }}
          style={{
            pointerEvents: "auto",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.2,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          ORRERY
        </a>

        {/* Desktop/tablet links — single inline row, hidden on mobile */}
        <ul
          className="nav-desktop"
          aria-hidden={mobileOpen ? "true" : undefined}
          style={{
            listStyle: "none",
            display: "flex",
            gap: "clamp(16px, 2.5vw, 36px)",
            margin: 0,
            padding: 0,
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(l.id);
                }}
                aria-current={active === l.id ? "true" : undefined}
                style={{
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "var(--track)",
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                  padding: "2px 0 6px",
                  opacity: active === l.id ? 1 : 0.55,
                  color: "inherit",
                  position: "relative",
                  display: "inline-block",
                  transition: "opacity 240ms var(--ease-precise)",
                }}
              >
                <span>{l.label}</span>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    height: "1px",
                    width: active === l.id ? "100%" : "0%",
                    background: "var(--brass)",
                    transition: "width 320ms var(--ease-out-mech)",
                  }}
                />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#scene-07"
              onClick={(e) => {
                e.preventDefault();
                onClick("scene-07");
              }}
              style={{
                fontSize: "var(--fs-xs)",
                letterSpacing: "var(--track)",
                lineHeight: 1.4,
                textTransform: "uppercase",
                color: "inherit",
                opacity: 1,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "2px 0",
                border: "none",
                background: "transparent",
              }}
            >
              RESERVE <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        {/* Mobile RESERVE link + hamburger */}
        <div
          className="nav-mobile"
          style={{
            display: "none",
            pointerEvents: "auto",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <a
            href="#scene-07"
            onClick={(e) => {
              e.preventDefault();
              onClick("scene-07");
            }}
            style={{
              fontSize: "var(--fs-xs)",
              letterSpacing: "var(--track)",
              textTransform: "uppercase",
              color: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            RESERVE <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              pointerEvents: "auto",
              width: "30px",
              height: "30px",
              display: "inline-flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <span style={{ display: "block", height: "1px", width: "24px", background: "currentColor", transition: "transform 220ms var(--ease-precise), opacity 220ms", transform: mobileOpen ? "translateY(3px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", height: "1px", width: "24px", background: "currentColor", transform: mobileOpen ? "translateY(-3px) rotate(-45deg)" : "none", transition: "transform 220ms var(--ease-precise)" }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="nav-drawer"
          role="dialog"
          aria-label="Sections"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(80vw, 320px)",
            background: "var(--case-black)",
            border: "none",
            borderLeft: "1px solid var(--plate-steel)",
            zIndex: 60,
            padding: "6rem var(--gutter-x) 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                onClick(l.id);
              }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 6vw, 2.25rem)",
                color: "var(--dial-ivory)",
                lineHeight: 1.1,
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                opacity: active === l.id ? 1 : 0.6,
              }}
            >
              <span
                className="mono"
                style={{ fontSize: "var(--fs-xxs)", color: "var(--brass)", letterSpacing: "var(--track)" }}
              >
                {shortLabels[l.label] ? l.label.split(" ")[0] : "•"}
              </span>
              <span>{l.label.replace(/^\d+ /, "")}</span>
            </a>
          ))}
          <a
            href="#scene-07"
            onClick={(e) => {
              e.preventDefault();
              onClick("scene-07");
            }}
            style={{
              marginTop: "1rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--plate-steel)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 6vw, 2.25rem)",
              color: "var(--brass)",
              lineHeight: 1.1,
            }}
          >
            RESERVE ↗
          </a>
        </div>
      )}
    </>
  );
}
