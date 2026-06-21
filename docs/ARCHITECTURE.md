# System Architecture

CarbonStory is designed as a secure, static client-side web application consisting of distinct functional engines without any backend requirements.

## 1. Intro Experience
- Hosted in an `iframe` (`intro/index.html`).
- Uses GSAP for cinematic scrolling storytelling.
- Educates the user on the "Understand" pillar.

## 2. Quiz Engine
- Handled by `build/js/story.js`.
- Renders assessment cards dynamically from `data/carbon-story.json`.
- Enforces strict input validation on all DOM selections.

## 3. Results Engine
- Maps user selections to emission values.
- Determines the user's score and assigns an Impact Band (Climate Champion, Conscious Citizen, Eco Explorer).
- Generates dynamic, personalized recommendations based on the user's exact selections (the "Reduce" pillar).

## 4. Tracking Engine
- Managed by `HistoryManager` in `story.js`.
- Safely persists assessment arrays to `localStorage`.
- Generates insights by comparing historical nodes and renders an SVG-based timeline (the "Track" pillar).
