# Asymptote Design System

## Core Principles
- **Theme:** Light theme only. No dark mode surfaces.
- **Elevation:** No drop shadows. Separation is achieved through clean 1px borders (`#e2e8f0`).
- **Background:** Subtle checked drafting grid (32px squares `#e6ebf1` on `#f6f8fa` base).
- **Labels:** Sentence case for all UI labels, buttons, and section titles. No emoji or uppercase micro-labels.

## Color Palette
- **Slate (`#1e2033`):** Primary brand, wordmark, headers, active navigation, and primary buttons.
- **Emerald (`#10b981`):** Progress indicators, solved states, and success confirmations.
- **Amber (`#f59e0b`):** Reserved exclusively for progressive hint action buttons and triggers.
- **Rose (`#be123c` / `#fda4af` / `#fff1f2`):** Hard problem difficulty badges and time-limit constraints.
- **Neutrals:**
  - Page background: `#f6f8fa`
  - Drafting grid line: `#e6ebf1`
  - Card & modal surfaces: `#ffffff`
  - Borders & dividers: `#e2e8f0`
  - Primary text: `#1e2033`
  - Body & secondary text: `#475569`
  - Muted captions: `#64748b`

## Typography
- **Headings & Display:** Space Grotesk (700 bold / 500 medium) for titles, section headers, and stat values.
- **Body & Controls:** DM Sans (400 regular / 500 medium / 700 bold) for readable prose, hints, buttons, and navigation.
- **Code & Metrics:** System monospace (`ui-monospace`, `Menlo`, `Consolas`) for code snippets and Big-O expressions.

## Corner Radii
- **Cards:** 12px
- **Buttons & Inputs:** 8px
- **Hint Rows:** 10px
- **Modals:** 14px
- **Pills / Chips:** 9999px (full capsule)

## Spacing & Layout
- **Desktop Content Max Width:** 1040px with 32px horizontal padding.
- **Companion Extension In-Page Drawer:** 460px right slide-out panel with Shadow DOM style isolation.
- **Companion Extension Popup:** 420px width by 600px height quick-access viewport.
- **Clean Hierarchy:** Consistent vertical rhythms (16px / 24px / 32px).

## Code & Language Architecture
- **Multi-Language Selector:** Python, C++, Java, JavaScript, Go, and Rust tabbed chips across Pattern Atlas blueprints and Socratic hints.
- **Code Highlighting:** Clean syntax presentation matching the neutral drafting slate palette without dark editor clashes.
- **Big-O Badges:** Consistent badges indicating Time Complexity (e.g., `O(N log K)`) and Space Complexity (e.g., `O(K)`) alongside operations budget benchmarks (~10⁸ ops/sec).
