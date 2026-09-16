---
name: Kisan Dairy Bold
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f493f'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6f7a6e'
  outline-variant: '#becabc'
  surface-tint: '#006d30'
  primary: '#00652c'
  on-primary: '#ffffff'
  primary-container: '#15803d'
  on-primary-container: '#d3ffd5'
  inverse-primary: '#79db8d'
  secondary: '#4059aa'
  on-secondary: '#ffffff'
  secondary-container: '#8fa7fe'
  on-secondary-container: '#1d3989'
  tertiary: '#854600'
  on-tertiary: '#ffffff'
  tertiary-container: '#a95b00'
  on-tertiary-container: '#fff1e9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#95f8a7'
  primary-fixed-dim: '#79db8d'
  on-primary-fixed: '#00210a'
  on-primary-fixed-variant: '#005323'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b6c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#264191'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for rural Indian dairy farmers managing daily milk yields, fat percentages, and cooperative payment slips. The visual and functional philosophy centers on utilitarian confidence, daylight legibility, and absolute trust. 

The aesthetic is High-Contrast Tactile Utilitarianism:
- High-contrast visual containment replaces subtle layering.
- 2px to 3px solid, dark outlines define interactive boundaries, ensuring interface elements never wash out under harsh 40°C Indian sunlight.
- Every critical metric (liters, fat SNF, total payout) operates under an "Audio-First & Literal-Visual" principle: large numerical readouts are accompanied by literal dairy iconography (milk can, cow/buffalo head, fat test tube, currency stack) and dedicated one-tap audio speaker triggers for full vocalization in Telugu and English.
- Avoid delicate blurred drop shadows, pastel fills, and fine hairline rules. The interface behaves like physical agricultural hardware: sturdy, distinct, click-positive, and unyielding to calloused fingers or cracked smartphone screens.

## Colors

The color palette is calibrated for high ambient glare and strict outdoor visibility (>7:1 contrast ratios across core interactions):

- **Primary Emerald Dairy Green (`#15803D`)**: The anchor of milk yield, financial approval, and successful transactions. Used for key confirmation surfaces, top app banners, and primary CTA buttons. Paired exclusively with `#FFFFFF` text.
- **Secondary Sapphire Navy (`#1E3A8A`)**: Represents structural authority, cooperative society records, and verified identification. Used for navigation bars, section title containers, and secondary action surfaces.
- **Tertiary Amber Gold (`#D97706`)**: High-visibility alert and status indicator. Used for pending slip approvals, fat-testing rate modifications, and high-priority contextual audio cues.
- **Neutral Dark Slate (`#0F172A`)**: The foundation for crisp 2px–3px solid borders, text glyphs, and iconography. Replaces standard muted greys with solid deep black-slate to eliminate low-contrast washouts.
- **Surface Canvas (`#F8FAFC`) & Pure Container White (`#FFFFFF`)**: Stark, non-glare high-purity backgrounds that ensure clear visual separation when framed by `#0F172A` borders.

## Typography

Typography prioritizes bilingual clarity across Telugu and Latin scripts. 

- **Display & Numerical Readouts**: `Space Grotesk` is used for all metrics, weights, currency figures, and fat percentages. Its tabular, mechanical figures prevent misinterpretation of numbers when reading digital collection scales or printed thermal receipts.
- **Bilingual Body Text**: `Plus Jakarta Sans` handles primary UI labels, descriptions, and system instructions. Weights start at Semibold (`600`) and Bold (`700`) to prevent font thinning and degradation on low-resolution outdoor LCD panels.
- **Telugu Glyph Pairing**: Telugu script line-height is systematically set to 1.4x standard Latin sizes to prevent ascender/descender clipping on complex conjunct consonants (e.g., పాలు, కొవ్వు శాతం, రసీదు).
- Font sizes below 14px are strictly prohibited for transactional or numerical information.

## Layout & Spacing

The layout is built around single-column, tap-friendly vertical stacks that accommodate low-end Android displays (360px–412px width).

- **Grid Model**: A fluid 4-column system on mobile expanding to an 8-column layout on regional cooperative center tablets. Content strictly avoids dense horizontal clustering; fields scale vertically to preserve generous touch regions.
- **Touch Target Integrity**: Interactive triggers—such as audio readouts, keypad inputs, and list selections—have a minimum target size of 64px x 64px (`4rem` x `4rem`) to support reliable interaction for calloused hands or one-handed field operation.
- **Spacing Cadence**: Component inner padding is fixed to `space-md` (16px) or `space-lg` (24px). Elements never touch screen boundaries; a safe perimeter margin of 12px–16px is maintained to protect interactions against cracked glass or rugged phone casings.

## Elevation & Depth

Visual hierarchy is established through structural outlines and physical layering rather than diffuse shadows.

- **Hard Contrast Boundaries**: Elevation layers use a 2px to 3px solid border in `#0F172A` paired with flat, high-contrast surface fills.
- **Tactile Offsets (Physical Press State)**: Important floating cards, navigation items, and buttons use a 3px hard drop edge (offset: `X: 0px, Y: 3px`, blur: `0px`, color: `#0F172A`). Upon press/touch, the element translates down `3px` with the offset collapsing to zero, providing immediate mechanical feedback without relying on subtle color shifts.
- **Zero Glassmorphism / Blur**: Translucent fills, soft ambient blurs, and low-contrast grey drop shadows are excluded to keep interfaces legible in direct sunlight.
- **Floating Slip Capture Action**: The central camera trigger uses a distinct 4px solid perimeter ring with an interior 2px white gap, isolating the button from the bottom navigation bar.

## Shapes

The interface uses restrained, structural corner roundings (Level 1 / Soft):

- Standard components (data containers, slip receipt cards, text inputs) feature a base corner radius of `0.25rem` (4px) to `0.5rem` (8px). This creates sturdy, slate-like blocks reminiscent of physical hardware and passbooks.
- The central Bottom Bar Camera OCR action is the sole circular trigger (`rounded-full`), clearly separating primary scanning from informational list cards.
- Badges and numeric chips utilize rigid `4px` chamfers or square geometry with 2px solid framing to preserve space and readability.

## Components

### Buttons
- **Primary CTA ("రసీదు నమోదు చేయండి / Save Slip")**: Minimum height of 64px. Fill `#15803D`, label in bold 18px white text, framed by a 2.5px solid `#0F172A` border with a 3px hard bottom offset. Features a bold literal icon (floppy disk, checkmark, or milk can) on the left edge.
- **Audio Speaker Action**: An integrated or standalone 64px x 64px button. Fill `#D97706` or `#1E3A8A`, housing a high-contrast white speaker icon (`🔊`). When tapped, an active yellow wave animation indicates the localized voice playback is running.
- **Secondary / Action Outlines**: Solid `#FFFFFF` fill with 2.5px solid `#0F172A` border and 16px bold typography.

### Slips & Metric Cards (Daily Collection Slip)
- Constructed with a solid `#FFFFFF` container and 2.5px solid `#0F172A` border.
- Divided into two distinct high-contrast zones:
  1. Top Header: 40px height with `#1E3A8A` or `#15803D` background, showing date, shift ("ఉదయం / Morning"), and milk type (Buffalo / Cow).
  2. Data Metrics Matrix: 2x2 grid displaying Quantity (Liters), Fat %, SNF, and Total Amount (₹). Every metric contains the bilingual label, 24px tabular bold number, and a dedicated 48px inline audio playback tap icon.

### Form Inputs & Keypads
- Text and number inputs feature 64px height, `#FFFFFF` fill, 2.5px solid `#0F172A` stroke, and 20px bold font size.
- Includes clear, physical stepper buttons (+ / -) sized 60px x 60px for quick fat and quantity adjustments without requiring soft keyboard entry.

### Checkboxes & Radio Controls
- Minimum dimensions of 36px x 36px with a 3px solid `#0F172A` stroke.
- Selected state fills with `#15803D` and displays an explicit, high-contrast white checkmark icon (stroke width 4px).

### Bottom Navigation & Elevated OCR Scanner
- Height of 76px anchored to screen base with `#FFFFFF` fill, a 3px top solid `#0F172A` border, and 3 primary tabs: "హోమ్ / Home", "రికార్డులు / Ledger", "ప్రొఫైల్ / Profile".
- Centered Elevated Camera OCR Button: An 80px circular button elevated -28px above the nav bar line. Coated in `#15803D` with a 3.5px solid `#0F172A` boundary, featuring a stark white camera/receipt scan icon. This serves as the single primary entry point for capturing print slips directly from dairy society collection hardware.