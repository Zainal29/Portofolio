# Muhammad Zainal Arief (MZA.dev) — Style Reference
> midnight cyber-command terminal. Build quiet dark engineering surfaces framed by precision hairlines, atmospheric blueprint grids, and single electric-blue signals marking every action and status.

**Theme:** dark  
**Author:** Muhammad Zainal Arief (`MZA.dev`)  
**Role:** Laravel Backend Specialist & Full-Stack Web Developer  
**Institution:** SMK Negeri 1 Bangsri — PPLG (Pengembangan Perangkat Lunak & Gim)

---

## 1. Design Philosophy

MZA.dev is a midnight developer workstation built for a precision backend engineer. A deep obsidian canvas (`#050811`) holds precision-machined card surfaces (`#0c121e`), bounded by hairline borders (`1px solid rgba(255, 255, 255, 0.08)`), while a subtle blueprint tech grid and reactive wave aperture layer atmospheric depth behind content. 

Typography speaks in clean sans-serif and high-contrast monospaced metadata, with headlines kept solid and compressed (`-0.025em` tracking) rather than loud. Color is strictly rationed: 98% monochrome surfaces with an electric blue (`#3b82f6`) flashlight accent that carries wordmarks, primary actions, active tabs, and neon indicators. 

**Rainbow gradients, cartoon drop shadows, and AI-slop flourishes are strictly forbidden** in favor of mathematical contrast, tactile micro-noise, and buttery smooth Lenis scroll physics.

---

## 2. Color Palette & Tokens

| Token Name | Hex / RGBA Value | Role & Usage |
|---|---|---|
| **Canvas Void** | `#050811` | Page background, root canvas — the deep near-black foundation behind every section |
| **Surface Carbon** | `#0c121e` | Card surfaces, terminal window base, experience tiles — one level above canvas |
| **Surface Obsidian** | `#121b2d` | Elevated containers, modal dialogues, interactive preview popovers |
| **Hairline Border** | `rgba(255, 255, 255, 0.08)` | Default structural edges, card outlines, subtle dividers |
| **Hairline Active** | `rgba(59, 130, 246, 0.35)` | Focused inputs, hovered cards, active tab border glow |
| **Signal Electric Blue** | `#3b82f6` | Wordmarks, primary CTA buttons, active status pills, key icons — one hot blue carries every signal |
| **Signal Sky Blue** | `#38bdf8` | Secondary badges, inline links, code pipeline accents, subtle aura edges |
| **Signal Emerald** | `#10b981` | Online indicators, "Ready for PKL & Industri" status badges |
| **Text Pure** | `#ffffff` | Primary headings, maximum contrast titles, active buttons |
| **Text Snow** | `#f1f5f9` | Headline body, primary text, prominent labels |
| **Text Mist** | `#94a3b8` | Supporting paragraphs, descriptions, metadata, inactive tabs |
| **Text Ash** | `#64748b` | Monospace tags, timestamps, copyright micro-copy |
| **Aura Ocean Rim** | `rgba(59, 130, 246, 0.30)` | Subtle viewport ambient edge glow (`takuyajodai/edge-aura`) |

---

## 3. Typography System

### Sans-Serif (`Inter`, `system-ui`, `-apple-system`)
- **Display Headlines (48px – 72px):** Weight `800`, letter-spacing `-0.03em`, line-height `1.08`. Solid `#ffffff` with `#3b82f6` highlight.
- **Section Titles (28px – 36px):** Weight `700`, letter-spacing `-0.02em`, line-height `1.15`.
- **Card Headings (18px – 22px):** Weight `600`, letter-spacing `-0.015em`, line-height `1.25`.
- **Body Text (14px – 16px):** Weight `400`, letter-spacing `normal`, line-height `1.6`. Color `#94a3b8`.

### Monospace (`JetBrains Mono`, `Fira Code`, `monospace`)
- **Sizes:** `10px`, `11px`, `12px`, `13px`
- **Roles:** Tech stack tags, pipeline arrows (`➔`), status chips, terminal commands, NIS & School badges.
- **Appearance:** High contrast, crisp 1px borders, subtle padding (`px-2 py-0.5` or `px-3 py-1`).

---

## 4. Component Rules

### Project Cards (`.portfolio-project-card`)
- **Background:** Deep matte `#0c121e` (solid or subtle 145° shift to `#080c16`).
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`.
- **Hover State:** `translateY(-3px)`, border becomes `rgba(59, 130, 246, 0.35)`, subtle blue ambient glow `box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.12)`.
- **Thumbnail:** Rounded `12px`, 16:9 ratio, subtle 1px border.

### Buttons & Interactive CTAs
- **Primary Button:** Background `#3b82f6`, hover `#2563eb`, text `#ffffff`, font weight `600`, rounded `10px` or `9999px`.
- **Ghost / Outlined Button:** Background `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.10)`, text `#f1f5f9`, hover background `rgba(255, 255, 255, 0.08)`.
- **Active Tab Pill:** Background `#3b82f6`, text `#ffffff`, shadow `0 2px 10px rgba(59, 130, 246, 0.35)`.
- **Inactive Tab Pill:** Background `transparent`, text `#94a3b8`, hover text `#f1f5f9`.

### Atmospheric Background
- **Grid Texture:** 48px square blueprint tech grid with `rgba(255, 255, 255, 0.035)` stroke.
- **Dot Matrix:** 96px cyan coordinates `rgba(56, 189, 248, 0.35)` 1.5px dots.
- **Micro Noise:** Fine-grain fractal noise at 2.5% opacity overlay to eliminate flat banding.
- **Edge Aura:** Subdued 16px–24px ambient neon rim at 8–10 quiescent FPS.

---

## 5. Strict Anti-Patterns ("Anti AI-Slop" Commandments)

1. **NO Multi-Color Rainbow Text Gradients:** Never write `linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #10b981)`. Real developer tools do not look like candy stores.
2. **NO Heavy Blurry Card Drop-Shadows:** Never use `box-shadow: 0 20px 50px rgba(236, 72, 153, 0.5)`. Use crisp 1px borders and slight elevation changes instead.
3. **NO Artificial Loading Delays:** Visitors should never wait on fake percentage counters. The interface must be instantly interactive or scroll-driven (ScrollCraft gateway).
4. **NO Inconsistent Spacing:** Stick to 4px/8px modular scales (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
5. **NO Unreadable Contrasts:** Secondary text must never dip below `#64748b` on dark backgrounds (WCAG AA compliance).
