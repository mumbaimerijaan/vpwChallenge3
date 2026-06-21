# Test Cases

### TC-001: Launch Application
**Steps:**
1. Open the root URL (`index.html`).
2. Verify iframe loads the intro timeline.
**Expected:** Timeline intro displayed with 1850 video paused until user scrolls.
**Result:** Pass

### TC-002: Intro Timeline Scroll Forward
**Steps:**
1. Scroll down using the mouse wheel.
**Expected:** Scene crossfades to 1900, text updates, year counter animates.
**Result:** Pass

### TC-003: Intro Timeline Keyboard Forward
**Steps:**
1. Press the Spacebar or Down Arrow key.
**Expected:** Scene transitions to the next timeline era.
**Result:** Pass

### TC-004: Intro Final CTA
**Steps:**
1. Reach the year 2025 scene and scroll once more.
**Expected:** "The Choice" text appears, scroll prompt disappears, CTA button fades in.
**Result:** Pass

### TC-005: Navigation to Quiz Landing
**Steps:**
1. Click "Begin The Journey" on the final intro screen.
**Expected:** Application iframe loads `quiz/index.html`.
**Result:** Pass

### TC-006: Quiz Landing Animations
**Steps:**
1. Observe `quiz/index.html`.
**Expected:** Title and instructions stagger fade-in upwards via GSAP.
**Result:** Pass

### TC-007: Start Quiz
**Steps:**
1. Click the "Begin Quiz" button.
**Expected:** Iframe navigates to `quiz/quiz.html`.
**Result:** Pass

### TC-008: Dynamic Quiz Loading
**Steps:**
1. Wait for `quiz.html` to initialize.
**Expected:** Question 1 loads from `data/questions.json` with correct image paths.
**Result:** Pass

### TC-009: 3D Card Hover
**Steps:**
1. Mouse over an option card.
**Expected:** Card slightly scales up with a shadow effect.
**Result:** Pass

### TC-010: Card Selection Feedback
**Steps:**
1. Click Option A.
**Expected:** Option A flips, reveals back. Correct answer glows green, incorrect red.
**Result:** Pass

### TC-011: Score Tracking
**Steps:**
1. Select the correct answer.
**Expected:** Top bar score increments by 1.
**Result:** Pass

### TC-012: Progress Bar Tracking
**Steps:**
1. Answer Question 1.
**Expected:** Progress bar advances to 10% (1/10).
**Result:** Pass

### TC-013: Prevent Multiple Answers
**Steps:**
1. Click Option A, then immediately click Option B.
**Expected:** Option B click is ignored, state remains locked.
**Result:** Pass

### TC-014: Next Question Advance
**Steps:**
1. Click "Next Question".
**Expected:** Board resets, new question data loaded, DOM refocused to question heading.
**Result:** Pass

### TC-015: Quiz Summary Screen
**Steps:**
1. Answer the final question and click Next.
**Expected:** Quiz UI hides, Summary container displays final score (e.g., 8/10).
**Result:** Pass

### TC-016: Navigation to Story Mode
**Steps:**
1. Click "See Your Future".
**Expected:** Application iframe loads `build/story.html`.
**Result:** Pass

### TC-017: Story Background Render
**Steps:**
1. Observe `build/story.html` initialization.
**Expected:** Background image sets dynamically based on the active step data.
**Result:** Pass

### TC-018: Progress Nodes Display
**Steps:**
1. Look at top right progress nodes.
**Expected:** Current step node is highlighted, completed steps have solid lines.
**Result:** Pass

### TC-019: Story Option Highlight
**Steps:**
1. Click a story option card.
**Expected:** Card border turns primary blue, checkmark badge scales in.
**Result:** Pass

### TC-020: Enforce Selection
**Steps:**
1. Click "Next Step" without selecting an option.
**Expected:** Alert informs user to make a choice.
**Result:** Pass

### TC-021: Next Step Transition
**Steps:**
1. Select an option, click "Next Step".
**Expected:** Content updates to the next category, progress nodes advance.
**Result:** Pass

### TC-022: Final Result Calculation
**Steps:**
1. Complete all story steps.
**Expected:** Application enters results mode, calculating total CO₂ footprint.
**Result:** Pass

### TC-023: Results Dashboard Layout
**Steps:**
1. Observe Results Dashboard.
**Expected:** Left column shows Score, Donut Chart, Category List. Right column shows comparisons.
**Result:** Pass

### TC-024: Donut Chart Generation
**Steps:**
1. Inspect the donut chart CSS.
**Expected:** `conic-gradient` percentages map accurately to user choices.
**Result:** Pass

### TC-025: Recommendations Modal
**Steps:**
1. Click "View All Actions".
**Expected:** Modal overlay fades in, background blurs, scroll locked.
**Result:** Pass

### TC-026: Explore Again
**Steps:**
1. Click "Explore Again" at bottom of results.
**Expected:** Application resets and iframe navigates back to `intro/index.html`.
**Result:** Pass

### TC-027: Keyboard Accessibility Validation
**Steps:**
1. Use TAB key through entire quiz flow.
**Expected:** Focus ring correctly wraps buttons; Enter key triggers clicks.
**Result:** Pass

### TC-028: Programmatic Focus Reset
**Steps:**
1. Click "Next Question".
**Expected:** Focus is programmatically placed onto the new question text heading.
**Result:** Pass

### TC-029: Dynamic Alt Text Validation
**Steps:**
1. Inspect image elements in Developer Tools during quiz.
**Expected:** Alt attributes are populated with descriptive text (e.g., "Car Trip: Car travel emits significantly more carbon").
**Result:** Pass

### TC-030: Reduced Motion Mode
**Steps:**
1. Enable OS-level Reduced Motion, reload application.
**Expected:** Intro videos remain paused on frame 1. GSAP animations pop in instantly. CSS flips transition instantly.
**Result:** Pass
