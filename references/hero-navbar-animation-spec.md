# Hero / Navbar Animation Spec

Source reference image:
- [hero-navbar-animation-reference.png](/Users/macbookpro/Desktop/alatikeePro/references/hero-navbar-animation-reference.png)

This is the saved animation direction we will use for the Alatike Pro hero section and navbar.

## Page Load

Trigger:
- Page load

Elements:
- Logo + nav links
- Hero headline
- Hero subtext
- CTA button
- Floating spa icon

Motion:
- Fade up
- Opacity: `0 -> 1`
- Translate Y: `20px -> 0`

Duration:
- `600ms`

Delay:
- Staggered: `0ms, 100ms, 200ms, 300ms, 400ms`

Easing:
- `ease-out`

Hover:
- Nav links: underline slide-in (`200ms`)
- CTA button: background fill + scale (`1.02`), `200ms ease`

Sticky Navbar Behavior:
- Navbar becomes sticky on scroll
- Transitions to a more compact height
- Box-shadow fades in over `300ms`

## Implementation Intent

We will use this as the baseline interaction system for:
- top navigation reveal
- hero text entrance
- hero CTA entrance
- floating decorative hero element
- sticky navbar transition on scroll
