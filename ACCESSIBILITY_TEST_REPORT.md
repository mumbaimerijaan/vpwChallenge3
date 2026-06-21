# Accessibility Test Report

This report confirms CarbonStory's compliance with WCAG 2.1 Level AA standards.

### Keyboard Testing
**Status**: ✅ Pass
**Findings**: The entire application, from timeline to the final dashboard, can be navigated using only the Tab, Enter, and Space keys. Interactive cards use semantic `<button>` elements, preventing trapping.

### Focus Testing
**Status**: ✅ Pass
**Findings**: Programmatic focus is strictly managed. When navigating pages or answering questions, focus is pushed directly to the next relevant logical header. Visual focus is highly apparent due to a global `outline: 3px solid #8b5cf6` configuration on `:focus-visible`.

### ARIA Testing
**Status**: ✅ Pass
**Findings**: Hidden instructional texts employ `sr-only` classes to guide screen readers. Icon-only buttons (like modals and restart) possess descriptive `aria-label` attributes.

### Alt Text Testing
**Status**: ✅ Pass
**Findings**: All dynamically loaded quiz images utilize contextual descriptions. Alt text is constructed on the fly (e.g., `alt="Metro Train: Highly efficient electric mass transit"`), providing screen reader users with identical narrative value.

### Reduced Motion Testing
**Status**: ✅ Pass
**Findings**: Testing with OS-level "Reduce Motion" enabled forces timeline videos to pause on the first frame and skips all GSAP-staggered fade animations across the quiz landing page. 

### Screen Reader Testing
**Status**: ✅ Pass
**Findings**: Verified semantic hierarchies (`<h1>` -> `<h3>`). The application announces new views effectively due to programmatic focus routing. No ARIA trapping observed.
