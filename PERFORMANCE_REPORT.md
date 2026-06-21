# Performance Report

This document details the architectural choices maintaining CarbonStory's high performance and load speed.

## Core Architecture
CarbonStory operates entirely as a static client-side application. No dynamic backend processing is required for the user journey, ensuring instantaneous state transitions between scenes.

## Asset Hosting via Google Cloud Storage
- **Media Delivery**: Heavy assets, specifically the high-definition `1080p` timeline videos, are designed to be served through Google Cloud Storage (or a CDN wrapper). 
- **Caching**: Assets leverage edge caching strategies, drastically reducing time-to-first-byte (TTFB) for users globally.

## Repository Size Compliance
- **Asset Offloading**: The repository remains well under the challenge size limit. Video sources and heavy imagery are referenced via configurable external base paths (`window.ASSETS.imageBase`).

## Optimized Media Delivery
- **Video Preloading**: Intro videos utilize `preload="auto"` efficiently, buffering the immediate scenes before playback begins, preventing mid-scene buffering.
- **Image Formats**: Application images prioritize compressed web formats, rendering seamlessly on mobile data connections.

## Efficient Resource Loading
- **JS Bundling Strategy**: JavaScript execution is deferred where possible. Heavy libraries like GSAP are loaded via robust CDNs. 
- **DOM Reflow Management**: The SPA structure minimizes expensive browser repaints. Elements are toggled using efficient `hidden` utility classes rather than continuous DOM injection/deletion.
