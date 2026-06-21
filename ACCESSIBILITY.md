# Accessibility Statement & Documentation

## Features Implemented

### Keyboard Navigation
- **Skip Links:** A "Skip to main content" link is available at the top of the application to bypass iframe boundaries and navigation, allowing keyboard and screen reader users to jump straight to the content.
- **Focus Indicators:** High-contrast `3px solid #8b5cf6` outlines have been applied globally using the `:focus-visible` pseudo-class so keyboard users always know their current position.
- **Interactive Elements:** All quiz options, navigation buttons, and timeline controls are fully operable using `Tab`, `Shift+Tab`, `Space`, and `Enter` keys.

### Screen Reader Support
- **Semantic HTML:** The application uses semantic landmarks such as `<main>`, `<header>`, `<section>`, and `<nav>` to structure content meaningfully.
- **ARIA Live Regions:** Dynamic announcements are made to screen readers through `aria-live="polite"` regions when scenes change, questions advance, and scores are updated.
- **Image Accessibility:** All meaningful images include descriptive `alt` text. Decorative icons are hidden from screen readers using `alt=""` and `aria-hidden="true"`.
- **Button Labels:** Icon-only buttons and non-descriptive links have been provided with clear `aria-label` attributes.
- **Forms & Progress:** All inputs are connected to `<label>` elements. Quiz progress is conveyed via `role="progressbar"` with dynamic `aria-valuenow` updates.

### Visual & Motion Accessibility
- **Reduced Motion:** The application respects the OS-level "Prefers Reduced Motion" setting (`prefers-reduced-motion: reduce`). When enabled, background videos pause on the first frame, and CSS transitions/animations are disabled to prevent motion sickness.
- **Color Contrast:** Text and interactive elements have been adjusted to meet the WCAG AA minimum contrast ratio of 4.5:1.
- **Touch Targets:** All interactive elements on mobile devices have a minimum touch target area of `44x44` pixels.
- **Text Scaling:** The layout uses responsive units and flex/grid systems to ensure content can be scaled up to 200% without overlapping or clipping.

## Compliance Target
These features were implemented to target **WCAG 2.1 AA** compliance and maximize accessibility scores in automated evaluations.
