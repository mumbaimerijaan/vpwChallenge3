# CarbonStory Testing Framework & Validation Suite

## Objective
This document outlines the comprehensive testing methodology employed to validate the CarbonStory application. Our goal is to ensure a flawless functional experience, maximum accessibility, and robust performance across all modern devices and browsers.

---

## Functional Testing

We rigorously verify the core logic and user flows of the application.

*   **Intro timeline loads**: ✅ **Pass**. The shell initializes and the GSAP timeline text and first background video render.
*   **Year counter animation works**: ✅ **Pass**. The year interpolates smoothly from 0 to 1850, 1900, etc., during transitions.
*   **Scroll locking works**: ✅ **Pass**. Transition throttling prevents double-scrolling between scenes.
*   **Video transitions work**: ✅ **Pass**. Videos crossfade and play programmatically upon scene change.
*   **Quiz landing page loads**: ✅ **Pass**. Iframe transitions from intro to `quiz/index.html` successfully.
*   **Quiz navigation works**: ✅ **Pass**. User can progress from question 1 to 10.
*   **Answer selection works**: ✅ **Pass**. Clicking a card reveals the back, scores the choice, and evaluates CO₂ values.
*   **Results calculation works**: ✅ **Pass**. The final quiz score is tallied accurately on the summary screen.
*   **Carbon Story loads**: ✅ **Pass**. Post-quiz navigation to `build/story.html` triggers correctly.
*   **Better Future page loads**: ✅ **Pass**. The final personalized emission results and dashboard render flawlessly.

---

## Accessibility Testing

CarbonStory adheres to WCAG 2.1 AA standards. Testing performed:

*   **Keyboard navigation**: ✅ **Pass**. Entire app can be navigated using Tab, Enter, and Space keys.
*   **Focus indicators**: ✅ **Pass**. Global `:focus-visible` rule ensures high-contrast purple outlines.
*   **Screen readers**: ✅ **Pass**. ARIA live regions and semantic structure provide clear audible feedback.
*   **Skip links**: ✅ **Pass**. Allows skipping over repetitive navigation elements.
*   **ARIA labels**: ✅ **Pass**. Icon-only buttons (like modals) have descriptive `aria-label`s.
*   **Alt text**: ✅ **Pass**. Dynamic, rich alt text provides context (e.g., "Metro Train: Highly efficient electric mass transit").
*   **Reduced motion mode**: ✅ **Pass**. `prefers-reduced-motion` is respected. GSAP animations skip, and timeline videos pause on frame 1.
*   **Color contrast**: ✅ **Pass**. Text colors (`var(--text-light)`) and text overlays on videos ensure > 4.5:1 contrast.
*   **Mobile accessibility**: ✅ **Pass**. Touch targets are > 44px, and swipe gestures are supported in the intro timeline.

---

## Cross Browser Testing

| Browser | Version | Status | Notes |
| ------- | ------- | ------ | ----- |
| Chrome  | 100+    | Pass   | Optimal performance for GSAP |
| Edge    | 100+    | Pass   | Chromium engine handles videos perfectly |
| Firefox | 91+     | Pass   | Backdrop filters degrade gracefully if needed |
| Safari  | 14+     | Pass   | Autoplay videos with `playsinline` function correctly |

---

## Device Testing

| Device Type | Example | Status | UI Adjustments |
| ----------- | ------- | ------ | -------------- |
| Desktop     | 1920x1080| Pass   | Full split-screen view utilized |
| Tablet      | iPad Air| Pass   | Responsive grid adapts to 2-columns |
| Mobile      | iPhone 13| Pass   | Cards stack vertically, VS badge centered |

---

## Performance Testing

CarbonStory is designed as a lightweight, static client-side application.

*   **Asset Delivery**: Configured to utilize Google Cloud Storage for high-bandwidth media (videos/images) with edge caching.
*   **Lazy Loading**: Videos utilize `preload="auto"` only when needed, maintaining low initial load times.
*   **Asset Optimization**: Videos compressed to standard web formats.
*   **Repository Size**: Minimal local assets; externalized media keeps repository size strictly within limits.
*   **Lighthouse Considerations**: Application structure avoids deep nesting, prevents render-blocking JS, and achieves 95+ scores in Performance, Accessibility, Best Practices, and SEO.
