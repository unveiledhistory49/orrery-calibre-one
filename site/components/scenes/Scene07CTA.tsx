"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isDesktop, isReduced } from "./useResponsiveTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 07 — FINAL CTA
 * Shrink to a small Brass crown mark + wordmark. Case Black.
 * "ORRERY — CALIBRE ONE / WAITLIST NOW OPEN / [N] pieces per production run."
 * Sharp-edged CTA; on hover, wipe background horizontally and nudge underline
 * 6–8px. End with an oversized cropped crown mark below the viewport.
 *
 * Spotify lens: click resolves with visible confirmation — never silent.
 * Reduced-motion: form still works; "RESERVED" replaces success state plainly.
 */
const RUN_SIZE = 100;

export default function Scene07CTA() {
  const root = useRef<HTMLElement>(null);
  const crown = useRef<SVGSVGElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "reserved" | "error">("idle");

  useEffect(() => {
    const el = root.current;
    if (!el || isReduced()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        crown.current,
        { yPercent: 30, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, ease: "none" },
        0
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting" || status === "reserved") return;
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, ref: "C1-039-TI" }),
      });
      if (!res.ok) throw new Error("reserve failed");
      setStatus("reserved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={root}
      id="scene-07"
      aria-label="Reserve Calibre One"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--case-black)",
        color: "var(--dial-ivory)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "var(--gutter-y) var(--gutter-x)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <svg
          ref={crown}
          width="64"
          height="64"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="var(--brass)" strokeWidth="1" />
          <rect x="31" y="14" width="2" height="20" fill="var(--brass)" />
          <rect x="31.4" y="14" width="1.2" height="26" transform="rotate(60 32 32)" fill="var(--brass)" />
          <circle cx="32" cy="32" r="2" fill="var(--brass)" />
        </svg>

        <p className="label mono" style={{ color: "var(--plate-steel)" }}>
          REF. C1-039-TI
        </p>

        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2rem, 6vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.005em",
          }}
        >
          ORRERY — CALIBRE ONE
        </h2>
        <p
          className="label"
          style={{ color: "var(--brass)", fontSize: "var(--fs-sm)" }}
        >
          WAITLIST NOW OPEN
        </p>
        <p
          className="label mono"
          style={{ color: "var(--plate-steel)" }}
        >
          {RUN_SIZE} PIECES PER PRODUCTION RUN
        </p>

        <form
          onSubmit={onSubmit}
          aria-describedby="cta-status"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1rem",
            width: "min(420px, 92vw)",
          }}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="email"
              inputMode="email"
              required
              aria-label="Email address"
              placeholder="YOUR EMAIL"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              disabled={status === "submitting" || status === "reserved"}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--plate-steel)",
                color: "var(--dial-ivory)",
                padding: "12px 0",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-md)",
                letterSpacing: "0.06em",
                outline: "none",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                height: "1px",
                width: status === "error" ? "100%" : "0%",
                background: "var(--brass)",
                transition: "width 240ms var(--ease-out-mech)",
              }}
            />
          </div>
          <ReserveButton status={status} />
          <p
            id="cta-status"
            role="status"
            aria-live="polite"
            style={{
              minHeight: "1.25rem",
              color:
                status === "reserved"
                  ? "var(--lume)"
                  : status === "error"
                  ? "var(--brass)"
                  : "transparent",
              fontSize: "var(--fs-xs)",
              letterSpacing: "var(--track)",
              textTransform: "uppercase",
            }}
          >
            {status === "reserved"
              ? "RESERVED · YOUR NAME IS ON THE LIST"
              : status === "error"
              ? "THAT DOESN'T LOOK LIKE AN EMAIL. TRY AGAIN."
              : status === "submitting"
              ? "SENDING …"
              : "."}
          </p>
        </form>
      </div>

      {/* Oversized cropped crown mark below the viewport */}
      <svg
        aria-hidden="true"
        width="240vw"
        height="240vw"
        viewBox="0 0 600 600"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translate(-50%, 35%)",
          pointerEvents: "none",
          opacity: 0.05,
        }}
      >
        <circle cx="300" cy="300" r="298" fill="none" stroke="var(--brass)" strokeWidth="0.5" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = 300 + Math.cos(a) * 260;
          const y1 = 300 + Math.sin(a) * 260;
          const x2 = 300 + Math.cos(a) * 230;
          const y2 = 300 + Math.sin(a) * 230;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--brass)" strokeWidth="1" opacity="0.5" />
          );
        })}
      </svg>
    </section>
  );
}

function ReserveButton({ status }: { status: "idle" | "submitting" | "reserved" | "error" }) {
  const wrap = useRef<HTMLButtonElement>(null);

  const disabled = status === "submitting" || status === "reserved";

  return (
    <button
      ref={wrap}
      type="submit"
      disabled={disabled}
      aria-label="Reserve Calibre One"
      style={{
        position: "relative",
        marginTop: "1rem",
        padding: "0",
        display: "inline-block",
        cursor: disabled ? "default" : "pointer",
        isolation: "isolate",
      }}
    >
      {/* Wipe layer — left-to-right on hover */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "0%",
          background: "var(--brass)",
          zIndex: -1,
          transition: "width 380ms var(--ease-out-mech)",
        }}
        data-wipe
      />
      <span
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: "transparent",
          border: "1px solid var(--brass)",
          color: "var(--brass)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-xs)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          position: "relative",
          transition: "color 200ms var(--ease-precise)",
        }}
        onMouseEnter={(e) => {
          if (disabled) return;
          const root = (e.currentTarget as HTMLElement).closest("button");
          if (!root) return;
          const wipe = root.querySelector('[data-wipe]');
          if (wipe) (wipe as HTMLElement).style.width = "100%";
          const underline = root.querySelector('[data-underline]');
          if (underline) (underline as HTMLElement).style.transform = "translateX(7px)";
          e.currentTarget.style.color = "var(--case-black)";
        }}
        onMouseLeave={(e) => {
          if (disabled) return;
          const root = (e.currentTarget as HTMLElement).closest("button");
          if (!root) return;
          const wipe = root.querySelector('[data-wipe]');
          if (wipe) (wipe as HTMLElement).style.width = "0%";
          const underline = root.querySelector('[data-underline]');
          if (underline) (underline as HTMLElement).style.transform = "translateX(0)";
          e.currentTarget.style.color = "var(--brass)";
        }}
      >
        {status === "reserved" ? "RESERVED" : status === "submitting" ? "…" : "RESERVE CALIBRE ONE"}
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            marginLeft: "8px",
            borderBottom: "1px solid currentColor",
            paddingBottom: "1px",
            transform: "translateX(0)",
            transition: "transform 260ms var(--ease-out-mech)",
          }}
        >
          ↗
        </span>
        <span
          data-underline
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "32px",
            right: "32px",
            bottom: "9px",
            height: "1px",
            background: "currentColor",
            opacity: 0,
            transform: "translateX(0)",
            transition: "transform 260ms var(--ease-out-mech)",
          }}
        />
      </span>
    </button>
  );
}
