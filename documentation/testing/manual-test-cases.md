# Manual Test Cases

| Test ID | Category | Description | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| INT-01 | Intro | Intro loads without JS errors | GSAP initializes, hero text visible | GSAP initializes | PASS |
| INT-02 | Intro | Scroll interaction triggers animations | Elements fade in/out on scroll | Elements animate correctly | PASS |
| INT-03 | Intro | Timeline transitions work | Smooth sticky scrolling between frames | Smooth sticky scrolling | PASS |
| INT-04 | Intro | Video playback works | Background videos autoplay, loop | Videos autoplay smoothly | PASS |
| INT-05 | Intro | Start button focuses correctly | Tab indexing focuses 'Take the quiz' | Tab focus works | PASS |
| INT-06 | Intro | Final transition navigates | Clicking Start moves to quiz route | Navigates to quiz | PASS |
| QUIZ-01 | Quiz | Quiz starts correctly | Step 1 renders transport options | Renders transport options | PASS |
| QUIZ-02 | Quiz | Question navigation (Next) | Button triggers next category | Moves to Home category | PASS |
| QUIZ-03 | Quiz | Question navigation (Keyboard) | Enter key toggles selections | Enter toggles selection | PASS |
| QUIZ-04 | Quiz | Multi-select questions | Multiple items can be selected | Multiple items selected | PASS |
| QUIZ-05 | Quiz | Deselecting items | Clicking selected item deselects it | Item is deselected | PASS |
| QUIZ-06 | Quiz | Option counter updates | Footer updates e.g., "2 options" | Footer updates | PASS |
| QUIZ-07 | Quiz | Progress tracking nodes | Top nodes fill dynamically | Nodes fill on progression | PASS |
| QUIZ-08 | Quiz | Score calculation | `totalImpact` correctly tallies values | Exact float values calculated | PASS |
| QUIZ-09 | Quiz | Result generation trigger | Final step triggers `showResults()` | Results screen displays | PASS |
| QUIZ-10 | Quiz | Edge case: No selection | Next button still proceeds safely | Proceeds safely | PASS |
| RES-01 | Results | Carbon score generated | Header displays formatted score (e.g. 4.2) | Header displays 4.2 | PASS |
| RES-02 | Results | Score Band assigned | Climate Champion/Conscious Citizen assigned | Band assigned correctly | PASS |
| RES-03 | Results | Recommendations generated | Options trigger matching advice strings | Advice displayed | PASS |
| RES-04 | Results | Carbon Action Plan rendering | Top 5 plan renders with difficulty/impact | 5 action items rendered | PASS |
| RES-05 | Results | Category breakdown donut | Donut chart renders conic gradients | Chart renders gradients | PASS |
| RES-06 | Results | Tracking data saved | `localStorage` appends new object | Object appended | PASS |
| RES-07 | Results | History Timeline displays | Timeline shows past assessments | Timeline visible | PASS |
| RES-08 | Results | Trend insight generated | Text identifies largest change | Insight matches data | PASS |
| RES-09 | Results | Achievements (Badges) | Streak or Reducer badges awarded | Badges render correctly | PASS |
| RES-10 | Results | Export to TXT | Download triggers correctly | `.txt` file downloaded | PASS |
| RES-11 | Results | Print formatting | `@media print` hides extraneous UI | UI elements hidden on print | PASS |
| ACC-01 | Access. | Keyboard navigation through quiz | Tab moves sequentially through cards | Tab moves sequentially | PASS |
| ACC-02 | Access. | Screen reader support | ARIA labels read on selection | Screen reader announces | PASS |
| ACC-03 | Access. | Focus indicators | Cards show distinct outline on focus | High contrast outline | PASS |
| ACC-04 | Access. | Contrast compliance | Text passes WCAG AAA contrast | Passed Contrast Checker | PASS |
| ACC-05 | Access. | Alt text validation | All `<img>` tags have `alt` attributes | `alt` tags present | PASS |
| SEC-01 | Security | Corrupted LocalStorage | App handles `[invalid json}` without crashing | Resets seamlessly | PASS |
