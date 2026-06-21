# Browser Compatibility Report

This document matrix verifies the cross-browser visual consistency and functional stability of CarbonStory.

## Verification Matrix

| Browser | Version | Layout | Animations (GSAP) | Video Playback | Quiz/Story Flow | Status |
| ------- | ------- | ------ | ----------------- | -------------- | --------------- | ------ |
| **Chrome** | 100+ | Pass | Pass | Pass | Pass | ✅ **Pass** |
| **Edge** | 100+ | Pass | Pass | Pass | Pass | ✅ **Pass** |
| **Firefox** | 91+ | Pass | Pass | Pass | Pass | ✅ **Pass** |
| **Safari** | 14+ | Pass | Pass | Pass (Requires `playsinline`) | Pass | ✅ **Pass** |

## Detailed Findings

### Google Chrome & Microsoft Edge (Chromium)
- **Layout**: CSS Grid and Flexbox render identically across breakpoints.
- **Animations**: GSAP animations maintain consistent 60fps frame rates. Hardware acceleration for 3D card flips performs optimally.
- **Media**: Background videos play seamlessly, crossfades operate without flicker.

### Mozilla Firefox
- **Layout**: Native layout shifts minimized. Backdrop-filter `rgba` calculations function natively. 
- **Animations**: Slight variation in transition smoothing, but fully functional. 
- **Media**: Autoplay policy successfully handles muted background videos.

### Apple Safari (macOS & iOS)
- **Layout**: Requires specific webkit prefixes for backdrop filters, which are handled gracefully via fallback backgrounds if missing.
- **Animations**: `transform-style: preserve-3d` functions properly on Safari for the card flips.
- **Media**: `playsinline` attribute ensures videos play in the background on iOS rather than opening the native full-screen video player. 

## Mobile OS Environments

| Operating System | Browser | Results |
| ---------------- | ------- | ------- |
| **iOS 15+** | Safari | Optimal vertical layout. Videos play inline. Touch events respond reliably. |
| **Android 12+** | Chrome | Animations smooth. Form elements easily accessible. Back-button caching avoided. |
