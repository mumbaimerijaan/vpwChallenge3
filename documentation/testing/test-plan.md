# CarbonStory Test Plan

## Objective
To ensure CarbonStory functions correctly across all supported browsers, delivers a highly accessible experience, and securely processes user inputs without errors or state corruption.

## Scope
Testing covers the entire user journey:
- The cinematic GSAP intro sequence (`intro/index.html`).
- The interactive 5-step quiz (`quiz.html` & `story.js`).
- The dynamic results engine and Carbon Action Plan.
- LocalStorage tracking functionality.
- Performance, Compatibility, and Accessibility metrics.

## Test Environment
- **Operating Systems**: Windows 11, macOS Sonoma, iOS 17, Android 14.
- **Hardware**: Standard desktop, laptop, mobile smartphones, and screen readers (NVDA, VoiceOver).
- **Network**: Tested over fast broadband, 4G, and slow 3G throttling to verify asset loading.

## Browser Coverage
- Google Chrome (Latest)
- Mozilla Firefox (Latest)
- Microsoft Edge (Latest)
- Safari (macOS & iOS)

## Device Coverage
- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024, 1024x1366
- Mobile: 375x667, 414x896

## Acceptance Criteria
- All 30+ manual test cases must pass.
- Application must score 99+ on automated accessibility audits (Lighthouse/AXE).
- No console errors or mixed content warnings on load or interaction.
- Application must remain functional if `localStorage` is disabled or corrupted.
