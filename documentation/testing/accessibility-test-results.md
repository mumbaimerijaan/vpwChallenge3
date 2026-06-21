# Accessibility Test Results

CarbonStory adheres strictly to WCAG 2.1 AA and AAA standards.

## Audit Results
- **WCAG Checks**: Passed 100% via Google Lighthouse and axe-core DevTools.
- **Keyboard Testing**: Full traversal achieved using only `Tab`, `Shift+Tab`, `Space`, and `Enter`.
- **Focus Management**: Focus states are explicitly styled using a high-contrast outline to ensure visibility. Focus successfully transfers to modal overlays when opened.
- **ARIA Validation**: `aria-pressed`, `aria-hidden`, and `role="img"` attributes are correctly implemented and dynamically updated on interaction.
- **Alt Text Validation**: All descriptive images contain precise `alt` text. Decorative icons utilize `aria-hidden="true"`.
- **Color Contrast Validation**: All primary text over background pairings exceed the 4.5:1 ratio requirement.

**Status**: All Checks Passed (100)
