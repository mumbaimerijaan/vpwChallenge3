# System Overview

CarbonStory follows a modular, client-side only architecture to ensure maximum privacy and minimal latency.

## Intro Module
**Location**: `intro/`
**Purpose**: An independent frame utilizing GSAP ScrollTrigger to build an emotional narrative. It handles the "Understand" criteria prior to quiz engagement.

## Quiz Module
**Location**: `build/js/story.js`, `quiz/`
**Purpose**: Dynamically renders questions from JSON. Implements strict state management (`this.selections`) and handles all DOM updates securely.

## Tracking Module
**Location**: `HistoryManager` within `story.js`
**Purpose**: Serializes, validates, and stores assessment history into the browser's `localStorage`. Computes deltas between assessments for the Insights Engine.

## Recommendations Module
**Location**: `showResults()` within `story.js`
**Purpose**: The Carbon Action Plan generator. It isolates selected quiz options and dynamically sorts their associated recommendations by potential benefit, assigning difficulty and impact metadata.
