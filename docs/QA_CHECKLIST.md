# QA Verification Checklist

The following 50+ items verify complete functional, visual, and accessible integrity.

## Initialization & Intro
- [x] 1. Application shell loads successfully without console errors.
- [x] 2. Iframe communication established with `intro/index.html`.
- [x] 3. Intro background videos preload correctly.
- [x] 4. Intro timeline scroll prompt fades in.
- [x] 5. Year counter interpolates from 0 to 1850 smoothly.
- [x] 6. 1850 scene video plays successfully.
- [x] 7. Mouse scroll transitions to 1900 scene.
- [x] 8. Touch swipe-up transitions scenes on mobile.
- [x] 9. Spacebar/Enter key transitions scenes.
- [x] 10. Scene transition crossfades background videos seamlessly.
- [x] 11. Final intro scene "The Choice" displays correctly.
- [x] 12. "Begin The Journey" CTA button functions.

## Quiz Flow
- [x] 13. Quiz landing page (`quiz/landing.html`) loads GSAP entrance animations.
- [x] 14. Quiz begin button fires postMessage navigation.
- [x] 15. `quiz/quiz.html` loads question data from JSON.
- [x] 16. Question 1 text renders correctly.
- [x] 17. Option A card displays correct image and title.
- [x] 18. Option B card displays correct image and title.
- [x] 19. VS badge sits centrally between cards.
- [x] 20. Hovering over cards triggers 3D flip animation.
- [x] 21. Clicking Option A flips the card to reveal the back.
- [x] 22. CO2 values are only revealed post-selection.
- [x] 23. Selecting the correct card applies a green glow/outline.
- [x] 24. Selecting the incorrect card applies a red glow/outline.
- [x] 25. "VS" badge disappears and Center Fact panel appears.
- [x] 26. Score updates positively on correct answer.
- [x] 27. Progress bar advances proportionally.
- [x] 28. "Next Question" button navigates to question 2.

## Quiz Summary
- [x] 29. After final question, summary container unhides.
- [x] 30. Final score is tallied and displayed out of total questions.
- [x] 31. Summary text praises user correctly based on score.
- [x] 32. "See Your Future" CTA triggers navigation to `build/story.html`.

## Interactive Story Building
- [x] 33. Story interface loads with top navigation.
- [x] 34. Dynamic background image changes based on the step.
- [x] 35. Progress nodes render horizontally on desktop.
- [x] 36. Step title and question text render.
- [x] 37. Story options render as selectable grid items.
- [x] 38. Clicking an option highlights it with a blue border.
- [x] 39. Selection logic registers the emission impact (high/med/low).
- [x] 40. "Next Step" button advances to the next story category.
- [x] 41. Floating footer updates with current footprint sum.

## Final Results Dashboard
- [x] 42. Final step submission transitions to results dashboard.
- [x] 43. Total Emissions value calculates accurately based on choices.
- [x] 44. Donut chart renders proportional segment colors.
- [x] 45. Earth comparison meter displays relative standing.
- [x] 46. Category breakdown list displays percentages correctly.
- [x] 47. Horizontal recommendations display dynamically.
- [x] 48. "View All Actions" button opens modal overlay.
- [x] 49. Modal overlay closes via "X" button or outside click.
- [x] 50. "Explore Again" resets state and returns to timeline.

## Global Quality Standards
- [x] 51. No uncaught JavaScript errors in browser console.
- [x] 52. All interactive elements use semantic `<button>` tags.
- [x] 53. Focus rings are highly visible on all interactive elements.
- [x] 54. Dynamic Alt text applied to all loaded images.
- [x] 55. Contrast overlay implemented for video text readability.
- [x] 56. Reduced motion mode strictly honored across JS/CSS.
- [x] 57. Responsive layouts reflow perfectly at <900px breakpoints.
