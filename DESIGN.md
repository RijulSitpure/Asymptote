---
name: OpenLeet AI
description: Algorithmic Pattern Intelligence & Socratic Coding Mentor
colors:
  primary: "#1e2033"
  primary-hover: "#30354e"
  neutral-bg: "#fcfcfd"
  neutral-surface: "#ffffff"
  border-subtle: "#eef0f4"
  border-medium: "#e2e6ed"
  text-primary: "#1e2033"
  text-muted: "#646e82"
  accent-emerald: "#10b981"
  accent-amber: "#f59e0b"
  accent-rose: "#ef4444"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  card-surface:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: OpenLeet AI

## Overview

**Creative North Star: "The Architectural Sanctuary"**

OpenLeet is an algorithmic pattern intelligence environment designed for engineers who value disciplined cognition over mindless code completion. Inspired by the calm clarity and tactile modernism of Sarvam AI, the interface rejects the dark-mode claustrophobia and hyperactive glowing neon tropes of generic AI tools. Instead, it provides a bright, light-first sanctuary built on soft pearl surfaces, geometric rigor, and deliberate breathing room.

The aesthetic balance pairs surgical minimalism with tangible physical depth. Elements do not float as weightless flat layers; they possess delicate 3D substance through soft, diffused ambient drop shadows, crisp 1px hairline borders, and subtle top-edge button bevels. Every pixel serves cognitive focus: problem statements, constraint trees, and algorithmic archetypes take center stage, while navigation and utility controls recede quietly until needed.

The visual system treats algorithmic mastery as an architectural discipline. Monospace type is anchored specifically to computational truths—complexity bounds, memory constraints, and code tokens—while the human layer uses Plus Jakarta Sans for warm, readable narrative guidance. Socratic hints unfold in controlled steps rather than overwhelming walls of text, reflecting our pedagogical commitment to building mental models before implementation.

**Key Characteristics:**
- **Light Architectural Canvas:** Crisp pearl-white foundation (`#fcfcfd`) with pristine white container islands (`#ffffff`).
- **Tactile 3D Substance:** Subtle multi-layer ambient drop shadows and bevel insets that give interactive elements physical weight.
- **Cognitive Quietude:** Zero gradient clutter, zero fluorescent AI glows, and zero cartoonish illustrations.
- **Architectural Typography:** Humanist geometric sans-serif for reading paired with precision monospace for algorithmic constraints.
- **Pill & Vault Geometries:** Smooth fully-rounded pill actions contrasted against continuous 16px radius cards.

## Colors

The palette is restrained, warm-neutral, and architectural, pairing a deep charcoal slate anchor with luminous pearl surfaces and sparse, purposeful semantic accents.

### Primary
- **Deep Charcoal Slate** (`#1e2033`): The structural backbone of the product. Used for top-tier headings, primary action buttons, active navigation indicators, and high-emphasis interface anchors.
- **Hover Charcoal Slate** (`#30354e`): The elevated state for primary actions, providing subtle tactile feedback on hover without disrupting the dark anchor tone.

### Neutral
- **Soft Pearl Canvas** (`#fcfcfd`): The global application canvas background. A very warm, low-glare white that softens contrast and eliminates eye strain during lengthy problem-solving sessions.
- **Pure Surface White** (`#ffffff`): The surface color for elevated cards, modal sheets, and dropdown containers.
- **Subtle Line Border** (`#eef0f4`): 1px hairline strokes separating cards and panels without creating visual fences.
- **Divider Slate** (`#e2e6ed`): Used for structural dividing lines, table rules, and input borders.
- **Ink Primary Text** (`#1e2033`): High-contrast text for headers, titles, and active labels.
- **Muted Slate Text** (`#646e82`): Mid-contrast secondary text for descriptions, timestamps, subheaders, and metadata.

### Secondary
- **Optimal Emerald** (`#10b981`): The semantic accent of correctness, optimal time complexity, and Easy problem status. Used strictly to signal algorithmic efficiency and solved state.
- **Caution Amber** (`#f59e0b`): The semantic accent for suboptimal algorithmic states, Medium problem status, and caution notices.
- **Hard Crimson Rose** (`#ef4444`): The semantic accent for Hard difficulty badges, Time Limit Exceeded warnings, and destructive actions.

### Named Rules
**The 90/10 Restraint Rule.** 90% of every screen must consist of pure slate, pearl canvas, and crisp white surfaces. Accent colors (emerald, amber, rose) may occupy no more than 10% of visual space, reserved strictly for semantic problem attributes.

**The No-Rainbow Rule.** Gradients with multiple hue shifts or neon holographic glows are strictly prohibited. Gradients are permitted only as vertical luminance shifts on solid slate or subtle ambient periwinkle backlights.

## Typography

**Display Font:** Plus Jakarta Sans (with system fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)  
**Body Font:** Plus Jakarta Sans  
**Label/Mono Font:** JetBrains Mono (with fallback: SFMono-Regular, Menlo, Monaco, Consolas, monospace)

**Character:** Modern, humanist geometric clarity paired with industrial computational precision. Plus Jakarta Sans provides generous counter-forms and high legibility at all scales, while JetBrains Mono anchors mathematical formulas and algorithmic constraints.

### Hierarchy
- **Display** (800 ExtraBold, clamp(2rem, 4vw, 2.75rem), line-height 1.15): Hero statistical totals, dashboard overview metrics, and major section landmarks.
- **Headline** (700 Bold, 1.5rem / 24px, line-height 1.25): Card header titles, modal dialog titles, and primary pattern archetype names.
- **Title** (600 SemiBold, 1.125rem / 18px, line-height 1.35): Section headers, sub-navigation labels, and panel group headers.
- **Body** (400 Regular, 0.875rem / 14px, line-height 1.5): Standard explanations, Socratic progressive hints, pattern breakdowns, and problem descriptions. Maximum recommended measure 75ch.
- **Label** (600 SemiBold, 0.75rem / 12px, line-height 1.4, tracking 0.05em): Monospace complexity budgets ($O(N \log N)$), difficulty badges, status indicators, and keyboard shortcut chips.

### Named Rules
**The Mono Anchor Rule.** Any metric representing operational constraints ($N \le 10^5$), Big-O complexities ($O(V + E)$), execution limits (1000ms), or code tokens must render in JetBrains Mono. Prose and pedagogical reasoning never use monospace.

## Layout

The spatial model uses an asymmetric split layout: a fixed 260px collapsible sidebar navigation on the left, paired with an expansive, fluid central canvas with a 1200px max-width content container.

- **Sidebar Anchor:** Fixed width (260px) desktop sidebar housing the minimalist geometric brand logo at the top and the pinned user identity card at the bottom-left. Collapses gracefully on smaller viewports.
- **Sticky Top Bar:** Lightweight 64px header containing breadcrumbs, active problem search, sync indicators, and primary global triggers.
- **Spacing Scale:** Built strictly on an 8px grid (`sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48px`). Inner card padding defaults to 24px (`p-6`); compact items use 16px (`p-4`).
- **Responsive Adaptability:** Below 1024px, the sidebar collapses into a drawer, and multi-column pattern grids stack cleanly into single-column vertical flows.

## Elevation & Depth

OpenLeet rejects flat, paper-like minimalism in favor of tangible, ambient 3D depth inspired by Sarvam AI's hardware-grade physical surfaces. Surfaces are layered using gentle, warm multi-stage drop shadows and hairline highlight borders.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 1px 3px rgba(30, 32, 51, 0.02), 0 4px 16px -2px rgba(30, 32, 51, 0.04)`): The foundational resting shadow for all content cards and panels.
- **Card Hover** (`box-shadow: 0 2px 6px rgba(30, 32, 51, 0.04), 0 8px 24px -4px rgba(30, 32, 51, 0.07)`): The elevated interactive state that smoothly lifts cards on pointer hover.
- **Primary Button Depth** (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 6px rgba(30, 32, 51, 0.15)`): The physical bevel and elevation on solid slate buttons.
- **Ambient Radial Glow** (`background: radial-gradient(ellipse at 50% 0%, rgba(165, 187, 252, 0.35) 0%, rgba(213, 226, 255, 0.15) 40%, transparent 70%)`): Subtle, atmospheric backdrop glow used exclusively behind hero dashboard headers.

### Named Rules
**The Ambient Depth Rule.** Depth is physical and diffuse, never harsh or opaque. Drop shadows must use low-opacity slate (`rgba(30, 32, 51, ...)`) with large blur radii, giving surfaces a soft cushion of air above the pearl canvas.

## Shapes

The form language is disciplined and geometric, balancing architectural structure with approachable ergonomic touch targets.

- **Pill Primitives (`rounded-full` / 9999px):** Applied to all primary buttons, secondary filter buttons, search input fields, and status badges. Creates a soft, modern contact point for actions.
- **Container Radii (`rounded-2xl` / 16px):** Standard corner radius for all cards, modal containers, and drawer panels.
- **Sub-element Radii (`rounded-xl` / 12px):** Applied to internal nested blocks, code preview boxes, and hint step containers.
- **Brand Geometry:** A sharp, architectural dual-triangle glyph resembling a forward compiler step or algorithmic state transition. Clean, vector-pure, and devoid of AI sparkle icons.

## Components

### Buttons
Tactile, pill-shaped, and ergonomically balanced.
- **Shape:** Fully rounded pill (`border-radius: 9999px`).
- **Primary:** Deep slate gradient (`linear-gradient(180deg, #30354e 0%, #1e2033 100%)`) with white text, 10px 24px padding, and top-edge inset highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.25)`).
- **Hover / Active:** Slight lift (`translateY(-1px)`), deepened shadow (`0 4px 12px rgba(30, 32, 51, 0.2)`), compressing slightly on click (`scale(0.98)`).
- **Secondary:** Pristine white background, 1px border (`rgba(30, 32, 51, 0.12)`), slate text (`#1e2033`), subtle resting shadow (`0 1px 2px rgba(30, 32, 51, 0.03)`).
- **Ghost:** Transparent background with subtle hover pill fill (`#f4f6fa`).

### Chips
Used for problem difficulty ratings, topic tags, and complexity bounds.
- **Style:** Compact pill geometry (`padding: 4px 12px`), 12px text size, 600 weight.
- **Difficulty Badges:**
  - Easy: Soft emerald background (`#ecfdf5`), emerald text (`#047857`), emerald border (`#a7f3d0`).
  - Medium: Soft amber background (`#fffbeb`), amber text (`#b45309`), amber border (`#fde68a`).
  - Hard: Soft rose background (`#fef2f2`), rose text (`#b91c1c`), rose border (`#fecaca`).

### Cards / Containers
Elevated structural islands on the pearl canvas.
- **Corner Style:** 16px border-radius (`rounded-2xl`).
- **Background:** Optical Pure White (`#ffffff`).
- **Border:** 1px hairline border (`rgba(30, 32, 51, 0.08)` / `#eef0f4`).
- **Elevation:** Multi-layer soft shadow (`sarvam-card`).
- **Internal Padding:** 24px (`p-6`) for standard cards; 16px (`p-4`) for compact sidebar items.

### Inputs / Fields
- **Style:** Fully-rounded pill contour (`rounded-full`), white background, 1px border (`#e2e6ed`), 10px 20px padding with leading search icon.
- **Focus:** 1px ring in charcoal slate (`#1e2033`), border shift to `#1e2033`, zero generic blue outlines.
- **Placeholder:** Muted slate tone (`#94a3b8`).

### Navigation
- **Sidebar Items:** Pill-shaped menu items with 12px radius, 10px 16px padding.
- **Active State:** Deep charcoal slate background (`#1e2033`), crisp white text, and prominent icon highlight.
- **Inactive State:** Transparent background, muted slate text (`#646e82`), transition to hover slate-tint (`#f4f6fa`) on pointer hover.
- **User Footer:** Pinned bottom-left card with avatar, username (`Rijul-Sitpure`), solved problem counter, and sync status badge.

### Socratic Coach Drawer (Chrome Extension)
Shadow DOM isolated slide-out coach drawer integrated directly into LeetCode problem pages.
- **Structure:** Clean 3-tab segmented control: `[ Ask AI ] | [ Solution ] | [ Complexity ]`.
- **Style:** Strict Shadow DOM encapsulation preventing LeetCode CSS contamination; identical Sarvam-style light palette and tactile 3D card styling.

## Do's and Don'ts

### Do:
- **Do** preserve generous whitespace around card containers (`gap-6`, `p-6`) to maintain cognitive focus.
- **Do** anchor all computational complexity metrics ($O(N)$, $10^8$ ops) in JetBrains Mono.
- **Do** use fully-rounded pill geometry (`rounded-full`) for all action buttons and status chips.
- **Do** use the 90/10 rule: 90% slate and white canvas, 10% semantic accents.
- **Do** place user identity, sync status, and account settings in the bottom-left sidebar.
- **Do** isolate in-page extension panels inside a Shadow DOM to prevent CSS leaks.

### Don't:
- **Don't** add rainbow gradients, animated glowing borders, or fluorescent neon accents.
- **Don't** reveal code solutions immediately; always enforce the 4-tier Socratic hint ladder (Intuition → State → Invariant → Skeleton).
- **Don't** use generic chatbot AI icons (sparkles, robot heads, or magic wands) anywhere in the interface.
- **Don't** use harsh solid black (`#000000`) for text or shadows; always use charcoal slate (`#1e2033` / `rgba(30, 32, 51, ...)`).
- **Don't** clutter card surfaces with redundant metadata; keep titles short and punchy.
