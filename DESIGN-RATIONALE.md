# ORRERY — CALIBRE ONE — Design rationale

A record of the frontend-design skill's eight phases applied to `orrery-ui-spec.md`.
Every decision traces back to either the brief's own words or the skill's gates.

---

## Phase 0 — Discovery (stated, not assumed)

1. **What is this, concretely?** A launch website for *ORRERY — CALIBRE ONE*, a small-batch 39mm titanium mechanical watch with an in-house movement, built as one scroll-controlled cinematic descent through the movement's layers — crystal → dial → hands → plate → gear train → escapement → balance wheel — ending in the assembled, ticking watch.

2. **Who is it for, and how do they relate to this category?** A first-time visitor evaluating trust — likely a watch enthusiast or collector encountering an unknown independent maker. They are reading the site the way they'd case-back inspect a movement at a boutique: looking for evidence of handwork, tolerances, regulation, and intent. They distrust marketing language and trust numbers, finishing names, and provenance.

3. **What is the page or product's one job?** To convert an undecided enthusiast into a waitlist reservation by making the watch's *making* the proof of its value — descent through the movement is the argument, not a sales conceit.

4. **What does the default look like in this category?** A near-black page with one acid-green or vermilion accent (the AI-safe-aesthetic-b from the skill), centered high-contrast serif hero, a 3D watch render slowly rotating in the middle, "Add to waitlist" button under it, a 3- or 4-card features grid below ("Swiss made / In-house / Limited / Hand-finished"), bento spec tiles, a grayscale "as seen in" press row. That is exactly the templated median to refuse.

5. **What is the subject's own material world?** Watchmaking's real objects and vernacular: chronometer certificates with tabular figures, tolerances in microns, Geneva-stripe finishes, black-polished screw heads, balance wheels oscillating at a regulated beat, case-back engravings, regulator indexes, lume plots glowing in the dark, crown wind action. The certificate — columns of right-aligned tabular numerals, fine-print tolerances in the margins, uppercase reference labels — is the single richest source of structure.

6. **Where will the one deliberate risk live?** The **lume climax in scene 06** — the only large color moment on an otherwise restrained page, achieved by darkness + glow rather than color fill. Around it: pure typography and motion, no render crutch, no card grids.

7. **What constraints already exist?** Next.js + React + TypeScript + GSAP ScrollTrigger + restrained Lenis. Specific hex tokens in the brief (Case Black, Dial Ivory, Plate Steel, Brass, Lume). Specific copy. Specific scenes. The brief's own words always win.

**Effort calibration.** Customer-facing, brand-facing, portfolio-facing → full eight-phase ritual, no shortcuts.

---

## Phase 1 — Recognize and refuse the AI look

Patterns the brief already forbids explicitly (and I confirm I will not produce):
- Gradient hero, glassmorphism, glowing neon orbs → STRICTLY AVOID list.
- Literal 3D watch render as crutch → STRICTLY AVOID list.
- Bento grids, rounded floating cards, generic stat widgets → STRICTLY AVOID list.
- Constant fade-up-on-scroll with no relationship to movement concept → STRICTLY AVOID list.
- Reusing letter-as-portal / single-glyph-hero conceit → STRICTLY AVOID list.

Patterns the brief tolerates only because they serve the subject (not as defaults):
- "01 / 02 / 03" in scene 04 — explicitly reserved for the FORGE / FINISH / REGULATE sequence because those genuinely *are* sequential steps in regulating a movement, so the numbered form is honest, not decorative.
- Near-black background with a single accent (Lume) — this is the skill's AI-safe-aesthetic-b. Used here because a dark-room lume glow is the literal subject matter of scene 06; never as a default page-wide treatment. Brass appears only to mark objects that were hand-finished or are currently active.

Patterns I will not add even though they're tempting:
- No grayscale "Trusted by" logo row — the waitlist number is the proof.
- No testimonial carousel — the spec sheet is the testimonial.
- No four-column footer — minimal fixed nav only, per brief.
- No fake film-grain overlay indiscriminately applied.

---

## Phase 2 — Ground it in the subject's real world

The two richest real-world objects in watchmaking for this brief:

**The chronometer certificate.** A sheet of cream or white paper covered in right-aligned tabular numerals — frequency in VPH, jewels, power reserve in hours, reference number — separated by hairline rules and framed by small uppercase reference marks in the margins. Numbers don't float; they align column-by-column because that's what a certificate does. This generates the layout for scene 05 (spec) and the structure of the nav (REF. NO./CAL./VPH labels) and the persistent technical readout in the corner after scene 03.

**The dark-room lume test.** Watches with lume are inspected by a watchmaker in near-total darkness — case closed, room dark, only the applied lume plots and hands glow. That real inspection ritual is the source of scene 06. The climax is not "let's add a glow effect" — it's *reproducing a real verification that a watchmaker actually performs*.

**Secondary vernacular:** hairlines brushed across steel (the Plate Steel token reads as a brushed-steel hairline, used only for rules, hairlines, and secondary text — never as a fill); Geneva stripes (the source of the "FINISH" scene's name and the reason Brass is reserved for "hand-finished" — it's the color of the actual stripes); the regulator's beat rhythm (8 beats/sec at 28,800 VPH — the source of the scroll-scrub pacing motif in scene 03).

**Signature in one sentence:** The site is structured like a chronometer certificate that the viewer descends through — hand-finishing and timekeeping-as-argument replace the usual e-commerce feature stack — and the one moment color is allowed to be loud is the moment a real watchmaker would actually see color: lume in the dark.

---

## Phase 3 — Build the token system

### Pass one — draft plan

**Color (the five from the brief, each with a stated role):**
```
--case-black   #111214  primary dark surface, case-back
--dial-ivory   #EDE4D2  warm light surface (dial), never cool white
--plate-steel  #84867F  hairlines, rules, structural dividers, secondary text
--brass        #B08D57  rare metallic accent; ONLY active states, hand-finished details, key numerals as they align
--lume         #7FE3C4  one climax color; ONLY scene 06's glow — earned, not decorative
```
90% of pixels are Case Black / Dial Ivory / Plate Steel. Brass and Lume appear only when the brief says they do.

Surface modes:
- Theme progression governs background: Black (00, 01) → Ivory (02) → Black (03, 04, 05) → near-total Black + Lume glow (06) → quiet Black (07).

**Type (three roles, none of them the AI default):**
- Display: a high-contrast serif. **Fraunces** (variable, free, optical-size-aware, evokes engraved dial typography without licensing Canela/Reckless Neue). Loaded via `next/font/google` as `Fraunces`. Used only for statement headlines (`ORRERY`, `CALIBRE ONE`, `EVERY SECOND / IS EARNED`, `NOT A DISPLAY OF TIME.`, etc.) — never for body, never for labels.
- UI/labels: a precise geometric sans. **Inter Tight** is rejected (it's the AI default) — I'll use **Geist** (Vercel's open grotesk, geometric, free via `next/font/google`) for nav, small-caps labels, body copy. Used for everything that isn't a display headline or a numeral.
- Numerals: **IBM Plex Mono** with tabular figures, for *every* number on the site (28,800; 70 hours; 26; 100M; 39MM; REF. C1-039-TI; per-second beat counter). Numbers align like a chronometer certificate.

No Inter-as-the-only-typeface situation. No two roles sharing one face.

**Layout:**
- A single scroll-driven film, ~800–1000vh, composed of pinned scenes on desktop and controlled vertical re-staggers on mobile.
- No section nav rail, no footer. A single minimal fixed nav (ORRERY / 01 MOVEMENT / 02 CRAFT / 03 SPEC / RESERVE ↗).
- Each scene reuses the previous scene's geometry (hour markers → grid lines, hands → wipes, columns → negative space) rather than crossfading.
- Hero: 20–35vw asymmetric, tight leading, never centered headline/subhead/button stack.

ASCII for the desktop pinned-film structure:
```
┌─ viewport (100vh, sticky) ─┐  outer track 800–1000vh
│  fixed nav       ┐          │
│                  ↓          │
│   scene layer (reused       │
│   marker geometry,          │
│   pinned & scrubbed)        │
│   persistent readout        │
│   (VPH) in corner           │
└─────────────────────────────┘
```

**Signature:** The lume climax in scene 06 — the one large color moment — produced by darkness and the real watchmaker's dark-room inspection, not a gradient or color fill.

### Pass two — critique before building

| Decision | Generic default for "luxury watch site"? | Specific to this subject? | Verdict |
|---|---|---|---|
| Case Black `#111214` not pure `#000` | Default would be true black | Specific — case-backs aren't pure black, slightly warm-neutral | keep |
| Dial Ivory `#EDE4D2` not white | Default would be `#FFFFFF` | Specific — real dials read warm ivory, evokes lacquered dial | keep |
| Plate Steel hairlines only at ~1px | Default would be 2-3px borders + card shadows | Specific — brushed-steel hairline is the real material; no shadows anywhere | keep |
| Brass only for hand-finished/active | Default would use gold as a generic accent everywhere | Specific — Brass is the color of Geneva stripes and polished screw heads | keep |
| Lume used once, in the dark-room scene | Default would put a teal/cyan accent across the page | Specific — replicates a real watchmaker's dark-room lume test | keep |
| Fraunces serif display | Default would be a single grotesk | Specific — engraved-dial heritage, contrasted with system sans + mono | keep |
| Numbers in IBM Plex Mono tabular | Default would put numerals in the body sans | Specific — chronometer certificate alignment | keep |
| No 3D render; pure type + motion | Default would be a 3D watch slowly rotating | Specific — descent-through-the-movement by typography, per brief | keep |
| Scene 03 number-build 2 → 28 → 28,8 → 28,800 | Default would be a number count-up animation | Specific — chronometer-certificate reveal device, named in brief | keep |
| Persistent VPH readout in corner after scene 03 | Default: a static footer stat card | Specific — certificate carried through the film | keep |

No revisions needed — the brief is the art direction; the skill's role was to refuse the generic alternatives and confirm each choice is grounded.

---

## Phase 4 — Borrow the right lesson from the right company

This site spans many contexts (desktop pinned → tablet → mobile vertical re-staggers) and the descent-through-the-movement pattern has to behave identically everywhere. That's **Apple's lens**: pick motion and interaction patterns once, enforce them everywhere. Specifically — the same easing family, the same scrub band (0.6–1.2), the same hover/active treatment for every link and the CTA, the same reduced-motion contract on every breakpoint. Adaptive behavior is automatic (breakpoints recompute timelines), never a setting.

**Notion's lens** applies to **scene 05 SPEC**: the spec rows are a small set of tightly-designed primitives (six rows, aligned columns, a single alignment-trigger to Brass) — constrain the surface so it's hard to make ugly rather than freeform.

**Spotify's lens** applies to the **CTA in scene 07** and any waitlist-reservation micro-interaction: hover state + distinct "received your input" confirmation, never silent. If the RESERVE CALIBRE ONE link is the one place a user takes a real action, it owes them proof it heard the click — the brief specifies the horizontal wipe + underline nudge, which is exactly the kind of confirmation Spotify would recognize.

**Jeton's lens** doesn't apply — there's no strong luxury-watch web convention to honor-then-break; the brief is explicitly anti-convention from scene 00 onward.

So the lenses used are **Apple (primary)** + **Notion (scene 05)** + **Spotify (scene 07 + global interactive states)**. Three, not four — and each only where the project actually fits.

---

## Phase 5 — Motion & feedback

- One GSAP timeline per major scene, pinned where appropriate on desktop.
- Scrub values 0.6–1.2, no bounce/spring/overshoot.
- Every interactive element (nav links, CTA, RESERVE) gets hover + click/complete confirmation. CTA: background wipes left-to-right, underline nudges 6–8px — the brief names this; it's also Spotify's principle.
- One orchestrated moment: the loader's hands-scatter-to-12:00 → wordmark lock, transitioning into the hero composition. Everything quieter than that, except the scene 06 lume glow.
- `prefers-reduced-motion`: remove pinning, the scene-03 number scrub, and the scene-06 darkness-to-glow transition. All content (specs, copy, CTA) remains fully accessible as static, readable sections. Never remove content or functionality.

---

## Phase 6 — Words are interface

The brief provides the copy verbatim; I'll honor it and apply:
- Active voice, action names consistent end-to-end. "RESERVE CALIBRE ONE" → confirmation reads "RESERVED" / "YOU'RE ON THE LIST," not "Form submitted."
- Errors state what happened and how to fix it, never apologetically. (Email field error: "That doesn't look like an email. Try again.")
- Empty/reset states are invitations to act, not apologies. (Waitlist form: nothing to apologize for, so no apology copy.)
- All labels read chronometer-certificate style: `REF. NO.`, `CAL.`, `VPH`, `JEWELS`, `RESERVE` — names that a user reading a case back would recognize.

---

## Phase 7 — The quality floor

- Responsive down to mobile, **art-directed** (per brief): on mobile the pinned horizontal/depth sequences become controlled vertical transformations; the descent story is preserved. Support 1440 / 1280 / 1024 / 768 / 430 / 390 / 360.
- Visible keyboard focus everywhere using Brass (`#B08D57`) outline — never the browser default blue. The brief explicitly says Brass focus states; the skill says use a token-system color, not default blue. Aligned.
- Status/meaning never by color alone. The persistent VPH readout pairs its number (mono numerals) with the label `VIBRATIONS PER HOUR`. The CTA's hover state pairs the Brass wipe with an underline nudge.
- `prefers-reduced-motion` honored (Phase 5).
- Test at every breakpoint, not "does it not break."

---

## Phase 8 — Self-critique before shipping

Spend boldness in exactly one place: **scene 06's lume climax.** Everything around it quiet. Single accessory check: nothing else on the site should be earning its place by being loud.

Failure-mode scan against Phase 1:
- No gradient hero — confirmed (Case Black flat).
- No bento grid — confirmed.
- No Inter as the only typeface — confirmed (Fraunces serif + Geist sans + Plex Mono).
- No "01/02/03" on non-sequential content — confirmed (only used in scene 04 where the steps *are* sequential).
- No glassmorphism / orbs / fake grain — confirmed.
- No 3D render crutch — confirmed.
- No grayscale "trusted by" logo row or testimonial carousel — confirmed.

Failure-mode scan against the skill's self-critique list:
- Phase 0 not treated as a formality — this document is the proof.
- Signature derived from Phase 2 grounding — the lume climax replicates a real watchmaker's dark-room test, not a decorative glow.
- Motion only where it serves the subject — scroll-scrub pacing tied to 8 bps beat; no fill-the-silence motion.
- Only the right company lenses — Apple (primary), Notion (scene 05), Spotify (scene 07), not all four.
- Two-pass critique (Phase 3) completed before code — table above documents pass two.

---

## Quick-reference checklist (filled)

- [x] Phase 0 answered for all seven items, stated explicitly
- [x] Category default look named (near-black + 3D-rotating watch + acid accent + cards — refused)
- [x] Subject's real-world vernacular identified (chronometer certificate + dark-room lume test)
- [x] Token system written and critiqued before code
- [x] Right company lenses chosen (Apple primary, Notion scene 05, Spotify scene 07)
- [x] Every interactive element has hover + confirmation (CTA per spec; nav links Brass on hover/active)
- [x] Reduced-motion, keyboard focus, color-independent status verified (documented above; verified at build)
- [x] Final look scanned against Phase 1 list — clean
