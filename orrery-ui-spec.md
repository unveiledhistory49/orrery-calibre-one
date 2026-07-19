Build a complete, production-quality launch website for ORRERY — CALIBRE ONE, a small-batch mechanical watch, using Next.js, React, TypeScript, GSAP ScrollTrigger, and restrained Lenis smooth scrolling.

CREATIVE DIRECTION

Create one continuous, scroll-controlled cinematic film — not a conventional landing page with sections fading in.

Central concept: "INSIDE THE MOVEMENT." A mechanical watch is a machine you can fall into: crystal, dial, hands, movement plate, gear train, escapement, balance wheel. The user starts at the surface — the watch face — and descends through each mechanical layer as they scroll, then resurfaces at the assembled, ticking watch.

Every scene transforms from geometry already on screen:
- Hour markers become grid lines and structural dividers
- Watch hands sweep into becoming scene-transition wipes
- Gear teeth become a repeating rhythm/texture, never decoration for its own sake
- The balance wheel's oscillation sets the pacing motif for scroll-scrub timing
- Never reset the screen with a basic crossfade

Motion should feel unhurried, mechanical, and precise — closer to watching a movement actually tick than to a flashy product reveal.

VISUAL SYSTEM

Colors (name and use only these — 90% of the site is Case Black / Dial Ivory / Plate Steel):
- Case Black `#111214` — primary dark background, case-back surface
- Dial Ivory `#EDE4D2` — warm light surface, dial-inspired (not a cool paper white)
- Plate Steel `#84867F` — hairlines, secondary text, structural rules (brushed-steel gray)
- Brass `#B08D57` — rare metallic accent: active states, key numerals, hand-finishing details
- Lume `#7FE3C4` — the single climax color, used once, evoking Super-LumiNova glowing in the dark

Theme progression: Black → Ivory → Black → Lume glow → quiet Black. Brass and Lume are both earned, not decorative — Brass appears only where something was actually hand-finished or is currently active; Lume appears only in the one dark-room climax scene.

Typography:
- Display: a refined high-contrast serif (e.g. Canela, Reckless Neue) for statement headlines — evokes engraved dial typography and heritage, not tech-hero energy
- UI/labels: a precise geometric sans (e.g. Neue Haas Grotesk, General Sans) for nav, specs, small caps labels
- Numerals: a true monospace with tabular figures (e.g. IBM Plex Mono) for every number that appears — frequency, reserve, jewel count — so digits align like a chronometer certificate

Structural devices:
- Hero type: 20–35vw, tight leading, asymmetrical — never a centered headline/subhead/button stack
- Small uppercase technical labels throughout (REF. NO., CAL., VPH) — the site should read like a chronometer certificate as much as a webpage
- No rounded pill buttons — CTAs are sharp-edged or underlined, consistent with the case's hard edges

SCROLL STORYBOARD

Build approximately 800–1000vh of cinematic pinned scenes.

00 — LOADER
A crown icon rotates, hands sweep from a scattered position to 12:00, wordmark "ORRERY" locks into place beneath "CALIBRE ONE." Transform the hands' final position directly into the hero composition. Maximum 1.5 seconds.

01 — HERO
Case Black background, the watch face rendered enormous and slightly cropped, hands genuinely sweeping (subtle, real-time-feeling motion, not decorative spin). Minimal nav, small metadata, "SCROLL TO DESCEND."

Copy:
ORRERY
CALIBRE ONE
A MOVEMENT MADE, NOT ASSUMED
39MM · TITANIUM · IN-HOUSE MOVEMENT

During scroll: metadata reveals through clipped wipes, the dial recedes and the crystal's edge becomes a horizontal line leading into the next scene.

02 — THROUGH THE CRYSTAL
Invert to Dial Ivory. Layered glass/dial planes at shifting depths, hour markers as geometry, measurement lines and tolerances in the margins (fine print, legible but quiet).

Scrolling assembles:
EVERY SECOND
IS EARNED,
NOT ASSUMED

Enlarge the final marker into a mask revealing the next dark scene.

03 — THE BEAT
Return to Case Black. Pin the scene while vertical scroll drives a progressively building number, same device as a chronometer certificate reveal:

2 → 28 → 28,8 → 28,800

Label beneath: VIBRATIONS PER HOUR. Sync the scene's scroll-scrub pacing loosely to an 8-beats-per-second rhythm so the number reveal itself feels regulated, not arbitrary.

Include:
8 BEATS PER SECOND
ZERO ROOM FOR ERROR

Collapse the full number into a small technical readout in the corner, carried forward as a persistent detail in later scenes.

04 — CRAFT
Three full-screen typographic transformations, not cards:

01 / FORGE
RAW TITANIUM, MACHINED TO MICRONS.

02 / FINISH
GENEVA STRIPES. BLACK-POLISHED BY HAND.

03 / REGULATE
ADJUSTED IN SIX POSITIONS BEFORE IT EARNS ITS CASE.

Expand FORGE's type into structural columns; use those columns as FINISH's negative space; collapse them into the final composition for REGULATE.

05 — SPECIFICATION
Keep a large "CAL. ONE" stationary on one side. On the other, vertically move aligned spec rows:

MOVEMENT — IN-HOUSE CALIBRE C1
FREQUENCY — 28,800 VPH
POWER RESERVE — 70 HOURS
JEWELS — 26
WATER RESISTANCE — 100M
CASE — 39MM BRUSHED TITANIUM

As each row aligns, turn it Brass. Compress all rows into a single line at the end.

06 — THE GLOW (CLIMAX)
Cut to near-total darkness. The assembled watch face is barely visible except its lume-treated hands and markers, glowing Lume against Case Black — the one large color moment, achieved through darkness and glow rather than a flat color-fill background.

Display:
NOT A DISPLAY OF TIME.
TIME YOU CAN FEEL WORKING.

Slowly bring up ambient light until the full watch is legible, then compress into the wordmark.

07 — FINAL CTA
Shrink to a small Brass crown mark and wordmark, return to Case Black.

Display:
ORRERY — CALIBRE ONE
WAITLIST NOW OPEN
[N] pieces per production run.

CTA: RESERVE CALIBRE ONE
Technical line: REF. C1-039-TI

Sharp-edged CTA; on hover, wipe background horizontally, nudge an underline 6–8px. End with an oversized cropped crown mark below the viewport.

MOTION AND ENGINEERING

- One GSAP timeline per major scene
- Restrained scrub values, roughly 0.6–1.2 — no bounce, spring, or overshoot
- Reuse geometry between scenes rather than crossfading
- Prefer transforms, masks, and clip-path; use WebGL only if genuinely necessary for the movement/gear-train visuals
- Keep all text real HTML, not baked into imagery
- Wait for fonts before calculating scene timelines
- Clean up GSAP contexts on unmount; recalculate at responsive breakpoints
- No scroll traps or scroll-jacking

Minimal fixed navigation: ORRERY / 01 MOVEMENT / 02 CRAFT / 03 SPEC / RESERVE ↗ — updates color and active state with scroll position.

RESPONSIVE AND ACCESSIBILITY

Art-direct desktop, tablet, and mobile separately — on mobile, replace horizontal/pinned sequences with controlled vertical transformations while preserving the descent-through-the-movement story.

Support 1440, 1280, 1024, 768, 430, 390, and 360px.

Semantic HTML, full keyboard navigation, visible focus states in Brass (not default blue), sufficient contrast, skip link, and `prefers-reduced-motion`. Reduced-motion mode removes pinning, the number-scrub in scene 03, and the darkness-to-glow transition in scene 06, while keeping all content and specs fully accessible as static, readable sections.

STRICTLY AVOID

- Gradients, glassmorphism, glowing neon orbs
- A literal 3D watch render used as a crutch instead of designed typographic scenes
- Generic e-commerce chrome (star ratings, "Add to Cart" styling, coupon banners)
- Fake film-grain overlays applied indiscriminately
- Bento grids, rounded floating cards, generic stat widgets
- Constant fade-up-on-scroll animation with no relationship to the movement concept
- Reusing a letter-as-portal or single-glyph-hero conceit — this concept is architectural (descending through layers), not typographic

CASE-STUDY CAPTURE LIST

Screenshot/GIF these while building, for the portfolio writeup:
1. The 28,800 number-reveal scene mid-scrub
2. Scene 06's darkness-to-glow transition, full sequence
3. A scene transition where existing geometry (hands, markers) visibly becomes the next scene's structure
4. Mobile vertical-transformation version side-by-side with desktop pinned version
5. Reduced-motion mode vs. default, same scene
