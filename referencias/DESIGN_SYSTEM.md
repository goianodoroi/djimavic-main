# Design System

## Overview

This project uses a compact, implementation-driven design system centered on a premium consumer-tech aesthetic:

- Dark cinematic surfaces
- Warm DJI-style orange gradient accents
- Helvetica Neue-based typography
- Rounded pill controls and soft cards
- Minimal, polished motion

The system is not fully abstracted into a token package, but it is consistent across the main landing page sections.

## Core Files

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/BentoGrid.tsx`
- `src/components/sections/ProductBuy.tsx`
- `src/components/sections/InTheBox.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/Footer.tsx`

## Design Principles

- Premium and minimal, not playful
- High contrast with restrained color usage
- Strong focus on product imagery and motion
- Large editorial typography with tight tracking
- Soft rounded geometry rather than sharp edges

## Global Tokens

Defined in `src/app/globals.css`.

### Colors

```css
:root {
  --background: #0a0a0a;
  --foreground: #f5f5f5;
  --dji-orange-start: #FFD092;
  --dji-orange-end: #E05D26;
  --dji-orange: #E05D26;
  --dji-surface: #111111;
  --dji-surface-2: #1a1a1a;
  --dji-border: rgba(255, 255, 255, 0.08);
}
```

### Semantic Interpretation

- `--background`: primary dark canvas
- `--foreground`: primary light text on dark surfaces
- `--dji-orange-start`: warm highlight
- `--dji-orange-end`: brand CTA orange
- `--dji-surface`: elevated dark card background
- `--dji-surface-2`: secondary dark surface
- `--dji-border`: subtle border on dark UI

## Typography

### Font Stack

Used globally and repeatedly inline:

```css
"Helvetica Neue", Helvetica, Arial, sans-serif
```

### Typography Rules

- Body default weight: `400`
- Headings often use `500`
- Promotional emphasis sometimes uses `700`
- Tight tracking is common on major headings

### Common Type Styles

#### Hero Title

- Weight: `500`
- Size: `clamp(36px, 4vw, 52px)`
- Line height: `1.05`
- Letter spacing: `-0.022em`

#### Section Title

- Weight: `500`
- Size: `clamp(28px, 3.5vw, 52px)`
- Line height: around `1.06-1.1`
- Letter spacing: `-0.025em` to `-0.022em`

#### Body Copy

- Weight: `400`
- Size: usually `14px`
- Line height: `1.6` to `1.65`

#### Eyebrow / Meta / Tags

- Size: `12px` to `14px`
- Often uppercase
- Letter spacing: `0.02em` to `0.12em`

## Color System

### Dark Theme Usage

- Main backgrounds: `#0a0a0a`, `#080808`, `#000000`
- Surfaces: `#111111`, `#1a1a1a`
- Text primary: `#ffffff` or `#f5f5f5`
- Text secondary: `rgba(255,255,255,0.45)` to `rgba(255,255,255,0.65)`

### Light Theme Usage

- Backgrounds: `#ffffff`, `#f5f5f5`
- Text primary: `#111111`
- Text secondary: `#666666`

### Accent Usage

- Primary accent: `#E05D26`
- Highlight accent: `#FFD092`
- Signature gradient:

```css
linear-gradient(135deg, #FFD092 0%, #E05D26 100%)
```

Use cases:

- CTA buttons
- Gradient text
- Active dots
- Badges and emphasis

## Layout

### Containers

Common horizontal padding:

- Desktop: `48px`
- Medium: `32px`
- Mobile: `24px`

Common max widths:

- `800px`
- `1120px`
- `1280px`

### Section Spacing

- Desktop vertical rhythm: `120px`
- Mobile vertical rhythm: `64px`

### Gaps

- Small: `8px`, `12px`, `16px`
- Medium: `24px`, `32px`
- Large: `40px`, `64px`, `80px`

## Shape Language

### Border Radius

- Pills: `999px`
- Small controls/thumbs: `10px`, `12px`
- Medium cards: `16px`
- Large cards/media blocks: `20px`

### Borders

Dark UI:

- `1px solid rgba(255,255,255,0.08)` to `rgba(255,255,255,0.18)`

Light UI:

- subtle gray borders or no border with light shadow

## Shadows

Used sparingly and softly.

Examples:

- CTA button: `0 4px 14px rgba(0,0,0,0.25)`
- FAQ card: `0 2px 12px rgba(0,0,0,0.03)`
- Product imagery: `drop-shadow(0 12px 24px rgba(0,0,0,0.06))`

## Motion

Motion is subtle and premium, mainly through opacity and vertical translation.

### Common Motion Patterns

- Fade in + `translateY(20px)`
- Fade in + `translateY(30px)`
- Smooth opacity swaps in carousels
- Scale shift on image hover

### Common Easing

```css
cubic-bezier(0.16,1,0.3,1)
cubic-bezier(0.4,0,0.2,1)
```

### Common Durations

- `0.3s`
- `0.4s`
- `0.5s`
- `0.6s`

## Components

### Hero

File: `src/components/sections/Hero.tsx`

Characteristics:

- Full-bleed media background
- Dark overlay gradient for readability
- Large editorial heading
- Warm gradient on secondary heading line
- Pill-style feature tags
- Rounded orange CTA
- Mobile fallback image shown before video initializes

Key visual patterns:

- Background: `#0a0a0a`
- Overlay:

```css
linear-gradient(95deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.50) 42%, transparent 68%)
```

- CTA:
  - Background: `#E05D26`
  - Radius: `999px`
  - Padding: `14px 32px`

### Bento Grid

File: `src/components/sections/BentoGrid.tsx`

Characteristics:

- Modular feature storytelling layout
- Dark cards with immersive media
- Internal gradients for text legibility
- Rounded card geometry
- Small translucent pills for labels

Recurring patterns:

- Card radius: `20px`
- Dark backgrounds: `#111`, `#080808`
- Gradient overlays for text contrast

### Product Buy

File: `src/components/sections/ProductBuy.tsx`

Characteristics:

- Two-column commerce section
- Scroll-reactive theme from dark to light
- Product image gallery with thumbnails
- Strong price hierarchy
- Informational rows and spec list

Computed token pattern:

- `bg`
- `surface`
- `border`
- `text1`
- `text2`
- `text3`
- `orange`
- `orangeHi`

This is the closest thing in the project to a dynamic semantic theme model.

### In The Box

File: `src/components/sections/InTheBox.tsx`

Characteristics:

- Clean white background
- Product items centered in a grid
- Minimal text hierarchy
- Soft image hover scale

Patterns:

- Background: `#ffffff`
- Heading color: `#111111`
- Secondary text: `#666666`

### FAQ

File: `src/components/sections/FAQ.tsx`

Characteristics:

- Light gray section background
- White accordion cards
- Soft radius and low shadow
- Plus icon rotates on open

Patterns:

- Section background: `#f5f5f5`
- Card background: `#ffffff`
- Card radius: `12px`
- Body text: `#666666`

### Footer

File: `src/components/sections/Footer.tsx`

Characteristics:

- Pure black background
- White text with opacity hierarchy
- Compact informational layout

Patterns:

- Background: `#000000`
- Text primary: `#ffffff`
- Text secondary: `rgba(255,255,255,0.6)`
- Text tertiary: `rgba(255,255,255,0.45)`

## Utility Styles

Defined globally in `src/app/globals.css`.

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #FFD092 0%, #E05D26 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Gradient Background

```css
.gradient-bg {
  background: linear-gradient(135deg, #FFD092 0%, #E05D26 100%);
}
```

## Interaction Patterns

- CTA buttons use hover opacity and slight scale feedback
- Accordions animate with grid row transitions
- Carousel images fade between states
- Reveal animations are scroll-based and low-intensity

## Responsive Rules

Common breakpoint:

- `@media (max-width: 768px)`

Typical mobile adjustments:

- horizontal padding reduced to `24px`
- vertical section padding reduced to `64px`
- stacked layouts replace multi-column grids
- hero content aligns lower on screen

## Summary

This design system can be described as:

- Premium consumer-tech landing page
- Dark-first visual identity
- Warm orange gradient as brand signature
- Helvetica Neue typography
- Rounded, soft geometry
- Minimal but polished motion
- Inline-style-driven implementation with repeated visual consistency

## Recommended Next Step

If this design system needs to become easier for teams or AI tools to consume, the best next step is to extract it into:

1. a `tokens.ts` or `theme.ts` file
2. reusable typography primitives
3. reusable button/card/badge components
4. a documented `md` or Storybook-style component inventory
